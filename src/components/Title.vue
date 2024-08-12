<template>
  <div class="w-full flex flex-col justify-center items-center">
    <p class="w-full text-center font-extrabold text-5xl">{{ props.title }}</p>
    <div class="h-12 w-1 bg-main my-4"></div>
  </div>
</template>

<script setup lang="ts">
// Props
const props = defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>

<style scoped></style>
