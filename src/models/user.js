import mongoose, {Schema} from "mongoose";
import timestamps from "mongoose-timestamp";
import {composeWithMongoose} from "graphql-compose-mongoose";

const UserSchema = new Schema({
    firstName: String,
    middleName: String,
    lastName: String,
    email: String,
    phoneNumber: String,
    image: String,
    firebaseId: String,
    password: String,
    status: {
        type: String,
        default: "ACTIVE",
        enum: ["ACTIVE", "BLOCKED"],
    },
    roles: {
        type: String,
        default: "NORMAL",
        enum: ["NORMAL", "OWNER", "ADMIN", "SALES"],
    },
    account: {
        verification: {
            verified: {
                type: Boolean,
                default: false,
            },
            token: String,
            expiresIn: Date,
        },
        emailVerification: {
            verified: {
                type: Boolean,
                default: false,
            },
            token: String,
            expiresIn: Date,
        },
        phoneVerification: {
            verified: {
                type: Boolean,
                default: false,
            },
            token: String,
            expiresIn: Date,
        },
        resetPassword: {
            token: String,
            expiresIn: Date,
        },
    },
}, {
    collection: "users",
});

UserSchema.plugin(timestamps);
UserSchema.index({
    createdAt: 1,
    updatedAt: 1,
});

UserSchema.statics.emailExist = function (email) {
    return this.findOne({email});
};

UserSchema.statics.phoneNumberExist = function (phoneNumber) {
    return this.findOne({phoneNumber});
};

UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

const UserModel = mongoose.model("User", UserSchema);
const UserTC = composeWithMongoose(UserModel);
// const UserTC = composeWithMongoose(UserModel).removeField('password');

const UserAccountTC = UserTC.getFieldTC("account");

UserAccountTC.getFieldTC("verification").removeField(["token", "expiresIn"]);

// UserAccountTC.removeField('resetPassword');

export {UserModel, UserTC, UserSchema};
