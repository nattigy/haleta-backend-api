import jwt from "jsonwebtoken";
import {UserModel} from "../../../models/user";
// import crypto from "crypto";
import authRepository from "../repository/auth-repository";

const signIn = async ({phoneNumber, password}) => {
    try {

        const user = authRepository.signIn({phoneNumber, password})

        const accessToken = await jwt.sign(user, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRATION,
        });

        return {
            accessToken,
            user,
        };
    } catch (error) {
        return Promise.reject(error);
    }
}

export default {
    signIn
}