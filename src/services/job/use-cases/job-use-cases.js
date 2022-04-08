import jobRepository from "../data-access/job-data-access";

const createJob = async ({location, pricePerHour}) => {
    try { 
        const job = await jobRepository.createJob({location, pricePerHour});
        return job;
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
        const job = getJob(jobId)
        const newLocation = location || job.location
        const newPrice = pricePerHour || job.pricePerHour
        const newCustomerRelation = customerRelation || job.customerRelation

        return jobRepository.updateJobInfo({
            location: newLocation,
            pricePerHour: newPrice,
            customerRelation: newCustomerRelation,
            jobId: jobId
        })
    } catch (error) {
        return Promise.reject(error);
    }
}

const increaseTotalHours = async ({hours,jobId}) => {
    try {
        const oldAmount = (getJob(jobId)).totalHours;
        const newAmount = oldAmount + hours
        return jobRepository.increaseTotalHours({totalHours:newAmount,jobId:jobId});
    } catch (error) {
        return Promise.reject(error);
    }
}

const decreaseTotalHours = async ({hours,jobId}) => {
    try {
        const oldAmount = (getJob(jobId)).totalHours;
        const newAmount = oldAmount - hours
        return jobRepository.decreaseTotalHours({totalHours:newAmount,jobId});
    } catch (error) {
        return Promise.reject(error);
    }
}

const resetTotalHours = async (jobId) => {
    try {
        return jobRepository.resetTotalHours(jobId);
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
