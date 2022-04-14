import paymentDataAccess from "../data-access/payment-data-access"
import {PaymentModel} from "../../../models/payment";

const createPayment = async ({month, date, startDate, endDate, customerRelation, jobs}) => {
    try {
        return paymentDataAccess.createPayment({month, date, startDate, endDate, customerRelation, jobs})
    } catch (error) {
        return Promise.reject(error);
    }
}

const getPayment = async (paymentId) => {
    try {
        return paymentDataAccess.getPayment(paymentId)
    } catch (error) {
        return Promise.reject(error);
    }
}

const getPaymentStatus = async (paymentId) => {
    try {
        return paymentDataAccess.getPaymentStatus(paymentId);
    } catch (error) {
        return Promise.reject(error);
    }
}

const getPayments = async () => {
    try {
        return paymentDataAccess.getPayments()
    } catch (error) {
        return Promise.reject(error);
    }
}

const updatePaymentStatus = async ({paymentId, status}) => {
    try {
        return paymentDataAccess.updatePaymentStatus({paymentId,status});
    } catch (error) {
        return Promise.reject(error);
    }
}

const endPayment = async ({paymentId, endDate}) => {
    try {
        return paymentDataAccess.endPayment({paymentId,endDate});
    } catch (error) {
        return Promise.reject(error);
    }
};

const extendPaymentEndDate = async ({paymentId, endDate}) => {
    try {
        return paymentDataAccess.extendPaymentEndDate({paymentId,endDate});
    } catch (error) {
        return Promise.reject(error);
    }
};

const addNewProgressList = async ({paymentId, date, startTime, endTime, rate, description, jobId}) => {
    try {
        return paymentDataAccess.addNewProgressList(
            {paymentId, date, startTime, endTime, rate, description, jobId})
    } catch (error) {
        return Promise.reject(error);
    }
};

const findSingleProgress = async ({paymentId, progressId}) => {
    try {
        return paymentDataAccess.findSingleProgress({paymentId, progressId});
    } catch (error) {
        return Promise.reject(error);
    }
};

const updateSingleProgress = async ({paymentId, progressId, date, startTime, endTime, description}) => {
    try {
        return paymentDataAccess.updateSingleProgress({
            paymentId, progressId, date, startTime, endTime, description}
        );
    } catch (error) {
        return Promise.reject(error);
    }
}

const removeProgressFromList = async ({paymentId, progressId}) => {
    try {
        return paymentDataAccess.removeProgressFromList({paymentId, progressId});
    } catch (error) {
        return Promise.reject(error);
    }
}

const updateRemark = async ({paymentId, progressId, remark}) => {
    try {
        return paymentDataAccess.updateRemark({paymentId, progressId, remark});
    } catch (error) {
        return Promise.reject(error);
    }
}

const deletePayment = async (paymentId) => {
    try {
        return paymentDataAccess.deletePayment(paymentId);
    } catch (error) {
        return Promise.reject(error);
    }
}

export default {
    createPayment,
    getPayment,
    getPayments,
    getPaymentStatus,
    updatePaymentStatus,
    endPayment,
    extendPaymentEndDate,
    addNewProgressList,
    removeProgressFromList,
    findSingleProgress,
    updateSingleProgress,
    updateRemark,
    deletePayment,
};