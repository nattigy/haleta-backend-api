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
                password: "defaultpassword",
                email: "",
                image: "",
            });
            return {accessToken}
        } catch (error) {
            return Promise.reject(error);
        }
    },
};

export default{
    createOneUser,
}