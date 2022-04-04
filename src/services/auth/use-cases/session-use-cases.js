import sessionDataAccess from "../data-access/session-data-access";
import SessionDataAccess from "../data-access/session-data-access";
import client from "../../../config/redis-config";

const saveNewSession = async (userId, jwtToken, expirationDate) => {
    try {
        const session = sessionDataAccess.saveNewSession(userId, jwtToken, expirationDate);

        client.set(jwtToken, JSON.stringify(session), (err, reply) => {
            if (err) {
                return Promise.reject(err)
            }
            return Promise.resolve(session)
        })
    } catch (error) {
        return Promise.reject(error);
    }
}

const findSession = async (accessToken) => {
    let userSession;
    await client.get(accessToken, (err, sessionData) => {
        if (sessionData) {
            userSession = JSON.parse(sessionData)
        } else if (err) {
            return Promise(new Error("Session Not found"))
        }
    })
    return userSession;

    // try {
    //
    //     // const sessionData = JSON.parse(client.get(accessToken));
    //     return SessionModel.find({jwtToken: accessToken});
    // } catch (error) {
    //     return Promise.reject(error);
    // }
}

const findUser = async (userId) => {
    return sessionDataAccess.findUser(userId);
}

const updateSession = async (count, session, updatedDate) => {
    try {
        const newSession = await sessionDataAccess.updateSession(count, session, updatedDate)
        client.set(newSession.jwtToken, JSON.stringify(newSession), (err, reply) => {
            if (err) {
                return Promise.reject(err)
            }
            return Promise.resolve(newSession)
        })
        return newSession;
    } catch (error) {
        return Promise.reject(error);
    }
}

const deleteSession = async (accessToken) => {
    try {
        client.del(accessToken)
        await SessionDataAccess.deleteSession(accessToken)
    } catch (error) {
        return Promise.reject(error);
    }
}

export default {
    saveNewSession,
    findSession,
    findUser,
    updateSession,
    deleteSession,
};