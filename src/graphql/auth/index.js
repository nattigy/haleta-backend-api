import {UserTC} from "../../models/user";

import { authentication, userValidator } from "../../middlewares";

import Resolvers from "./resolvers/auth-resolvers";

import "./typedefs/types"

for (const resolver in Resolvers) {
    UserTC.addResolver(Resolvers[resolver]);
}

const AuthMutation = {
    signIn: UserTC.getResolver("signIn", [authentication.isGuest, userValidator.signIn]),
    // signUp: UserTC.getResolver("signUp", [authentication.isGuest, userValidator.signUp]),
    // logout: UserTC.getResolver('logout', [middleware.isAuth]),
    // resetPassword: UserTC.getResolver("resetPassword", [middleware.isGuest, validators.resetPassword]),
    // newPassword: UserTC.getResolver("newPassword", [middleware.isGuest, validators.newPassword]),
    // changePassword: UserTC.getResolver("changePassword", [middleware.isAuth, validators.changePassword]),
};

export {AuthMutation};
