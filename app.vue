<template>
  <canvas id="game-canvas" />
</template>
<script setup lang="ts">
import {Game} from "~/game/game";
import {InputSystem} from "~/game/systems/input-system";
import {MoveSystem} from "~/game/systems/move-system";
import {RenderSystem} from "~/game/systems/render-system";

onMounted(() => {
  const game = new Game({
    systems: [new InputSystem(), new MoveSystem(), new RenderSystem()],
    resources: [{type: "client-id", id: 0}],
  });

  game.boot();
});
</script>
