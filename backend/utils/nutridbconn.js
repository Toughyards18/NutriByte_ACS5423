// backend/utils/nutridbconn.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
// import { execSync } from "child_process";
// import path from "path";

// // Load data before connecting
// try {
//     console.log("Starting data upload...");
//     const uploadScript = path.resolve("utils/uploadAllFoods.js");
//     execSync(`node ${uploadScript}`, { stdio: "inherit" });
//     console.log("Data upload complete.");
// } catch (err) {
//     console.error("Data upload failed:", err.message);
//     process.exit(1);
// }

dotenv.config();
const MONGO_URI = dotenv.MONGO_URI_ATLAS;

// Connect to MongoDB
// This function connects to the MongoDB database using Mongoose.
// It uses the MongoDB URI and options defined above.
// If the connection is successful, it logs a message to the console.
// If there is an error, it logs the error message and exits the process with a failure code (1).
const connectDB = async () => {
    try {
        console.log(MONGO_URI);
        console.log("Connecting to MongoDB...");        
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB connected");
        console.log("Active DB:", mongoose.connection.name);
    } catch (err) {
        console.log("Error connecting to MongoDB");
        console.error(err.message);
        process.exit(1);
    }
};

export default connectDB;
