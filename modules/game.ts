import {createResolver, defineNuxtModule, addServerHandler} from "nuxt/kit";
import {Game} from "../game/game";
import {MoveSystem} from "../game/systems/move-system";
import {ServerSystem} from "../game/systems/server-system";

export default defineNuxtModule(() => {
  const game = new Game({
    systems: [new MoveSystem(), new ServerSystem()],
    resources: [
      {
        type: "pusher-srv-opts",
        appId: "1659676",
        key: "8e159b83fa8e7f9550d7",
        secret: "86f5c41a305b4e85f269",
        cluster: "eu",
        useTLS: true,
      },
    ],
  });
});
