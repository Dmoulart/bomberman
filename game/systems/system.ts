import {GameState} from "~/game/game-state";
import {Resource} from "../resources/resource";
import {GameResources} from "../game";

export abstract class System {
  public boot(state: GameState, resources: GameResources): void {}
  public abstract update(state: GameState, resources: GameResources): void;
}
