import {UserTC} from "../../models/user";

import {authentication, authorization} from "../../middlewares";
import Resolvers from "./resolvers/user-resolvers";

for (const resolver in Resolvers) {
    UserTC.addResolver(Resolvers[resolver]);
}

const UserQuery = {
    userById: UserTC.getResolver("findById", [authentication.isAuth, authorization]),
    userByIds: UserTC.getResolver("findByIds", [authentication.isAuth, authorization]),
    userOne: UserTC.getResolver("findOne", [authentication.isAuth, authorization]),
    userMany: UserTC.getResolver("findMany", [authentication.isAuth, authorization]),
};

const UserMutation = {
    userCreateOne: UserTC.getResolver("createOne", [authentication.isAuth, authorization]),
    userCreateMany: UserTC.getResolver("createMany", [authentication.isAuth, authorization]),
    userUpdateById: UserTC.getResolver("updateById", [authentication.isAuth, authorization]),
    userUpdateOne: UserTC.getResolver("updateOne", [authentication.isAuth, authorization]),
    userUpdateMany: UserTC.getResolver("updateMany", [authentication.isAuth, authorization]),
    userRemoveById: UserTC.getResolver("removeById", [authentication.isAuth, authorization]),
    userRemoveOne: UserTC.getResolver("removeOne", [authentication.isAuth, authorization]),
    userRemoveMany: UserTC.getResolver("removeMany", [authentication.isAuth, authorization]),
    createOneUser: UserTC.getResolver("createOneUser", [authentication.isAuth, authorization]),
    updateUserEmail: UserTC.getResolver("updateUserEmail", [authentication.isAuth, authorization]),
    updateUserPhonenumber: UserTC.getResolver("updateUserPhonenumber", [authentication.isAuth, authorization]),
    updateUserPassword: UserTC.getResolver("updateUserPassword", [authentication.isAuth, authorization]),
    updateUserName: UserTC.getResolver("updateUserName",[authentication.isAuth, authorization]),
    updateUserRole: UserTC.getResolver("updateUserRole",[authentication.isAuth, authorization]),
    updateUserStatus: UserTC.getResolver("updateUserStatus",[authentication.isAuth, authorization]),
    updateUserImage: UserTC.getResolver("updateUserImage",[authentication.isAuth, authorization])
};

export {UserQuery, UserMutation};
