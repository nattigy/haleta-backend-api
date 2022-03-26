import jwt from "jsonwebtoken";
import {UserModel} from "../../../models/user";
// import crypto from "crypto";

const signIn = {
    name: "signIn",
    type: "AccessToken!",
    args: {
        phoneNumber: "String!",
        password: "String!",
    },
    resolve: async ({
                        args: {
                            phoneNumber,
                            password,
                        },
                    }) => {
        try {
            // const user = await UserModel.phoneNumberExist(phoneNumber);
            // if (!user) {
            //     return Promise.reject(new Error("User not found."));
            // }
            const user = await UserModel.find({phoneNumber});

            // const comparePassword = await user.comparePassword(password.toString());
            // if (!comparePassword) {
            //     return Promise.reject(new Error("Password is incorrect."));
            // }

            console.log(user)
            const accessToken = await jwt.sign(user, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRATION,
            });

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

const resetPassword = {
    name: "resetPassword",
    type: "Succeed!",
    args: {email: "String!"},
    resolve: async ({args: {email}}) => {
        try {
            const user = await UserModel.findOne({email});
            if (!user) {
                return Promise.reject(new Error("User not found."));
            }

            // const token = crypto.randomBytes(48, (err, buffer) => buffer.toString("hex"));
            // const expiresIn = moment().add(7, "days");

            // user.set({
            //     account: {
            //         resetPassword: {
            //             token,
            //             expiresIn,
            //         },
            //     },
            // });

            await user.save();

            // userMail.resetPassword(user, token);

            return {succeed: true};
        } catch (error) {
            return Promise.reject(error);
        }
    },
};

const newPassword = {
    name: "newPassword",
    type: "AccessToken!",
    args: {
        token: "String!",
        newPassword: "String!",
    },
    resolve: async ({
                        args: {
                            token,
                            newPassword,
                        },
                    }) => {
        try {
            const user = await UserModel.findOne({
                "account.resetPassword.token": token,
            });
            if (!user) {
                return Promise.reject(new Error("Access Token is not valid or has expired."));
            }

            const hash = bcrypt.hashSync(newPassword, 10);

            user.set({
                password: hash,
                account: {
                    resetPassword: {
                        token: null,
                        expiresIn: null,
                    },
                },
            });

            await user.save();

            const accessToken = await jwt.sign({userId: user._id}, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRATION,
            });

            return {accessToken};
        } catch (error) {
            return Promise.reject(error);
        }
    },
};

const changePassword = {
    name: "changePassword",
    type: "Succeed!",
    args: {
        currentPassword: "String!",
        newPassword: "String!",
    },
    resolve: async ({
                        args: {
                            currentPassword,
                            newPassword,
                        },
                        context: {user},
                    }) => {
        try {
            const comparePassword = await user.comparePassword(currentPassword);
            if (!comparePassword) {
                return Promise.reject(new Error("Current password is incorrect."));
            }

            const hash = bcrypt.hashSync(newPassword, 10);

            user.set({password: hash});

            await user.save();

            return {succeed: true};
        } catch (error) {
            return Promise.reject(error);
        }
    },
};

const verifyRequest = {
    name: "verifyRequest",
    type: "Succeed!",
    resolve: async ({context: {user}}) => {
        try {
            // await userService.verifyRequest(user);

            // userMail.verifyRequest(user, token);

            return {succeed: true};
        } catch (error) {
            return Promise.reject(error);
        }
    },
};

const verify = {
    name: "verify",
    type: "AccessToken!",
    args: {token: "String!"},
    resolve: async ({args: {token}}) => {
        try {
            // const user = await UserModel.findOne({
            //   "account.verification.token": token,
            // });
            // if (!user) {
            //   return Promise.reject(new Error("Access Token is not valid or has expired."));
            // }
            //
            // user.set({
            //   account: {
            //     verification: {
            //       verified: true,
            //       token: null,
            //       expiresIn: null,
            //     },
            //   },
            // });
            //
            // await user.save();
            //
            // const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            //   expiresIn: process.env.JWT_EXPIRATION,
            // });

            // userMail.verify(user);

            // return { accessToken };
        } catch (error) {
            return Promise.reject(error);
        }
    },
};

export default {
    signIn,
    signUp,
    logout,
    newPassword,
    changePassword,
    verify,
    verifyRequest
}