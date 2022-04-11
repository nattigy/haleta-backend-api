import mongoose, {Schema} from "mongoose";
import timestamps from "mongoose-timestamp";
import {composeWithMongoose} from "graphql-compose-mongoose";

const TutorSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
}, {
    collection: "tutors",
});

TutorSchema.plugin(timestamps);
TutorSchema.index({
    createdAt: 1,
    updatedAt: 1,
});

const TutorModel = mongoose.model("Tutor", TutorSchema);
const TutorTC = composeWithMongoose(TutorModel);

export {TutorModel, TutorTC, TutorSchema};