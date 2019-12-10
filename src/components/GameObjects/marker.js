import * as THREE from 'three';

export function load(radius) {
	let geometry = new THREE.SphereGeometry(15, 50, 50);
	let material = new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true });
	let mesh = new THREE.Mesh(geometry, material);

	mesh.position.x = 50;
	mesh.position.y = 25;
    return mesh;
}

export function update(object) {
	const currOpacity = object.material.opacity;
	const currScale = object.scale.x;

	if (currScale < 1) {
		const newScale = currScale + 0.01;
		object.material.opacity = currOpacity - 0.02;
		object.scale.set(newScale, newScale, newScale);
	} else {
		const newScale = 0.2;
		object.material.opacity = 1.0;
		object.scale.set(newScale, newScale, newScale);
	}

	// object.material.opacity = opacity;
	// object.scale.set(scale, scale, scale);
}