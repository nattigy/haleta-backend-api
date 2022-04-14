import db from "./db";
import jobDataAccess from "../services/job/data-access/job-data-access";

beforeAll(async () => {
    await db.connect()
})

afterAll(async () =>
    await db.closeDatabase()
)

let job;
let jobId;

describe('create job', () => {
    const location = "aa"
    const pricePerHour = 150

    it('returns the created job', async() => {
        job = await jobDataAccess.createJob({
            location,
            pricePerHour,
        })
        // check if users are created with correct field
        jobId = job._id;
        expect(job.location).toEqual(location);
        expect(job.pricePerHour).toEqual(pricePerHour);

    })
})

describe('find jobs', () => {
    it ('get job', async () => {

        const result = await jobDataAccess.getJob( jobId )
        expect(result._id).toEqual(jobId);

    })
    it ('get job', async () => {

        const result = await jobDataAccess.getJobs()
        console.log(result);

    })
})

describe('update job', () => {
    it ('update job info', async () => {
        const location = "bahr"
        const pricePerHour = 300
        const customerRelation= "624c9e769136ee1356d3fed7"

        job = await jobDataAccess.updateJobInfo({location, pricePerHour, customerRelation, jobId});

        expect(job.location).toEqual(location);
        expect(job.pricePerHour).toEqual(pricePerHour);
        expect((job.customerRelation).toString()).toEqual(customerRelation);

    })

    it ('update job customer relation id', async () => {
        const customerRelation = "624c9c775837e518f179be09"

        job = await jobDataAccess.updateJobCustomerRelationId({customerRelation, jobId
        });
        expect((job.customerRelation).toString()).toEqual(
            customerRelation
        );
    })

    it('increase total hours', async () => {
        const hours = 12;

        job = await jobDataAccess.increaseTotalHours({ jobId, hours })
        expect(job.totalHours).toEqual(hours);

    })

    it('decrease total hours', async () => {
        const hours = 8;
        const negativehours = job.totalHours - hours
        job = await jobDataAccess.decreaseTotalHours({ jobId, hours })
        console.log("jobhor: ", job)
        expect(job.totalHours).toEqual(negativehours);

    })
})

describe('delete job', () => {
    it ('delete job', async () => {

        job = await jobDataAccess.deleteJob( jobId )
        const nullJob = await jobDataAccess.getJob(jobId);
        expect(nullJob).toEqual(null);

    })
})