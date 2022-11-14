<script setup lang="ts">
import { usePaginationStore } from '@/stores/pagination';
import { storeToRefs } from 'pinia';
import SortingArrowDesc from './icons/SortingArrowDesc.vue';
import SortingArrowAsc from './icons/SortingArrowAsc.vue';

const paginationStore = usePaginationStore();
const { order } = storeToRefs(paginationStore);
const { toggleOrder } = paginationStore;
</script>

<template>
  <div class="sorting-params">
    <p>Sort by</p>
    <select>
      <option>Rating</option>
    </select>
    <div class="sorting-group" tabindex="0" @click="toggleOrder">
      <p v-if="order">Ascending</p>
      <p v-else>Descending</p>
      <SortingArrowDesc v-if="order" class="sorting-icon" width="30" />
      <SortingArrowAsc v-else class="sorting-icon" width="30" />
    </div>
  </div>
</template>

<style scoped>
.sorting-params {
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;
  gap: 10px;
}

.sorting-group:hover p,
.sorting-group:focus p {
  text-decoration: underline;
}

.sorting-group {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
