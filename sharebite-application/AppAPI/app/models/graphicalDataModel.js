
import mongoose from "mongoose";

// Define the schema for the graphical data
const Schema = new mongoose.Schema({
    year: String,
    MealsDelivered: Number,
    Partners: Number,
    NGO: Number,
    Workers: Number,
    EventsHosted: Number,
}, { collection: 'graphicaldata' }); // Explicitly set the collection name

export default mongoose.model("GraphicalData", Schema);