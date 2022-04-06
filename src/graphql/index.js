import {SchemaComposer} from "graphql-compose";
import {AuthMutation} from "./auth";
import {UserMutation, UserQuery} from "./user";
import {JobMutation, JobQuery} from "./job";

const schemaComposer = new SchemaComposer();

schemaComposer.Query.addFields({
    ...UserQuery,
    ...JobQuery,
});

schemaComposer.Mutation.addFields({
    ...AuthMutation,
    ...UserMutation,
    ...JobMutation,
});

const schema = schemaComposer.buildSchema();
export default schema;
