<template>
  <a-input-password
    :class="[
      'custom-password-input p-0 !border-[1.5px] !rounded-md  ',
      isFocus ? 'mc-focus' : ' mc-blur '
    ]"
    :error="error"
    v-bind="$attrs"
    @focus="onFocus"
    @blur="onBlur"
    :invisible-button="false"
    v-model:visibility="visibility"
  >
    <template #append>
      <a-button type="text" class="!p-0 !h-fit" @click="visibility = !visibility">
        <IconEyeClose v-if="visibility"></IconEyeClose>
        <IconEyeOpen v-else></IconEyeOpen>
      </a-button>
    </template>
    <template #prefix v-if="$slots.prefix">
      <slot name="prefix"></slot>
    </template>
    <template #suffix v-if="$slots.suffix">
      <slot name="suffix"> </slot>
    </template>
  </a-input-password>
</template>

<script setup lang="ts">
const error = ref(false)
const isFocus = ref(false)
const visibility = ref(true)

const onBlur = () => {
  isFocus.value = false
}

const onFocus = () => {
  isFocus.value = true
}
</script>

<style>
:deep(.custom-password-input.arco-input-outer > :first-child) {
  height: 38px;
  border-radius: 6px;
  border: 1px solid #d8dce0;
  background: transparent;
}

:deep(.input-container .custom-password-input.arco-input-outer) {
  background: transparent !important;
}
.custom-password-input.arco-input-outer {
  background: transparent !important;
  padding: 0px;
}

.custom-password-input.arco-input-outer :deep(.arco-input-suffix) {
  padding: 0px 16px;
  border-left: 0px solid #d8dce0;
}

.custom-password-input.arco-input-outer :deep(.arco-input-append) {
  padding: 0px 16px;
  background: transparent;
  border-left: 0px solid #d8dce0;
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

.custom-password-input.arco-input-outer .arco-input-wrapper {
  background: transparent !important;
  border: none;
  padding: 0px;
}
.arco-form-item-error.arco-form-item-status-error .custom-password-input.arco-input-outer {
  @apply !border-danger;
}

.custom-password-input.arco-input-outer .arco-input-error :deep(.arco-input-suffix) {
  @apply !border-danger;
}

.custom-password-input.arco-input-outer.arco-input-focus :deep(.arco-input-suffix) {
  @apply !border-main;
}

.custom-password-input.arco-input-outer :deep(.arco-input-prefix) {
  padding-right: 0px;
}

.custom-password-input.arco-input-outer :deep(.arco-input-append) {
  padding: 0px 10px;
}

.custom-password-input.arco-input-outer .arco-input-append {
  @apply rounded-tr-md rounded-br-md;
}

:deep(.arco-input-wrapper:focus-within, .arco-input-wrapper.arco-input-focus) {
  background-color: transparent;
  border: none;
  box-shadow: none;
}
</style>
