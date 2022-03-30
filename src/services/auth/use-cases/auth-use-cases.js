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
            authRepository.updateSession(session,updatedDate)
        }
        else {
            //session doesn't exist create a new one
            accessToken = await jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRATION,
            });

            const tomorrowDate = (moment().clone().add(1,'days')).toDate()
            // save session in mongodb
            authRepository.saveNewSession(userId,accessToken,tomorrowDate)
            
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
        const user = authRepository.signUp({firstName,middleName,lastName,password,phoneNumber})

        //check if there is an error

        const accessToken = await jwt.sign(
            JSON.parse(JSON.stringify(user)),
            // roles: user.roles,
            process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRATION,
        });

        // storeNewSession(token, user information(id), count, last update)

        return {
            accessToken,
            user,
        };
    } catch (error) {
        return Promise.reject(error);
    }
}

export default {
    signIn,
    signUp
}