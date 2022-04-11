import mongoose, {Schema} from "mongoose";
import timestamps from "mongoose-timestamp";
import {composeWithMongoose} from "graphql-compose-mongoose";

const JobSchema = new Schema({
    name: String,
    location: String,
    description: String,
    pricePerHour: Number,
    startDate: Date,
    endDate: Date,
    totalPayment: {
        type: Number,
        default: 0,
    },
    totalHours: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        default: "NEW",
        enum: ["NEW", "PENDING", "STARTED", "PAUSED", "ERROR", "CLOSED"],
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
