import {JobModel} from "../../../models/job";
import {CustomerRelationModel} from "../../../models/customerRelation";

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
        return JobModel.findByIdAndUpdate(jobId, {location, pricePerHour, customerRelation},{new:true});
    } catch (error) {
        return Promise.reject(error);
    }
}

const increaseTotalHours = async ({jobId, hours}) => {
    try {
        return JobModel.findByIdAndUpdate(jobId, {$inc: {totalHours: hours}},{new:true});
    } catch (error) {
        return Promise.reject(error);
    }
};

const decreaseTotalHours = async ({jobId, hours}) => {
    try {
        return JobModel.findByIdAndUpdate(jobId, {$inc: {totalHours: -hours}},{new:true});
    } catch (error) {
        return Promise.reject(error);
    }
};

const resetTotalHours = async ({jobId}) => {
    try {
        return JobModel.findByIdAndUpdate(jobId, {$set: {totalHours: 0}},{new:true});
    } catch (error) {
        return Promise.reject(error);
    }
};

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
    increaseTotalHours,
    decreaseTotalHours,
    resetTotalHours,
    deleteJob
}