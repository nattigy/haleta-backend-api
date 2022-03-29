import dotenv from "dotenv";
import express from "express";
import {ApolloServer} from "apollo-server-express";
import schema from "./graphql";
import validateToken from "./middlewares/auth/validate-token";
import "./config/mongodb-config";

const client = require("./config/redis-config");

dotenv.config();
const app = express();

async function startApolloServer() {
    const server = new ApolloServer({
        schema,
        playground: true,
        introspection: true,
        tracing: true,
        path: "/",
        context: ({req}) => {
            return {
                user: req.headers.user,
                headers: req.headers,
                phoneVerification: req.headers.phoneverification || "",
                context: { client }
            };
        },
    });

    app.use(validateToken)

    await server.start();

    server.applyMiddleware({
        app,
        path: "/",
        cors: "no-cors",
    });

    app.listen({port: process.env.PORT}, () => {
        console.log(`🚀 Server listening on port ${process.env.PORT}`);
    });
}

startApolloServer().then(() => {
    console.log("Apollo server started");
}).catch((err) => {
    console.log(`🚀 Server Error: ${err.message}`);
})