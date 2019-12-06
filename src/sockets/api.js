import openSocket from 'socket.io-client';

// const socket = openSocket('http://localhost:8000');
const socket = openSocket(window.location.hostname);


// CLIENT CONNECTION CONTROLS
export function subscribeToClientConnection(callback) {
	socket.on('clientConnected', clientConnected => callback(null, clientConnected));
}

export function subscribeToClientDisconnection(callback) {
	socket.on('clientDisconnected', clientDisconnected => callback(null, clientDisconnected));
}

export function subscribeToActiveClientList(callback) {
	socket.on('activeClientList', activeClientList => callback(null, activeClientList));
}

export function sendDeviceType(deviceType) {
	socket.emit('sendDeviceType', deviceType);
}

export function subscribeToControllingUserResponse(callback) {
	socket.on('controllingUserResponse', controllingUserResponse => callback(null, controllingUserResponse));
}


// ORIENTATION CONTROLS
export function subscribeToOrientation(callback) {
	socket.on('orientationReceived', orientationReceived => callback(null, orientationReceived));
}

export function subscribeToTargetOrientation(callback) {
	socket.on('targetOrientationReceived', targetOrientationReceived => callback(null, targetOrientationReceived));
}

export function sendOrientation(orientation) {
	socket.emit('sendOrientation', orientation);
}

export function sendTargetOrientation(targetOrientation) {
	socket.emit('sendTargetOrientation', targetOrientation);
}