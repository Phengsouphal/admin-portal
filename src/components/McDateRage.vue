<template>
  <div class="w-full flex flex-col justify-start items-start text-black text-opacity-70">
    <div class="flex justify-start items-start mt-4">
      <div class="mr-3">
        <p class="text-left mb-2">Start Date</p>
        <a-date-picker
          placeholder="Please select a date"
          class="!bg-transparent !rounded-md !border !border-[#D8DCE0]"
          :show-now-btn="false"
          :locale="locale"
          style="width: 220px; margin: 0 24px 24px 0"
          :time-picker-props="{ defaultValue: '09:09:06' }"
          format="YYYY-MM-DD"
          @change="onChangeStart"
          @select="onSelectStart"
          @ok="onOkStart"
        >
          <template #prefix> <IconCalendar></IconCalendar> </template>
          <template #suffix-icon> <p></p></template>
        </a-date-picker>
      </div>
      <div>
        <p class="text-left mb-2">Start Time</p>
        <a-select
          size="medium"
          class="!w-56 !bg-transparent !rounded-md !border !border-[#D8DCE0]"
          placeholder="Please select time ..."
        >
          <template #label="{ data }">
            <IconTime />
            <span class="ml-2"> {{ data?.label }} </span>
          </template>
          <a-option v-for="(item, index) in timeList" :key="index">{{ item }}</a-option>
        </a-select>
      </div>
    </div>

    <div class="flex justify-start items-start">
      <div class="mr-3">
        <p class="text-left mb-2">End Date</p>
        <a-date-picker
          placeholder="Please select a date"
          class="!bg-transparent !rounded-md !border !border-[#D8DCE0]"
          :show-now-btn="false"
          :locale="locale"
          style="width: 220px; margin: 0 24px 24px 0"
          :time-picker-props="{ defaultValue: '09:09:06' }"
          format="YYYY-MM-DD"
          @change="onChangeEnd"
          @select="onSelectEnd"
          @ok="onOkEnd"
        >
          <template #prefix> <IconCalendar></IconCalendar> </template>
          <template #suffix-icon> <p></p></template>
        </a-date-picker>
      </div>
      <div>
        <p class="text-left mb-2">End Time</p>
        <a-select
          size="medium"
          class="!w-56 !bg-transparent !rounded-md !border !border-[#D8DCE0]"
          placeholder="Please select time ..."
        >
          <template #label="{ data }">
            <IconTime />
            <span class="ml-2"> {{ data?.label }} </span>
          </template>
          <a-option v-for="(item, index) in timeList" :key="index">{{ item }}</a-option>
        </a-select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n()
const timeList = [
  '12:00 AM',
  '12:30 AM',
  '1:00 AM',
  '1:30 AM',
  '2:00 AM',
  '2:30 AM',
  '3:00 AM',
  '3:30 AM',
  '4:00 AM',
  '4:30 AM',
  '5:00 AM',
  '5:30 AM',
  '6:00 AM',
  '6:30 AM',
  '7:00 AM',
  '7:30 AM',
  '8:00 AM',
  '8:30 AM',
  '9:00 AM',
  '9:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '12:00 PM',
  '12:30 PM',
  '1:00 PM',
  '1:30 PM',
  '2:00 PM',
  '2:30 PM',
  '3:00 PM',
  '3:30 PM',
  '4:00 PM',
  '4:30 PM',
  '5:00 PM',
  '5:30 PM',
  '6:00 PM',
  '6:30 PM',
  '7:00 PM',
  '7:30 PM',
  '8:00 PM',
  '8:30 PM',
  '9:00 PM',
  '9:30 PM',
  '10:00 PM',
  '10:30 PM',
  '11:00 PM',
  '11:30 PM'
]

const onChangeStart = () => {}
const onSelectStart = () => {}
const onOkStart = () => {}

const onChangeEnd = () => {}
const onSelectEnd = () => {}
const onOkEnd = () => {}
</script>

<style scoped></style>
