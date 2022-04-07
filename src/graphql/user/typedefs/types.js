import {schemaComposer} from "graphql-compose";
import {UserTC} from "../../../models/user";

schemaComposer.createObjectTC({
    name: "user",
    fields: {
        user: UserTC
    },
});
