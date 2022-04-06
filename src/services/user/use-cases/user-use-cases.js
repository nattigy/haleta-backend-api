import authRepository from "../data-access/user-data-access";
import sessionUseCases from "./session-use-cases";


const createOneUser = async ({firstName, middleName, phoneNumber, password, image, email}) => {
    try {
        const user = await authRepository.createOneUser(
            {firstName, middleName,  phoneNumber, password, image, email}
        );
        if (!user) {
            return Promise.reject(new Error("user create Error!"));
        }
        const session = await sessionUseCases.saveNewSession(user);
        return session.jwtToken;
    } catch (error) {
        return Promise.reject(error);
    }
}

const updateUserEmail = async ({newEmail, user, accessToken}) => {
    try {
        const updatedUser = await authRepository.updateUserEmail(
            {newEmail, user}
        );  
        if (!updatedUser) {
            return Promise.reject(new Error("Error Changing Email!"))
        }
        await sessionUseCases.deleteSession(accessToken)

    } catch (error) {
        return Promise.reject(error);
    }
}

const updateUserPhonenumber = async ({newPhonenumber, user, accessToken}) => {
    try {
        const updatedUser = await authRepository.updateUserPhonenumber(
            {newPhonenumber, user}
        );  
        if (!updatedUser) {
            return Promise.reject(new Error("Error Changing Phone Number!"))
        }
        await sessionUseCases.deleteSession(accessToken)

    } catch (error) {
        return Promise.reject(error);
    }
}

const updateUserPassword = async ({newPassword, user, accessToken}) => {
    try {
        const updatedUser = await authRepository.updateUserPassword(
            {newPassword, user}
        );  
        if (!updatedUser) {
            return Promise.reject(new Error("Error Changing Password!"))
        }
        await sessionUseCases.deleteSession(accessToken)

    } catch (error) {
        return Promise.reject(error);
    }
}

export default {
    createOneUser,
    updateUserEmail,
    updateUserPhonenumber,
    updateUserPassword,
};
