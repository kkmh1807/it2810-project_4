<script setup lang="ts">
import EyeUnwatched from './icons/EyeNofill.vue';
import EyeWatched from './icons/EyeFill.vue';
import useGraphqlData from '@/composables/useGraphqlData';
import { useMoviesStore } from '@/stores/movies';

const props = defineProps<{
  watched: boolean;
  movieId: string;
}>();

async function setWatched() {
  const mutationQuery = `mutation { toggleWatched(id: "${props.movieId}", watched: ${!props.watched}) { Watched }}`;
  await useGraphqlData<{}>(mutationQuery);

  const { searchMovies } = useMoviesStore();
  searchMovies();
}
</script>

<template>
  <div role="button" class="eye" tabindex="0" @click.stop="setWatched" @keydown.space.prevent.stop="setWatched" @keydown.enter.stop="setWatched">
    <EyeWatched v-if="watched" data-cy="eye-watched" />
    <EyeUnwatched v-else data-cy="eye-unwatched" />
  </div>
</template>

<style scoped>
.eye {
  cursor: pointer;
}
</style>
