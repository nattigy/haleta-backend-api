import jwt from "jsonwebtoken";
import { UserModel } from "../../../models/user";
import {SessionModel} from "../../../models/session";
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

const saveNewSession = async(userId,jwtToken,tomorrowDate) => {
  try {
    await new SessionModel({
      userId:userId,
      jwtToken:jwtToken,
      expirationDate:tomorrowDate,
      userCount:1
  }).save();
  } catch (error) {
    console.log('error in saving new session')
    console.log(error)
    return Promise.reject(error);
  }
}

const findSession = async(userId) => {
  try {
    const session = await SessionModel.findOne({userId});
    return session;
  } catch (error) {
    return Promise.reject(error);
  }
}

const updateSession = async(session,updatedDate)  => {
  try {
    session.userCount += 1
    session.expirationDate = updatedDate
    const newSession = await session.save()
    return newSession
  } catch (error) {
    return Promise.reject(error);
  }
}

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
  saveNewSession,
  findSession,
  updateSession,
};
