import * as j from "@javelin/ecs"
// export const THREE_Id = j.value<number>()
// export const RAPIER_Handle = j.value<number>()
import RAPIER from '@dimforge/rapier3d-compat';

export const RigidBody = j.value<RAPIER.RigidBody>();
export const Collider = j.value<RAPIER.Collider>();
// export const Object3D = j.value<THREE.Object3D>();
export const Mesh = j.value<THREE.Mesh>();
export const Geometry = j.value<THREE.BufferGeometry>();
export const Material = j.value<THREE.Material>();

export const Scale = j.value({x: "f32", y: "f32", z: "f32"})
export const Rotation = j.value<THREE.Euler>()
export const Position = j.value<THREE.Vector3>()
export const Transform = j.type(Position, Rotation, Scale);

export const Color = j.value<string>()

export const SpinningCube = j.tag();

