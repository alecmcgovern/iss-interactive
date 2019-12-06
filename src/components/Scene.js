import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import * as Iss from './GameObjects/iss';
import * as Earth from './GameObjects/earth';

import './scene.scss';
// https://threejs.org/examples/#webgl_lights_spotlights


function Scene(props) {
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
    const earthRadius = 20;
    const [ issScene, earthScene ] = await Promise.all([Iss.load(earthRadius), Earth.load(earthRadius)]);
    iss = issScene.scene;
    earth = earthScene;
    scene.add(iss);
    scene.add(earth);

    const lights = [];
    lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
    lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
    lights[ 2 ] = new THREE.PointLight( 0xffffff, 1, 0 );

    lights[ 0 ].position.set( 0, 200, 0 );
    lights[ 1 ].position.set( 100, 200, 100 );
    lights[ 2 ].position.set( - 100, - 200, - 100 );

    scene.add( lights[ 0 ] );
    scene.add( lights[ 1 ] );
    scene.add( lights[ 2 ] );
  }

  function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
  }

  function animate() {
    // Iss.update(iss);
    Earth.update(earth);
    controls.update();
    renderer.render( scene, camera );
    window.requestAnimationFrame(animate);
  }

  return (
    <div className="Scene" ref={el}>

    </div>
  );
}

export default Scene;
