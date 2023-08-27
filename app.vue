<template>
  <canvas id="game-canvas" />
</template>
<script setup lang="ts">
import { Game } from "~/game/game";
import { InputSystem } from "~/game/input-system";
import { MoveSystem } from "~/game/move-system";
import { RenderSystem } from "~/game/render-system";

onMounted(() => {
  const game = new Game([
    new InputSystem(),
    new MoveSystem(),
    new RenderSystem(),
  ]);

  game.boot();
});
</script>
