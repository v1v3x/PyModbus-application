const API_BASE_URL = 'http://localhost:5000/api';

export interface ModbusConnection {
  id: string;
  name: string;
  type: "tcp" | "rtu" | "ascii";
  host?: string;
  port?: string;
  port_name?: string;
  baudrate?: string;
  parity?: string;
  stopbits?: string;
  bytesize?: string;
  timeout: string;
  retries: string;
}

export const modbusService = {
  connect: async (connection: ModbusConnection): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await fetch(`${API_BASE_URL}/connect`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(connection),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to connect');
      }
      
      return data;
    } catch (error) {
      throw error;
    }
  },

  disconnect: async (connectionId: string): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await fetch(`${API_BASE_URL}/disconnect/${connectionId}`, {
        method: 'POST',
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to disconnect');
      }
      
      return data;
    } catch (error) {
      throw error;
    }
  },

  readData: async (connectionId: string): Promise<{ success: boolean; data?: boolean[]; message?: string }> => {
    try {
      const response = await fetch(`${API_BASE_URL}/read/${connectionId}`);
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to read data');
      }
      
      return data;
    } catch (error) {
      throw error;
    }
  },
}; 