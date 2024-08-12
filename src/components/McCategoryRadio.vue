<template>
  <div class="w-full flex justify-start items-center">
    <IconRadioCheck v-if="props.check" class="flex-shrink-0"> </IconRadioCheck>
    <IconRadioUncheck v-else class="flex-shrink-0"> </IconRadioUncheck>
    <a-image
      :preview="props.isImagePreview"
      v-if="props.url"
      class="ml-3 flex-shrink-0"
      width="40"
      height="40"
      :src="props.url"
    />
    <p class="text-black ml-3 text-opacity-70 font-medium truncate">{{ props.name }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  check: {
    type: Boolean,
    required: true
  },
  url: {
    type: String,
    required: false,
    default: ''
  },
  name: {
    type: String,
    required: true
  },
  isImagePreview: {
    type: Boolean,
    default: false,
    required: false
  }
})
</script>

<style scoped>
.custom-radio-card {
  border: 2px solid var(--color-border-2);
}

.custom-radio-card-mask {
  height: 15px;
  width: 15px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  border: 2px solid var(--color-border-2);
  box-sizing: border-box;
}

.custom-radio-card-mask-dot {
  width: 7px;
  height: 7px;
  border-radius: 100%;
}

.custom-radio-card:hover,
.custom-radio-card-checked,
.custom-radio-card:hover .custom-radio-card-mask,
.custom-radio-card-checked .custom-radio-card-mask {
  border-color: rgb(var(--primary-6));
}

.custom-radio-card:hover .custom-radio-card-title,
.custom-radio-card-checked .custom-radio-card-title {
  color: rgb(var(--primary-6));
}

.custom-radio-card-checked .custom-radio-card-mask-dot {
  background-color: rgb(var(--primary-6));
}
</style>
