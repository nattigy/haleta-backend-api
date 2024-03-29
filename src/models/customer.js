import mongoose, {Schema} from "mongoose";
import timestamps from "mongoose-timestamp";
import {composeWithMongoose} from "graphql-compose-mongoose";

const CustomerSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
}, {
    collection: "customers",
});

CustomerSchema.plugin(timestamps);
CustomerSchema.index({
    createdAt: 1,
    updatedAt: 1,
});

const CustomerModel = mongoose.model("Customer", CustomerSchema);
const CustomerTC = composeWithMongoose(CustomerModel);

export {CustomerModel, CustomerTC, CustomerSchema};