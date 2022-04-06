import mongoose, {Schema} from "mongoose";
import timestamps from "mongoose-timestamp";
import {composeWithMongoose} from "graphql-compose-mongoose";


const SingleProgressSchema = new Schema({
    startTime: Date,
    endTime: Date,
    duration: Number,
    description: String,
    remark: Boolean,
}, {
    collection: "singleProgressSchemas",
});

const ProgressSchema = new Schema({
    jobId: {
        type: Schema.Types.ObjectId
    },
    totalHours: {
        type: Number,
        default: 0,
    },
    startDate: Date,
    endDate: Date,
    status: {
        type: String,
        //add status enum
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
