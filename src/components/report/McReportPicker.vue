<template>
  <div class="w-full flex justify-between items-center">
    <p class="card-title">{{ props.title }}</p>

    <a-month-picker
      v-if="!props.isYearPicker"
      v-bind="$attrs"
      :format="(value: any) => dayjs(value).format('MMM')?.toString()"
      style="width: 100px"
      @change="onSelectMonth"
      :shortcuts="[
        {
          label: 'last month',
          value: () => dayjs().subtract(1, 'month')
        },
        {
          label: 'six months later',
          value: () => dayjs().add(6, 'month')
        },
        {
          label: 'two years later',
          value: () => dayjs().add(2, 'year')
        }
      ]"
    >
      <a-button>{{ dayjs(attrs.modelValue)?.format('MMM') }}</a-button></a-month-picker
    >

    <a-year-picker v-else v-bind="$attrs" @change="onSelectYear" style="width: 120px">
      <a-button>{{ attrs.modelValue }}</a-button>
    </a-year-picker>
    <!-- <p class="text-black">{{ attrs.modelValue }}</p> -->
  </div>
</template>

<script setup lang="ts">
const attrs = useAttrs() as any

import dayjs from 'dayjs'

// Props
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  isYearPicker: {
    type: Boolean,
    default: false,
    required: false
  }
})

const emit = defineEmits(['onChangeMonth', 'onChangeYear'])

const onSelectMonth = (v: any) => {
  console.log(v)
  emit('onChangeMonth', v)
}

const onSelectYear = (v: any) => {
  console.log(v)
  emit('onChangeYear', v)
}
</script>

<style scoped>
.card-title {
  @apply text-xl font-semibold text-black;
}
</style>
