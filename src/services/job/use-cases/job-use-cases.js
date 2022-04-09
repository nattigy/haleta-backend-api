import jobRepository from "../data-access/job-data-access";

const createJob = async ({location, pricePerHour}) => {
    try {
        return jobRepository.createJob({location, pricePerHour});
    } catch (error) {
        return Promise.reject(error);
    }
};

const getJob = async (jobId) => {
    try {
        return jobRepository.getJob(jobId)
    } catch (error) {
        return Promise.reject(error);
    }
}

const getJobs = async () => {
    try {
        return jobRepository.getJobs()
    } catch (error) {
        return Promise.reject(error);
    }
}

const updateJobInfo = async ({location, pricePerHour, customerRelation, jobId}) => {
    try {
        return jobRepository.updateJobInfo({
            location,
            pricePerHour,
            customerRelation,
            jobId
        })
    } catch (error) {
        return Promise.reject(error);
    }
}

const increaseTotalHours = async ({jobId, hours}) => {
    try {
        return jobRepository.increaseTotalHours({jobId, hours});
    } catch (error) {
        return Promise.reject(error);
    }
}

const decreaseTotalHours = async ({jobId, hours}) => {
    try {
        return jobRepository.decreaseTotalHours({jobId, hours});
    } catch (error) {
        return Promise.reject(error);
    }
}

const resetTotalHours = async ({jobId}) => {
    try {
        return jobRepository.resetTotalHours({jobId});
    } catch (error) {
        return Promise.reject(error);
    }
}

const deleteJob = async (jobId) => {
    try {
        await jobRepository.deleteJob(jobId)
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
};
