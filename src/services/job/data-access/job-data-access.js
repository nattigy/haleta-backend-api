import {CustomerModel} from "../../../models/customer";
import {JobModel} from "../../../models/job";


const createJob = async ({location, pricePerHour}) => {
    try {

        const job = await JobModel.create({
            location,
            pricePerHour
        });

        return job._id

    } catch (error) {
        return Promise.reject(error);
    }
};

const updateJobId = async (jobId, customerId) => {
    try {

        const job = await CustomerModel.findByIdAndUpdate(customerId, {$push: {jobIds: jobId}});

        return job._id

    } catch (error) {
        return Promise.reject(error);
    }
};

export default {
    createJob,
}