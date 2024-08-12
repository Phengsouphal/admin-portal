<template>
  <div
    class="mc-container bg-white border-[1px] border-[#d9d9d9] rounded-2xl py-8 w-full flex flex-col justify-center items-center"
  >
    <slot name="icon"></slot>
    <p class="text-sm font-medium text-[#111827] mt-2">{{ props.title }}</p>
    <p class="text-sm font-normal text-[#6B7280] mt-1">{{ props.subTitle }}</p>
    <a-button
      type="primary"
      class="!mt-6 !h-[38px] !rounded-md"
      :class="[props.hasBtnAdd ? 'visible' : ' invisible']"
      @click="onClick"
    >
      <template #icon>
        <slot name="iconBtn"></slot>
      </template>
      <!-- Use the default slot to avoid extra spaces -->
      <template #default>{{ props.btnTxt ? props.btnTxt : $t('button.add') }}</template>
    </a-button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  subTitle: {
    type: String,
    default: '',
    required: false
  },
  btnTxt: {
    type: String,
    default: '',
    required: false
  },
  hasBtnAdd: {
    type: Boolean,
    default: true,
    required: false
  }
})

const emit = defineEmits(['onClick'])

const onClick = () => {
  emit('onClick')
}
</script>

<style scoped></style>
