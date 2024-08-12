<template>
  <div
    class="mc-container mt-4 bg-white border-[1px] border-[#d9d9d9] rounded-2xl w-full flex flex-col justify-center items-center"
  >
    <div
      v-if="props.title !== ''"
      class="w-full flex justify-between items-center border-b-[1px] border-[#d9d9d9]"
      :class="props.titleClass"
    >
      <div class="flex justify-start items-center">
        <slot name="header"> </slot>
        <p class="text-lg text-[#111827] font-semibold py-3 px-4">
          {{ props.title }}
        </p>
      </div>

      <slot name="headerRight" v-if="!!slots.headerRight"> </slot>
      <p class="text-[#111827] mr-4" v-else>{{ props.subTitle ? props.subTitle : '' }}</p>
    </div>

    <div class="w-full px-4" :class="props.contentClass">
      <slot> </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const slots = useSlots()

const props = defineProps({
  title: {
    type: String,
    default: '',
    required: false
  },
  subTitle: {
    type: String,
    default: '',
    required: false
  },
  titleClass: {
    type: String,
    default: '',
    required: false
  },
  contentClass: {
    type: String,
    default: '',
    required: false
  }
})
</script>

<style scoped></style>
