import {Player} from "./player";

export type GameState = {
  gameId: number;
  players: Array<Player>;
  player: Player;
};

export function createGameState(gameId: number): GameState {
  return {
    gameId,
    players: [],
    player: {} as Player,
  } as GameState;
}
