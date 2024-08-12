<template>
  <InputField v-model="search" class="" :placeholder="$t('field.search')" @press-enter="onEnter">
    <template #prefix>
      <div
        class="px-2 bg-transparent h-full flex justify-center items-center rounded-tr-md rounded-br-md"
      >
        <IconSearch></IconSearch>
      </div>
    </template>
    <template #suffix v-if="props.isShowFilter">
      <!-- <a-dropdown @select="(v: any) => handleSelect(v)" position="br"> -->
      <a-button
        type="text"
        class="!p-0 !w-fit !h-full !border-none !rounded-tr-md !rounded-br-md"
        @click="handleClick"
      >
        <div
          class="bg-[#F9FAFB] w-[120px] h-full flex justify-center items-center rounded-tr-md rounded-br-md"
        >
          <IconFilter> </IconFilter>
          <p class="ml-4 mr-2 text-[#AEAEAE] font-semibold">{{ $t('button.filter') }}</p>
          <IconDown> </IconDown>
        </div>
      </a-button>
      <!-- <template #content>
          <a-doption value="list">
            <div class="flex justify-center items-center">
              <p class="w-16 ml-2 font-medium">{{ $t('button.list') }}</p>
            </div>
          </a-doption>

          <a-doption value="grid">
            <div class="flex justify-center items-center">
              <p class="w-16 ml-2 font-medium">{{ $t('button.grid') }}</p>
            </div>
          </a-doption>
        </template> -->
      <!-- </a-dropdown> -->
    </template>
  </InputField>

  <a-drawer
    :width="340"
    :header="false"
    :footer="false"
    :visible="visible"
    unmountOnClose
    class="mc-filter-drawer"
  >
    <div class="w-full h-full pt-[74px]">
      <div class="w-full h-full bg-white rounded-tl-lg">
        <div
          class="w-full flex justify-between items-center rounded-tl-lg px-4 py-2 bg-[#D9D9D970]"
        >
          <p class="text-[#111827] text-lg font-semibold">
            {{ props.filterHeader ? props.filterHeader : $t('common.filterData') }}
          </p>

          <a-button type="text" class="!h-fit !p-0" @click="handleCancel">
            <IconCross class=""></IconCross>
          </a-button>
        </div>
        <slot name="filterContent"></slot>
      </div>
    </div>
  </a-drawer>
</template>

<script setup lang="ts">
const emit = defineEmits(['handleSelect', 'onEnter'])

const search = ref('')
const props = defineProps({
  isShowFilter: {
    type: Boolean,
    default: true,
    required: false
  },
  filterHeader: {
    type: String,
    default: '',
    required: false
  }
})

const onEnter = () => {
  emit('onEnter', search.value)
}

const visible = ref(false)

const handleClick = () => {
  visible.value = true
}
const handleCancel = () => {
  visible.value = false
}

const handleSelect = (v: string) => {
  emit('handleSelect', v)
}
</script>

<style>
.mc-filter-drawer .arco-drawer {
  background-color: transparent;
  padding: 0px;
}

.mc-filter-drawer .arco-drawer .arco-drawer-body {
  padding: 0px;
}
</style>
