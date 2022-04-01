import client from "../../config/redis-config";

//update single token data
const storeSession = async (accessToken, session) => {
    //fetch from mongodb
    //update the whole cache
    client.set(accessToken, JSON.stringify(session), (err, reply) => {
        if (err) {
            console.log(err.message)
            return Promise.reject(err)
        }
        return Promise.resolve(session)
    })
}

//delete single token data(token string)
const updateSession = async (accessToken) => {
    let userSession;
    await client.get(accessToken, (err, sessionData) => {
        if (sessionData) {
            userSession = sessionData
        } else if (err) {
            console.log(err)
        }
    })

    userSession = JSON.parse(userSession)
    const count = userSession.userCount

    if (count > 1) {
        userSession.count -= 1
        storeSession(accessToken, userSession)
    }
    //delete session
    else if (count === 1) {
        client.del(accessToken)
    }
}

const deleteSession = async (accessToken) => {
    //we only need to delete from redis cache no need to get I dont see the point on doing that

    // let userSession;
    // await client.get(accessToken, (err,sessionData) => {
    //     if (sessionData) {
    //         userSession = sessionData
    //     }
    //     else if (err){
    //         console.log(err)
    //     }
    // })
    //
    // userSession = JSON.parse(userSession)
    // const count = userSession.userCount
    client.del(accessToken)
}

const checkValueInRedis = async (accessToken) => {
    let userSession;
    await client.get(accessToken, (err, sessionData) => {
        if (sessionData) {
            userSession = sessionData
        } else if (err) {
            return Promise(new Error("Session Not found"))
        }
    })

    userSession = JSON.parse(userSession)
    return userSession;
}

export default {
    storeSession,
    updateSession,
    deleteSession,
    checkValueInRedis,
}