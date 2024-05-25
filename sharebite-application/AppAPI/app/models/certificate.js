import mongoose from 'mongoose';
// Define the schema for certificates
const certificateSchema = new mongoose.Schema({
    name: String,
    amount: Number,
    date: Date,
    userId: String
});
// Create a model for certificates
const certificateModel = mongoose.model('certificate', certificateSchema);
export default certificateModel;