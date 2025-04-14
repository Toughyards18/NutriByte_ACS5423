// backend/utils/uploadAllFoods.js

import fs from "fs";
import path from "path";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017";
const DB_NAME = process.env.MONGO_DB || "nutribytedata";
const DATA_DIR = path.resolve("../data"); // Make sure your .json files are here

// Map each collection to its respective JSON files
const COLLECTIONS = {
	branded_food: ["branded_foods_01.json"],
	food_attributes: ["food_attributes_01.json"],
	food_descriptions: ["food_descriptions_01.json"],
	food_nutrients: ["food_nutrients_01.json"],
};

const Clusters = {
	branded_food: "branded_foods",
	food_attributes: "food_attributes",
	food_descriptions: "food_descriptions",
	food_nutrients: "food_nutrients",
};

const uploadData = async () => {
	const client = new MongoClient(MONGO_URI);

	try {
		console.log("Connecting to MongoDB...");
		await client.connect();
		const db = client.db(DB_NAME);
		console.log("Connected to DB:", DB_NAME);

		for (const [collectionName, fileList] of Object.entries(COLLECTIONS)) {
			const coll = db.collection(Clusters[collectionName]);
			console.log(`Loading data into collection: ${Clusters[collectionName]}`);
			for (const file of fileList) {
				const filePath = path.join(DATA_DIR, file);
				console.log(filePath);
				if (!fs.existsSync(filePath)) {
					console.warn(`Skipping missing file: ${file}`);
					continue;
				}

				const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
				if (Array.isArray(jsonData) && jsonData.length > 0) {
					const result = await coll.insertMany(jsonData);
					console.log(`Inserted ${result.insertedCount} docs from ${file}`);
				} else {
					console.warn(`No data in ${file} or invalid format`);
				}
			}
		}
		console.log("All collections successfully loaded!");
	} catch (err) {
		console.error("Error loading data:", err.message);
	} finally {
		await client.close();
		console.log("Connection closed.");
	}
};

uploadData();
