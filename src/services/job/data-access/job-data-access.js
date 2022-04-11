import {JobModel} from "../../../models/job";

const createJob = async ({name, location, description, pricePerHour}) => {
    try {
        return JobModel.create({
            name,
            location,
            description,
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

const getJobPricePerHour = async (jobId) => {
    try {
        return JobModel.findById(jobId, {pricePerHour: 1});
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

const updateJobStatus = async ({jobId, status}) => {
    try {
        return JobModel.findByIdAndUpdate(jobId, {status}, {new: true});
    } catch (error) {
        return Promise.reject(error);
    }
}

const startJob = async ({jobId, startDate}) => {
    try {
        return JobModel.findByIdAndUpdate(jobId, {startDate, status: "STARTED"}, {new: true});
    } catch (error) {
        return Promise.reject(error);
    }
}

const endJob = async ({jobId, endDate}) => {
    try {
        return JobModel.findByIdAndUpdate(jobId, {endDate, status: "CLOSED"}, {new: true});
    } catch (error) {
        return Promise.reject(error);
    }
}

const updateJobInfo = async ({name, location, description, pricePerHour, jobId}) => {
    try {
        return JobModel.findByIdAndUpdate(jobId,
            {
                name,
                location,
                description,
                pricePerHour
            },
            {new: true},
        );
    } catch (error) {
        return Promise.reject(error);
    }
}

const updateJobCustomerRelationId = async ({customerRelationId, jobId}) => {
    try {
        return JobModel.findByIdAndUpdate(jobId, {customerRelationId}, {new: true});
    } catch (error) {
        return Promise.reject(error);
    }
}

const increaseTotalHours = async ({jobId, hours}) => {
    try {
        return JobModel.findByIdAndUpdate(jobId,
            {
                $inc: {
                    totalHours: hours,
                    totalPayment: "$pricePerHour" * hours,
                },
            },
            {new: true},
        );
    } catch (error) {
        return Promise.reject(error);
    }
};

const decreaseTotalHours = async ({jobId, hours}) => {
    try {
        return JobModel.findByIdAndUpdate(jobId,
            {
                $inc: {
                    totalHours: -hours,
                    totalPayment: -"$pricePerHour" * hours,
                },
            },
            {new: true},
        );
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
    updateJobStatus,
    updateJobInfo,
    updateJobCustomerRelationId,
    getJobPricePerHour,
    increaseTotalHours,
    decreaseTotalHours,
    deleteJob
}