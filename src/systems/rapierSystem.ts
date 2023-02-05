import { RAPIER_World } from "../resources"
import * as j from "@javelin/ecs"
import { Position, RAPIER_Handle, RigidBody, Rotation } from "../components";

export const rapierSystem = (world : j.World) => {

    let rWorld = world.getResource(RAPIER_World);

    //apply physics world transformations to components
    world.of(RAPIER_Handle, RigidBody, Position, Rotation).each((entity)=>{
        let handle = world.get(entity,RAPIER_Handle);
        let body = rWorld.bodies.get(handle!);
        let t = body!.translation();
        let r = body!.rotation();
        // console.log(t);
        // console.log(r);
        world.set(entity, Position,
            {x: t.x, y: t.y, z: t.z}
        );
        world.set(entity, Rotation,
            {x: r.x, y: r.y, z: r.z, w: r.w}
        );

    });

    rWorld.step();
}