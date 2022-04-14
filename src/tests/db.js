import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongodb;

// connect to db
const connect = async () => {
    mongodb = await MongoMemoryServer.create();
    const uri = mongodb.getUri();
    const mongooseOpts = {
        useNewUrlParser: true,
        useUnifiedTopology:true
    }
    await mongoose.connect(uri, mongooseOpts,(err) => {
        if (err) {
            console.log(err)
        }
        console.log("mongoose connected for test")
    });
}

// disconnect and close connection
const closeDatabase = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongodb.stop();
}

// clear the db, remove all data
const clearDatabase = async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany();
    }
}

export default {
    connect,
    closeDatabase,
    clearDatabase
};