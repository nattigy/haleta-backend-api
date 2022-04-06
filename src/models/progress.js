import mongoose, {Schema} from "mongoose";
import timestamps from "mongoose-timestamp";
import {composeWithMongoose} from "graphql-compose-mongoose";

const ProgressSchema = new Schema({
    jobId: {
        type: Schema.Types.ObjectId
    },
    startDate: Date,
    endDate: Date,
    startTime: Date,
    endTime: Date,
    description: String,
    remark: Boolean
}, {
    collection: "progresses",
});

ProgressSchema.plugin(timestamps);
ProgressSchema.index({
    createdAt: 1,
    updatedAt: 1,
});

const ProgressModel = mongoose.model("Progress", ProgressSchema);
const ProgressTC = composeWithMongoose(ProgressModel);

export {ProgressModel, ProgressTC, ProgressSchema};
