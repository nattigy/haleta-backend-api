//list from redis, list of functions for each role
const accessList = {
    ADMIN: ["findMany", "createOne"],
    SUPER_ADMIN: ["findMany", "createOne"],
    NORMAL: [],
    TUTOR: [],
    CUSTOMER_SERVICE: [],
};

const authorization = async (resolve, source, args, context, info) => {
    const {user} = context;
    const fieldName = info.fieldName
    if (accessList[user.role].indexOf(fieldName) >= 0) {
        return Promise.reject(new Error("Access denied."));
    }
    return resolve(source, args, context, info);
};

export default authorization;
