import {GameState} from "~/game/game-state";
import {System} from "./system";
import {GameResources} from "../game";

export class MoveSystem extends System {
  public update({players}: GameState, resources: GameResources): void {
    for (const p of players) {
      p.position.x += p.velocity.x;
      p.position.y += p.velocity.y;

      p.velocity.x = 0;
      p.velocity.y = 0;
    }
  }
}
