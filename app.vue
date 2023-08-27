<template>
  <canvas id="game-canvas" />
</template>
<script setup lang="ts">
import {Game} from "~/game/game";
import {InputSystem} from "~/game/systems/input-system";
import {MoveSystem} from "~/game/systems/move-system";
import {RenderSystem} from "~/game/systems/render-system";

useHead({
  script: [
    {src: "https://js.pusher.com/8.2.0/pusher.min.js"},
    {src: "https://cdn.jsdelivr.net/npm/vue/dist/vue.js"},
  ],
});

onMounted(() => {
  // Enable pusher logging - don't include this in production
  // Pusher.logToConsole = true;

  const pusher = new Pusher("8e159b83fa8e7f9550d7", {
    cluster: "eu",
  });

  const channel = pusher.subscribe("my-channel");
  channel.bind("my-event", function (data: any) {
    console.log(data);
  });

  const game = new Game({
    systems: [new InputSystem(), new MoveSystem(), new RenderSystem()],
    resources: [{type: "client-id", id: 0}],
  });

  game.boot();
});
</script>
