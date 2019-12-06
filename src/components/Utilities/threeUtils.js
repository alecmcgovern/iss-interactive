import * as THREE from 'three';

export function promisifyLoader(loader, onProgress) {
	function promiseLoader(url) {
		return new Promise((resolve, reject) => {
			loader.load(url, resolve, onProgress, reject);
		});
	}

	return {
		originalLoader: loader,
		load: promiseLoader
	};
}

export function eulerToQuaternion(rotation) {
	const z = rotation.z ? THREE.Math.degToRad( rotation.z ) : 0; // Z
	const x = rotation.x ? THREE.Math.degToRad( rotation.x ) : 0; // X'
	const y = rotation.y ? THREE.Math.degToRad( rotation.y ) : 0; // Y''

	let zee = new THREE.Vector3( 0, 0, 1 );
	let euler = new THREE.Euler();
	let q0 = new THREE.Quaternion();
	let q1 = new THREE.Quaternion( - Math.sqrt( 0.5 ), 0, 0, Math.sqrt( 0.5 ) );

	euler.set( x, z, - y, 'YXZ' );

	let quaternion = new THREE.Quaternion();
	quaternion.setFromEuler( euler );
	quaternion.multiply( q1 );
	quaternion.multiply( q0.setFromAxisAngle( zee, 0 ) );

	return quaternion;
}