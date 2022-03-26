import jwt from "jsonwebtoken";
import {UserModel} from "../../../models/user";
// import crypto from "crypto";

const signIn = async ({phoneNumber, password}) => {
    try {
        const user = await UserModel.find({phoneNumber});

        const comparePassword = await user.comparePassword(password.toString());
        if (!comparePassword) {
            return Promise.reject(new Error("Password is incorrect."));
        }

        return user
    } catch (error) {
        return Promise.reject(error);
    }
}

export default {
    signIn
}