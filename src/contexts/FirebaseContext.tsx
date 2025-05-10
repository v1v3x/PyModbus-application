import { createContext, useContext, useState } from "react";
import { initializeApp, getApps, deleteApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

interface FirebaseContextType {
  isConnected: boolean;
  disconnectFirebase: () => void;
  checkConnection: () => Promise<boolean>;
  error: string | null;
}

const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined);

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateConfig = () => {
    const config = localStorage.getItem('firebaseConfig');
    if (!config) {
      setError('No Firebase configuration found. Please configure Firebase first.');
      return null;
    }

    let firebaseConfig;
    try {
      firebaseConfig = JSON.parse(config);
    } catch (e) {
      setError('Invalid Firebase configuration format. Please reconfigure Firebase.');
      return null;
    }

    // Validate required fields
    const requiredFields = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'];
    const missingFields = requiredFields.filter(field => !firebaseConfig[field]);
    if (missingFields.length > 0) {
      setError(`Missing required fields: ${missingFields.join(', ')}`);
      return null;
    }

    return firebaseConfig;
  };

  const disconnectFirebase = () => {
    try {
      const apps = getApps();
      apps.forEach(app => {
        try {
          deleteApp(app);
        } catch (e) {
          console.warn('Error deleting Firebase app:', e);
        }
      });
    } catch (e) {
      console.error('Error in disconnectFirebase:', e);
    }
  };

  const checkConnection = async () => {
    setError(null);
    const firebaseConfig = validateConfig();
    if (!firebaseConfig) {
      setIsConnected(false);
      return false;
    }
    
    try {
      // Clean up any existing Firebase apps first
      disconnectFirebase();
      
      // Initialize Firebase with the current config
      const app = initializeApp(firebaseConfig, 'connectionTest');
      const db = getFirestore(app);
      
      // Try to access Firestore to verify connection
      const testRef = collection(db, 'connectionTest');
      await getDocs(testRef);
      
      // If we get here, the connection was successful
      setIsConnected(true);
      setError(null);
      return true;
    } catch (err) {
      console.error('Firebase connection error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      
      // Provide more user-friendly error messages
      if (errorMessage.includes('Firebase: Error (auth/invalid-api-key)')) {
        setError('Invalid API key. Please check your Firebase configuration.');
      } else if (errorMessage.includes('projectId')) {
        setError('Invalid Project ID. Please check your Firebase configuration.');
      } else if (errorMessage.includes('network')) {
        setError('Network error. Please check your internet connection.');
      } else {
        setError(errorMessage);
      }
      
      setIsConnected(false);
      return false;
    }
  };

  return (
    <FirebaseContext.Provider value={{ isConnected, disconnectFirebase, checkConnection, error }}>
      {children}
    </FirebaseContext.Provider>
  );
}

export function useFirebase() {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
} 