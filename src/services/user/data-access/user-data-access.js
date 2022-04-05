import bcrypt from "bcrypt";
import { UserModel } from "../../../models/user";

const salt = async()=>{
  return await bcrypt.genSalt(10);
} 

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

    let hashedPassword = "";
    if (password != "") {
      hashedPassword = await bcrypt.hash(password, salt);
    }

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

const updateUserEmail = async ({newEmail, user}) => {
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(user._id, {email: newEmail})
        return updatedUser
    } catch (error) {
        Promise.reject(error)
    }
}

const updateUserPhonenumber = async ({newPhonenumber, user}) => {
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(user._id, {phoneNumber: newPhonenumber})
        return updatedUser
    } catch (error) {
        Promise.reject(error)
    }
}

const updateUserPassword = async ({newPassword, user}) => {
  try {
      const hashPassword = await bcrypt.hash(newPassword, salt);
      const updatedUser = await UserModel.findByIdAndUpdate(user._id, {password: hashPassword})
      return updatedUser
  } catch (error) {
      Promise.reject(error)
  }
}

export default {
  createOneUser,
  updateUserEmail,
  updateUserPhonenumber,
  updateUserPassword,
};
