import {CustomerModel} from "../../../models/customer";

const createCustomer = async (userId) => {
    try {
        let customer = await CustomerModel.findOne({userId});

        if (!customer) {
            customer = await CustomerModel.create({userId});
        }
        return customer;
    } catch (error) {
        return Promise.reject(error);
    }
};

const getCustomer = async (customerId) => {
    try {
        return CustomerModel.findById(customerId)
    } catch (error) {
        return Promise.reject(error);
    }
}

const updateCustomer = async (customerId) => {
    try {
        // update customer
    } catch (error) {
        return Promise.reject(error);
    }
}

export default {
    createCustomer,
    getCustomer,
    updateCustomer
}