import jwt from "jsonwebtoken";
import {UserModel} from "../../../models/user";
import authServices from "../../../services/auth/use-cases/auth-use-cases";
import storeNewSession from "../../../services/redis/redis-services"
// import crypto from "crypto";

const signIn = {
    name: "signIn",
    type: "AccessToken!",
    args: {
        phoneNumber: "String!",
        password: "String!",
    },
    resolve: async ({args: {phoneNumber, password}}) => {
        try {

            const {user, accessToken} = await authServices.signIn({phoneNumber, password});

            return {accessToken, user};
        } catch (error) {
            return Promise.reject(error);
        }
    },
};


const signUp = {
    name: "signUp",
    type: "AccessToken!",
    args: {
        firstName: "String!",
        middleName: "String!",
        lastName: "String!",
        password: "String!",
        phoneNumber: "String!",
    },
    resolve: async ({
                        args: {
                            firstName,
                            middleName,
                            lastName,
                            password,
                            phoneNumber
                        },
                        context: {
                            phoneVerification,
                        },
                    }) => {
        try {

            const {accessToken, user} = await authServices.signUp({
                firstName,
                middleName,
                lastName,
                password,
                phoneNumber,
            });
            console.log(accessToken)   
            return {
                accessToken,
                // roles: user.roles,
                user,
            };
        } catch (error) {
            return Promise.reject(error);
        }
    },
};

const logout = {
    name: 'logout',
    type: 'Succeed!',
    resolve: async ({context: {user, accessToken}}) => {
        try {
            // await redis.set(`expiredToken:${accessToken}`, user._id, 'EX', process.env.REDIS_TOKEN_EXPIRY);

            return {succeed: true};
        } catch (error) {
            return Promise.reject(error);
        }
    }
};

export default {
    signIn,
    signUp,
    logout,
}