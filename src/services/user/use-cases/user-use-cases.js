import userRepository from "../data-access/user-data-access";
import sessionUseCases from "./session-use-cases";

const createOneUser = async ({firstName, middleName, lastName, phoneNumber, password, image, email}) => {
    try {
        const user = await userRepository.createOneUser(
            {firstName, middleName, lastName, phoneNumber, password, image, email}
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

        const accessToken = await sessionUseCases.findAccessToken(userId)
        await sessionUseCases.deleteSession(accessToken)
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

        const accessToken = await sessionUseCases.findAccessToken(userId)
        await sessionUseCases.deleteSession(accessToken)
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

        const accessToken = await sessionUseCases.findAccessToken(userId)
        await sessionUseCases.deleteSession(accessToken)

    } catch (error) {
        return Promise.reject(error);
    }
}

const updateUserName = async ({firstName, middleName, lastName, userId}) => {
    try {
        let user = userRepository.findUser(userId)

        const newFirstName = firstName || user.firstName
        const newMiddleName = middleName || user.middleName
        const newLastName = lastName || ''
        
        const updatedUser = await userRepository.updateUserName({
            firstName: newFirstName,
            middleName: newMiddleName,
            lastName: newLastName,
            userId: userId
        })

        const accessToken = await sessionUseCases.findAccessToken(userId)
        await sessionUseCases.deleteSession(accessToken)
        return updatedUser;

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
