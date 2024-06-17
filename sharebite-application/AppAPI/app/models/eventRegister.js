import mongoose from "mongoose";
// Schema defines how the user data will be stored in MongoDB
const Schema = new mongoose.Schema({ 
    id: String,
    Name: String,
    email: String,
    supportAs: String,
    createdAt: Date,
    updatedAt: Date,
    eventData: Object
});
// Sets the createdAt parameter equal to the current time
export default mongoose.model("eventRegister", Schema);