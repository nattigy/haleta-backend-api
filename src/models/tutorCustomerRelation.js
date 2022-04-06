import mongoose, {Schema} from "mongoose";
import timestamps from "mongoose-timestamp";
import {composeWithMongoose} from "graphql-compose-mongoose";
import PaymentSchema from "./payment";

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
        type: [PaymentSchema],
        default: []
    }
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
