<script setup lang="ts">
import EyeUnwatched from './icons/EyeNofill.vue';
import EyeWatched from './icons/EyeFill.vue';

defineProps<{
  watched: boolean;
  movieId?: string;
}>();

// TODO: Handle logic when movieCard is merged.
function setWatched() {
  console.log('toggle watched');
}
</script>

<template>
  <div role="button" class="eye" tabindex="0" @click.stop="setWatched" @keydown.space.prevent.stop="setWatched" @keydown.enter.stop="setWatched">
    <EyeWatched v-if="watched" />
    <EyeUnwatched v-else />
  </div>
</template>

<style scoped>
.eye {
  cursor: pointer;
}
</style>
