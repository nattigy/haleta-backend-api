import {CustomerModel} from "../../../models/customer";
import {JobModel} from "../../../models/job";


const createJob = async ({location, pricePerHour}) => {
    try {

        const job = await JobModel.create({
            location,
            pricePerHour
        });

        return job

    } catch (error) {
        return Promise.reject(error);
    }
};

const getJob = async (jobId) => {
    try {
        return JobModel.findById(jobId)

    } catch (error) {
        return Promise.reject(error);
    }
}

const getJobs = async () => {
    try {
        return JobModel.find()
    } catch (error) {
        return Promise.reject(error);
    }
}

const updateJobInfo = async ({location, pricePerHour, customerRelation, jobId}) => {
    try {
        await UserModel.findByIdAndUpdate(jobId,{location, pricePerHour, customerRelation})
        return getJob(jobId)
    } catch (error) {
        return Promise.reject(error);
    }
}

export default {
    createJob,
    getJob,
    getJobs,
    updateJobInfo
}