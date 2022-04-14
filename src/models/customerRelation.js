import mongoose, {Schema} from "mongoose";
import timestamps from "mongoose-timestamp";
import {composeWithMongoose} from "graphql-compose-mongoose";

const CustomerRelationSchema = new Schema({
    totalPayment: {
        type: Number,
        default: 0,
    },
    tutorId: {
        type: Schema.Types.ObjectId,
        ref: "Tutor",
        default: null
    },
    customerId: {
        type: Schema.Types.ObjectId,
        ref: "Customer"
    },
    jobs: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: "Job"
            }
        ],
        default: []
    },
    payments: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: "Payment"
            }
        ],
        default: []
    }
}, {
    collection: "customerRelations",
});

CustomerRelationSchema.plugin(timestamps);
CustomerRelationSchema.index({
    createdAt: 1,
    updatedAt: 1,
});

const CustomerRelationModel = mongoose.model("CustomerRelation", CustomerRelationSchema);
const CustomerRelationTC = composeWithMongoose(CustomerRelationModel);

export {CustomerRelationModel, CustomerRelationTC, CustomerRelationSchema};
