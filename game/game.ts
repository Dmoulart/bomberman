import {GameState, createGameState} from "./game-state";
import {System} from "./systems/system";
import {Resource} from "./resources/resource";

export type GameConfig<R extends Resource[], S extends System<R>[]> = {
  /**
   * The systems are the game logic modules wich modify the game state at each update.
   */
  systems: S;
  /**
   * The global game resources used by the systems.
   */
  resources: R;
};

export class Game<R extends Resource[], S extends System<R>[]> {
  private state!: GameState;

  private systems!: S;

  public resources: Resources<R> = {} as Resources<R>;

  public constructor({resources, systems}: GameConfig<R, S>) {
    this.systems = systems;

    // build game resources map
    for (const resource of resources) {
      type ResourceKey = keyof Resources<R>;
      type ResourceValue = Resources<R>[typeof resource.type];
      this.resources[resource.type as ResourceKey] = resource as ResourceValue;
    }

    this.systems.push();

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

/**
 * The game resources type describes a map of game resources
 * with resource type as key and resource object as value.
 * It accomplish a sort of reduce operation from an array of resource.
 * @example from [{type: 'server-id', id: 1}, {type: 'client-id', id: 1}]
 * to {'server-id': {type: 'server-id', id: 1},'server-id': {type: 'client-id', id: 1}}
 */
export type Resources<T extends Array<Resource>> = {
  [key in T[number]["type"]]: T[number] extends infer Type
    ? Type extends {type: key}
      ? Type
      : never
    : never;
};
