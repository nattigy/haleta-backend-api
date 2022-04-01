import Redis from "ioredis";
import winston from "winston";

const client = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT, //REDIS_PORT=6379
});

client.on("error", (error) => {
    console.log('😒')
    console.log(error)
    winston.error(error);
    client.quit().then((e) => console.log(e));
});

client.on("connect", () => winston.info("Redis client connected"));

export default client;
