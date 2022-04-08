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

export default {
    createJob,
    getJob,
    getJobs,
    updateJobInfo
};
