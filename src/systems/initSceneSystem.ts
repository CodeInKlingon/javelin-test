import * as j from "@javelin/ecs";
import * as THREE from "three";
import { Object3D, Position, RAPIER_Handle, Rotation, SpinningCube, THREE_Id, RigidBody } from "../components";
import { RAPIER_World, THREE_Camera, THREE_Scene } from "../resources";
import RAPIER from '@dimforge/rapier3d-compat';

export const initSceneSystem = (world: j.World) => {

    let scene = world.getResource(THREE_Scene)
    let camera = world.getResource(THREE_Camera)
    let rWorld = world.getResource(RAPIER_World);
    
    if(!scene || !camera) return
    
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const cube = new THREE.Mesh( geometry, material );
    cube.position.y = 5;
    scene.add( cube );


    let rigidBodyDesc = RAPIER.RigidBodyDesc.kinematicPositionBased()
    .setTranslation(0.0, 5.0, 0.0);
    let rigidBody = rWorld.createRigidBody(rigidBodyDesc);

    // Create a cuboid collider attached to the dynamic rigidBody.
    let colliderDesc = RAPIER.ColliderDesc.cuboid(0.5, 0.5, 0.5);
    rWorld.createCollider(colliderDesc, rigidBody);

    let newEntity = world.create();
    world.add(newEntity, THREE_Id, cube.id)
    world.add(newEntity, SpinningCube);
    world.add(newEntity, Object3D);
    world.add(newEntity, Position, {
        x: cube.position.x,
        y: cube.position.y,
        z: cube.position.z
    });
    world.add(newEntity, Rotation);
    world.add(newEntity, RAPIER_Handle, rigidBody.handle);
    world.add(newEntity, RigidBody);

    


    let groundColliderDesc = RAPIER.ColliderDesc.cuboid(10.0, 0.1, 10.0);
    rWorld.createCollider(groundColliderDesc);




    camera.position.z = 100;
    camera.position.y = 5;
    camera.rotation.x = Math.PI * -0.1

}