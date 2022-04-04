import jwt from "jsonwebtoken";
import moment from "moment";
import sessionUseCases from "../../services/auth/use-cases/session-use-cases";
import redisServices from "../../services/auth/redis-services/redis-services";

const validateToken = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization

        Object.assign(req.headers, {
            user: null,
            authorization: null,
        });

        if (!authorization) {
            return next();
        }

        let accessToken;
        if (authorization.split(" ").length < 2) {
            return next();
        }
        accessToken = authorization.split(" ")[1];

        let decoded = jwt.verify(accessToken, process.env.JWT_SECRET);

        if (!decoded || (decoded.exp * 1000 < Date.now())) {
            await sessionUseCases.deleteSession(accessToken)
            return next();
        }

        //check if token is in redis
        const session = await redisServices.findSession(accessToken)
        if (!session) {
            return next();
        }

        if (session) {
            const updatedAt = moment(session.updatedAt)
            const now = moment(new Date());
            const duration = (moment.duration(now.diff(updatedAt))).asHours();

            if (duration >= 1) {
                await sessionUseCases.updateSession(session)
            }
        }

        const user = await sessionUseCases.findUser(decoded._id);
        if (!user) {
            await sessionUseCases.deleteSession(accessToken)
            return next();
        }

        // if the token has come all this way everything is good just attach it to the request header
        Object.assign(req.headers, {
            user,
            authorization,
        });

        return next();
    } catch (error) {
        return Promise.reject(new Error("Error Happened!"));
    }
};

export default validateToken;
