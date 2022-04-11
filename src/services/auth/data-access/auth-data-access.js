import {UserModel} from "../../../models/user";
import {hashPassword} from "../../../helpers/helpers";

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

        const hashedPassword = hashPassword(password);

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

const changePassword = async ({newPassword, user}) => {
    try {
        const hashedPassword = hashPassword(newPassword);
        return UserModel.findByIdAndUpdate(user._id, {password: hashedPassword})
    } catch (error) {
        console.log(error)
    }
}

export default {
    signIn,
    signUp,
    changePassword,
};
