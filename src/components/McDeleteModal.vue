<template>
  <a-modal
    v-bind="$attrs"
    v-model:visible="show"
    :footer="false"
    :closable="false"
    modalClass="!rounded-lg"
  >
    <div class="w-full flex flex-col justify-between items-center">
      <div class="w-full flex justify-start items-start mb-4">
        <IconWarning class="mr-4 flex-shrink-0 w-11 h-11"></IconWarning>
        <div class="text-start">
          <p class="text-lg font-medium text-[#111827]">{{ props.title }}</p>
          <p class="text-[#6B7280] text-base mt-1">{{ props.subTitle }}</p>
        </div>
      </div>
      <slot name="footer" v-if="!!slots.footer"> </slot>
      <div v-else class="w-full flex justify-end items-center gap-x-4">
        <a-button @click="onCancel" type="text" class="!rounded-md !border !border-[#D1D5DB] !h-10">
          <p class="text-[#374151] text-base">{{ $t('button.cancel') }}</p>
        </a-button>
        <a-button @click="onConfirm" type="primary" status="danger" class="!rounded-md !h-10">
          <p class="text-white text-base">
            {{ props.confirmBtnTxt ? props.confirmBtnTxt : $t('button.delete') }}
          </p>
        </a-button>
      </div>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
const slots = useSlots()

const show = defineModel('show', { default: false })

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
  confirmBtnTxt: {
    type: String,
    default: '',
    required: false
  },
  isShow: {
    type: String,
    default: '',
    required: false
  }
})

const emit = defineEmits(['onConfirm', 'onCancel'])

const onCancel = () => {
  emit('onCancel')
}

const onConfirm = () => {
  emit('onConfirm')
}
</script>

<style scoped></style>
