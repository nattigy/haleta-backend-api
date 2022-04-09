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

const increaseTotalHours = async ({hours, customerRelationId}) => {
    try {
        const customerRelation = await getCustomerRelation(customerRelationId);
        const totalHours = customerRelation.totalHours + hours;
        return customerRelationRepository.updateTotalHours({totalHours, customerRelationId})
    } catch (error) {
        return Promise.reject(error);
    }
}

const decreaseTotalHours = async ({hours, customerRelationId}) => {
    try {
        const customerRelation = await getCustomerRelation(customerRelationId);
        const totalHours = customerRelation.totalHours - hours;
        return customerRelationRepository.updateTotalHours({totalHours, customerRelationId})
    } catch (error) {
        return Promise.reject(error);
    }
}

const resetTotalHours = async (customerRelationId) => {
    try {
        return customerRelationRepository.updateTotalHours({totalHours: 0, customerRelationId: customerRelationId});
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