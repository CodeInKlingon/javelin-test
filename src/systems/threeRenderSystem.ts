import * as j from "@javelin/ecs";
import * as THREE from 'three';

import { Object3D, Position, Rotation, THREE_Id } from "../components";
import { THREE_Camera, THREE_Renderer, THREE_Scene } from '../resources';

export const threeRenderSystem = (world: j.World) => {
    
    let renderer = world.getResource(THREE_Renderer);
    let scene = world.getResource(THREE_Scene);
    let camera = world.getResource(THREE_Camera);


    //apply component transformations to threejs objects
    const ents = world.of(THREE_Id, Position, Rotation)
    console.log(ents.length)
    ents.each((entity) => {
        let id = world.get(entity, THREE_Id);
        let object3D = scene.getObjectById(id!);
        
        let pos = world.get(entity, Position);
        let rot = world.get(entity, Rotation);
        // console.log(pos);
        object3D!.position.set(pos!.x, pos!.y, pos!.z);
        // object3D!.quaternion.set(rot!.x, rot!.y, rot!.z, rot!.w);
        // object3D?.rotation.set(rot!.x, rot!.y, rot!.z);
        object3D?.setRotationFromQuaternion( new THREE.Quaternion(rot!.x, rot!.y, rot!.z, rot!.w))
    })


    renderer.render( scene, camera );
}



