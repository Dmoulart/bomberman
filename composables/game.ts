import {Player} from "./player";

export class Game {
  public player: Player = {
    position: {x: 0, y: 0},
    velocity: {x: 0, y: 0},
    speed: 10,
  };

  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;

  public boot() {
    this.listenToInput();
    this.canvas = document.querySelector("#game-canvas")!;
    this.canvas.width = innerWidth;
    this.canvas.height = innerHeight;
    this.ctx = this.canvas.getContext("2d")!;
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
    this.ctx.strokeRect(this.player.position.x, this.player.position.y, 20, 20);
  }

  private update() {
    //update position
    this.player.position.x += this.player.velocity.x;
    this.player.position.y += this.player.velocity.y;

    this.player.velocity.x = 0;
    this.player.velocity.y = 0;
  }

  private listenToInput() {
    document.addEventListener("keydown", ({key}) => {
      switch (key) {
        case "ArrowLeft":
          this.player.velocity.x = -1 * this.player.speed;
          break;
        case "ArrowRight":
          this.player.velocity.x = 1 * this.player.speed;
          break;
        case "ArrowUp":
          this.player.velocity.y = -1 * this.player.speed;
          break;
        case "ArrowDown":
          this.player.velocity.y = 1 * this.player.speed;
          break;
        default:
          this.player.velocity.x = 0;
          this.player.velocity.y = 0;
          break;
      }
    });
  }
}
