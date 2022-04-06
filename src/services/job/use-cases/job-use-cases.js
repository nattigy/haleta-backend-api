import jobRepository from "../data-access/job-data-access";

const createJob = async ({location, pricePerHour, user}) => {
    try {
        const jobId = await jobRepository.createJob({location, pricePerHour});
        await jobRepository.createCustomer(user._id, jobId);

        return jobId;
    } catch (error) {
        return Promise.reject(error);
    }
};

export default {
    createJob,
};
