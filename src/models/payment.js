import mongoose, {Schema} from "mongoose";
import timestamps from "mongoose-timestamp";
import {composeWithMongoose} from "graphql-compose-mongoose";

const PaymentSchema = new Schema({
    month: String,
    jobs: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: "Job"
            }
        ],
        default: []
    },
    total: Number,
    progresses: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: "Progress"
            }
        ],
        default: []
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
