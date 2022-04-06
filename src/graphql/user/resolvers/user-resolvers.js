import userServices from "../../../services/user/use-cases/user-use-cases";

const createOneUser = {
    name: "createOneUser",
    type: "AccessToken!",
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
                        // context: {
                        //     phoneNumber,
                        // },
                    }) => {
        try {

            const accessToken = await userServices.createOneUser({
                firstName,
                middleName,
                phoneNumber,
                password: "",                
                image: "",
                email: "",
            });
            return {accessToken}
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

const updateUserPhonenumber = {
    name: "updateUserPhonenumber",
    type: "Succeed!",
    args: {
        newPhonenumber: "String!",
    },
    resolve: async ({args: {newPhonenumber}, context: {user, accessToken}}) => {
        try {
            await userServices.updateUserPhonenumber(
                {newPhonenumber, user, accessToken}
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
                            lastName,
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
    resolve: async ({ args: {role}, context: {user} }) => {
        try {
             await userServices.updateUserRole({role,user});
             return {succeed: true};
        } catch (error) {
            return Promise.reject(error);
        }
    }
};

const updateUserStatus = {
    name: "updateUserStatus",
    type: "Succeed!",
    args: {
        status: "String!"
    },
    resolve: async ({ args: {status}, context: {user} }) => {
        try {
             await userServices.updateUserStatus({status,user});
             return {succeed: true};
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
    resolve: async ({ args: {image}, context: {user} }) => {
        try {
             await userServices.updateUserImage({image,user});
             return {succeed: true};
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

export default{
    createOneUser,
    updateUserEmail,
    updateUserPhonenumber,
    updateUserPassword,
    updateUserName,
    updateUserRole,
    updateUserStatus,
    updateUserImage
}