import * as j from "@javelin/ecs"
import * as THREE from "three";
import RAPIER from '@dimforge/rapier3d-compat';

import { Object3D, Position, RAPIER_Handle, RigidBody, Rotation, THREE_Id } from "../components";
import { RAPIER_World, THREE_Scene } from "../resources";

export const initUI = (world: j.World) => {

    let button = document.createElement("button");
    button.innerText = "Spawn Cube";

    button.addEventListener('click', () => {
        console.log("add physics cube");
        let scene = world.getResource(THREE_Scene);
        let rWorld = world.getResource(RAPIER_World);

        
        const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
        const cube = new THREE.Mesh( geometry, material );
        cube.position.set(0,7,0);
        scene.add(cube);

        let rigidBodyDesc = RAPIER.RigidBodyDesc.dynamic()
        .setTranslation(0.0, 7.0, 0.0);
        let rigidBody = rWorld.createRigidBody(rigidBodyDesc);
    
        // Create a cuboid collider attached to the dynamic rigidBody.
        let colliderDesc = RAPIER.ColliderDesc.cuboid(0.5, 0.5, 0.5);
        rWorld.createCollider(colliderDesc, rigidBody);
    
        console.log(cube.id)
        let newEntity = world.create();
        world.add(newEntity, THREE_Id, cube.id)
        world.add(newEntity, Object3D);
        world.add(newEntity, Position, {x:cube.position.x,y: cube.position.y,z: cube.position.z});
        world.add(newEntity, Rotation);
        world.add(newEntity, RAPIER_Handle, rigidBody.handle);
        world.add(newEntity, RigidBody);
    });

    document.body.prepend(button)
}