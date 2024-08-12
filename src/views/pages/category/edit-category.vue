<template>
  <div class="w-full h-full px-6 pt-5">
    <McTitle :title="$t('category.editCategory')"></McTitle>
    <a-form ref="formRef" :model="form" :layout="'vertical'" @submit-success="onSubmit">
      <McCardHeader :title="$t('category.imageGallery')">
        <div class="py-4">
          <a-form-item
            validate-trigger="blur"
            :hide-label="true"
            :show-colon="false"
            field="imgId"
            label=""
            class=""
            :rules="[{ required: true, message: $t('field.imageIsRequired') }]"
          >
            <McUpload
              ref="uploadRef"
              :title="$t('upload.uploadCategory')"
              :is-list="false"
              :show-sub-title="true"
              @on-uploaded="onUploaded"
              @on-delete="onDelete"
            ></McUpload>
          </a-form-item>
        </div>
      </McCardHeader>
      <McCardHeader :title="$t('category.categoryInfo')">
        <div class="w-[60%] flex flex-col justify-start items-start py-4">
          <div class="w-full relative">
            <a-form-item
              field="name"
              :label="$t('field.name')"
              class=""
              :rules="[{ required: true, message: $t('field.nameIsRequired') }]"
            >
              <InputField v-model="form.name" :max-length="30" class="!pl-3"></InputField>
              <template #help>
                <div class="text-transparent"></div>
              </template>
              <!-- <a-input v-model="form.post" placeholder="please enter your post..." /> -->
            </a-form-item>
            <div class="absolute right-0 bottom-0">
              <div class="flex justify-end items-center text-[#AEAEAE] text-xs">
                {{ form.name.length }} / 30
              </div>
            </div>
          </div>

          <!-- <a-form-item
            field="description"
            label="Description"
            :rules="[{ required: true, message: 'Description is required' }]"
          >
            <a-textarea
              v-model="form.description"
              placeholder="Please enter something"
              allow-clear
            />
          </a-form-item> -->
        </div>
      </McCardHeader>
      <div class="w-full flex justify-end items-center gap-4 mt-6">
        <a-button
          type="outline"
          class="!border-[#D1D5DB] !text-[#374151] !rounded-md"
          @click="$router.replace('/category')"
        >
          {{ $t('button.cancel') }}
        </a-button>

        <a-button type="primary" class="!rounded-md" @click="onSave">
          {{ $t('button.save') }}
        </a-button>
      </div>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { useCategoryStore } from '~/stores/category'
const cateStore = useCategoryStore()
const route = useRoute()
const form = reactive({
  name: '',
  description: ' ',
  imgId: '',
  imgData: null as any
})

const formRef = ref(null) as any
const uploadRef = ref(null) as any

const onSubmit = async () => {
  const id = route.params?.id as string
  await cateStore.onEditCategory(form.name, form.description, form.imgData?.response?._id, id)
}

const onSave = () => {
  formRef.value?.handleSubmit()
}

const onDelete = () => {
  form.imgData = null
  form.imgId = ''
}

const onUploaded = (files: any) => {
  form.imgData = files[0]
  form.imgId = files[0]?.response?._id
}

onMounted(async () => {
  const id = route.params?.id as string
  const res = await cateStore.getCategoryById(id)
  form.name = res.category.name
  form.description = res.category.description
  form.imgId = res?.category?.image?._id
  form.imgData = {
    url: res.category?.image?.url,
    response: {
      _id: res?.category?.image?._id,
      url: res?.category?.image?.url
    },
    file: {
      type: res?.category?.image?.fileType
    },
    status: '',
    name: res?.category?.image?.fileName
  }

  uploadRef.value?.setUploadedImages([form.imgData])
})
</script>

<style scoped></style>
