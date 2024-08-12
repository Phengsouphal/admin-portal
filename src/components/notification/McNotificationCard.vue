<template>
  <a-button
    type="text"
    long
    class="!w-full !h-fit !p-0"
    :class="[props.isRead ? '!bg-white' : '!bg-[#f3f9fb]']"
  >
    <div
      class="w-full h-[86px] py-3 px-4 flex justify-between items-start border-b border-[#D9D9D9]"
    >
      <div class="flex items-start gap-x-3">
        <a-image
          width="40"
          height="40"
          class="!flex-shrink-0 !rounded-md"
          :src="'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp'"
        />
        <div class="text-left">
          <p class="text-black text-opacity-70 font-semibold">Dy Sonita</p>
          <p class="text-sm font-normal text-black text-opacity-40">
            has been placed order from your store.
          </p>
          <p v-if="!props.isRead" class="text-sm font-normal text-[#AEAEAE]">Just now</p>
        </div>
      </div>
      <div class="flex justify-end items-center">
        <div v-if="!props.isRead" class="w-3 h-3 rounded-full bg-main"></div>
      </div>
    </div>
  </a-button>
</template>

<script setup lang="ts">
const props = defineProps({
  avatarUrl: {
    type: String,
    default: '',
    required: false
  },
  name: {
    type: String,
    default: '',
    required: false
  },
  isRead: {
    type: Boolean,
    default: false,
    required: false
  },
  text: {
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
