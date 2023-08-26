import {GameState} from "./game-state";
import {System} from "./system";

export class MoveSystem extends System {
  public update({player, players}: GameState): void {
    for (const p of players.concat(player)) {
      p.position.x += p.velocity.x;
      p.position.y += p.velocity.y;

      p.velocity.x = 0;
      p.velocity.y = 0;
    }
  }
}
