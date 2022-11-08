import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { usePaginationStore } from './pagination';
import useGraphqlData from '@/composables/useGraphqlData';
import type { MovieResponse } from '@/types/pagination';

/**
 * Setup for using movies store.
 */
export const useMoviesStore = defineStore('movies', () => {
  const { currentPage, order } = usePaginationStore();

  const movieResponse = ref<MovieResponse>();

  // Computed properties gets just a part of the state - removes redundant data and prevent multiple states.
  const movies = computed(() => movieResponse.value?.data);
  const totalPages = computed(() => movieResponse.value?.pageInfo.totalPages);

  async function searchAllMovies() {
    const query = `query {
    movies(currentPage:${currentPage}, order: ${order}) {
      data {
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
      }
    }
  }`;

    const response = await useGraphqlData<{ movies: MovieResponse }>(query);
    movieResponse.value = response.movies;
  }

  return { movieResponse, movies, totalPages, searchAllMovies };
});
