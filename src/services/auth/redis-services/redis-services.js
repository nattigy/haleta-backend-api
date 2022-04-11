import client from "../../../config/redis-config";

const findSession = async (accessToken) => {
    let userSession;
    await client.get(accessToken, (err, sessionData) => {
        if (sessionData) {
            userSession = JSON.parse(sessionData)
        } else if (err) {
            return Promise.reject(new Error("Session Not found"))
        }
    })
    return userSession;
}

const saveNewSession = async (accessToken, session) => {
    client.set(accessToken, JSON.stringify(session), (err) => {
        if (err) {
            return Promise.reject(err)
        }
        return Promise.resolve(session)
    })
}

const deleteSession = async (accessToken) => {
    await client.del(accessToken)
}

export default {
    findSession,
    saveNewSession,
    deleteSession
}