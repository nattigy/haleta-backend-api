import jwt from "jsonwebtoken";
import {UserModel} from "../../../models/user";
import {SessionModel} from "../../../models/session";
// import crypto from "crypto";
import authRepository from "../data-access/auth-data-access";
import client from "../../../config/redis-config";
import redisService from "../../redis/redis-services"
//load our .env file
require('dotenv').config()

const moment = require("moment")

const signIn = async ({phoneNumber, password}) => {
    try {
        const user = await authRepository.signIn({phoneNumber, password});
        const userId = user._id
        //check if session exists in mongodb 
        const session = await authRepository.findSession(userId)
        console.log(session)
        let accessToken;

        if (session) {
            //session exists in mongodb'
            console.log('sessison exists')
            let updatedDate = session.expirationDate;
            accessToken = session.jwtToken

            const updatedAt = moment(session.updatedAt)
            const now = moment(new Date());
            
            const duration = (moment.duration(now.diff(updatedAt))).asHours()
            console.log(duration)
            
            if (duration >= 1) {
                updatedDate = (moment(session.expirationDate).add(1,'days')).toDate()
            }
            // increase count and date of session
            const newSession = await authRepository.updateSession(session.userCount+1,session,updatedDate)
            console.log('new session', newSession)
            await redisService.syncWithRedis(client,accessToken,newSession)
        //     let dataInRedis;
        //     await client.get(accessToken, async(err,sessionData) => {
        //        if (sessionData) {
        //            dataInRedis = sessionData
        //            console.log(sessionData)
        //        }
        //        else if (err){
        //            console.log('errrr')
        //            console.log(err)
        //        }
        //    })
        //    console.log('data in redis ', dataInRedis)
        }
 
        else {
            console.log("session does not exit")
            //session doesn't exist create a new one
            accessToken = await jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRATION,
            });
      
            const tomorrowDate = (moment().clone().add(1,'days')).toDate()
            // save session in mongodb
            const newSession = await authRepository.saveNewSession(userId,accessToken,tomorrowDate)
            console.log(newSession)
            await redisService.syncWithRedis(client,accessToken,newSession)
            // // store session in redis
            // redisService.storeNewSession(client,session)
        }
        
        return {
            accessToken,
            user,
        };
    } catch (error) {
        return Promise.reject(error);
    }
}

const signUp = async ({firstName,middleName,lastName,password,phoneNumber}) => {
    try {
        const user = await authRepository.signUp({firstName,middleName,lastName,password,phoneNumber})
        const userId = user._id
        //check if there is an error

        const accessToken = await jwt.sign(
            JSON.parse(JSON.stringify(user)),
            // roles: user.roles,
            process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRATION,
        });

        // storeNewSession(token, user information(id), count, last update)
        const tomorrowDate = (moment().clone().add(1,'days')).toDate()
        // save session in mongodb
        const newSession = await authRepository.saveNewSession(userId,accessToken,tomorrowDate)
        console.log("In auth us case",accessToken)
        await redisService.syncWithRedis(client,accessToken,newSession)
        return {
            accessToken,
            user,
        };
    } catch (error) {
        return Promise.reject(error);
    }
}

const logout = async ({user, accessToken}) => {
    try {
        await authRepository.logout({user, accessToken})
        await redisService.deleteSessionRedis(client,accessToken)
    } catch (error) {
        return Promise.reject(error);
    }
}

const changePassword = async ({newPassword, user, accessToken}) => {
    try {
        const {updatedUser, oldAccessTocken} = await authRepository.changePassword({newPassword, user, accessToken})
        await redisService.deleteSessionRedisForChangePassword(client,accessToken)
        return {updatedUser, oldAccessTocken};
    } catch (error) {
        return Promise.reject(error);
    }
}

export default {
    signIn,
    signUp,
    logout,
    changePassword,
}