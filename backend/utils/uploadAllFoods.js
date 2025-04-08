// backend/utils/uploadAllFoods.js

import fs from 'fs';
import path from 'path';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = dotenv.MONGO_URI;
const DB_NAME = "nutribytedata";
const DATA_DIR = path.resolve("data"); // Make sure your .json files are here

// Map each collection to its respective JSON files
const COLLECTIONS = {
    branded_food: [
        "branded_foods_01.json",
        "branded_foods_04.json",
        "branded_foods_07.json",
        "branded_foods_08.json"
    ],
    food_attributes: [
        "food_attributes_01.json",
        "food_attributes_04.json",
        "food_attributes_07.json",
        "food_attributes_08.json"
    ],
    food_descriptions: [
        "food_descriptions_01.json",
        "food_descriptions_04.json",
        "food_descriptions_07.json",
        "food_descriptions_08.json"
    ],
    food_nutrients: [
        "food_nutrients_01.json",
        "food_nutrients_04.json",
        "food_nutrients_07.json",
        "food_nutrients_08.json"
    ]
};

const uploadData = async () => {
    const client = new MongoClient(MONGO_URI);

    try {
        console.log("Connecting to MongoDB...");
        await client.connect();
        const db = client.db(DB_NAME);
        console.log("Connected to DB:", DB_NAME);

        for (const [collectionName, fileList] of Object.entries(COLLECTIONS)) {
            const coll = db.collection(collectionName);
            console.log(`Loading data into collection: ${collectionName}`);

            for (const file of fileList) {
                const filePath = path.join(DATA_DIR, file);

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