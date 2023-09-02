import {ServerSystem} from "~/game/systems/server-system";
import {game} from "~/modules/game";
export function processAuth(body: Record<string, any>) {}

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const socketId = body.socket_id;

  console.log("ok auth");
  if (!socketId) return {err: "Need socket_id"};

  const user = {
    id: "some_id",
    user_info: {
      name: "John Smith",
    },
    watchlist: ["another_id_1", "another_id_2"],
  };

  const serverSystem = game.getSystem(ServerSystem);
  const auth = serverSystem.socket.authenticateUser(socketId, user);
  return auth;
});
