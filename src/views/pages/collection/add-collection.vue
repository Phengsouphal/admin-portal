<template>
  <div class="w-full h-full px-6 pt-5">
    <McTitle :title="$t('collection.title')"></McTitle>
    <a-form ref="formRef" :model="form" :layout="'vertical'" @submit-success="onSubmit">
      <McCardHeader :title="$t('button.addCollection')">
        <div class="w-[60%] flex flex-col justify-start items-start py-4">
          <div class="w-full relative">
            <a-form-item
              validate-trigger="blur"
              field="name"
              :label="$t('field.name')"
              :rules="[{ required: true, message: $t('field.nameIsRequired') }]"
            >
              <InputField v-model="form.name" :max-length="75" class="!pl-3"></InputField>
              <template #help>
                <div class="text-transparent"></div>
              </template>
              <!-- <a-input v-model="form.post" placeholder="please enter your post..." /> -->
            </a-form-item>
            <div class="absolute right-0 bottom-0">
              <div class="flex justify-end items-center text-[#AEAEAE] text-xs">
                {{ form.name.length }} / 75
              </div>
            </div>
          </div>

          <div class="flex justify-start items-center mt-3">
            <a-switch v-model="form.isActive"></a-switch>
            <p class="text-base text-black text-opacity-70 ml-4">
              {{ form.isActive ? $t('status.active') : $t('status.inactive') }}
            </p>
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
          @click="$router.go(-1)"
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
import { useCollectionStore } from '~/stores/collection'

const collectionStore = useCollectionStore()
const form = reactive({
  name: '',
  description: ' ',
  isActive: false
})

const formRef = ref(null) as any

const onSubmit = async () => {
  await collectionStore.onCreateCollection(form.name, form.description, form.isActive)
}

const onSave = () => {
  formRef.value?.handleSubmit()
}
</script>

<style scoped></style>
