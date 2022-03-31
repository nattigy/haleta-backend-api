const storeNewSession = (client,accessToken,session) => {
    // store session information on Mongo db
    // sync with redis cache (update redis) //add to redis
    client.set(accessToken,JSON.stringify(session),(err,reply) => {
        if (err) {
            console.log(err.message)
            console.log('errrr')
            return Promise.reject(err)
        }
        return Promise.resolve(session)
    })
}

//add to redis
//update single token data
//delete single token data(token string)

const syncWithRedis = async  (client,accessToken,session) => {
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

export default {
    storeNewSession,
    syncWithRedis
}