import bcrypt from "bcrypt";
import {UserModel} from "../../../models/user";


const createOneUser = async ({
                                 firstName,
                                 middleName,
                                 lastName,
                                 phoneNumber,
                                 password,
                                 image,
                                 email,
                             }) => {
    try {
        let user = await UserModel.phoneNumberExists(phoneNumber);
        if (user) {
            return Promise.reject(new Error("Phone Number has already been taken."));
        }

        let hashedPassword = "";
        if (password !== "") {
            hashedPassword = await bcrypt.hash(password, salt);
        }

        return UserModel.create({
            firstName,
            middleName,
            lastName,
            phoneNumber,
            password: hashedPassword,
            email,
            image,
        });
    } catch (error) {
        return Promise.reject(error);
    }
};

const updateUserEmail = async ({newEmail, user}) => {
    try {
        return UserModel.findByIdAndUpdate(user._id, {email: newEmail})
    } catch (error) {
        return Promise.reject(error)
    }
}

const updateUserPhoneNumber = async ({newPhoneNumber, user}) => {
    try {
        return UserModel.findByIdAndUpdate(user._id, {phoneNumber: newPhoneNumber})
    } catch (error) {
        return Promise.reject(error)
    }
}

const updateUserPassword = async ({newPassword, user}) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(newPassword, salt);
        return UserModel.findByIdAndUpdate(user._id, {password: hashPassword})
    } catch (error) {
        return Promise.reject(error)
    }
}

const updateUserName = async ({
                                  firstName,
                                  middleName,
                                  lastName,
                                  user
                              }) => {
    try {
        await UserModel.findByIdAndUpdate(user._id, {firstName, middleName, lastName})
    } catch (error) {
        return Promise.reject(error);
    }
};

const updateUserRole = async ({role, user}) => {
    try {
        await UserModel.findByIdAndUpdate(user._id, {role: role})
    } catch (error) {
        return Promise.reject(error)
    }
}

const updateUserStatus = async ({status, user}) => {
    try {
        return UserModel.findByIdAndUpdate(user._id, {status: status})
    } catch (error) {
        return Promise.reject(error)
    }
}

const updateUserImage = async ({image, user}) => {
    try {
        await UserModel.findByIdAndUpdate(user._id, {image: image})
    } catch (error) {
        return Promise.reject(error)
    }
}

export default {
    createOneUser,
    updateUserEmail,
    updateUserPhoneNumber,
    updateUserPassword,
    updateUserName,
    updateUserRole,
    updateUserStatus,
    updateUserImage
};
