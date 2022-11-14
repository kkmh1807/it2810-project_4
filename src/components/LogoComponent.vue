<script setup lang="ts">
defineProps<{ large?: boolean }>();
</script>

<template>
  <div class="logo-wrapper">
    <img alt="MovieFinder logo" src="@/assets/logo.svg" width="100" />
    <h1 class="logo-title">MovieFinder</h1>
    <p v-if="large" class="logo-slogan">Find a movie!</p>
  </div>
</template>

<style>
.logo-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo-title {
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
}

.logo-slogan {
  font-size: 1.5rem;
}
</style>
