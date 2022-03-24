import {SchemaComposer} from "graphql-compose";
import {AuthMutation} from "./auth";
import {UserMutation, UserQuery} from "./user";

const schemaComposer = new SchemaComposer();

schemaComposer.Query.addFields({
    ...UserQuery,
});

schemaComposer.Mutation.addFields({
    ...AuthMutation,
    ...UserMutation,
});

export default schemaComposer.buildSchema();
