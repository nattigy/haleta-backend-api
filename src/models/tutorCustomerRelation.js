import mongoose, {Schema} from "mongoose";
import timestamps from "mongoose-timestamp";
import {composeWithMongoose} from "graphql-compose-mongoose";

const TutorCustomerRelationSchema = new Schema({
    tutorId: {
        type: Schema.Types.ObjectId,
        ref: "Tutor",
    },
    customerId: {
        type: Schema.Types.ObjectId,
        ref: "Customer",
    },
    payments: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: "Payment"
            }
        ],
        default: []
    },
}, {
    collection: "tutorCustomerRelations",
});

TutorCustomerRelationSchema.plugin(timestamps);
TutorCustomerRelationSchema.index({
    createdAt: 1,
    updatedAt: 1,
});

const TutorCustomerRelationModel = mongoose.model("TutorCustomerRelation", TutorCustomerRelationSchema);
const TutorCustomerRelationTC = composeWithMongoose(TutorCustomerRelationModel);

export {TutorCustomerRelationModel, TutorCustomerRelationTC, TutorCustomerRelationSchema};
