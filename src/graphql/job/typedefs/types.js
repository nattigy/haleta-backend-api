import {schemaComposer} from "graphql-compose";
import {JobTC} from "../../../models/job";

schemaComposer.createObjectTC({
    name: "Id",
    fields: {
        Id: "String!",
    },
});

schemaComposer.createObjectTC({
    name: "job",
    fields: {
        job: JobTC
    },
});