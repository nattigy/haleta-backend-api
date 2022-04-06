import sessionDataAccess from "../data-access/session-data-access";
import {calculateExpirationDate, jwtSign} from "../../../helpers/helpers";
import redisServices from "../redis-services/redis-services";

const saveNewSession = async (user) => {
    try {
        const accessToken = jwtSign({
            _id: user._id,
            firstName: user.firstName,
            middleName: user.middleName,
            role: user.role,
        });
        const expirationDate = calculateExpirationDate();
        const session = sessionDataAccess.saveNewSession(user._id, accessToken, expirationDate);

        await redisServices.saveNewSession(accessToken, session)

        return session;
    } catch (error) {
        return Promise.reject(error);
    }
}

const deleteSession = async (accessToken) => {
    try {
        await redisServices.deleteSession(accessToken);
        await sessionDataAccess.deleteSession(accessToken)
    } catch (error) {
        return Promise.reject(error);
    }
}

export default {
    saveNewSession,
    deleteSession,
};