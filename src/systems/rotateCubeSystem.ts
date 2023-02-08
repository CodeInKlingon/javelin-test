import * as j from "@javelin/ecs";
import * as THREE from 'three';

import { SpinningCube, RigidBody } from "../components";
import { RAPIER_World } from '../resources';

export const rotateCubeSystem = (world: j.World) => {
    
    // let scene = world.getResource(THREE_Scene)
    let rWorld = world.getResource(RAPIER_World)
    let cubes = world.query(SpinningCube, RigidBody);

    cubes.each( (cube) => {

        // set rotation on component
        // let rotation = world.get(cube, Rotation);
        // rotation!.x += 0.01;
        // rotation!.y += 0.01;
        
        // let id = world.get(cube, THREE_Id);
        // let threeObject = scene.getObjectById(id!)
        // threeObject!.rotation.x += 0.01;
        // threeObject!.rotation.y += 0.01;
        
        let rb = world.get(cube, RigidBody);
        let rot = rb!.rotation();
        const q = new THREE.Quaternion(rot.x,rot.y,rot.z,rot.w);

        q.multiply(new THREE.Quaternion(1,1,0.01,0.01))
        
        rb!.setRotation(
            {x: q.x,y: q.y, z: q.z, w: q.w},
            true
        );

        // console.log(rb?.rotation());
        
    })

}



