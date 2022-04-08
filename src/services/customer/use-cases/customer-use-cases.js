import customerRepository from "../data-access/customer-data-access"

const createCustomer = async (userId) => {
    try {
        return customerRepository.createCustomer(userId);
    } catch (error) {
        return Promise.reject(error);
    }
};

const getCustomer = async (customerId) => {
    try {
        return customerRepository.getCustomer(customerId);
    } catch (error) {
        return Promise.reject(error);
    }
}

const updateCustomer = async (customerId) => {
    try {
        await customerRepository.updateCustomer(customerId)
        return getCustomer(customerId)
    } catch (error) {
        return Promise.reject(error);
    }
}

export default {
    createCustomer,
    getCustomer,
    updateCustomer
};
