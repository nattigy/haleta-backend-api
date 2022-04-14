import jobDataAccess from "../data-access/job-data-access";

const createJob = async ({name, location, description, pricePerHour}) => {
    try {
        return jobDataAccess.createJob({name, location, description, pricePerHour});
    } catch (error) {
        return Promise.reject(error);
    }
};

const getJob = async (jobId) => {
    try {
        return jobDataAccess.getJob({jobId});
    } catch (error) {
        return Promise.reject(error);
    }
}

const getJobPricePerHour = async (jobId) => {
    try {
        return jobDataAccess.getJobPricePerHour({jobId});
    } catch (error) {
        return Promise.reject(error);
    }
}

const getJobs = async () => {
    try {
        return jobDataAccess.getJobs();
    } catch (error) {
        return Promise.reject(error);
    }
}

const updateJobStatus = async ({jobId, status}) => {
    try {
        return jobDataAccess.updateJobStatus({jobId, status});
    } catch (error) {
        return Promise.reject(error);
    }
}

const startJob = async ({jobId, startDate}) => {
    try {
        return jobDataAccess.startJob({jobId, startDate});
    } catch (error) {
        return Promise.reject(error);
    }
}

const endJob = async ({jobId, endDate}) => {
    try {
        return jobDataAccess.endJob({jobId, endDate});
    } catch (error) {
        return Promise.reject(error);
    }
}

const updateJobInfo = async ({name, location, description, pricePerHour, jobId}) => {
    try {
        return jobDataAccess.updateJobInfo({name, location, description, pricePerHour, jobId});
    } catch (error) {
        return Promise.reject(error);
    }
}

const updateJobCustomerRelationId = async ({customerRelationId, jobId}) => {
    try {
        return jobDataAccess.updateJobCustomerRelationId({customerRelationId, jobId});
    } catch (error) {
        return Promise.reject(error);
    }
}

const increaseTotalHours = async ({jobId, hours}) => {
    try {

        return jobDataAccess.increaseTotalHours({jobId, hours});

    } catch (error) {
        return Promise.reject(error);
    }
};

const decreaseTotalHours = async ({jobId, hours}) => {
    try {
        return jobDataAccess.decreaseTotalHours({jobId, hours});

    } catch (error) {
        return Promise.reject(error);
    }
};

const deleteJob = async (jobId) => {
    try {
        return jobDataAccess.deleteJob({jobId});
    } catch (error) {
        return Promise.reject(error);
    }
}

export default {
    createJob,
    getJob,
    getJobs,
    updateJobStatus,
    startJob,
    endJob,
    updateJobInfo,
    updateJobCustomerRelationId,
    getJobPricePerHour,
    increaseTotalHours,
    decreaseTotalHours,
    deleteJob
}