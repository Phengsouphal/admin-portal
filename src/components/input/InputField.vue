<template>
  <a-input
    :class="[
      'custom-input p-0 !border-[1.5px] !rounded-md !justify-between ',
      isFocus ? 'mc-focus' : ' mc-blur '
    ]"
    v-bind="$attrs"
    @focus="onFocus"
    @blur="onBlur"
  >
    <template #prefix v-if="$slots.prefix">
      <slot name="prefix"></slot>
    </template>
    <template #suffix v-if="$slots.suffix">
      <slot name="suffix"> </slot>
    </template>
  </a-input>
</template>

<script setup lang="ts">
const isFocus = ref(false)

const onBlur = () => {
  isFocus.value = false
}

const onFocus = () => {
  isFocus.value = true
}
</script>

<style scoped>
:deep(.custom-input.arco-input-outer > :first-child) {
  height: 38px;
  border-radius: 6px;
  border: 1px solid #d8dce0;
  background: transparent;
}

:deep(.input-container .custom-input) {
  background: transparent !important;
}
.custom-input {
  background: transparent !important;
  padding: 0px;
}

.custom-input :deep(.arco-input-suffix) {
  padding: 0px;
  border-left: 1.5px solid #d8dce0;
}

.arco-input-error.arco-input-suffix {
  @apply !border-danger;
}

.arco-input-error.mc-blur {
  @apply !border-danger;
}
.mc-blur {
  border-color: #d8dce0 !important;
}

.mc-focus {
  border-color: #0083b0 !important;
}

:deep(.arco-input-wrapper) {
  background: transparent;
  border: none;
}
:deep(.arco-input-wrapper.arco-input-error.custom-input) {
  @apply !border-danger;
}

.custom-input.arco-input-error :deep(.arco-input-suffix) {
  @apply !border-danger;
}

.custom-input.arco-input-focus :deep(.arco-input-suffix) {
  @apply !border-main;
}

.custom-input :deep(.arco-input-prefix) {
  padding-right: 0px;
}

:deep(.arco-input-wrapper:focus-within, .arco-input-wrapper.arco-input-focus) {
  background-color: transparent;
  border: none;
  box-shadow: none;
}
</style>
