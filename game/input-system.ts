import {GameState} from "./game-state";
import {System} from "./system";

export class InputSystem extends System {
  public update(state: GameState): void {}

  public boot({player}: GameState) {
    document.addEventListener("keydown", ({key}) => {
      switch (key) {
        case "ArrowLeft":
          player.velocity.x = -1 * player.speed;
          break;
        case "ArrowRight":
          player.velocity.x = 1 * player.speed;
          break;
        case "ArrowUp":
          player.velocity.y = -1 * player.speed;
          break;
        case "ArrowDown":
          player.velocity.y = 1 * player.speed;
          break;
        default:
          player.velocity.x = 0;
          player.velocity.y = 0;
          break;
      }
    });
  }
}
