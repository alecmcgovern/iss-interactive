import openSocket from 'socket.io-client';

// const socket = openSocket('http://192.168.1.242:8000');
const socket = openSocket('https://gentle-cougar-26.localtunnel.me/');
// const socket = openSocket(window.location.hostname);


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

export function sendOrientation(orientation) {
	socket.emit('sendOrientation', orientation);
}
