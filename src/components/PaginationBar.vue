<script setup lang="ts">
import ChevronLeft from './icons/ChevronLeft.vue';
import ChevronRight from './icons/ChevronRight.vue';
import DoubleArrowLeft from './icons/DoubleArrowLeft.vue';
import DoubleArrowRight from './icons/DoubleArrowRight.vue';
</script>

<template>
  <div class="pagination-container">
    <button data-cy="first-page" class="pagination-button">
      <DoubleArrowLeft class="pagination-arrow" />
    </button>
    <button data-cy="prev-page" class="pagination-button">
      <ChevronLeft class="pagination-arrow" />
    </button>
    <div data-cy="current-page" class="pagination-text">1 of 50</div>
    <button data-cy="next-page" class="pagination-button">
      <ChevronRight class="pagination-arrow" />
    </button>
    <button data-cy="last-page" class="pagination-button">
      <DoubleArrowRight class="pagination-arrow" />
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
  width: 40px;
  height: 40px;
  padding: 0;
  border-radius: 15px;
  border: none;
  cursor: pointer;
}

.pagination-arrow {
  width: 40px;
  height: 40px;
}
.pagination-text {
  font-size: 1.2rem;
  font-weight: bold;
  align-self: center;
}
</style>
