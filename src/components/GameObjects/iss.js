// import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { promisifyLoader } from '../Utilities/threeUtils';

import iss from '../../assets/ISS_stationary.glb';

const loader = promisifyLoader(new GLTFLoader());

export async function load() {
	return loader.load(iss)
		.then(gameObj => {
			return gameObj;
		})
		.catch(error => {
			console.log(error);
		})

 // let loader = new GLTFLoader();
 //    loader.load(
 //      iss,
 //      (gltf) => {
 //        object = gltf.scene;
 //        scene.add(object);
 //      },
 //      (xhr) => {
 //        console.log(`${(xhr.loaded / xhr.total * 100)}% loaded`);
 //      },
 //      (error) => {
 //        console.log(error);
 //      }
 //    );
}

export function update() {
	console.log("updating iss");
}