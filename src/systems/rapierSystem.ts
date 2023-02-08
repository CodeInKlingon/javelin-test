import { RAPIER_World } from "../resources"
import * as j from "@javelin/ecs"
import { Mesh, Position, RigidBody, Rotation } from "../components";
import { Euler, Quaternion, Vector3 } from "three";

export const rapierSystem = (world : j.World) => {

    let rWorld = world.getResource(RAPIER_World);

    //apply physics world transformations to components
    world.query(RigidBody, Position, Rotation).each((entity)=>{
        let body = world.get(entity,RigidBody);
        // let body = rWorld.bodies.get(handle!);
        let t = body!.translation();
        let r = body!.rotation();
        // console.log(r);
        let mesh = world.get(entity,Mesh);

        // console.log(mesh?.rotation);
        world.set(entity, Position,
            new Vector3(t.x, t.y, t.z)
        );

        let euler = new Euler();
        euler.setFromQuaternion( new Quaternion(r.x,r.y,r.z,r.w));
        world.set(entity, Rotation,
            euler
        );
        // console.log(euler.x == mesh!.rotation.x && euler.y == mesh!.rotation.y && euler.z == mesh!.rotation.z)

    });

    rWorld.step();
}