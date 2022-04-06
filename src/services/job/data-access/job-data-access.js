import { CustomerModel } from "../../../models/customer";
import { JobModel } from "../../../models/job";

const createCustomer = async (userId, jobId) => {
    try {
      let customer = await CustomerModel.findOne({userId});
      
      if (!customer) {
        customer = await CustomerModel.create({
            userId: userId,
           }); 
      }
      updateJobId(jobId, customer.id);
      return customer._id
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createJob = async ({location, pricePerHour}) => {
    try {
      
        const job = await JobModel.create({
            location,
            pricePerHour
           }); 

      return job._id

    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateJobId = async (jobId, customerId) => {
    try {
       
        const job = await CustomerModel.findByIdAndUpdate(customerId, {$push:{jobIds: jobId}});

      return job._id

    } catch (error) {
      return Promise.reject(error);
    }
  };

  export default {
      createCustomer,
      createJob,
  }