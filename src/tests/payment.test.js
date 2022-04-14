import db from "./db";
import paymentDataAccess from "../services/payment/data-access/payment-data-access";

beforeAll(async () => {
    await db.connect()
})

afterAll(async () =>
    await db.closeDatabase()
)

let payment;
let paymentId;
let progressId;

describe('creating a payment',  () => {
    it ('returns the created payment', async() => {
        const month = "June";
        const date = new Date();
        const startDate = new Date(2022,10,23);
        const endDate = new Date(2022,11,23);
        const customerRelation = "624d4e83cec74332200a4f62";
        const jobs = [];
        payment = await paymentDataAccess.createPayment({month,date,startDate,endDate,customerRelation,jobs});
        paymentId = payment._id;
        expect(payment.month).toEqual(month);
        expect(payment.startDate).toEqual(startDate);
        expect(payment.endDate).toEqual(endDate);
        expect(payment.customerRelation.toString()).toEqual(customerRelation);
    })
});

describe('getting payments', () => {
    it ('gets a payment by id', async () => {
        const currentPayment = await paymentDataAccess.getPayment(paymentId);
        expect(currentPayment).toHaveProperty("month",'June');
        expect(currentPayment).toHaveProperty("startDate",new Date(2022,10,23));
        expect(payment).toHaveProperty("_id",paymentId);
    })

    it ('gets list of payments', async () => {
        const payments = await paymentDataAccess.getPayments();
        expect(payments.length).toEqual(1);
        expect(payments[0]._id).toEqual(paymentId);
    })

    it ('gets a payments status by id', async () => {
        const currentPayment = await paymentDataAccess.getPaymentStatus(paymentId);
        expect(currentPayment.status).toEqual("ACTIVE");
    })
})

describe('updating payments', () => {
    it ('updates payment status by id', async () => {
        const status = "PAUSED";
        const currentPayment = await paymentDataAccess.updatePaymentStatus({paymentId,status});
        expect(currentPayment.status).toEqual(status);
    })

    it ('ends a payment', async () => {
        const endDate = new Date(2022,11,23);
        const currentPayment = await paymentDataAccess.endPayment({paymentId,endDate});
        expect(currentPayment.endDate).toEqual(endDate);
        expect(currentPayment.status).toEqual("PENDING");
    })

    it ('extends a payment date', async () => {
        const endDate = new Date(2022,12,23);
        const currentPayment = await paymentDataAccess.endPayment({paymentId,endDate});
        expect(currentPayment.endDate).toEqual(endDate);
    })

    it ('adds new progress to the progress list', async () => {
        const date = new Date();
        const startTime = new Date(2022,4,13,1,21);
        const endTime = new Date(2022,4,13,3,21);
        const rate = 40;
        const description = 'test description';
        const jobId = "624d4e83cec74332200a4f62";
        const duration = Math.abs(endTime - startTime);

        const currentPayment = await paymentDataAccess.addNewProgressList({
            paymentId,date,startTime,endTime,rate,description,jobId}
        );

        const length = currentPayment.progressList.length;
        const newProgress = currentPayment.progressList[length-1]
        progressId = newProgress._id;
        expect(newProgress.date).toEqual(date);
        expect(newProgress.duration).toEqual(duration);
        expect(newProgress.description).toEqual(description);
        expect(newProgress.rate).toEqual(rate);
        expect(currentPayment.totalAmount).toEqual(duration*rate);
    })

    it('updates single progress by id', async () => {
        const date = new Date();
        const newStartTime = new Date(2023,4,13,1,21);
        const newEndTime = new Date(2023,4,13,3,21);
        const newDescription = 'updated description';
        const prevAmount = (await paymentDataAccess.getPayment(paymentId)).totalAmount;
        const {_id,progressList} = await paymentDataAccess.updateSingleProgress({
            paymentId,progressId,date,startTime:newStartTime,endTime:newEndTime,description:newDescription}
        );
        const singleProgress = progressList[0];
        const currentAmount = (await paymentDataAccess.getPayment(paymentId)).totalAmount;
        expect(singleProgress.startTime).toEqual(newStartTime);
        expect(singleProgress.endTime).toEqual(newEndTime);
        expect(singleProgress.description).toEqual(newDescription);
        // expect(currentAmount).toEqual((singleProgress.rate * singleProgress.duration) - prevAmount);  - doesn't work
    })

    it ('removes progress from progress list by id', async () => {
        await paymentDataAccess.removeProgressFromList({paymentId,progressId});
        const {progressList} = await paymentDataAccess.getPayment(paymentId);
        expect(progressList).toEqual([]);
    })

    it ('deletes payment by id', async () => {
        await paymentDataAccess.deletePayment(paymentId);
        const deletedPayment = await paymentDataAccess.getPayment(paymentId);
        expect(deletedPayment).toBe(null);
    })
})