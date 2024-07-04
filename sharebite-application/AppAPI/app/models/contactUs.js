import mongoose from "mongoose";

// Define the schema for the contact us data
const Schema = new mongoose.Schema({
    id: String,
    name: String,
    email: String,
    message: String,
    createdAt: Date,
    updatedAt: Date,
});
export default mongoose.model("ContactUs", Schema);