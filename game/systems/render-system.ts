import {GameState} from "~/game/game-state";
import {System} from "./system";

export class RenderSystem extends System {
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;

  public boot(state: GameState): void {
    this.canvas = document.querySelector("#game-canvas")!;
    this.canvas.width = 1000;
    this.canvas.height = 600;
    this.ctx = this.canvas.getContext("2d")!;
  }

  public update({players}: GameState): void {
    for (const player of players) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.strokeRect(player.position.x, player.position.y, 20, 20);
    }
  }
}
