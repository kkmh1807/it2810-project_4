<script setup lang="ts">
import { useMoviesStore } from '@/stores/movies';
import { storeToRefs } from 'pinia';
import { usePaginationStore } from '@/stores/pagination';
import ChevronLeft from './icons/ChevronLeft.vue';
import ChevronRight from './icons/ChevronRight.vue';
import DoubleArrowLeft from './icons/DoubleArrowLeft.vue';
import DoubleArrowRight from './icons/DoubleArrowRight.vue';

const { totalPages } = storeToRefs(useMoviesStore());
const paginationStore = usePaginationStore();
const { currentPage } = storeToRefs(paginationStore);
const { firstPage, prevPage, nextPage, lastPage } = paginationStore;
</script>

<template>
  <div class="pagination-container">
    <button class="pagination-button" @click="firstPage" :disabled="currentPage === 1" data-cy="first-page">
      <DoubleArrowLeft />
    </button>
    <button class="pagination-button" @click="prevPage" :disabled="currentPage === 1" data-cy="prev-page">
      <ChevronLeft />
    </button>
    <div data-cy="current-page" class="pagination-text">{{ currentPage }} of {{ totalPages }}</div>
    <button class="pagination-button" @click="nextPage" :disabled="currentPage === totalPages" data-cy="next-page">
      <ChevronRight />
    </button>
    <button class="pagination-button" @click="lastPage" :disabled="currentPage === totalPages" data-cy="last-page">
      <DoubleArrowRight />
    </button>
  </div>
</template>

<style scoped>
.pagination-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 5px;
  margin-bottom: 1rem;
}
.pagination-button {
  background-color: white;
  padding: 0;
  width: 50px;
  height: 50px;
  border-radius: 15px;
  border: none;
  cursor: pointer;
}

.pagination-button:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

.pagination-text {
  font-size: 1.2rem;
  font-weight: bold;
  align-self: center;
}
</style>
