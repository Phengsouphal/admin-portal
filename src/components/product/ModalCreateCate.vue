<template>
  <a-modal v-model:visible="showAddCate" :footer="false" width="70%">
    <template #title>
      <div class="w-full flex justify-start items-center">
        <p>{{ $t('button.addCategory') }}</p>
      </div>
    </template>
    <div class="w-full px-4">
      <div class="w-full bg-[#F8F8F8] rounded-xl">
        <div class="w-full">
          <div class="w-full p-4 border-b border-[#D9D9D9]">
            <p class="text-lg text-[#111827]">Category Profile</p>
          </div>
          <div class="w-full py-6 px-4">
            <McUpload
              ref="uploadRef"
              :title="$t('upload.uploadCategory')"
              :show-sub-title="true"
              :is-list="false"
              @on-uploaded="onUploaded"
              @on-delete="onDeleteImg"
            >
            </McUpload>
          </div>
        </div>
      </div>

      <div class="w-full bg-[#F8F8F8] rounded-xl mt-6">
        <div class="w-full">
          <div class="w-full p-4 border-b border-[#D9D9D9]">
            <p class="text-lg text-[#111827]">Category Name</p>
          </div>
          <div class="w-full py-6 px-6">
            <div class="w-[70%]">
              <InputField class="!px-3" :max-length="30" v-model="cateName"> </InputField>
              <div class="flex justify-end items-center text-[#AEAEAE] text-xs mt-1">
                {{ cateName.length }} / 30
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="w-full flex justify-end items-center gap-4 mt-6">
        <a-button
          type="outline"
          class="!border-[#D1D5DB] !text-[#374151] !rounded-md"
          @click="showAddCate = false"
        >
          {{ $t('button.cancel') }}
        </a-button>

        <a-button type="primary" class="!rounded-md" @click="onSaveCate">
          {{ $t('button.save') }}
        </a-button>
      </div>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { Message } from '@arco-design/web-vue'
import { useCategoryStore } from '~/stores/category'

const cateStore = useCategoryStore()
const cateName = ref('')
const cateImg = ref('')

const uploadRef = ref(null) as any

const showAddCate = ref(false)

const showModal = () => {
  showAddCate.value = true
}

const onDeleteImg = () => {
  cateImg.value = ''
}

const onUploaded = (files: any) => {
  cateImg.value = files?.[0]?.response?._id
}

const onSaveCate = () => {
  if (cateImg.value == '') {
    Message.error('Image or Icon is required, please try again')
  } else if (cateName.value == '') {
    Message.error('Category name is required')
  } else {
    showAddCate.value = false
    cateStore.onCreateCate(cateName.value, '', cateImg.value, true)
    cateName.value = ''
    cateImg.value = ''
    uploadRef.value?.setUploadedImages([])
  }
}

defineExpose({
  showModal
})
</script>

<style scoped></style>
