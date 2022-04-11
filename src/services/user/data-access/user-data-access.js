import {UserModel} from "../../../models/user";
import {hashPassword} from "../../../helpers/helpers";

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
            hashedPassword = await hashPassword(password)
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

const updateUserEmail = async ({newEmail, userId}) => {
    try {
        return UserModel.findByIdAndUpdate(userId, {email: newEmail}, {new: true});
    } catch (error) {
        return Promise.reject(error);
    }
}

const updateUserPhoneNumber = async ({newPhoneNumber, userId}) => {
    try {
        return UserModel.findByIdAndUpdate(userId, {phoneNumber: newPhoneNumber}, {new: true});
    } catch (error) {
        return Promise.reject(error);
    }
}

const updateUserPassword = async ({newPassword, userId}) => {
    try {
        const hashedPassword = await hashPassword(newPassword)
        return UserModel.findByIdAndUpdate(userId, {password: hashedPassword}, {new: true});
    } catch (error) {
        return Promise.reject(error);
    }
}

const updateUserName = async ({
                                  firstName,
                                  middleName,
                                  lastName,
                                  userId
                              }) => {
    try {
        return UserModel.findByIdAndUpdate(userId, {firstName, middleName, lastName}, {new: true});
    } catch (error) {
        return Promise.reject(error);
    }
};

const updateUserRole = async ({role, userId}) => {
    try {
        return UserModel.findByIdAndUpdate(userId, {role: role}, {new: true});
    } catch (error) {
        return Promise.reject(error);
    }
}

const updateUserStatus = async ({status, userId}) => {
    try {
        return UserModel.findByIdAndUpdate(userId, {status: status}, {new: true});
    } catch (error) {
        return Promise.reject(error);
    }
}

const updateUserImage = async ({image, user}) => {
    try {
        return UserModel.findByIdAndUpdate(user._id, {image: image}, {new: true})
    } catch (error) {
        return Promise.reject(error)
    }
}

const findUser = async (userId) => {
    try {
        return UserModel.findById(userId)
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
    updateUserImage,
    findUser
};
