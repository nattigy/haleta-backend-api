import {schemaComposer} from "graphql-compose";
import {Schema} from "mongoose";

schemaComposer.createObjectTC({
    name: "Id",
    fields: {
        Id: "String!",
    },
});

schemaComposer.createObjectTC({
    name: "Succeed",
    fields: {succeed: "Boolean!"},
});