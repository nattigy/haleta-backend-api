import {PaymentModel} from "../../../models/payment";

const createPayment = async ({month, date, startDate, endDate, customerRelation, jobs}) => {
    try {
        return PaymentModel.create({month, date, startDate, endDate, customerRelation, jobs})
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

const getPaymentStatus = async (paymentId) => {
    try {
        return PaymentModel.findById(paymentId, {status: 1});
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

const updatePaymentStatus = async ({paymentId, status}) => {
    try {
        return PaymentModel.findByIdAndUpdate(paymentId, {status}, {new: true});
    } catch (error) {
        return Promise.reject(error);
    }
}

const endPayment = async ({paymentId, endDate}) => {
    try {
        return PaymentModel.findByIdAndUpdate(paymentId, {endDate, status: "PENDING"}, {new: true});
    } catch (error) {
        return Promise.reject(error);
    }
};

const extendPaymentEndDate = async ({paymentId, endDate}) => {
    try {
        return PaymentModel.findByIdAndUpdate(paymentId, {endDate}, {new: true});
    } catch (error) {
        return Promise.reject(error);
    }
};

const addNewProgressList = async (
    {
        paymentId,
        date,
        startTime,
        endTime,
        rate,
        description,
        jobId,
    }) => {
    try {
        return PaymentModel.findByIdAndUpdate(paymentId,
            {
                $addToSet: {
                    progressList: {
                        date,
                        startTime,
                        endTime,
                        duration: Math.abs(endTime - startTime),
                        rate,
                        description,
                        remark: false,
                        jobId,
                    }
                },
                $inc: {totalAmount: rate * Math.abs(endTime - startTime)}
            }, {new: true});
    } catch (error) {
        return Promise.reject(error);
    }
};

const updateSingleProgress = async ({
                                        paymentId,
                                        progressId,
                                        date,
                                        startTime,
                                        endTime,
                                        description
                                    }) => {
    try {
        const prev = PaymentModel.findOne(
            {_id: paymentId, "progressList._id": progressId},
            {progressList: 1});

        if (!prev) {
            return Promise.reject(new Error("Progress not found."));
        }

        if (prev.progressList[0].remark === true) {
            return Promise.reject(new Error("You can not modify once it is accepted."));
        }

        const rate = prev.progressList[0].rate;
        const prevAmount = rate * prev.progressList[0].duration;
        return PaymentModel.updateOne(
            {_id: paymentId, "progressList._id": progressId},
            {
                $set: {
                    "progressList.$.date": date,
                    "progressList.$.startTime": startTime,
                    "progressList.$.endTime": endTime,
                    "progressList.$.duration": Math.abs(endTime - startTime),
                    "progressList.$.description": description,
                    "progressList.$.remark": false,
                },
                $inc: {totalAmount: (-prevAmount + (Math.abs(endTime - startTime) * rate))},
            },
            {new: true}
        );
    } catch (error) {
        return Promise.reject(error);
    }
};

const removeProgressFromList = async (
    {
        paymentId,
        progressId,
    }) => {
    try {
        const prev = PaymentModel.findOne(
            {_id: paymentId, "progressList._id": progressId},
            {progressList: 1});

        if (!prev) {
            return Promise.reject(new Error("Progress not found."));
        }

        if (prev.progressList[0].remark === true) {
            return Promise.reject(new Error("You can not modify once it is accepted."));
        }

        const amount = prev.progressList[0].rate * prev.progressList[0].duration;
        return PaymentModel.updateOne(
            {_id: paymentId, "progressList._id": progressId},
            {
                $inc: {totalAmount: -amount},
                $pull: {progressList: {"progressList._id": progressId}}
            }, {new: true});
    } catch (error) {
        return Promise.reject(error);
    }
};

const updateRemark = async ({
                                paymentId,
                                progressId,
                                remark
                            }) => {
    try {
        return PaymentModel.updateOne(
            {_id: paymentId, "progressList._id": progressId},
            {
                $set: {
                    "progressList.$.remark": remark,
                },
            },
            {new: true}
        );
    } catch (error) {
        return Promise.reject(error);
    }
};

const deletePayment = async (paymentId) => {
    try {
        await PaymentModel.findByIdAndDelete(paymentId);
    } catch (error) {
        return Promise.reject(error);
    }
};

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
    updateSingleProgress,
    updateRemark,
    deletePayment,
};