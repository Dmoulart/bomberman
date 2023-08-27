import {GameState} from "~/game/game-state";
import {Resource} from "../resources/resource";
import {Resources} from "../game";

export interface System<R extends Array<Resource> = any> {
  boot?: (state: GameState, resources: Resources<R>) => void;

  update(state: GameState, resources: Resources<R>): void;
}
