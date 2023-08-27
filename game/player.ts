import {Vec} from "./math/vec";

export type Player = {
  clientId: number;
  position: Vec;
  velocity: Vec;
  speed: number;
};
