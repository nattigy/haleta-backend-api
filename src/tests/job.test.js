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
    const name = "new job";
    const location = "aa"
    const description = "this is a test description"
    const pricePerHour = 15;

    it('returns the created job', async() => {
        job = await jobDataAccess.createJob({
            name,
            location,
            description,
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

    })
})

describe('update job', () => {
    it ('update job info', async () => {
        const name = "updated name";
        const location = "bahr";
        const description = "updated description";
        const pricePerHour = 300;

        job = await jobDataAccess.updateJobInfo({name,location, description,pricePerHour, jobId});

        expect(job.name).toEqual(name);
        expect(job.location).toEqual(location);
        expect(job.description).toEqual(description);
        expect(job.pricePerHour).toEqual(pricePerHour);
    })

    it ('update job customer relation id', async () => {
        const customerRelationId = "624c9c775837e518f179be09"

        job = await jobDataAccess.updateJobCustomerRelationId({customerRelationId, jobId
        });
        expect((job.customerRelation).toString()).toEqual(
            customerRelationId
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