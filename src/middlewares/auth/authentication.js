const isAuth = async (resolve, source, args, context, info) => {
    const {user} = context;
    if (!user) {
        return Promise.reject(new Error("You must be authorized."));
    }
    return resolve(source, args, context, info);
};

const isGuest = async (resolve, source, args, context, info) => {
    const {user} = context;
    if (user) {
        return Promise.reject(new Error("You have already authorized."));
    }
    return resolve(source, args, context, info);
};

export default {isAuth, isGuest};
