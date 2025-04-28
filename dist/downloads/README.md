# Modbus Data Logger Downloads

This directory contains downloadable files for the Modbus Connector Portal.

## Windows Executable

The `ModbusDataLogger.exe` file is a standalone Windows application that allows you to connect to Modbus devices, read data, and log it to CSV files without requiring Python installation.

### Features

- Connect to Modbus TCP or RTU devices
- Read data from Modbus registers
- Log data to CSV files
- Real-time data visualization
- Simple and intuitive user interface

### System Requirements

- Windows 10 or later
- 4GB RAM minimum
- 100MB free disk space

### Installation

1. Download the `ModbusDataLogger.exe` file
2. Run the executable
3. No installation required - it's a standalone application

### Building from Source

If you want to build the executable yourself:

1. Clone the repository
2. Install Python 3.8 or later
3. Install the required packages: `pip install -r requirements.txt`
4. Run the build script: `python build_exe.py`

For more information, see the main README.md file in the repository. 