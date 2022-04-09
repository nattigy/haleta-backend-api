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

const updateTotalAmount = async ({totalAmount, paymentId}) => {
    try {
        PaymentModel.findByIdAndUpdate(paymentId, {totalAmount})
        return getPayment(paymentId)
    } catch (error) {
        return Promise.reject(error);
    }
}

export default {
    createPayment,
    getPayment,
    getPayments,
    updateTotalAmount
};