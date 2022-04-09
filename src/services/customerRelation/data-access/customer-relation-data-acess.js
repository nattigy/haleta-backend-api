import {CustomerRelationModel} from "../../../models/customerRelation";
import {ProgressModel} from "../../../models/progress";

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

const increaseTotalHours = async ({customerRelationId, hours}) => {
    try {
        return CustomerRelationModel.findByIdAndUpdate(customerRelationId, {$inc: {totalHours: hours}},{new:true});
    } catch (error) {
        return Promise.reject(error);
    }
};

const decreaseTotalHours = async ({customerRelationId, hours}) => {
    try {
        return CustomerRelationModel.findByIdAndUpdate(customerRelationId, {$inc: {totalHours: -hours}},{new:true});
    } catch (error) {
        return Promise.reject(error);
    }
};

const resetTotalHours = async ({customerRelationId}) => {
    try {
        return CustomerRelationModel.findByIdAndUpdate(customerRelationId, {$set: {totalHours: 0}},{new:true});
    } catch (error) {
        return Promise.reject(error);
    }
};

const assignTutor = async ({customerRelationId, tutorId}) => {
    try {
        return CustomerRelationModel.findByIdAndUpdate(customerRelationId, {tutorId},{new:true});
    } catch (error) {
        return Promise.reject(error);
    }
}

const updateCustomer = async ({customerRelationId, customerId}) => {
    try {
        return CustomerRelationModel.findByIdAndUpdate(customerRelationId, {customerId},{new:true});
    } catch (error) {
        return Promise.reject(error);
    }
}

export default {
    createCustomerRelation,
    getCustomerRelation,
    increaseTotalHours,
    decreaseTotalHours,
    resetTotalHours,
    assignTutor,
    updateCustomer
}