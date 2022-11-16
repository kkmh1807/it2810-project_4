<script setup lang="ts">
import { usePaginationStore } from '@/stores/pagination';
import { storeToRefs } from 'pinia';
import SortingArrowAsc from './icons/SortingArrowAsc.vue';
import SortingArrowDesc from './icons/SortingArrowDesc.vue';

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
      <template v-if="order">
        <p>Ascending</p>
        <SortingArrowAsc data-cy="asc-arrow" class="sorting-icon" width="24" />
      </template>
      <template v-else>
        <p>Descending</p>
        <SortingArrowDesc data-cy="desc-arrow" class="sorting-icon" width="24" />
      </template>
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
  cursor: pointer;
}
</style>
