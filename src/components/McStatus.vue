<template>
  <div
    class="w-fit px-4 py-1 rounded-full capitalize"
    :class="[status == '' ? 'success' : displayStatus().value]"
  >
    {{ displayStatus()?.text }}
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const props = defineProps({
  text: {
    default: '',
    type: String,
    required: false
  },
  status: {
    type: String,
    default: '',
    required: false
  }
})

const emit = defineEmits(['onClick'])

const displayStatus = () => {
  const status = [
    'success',
    'active',
    'inactive',
    'pending',
    'reject',
    'confirmed',
    'failed',
    'cancelled',
    'completed',
    'expired'
  ]
  const index = status.findIndex((item) => {
    return item === props.status?.toLowerCase()
  })
  if (index >= 0) {
    return { text: t(`status.${status[index]}`), value: status[index] }
  }
  return { text: t(`status.reject`), value: 'reject' }
}

const onClick = () => {
  emit('onClick')
}
</script>

<style scoped>
.success,
.active,
.completed,
.confirmed {
  @apply bg-[#48B35E] bg-opacity-30 text-[#48B35E] text-sm font-medium;
}

.pending {
  @apply bg-[#007BE0] bg-opacity-30 text-[#007BE0] text-sm font-medium;
}

.expired {
  @apply bg-[#D9D9D9] bg-opacity-30 text-[#AEAEAE] text-sm font-medium;
}

.reject,
.inactive,
.cancelled,
.failed {
  @apply bg-[#C25452] bg-opacity-30 text-[#C25452] text-sm font-medium;
}
</style>
