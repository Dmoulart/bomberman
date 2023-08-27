import {GameState, createGameState} from "./game-state";
import {System} from "./systems/system";
import {Resource} from "./resources/resource";

export type GameResources = Map<Resource["type"], Resource>;

export type GameConfig = {
  systems: Array<System>;
  resources?: Array<Resource>;
};

export class Game {
  private state!: GameState;

  private systems!: Array<System>;

  private resources: GameResources = new Map();

  constructor({systems, resources = []}: GameConfig) {
    this.systems = systems;

    for (const resource of resources) {
      this.resources.set(resource.type, resource);
    }

    this.state = createGameState(1);
  }

  public boot() {
    this.systems.forEach((system) => system.boot?.(this.state, this.resources));

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

    this.systems.forEach((system) =>
      system.update?.(this.state, this.resources)
    );
  }
}
