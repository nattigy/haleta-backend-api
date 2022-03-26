import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

main()
    .then(() => console.log("Mongoose connected"))
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect(process.env.MONGODB_URI);
}