import * as THREE from 'three';
import { promisifyLoader } from '../Utilities/threeUtils';

import daymap from '../../assets/2k_earth_daymap.jpg';

const loader = promisifyLoader(new THREE.TextureLoader(), onProgress);

export async function load(radius) {
	return loader.load(daymap)
		.then(texture => {
			let sphere = new THREE.SphereGeometry(radius, 50, 50);
			let material = new THREE.MeshBasicMaterial({ map: texture });
			let mesh = new THREE.Mesh(sphere, material);

			return mesh;
		})
		.catch(error => {
			console.log(error);
		})
}

export function update(earth) {
	if (earth && earth.rotation) {
      earth.rotation.y += 0.001;
    }
}

function onProgress(xhr) {
	// console.log(xhr);
}