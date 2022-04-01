import jwt from "jsonwebtoken";
import authRepository from "../../services/auth/data-access/auth-data-access";
// import redis from "../config/redis-config";
import {UserModel} from "../../models/user";
import redisService from "../../services/redis/redis-services"
import client from "../../config/redis-config";

const validateToken = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization
        console.log("authorization: ",authorization)
        Object.assign(req.headers, {
            user: null,
            authorization: null,
        });

        if (!authorization) {
            return next();
        }

        const accessToken = authorization.split(" ")[1];
        console.log("accessTocken: ", accessToken);
        let decoded;
        if (accessToken) {
            decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
        }
        if (!decoded) {
            // invalid token, remove the token from everywhere
            //remove from database
        
            const session = await findSession(accessToken)

           await authRepository.deleteSession(session)

            //remove from redis
            await client.del(accessToken)

            return next();
        }

        if (decoded.exp * 1000 < Date.now()) {
            //remove from database

            const userWith = await UserModel.findOne( decoded.userId );
            const userId = userWith._id
            const session = await findSession(userId)

           await authRepository.deleteSession(session)

            //remove from redis
            await client.del(accessToken)

            return next();
        }

        //check if token is in redis
        const isSession = await redisService.checkValueInRedis(accessToken)
        //if NOT in redis call next()
        if (!isSession){
            return next();
        }
        //else check last update time if greater than or equals to 1hour update the token
        // if less skip else update token
        // authorization = new token
        else if(isSession){
            let updatedDate = isSession.expirationDate;
            let accessToken = isSession.jwtToken

            const updatedAt = moment(isSession.updatedAt)
            const now = moment(new Date());
            
            const duration = (moment.duration(now.diff(updatedAt))).asHours()
            // console.log(duration)
            
            if (duration >= 1) {
                updatedDate = (moment(isSession.expirationDate).add(process.env.JWT_EXPIRATION,'days')).toDate()
            }
            // increase count and date of session
            const newSession = await authRepository.updateSession(isSession,updatedDate)
            // console.log('new session', newSession)
            await redisService.storeNewSession(accessToken,newSession)
        }

        const user = await UserModel.findById(decoded.userId);
        if (!user) {
            //remove from database token
            const session = await authRepository.findSession(accessToken)

            await authRepository.deleteSession(session)

            //remove from redis
            await client.del(accessToken)
            //remove from redis
            return next();
        }

        // if the token has come all this way everything is good just attach it to the request header
        Object.assign(req.headers, {
            user,
            authorization,
        });

        return next();
    } catch (error) {
        console.log(error)
        return Promise.reject(new Error("Error Happened!"));
    }
};

export default validateToken;


// ------------- authorization ------------------

// let check_user_action = async (req,action,resource) =>{
//   if(!['updateOwn','deleteOwn'].includes(action)){
//     return true
//   }
//
//   const userResource = new Set()
//
//   if(resource == 'tender'){
//     let userTender = await Tender.find({ creator_user: req.user._id })
//     userTender.forEach(tender => userResource.add(`${tender._id}`))
//
//   }else if(resource == 'company'){
//     let userCompany = await Company.find({ creator_user: req.user._id })
//     userCompany.forEach(company => userResource.add( `${company._id}`))
//
//   }else if(resource == 'award'){
//     let userAward = await Award.find({ creator_user: req.user._id })
//     userAward.forEach(award => userResource.add(`${award._id}`))
//   }
//
//   if(!userResource.has(req.params.id)){
//     return false
//   }
//
//   return true
// }
//
//
//
// exports.authorize = function (action, resource) {
//   return async (req, res, next) => {
//     try {
//       const permission = roles.can(req.user.role)[action](resource);
//
//       if (!permission.granted) {
//         return res.status(401).send("You don't have enough permission to perform this action");
//       }
//
//       let result = await check_user_action(req,action,resource)
//       if(!result){
//         return res.status(401).send({ param: resource , msg: `You are not authorized to edit this ${resource}.` })
//       }
//
//       next()
//     } catch (error) {
//       return res.status(401).send("You don't have enough permission to perform this action")
//     }
//   }
// }
