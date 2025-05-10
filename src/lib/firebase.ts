// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Get configuration from localStorage or use default
const getFirebaseConfig = () => {
  if (typeof window !== 'undefined') {
    try {
      const savedConfig = localStorage.getItem('firebaseConfig');
      if (savedConfig) {
        const config = JSON.parse(savedConfig);
        console.log('Loaded Firebase config from localStorage');
        return config;
      }
    } catch (error) {
      console.error('Error loading Firebase config:', error);
      localStorage.removeItem('firebaseConfig');
    }
  }

  console.log('No Firebase configuration found');
  // Return a default empty config to prevent errors
  return {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  };
};

// Initialize Firebase with safe error handling
let app;
let analytics = null;
let auth = null;
let db = null;

try {
  // Get config and initialize app
  const firebaseConfig = getFirebaseConfig();
  
  // Check if we already have apps initialized
  const existingApps = getApps();
  if (existingApps.length === 0) {
    app = initializeApp(firebaseConfig);
    console.log('Firebase app initialized');
  } else {
    app = existingApps[0];
    console.log('Using existing Firebase app');
  }
  
  // Initialize services safely
  try {
    if (typeof window !== 'undefined') {
      analytics = getAnalytics(app);
    }
  } catch (e) {
    console.log('Analytics not initialized:', e);
  }
  
  try {
    auth = getAuth(app);
  } catch (e) {
    console.log('Auth not initialized:', e);
  }
  
  try {
    db = getDatabase(app);
  } catch (e) {
    console.log('Database not initialized:', e);
  }
  
} catch (error) {
  console.error('Firebase initialization error:', error);
  // Create a dummy app to prevent crashes
  if (!app && getApps().length === 0) {
    try {
      app = initializeApp({
        apiKey: "dummy-api-key",
        authDomain: "dummy-app.firebaseapp.com",
        projectId: "dummy-app",
        storageBucket: "dummy-app.appspot.com",
        messagingSenderId: "000000000000",
        appId: "1:000000000000:web:0000000000000000000000"
      });
      console.log('Created dummy Firebase app to prevent crashes');
    } catch (e) {
      console.error('Failed to create dummy app:', e);
    }
  } else if (getApps().length > 0) {
    app = getApps()[0];
  }
}

export { app, analytics, auth, db };