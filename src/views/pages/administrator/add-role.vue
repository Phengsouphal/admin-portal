<template>
  <div class="w-full h-full p-6 text-black">
    <McTitle :title="$t('role.addRole')"></McTitle>
    <a-form ref="formRef" :model="form" :layout="'vertical'" @submit-success="onSubmit">
      <McCardHeader title="">
        <div class="w-full flex flex-col justify-start items-start py-4">
          <div class="w-[40%]">
            <a-form-item
              validate-trigger="blur"
              field="name"
              label="Name"
              class=""
              :rules="[{ required: true, message: 'Name is required' }]"
            >
              <InputField v-model="form.name" :max-length="75" class="!pl-3"></InputField>
              <template #help>
                <div class="text-transparent"></div>
              </template>
              <!-- <a-input v-model="form.post" placeholder="please enter your post..." /> -->
            </a-form-item>
          </div>

          <div class="w-full flex flex-col justify-start items-start">
            <div
              class="w-full flex flex-col justify-start items-start"
              v-for="(item, index) in roleStore.rolePermissionList"
              :key="index"
            >
              <p class="font-semibold mb-4">{{ item.module }}</p>
              <a-checkbox-group v-model="form.permissionKeys" direction="vertical" class="w-[40%]">
                <a-checkbox
                  :value="subItem.key"
                  class="mb-4"
                  v-for="(subItem, index) in item.permissions"
                  :key="index"
                >
                  <template #checkbox="{ checked }">
                    <div class="w-full flex justify-between items-center">
                      <p class="text-sm text-opacity-70">{{ subItem.name }}</p>
                      <IconRoleCheck v-if="checked"></IconRoleCheck>
                      <IconRoleUnCheck v-else></IconRoleUnCheck>
                    </div>
                  </template>
                </a-checkbox>
              </a-checkbox-group>
            </div>
          </div>
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

        <a-button type="primary" class="!rounded-md" :loading="submitting" @click="onSave">
          {{ $t('button.save') }}
        </a-button>
      </div>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { useRoleStore } from '~/stores/role'

const roleStore = useRoleStore()

const form = reactive({
  name: '',
  description: ' ',
  permissionKeys: [] as string[]
})

const submitting = ref(false)

const formRef = ref(null) as any

const onSubmit = async () => {
  submitting.value = true
  await roleStore.onCreateRole(form.name, form.description, form.permissionKeys)
  submitting.value = false
}

const onSave = () => {
  formRef.value?.handleSubmit()
}

onMounted(async () => {
  await roleStore.getRolePermissionList()
})
</script>

<style>
.mc-select.arco-select-view-single.arco-select-view-focus {
  border-color: #ff784e !important;
}

.arco-form-item-error .mc-select {
  border-color: red !important;
}
</style>
