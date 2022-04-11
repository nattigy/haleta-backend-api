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

const increaseTotalAmount = async ({paymentId, amount}) => {
    try {
        return paymentRepository.increaseTotalAmount({paymentId,amount})
    } catch (error) {
        return Promise.reject(error);
    }
}

const decreaseTotalAmount = async ({paymentId, amount}) => {
    try {
        return paymentRepository.decreaseTotalAmount({paymentId,amount})
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
};