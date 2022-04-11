import mongoose, {Schema} from "mongoose";
import timestamps from "mongoose-timestamp";
import {composeWithMongoose} from "graphql-compose-mongoose";

const PaymentSchema = new Schema({
    month: String,
    totalAmount: {
        type: Number,
        default: 0,
    },
    customerRelation: {
        type: Schema.Types.ObjectId,
        ref: "CustomerRelation",
    },
}, {
    collection: "payments",
});

PaymentSchema.plugin(timestamps);
PaymentSchema.index({
    createdAt: 1,
    updatedAt: 1,
});

const PaymentModel = mongoose.model("Payment", PaymentSchema);
const PaymentTC = composeWithMongoose(PaymentModel);

export {PaymentModel, PaymentTC, PaymentSchema};
