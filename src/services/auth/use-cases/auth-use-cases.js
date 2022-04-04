import jwt from "jsonwebtoken";
import moment from "moment";
import authRepository from "../data-access/auth-data-access";
import sessionUseCases from "./session-use-cases";
import sessionDataAccess from "../data-access/session-data-access";
import client from "../../../config/redis-config";

const signIn = async ({phoneNumber, password}) => {
    try {
        const user = await authRepository.signIn({phoneNumber, password});

        //check if session exists in mongodb 
        const session = await sessionDataAccess.findSessionByUserId(user._id)

        let accessToken;
        if (session) {
            accessToken = session.jwtToken
            const now = moment(new Date());
            const updatedDate = (now.add(process.env.JWT_EXPIRATION, 'days')).toDate()
            await sessionUseCases.updateSession(session.userCount + 1, session, updatedDate)
        } else {
            //session doesn't exist create a new one
            const newUser = {firstName: user.firstName, middleName: user.middleName, role: user.role, _id: user._id}
            accessToken = jwtSign(newUser);

            const expirationDate = (moment().clone().add(process.env.JWT_EXPIRATION, 'days')).toDate()
            await sessionUseCases.saveNewSession(user._id, accessToken, expirationDate)
        }

        return accessToken;
    } catch (error) {
        return Promise.reject(error);
    }
}

const signUp = async ({firstName, middleName, lastName, password, phoneNumber}) => {
    try {
        const user = await authRepository.signUp({firstName, middleName, lastName, password, phoneNumber})
        if (!user) {
            return Promise.reject(new Error("Signup Error!"));
        }

        const accessToken = jwtSign({
            firstName: user.firstName,
            middleName: user.middleName,
            role: user.role,
            _id: user._id
        });

        const expirationDate = (moment().clone().add(process.env.JWT_EXPIRATION, 'days')).toDate()

        await sessionUseCases.saveNewSession(user._id, accessToken, expirationDate);

        return accessToken;
    } catch (error) {
        return Promise.reject(error);
    }
}

const logout = async (accessToken) => {
    try {
        await authRepository.logout(accessToken)

        let userSession;
        await client.get(accessToken, (err, sessionData) => {
            if (sessionData) {
                userSession = sessionData
            } else if (err) {
                Promise.reject(err);
            }
        })

        userSession = JSON.parse(userSession)
        const count = userSession.userCount

        if (count > 1) {
            userSession.count -= 1
            await sessionUseCases.updateSession(userSession.count, userSession, userSession.expirationDate)
        } else if (count === 1) {
            await sessionUseCases.deleteSession(accessToken)
        }
    } catch (error) {
        return Promise.reject(error);
    }
}

const changePassword = async ({newPassword, user, accessToken}) => {
    try {
        const updatedUser = await authRepository.changePassword({newPassword, user, accessToken})
        if (!updatedUser){
            return Promise.reject(new Error("Error Changing Password!"))
        }

        await sessionUseCases.deleteSession(accessToken)

        const accessToken = jwtSign({
            firstName: user.firstName,
            middleName: user.middleName,
            role: user.role,
            _id: user._id
        });

        const expirationDate = (moment().clone().add(process.env.JWT_EXPIRATION, 'days')).toDate()
        await sessionUseCases.saveNewSession(user._id, accessToken, expirationDate);

        return accessToken;
    } catch (error) {
        return Promise.reject(error);
    }
}

const jwtSign = (user) => {
    return jwt.sign(JSON.parse(JSON.stringify(user)), process.env.JWT_SECRET);
}

export default {
    signIn,
    signUp,
    logout,
    changePassword,
}