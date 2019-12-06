import React, { useState, useEffect, useRef } from 'react';
import * as socketApi from '../sockets/api';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as Iss from './GameObjects/iss';
import * as Earth from './GameObjects/earth';
import * as Lights from './GameObjects/lights';

import { eulerToQuaternion } from './Utilities/threeUtils';

import './scene.scss';
// https://threejs.org/examples/#webgl_lights_spotlights

const DIMENSIONS = {
  earthRadius: 20
}

function Scene(props) {
  console.log(props.rotation);

  const el = useRef(null);
  let scene, camera, renderer, iss, earth, controls; // requestID

  useEffect(() => {
    window.addEventListener("resize", onResize);
    sceneSetup();
    addGameObjects();
    animate();

    return () => {
      window.removeEventListener("resize", onResize);
    }
  },[]);

  function sceneSetup() {
    // get container dimensions and use them for scene sizing
    const width = window.innerWidth;
    const height = window.innerHeight;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
        75, // fov = field of view
        width / height, // aspect ratio
        0.1, // near plane
        1000 // far plane
    );
    
    // set some distance from a cube that is located at z = 0
    camera.position.z = 100;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height );
    
    controls = new OrbitControls( camera, renderer.domElement );

    el.current.appendChild( renderer.domElement ); // mount using React ref
  }

  async function addGameObjects() {
    const [ issScene, earthScene ] = await Promise.all([Iss.load(DIMENSIONS.earthRadius), Earth.load(DIMENSIONS.earthRadius)]);
    iss = issScene.scene;
    earth = earthScene;
    scene.add(iss);
    // scene.add(earth);

    const lights = Lights.load();
    lights.forEach((l) => { scene.add(l) });
  }

  function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
  }

  function animate() {
    // controls.update();
    
    // Iss.update(iss);
    if (camera) {
      const q = eulerToQuaternion(props.rotation);
      camera.setRotationFromQuaternion(q);
    }

    Earth.update(earth);
    renderer.render( scene, camera );
    window.requestAnimationFrame(animate);
  }

  return (
    <div className="Scene" ref={el}></div>
  );
}

export default Scene;
