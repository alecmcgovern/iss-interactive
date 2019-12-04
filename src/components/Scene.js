import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import * as Iss from './GameObjects/iss';

import './Scene.css';
// https://threejs.org/examples/#webgl_lights_spotlights


function Scene(props) {
  // const [gameScene, setGameScene] = useState(null);

  const el = useRef(null);
  let scene, camera, renderer, object, controls; // requestID

  useEffect(() => {
    sceneSetup();
    addGameObjects();
    animate();
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
    const iss = await Iss.load();
    scene.add(iss.scene);

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

  // function createSpotlight( color ) {
  //   var newObj = new THREE.SpotLight( color, 2 );
  //   newObj.castShadow = true;
  //   newObj.angle = 0.3;
  //   newObj.penumbra = 0.2;
  //   newObj.decay = 2;
  //   newObj.distance = 50;
  //   return newObj;
  // }

  function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
  }

  function animate() {
    if (object && object.rotation) {
      // object.rotation.x += 0.01;
      // object.rotation.y += 0.01;
    }
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
