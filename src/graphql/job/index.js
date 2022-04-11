import {JobTC} from "../../models/job";

import {authentication, authorization} from "../../middlewares";
import Resolvers from "./resolvers/job-resolvers";

import "./typedefs/types"

for (const resolver in Resolvers) {
    JobTC.addResolver(Resolvers[resolver]);
}

const JobQuery = {};

const JobMutation = {
    createJob: JobTC.getResolver("createJob", [authentication.isAuth, authorization]),
    assignTutor: JobTC.getResolver("assignTutor", [authentication.isAuth, authorization])
};

export {JobQuery, JobMutation};
