from flask import Flask, request, jsonify # type: ignore
from flask_cors import CORS # type: ignore
from pymodbus.client import ModbusTcpClient, ModbusSerialClient
import time

app = Flask(__name__)
CORS(app)

# Store active connections
active_connections = {}

@app.route('/api/connect', methods=['POST'])
def connect():
    try:
        data = request.json
        connection_id = data['id']
        
        if connection_id in active_connections:
            return jsonify({
                'success': False,
                'message': 'Connection already exists'
            }), 400

        client = None
        if data['type'] == 'tcp':
            client = ModbusTcpClient(
                host=data['host'],
                port=int(data['port']),
                timeout=int(data['timeout']),
                retries=int(data['retries'])
            )
        else:  # rtu or ascii
            client = ModbusSerialClient(
                method=data['type'],
                port=data['port_name'],
                baudrate=int(data['baudrate']),
                parity=data['parity'],
                stopbits=int(data['stopbits']),
                bytesize=int(data['bytesize']),
                timeout=int(data['timeout'])
            )

        # Try to connect
        success = client.connect()
        if success:
            active_connections[connection_id] = client
            return jsonify({
                'success': True,
                'message': f'Successfully connected to {data["name"]}'
            })
        else:
            return jsonify({
                'success': False,
                'message': 'Failed to establish connection'
            }), 400

    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

@app.route('/api/disconnect/<connection_id>', methods=['POST'])
def disconnect(connection_id):
    try:
        if connection_id in active_connections:
            client = active_connections[connection_id]
            client.close()
            del active_connections[connection_id]
            return jsonify({
                'success': True,
                'message': 'Successfully disconnected'
            })
        return jsonify({
            'success': False,
            'message': 'Connection not found'
        }), 404
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

@app.route('/api/read/<connection_id>', methods=['GET'])
def read_data(connection_id):
    try:
        if connection_id not in active_connections:
            return jsonify({
                'success': False,
                'message': 'Connection not found'
            }), 404

        client = active_connections[connection_id]
        
        # Read coils (you can modify this based on your needs)
        response = client.read_coils(address=6304, count=1)
        
        if response.isError():
            return jsonify({
                'success': False,
                'message': 'Failed to read data'
            }), 400

        return jsonify({
            'success': True,
            'data': response.bits
        })

    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

if __name__ == '__main__':
    app.run(port=5000) 