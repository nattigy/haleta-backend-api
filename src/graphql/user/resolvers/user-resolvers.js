import userServices from "../../../services/user/use-cases/user-use-cases";

const createOneUser = {
    name: "createOneUser",
    type: "user",
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
    type: "user!",
    args: {
        newEmail: "String!",
        userId: "String!"
    },
    resolve: async ({args: {newEmail, userId}}) => {
        try {
            const user = await userServices.updateUserEmail(
                {newEmail, userId}
            );
            return {user};
        } catch (error) {
            return Promise.reject(error);
        }
    },
};

const updateUserPhoneNumber = {
    name: "updateUserPhoneNumber",
    type: "user!",
    args: {
        newPhoneNumber: "String!",
        userId: "String!"
    },
    resolve: async ({args: {newPhoneNumber, userId}}) => {
        try {
            const user = await userServices.updateUserPhoneNumber(
                {newPhoneNumber, userId}
            );
            return {user}
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
        userId: "String!"
    },
    resolve: async ({args: {newPassword, userId}}) => {
        try {
            await userServices.updateUserPassword(
                {newPassword, userId}
            );
            return {succeed: true};
        } catch (error) {
            return Promise.reject(error);
        }
    },
};

const updateUserName = {
    name: "updateUserName",
    type: "user!",
    args: {
        firstName: "String",
        middleName: "String",
        lastName: "String",
        userId: "String!"
    },
    resolve: async ({
                        args: {
                            firstName,
                            middleName,
                            lastName = "",
                            userId
                        }
                    }) => {
        try {
            const user = userServices.updateUserName({
                firstName,
                middleName,
                lastName,
                userId
            });
            return {user};
        } catch (error) {
            return Promise.reject(error);
        }
    },

};

const updateUserRole = {
    name: "updateUserRole",
    type: "user!",
    args: {
        role: "String!",
        userId: "String!"
    },
    resolve: async ({args: {role, userId}}) => {
        try {
            const user = await userServices.updateUserRole({role, userId});
            return {user};
        } catch (error) {
            return Promise.reject(error);
        }
    }
};

const updateUserStatus = {
    name: "updateUserStatus",
    type: "user!",
    args: {
        status: "String!",
        userId: "String!"
    },
    resolve: async ({args: {status, userId}}) => {
        try {
            const user = userServices.updateUserStatus({status, userId});
            return {user};
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