import client from "../../config/redis-config";

//add to redis

//delete single token data(token string)
const updateSession = async (accessToken) => {
    console.log('deleting session redis')
    let userSession;
    await client.get(accessToken, (err,sessionData) => {
        if (sessionData) {
            console.log('here')
            userSession = sessionData
            console.log(sessionData)
        }
        else if (err){
            console.log('errrr')
            console.log(err)
        }
    })
    console.log(accessToken)
    console.log(userSession)
    userSession = JSON.parse(userSession)
    console.log(userSession)
    console.log(userSession.userCount)
    const count = userSession.userCount
    if (count > 1) {
        userSession.count -= 1
        syncWithRedis(client,accessToken,userSession)
      }
      //delete session
      else if (count === 1) {
        console.log('deleting from redis')
        client.del(accessToken)
      }
}

const deleteSessionCompletely= async (accessToken) => {
    console.log('deleting session redis')
    let userSession;
    await client.get(accessToken, (err,sessionData) => {
        if (sessionData) {
            console.log('here')
            userSession = sessionData
            console.log(sessionData)
        }
        else if (err){
            console.log('errrr')
            console.log(err)
        }
    })
    console.log(accessToken)
    console.log(userSession)
    userSession = JSON.parse(userSession)
    console.log(userSession)
    console.log(userSession.userCount)
    const count = userSession.userCount
    
        console.log('deleting from redis')
        client.del(accessToken)
      
}

//update single token data
const storeNewSession = async  (accessToken,session) => {
    //fetch from mongodb
    //update the whole cache
    console.log(accessToken)
    console.log('in sync wi redis',session)
    client.set(accessToken,JSON.stringify(session),(err,reply) => {
        if (err) {
            console.log(err.message)
            console.log('errrr')
            return Promise.reject(err)
        }
        console.log('resolving')
        return Promise.resolve(session)
    })
}

const checkValueInRedis = async (accessToken) => {
    console.log('cheking session redis')
    let userSession;
    const value = await client.get(accessToken, (err,sessionData) => {
        if (sessionData) {
            console.log('here')
            userSession = sessionData
            console.log(sessionData)
        }
        else if (err){
            console.log('errrr')
            console.log(err)
        }
    })
    console.log(accessToken)
    console.log(userSession)
    userSession = JSON.parse(userSession)
    console.log(userSession)
    console.log(userSession.userCount)
    return userSession;
}

export default {
    storeNewSession,
    updateSession,
    deleteSessionCompletely,
    checkValueInRedis,
}