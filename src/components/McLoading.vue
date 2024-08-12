<template>
  <div class="w-full flex justify-between items-center">
    <Vue3Lottie :animation-data="loading" :height="250" :width="250" />
  </div>
</template>

<script setup lang="ts">
import { Vue3Lottie } from 'vue3-lottie'
import loading from '~/assets/lottie/laoding.json'
</script>

<style scoped></style>
