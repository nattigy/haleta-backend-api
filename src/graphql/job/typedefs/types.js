import {schemaComposer} from "graphql-compose";

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