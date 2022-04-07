import jwt from "jsonwebtoken";
import moment from "moment";
import bcrypt from "bcrypt";

export const jwtSign = (user) => {
    return jwt.sign(JSON.parse(JSON.stringify(user)), process.env.JWT_SECRET);
}

export const calculateExpirationDate = () => {
    return (moment().clone().add(process.env.JWT_EXPIRATION, 'days')).toDate()
}

export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}