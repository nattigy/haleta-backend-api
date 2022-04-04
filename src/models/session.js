import mongoose, {Schema} from "mongoose";
import timestamps from "mongoose-timestamp";
import {composeWithMongoose} from "graphql-compose-mongoose";

const SessionSchema = new Schema({
    jwtToken: String,
    expirationDate: Date,
    userCount: Number,
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
}, {
    collection: "sessions",
});

SessionSchema.plugin(timestamps);
SessionSchema.index({
    createdAt: 1,
    updatedAt: 1,
});

const SessionModel = mongoose.model("Session", SessionSchema);
const SessionTC = composeWithMongoose(SessionModel);

export {SessionModel, SessionTC, SessionSchema};
