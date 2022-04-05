import authServices from "../../../services/user/use-cases/user-use-cases";

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

            const accessToken = await authServices.createOneUser({
                firstName,
                middleName,
                phoneNumber,
                password: "",
                email: "",
                image: "",
            });
            return {accessToken}
        } catch (error) {
            return Promise.reject(error);
        }
    },
};

const updateUserEmail = {
    name: "updateUserEmail",
    type: "AccessToken!",
    args: {
        newEmail: "String!",
    },
    resolve: async ({args: {newEmail}, context: {user, accessToken}}) => {
        try {
            const newAccessToken = await authServices.updateUserEmail(
                {newEmail, user, accessToken}
            );
            return {accessToken: newAccessToken};
        } catch (error) {
            return Promise.reject(error);
        }
    },
};

const updateUserPhonenumber = {
    name: "updateUserPhonenumber",
    type: "AccessToken!",
    args: {
        newPhonenumber: "String!",
    },
    resolve: async ({args: {newPhonenumber}, context: {user, accessToken}}) => {
        try {
            const newAccessToken = await authServices.updateUserPhonenumber(
                {newPhonenumber, user, accessToken}
            );
            return {accessToken: newAccessToken};
        } catch (error) {
            return Promise.reject(error);
        }
    },
};

export default{
    createOneUser,
    updateUserEmail,
    updateUserPhonenumber,
}