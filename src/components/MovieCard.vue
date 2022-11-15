<script setup lang="ts">
import type { Movie } from '@/types/movie';
import { ref } from 'vue';
import ExpandMore from './icons/ExpandMore.vue';
import ExpandLess from './icons/ExpandLess.vue';
import WatchEye from './WatchEye.vue';

defineProps<{
  movie: Movie;
}>();

const showDetails = ref(false);
</script>

<template>
  <div
    class="movie-card"
    tabindex="0"
    @click="showDetails = !showDetails"
    @keydown.space.prevent="showDetails = !showDetails"
    @keydown.enter="showDetails = !showDetails"
  >
    <img class="poster" :src="movie.Poster_Link" alt="Movie Poster" @error.prevent="(e: any) => e.target && (e.target.src = '/logo.svg')" />
    <div class="title">{{ movie.Series_Title }}</div>
    <div class="genre">Genre: {{ movie.Genre }}</div>
    <div class="rating">Rating: {{ movie.IMDB_Rating }}</div>
    <div class="dropdown-arrow">
      <ExpandLess v-if="showDetails" />
      <ExpandMore v-else />
    </div>
    <div :class="{ open: showDetails }" class="movie-card-details">
      <div>
        <h3>Overview</h3>
        {{ movie.Overview }}
      </div>
      <div class="stars">
        <h3>Starring</h3>
        <span>{{ movie.Star1 }}</span>
        <span>{{ movie.Star2 }}</span>
        <span>{{ movie.Star3 }}</span>
        <span>{{ movie.Star4 }}</span>
      </div>
      <WatchEye class="eye" :watched="movie.Watched" :movieId="movie._id" />
    </div>
  </div>
</template>

<style scoped>
.movie-card {
  background-color: #fcf7f7;
  color: black;
  width: 100%;
  display: grid;
  grid-template-areas:
    'poster title title title details'
    'poster genre star rating details';
  grid-template-columns: auto 1.5fr 1.5fr 0.5fr 85px;
  align-items: center;
  cursor: pointer;
  border-radius: 0.5rem;
  overflow: hidden;
}

h3 {
  font-weight: bold;
}

.poster {
  grid-area: poster;
  width: 70px;
  aspect-ratio: 70 / 102;
}

.title {
  grid-area: title;
  font-size: 1.2rem;
  margin-left: 0.5rem;
}

.movie-card:focus .title,
.movie-card:hover .title {
  text-decoration: underline;
}

.genre {
  grid-area: genre;
  margin-left: 0.5rem;
}
.star {
  grid-area: star;
}
.rating {
  grid-area: rating;
}
.dropdown-arrow {
  grid-area: details;
  display: flex;
  align-items: center;
  justify-content: center;
  border-left: 1px solid #8b8b8b;
  width: 85px;
}

.movie-card-details {
  grid-column: 1 / 6;
  display: grid;
  grid-template-columns: 1fr 0.6fr calc(85px);
  color: black;
  gap: 1rem;

  padding-left: 0.5rem;
  opacity: 0;
  max-height: 0;
  padding-top: 0;
  padding-bottom: 0;
  transition: all 200ms ease-in-out;
  transform-origin: top;
  visibility: hidden;
  transform: scaleY(0);
}

.movie-card-details.open {
  opacity: 1;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  max-height: 500px;
  visibility: visible;
  transform: scaleY(1);
  border-top: 1px solid #8b8b8b;
}

.stars {
  display: grid;
  grid-template-columns: 1fr 1fr;
  place-content: start;
  column-gap: 1rem;
}

.stars h3 {
  grid-column: 1 / 3;
}

.eye {
  place-self: center;
}
</style>
