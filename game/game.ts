import {GameState, createGameState} from "./game-state";
import {Player} from "./player";
import {System} from "./system";

export class Game {
  public players: Player[] = [];

  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;

  private state!: GameState;

  constructor(private systems: Array<System>) {
    this.state = createGameState(1);
  }

  public boot() {
    this.canvas = document.querySelector("#game-canvas")!;
    this.canvas.width = 1000;
    this.canvas.height = 600;
    this.ctx = this.canvas.getContext("2d")!;

    this.state.player = {
      id: 0,
      position: {x: 0, y: 0},
      velocity: {x: 0, y: 0},
      speed: 10,
    };

    this.systems.forEach((system) => system.boot?.(this.state));

    this.step();
  }

  /**
   * Game loop
   */
  private step() {
    // update state
    this.update();
    // render
    this.render();
    requestAnimationFrame(() => this.step());
  }

  private render() {
    // throw new Error("Method not implemented.");
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.strokeRect(
      this.state.player.position.x,
      this.state.player.position.y,
      20,
      20
    );
  }

  private update() {
    //update position

    this.systems.forEach((system) => system.update?.(this.state));
  }
}
