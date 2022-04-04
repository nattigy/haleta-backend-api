import authServices from "../../../services/auth/use-cases/auth-use-cases";

const signIn = {
    name: "signIn",
    type: "AccessToken!",
    args: {
        phoneNumber: "String!",
        password: "String!",
    },
    resolve: async ({args: {phoneNumber, password}}) => {
        try {
            const accessToken = await authServices.signIn({phoneNumber, password});
            return {accessToken}
        } catch (error) {
            return Promise.reject(error);
        }
    },
};

const signUp = {
    name: "signUp",
    type: "AccessToken!",
    args: {
        firstName: "String!",
        middleName: "String!",
        password: "String!",
        phoneNumber: "String!",
    },
    resolve: async ({
                        args: {
                            firstName,
                            middleName,
                            password,
                            phoneNumber
                        },
                        // context: {
                        //     phoneNumber,
                        // },
                    }) => {
        try {

            const accessToken = await authServices.signUp({
                firstName,
                middleName,
                password,
                phoneNumber,
            });
            return {accessToken}
        } catch (error) {
            return Promise.reject(error);
        }
    },
};

const logout = {
    name: 'logout',
    type: 'Succeed!',
    resolve: async ({context: {accessToken}}) => {
        try {
            await authServices.logout(accessToken)
            return {succeed: true};
        } catch (error) {
            return Promise.reject(error);
        }
    }
};

const changePassword = {
    name: "changePassword",
    type: "AccessToken!",
    args: {
        newPassword: "String!",
    },
    resolve: async ({args: {newPassword}, context: {user, accessToken}}) => {
        try {
            const newAccessToken = await authServices.changePassword(
                {newPassword, user, accessToken}
            );
            return {accessToken: newAccessToken};
        } catch (error) {
            return Promise.reject(error);
        }
    },
};

export default {
    signIn,
    signUp,
    logout,
    changePassword,
}