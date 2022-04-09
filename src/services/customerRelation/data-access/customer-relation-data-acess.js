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

const updateTotalHours = async ({totalHours, customerRelationId}) => {
    try {
        await CustomerRelationModel.findByIdAndUpdate(customerRelationId, {totalHours});
        return getCustomerRelation(customerRelationId);
    } catch (error) {
        return Promise.reject(error);
    }
}

const assignTutor = async ({customerRelationId, tutorId}) => {
    try {
        await CustomerRelationModel.findByIdAndUpdate(customerRelationId, {tutorId});
        return getCustomerRelation(customerRelationId);
    } catch (error) {
        return Promise.reject(error);
    }
}

const updateCustomer = async ({customerRelationId, customerId}) => {
    try {
        await CustomerRelationModel.findByIdAndUpdate(customerRelationId, {customerId});
        return getCustomerRelation(customerRelationId)
    } catch (error) {
        return Promise.reject(error);
    }
}

export default {
    createCustomerRelation,
    getCustomerRelation,
    updateTotalHours,
    assignTutor,
    updateCustomer
}