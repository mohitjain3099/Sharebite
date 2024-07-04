import mongoose from "mongoose";


// Define the schema for the subscriber data
const Schema = new mongoose.Schema({
    email: String
}, { collection: 'subscribers' }); // Explicitly set the collection name

export default mongoose.model("Subscriber", Schema);