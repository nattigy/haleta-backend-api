import authRepository from "../data-access/auth-data-access";
import sessionUseCases from "./session-use-cases";
import sessionDataAccess from "../data-access/session-data-access";
import redisServices from "../redis-services/redis-services";

const signIn = async ({phoneNumber, password}) => {
    try {
        const user = await authRepository.signIn({phoneNumber, password});

        const session = await sessionDataAccess.findSessionByUserId(user._id)

        let accessToken;
        if (session) {
            accessToken = session.jwtToken;
            session.userCount += 1
            await sessionUseCases.updateSession(session)
        } else {
            accessToken = await sessionUseCases.saveNewSession(user)
        }

        return accessToken;
    } catch (error) {
        return Promise.reject(error);
    }
}

const signUp = async ({firstName, middleName, lastName, password, phoneNumber}) => {
    try {
        const user = await authRepository.signUp(
            {firstName, middleName, lastName, password, phoneNumber}
        );
        if (!user) {
            return Promise.reject(new Error("Signup Error!"));
        }
        const session = await sessionUseCases.saveNewSession(user);
        return session.jwtToken;
    } catch (error) {
        return Promise.reject(error);
    }
}

const logout = async (accessToken) => {
    try {
        let userSession = redisServices.findSession(accessToken)
        if (!userSession) {
            return Promise.reject(new Error("Session not found."));
        }

        userSession.count -= 1
        if (userSession.count >= 1) {
            await sessionUseCases.updateSession(userSession)
        } else if (userSession.count === 0) {
            await sessionUseCases.deleteSession(accessToken)
        }
    } catch (error) {
        return Promise.reject(error);
    }
}

const changePassword = async ({newPassword, user, accessToken}) => {
    try {
        const updatedUser = await authRepository.changePassword(
            {newPassword, user}
        );
        if (!updatedUser) {
            return Promise.reject(new Error("Error Changing Password!"))
        }
        await sessionUseCases.deleteSession(accessToken)

        return sessionUseCases.saveNewSession(user);
    } catch (error) {
        return Promise.reject(error);
    }
}

export default {
    signIn,
    signUp,
    logout,
    changePassword,
}