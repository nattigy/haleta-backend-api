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
export default {
    saveNewSession,
};