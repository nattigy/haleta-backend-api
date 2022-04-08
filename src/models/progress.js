import mongoose, {Schema} from "mongoose";
import timestamps from "mongoose-timestamp";
import {composeWithMongoose} from "graphql-compose-mongoose";

const SingleProgressSchema = new Schema({
    startTime: Date,
    endTime: Date,
    duration: Number,
    description: String,
    remark: Boolean,
});

const ProgressSchema = new Schema({
    startDate: Date,
    endDate: Date,
    totalHours: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        default: "ACTIVE",
        enum: ["ACTIVE", "CLOSED"],
    },
    jobId: {
        type: Schema.Types.ObjectId,
        ref: "Job"
    },
    progressList: {
        type: [SingleProgressSchema],
        default: [],
    }
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
