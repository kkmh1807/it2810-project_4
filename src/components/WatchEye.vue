<script setup lang="ts">
import EyeUnwatched from './icons/Eye_no_fill.vue';
import EyeWatched from './icons/Eye_fill.vue';

defineProps<{
  watched: boolean;
  movieId?: string;
}>();
</script>

<template>
  <EyeUnwatched class="eye" v-if="!watched" tabIndex="{0}" />
  <EyeWatched class="eye" v-if="watched" tabIndex="{0}" />
</template>

<style scoped>
.eye {
  cursor: pointer;
}
</style>
