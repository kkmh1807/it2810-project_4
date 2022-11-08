<script setup lang="ts">
import useGraphqlData from '@/composables/useGraphqlData';
import { useMoviesStore } from '@/stores/movies';
import { useQueryStore } from '@/stores/queryStore';
import { QueryMode, QueryModeValues } from '@/types/query';
import { storeToRefs } from 'pinia';
import { onBeforeMount, ref } from 'vue';

const { queryMode, queryKey } = storeToRefs(useQueryStore());
const { getMoviesByAll } = useMoviesStore();

const genres = ref<string[]>();

onBeforeMount(async () => {
  const response = await useGraphqlData<{ genres: string[] }>('query { genres }');
  genres.value = response.genres;
});
</script>

<template>
  <section role="search" class="search-bar">
    <select v-model="queryMode" class="mode-dropdown">
      <option v-for="mode in QueryMode" :key="mode" :value="mode">
        {{ QueryModeValues[mode] }}
      </option>
    </select>

    <select v-if="queryMode === QueryMode.GENRE" v-model="queryKey" class="search-input">
      <option disabled hidden value="">Select genre...</option>
      <option v-for="genre in genres" :key="genre" :value="genre">
        {{ genre }}
      </option>
    </select>
    <input v-else v-model="queryKey" @keydown.enter="getMoviesByAll" placeholder="Search..." class="search-input" />

    <button @click="getMoviesByAll" class="search-button">Search</button>
  </section>
</template>

<style scoped>
.search-bar {
  display: flex;
  margin: 0 auto;
  width: 100%;
  max-width: 1024px;
}

.search-bar > * {
  border: 0;
  padding: 0.75rem;
  font-size: 1.5rem;
}

.search-bar > *:hover,
.search-bar > *:focus {
  filter: brightness(95%);
}

.mode-dropdown {
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;
}

.search-input {
  min-width: 250px;
  flex-grow: 1;
}

.search-button {
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
}
</style>
