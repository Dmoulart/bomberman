import {Player} from "./player";

export type GameState = {
  gameId: number;
  players: Array<Player>;
};

export function createGameState(gameId: number): GameState {
  return {
    gameId,
    players: [
      {
        clientId: 0,
        position: {x: 0, y: 0},
        velocity: {x: 0, y: 0},
        speed: 10,
      },
    ],
  } as GameState;
}
