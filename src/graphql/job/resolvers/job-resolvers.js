import jobServices from "../../../services/job/use-cases/job-use-cases";
const createJob = {
  name: "createJob",
  type: "Id!",
  args: {
    location: "String",
    pricePerHour: "Number!",
  },
  resolve: async ({ args: { location, pricePerHour }, context: { user } }) => {
    try {
      const jobId = await jobServices.createJob({
        location,
        pricePerHour,
        user,
      });
      return {Id:jobId};
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

export default {
  createJob,
};
