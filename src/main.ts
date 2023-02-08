import * as j from "@javelin/ecs"
import * as THREE from 'three';
import RAPIER from '@dimforge/rapier3d-compat';

import { RAPIER_World, THREE_Camera, THREE_Renderer, THREE_Scene } from "./resources";
import { initSceneSystem, initThreeSystem, threeRenderSystem } from './systems';
import { rotateCubeSystem } from "./systems/rotateCubeSystem";
import { rapierSystem } from "./systems/rapierSystem";
import { initUI } from "./systems/InitUI";

let app = j.app();

await RAPIER.init().then(
  () => {
      let gravity = { x: 0.0, y: -9.81, z: 0.0 };
      let world = new RAPIER.World(gravity);
      app.addResource(RAPIER_World, world);

    return RAPIER
  }
);


const scene = new THREE.Scene();
app.addResource(THREE_Scene, scene);

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
app.addResource(THREE_Camera, camera);

const renderer = new THREE.WebGLRenderer();
app.addResource(THREE_Renderer, renderer);


app.addInitSystem(initThreeSystem);
app.addInitSystem(initSceneSystem);
app.addInitSystem(initUI);

app.addSystem(rapierSystem);
app.addSystem(rotateCubeSystem);
app.addSystem(threeRenderSystem);

// app.addSystemToGroup(j.Group.LateUpdate, threeRenderSystem)


// call all registered systems
app.step()



camera.position.z = 5;

function animate() {
  requestAnimationFrame( animate );
  app.step()
};

animate();

