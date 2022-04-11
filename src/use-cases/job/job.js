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

const startMonth = () => {
    //check if there are any started jobs
    //create payment from relation, and add all list of job ids
    //set start date and end date, and status to active
}

const addProgress = () => {
    //check the job status first
    //get rate from job using the job id
    //check if job is on the payment's customer relation table
    //add progress to payment using payment id, calculate net, total and our cut
    //add the amount to the job (total hours, and total payment)
}

const finishMonth = () => {
    //set end date, and set status to pending on the payment
}

const finishJob = () => {
    //check if there are unclosed payments
    //set end date, and set status to end on the payment
}

const acceptAllProgresses = () => {
    //accept all progresses
}

const customerMakeDeposit = () => {
    //check all unaccepted progresses
    //add payment information, set customerPaidAt
    //change payment status to paied
}

const tutorMakeDeposit = () => {
    //check all if customer has deposited
    //add payment information, set tutorDepositedAt
    //change payment status to paied
}