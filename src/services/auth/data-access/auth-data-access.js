import bcrypt from 'bcrypt';
import {UserModel} from "../../../models/user";
import {SessionModel} from "../../../models/session";

const signIn = async ({phoneNumber, password}) => {
    try {
        const user = await UserModel.find({phoneNumber});

        const comparePassword = await user.comparePassword(password.toString());
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
            return Promise.reject(new Error("Phone Number has already been taken."));
        }

        const salt = bcrypt.genSalt(10);
        const hash = bcrypt.hashSync(password, salt);

        return UserModel.create({
            firstName,
            middleName,
            lastName,
            phoneNumber,
            hash,
        });
    } catch (error) {
        return Promise.reject(error);
    }
};

const logout = async (accessToken) => {
    try {
        const session = await findSession(accessToken)
        if (session.userCount > 1) {
            session.userCount -= 1
            session.save();
        } else {
            session.remove();
        }
    } catch (error) {
        return Promise.reject(error);
    }
}

const saveNewSession = async (userId, jwtToken, expirationDate) => {
    try {
        return SessionModel.create({
            userId: userId,
            jwtToken: jwtToken,
            expirationDate: expirationDate,
            userCount: 1
        })
    } catch (error) {
        return Promise.reject(error);
    }
}

const findSession = async (value) => {
    try {
        return SessionModel.find({jwtToken: value});
    } catch (error) {
        return Promise.reject(error);
    }
}

const updateSession = async (count, session, updatedDate) => {
    try {
        session.userCount = count
        session.expirationDate = updatedDate
        return session.save()
    } catch (error) {
        return Promise.reject(error);
    }
}

const updateSessionExpirationTime = async (session, updatedDate) => {
    try {
        return SessionModel.findByIdAndUpdate(session._id, {expirationDate: updatedDate});
    } catch (error) {
        return Promise.reject(error);
    }
}

const deleteSession = async (accessToken) => {
    try {
        await SessionModel.findOneAndDelete({jwtToken: accessToken})
    } catch (error) {
        return Promise.reject(error);
    }
}

const changePassword = async ({newPassword, user, accessToken}) => {
    try {
        console.log("sim user: ", user)
        console.log("new password: ", newPassword)
        console.log("pass: ", user.password)
        const userphone = user.phoneNumber
        const userWith = await UserModel.findOne({userphone});
        const userId = userWith._id
        const session = await findSession(userId)

        userWith.password = newPassword
        const updatedUser = await userWith.save(function (err) {
            if (err) return handleErr(err);
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
    updateSessionExpirationTime
};
