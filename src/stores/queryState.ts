import { ref } from 'vue';
import { defineStore } from 'pinia';
import { QueryMode } from '@/types/query';

/**
 * Setup for using query store.
 */
export const useQueryState = defineStore('queryState', () => {
  const queryKey = ref('');
  const queryMode = ref(QueryMode.ALL);

  const setQueryKey = (value: string) => (queryKey.value = value);
  const setQueryMode = (value: QueryMode) => (queryMode.value = value);

  return {
    queryKey,
    queryMode,
    setQueryKey,
    setQueryMode
  };
});
