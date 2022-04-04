import bcrypt from 'bcrypt';
import {UserModel} from "../../../models/user";
import {SessionModel} from "../../../models/session";

const signIn = async ({phoneNumber, password}) => {
    try {
        const user = await UserModel.phoneNumberExists(phoneNumber);
        if (!user) {
            return Promise.reject(new Error("Incorrect username or password."));
        }

        const comparePassword = await user.comparePassword(password.toString());
        if (!comparePassword) {
            return Promise.reject(new Error("Incorrect username or password."));
        }

        return user;
    } catch (error) {
        return Promise.reject(error);
    }
};

const signUp = async ({
                          firstName,
                          middleName,
                          phoneNumber,
                          password,
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
        });
    } catch (error) {
        return Promise.reject(error);
    }
};

const logout = async (accessToken) => {
    try {
        const session = await SessionModel.find({jwtToken: accessToken})
        if (session.userCount > 1) {
            session.userCount -= 1
            await session.save();
        } else {
            await session.remove();
        }
    } catch (error) {
        return Promise.reject(error);
    }
}

const changePassword = async ({newPassword, user}) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        return UserModel.findByIdAndUpdate(user._id, {password: hashedPassword})
    } catch (error) {
        console.log(error)
    }
}

export default {
    signIn,
    signUp,
    logout,
    changePassword,
};
