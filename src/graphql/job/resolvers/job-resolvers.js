import jobServices from "../../../services/job/use-cases/job-use-cases";

const createJob = {
    name: "createJob",
    type: "job!",
    args: {
        location: "String",
        pricePerHour: "Float!",
    },
    resolve: async ({args: {location, pricePerHour, userId}}) => {
        try {
            const job = await jobServices.createJob({
                location,
                pricePerHour,
                userId,
            });
            return {job};
        } catch (error) {
            return Promise.reject(error);
        }
    },
};

const assignTutor = {
    name: "assignTutor",
    type: "Succeed!",
    args: {
        tutorId: "String",
        jobId: "String",
        customerId: "String"
    },
    resolve: async ({args: {tutorId, jobId, customerId}}) => {
        try {
            await jobServices.assignTutor({tutorId, jobId, customerId})
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

export default {
    createJob,
    assignTutor
};
