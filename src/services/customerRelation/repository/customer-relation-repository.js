import customerRelationDataAccess from "../data-access/customer-relation-data-acess"

const createCustomerRelation = async (customerId) => {
    try {
        return customerRelationDataAccess.createCustomerRelation(customerId)
    } catch (error) {
        return Promise.reject(error);
    }
}

const getCustomerRelation = async (customerRelationId) => {
    try {
        return customerRelationDataAccess.getCustomerRelation(customerRelationId);
    } catch (error) {
        return Promise.reject(error);
    }
}

const increasePayment = async ({customerRelationId, payment}) => {
    try {
        return customerRelationDataAccess.increasePayment({customerRelationId, payment})
    } catch (error) {
        return Promise.reject(error);
    }
}

const decreasePayment = async ({customerRelationId, payment}) => {
    try {
        return customerRelationDataAccess.decreasePayment({customerRelationId, payment})
    } catch (error) {
        return Promise.reject(error);
    }
}

const resetTotalHours = async ({customerRelationId}) => {
    try {
        return customerRelationDataAccess.resetTotalHours({customerRelationId});
    } catch (error) {
        return Promise.reject(error);
    }
}

const assignTutor = async ({customerRelationId, tutorId}) => {
    try {
        return customerRelationDataAccess.assignTutor({customerRelationId, tutorId});
    } catch (error) {
        return Promise.reject(error);
    }
}

const updateCustomerId = async ({customerRelationId, customerId}) => {
    try {
        return customerRelationDataAccess.updateCustomerId({customerRelationId, customerId})
    } catch (error) {
        return Promise.reject(error);
    }
}

const deleteCustomerRelation = async ({relationId}) => {
    try {
        return customerRelationDataAccess.deleteCustomerRelation({relationId})
    } catch (error) {
        return Promise.reject(error);
    }
}

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