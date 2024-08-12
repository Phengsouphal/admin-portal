<template>
  <div class="w-full flex justify-start items-center cursor-pointer">
    <IconRadioCheck v-if="props.check" class="flex-shrink-0"> </IconRadioCheck>
    <IconRadioUncheck v-else class="flex-shrink-0"> </IconRadioUncheck>
    <p class="text-black ml-3 text-opacity-70 font-medium truncate">{{ props.text }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  check: {
    type: Boolean,
    required: true
  },
  text: {
    type: String,
    required: true
  }
})
</script>

<style scoped></style>
