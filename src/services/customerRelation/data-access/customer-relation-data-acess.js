import {CustomerRelationModel} from "../../../models/customerRelation";

const createCustomerRelation = async ({customerId}) => {
    try {
        return CustomerRelationModel.create({customerId})
    } catch (error) {
        return Promise.reject(error);
    }
}

const getCustomerRelation = async (customerRelationId) => {
    try {
        return CustomerRelationModel.findById(customerRelationId);
    } catch (error) {
        return Promise.reject(error);
    }
}

const increasePayment = async ({customerRelationId, payment}) => {
    try {
        return CustomerRelationModel.findByIdAndUpdate(customerRelationId,
            {$inc: {totalHours: payment}},
            {new: true},
        );
    } catch (error) {
        return Promise.reject(error);
    }
};

const decreasePayment = async ({customerRelationId, payment}) => {
    try {
        return CustomerRelationModel.findByIdAndUpdate(customerRelationId,
            {$inc: {totalHours: -payment}},
            {new: true},
        );
    } catch (error) {
        return Promise.reject(error);
    }
};

const addJob = async ({customerRelationId, jobId}) => {
    try {
        return CustomerRelationModel.findByIdAndUpdate(customerRelationId, {
            $addToSet: {jobs: jobId}
        }, {new: true});
    } catch (error) {
        return Promise.reject(error);
    }
}

const addJobs = async ({customerRelationId, jobIds}) => {
    try {
        return CustomerRelationModel.findByIdAndUpdate(customerRelationId, {
            $addToSet: {jobs: {$each: jobIds}}
        }, {new: true});
    } catch (error) {
        return Promise.reject(error);
    }
}

const removeJob = async ({customerRelationId, jobId}) => {
    try {
        return CustomerRelationModel.findByIdAndUpdate(customerRelationId, {
            $pull: {jobs: jobId}
        }, {new: true});
    } catch (error) {
        return Promise.reject(error);
    }
}

const addPayment = async ({customerRelationId, paymentId}) => {
    try {
        return CustomerRelationModel.findByIdAndUpdate(customerRelationId, {
            $addToSet: {payments: paymentId}
        }, {new: true});
    } catch (error) {
        return Promise.reject(error);
    }
}

const addPayments = async ({customerRelationId, paymentIds}) => {
    try {
        return CustomerRelationModel.findByIdAndUpdate(customerRelationId, {
            $addToSet: {payments: {$each: paymentIds}}
        }, {new: true});
    } catch (error) {
        return Promise.reject(error);
    }
}

const removePayment = async ({customerRelationId, paymentId}) => {
    try {
        return CustomerRelationModel.findByIdAndUpdate(customerRelationId, {
            $pull: {payments: paymentId}
        }, {new: true});
    } catch (error) {
        return Promise.reject(error);
    }
}

const assignTutor = async ({customerRelationId, tutorId}) => {
    try {
        return CustomerRelationModel.findByIdAndUpdate(customerRelationId, {tutorId}, {new: true});
    } catch (error) {
        return Promise.reject(error);
    }
}

const updateCustomerId = async ({customerRelationId, customerId}) => {
    try {
        return CustomerRelationModel.findByIdAndUpdate(customerRelationId, {customerId}, {new: true});
    } catch (error) {
        return Promise.reject(error);
    }
}

const updateTutorId = async ({customerRelationId, tutorId}) => {
    try {
        return CustomerRelationModel.findByIdAndUpdate(customerRelationId, {tutorId}, {new: true});
    } catch (error) {
        return Promise.reject(error);
    }
}

const deleteCustomerRelation = async (relationId) => {
    try {
        await CustomerRelationModel.findByIdAndDelete(relationId);
    } catch (error) {
        return Promise.reject(error);
    }
};

export default {
    createCustomerRelation,
    getCustomerRelation,
    increasePayment,
    decreasePayment,
    addJob,
    addJobs,
    removeJob,
    addPayment,
    addPayments,
    removePayment,
    updateTutorId,
    assignTutor,
    updateCustomerId,
    deleteCustomerRelation
}