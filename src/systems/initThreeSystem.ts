import * as j from "@javelin/ecs"
import * as THREE from "three";
import { THREE_Camera, THREE_Renderer } from '../resources';

export const initThreeSystem = (world: j.World) => {

    let renderer = world.getResource(THREE_Renderer)
    document.body.appendChild( renderer.domElement );

    let camera = world.getResource(THREE_Camera);
    camera.position.z = 5;

    let resize = () => {
        renderer.setSize( window.innerWidth, window.innerHeight );
        if(camera instanceof THREE.PerspectiveCamera){
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        }
    };

    window.addEventListener('resize', () => {
        resize();
    });

    resize();
    
}

