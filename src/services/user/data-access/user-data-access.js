import bcrypt from "bcrypt";
import { UserModel } from "../../../models/user";



const createOneUser = async ({
  firstName,
  middleName,
  phoneNumber,
  password,
  image,
  email,
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
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(newPassword, salt);
      console.log(hashPassword,salt)
      const updatedUser = await UserModel.findByIdAndUpdate(user._id, {password: hashPassword})
      console.log(updatedUser)
      return updatedUser
  } catch (error) {
      Promise.reject(error)
  }
}

const updateUserName = async ({
  firstName, 
  middleName, 
  lastName, 
  user
}) => {
  try {
      await UserModel.findByIdAndUpdate(user._id, {firstName: firstName,middleName:middleName})
  } catch (error) {
      return Promise.reject(error);
  }   
};

const updateUserRole = async ({role,user}) => {
  try {
      await UserModel.findByIdAndUpdate(user._id, {role:role}) 
  } catch (error) {
      return Promise.reject(error)
  }
}

const updateUserStatus = async ({status,user}) => {
  try {
      await UserModel.findByIdAndUpdate(user._id, {status:status}) 
  } catch (error) {
      return Promise.reject(error)
  }
}

const updateUserImage = async ({image,user}) => {
  try {
    await UserModel.findByIdAndUpdate(user._id, {image:image}) 
  } catch (error) {
      return Promise.reject(error)
  }
}

export default {
  createOneUser,
  updateUserEmail,
  updateUserPhonenumber,
  updateUserPassword,
  updateUserName,
  updateUserRole,
  updateUserStatus,
  updateUserImage
};
