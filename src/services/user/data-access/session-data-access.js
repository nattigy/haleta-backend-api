import {SessionModel} from "../../../models/session";

const saveNewSession = async (userId, jwtToken, expirationDate) => {
    try {
        return SessionModel.create({
            userId: userId,
            jwtToken: jwtToken,
            expirationDate: expirationDate,
            userCount: 1
        })
    } catch (error) {
        return Promise.reject(error);
    }
}

const deleteSession = async (accessToken) => {
    try {
        await SessionModel.findOneAndDelete({jwtToken: accessToken})
    } catch (error) {
        return Promise.reject(error);
    }
}

export default {
    saveNewSession,
    deleteSession,
};