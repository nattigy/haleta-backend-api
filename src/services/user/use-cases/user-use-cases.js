import userRepository from "../data-access/user-data-access";
import sessionUseCases from "./session-use-cases";


const createOneUser = async ({firstName, middleName, phoneNumber, password, image, email}) => {
    try {
        const user = await userRepository.createOneUser(
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
        const updatedUser = await userRepository.updateUserEmail(
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
        const updatedUser = await userRepository.updateUserPhonenumber(
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
        const updatedUser = await userRepository.updateUserPassword(
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

const updateUserName = async ({firstName, middleName, lastName, user}) => {
    try {
        const newFirstName = firstName || user.firstName
        const newMiddleName = middleName || user.middleName
        const newLastName = lastName || ''

        await userRepository.updateUserName({firstName:newFirstName,middleName:newMiddleName, lastName:newLastName, user:user})

    } catch (error) {
        return Promise.reject(error);
    }
}

const updateUserRole = async ({role,user}) => {
    try {
        await userRepository.updateUserRole({role,user})
    } catch (error) {
        return Promise.reject(error);
    }
}

const updateUserStatus = async ({status,user}) => {
    try {
        await userRepository.updateUserStatus({status,user})
    } catch (error) {
        return Promise.reject(error);
    }
}

const updateUserImage = async({image,user}) => {
    try {
        await userRepository.updateUserImage({image,user})
    } catch (error) {
        return Promise.reject(error);
    }
}
export default {
    createOneUser,
    updateUserEmail,
    updateUserPhonenumber,
    updateUserPassword,
    updateUserName,
    updateUserRole,
    updateUserStatus,
    updateUserImage
};
