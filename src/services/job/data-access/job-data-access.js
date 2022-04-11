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
        return JobModel.findByIdAndUpdate(jobId,
            {location, pricePerHour, customerRelation},
            {new: true},
        );
    } catch (error) {
        return Promise.reject(error);
    }
}

const updateJobCustomerRelationId = async ({customerRelation, jobId}) => {
    try {
        return JobModel.findByIdAndUpdate(jobId, {customerRelation}, {new: true});
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
                    currentHours: hours,
                    totalPayment: "$pricePerHour" * hours,
                    currentPayment: "$pricePerHour" * hours
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
                    currentHours: -hours,
                    totalPayment: -"$pricePerHour" * hours,
                    currentPayment: -"$pricePerHour" * hours
                },
            },
            {new: true},
        );
    } catch (error) {
        return Promise.reject(error);
    }
};

const resetTotalHours = async ({jobId}) => {
    try {
        return JobModel.findByIdAndUpdate(jobId,
            {$set: {currentHours: 0, currentPayment: 0}},
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
    updateJobInfo,
    updateJobCustomerRelationId,
    increaseTotalHours,
    decreaseTotalHours,
    resetTotalHours,
    deleteJob
}