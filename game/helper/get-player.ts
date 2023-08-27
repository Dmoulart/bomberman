import {GameResources} from "../game";
import {GameState} from "../game-state";

export function getPlayer(state: GameState, resources: GameResources) {
  const clientId = resources.get("client-id");
  return state.players.find((player) => player.clientId === clientId!.id)!;
}
