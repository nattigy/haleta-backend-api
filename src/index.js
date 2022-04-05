import dotenv from "dotenv";
import express from "express";
import {ApolloServer} from "apollo-server-express";
import schema from "./graphql";
import validateToken from "./middlewares/auth/validate-token";
import "./config/mongodb-config";

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
                user: {
                    "firstName": "simret",
                    "middleName": "Ashenafi",
                    "email": "",
                    "phoneNumber": "+251970325090",
                    "image": "",
                    "password": "",
                    "status": "ACTIVE",
                    "role": "NORMAL",
                    "updatedAt": {
                        "$date": "2022-04-05T19:54:30.707Z"
                    },
                    "createdAt": {
                        "$date": "2022-04-05T19:54:30.707Z"
                    },
                    "__v": 0
                },
                headers: req.headers,
                phoneVerification: req.headers.phoneverification || "",
                accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjRjOWU3NjkxMzZlZTEzNTZkM2ZlZDciLCJmaXJzdE5hbWUiOiJzaW1yZXQiLCJtaWRkbGVOYW1lIjoiQXNoZW5hZmkiLCJyb2xlIjoiTk9STUFMIiwiaWF0IjoxNjQ5MTg4NDcwfQ.JntDmX_i9jlFdyOFt5RebpeyZoQgqR1gClqcwyWwF7U"
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