import mongoose, {Schema} from "mongoose";
import timestamps from "mongoose-timestamp";
import {composeWithMongoose} from "graphql-compose-mongoose";

const JobSchema = new Schema({
    location: String,
    pricePerHour: Number,
    totalPayment: {
        type: Number,
        default: 0,
    },
    currentPayment: {
        type: Number,
        default: 0,
    },
    currentHours: {
        type: Number,
        default: 0,
    },
    totalHours: {
        type: Number,
        default: 0,
    },
    customerRelation: {
        type: Schema.Types.ObjectId,
        ref: "CustomerRelation",
        default: null
    },
}, {
    collection: "jobs",
});

JobSchema.plugin(timestamps);
JobSchema.index({
    createdAt: 1,
    updatedAt: 1,
});

const JobModel = mongoose.model("Job", JobSchema);
const JobTC = composeWithMongoose(JobModel);

export {JobModel, JobTC, JobSchema};
