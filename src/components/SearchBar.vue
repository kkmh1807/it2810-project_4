<script setup lang="ts">
import useGraphqlData from '@/composables/useGraphqlData';
import { useMoviesStore } from '@/stores/movies';
import { usePaginationStore } from '@/stores/pagination';
import { useQueryStore } from '@/stores/query';
import { QueryMode, QueryModeValues } from '@/types/query';
import { storeToRefs } from 'pinia';
import { onBeforeMount, ref, watch } from 'vue';
import SearchIcon from './icons/SearchIcon.vue';

const { queryMode, queryKey } = storeToRefs(useQueryStore());
const { currentPage } = storeToRefs(usePaginationStore());
const { searchMovies } = useMoviesStore();

const genres = ref<string[]>();

onBeforeMount(async () => {
  const response = await useGraphqlData<{ genres: string[] }>('query { genres }');
  genres.value = response.genres;
});

watch(queryMode, () => {
  queryKey.value = '';
});

function handleSearch() {
  currentPage.value = 1;
  searchMovies();
}
</script>

<template>
  <section role="search" class="search-bar">
    <select v-model="queryMode" class="mode-dropdown">
      <option v-for="mode in QueryMode" :key="mode" :value="mode">
        {{ QueryModeValues[mode] }}
      </option>
    </select>

    <select
      v-if="queryMode === QueryMode.GENRE"
      v-model="queryKey"
      :class="{ invalid: !queryKey }"
      class="search-input"
      @keydown.prevent.enter="handleSearch"
    >
      <option disabled hidden value="">Select genre...</option>
      <option v-for="genre in genres" :key="genre" :value="genre">
        {{ genre }}
      </option>
    </select>
    <input v-else v-model="queryKey" :class="{ invalid: !queryKey }" class="search-input" placeholder="Search..." @keydown.enter="handleSearch" />

    <button @click="handleSearch" class="search-button" :disabled="!queryKey">
      <SearchIcon width="25" height="25" />
    </button>
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
  cursor: pointer;
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
  border-right: 1px solid grey;
}

.search-input {
  min-width: 250px;
  flex-grow: 1;
  z-index: 2;
}

.search-input.invalid:focus {
  outline: 2px solid red;
}

.search-button {
  cursor: pointer;
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  background-color: var(--color-snow-white);
  border-left: 1px solid grey;
  display: grid;
  align-items: center;
}

.search-button:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}
</style>
