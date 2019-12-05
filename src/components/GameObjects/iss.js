// import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { promisifyLoader } from '../Utilities/threeUtils';

import iss from '../../assets/ISS_stationary.glb';

const loader = promisifyLoader(new GLTFLoader(), onProgress);

export async function load(earthRadius) {
	return loader.load(iss)
		.then(gameObj => {
			gameObj.scene.scale.set(0.5, 0.5, 0.5);
			return gameObj;
		})
		.catch(error => {
			console.log(error);
		})
}

export function update(iss) {
	if (iss && iss.rotation) {
      iss.rotation.y += 0.01;
    }
}

function onProgress(xhr) {
	// console.log(xhr);
}