import {GameState} from "./game-state";

export abstract class System {
  public boot(state: GameState): void {}
  public abstract update(state: GameState): void;
}
