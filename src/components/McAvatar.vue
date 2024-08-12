<template>
  <div class="w-full flex justify-start items-center">
    <a-image
      width="56"
      height="56"
      class="!flex-shrink-0"
      :src="
        props.src ||
        'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp'
      "
    />
    <p class="w-[calc(100%-56px)] text-ellipsis overflow-hidden ml-2">{{ props.text }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  text: {
    type: String,
    required: true
  },
  src: {
    type: String,
    default: '',
    required: false
  }
})

const emit = defineEmits(['onClick'])

const onClick = () => {
  emit('onClick')
}
</script>

<style scoped></style>
