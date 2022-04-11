import customerDataAccess from "../data-access/customer-data-access"

const createCustomer = async (userId) => {
    try {
        return customerDataAccess.createCustomer(userId);
    } catch (error) {
        return Promise.reject(error);
    }
};

const getCustomer = async (customerId) => {
    try {
        return customerDataAccess.getCustomer(customerId);
    } catch (error) {
        return Promise.reject(error);
    }
}

const updateCustomer = async (customerId) => {
    try {
        await customerDataAccess.updateCustomer(customerId)
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
