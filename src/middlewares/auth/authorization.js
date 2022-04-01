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
    let hasAccess = false
    //list from redis, list of functions for each role
    user.roles.forEach(role => {
        if (accessList[role].includes(fieldName)) {
            hasAccess = true
        }
    })
    if (!hasAccess) {
        return Promise.reject(new Error("Access denied."));
    }
    return resolve(source, args, context, info);
};

export default authorization;
