import jwt from "jsonwebtoken";

// import redis from "../config/redis-config";
import {UserModel} from "../../models/user";

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

        const accessToken = authorization.split(" ")[1];

        let decoded;
        if (accessToken) {
            decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
        }
        if (!decoded) {
            // invalid token, remove the token from everywhere
            //remove from database
            //remove from redis
            return next();
        }

        if (decoded.exp * 1000 < Date.now()) {
            //remove from database
            //remove from redis
            return next();
        }

        //check if token is in redis
        //if NOT in redis call next()
        //else check last update time if greater than or equals to 1hour update the token
        // if less skip else update token
        // authorization = new token

        const user = await UserModel.findById(decoded.userId);
        if (!user) {
            //remove from database
            //remove from redis
            return next();
        }

        // if the token has come all this way everything is good just attach it to the request header
        //attach it to https response cookie
        Object.assign(req.headers, {
            user,
            authorization,
        });

        res.cookie("jwt", authorization, {secure: true, httpOnly: true})

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
