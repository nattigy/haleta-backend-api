import client from "../../../config/redis-config";

const saveNewSession = async (accessToken, session) => {
    client.set(accessToken, JSON.stringify(session), (err) => {
        if (err) {
            return Promise.reject(err)
        }
        return Promise.resolve(session)
    })
}
export default {
    saveNewSession,
}