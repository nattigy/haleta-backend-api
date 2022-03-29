import jwt from "jsonwebtoken";
import { UserModel } from "../../../models/user";
// import crypto from "crypto";

const signIn = async ({ phoneNumber, password }) => {
  try {
    const user = await UserModel.findOne({ phoneNumber });

    // const comparePassword = await user.comparePassword(password.toString());
    const comparePassword = (password.toString() === user.password)
    if (!comparePassword) {
      return Promise.reject(new Error("Password is incorrect."));
    }

    return user;
  } catch (error) {
    return Promise.reject(error);
  }
};

const signUp = async ({
  firstName,
  middleName,
  lastName,
  phoneNumber,
  password,
}) => {
  try {

    let user = await UserModel.phoneNumberExist(phoneNumber);
    if (user) {
        console.log("here 2")
        return Promise.reject(new Error("Phone Number has already been taken."));
    }

    user = await UserModel.emailExist(email);
    if (user) {
      return Promise.reject(new Error("Email has already been taken."));
    }
    const salt = bcrypt.genSalt(10);
    const hash = bcrypt.hashSync(password, salt);

    user = await new UserModel({
      firstName,
      middleName,
      lastName,
      phoneNumber,
      hash,
    }).save();

    return user;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default {
  signIn,
  signUp,
};
