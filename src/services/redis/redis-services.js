const storeNewSession = () => {
    // store session information on Mongo db
    // sync with redis cache (update redis) //add to redis
}

//add to redis
//update single token data
//delete single token data(token string)

const syncWithRedis = () => {
    //fetch from mongodb
    //update the whole cache
}

export default {
    storeNewSession,
    syncWithRedis
}