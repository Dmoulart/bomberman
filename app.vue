<template>
  <canvas id="game-canvas" />
  <div style="color: white; font-size: 124px">{{ msg }}</div>
</template>
<script setup lang="ts">
import {Game} from "~/game/game";
import {InputSystem} from "~/game/systems/input-system";
import {MoveSystem} from "~/game/systems/move-system";
import {RenderSystem} from "~/game/systems/render-system";
import {ClientSystem} from "~/game/systems/client-system";
import Pusher from "pusher-js";
import {createEventStream} from "./composables/stream";

let msg = ref("no data");

onMounted(() => {
  const eventStream = createEventStream<{
    message: {msg: string};
    error: {message: string};
  }>("ws://localhost:8080");
  const {send, on} = eventStream;
  on("message", ({}) => {
    console.log("receive msg");
    msg.value = "ok";
  });

  on("error", ({}) => {});

  const game = new Game({
    systems: [
      new InputSystem(),
      new MoveSystem(),
      new RenderSystem(),
      // new ClientSystem(),
    ],
    resources: [
      {type: "client-id", id: 0},
      // {
      //   type: "pusher-cli-opts",
      //   appKey: "8e159b83fa8e7f9550d7",
      //   cluster: "eu",
      //   authEndpoint: "/api/auth",
      //   userAuthentication: {
      //     endpoint: "/api/auth",
      //     transport: "ajax",
      //   },
      // },
    ],
  });

  game.boot();
});
</script>

<style>
body {
  background: black;
}
</style>
