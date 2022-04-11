import userRepository from "../data-access/user-data-access";

const createOneUser = async ({firstName, middleName, lastName, phoneNumber, password, email}) => {
    try {
        const user = await userRepository.createOneUser(
            {firstName, middleName, lastName, phoneNumber, password, email}
        );
        if (!user) {
            return Promise.reject(new Error("user create Error!"));
        }
        return user
    } catch (error) {
        return Promise.reject(error);
    }
}

const updateUserEmail = async ({newEmail, userId}) => {
    try {
        const updatedUser = await userRepository.updateUserEmail(
            {newEmail, userId}
        );
        if (!updatedUser) {
            return Promise.reject(new Error("Error Changing Email!"))
        }
        return updatedUser
    } catch (error) {
        return Promise.reject(error);
    }
}

const updateUserPhoneNumber = async ({newPhoneNumber, userId}) => {
    try {
        const updatedUser = await userRepository.updateUserPhoneNumber(
            {newPhoneNumber, userId}
        );
        if (!updatedUser) {
            return Promise.reject(new Error("Error Changing Phone Number!"))
        }
        return updatedUser;
    } catch (error) {
        return Promise.reject(error);
    }
}

const updateUserPassword = async ({newPassword, userId}) => {
    try {
        const updatedUser = await userRepository.updateUserPassword(
            {newPassword, userId}
        );
        if (!updatedUser) {
            return Promise.reject(new Error("Error Changing Password!"))
        }
        return updatedUser;
    } catch (error) {
        return Promise.reject(error);
    }
}

const updateUserName = async ({firstName, middleName, lastName, userId}) => {
    try {
        return userRepository.updateUserName({
            firstName,
            middleName,
            lastName,
            userId
        });
    } catch (error) {
        return Promise.reject(error);
    }
}

const updateUserRole = async ({role, userId}) => {
    try {
        return userRepository.updateUserRole({role, userId})
    } catch (error) {
        return Promise.reject(error);
    }
}

const updateUserStatus = async ({status, userId}) => {
    try {
        return userRepository.updateUserStatus({status, userId})
    } catch (error) {
        return Promise.reject(error);
    }
}

const updateUserImage = async ({image, user}) => {
    try {
        await userRepository.updateUserImage({image, user})
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
    updateUserImage
};
