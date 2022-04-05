import bcrypt from 'bcrypt';
import {UserModel} from "../../../models/user";

const createOneUser = async ({
    firstName,
    middleName,
    phoneNumber,
    password,
    email,
    image,
}) => {
try {

let user = await UserModel.phoneNumberExists(phoneNumber);
if (user) {
return Promise.reject(new Error("Phone Number has already been taken."));
}

const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);

return UserModel.create({
firstName,
middleName,
phoneNumber,
password: hashedPassword,
email,
image,
});
} catch (error) {
return Promise.reject(error);
}
};
export default {
    createOneUser,
};