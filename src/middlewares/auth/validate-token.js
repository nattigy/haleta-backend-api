import jwt from "jsonwebtoken";
import moment from "moment";
import sessionUseCases from "../../services/auth/use-cases/session-use-cases";

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

        if (!decoded) {
            await sessionUseCases.deleteSession(accessToken)
            return next();
        }

        if (decoded.exp * 1000 < Date.now()) {
            await sessionUseCases.deleteSession(accessToken)
            return next();
        }

        //check if token is in redis
        const isSession = await sessionUseCases.findSession(accessToken)
        if (!isSession) {
            return next();
        }

        if (isSession) {
            let updatedDate = isSession.expirationDate;

            const updatedAt = moment(isSession.updatedAt)
            const now = moment(new Date());
            const duration = (moment.duration(now.diff(updatedAt))).asHours();

            if (duration >= 1) {
                updatedDate = (now.add(process.env.JWT_EXPIRATION, 'days')).toDate()
                await sessionUseCases.updateSession(isSession.userCount, isSession, updatedDate)
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
