import { GameState, createGameState } from "./game-state";
import { Player } from "./player";
import { System } from "./system";

export class Game {
  public players: Player[] = [];

  private state!: GameState;

  constructor(private systems: Array<System>) {
    this.state = createGameState(1);
  }

  public boot() {
    this.state.player = {
      id: 0,
      position: { x: 0, y: 0 },
      velocity: { x: 0, y: 0 },
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

    requestAnimationFrame(() => this.step());
  }

  private update() {
    //update position

    this.systems.forEach((system) => system.update?.(this.state));
  }
}
