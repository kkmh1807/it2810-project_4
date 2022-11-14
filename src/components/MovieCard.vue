<script setup lang="ts">
import type { Movie } from '@/types/movie';
import { ref } from 'vue';
import ExpandMore from './icons/ExpandMore.vue';
import ExpandLess from './icons/ExpandLess.vue';

defineProps<{
  movie: Movie;
}>();

const showDetails = ref(false);
</script>

<template>
  <div className="movie-card" @click="showDetails = !showDetails" tabindex="0" @keyup.enter="showDetails = !showDetails">
    <img id="poster" v-bind:src="movie.Poster_Link" alt="" />
    <div id="title">{{ movie.Series_Title }}</div>
    <div id="genre">{{ movie.Genre }}</div>
    <div id="rating">{{ movie.IMDB_Rating }}</div>
    <div id="dropdown-arrow">
      <ExpandLess v-if="showDetails" />
      <ExpandMore v-else />
    </div>
  </div>
  <div v-if="showDetails" className="movie-card-details">
    <div>
      <h3>Overview</h3>
      {{ movie.Overview }}
    </div>
    <div>
      <h3>Starring</h3>
      {{ movie.Star1 }} <br />
      {{ movie.Star2 }} <br />
      {{ movie.Star3 }} <br />
      {{ movie.Star4 }}
    </div>
  </div>
</template>

<style scoped>
.movie-card {
  background-color: #fcf7f7;
  color: black;
  width: 90vw;
  display: grid;
  grid-template-areas:
    'poster title title title details'
    'poster genre star rating details';
  grid-template-rows: 1fr 1fr;
  grid-template-columns: auto 1.5fr 1.5fr 0.5fr 0.2fr;
  align-items: center;
  margin-bottom: 2%;
  cursor: pointer;
}
.movie-card:hover {
  text-decoration: underline;
}
#poster {
  grid-area: poster;
  width: 70px;
  height: 102px;
}
#title {
  grid-area: title;
  font-size: 1.2rem;
  margin-left: 0.5rem;
}
#genre {
  grid-area: genre;
  margin-left: 0.5rem;
}
#star {
  grid-area: star;
}
#rating {
  grid-area: rating;
}
#dropdown-arrow {
  grid-area: details;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-left: 1px solid #8b8b8b;
  width: 85px;
}

.movie-card-details {
  display: flex;
  color: black;
  width: 90vw;
  margin-bottom: 2%;
  margin-top: -2%;
  padding: 1%;
  background-color: #fcf7f7;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #8b8b8b;
}

#info {
  width: 70%;
}

#stars {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
#stars > p {
  width: 100%;
  text-align: center;
}
#stars > h3 {
  width: 100%;
  text-align: center;
}
</style>
