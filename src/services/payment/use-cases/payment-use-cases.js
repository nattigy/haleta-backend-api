import paymentRepository from "../data-access/payment-data-access"

const createPayment = async ({month, customerRelation}) => {
    try {
        return paymentRepository.createPayment({month, customerRelation})
    } catch (error) {
        return Promise.reject(error);
    }
}

const getPayment = async (paymentId) => {
    try {
        return paymentRepository.getPayment(paymentId)
    } catch (error) {
        return Promise.reject(error);
    }
}

const getPayments = async () => {
    try {
        return paymentRepository.getPayments()
    } catch (error) {
        return Promise.reject(error);
    }
}

const increaseTotalAmount = async ({amount,paymentId}) => {
    try {
        const payment = await getPayment(paymentId);
        const totalAmount = payment.totalAmount + amount;
        return paymentRepository.updateTotalAmount({totalAmount,paymentId})
    } catch (error) {
        return Promise.reject(error);
    }
}

const decreaseTotalAmount = async ({amount,paymentId}) => {
    try {
        const payment = await getPayment(paymentId);
        const totalAmount = payment.totalAmount - amount;
        return paymentRepository.updateTotalAmount({totalAmount,paymentId})
    } catch (error) {
        return Promise.reject(error);
    }
}

const resetTotalAmount = async (paymentId) => {
    try {
        return paymentRepository.updateTotalAmount({totalAmount:0,paymentId:paymentId})
    } catch (error) {
        return Promise.reject(error);
    }
}

export default {
    createPayment,
    getPayment,
    getPayments,
    increaseTotalAmount,
    decreaseTotalAmount,
    resetTotalAmount
};