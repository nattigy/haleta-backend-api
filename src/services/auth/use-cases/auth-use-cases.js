import jwt from "jsonwebtoken";
import {UserModel} from "../../../models/user";
// import crypto from "crypto";
import authRepository from "../data-access/auth-data-access";
import client from "../../../config/redis-config";

const signIn = async ({phoneNumber, password}) => {
    try {

        const user = authRepository.signIn({phoneNumber, password});

        //check if session exists in mongodb increase count on mongodb
        //if session doesn't exist create a new one
        const accessToken = await jwt.sign(user, process.env.JWT_SECRET, {
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