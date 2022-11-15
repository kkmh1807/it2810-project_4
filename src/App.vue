<script setup lang="ts">
import { storeToRefs } from 'pinia';
import SearchBar from './components/SearchBar.vue';
import PaginationBar from './components/PaginationBar.vue';
import MovieCard from './components/MovieCard.vue';
import LogoComponent from './components/LogoComponent.vue';
import { useMoviesStore } from './stores/movies';
import SortingParams from './components/SortingParams.vue';

const { movies, totalPages } = storeToRefs(useMoviesStore());
</script>

<template>
  <header :class="{ 'with-content': movies && movies.length > 0 }" class="container">
    <LogoComponent class="logo" :large="!(movies && movies.length > 0)" />
    <SearchBar />
  </header>

  <main class="container">
    <SortingParams :class="{ 'hide-sorting': !(movies && movies.length > 0) }" />
    <MovieCard v-for="movie in movies" :key="movie._id" :movie="movie" />
  </main>

  <footer class="container">
    <PaginationBar v-if="totalPages" />
    <div v-if="movies?.length === 0" class="no-content">We could not find any movies matching your search</div>
  </footer>
</template>

<style scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;
}

header.with-content {
  flex-direction: row;
}

main {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.container {
  width: 90%;
  max-width: 1024px;
  margin: 0 auto;
}

.container:first-child {
  margin-bottom: 1rem;
}

.container:last-child {
  margin-top: 1rem;
}

.hide-sorting {
  display: none;
}

.no-content {
  text-align: center;
  font-size: 1.2rem;
}
</style>
