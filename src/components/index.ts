import * as j from "@javelin/ecs"
export const THREE_Id = j.value<number>()
export const RAPIER_Handle = j.value<number>()

export const RigidBody = j.tag();
export const Object3D = j.tag();

export const Rotation = j.value({x: "f64", y: "f64", z:"f64", w: "f64"})
export const Position = j.value({x: "f64", y: "f64", z: "f64"})
export const Color = j.value<string>()

export const SpinningCube = j.tag();


export const Box = j.type(Position, Color)
