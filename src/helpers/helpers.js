import jwt from "jsonwebtoken";
import moment from "moment";

export const jwtSign = (user) => {
    return jwt.sign(JSON.parse(JSON.stringify(user)), process.env.JWT_SECRET);
}

export const calculateExpirationDate = () => {
    return (moment().clone().add(process.env.JWT_EXPIRATION, 'days')).toDate()
}