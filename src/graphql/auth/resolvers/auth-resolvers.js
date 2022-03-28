import jwt from "jsonwebtoken";
import {UserModel} from "../../../models/user";
import authServices from "../../../services/auth/use-cases/auth-use-cases";
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

            const {user, accessToken} = authServices.signIn({phoneNumber, password});

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
            console.log("here 1")
            // let user = await UserModel.phoneNumberExist(phoneNumber);
            // if (user) {
            //     console.log("here 2")
            //     return Promise.reject(new Error("Phone Number has already been taken."));
            // }

            // user = await UserModel.emailExist(email);
            // if (user) {
            //   return Promise.reject(new Error("Email has already been taken."));
            // }
            // const salt = bcrypt.genSalt(10);
            // const hash = bcrypt.hashSync(password, salt);

            let user = await new UserModel({
                firstName,
                middleName,
                lastName,
                phoneNumber,
                password,
                // password: hash,
                // roles: [roles.OWNER],
                // account: {
                //     phoneVerification: {
                //         verified: true,
                //         token: phoneVerification,
                //     },
                // },
            }).save();
            console.log("here 3")
            const accessToken = await jwt.sign({
                _id: user._id,
                firstName: user.firstName,
                middleName: user.middleName,
                lastName: user.lastName,
                phoneNumber: user.phoneNumber,
                // roles: user.roles,
            }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRATION,
            });

            // await userService.verifyRequest(user);

            // userMail.verifyRequest(user, token);

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