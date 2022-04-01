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
    const newSession = await new SessionModel({
      userId:userId,
      jwtToken:jwtToken,
      expirationDate:tomorrowDate,
      userCount:1
  }).save();
  return newSession
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

const updateSession = async(count,session,updatedDate)  => {
  try {
    session.userCount = count
    session.expirationDate = updatedDate
    const newSession = await session.save()
    return newSession
  } catch (error) {
    return Promise.reject(error);
  }
}

const deleteSession = async(session)  => {
  try {
    console.log('remove')
    await session.remove()
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

    // let user = await UserModel.phoneNumberExist(phoneNumber);
    // if (user) {
    //     console.log("here 2")
    //     return Promise.reject(new Error("Phone Number has already been taken."));
    // }

    // user = await UserModel.emailExist(email);
    // if (user) {
    //   return Promise.reject(new Error("Email has already been taken."));
    // }
    // const salt = bcrypt.genSalt(10);
    // const hash = bcrypt.hashSync(password, salt);

    const user = await new UserModel({
      firstName,
      middleName,
      lastName,
      phoneNumber,
      password,
    }).save();

    return user;
  } catch (error) {
    return Promise.reject(error);
  }
};

const logout = async({user, accessToken}) => {
  try {
    const userId = user._id
    const session = await findSession(userId)
    const count = session.userCount
    if (count > 1) {
      count -= 1
      updateSession(count,session,session.expirationDate)
    }
    //delete session
    else if (count === 1) {
      deleteSession(session)
    }
  } catch (error) {
    console.log(error)
  }
}

const changePassword = async({newPassword, user, accessToken}) => {
  try {
    console.log("sim user: ",user)
    console.log("new password: ",newPassword)
    console.log("pass: ", user.password)
    const userphone = user.phoneNumber
    const userWith = await UserModel.findOne({ userphone });
    const userId = userWith._id
    const session = await findSession(userId)

    userWith.password=newPassword
    const updatedUser = await userWith.save(function(err){
      if(err)return handleErr(err);
      //user has been updated
      console.log("success")
    })
    const oldAccessTocken = accessToken
    //delete session
    await deleteSession(session)
      return {updatedUser, oldAccessTocken};
  } catch (error) {
    console.log(error)
  }
}

export default {
  signIn,
  signUp,
  saveNewSession,
  findSession,
  updateSession,
  logout,
  changePassword,
  deleteSession,
};
