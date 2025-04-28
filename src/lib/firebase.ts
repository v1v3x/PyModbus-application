import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDuFnGXhmXkkN9yHo0DWtzXsZ5_acpM3lk",
  authDomain: "pymodbus-ui-app-2024.firebaseapp.com",
  projectId: "pymodbus-ui-app-2024",
  storageBucket: "pymodbus-ui-app-2024.firebasestorage.app",
  messagingSenderId: "369629497474",
  appId: "1:369629497474:web:edb0aeb89831951e0c8c9b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
const auth = getAuth(app);

export { app, analytics, database, auth };