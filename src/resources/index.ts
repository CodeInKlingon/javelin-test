import * as j from "@javelin/ecs"
import * as THREE from 'three';
import RAPIER from '@dimforge/rapier3d-compat';

export const Context2D = j.resource<CanvasRenderingContext2D>()
export const THREE_Scene = j.resource<THREE.Scene>()
export const THREE_Camera = j.resource<THREE.Camera>()
export const THREE_Renderer = j.resource<THREE.Renderer>()

export const RAPIER_World = j.resource<RAPIER.World>()
