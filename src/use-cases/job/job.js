import paymentRepository from "../../services/payment/repository/payment-repository";

const createJobAdmin = () => {
    //create user
    //create customer
    //create customer relation
    //create jobs
}

const createCustomerRelation = () => {
    //create customer relation
}

const createJob = () => {
    //create job using customer relation id
    //add job id to customer relation
}

const startJob = () => {
    //update job status to started and set start date
}

const finishJob = () => {
    //check if there are unaccepted progresses (for that job) on all payments
    //set end date, and set status to closed
}

const startMonth = () => {
    //check if there are any started jobs
    //create payment from relation, and add all list of job ids
    //set start date and end date, and status to active
}

const addProgress = () => {
    //check the if the job is started
    //get rate from job using the job id
    //check if job is on the payment's customer relation table
    //add progress to payment using payment id, calculate net, total and our cut
    //add the amount to the job (total hours, and total payment)
}

const finishMonth = async ({paymentId,endDate,status}) => {
    //set end date, and set status to pending on the payment
    await paymentRepository.updatePaymentStatus({paymentId,status});
    return paymentRepository.endPayment({paymentId,endDate});
}

const pausePayment = () => {
    //check if it is active if not it can not be paused
}

const closePayment = () => {
    //only admin
    //check for unaccepted progresses
    //check if it is (paid or error) if not it can not be closed
}

const errorPayment = () => {
    //check for unaccepted progresses
    //add reminder note
}

const acceptProgress = async ({paymentId,progressId}) => {
    //only parent
    //single progresses
    return paymentRepository.updateRemark({paymentId,progressId,remark:true})
}

const acceptAllProgresses = () => {
    //only parent
    //accept all progresses
}

const customerMakeDeposit = () => {
    //only customer
    //check all unaccepted progresses
    //add payment information, set customerPaidAt
}

const tutorMakeDeposit = () => {
    //only tutor
    //check all if customer has deposited
    //add payment information, set tutorDepositedAt
    //change payment status to paid
}

