import * as j from "@javelin/ecs";
import * as THREE from 'three';

import { Material, Mesh, Position, RigidBody, Rotation } from "../components";
import { THREE_Camera, THREE_Renderer, THREE_Scene } from '../resources';

export const threeRenderSystem = (world: j.World) => {
    
    let renderer = world.getResource(THREE_Renderer);
    let scene = world.getResource(THREE_Scene);
    let camera = world.getResource(THREE_Camera);


    // console.log("number with position",world.of(Position).length);
    // console.log("number with mesh",world.of(Mesh).length);
    // console.log("number with rb",world.of(RigidBody).length);
    // console.log("number with rotation",world.of(Rotation).length);
    // //apply component transformations to threejs objects
    world.query( Mesh, Position, Rotation).each((entity) => {
        let mesh = world.get(entity, Mesh);
        
        let pos = world.get(entity, Position);
        let rot = world.get(entity, Rotation);
        // console.log(pos);
        mesh!.position.set(pos!.x, pos!.y, pos!.z);
        // object3D!.quaternion.set(rot!.x, rot!.y, rot!.z, rot!.w);
        // object3D?.rotation.set(rot!.x, rot!.y, rot!.z);
        mesh?.rotation.set(rot!.x, rot!.y, rot!.z)
    });

    world.query(Material).as(Material).each((ent, material) => {
        // console.log("A");
        const msm = (material as THREE.MeshStandardMaterial)
        
        // if(msm.color.r > 255) msm.color.r = 0;
        // if(msm.color.g > 255) msm.color.g = 0;
        // if(msm.color.b > 255) msm.color.b = 0;

        let newCol = new THREE.Color(Math.random() * 255, Math.random() * 255, Math.random() * 255);
        // console.log(newCol)
        msm.color.lerp(newCol, 0.5);

        world.set(ent, Material, msm)

        // console.log(msm.color)
        // msm.color.offsetHSL( -10, 0.1, 0.01)

        // console.log((world.get(ent,Material) as THREE.MeshStandardMaterial).color);
    });

    // console.log(ents.length)

    renderer.render( scene, camera );
}



