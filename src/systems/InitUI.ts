import * as j from "@javelin/ecs"
import * as THREE from "three";
import RAPIER from '@dimforge/rapier3d-compat';

import { Collider, Geometry, Material, Mesh, Position, RigidBody, Rotation, Scale } from "../components";
import { RAPIER_World, THREE_Scene } from "../resources";

export const initUI = (world: j.World) => {

    let button = document.createElement("button");
    button.innerText = "Spawn Cube";

    button.addEventListener('click', () => {
        console.log("add physics cube");
        let scene = world.getResource(THREE_Scene);
        let rWorld = world.getResource(RAPIER_World);

        
        const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        const material = new THREE.MeshStandardMaterial( { color: 0xffff00 } );
        const cube = new THREE.Mesh( geometry, material);
        cube.position.set(0,7,0);
        cube.castShadow = true; //default is false
        cube.receiveShadow = true; //default
        scene.add(cube);

        const rigidBodyDesc = RAPIER.RigidBodyDesc.dynamic()
        .setTranslation(0.0, 7.0, 0.0);
        const rigidBody = rWorld.createRigidBody(rigidBodyDesc);
    
        // Create a cuboid collider attached to the dynamic rigidBody.
        const colliderDesc = RAPIER.ColliderDesc.cuboid(0.5, 0.5, 0.5);
        const collider = rWorld.createCollider(colliderDesc, rigidBody);
    
        let newEntity = world.create();
        world.add(newEntity, Mesh, cube);
        world.add(newEntity, Position, cube.position);
        world.add(newEntity, Rotation, cube.rotation);
        world.add(newEntity, Material, material);
        world.add(newEntity, Geometry, geometry);

        // world.add(newEntity, Scale, cube.scale);
        world.add(newEntity, RigidBody, rigidBody);
        world.add(newEntity, Collider, collider);

    });

    document.body.prepend(button)
}