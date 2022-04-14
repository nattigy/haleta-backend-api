import {UserModel} from "../../../models/user";
import {hashPassword} from "../../../helpers/helpers";

const createOneUser = async ({
                                 firstName, middleName, lastName, phoneNumber, password, email,
                             }) => {
    try {
        let user = await UserModel.phoneNumberExists(phoneNumber);
        if (user) {
            return user;
            // return Promise.reject(new Error("Phone Number has already been taken."));
        }

        let hashedPassword = "";
        if (password !== "") {
            hashedPassword = await hashPassword(password)
        }

        return UserModel.create({
            firstName, middleName, lastName, phoneNumber, password: hashedPassword, email,
        });
    } catch (error) {
        return Promise.reject(error);
    }
};

const getUserById = async (userId) => {
    try {
        return UserModel.findById(userId)
    } catch (error) {
        return Promise.reject(error)
    }
}


const getUsers = async () => {
    try {
        return UserModel.find()
    } catch (error) {
        return Promise.reject(error)
    }
}

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
                                  firstName, middleName, lastName, userId
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

const deleteUser = async (userId) => {
    try {
        await UserModel.findByIdAndDelete(userId)
    } catch (error) {
        return Promise.reject(error);
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
    deleteUser,
};
