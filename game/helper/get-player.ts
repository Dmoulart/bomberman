import {Resources} from "../game";
import {GameState} from "../game-state";
import {ClientID} from "../resources/client-id";

export function getPlayer(state: GameState, resources: Resources<[ClientID]>) {
  const clientId = resources["client-id"];
  return state.players.find((player) => player.clientId === clientId!.id)!;
}
