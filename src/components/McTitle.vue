<template>
  <div class="w-full flex justify-between items-center mb-3">
    <p class="text-left text-2xl font-semibold text-[#000007] leading-8" v-bind="$attrs">
      {{ props.title }}
    </p>

    <slot name="suffix" v-if="!!slots.suffix"> </slot>
    <a-button
      v-else
      type="primary"
      class="!h-[38px] !rounded-md"
      :class="[props.hasBtnAdd ? 'visible' : ' invisible']"
      @click="onClick"
    >
      <template #icon>
        <IconPlus v-if="props.typeIcon == 'plus'"></IconPlus>
        <IconDownload v-else></IconDownload>
      </template>
      <!-- Use the default slot to avoid extra spaces -->
      <template #default>{{ props.btnTxt ? props.btnTxt : $t('button.add') }}</template>
    </a-button>
  </div>
</template>

<script setup lang="ts">
const slots = useSlots()
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  btnTxt: {
    type: String,
    default: '',
    required: false
  },
  hasBtnAdd: {
    type: Boolean,
    default: false,
    required: false
  },
  typeIcon: {
    type: String,
    default: 'plus',
    required: false
  }
})

const emit = defineEmits(['onClick'])

const onClick = () => {
  emit('onClick')
}
</script>

<style scoped></style>
