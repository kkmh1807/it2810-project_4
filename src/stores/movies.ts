import { ref, computed, reactive } from 'vue';
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

  // const movieResponse = ref<MovieResponse>({ data: [], pageInfo: { currentPage: 1, pageSize: 1, totalPages: 0 } });
  const state = reactive<{ response?: MovieResponse }>({ response: undefined });

  // Computed properties gets just a part of the state - removes redundant data and prevent multiple states.
  const movies = computed(() => state.response?.data || []);
  const totalPages = computed(() => state.response?.pageInfo.totalPages || 0);

  // Fetch functions to database.
  async function getMoviesByAll() {
    const query = `query {
      getMoviesByAll (query: "${queryKey.value}", currentPage: ${currentPage}, order: ${order}) {
        ${queryData}
      }
    }`;

    const response = await useGraphqlData<{ getMoviesByAll: MovieResponse }>(query);
    state.response = response.getMoviesByAll;
  }

  async function getMoviesByGenre() {
    const searchQuery = `query {
      getMoviesByGenre (genre: "${queryKey.value}", currentPage: ${currentPage}, order: ${order}) {
        ${queryData}
      }
    }`;

    const response = await useGraphqlData<{ getMoviesByGenre: MovieResponse }>(searchQuery);
    state.response = response.getMoviesByGenre;
  }

  async function getMoviesByTitle() {
    const searchQuery = `query {
      getMoviesByTitle (title: "${queryKey.value}", currentPage: ${currentPage}, order: ${order}) {
        ${queryData}
      }
    }`;
    const response = await useGraphqlData<{ getMoviesByTitle: MovieResponse }>(searchQuery);
    state.response = response.getMoviesByTitle;
  }

  async function getMoviesByActor() {
    const searchQuery = `query {
      getMoviesByActors (actor: "${queryKey.value}", currentPage: ${currentPage}, order: ${order}) {
        ${queryData}
      }
    }`;

    const response = await useGraphqlData<{ getMoviesByActors: MovieResponse }>(searchQuery);
    state.response = response.getMoviesByActors;
  }

  return {
    state,
    movies,
    totalPages,
    getMoviesByAll,
    getMoviesByTitle,
    getMoviesByGenre,
    getMoviesByActor
  };
});
