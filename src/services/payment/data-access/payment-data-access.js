import {PaymentModel} from "../../../models/payment";

const createPayment = async ({month, customerRelation}) => {
    try {
        return PaymentModel.create({month, customerRelation})
    } catch (error) {
        return Promise.reject(error);
    }
}

const getPayment = async (paymentId) => {
    try {
        return PaymentModel.findById(paymentId);
    } catch (error) {
        return Promise.reject(error);
    }
}

const getPayments = async () => {
    try {
        return PaymentModel.find();
    } catch (error) {
        return Promise.reject(error);
    }
}

const increaseTotalAmount = async ({paymentId, amount}) => {
    try {
        return PaymentModel.findByIdAndUpdate(paymentId,
            {$inc: {totalAmount: amount}},
            {new: true},
        );
    } catch (error) {
        return Promise.reject(error);
    }
};

const decreaseTotalAmount = async ({paymentId, amount}) => {
    try {
        return PaymentModel.findByIdAndUpdate(paymentId,
            {$inc: {totalAmount: -amount}},
            {new: true},
        );
    } catch (error) {
        return Promise.reject(error);
    }
};

export default {
    createPayment,
    getPayment,
    getPayments,
    increaseTotalAmount,
    decreaseTotalAmount,
};