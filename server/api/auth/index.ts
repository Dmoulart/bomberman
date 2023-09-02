import {ServerSystem} from "~/game/systems/server-system";
import {game} from "~/modules/game";
import {WebSocketServer} from "ws";

const wss = new WebSocketServer({
  port: 8080,
});

wss.on("connection", function connection(ws) {
  console.log("new connection");
  ws.on("error", console.error);

  ws.send(JSON.stringify({type: "message", data: {msg: "data"}}));

  ws.on("message", async function message(message) {
    console.log("received: %s", message);

    try {
    } catch (e) {
      console.error(`Error  ${e}`);
      ws.send(
        JSON.stringify({
          type: "error",
          message: e,
        })
      );
    }
  });
});

export default defineEventHandler(async (event) => {
  //   const body = await readBody(event);
  //   const socketId = body.socket_id;
  //   console.log("ok auth");
  //   if (!socketId) return {err: "Need socket_id"};
  //   const user = {
  //     id: "some_id",
  //     user_info: {
  //       name: "John Smith",
  //     },
  //     watchlist: ["another_id_1", "another_id_2"],
  //   };
  //   const serverSystem = game.getSystem(ServerSystem);
  //   const auth = serverSystem.socket.authenticateUser(socketId, user);
  //   return auth;
});
