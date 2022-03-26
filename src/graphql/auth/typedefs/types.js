import {schemaComposer} from "graphql-compose";
import {UserTC} from "../../../models/user";

schemaComposer.createObjectTC({
    name: "AccessToken",
    fields: {
        accessToken: "String!",
        user: UserTC,
    },
});

schemaComposer.createObjectTC({
    name: "Succeed",
    fields: {succeed: "Boolean!"},
});