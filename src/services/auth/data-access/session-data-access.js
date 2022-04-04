import {SessionModel} from "../../../models/session";
import {UserModel} from "../../../models/user";

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

const findSession = async (accessToken) => {
    try {
        return SessionModel.find({jwtToken: accessToken});
    } catch (error) {
        return Promise.reject(error);
    }
}

const findSessionByUserId = async (userId) => {
    try {
        return SessionModel.findOne({userId});
    } catch (error) {
        return Promise.reject(error);
    }
}

const findUser = async (userId) => {
    try {
        return UserModel.findById(userId, {_id: 1, firstName: 1, middleName: 1, role: 1});
    } catch (error) {
        return Promise.reject(error);
    }
}

const updateSession = async (session) => {
    try {
        return SessionModel.findByIdAndUpdate(session._id, {
            userCount: session.userCount,
            expirationDate: session.expirationDate,
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
    findSession,
    findSessionByUserId,
    findUser,
    updateSession,
    deleteSession,
};