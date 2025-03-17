// Import Firebase SDK functions
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"; // Import Realtime Database
import { getAnalytics } from "firebase/analytics";

// Your Firebase configuration object
const firebaseConfig = {
    apiKey: "AIzaSyCsrOPq4oC4AsZ9DHrj-JhghW6AJvkqwqQ",
    authDomain: "qrscanner-ee42b.firebaseapp.com",
    projectId: "qrscanner-ee42b",
    databaseURL:"https://qrscanner-ee42b-default-rtdb.asia-southeast1.firebasedatabase.app/",
    storageBucket: "qrscanner-ee42b.firebasestorage.app",
    messagingSenderId: "641797888206",
    appId: "1:641797888206:web:b9d79d7bb9c886a9ffd89f",
    measurementId: "G-HXVNY4JP76"
};

// Initialize Firebase with the provided configuration
const app = initializeApp(firebaseConfig);

// Initialize Firebase Analytics (optional, but useful for tracking)
const analytics = getAnalytics(app);

// Initialize Firebase Realtime Database
const database = getDatabase(app);

// Export Firebase app and database instances so they can be used throughout the app
export { app, database };
