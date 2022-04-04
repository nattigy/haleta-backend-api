import mongoose, {Schema} from "mongoose";
import timestamps from "mongoose-timestamp";
import {composeWithMongoose} from "graphql-compose-mongoose";
import bcrypt from "bcrypt";

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
        enum: ["ACTIVE", "BLOCKED", "PENDING"],
    },
    role: {
        type: String,
        default: "NORMAL",
        enum: ["ADMIN", "SUPER_ADMIN", "NORMAL", "TUTOR", "CUSTOMER_SERVICE", "CUSTOMER_CARE", "RECRUITER"],
    },
}, {
    collection: "users",
});

UserSchema.plugin(timestamps);
UserSchema.index({
    createdAt: 1,
    updatedAt: 1,
});

UserSchema.statics.emailExists = function (email) {
    return this.findOne({email});
};

UserSchema.statics.phoneNumberExists = function (phoneNumber) {
    return this.findOne({phoneNumber});
};

UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

const UserModel = mongoose.model("User", UserSchema);
const UserTC = composeWithMongoose(UserModel);

export {UserModel, UserTC, UserSchema};
