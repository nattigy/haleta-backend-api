import mongoose, {Schema} from "mongoose";
import timestamps from "mongoose-timestamp";
import {composeWithMongoose} from "graphql-compose-mongoose";

const SingleProgressSchema = new Schema({
    date: Date,
    startTime: Date,
    endTime: Date,
    duration: Number,
    rate: Number,
    description: String,
    remark: {
        type: Boolean,
        default: false
    },
    jobId: {
        type: Schema.Types.ObjectId,
        ref: "Job",
    },
});

const PaymentSchema = new Schema({
    month: String,
    reminderNote: String,
    startDate: Date,
    endDate: Date,
    totalAmount: {
        type: Number,
        default: 0,
    },
    totalHours: {
        type: Number,
    },
    ourCut: {
        type: Number,
    },
    discount: {
        type: Number,
        default: 0,
    },
    netPayment: {
        type: Number,
    },
    tutorDepositedAt: {
        type: Date,
        default: null,
    },
    customerPaidAt: {
        type: Date,
        default: null,
    },
    tutorReceipt: String,
    customerReceipt: String,
    status: {
        type: String,
        default: "ACTIVE",
        enum: ["ACTIVE", "PAUSED", "PENDING", "PAYED", "ERROR", "CLOSED"],
    },
    customerRelation: {
        type: Schema.Types.ObjectId,
        ref: "CustomerRelation",
    },
    progressList: {
        type: [SingleProgressSchema],
        default: [],
    },
    jobs: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: "Job",
            }
        ],
        default: []
    }
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
