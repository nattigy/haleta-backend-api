import mongoose, {Schema} from "mongoose";
import timestamps from "mongoose-timestamp";
import {composeWithMongoose} from "graphql-compose-mongoose";

const JobSchema = new Schema({
    tutorId: {
        type: Schema.Types.ObjectId
    },
    location: String,
    pricePerHour: Number,
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
