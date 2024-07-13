import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import initializeRoutes from "./routes/index.js";
import models from "./models/index.js";

// Initialize app
const initialize = (app) => {
    // Configure CORS to allow requests from http://localhost:3008
    app.use(cors());

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    mongoose.connect(process.env.MONGO_CONNECTION);
    initializeRoutes(app);
};

// Export initialize
export default initialize;