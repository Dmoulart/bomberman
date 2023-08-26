<template>
  <canvas id="game-canvas" />
</template>
<script setup lang="ts">
import {Game} from "~/composables/game";

onMounted(() => {
  const game = new Game();

  game.boot();
});
</script>
