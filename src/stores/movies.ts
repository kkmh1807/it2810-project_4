import { ref, computed, watch } from 'vue';
import { defineStore, storeToRefs } from 'pinia';
import { usePaginationStore } from './pagination';
import useGraphqlData from '@/composables/useGraphqlData';
import type { MovieResponse } from '@/types/pagination';
import { useQueryStore } from './query';
import type { QueryMode } from '@/types/query';

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
  const { currentPage, order } = storeToRefs(usePaginationStore());
  const { queryKey, queryMode } = storeToRefs(useQueryStore());

  const movieResponse = ref<MovieResponse>({ data: [], pageInfo: { currentPage: 1, pageSize: 1, totalPages: 0 } });

  // Computed properties gets just a part of the state - removes redundant data and prevent multiple states.
  const movies = computed(() => movieResponse.value?.data || []);
  const totalPages = computed(() => movieResponse.value?.pageInfo.totalPages || 0);

  // Fetch functions to database.
  async function getMoviesByAll() {
    const query = `query {
      getMoviesByAll (query: "${queryKey.value}", currentPage: ${currentPage.value}, order: ${order.value}) {
        ${queryData}
      }
    }`;

    const response = await useGraphqlData<{ getMoviesByAll: MovieResponse }>(query);
    movieResponse.value = response.getMoviesByAll;
  }

  async function getMoviesByGenre() {
    const searchQuery = `query {
      getMoviesByGenre (genre: "${queryKey.value}", currentPage: ${currentPage.value}, order: ${order.value}) {
        ${queryData}
      }
    }`;

    const response = await useGraphqlData<{ getMoviesByGenre: MovieResponse }>(searchQuery);
    movieResponse.value = response.getMoviesByGenre;
  }

  async function getMoviesByTitle() {
    const searchQuery = `query {
      getMoviesByTitle (title: "${queryKey.value}", currentPage: ${currentPage.value}, order: ${order.value}) {
        ${queryData}
      }
    }`;
    const response = await useGraphqlData<{ getMoviesByTitle: MovieResponse }>(searchQuery);
    movieResponse.value = response.getMoviesByTitle;
  }

  async function getMoviesByActor() {
    const searchQuery = `query {
      getMoviesByActors (actor: "${queryKey.value}", currentPage: ${currentPage.value}, order: ${order.value}) {
        ${queryData}
      }
    }`;

    const response = await useGraphqlData<{ getMoviesByActors: MovieResponse }>(searchQuery);
    movieResponse.value = response.getMoviesByActors;
  }

  const searchMap: Record<QueryMode, () => Promise<void>> = {
    ALL: getMoviesByAll,
    TITLE: getMoviesByTitle,
    GENRE: getMoviesByGenre,
    ACTOR: getMoviesByActor
  };

  async function searchMovies() {
    if (!queryKey.value) return;

    await searchMap[queryMode.value]();
  }

  watch(currentPage, searchMovies);
  watch(order, searchMovies);

  return {
    movies,
    totalPages,
    searchMovies
  };
});
