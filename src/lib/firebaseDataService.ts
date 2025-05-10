import { getDatabase, ref, onValue, push, set, get, off, query, orderByChild, limitToLast } from "firebase/database";
import { getAuth } from "firebase/auth";
import { app } from "./firebase";

const db = getDatabase(app);

export interface DataLog {
  id: string;
  timestamp: number;
  value: number;
  unit: string;
  deviceId: string;
  status: 'normal' | 'warning' | 'critical';
  message?: string;
}

export interface Alert {
  id: string;
  timestamp: number;
  type: 'warning' | 'critical';
  message: string;
  deviceId: string;
  value: number;
  threshold: number;
  acknowledged: boolean;
}

export interface ControlSignal {
  id: string;
  timestamp: number;
  deviceId: string;
  command: 'start' | 'stop' | 'reset';
  status: 'pending' | 'executed' | 'failed';
  executedBy: string;
}

const validateDataLog = (log: any): log is DataLog => {
  return (
    typeof log === 'object' &&
    typeof log.timestamp === 'number' &&
    typeof log.value === 'number' &&
    typeof log.unit === 'string' &&
    typeof log.deviceId === 'string' &&
    ['normal', 'warning', 'critical'].includes(log.status)
  );
};

export const firebaseDataService = {
  // Real-time data subscription
  subscribeToData: (deviceId: string, callback: (data: DataLog[]) => void) => {
    try {
      console.log(`Subscribing to data for device: ${deviceId}`);
      const dataRef = ref(db, `dataLogs/${deviceId}`);
      
      const unsubscribe = onValue(dataRef, (snapshot) => {
        try {
          const data = snapshot.val();
          if (!data) {
            console.log(`No data found for device: ${deviceId}`);
            callback([]);
            return;
          }

          const logs: DataLog[] = Object.values(data)
            .filter(validateDataLog)
            .map(log => ({
              ...log,
              id: log.id || 'unknown',
              timestamp: log.timestamp || Date.now(),
              status: log.status || 'normal'
            }));

          console.log(`Received ${logs.length} logs for device: ${deviceId}`);
          callback(logs);
        } catch (error) {
          console.error(`Error processing data for device ${deviceId}:`, error);
          callback([]);
        }
      }, (error) => {
        console.error(`Error subscribing to data for device ${deviceId}:`, error);
        callback([]);
      });

      return unsubscribe;
    } catch (error) {
      console.error(`Error setting up subscription for device ${deviceId}:`, error);
      return () => {};
    }
  },

  // Historical data fetching
  getHistoricalData: async (deviceId: string, limit: number = 100) => {
    try {
      console.log(`Fetching historical data for device: ${deviceId}`);
      const dataRef = ref(db, `dataLogs/${deviceId}`);
      const dataQuery = query(dataRef, orderByChild('timestamp'), limitToLast(limit));
      
      const snapshot = await get(dataQuery);
      const data = snapshot.val();
      
      if (!data) {
        console.log(`No historical data found for device: ${deviceId}`);
        return [];
      }

      const logs: DataLog[] = Object.values(data)
        .filter(validateDataLog)
        .map(log => ({
          ...log,
          id: log.id || 'unknown',
          timestamp: log.timestamp || Date.now(),
          status: log.status || 'normal'
        }));

      console.log(`Retrieved ${logs.length} historical logs for device: ${deviceId}`);
      return logs;
    } catch (error) {
      console.error(`Error fetching historical data for device ${deviceId}:`, error);
      return [];
    }
  },

  // Alert handling
  subscribeToAlerts: (callback: (alerts: Alert[]) => void) => {
    const alertsRef = ref(db, 'alerts');
    
    const unsubscribe = onValue(alertsRef, (snapshot) => {
      const data = snapshot.val();
      const alerts: Alert[] = data ? Object.values(data) : [];
      callback(alerts);
    });

    return unsubscribe;
  },

  createAlert: async (alert: Omit<Alert, 'id' | 'timestamp' | 'acknowledged'>) => {
    const alertsRef = ref(db, 'alerts');
    const newAlertRef = push(alertsRef);
    
    const newAlert: Alert = {
      ...alert,
      id: newAlertRef.key!,
      timestamp: Date.now(),
      acknowledged: false
    };

    await set(newAlertRef, newAlert);
    return newAlert;
  },

  acknowledgeAlert: async (alertId: string) => {
    const alertRef = ref(db, `alerts/${alertId}`);
    await set(alertRef, { acknowledged: true }, { merge: true });
  },

  // Control signal handling
  subscribeToControlSignals: (deviceId: string, callback: (signals: ControlSignal[]) => void) => {
    const signalsRef = ref(db, `controlSignals/${deviceId}`);
    
    const unsubscribe = onValue(signalsRef, (snapshot) => {
      const data = snapshot.val();
      const signals: ControlSignal[] = data ? Object.values(data) : [];
      callback(signals);
    });

    return unsubscribe;
  },

  sendControlSignal: async (deviceId: string, command: ControlSignal['command']) => {
    const auth = getAuth();
    const user = auth.currentUser;
    
    if (!user) {
      throw new Error('User must be authenticated to send control signals');
    }

    const signalsRef = ref(db, `controlSignals/${deviceId}`);
    const newSignalRef = push(signalsRef);
    
    const newSignal: ControlSignal = {
      id: newSignalRef.key!,
      timestamp: Date.now(),
      deviceId,
      command,
      status: 'pending',
      executedBy: user.uid
    };

    await set(newSignalRef, newSignal);
    return newSignal;
  },

  updateControlSignalStatus: async (deviceId: string, signalId: string, status: ControlSignal['status']) => {
    const signalRef = ref(db, `controlSignals/${deviceId}/${signalId}`);
    await set(signalRef, { status }, { merge: true });
  },

  // Data logging
  addDataLog: async (log: Omit<DataLog, 'id' | 'timestamp'>) => {
    try {
      console.log(`Adding data log for device: ${log.deviceId}`);
      const logsRef = ref(db, `dataLogs/${log.deviceId}`);
      const newLogRef = push(logsRef);
      
      const newLog: DataLog = {
        ...log,
        id: newLogRef.key!,
        timestamp: Date.now()
      };

      await set(newLogRef, newLog);
      console.log(`Successfully added log for device: ${log.deviceId}`);
      return newLog;
    } catch (error) {
      console.error(`Error adding data log for device ${log.deviceId}:`, error);
      throw error;
    }
  },

  getAllDataLogs: async (): Promise<DataLog[]> => {
    try {
      console.log('Fetching all data logs');
      const logsRef = ref(db, 'dataLogs');
      const snapshot = await get(logsRef);
      const logs: DataLog[] = [];
      
      if (!snapshot.exists()) {
        console.log('No data logs found');
        return [];
      }

      const data = snapshot.val();
      Object.entries(data).forEach(([deviceId, deviceLogs]: [string, any]) => {
        Object.entries(deviceLogs).forEach(([id, log]: [string, any]) => {
          if (validateDataLog(log)) {
            logs.push({
              id,
              deviceId,
              ...log
            });
          }
        });
      });
      
      console.log(`Retrieved ${logs.length} total logs`);
      return logs.sort((a, b) => b.timestamp - a.timestamp);
    } catch (error) {
      console.error('Error fetching all data logs:', error);
      return [];
    }
  },

  // Cleanup
  unsubscribe: (unsubscribe: () => void) => {
    try {
      unsubscribe();
    } catch (error) {
      console.error('Error unsubscribing:', error);
    }
  }
}; 