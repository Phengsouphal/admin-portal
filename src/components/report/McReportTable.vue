<template>
  <div class="w-full flex justify-between items-start text-black px-4">
    <div class="w-[10%] flex flex-col justify-start items-start">
      <p class="header text-left">{{ $t('common.rank') }}</p>
      <p
        class="my-3 text-sm font-semibold"
        :class="[`${props.typeRank}-${item}`]"
        v-for="(item, index) in listProductName"
        :key="index"
      >
        {{ index + 1 }}
      </p>
    </div>
    <div class="w-[70%] flex flex-col justify-start items-start pl-6">
      <p class="header text-left">{{ $t('product.title') }}</p>
      <p
        class="w-full text-left my-3 truncate"
        v-for="(item, index) in listProductName"
        :key="index"
      >
        {{ item }}
      </p>
    </div>
    <div class="w-[20%] flex flex-col justify-start items-start">
      <p class="header text-right">{{ props.lastColTitle }}</p>
      <p class="my-3 text-right w-full" v-for="(item, index) in listCount" :key="index">
        {{ item }}
      </p>
    </div>
    <div></div>
  </div>
</template>

<script setup lang="ts">
const slots = useSlots()
const props = defineProps({
  lastColTitle: {
    type: String,
    default: '',
    required: false
  },
  typeRank: {
    type: String,
    default: 'no',
    required: false
  },
  listProductName: {
    type: null,
    default: [],
    required: true
  },
  listCount: {
    type: null,
    default: [],
    required: true
  }
})

const emit = defineEmits(['onClick'])

const onClick = () => {
  emit('onClick')
}
</script>

<style scoped>
.header {
  @apply w-full text-black text-opacity-70 text-base font-semibold mb-3 pb-3 border-[#D9D9D9] border-b;
}

.rank-1 {
  color: #007be0;
}
.rank-2 {
  color: #5d7ad5;
}
.rank-3 {
  color: #48b35e;
}
.rank-4 {
  color: #ff784e;
}
.rank-5 {
  color: #c25452;
}

.circle-1 {
  @apply text-[#48b35e] bg-[#48b35e10] px-[4px] py-[2px] rounded-full;
}

.circle-2 {
  @apply text-[#48b35e] bg-[#48b35e10] px-[4px] py-[2px] rounded-full;
}

.circle-3 {
  @apply text-[#48b35e] bg-[#48b35e10] px-[4px] py-[2px] rounded-full;
}

.circle-4 {
  @apply text-[#48b35e] bg-[#48b35e10] px-[4px] py-[2px] rounded-full;
}

.circle-5 {
  @apply text-[#48b35e] bg-[#48b35e10] px-[12px] py-[6px] rounded-full;
}
</style>
