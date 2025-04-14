// backend/utils/nutridbconn.js
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// MongoDB URI
// This URI is used to connect to the MongoDB database.

const MONGO_URI = process.env.MONGO_URI + process.env.MONGO_DB || "mongodb://localhost:27017/nutribytedata";
const dbLogging = process.env.DB_LOGGING || false;

// Connect to MongoDB
// This function connects to the MongoDB database using Mongoose.
// It uses the MongoDB URI and options defined above.
// If the connection is successful, it logs a message to the console.
// If there is an error, it logs the error message and exits the process with a failure code (1).
const connectDB = async () => {
	try {
		if (dbLogging) {
			console.log(MONGO_URI);
		}
		console.log("Connecting to MongoDB...");
		await mongoose.connect(MONGO_URI);
		if (dbLogging) {
			console.log("MongoDB connected");
			console.log("Active DB:", mongoose.connection.name);

			const db = mongoose.connection.db;
			const collections = await db.listCollections().toArray();
			for (const col of collections) {
				const count = await db.collection(col.name).countDocuments();
				console.log("\tAvailable Collection: ", col.name, " with ", count, " entries");
			}
		}
		console.log("MongoDB Ready");
	} catch (err) {
		console.log("Error connecting to MongoDB");
		console.error(err.message);
		process.exit(1);
	}
};

export default connectDB;
