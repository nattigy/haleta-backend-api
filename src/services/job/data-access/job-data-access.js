import {JobModel} from "../../../models/job";

const createJob = async ({location, pricePerHour}) => {
    try {
        return JobModel.create({
            location,
            pricePerHour
        });
    } catch (error) {
        return Promise.reject(error);
    }
};

const getJob = async (jobId) => {
    try {
        return JobModel.findById(jobId);
    } catch (error) {
        return Promise.reject(error);
    }
}

const getJobs = async () => {
    try {
        return JobModel.find();
    } catch (error) {
        return Promise.reject(error);
    }
}

const updateJobInfo = async ({location, pricePerHour, customerRelation, jobId}) => {
    try {
        await JobModel.findByIdAndUpdate(jobId, {location, pricePerHour, customerRelation});
        return getJob(jobId);
    } catch (error) {
        return Promise.reject(error);
    }
}

const updateTotalHours = async ({totalHours, jobId}) => {
    try {
        await JobModel.findByIdAndUpdate(jobId, {totalHours});
        return getJob(jobId);
    } catch (error) {
        return Promise.reject(error);
    }
}

const deleteJob = async (jobId) => {
    try {
        await JobModel.findByIdAndDelete(jobId);
    } catch (error) {
        return Promise.reject(error);
    }
}

export default {
    createJob,
    getJob,
    getJobs,
    updateJobInfo,
    updateTotalHours,
    deleteJob
}