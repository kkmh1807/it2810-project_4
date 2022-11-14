<script setup lang="ts">
import EyeUnwatched from './icons/EyeNofill.vue';
import EyeWatched from './icons/EyeFill.vue';

defineProps<{
  watched: boolean;
  movieId?: string;
}>();
// TODO: Handle logic when movieCard is merged.
</script>

<template>
  <EyeUnwatched class="eye" v-if="!watched" tabIndex="0" />
  <EyeWatched class="eye" v-else tabIndex="0" />
</template>

<style scoped>
.eye {
  cursor: pointer;
}
</style>
