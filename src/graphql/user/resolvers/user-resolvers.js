import userServices from "../../../services/user/use-cases/user-use-cases";
import {UserTC} from "../../../models/user";

const createOneUser = {
    name: "createOneUser",
    type: UserTC,
    args: {
        firstName: "String!",
        middleName: "String!",
        phoneNumber: "String!",
    },
    resolve: async ({
                        args: {
                            firstName,
                            middleName,
                            phoneNumber
                        },
                    }) => {
        try {

            const user = await userServices.createOneUser({
                firstName,
                middleName,
                phoneNumber,
                password: "",
                image: "",
                email: "",
            });
            return {user}
        } catch (error) {
            return Promise.reject(error);
        }
    },
};

const updateUserEmail = {
    name: "updateUserEmail",
    type: "Succeed!",
    args: {
        newEmail: "String!",
    },
    resolve: async ({args: {newEmail}, context: {user, accessToken}}) => {
        try {
            await userServices.updateUserEmail(
                {newEmail, user, accessToken}
            );
            return {succeed: true};
        } catch (error) {
            return Promise.reject(error);
        }
    },
};

const updateUserPhoneNumber = {
    name: "updateUserPhoneNumber",
    type: "Succeed!",
    args: {
        newPhoneNumber: "String!",
    },
    resolve: async ({args: {newPhoneNumber}, context: {user, accessToken}}) => {
        try {
            await userServices.updateUserPhoneNumber(
                {newPhoneNumber, user, accessToken}
            );
            return {succeed: true}
        } catch (error) {
            return Promise.reject(error);
        }
    },
};

const updateUserPassword = {
    name: "updateUserPassword",
    type: "Succeed!",
    args: {
        newPassword: "String!",
    },
    resolve: async ({args: {newPassword}, context: {user, accessToken}}) => {
        try {
            await userServices.updateUserPassword(
                {newPassword, user, accessToken}
            );
            return {succeed: true};
        } catch (error) {
            return Promise.reject(error);
        }
    },
};

const updateUserName = {
    name: "updateUserName",
    type: "Succeed!",
    args: {
        firstName: "String",
        middleName: "String",
        lastName: "String",
    },
    resolve: async ({
                        args: {
                            firstName,
                            middleName,
                            lastName = "",
                        },
                        context: {
                            user,
                        },
                    }) => {
        try {
            await userServices.updateUserName({
                firstName,
                middleName,
                lastName,
                user
            });
            return {succeed: true};
        } catch (error) {
            return Promise.reject(error);
        }
    },

};

const updateUserRole = {
    name: "updateUserRole",
    type: "Succeed!",
    args: {
        role: "String!",
    },
    resolve: async ({args: {role}, context: {user}}) => {
        try {
            await userServices.updateUserRole({role, user});
            return {succeed: true};
        } catch (error) {
            return Promise.reject(error);
        }
    }
};

const updateUserStatus = {
    name: "updateUserStatus",
    type: UserTC,
    args: {
        status: "String!"
    },
    resolve: async ({args: {status}, context: {user}}) => {
        try {
            return userServices.updateUserStatus({status, user});
        } catch (error) {
            return Promise.reject(error);
        }
    }
};

const updateUserImage = {
    name: "updateUserImage",
    type: "Succeed!",
    args: {
        image: "String!"
    },
    resolve: async ({args: {image}, context: {user}}) => {
        try {
            await userServices.updateUserImage({image, user});
            return {succeed: true};
        } catch (error) {
            return Promise.reject(error);
        }
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
}