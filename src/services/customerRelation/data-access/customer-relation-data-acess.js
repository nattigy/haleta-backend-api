import {CustomerRelationModel} from "../../../models/customerRelation";

const createCustomerRelation = async (customerId) => {
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
            {$inc: {totalHours: payment, currentPayment: payment}},
            {new: true},
        );
    } catch (error) {
        return Promise.reject(error);
    }
};

const decreasePayment = async ({customerRelationId, payment}) => {
    try {
        return CustomerRelationModel.findByIdAndUpdate(customerRelationId,
            {$inc: {totalHours: -payment, currentPayment: -payment}},
            {new: true},
        );
    } catch (error) {
        return Promise.reject(error);
    }
};

const resetTotalHours = async ({customerRelationId}) => {
    try {
        return CustomerRelationModel.findByIdAndUpdate(customerRelationId,
            {$set: {currentPayment: 0}},
            {new: true},
        );
    } catch (error) {
        return Promise.reject(error);
    }
};

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
    resetTotalHours,
    assignTutor,
    updateCustomerId,
    deleteCustomerRelation
}