<template>
  <a-select
    v-bind="$attrs"
    class="mc-select !w-full !bg-transparent !rounded-md !border-[1.5px] !border-[#d8dce0]"
    @change="onChange"
  >
    <a-option :value="item?.toString()" v-for="(item, index) in DayEnum" :key="index">{{
      item
    }}</a-option>
    <!-- <a-option :value="DayEnum.TUESDAY">Tuesday</a-option>
    <a-option :value="DayEnum.WEDNESDAY">Wednesday</a-option>
    <a-option :value="DayEnum.THURSDAY">Thursday</a-option>
    <a-option :value="DayEnum.FRIDAY">Friday</a-option>
    <a-option :value="DayEnum.SATURDAY">Saturday</a-option>
    <a-option :value="DayEnum.SUNDAY">Sunday</a-option> -->
  </a-select>
</template>

<script setup lang="ts">
import { DayEnum } from '~/constants/common'

const emit = defineEmits(['onChange'])

const onChange = (v: any) => {
  emit('onChange', v)
}
</script>

<style scoped></style>
