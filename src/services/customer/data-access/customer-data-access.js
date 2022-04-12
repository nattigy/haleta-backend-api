import {CustomerModel} from "../../../models/customer";

const createCustomer = async (userId) => {
    try {
        let customer = await CustomerModel.findOne({userId});

        if (customer) {
            return customer;
        }
        return CustomerModel.create({userId});
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

const getCustomers = async () => {
    try {
        return CustomerModel.find()
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

const deleteCustomer = async (customerId) => {
    try {
        await CustomerModel.findByIdAndDelete(customerId)
    } catch (error) {
        return Promise.reject(error);
    }
}

export default {
    createCustomer,
    getCustomer,
    getCustomers,
    updateCustomer,
    deleteCustomer
}