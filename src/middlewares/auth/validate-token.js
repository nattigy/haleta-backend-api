import jwt from "jsonwebtoken";
import moment from "moment";
import authRepository from "../../services/auth/data-access/auth-data-access";
import {UserModel} from "../../models/user";
import redisService from "../../services/redis/redis-services";

const validateToken = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization

        Object.assign(req.headers, {
            user: null,
            authorization: null,
        });

        if (!authorization) {
            return next();
        }

        let accessToken;
        if (authorization.split(" ").length < 2) {
            return next();
        }
        accessToken = authorization.split(" ")[1];

        let decoded = jwt.verify(accessToken, process.env.JWT_SECRET);

        if (!decoded) {
            await authRepository.deleteSession(accessToken)
            await redisService.deleteSession(accessToken)
            return next();
        }

        if (decoded.exp * 1000 < Date.now()) {
            await authRepository.deleteSession(accessToken)
            await redisService.deleteSession(accessToken)
            return next();
        }

        //check if token is in redis

        const isSession = await redisService.checkValueInRedis(accessToken)
        if (!isSession) {
            return next();
        }

        if (isSession) {
            let updatedDate = isSession.expirationDate;

            const updatedAt = moment(isSession.updatedAt)
            const now = moment(new Date());
            const duration = (moment.duration(now.diff(updatedAt))).asHours();

            if (duration >= 1) {
                updatedDate = (now.add(process.env.JWT_EXPIRATION, 'days')).toDate()
                const newSession = await authRepository.updateSessionExpirationTime(isSession, updatedDate)
                await redisService.storeSession(accessToken, newSession)
            }
        }

        const user = await UserModel.findById(decoded._id);
        if (!user) {
            await authRepository.deleteSession(accessToken)
            await redisService.deleteSession(accessToken)
            return next();
        }

        // if the token has come all this way everything is good just attach it to the request header
        Object.assign(req.headers, {
            user,
            authorization,
        });

        return next();
    } catch (error) {
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
