import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useMoviesStore } from './movies';

/**
 * Setup for using pagination store.
 */
export const usePaginationStore = defineStore('pagination', () => {
  const { totalPages } = useMoviesStore();

  const currentPage = ref(1);
  const order = ref(false);

  const firstPage = () => (currentPage.value = 1);
  const prevPage = () => currentPage.value--;
  const nextPage = () => currentPage.value++;
  const lastPage = () => (currentPage.value = totalPages || 0);

  const toggleOrder = () => (order.value = !order.value);

  return {
    currentPage,
    order,
    firstPage,
    prevPage,
    nextPage,
    lastPage,
    toggleOrder
  };
});
