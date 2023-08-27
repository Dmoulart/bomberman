import {GameState} from "~/game/game-state";
import {Resource} from "../resources/resource";
import {Resources} from "../game";

export abstract class System<R extends Readonly<Array<Resource>> = any> {
  public boot(state: GameState, resources: Resources<R>): void {}

  public abstract update(state: GameState, resources: Resources<R>): void;
}
