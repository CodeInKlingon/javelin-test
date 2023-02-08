import * as j from "@javelin/ecs";
import * as THREE from "three";
import {Position, Rotation, SpinningCube, RigidBody, Mesh, Scale, Collider } from "../components";
import { RAPIER_World, THREE_Camera, THREE_Scene } from "../resources";
import RAPIER from '@dimforge/rapier3d-compat';

export const initSceneSystem = (world: j.World) => {

    let scene = world.getResource(THREE_Scene)
    let camera = world.getResource(THREE_Camera)
    let rWorld = world.getResource(RAPIER_World);
    
    if(!scene || !camera) return
    
    let ambientLight = new THREE.AmbientLight(0xBBB000, 1)
    scene.add(ambientLight);
    let directionalLight = new THREE.DirectionalLight(0xFFF000,0.6);
    directionalLight.position.set(-0.5,1,1);
    directionalLight.castShadow = true; // default false
    directionalLight.receiveShadow = true; // default false

    directionalLight.shadow.mapSize.width = 512; // default
    directionalLight.shadow.mapSize.height = 512; // default
    directionalLight.shadow.camera.near = 0.5; // default
    directionalLight.shadow.camera.far = 500; // default
    scene.add(directionalLight);
    
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );
    const cube = new THREE.Mesh( geometry, material );
    cube.castShadow = true; //default is false
    cube.receiveShadow = true; //default
    cube.position.y = 5;
    scene.add( cube );


    let rigidBodyDesc = RAPIER.RigidBodyDesc.kinematicPositionBased()
    .setTranslation(0.0, 5.0, 0.0);
    let rigidBody = rWorld.createRigidBody(rigidBodyDesc);

    // Create a cuboid collider attached to the dynamic rigidBody.
    let colliderDesc = RAPIER.ColliderDesc.cuboid(0.5, 0.5, 0.5);
    let collider = rWorld.createCollider(colliderDesc, rigidBody);

    let newEntity = world.create();
    // world.add(newEntity, THREE_Id, cube.id)
    world.add(newEntity, SpinningCube);
    world.add(newEntity, Mesh, cube);
    world.add(newEntity, Position, cube.position);
    world.add(newEntity, Rotation, cube.rotation);
    world.add(newEntity, Scale, cube.scale);
    world.add(newEntity, RigidBody, rigidBody);
    world.add(newEntity, Collider, collider);

    


    let groundColliderDesc = RAPIER.ColliderDesc.cuboid(10.0, 0.1, 10.0);
    rWorld.createCollider(groundColliderDesc);

    const pgeometry = new THREE.PlaneGeometry( 20, 20 );
    const pmaterial = new THREE.MeshStandardMaterial( { color: 0x54d65a } );
    const plane = new THREE.Mesh( pgeometry, pmaterial);
    plane.rotation.x = Math.PI * -0.5
    plane.receiveShadow = true; //default
    scene.add(plane)
  


    camera.position.z = 100;
    camera.position.y = 5;
    camera.rotation.x = Math.PI * -0.1

}