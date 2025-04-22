import { initalizeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

const app = initalizeApp(firebaseConfig);

const auth = getAuth(app);
const analytics = getAnalytics(app);

// Export the initialized Firebase app, Firestore, Auth, and Analytics instances
export const firestore = getFirestore(app);

