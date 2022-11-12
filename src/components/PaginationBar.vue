<script setup lang="ts">
import ChevronLeft from './icons/ChevronLeft.vue';
import ChevronRight from './icons/ChevronRight.vue';
import DoubleArrowLeft from './icons/DoubleArrowLeft.vue';
import DoubleArrowRight from './icons/DoubleArrowRight.vue';
</script>

<template>
  <div class="pagination-container">
    <DoubleArrowLeft class="pagination-button" />
    <ChevronLeft class="pagination-button" />
    <div data-cy="current-page" class="pagination-text">1 of 50</div>
    <ChevronRight class="pagination-button" />
    <DoubleArrowRight class="pagination-button" />
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

.pagination-text {
  font-size: 1.2rem;
  font-weight: bold;
  align-self: center;
}
</style>
