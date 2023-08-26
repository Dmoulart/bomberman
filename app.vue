<template>
  <canvas id="game-canvas" />
</template>
<script setup lang="ts">
import {Game} from "~/game/game";
import {InputSystem} from "~/game/input-system";
import {MoveSystem} from "~/game/move-system";

onMounted(() => {
  const game = new Game([new InputSystem(), new MoveSystem()]);

  game.boot();
});
</script>
