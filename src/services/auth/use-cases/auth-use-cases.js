import jwt from "jsonwebtoken";
import moment from "moment";
import authRepository from "../data-access/auth-data-access";
import redisService from "../../redis/redis-services"

const signIn = async ({phoneNumber, password}) => {
    try {
        const user = await authRepository.signIn({phoneNumber, password});
        const userId = user._id
        //check if session exists in mongodb 
        const session = await authRepository.findSession(userId)
        let accessToken;

        if (session) {
            //session exists in mongodb'
            let updatedDate = session.expirationDate;
            accessToken = session.jwtToken

            const updatedAt = moment(session.updatedAt)
            const now = moment(new Date());

            const duration = (moment.duration(now.diff(updatedAt))).asHours()

            if (duration >= 1) {
                updatedDate = (now.add(process.env.JWT_EXPIRATION, 'days')).toDate()
            }
            // increase count and date of session
            const newSession = await authRepository.updateSession(session.userCount + 1, session, updatedDate)

            await redisService.storeSession(accessToken, newSession)
        } else {
            //session doesn't exist create a new one
            const newUser = {firstName: user.firstName, middleName: user.middleName, role: user.role, _id: user._id}
            accessToken = jwtSign(newUser);

            const expirationDate = (moment().clone().add(process.env.JWT_EXPIRATION, 'days')).toDate()
            // save session in mongodb
            const newSession = await authRepository.saveNewSession(userId, accessToken, expirationDate)
            await redisService.storeSession(accessToken, newSession)
        }

        return accessToken;
    } catch (error) {
        return Promise.reject(error);
    }
}

const signUp = async ({firstName, middleName, lastName, password, phoneNumber}) => {
    try {
        const user = await authRepository.signUp({firstName, middleName, lastName, password, phoneNumber})
        const userId = user._id
        //check if there is an error
        if (!user) {
            return Promise.reject(new Error("user doesn't exist"));
        }

        const accessToken = jwtSign({firstName: user.firstName, lastName: user.lastName, _id: user._id});

        const expirationDate = (moment().clone().add(process.env.JWT_EXPIRATION, 'days')).toDate()
        // save session in mongodb
        const newSession = await authRepository.saveNewSession(userId, accessToken, expirationDate)

        await redisService.storeSession(accessToken, newSession)
        return accessToken;
    } catch (error) {
        return Promise.reject(error);
    }
}

const logout = async (accessToken) => {
    try {
        await authRepository.logout(accessToken)
        await redisService.updateSession(accessToken)
    } catch (error) {
        return Promise.reject(error);
    }
}

const changePassword = async ({newPassword, user, accessToken}) => {
    try {
        const {updatedUser, oldAccessTocken} = await authRepository.changePassword({newPassword, user, accessToken})
        await redisService.deleteSessionCompletely(accessToken)
        return {updatedUser, oldAccessTocken};
    } catch (error) {
        return Promise.reject(error);
    }
}

const jwtSign = (user) => {
    return jwt.sign(
        JSON.parse(JSON.stringify(user)),
        // roles: user.roles,
        process.env.JWT_SECRET);
}

export default {
    signIn,
    signUp,
    logout,
    changePassword,
}