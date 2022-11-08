import { ref, computed } from 'vue';
import { defineStore, storeToRefs } from 'pinia';
import { usePaginationStore } from './pagination';
import useGraphqlData from '@/composables/useGraphqlData';
import type { MovieResponse } from '@/types/pagination';
import { useQueryStore } from './queryStore';

/**
 * Query data is the same, so this is moved out in a constant.
 */
const queryData = `data {
  _id,
  Series_Title,
  Poster_Link,
  Genre,
  Star1,
  Star2,
  Star3,
  Star4,
  IMDB_Rating, 
  Overview,
  Watched
}
pageInfo {
  currentPage
  totalPages
  pageSize
}`;

/**
 * Setup for using movies store.
 */
export const useMoviesStore = defineStore('movies', () => {
  const { currentPage, order } = usePaginationStore();
  const { queryKey } = storeToRefs(useQueryStore());

  const movieResponse = ref<MovieResponse>();

  // Computed properties gets just a part of the state - removes redundant data and prevent multiple states.
  const movies = computed(() => movieResponse.value?.data);
  const totalPages = computed(() => movieResponse.value?.pageInfo.totalPages);

  // Fetch functions to database.
  async function getMoviesByAll() {
    const query = `query {
      getMoviesByAll (query: "${queryKey.value}", currentPage: ${currentPage}, order: ${order}) {
        ${queryData}
      }
    }`;

    const response = await useGraphqlData<{ getMoviesByAll: MovieResponse }>(query);
    movieResponse.value = response.getMoviesByAll;
  }

  async function getMoviesByGenre() {
    const searchQuery = `query {
      getMoviesByGenre (genre: "${queryKey.value}", currentPage: ${currentPage}, order: ${order}) {
        ${queryData}
      }
    }`;

    const response = await useGraphqlData<{ getMoviesByGenre: MovieResponse }>(searchQuery);
    movieResponse.value = response.getMoviesByGenre;
  }

  async function getMoviesByTitle() {
    const searchQuery = `query {
      getMoviesByTitle (title: "${queryKey.value}", currentPage: ${currentPage}, order: ${order}) {
        ${queryData}
      }
    }`;
    const response = await useGraphqlData<{ getMoviesByTitle: MovieResponse }>(searchQuery);
    movieResponse.value = response.getMoviesByTitle;
  }

  async function getMoviesByActor() {
    const searchQuery = `query {
      getMoviesByActors (actor: "${queryKey.value}", currentPage: ${currentPage}, order: ${order}) {
        ${queryData}
      }
    }`;

    const response = await useGraphqlData<{ getMoviesByActors: MovieResponse }>(searchQuery);
    movieResponse.value = response.getMoviesByActors;
  }

  return {
    movieResponse,
    movies,
    totalPages,
    getMoviesByAll,
    getMoviesByTitle,
    getMoviesByGenre,
    getMoviesByActor
  };
});
