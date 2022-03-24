import mongoose, {Schema} from "mongoose";
import timestamps from "mongoose-timestamp";
import {composeWithMongoose} from "graphql-compose-mongoose";

const SessionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    jwtToken: String,
    lastUpdate: Date,
    expirationDate: Date,
    userCount: Number,
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
