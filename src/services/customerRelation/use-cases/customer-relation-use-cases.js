import customerRelationRepository from "../data-access/customer-relation-data-acess"

const createCustomerRelation = async (customerId) => {
    try {
        return customerRelationRepository.createCustomerRelation(customerId)
    } catch (error) {
        return Promise.reject(error);
    }
}

const getCustomerRelation = async (customerRelationId) => {
    try {
        return customerRelationRepository.getCustomerRelation(customerRelationId);
    } catch (error) {
        return Promise.reject(error);
    }
}

const increaseTotalHours = async ({customerRelationId, hours}) => {
    try {
        return customerRelationRepository.increaseTotalHours({customerRelationId, hours})
    } catch (error) {
        return Promise.reject(error);
    }
}

const decreaseTotalHours = async ({customerRelationId, hours}) => {
    try {
        return customerRelationRepository.decreaseTotalHours({customerRelationId, hours})
    } catch (error) {
        return Promise.reject(error);
    }
}

const resetTotalHours = async ({customerRelationId}) => {
    try {
        return customerRelationRepository.resetTotalHours({customerRelationId});
    } catch (error) {
        return Promise.reject(error);
    }
}

const assignTutor = async ({customerRelationId, tutorId}) => {
    try {
        return customerRelationRepository.assignTutor({customerRelationId, tutorId});
    } catch (error) {
        return Promise.reject(error);
    }
}

const updateCustomer = async ({customerRelationId, customerId}) => {
    try {
        return customerRelationRepository.updateCustomer({customerRelationId, customerId})
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