<template>
  <div class="w-full h-full px-6 pt-5">
    <McTitle :title="$t('user.title')"></McTitle>
    <a-form ref="formRef" :model="form" :layout="'vertical'" @submit-success="onSubmit">
      <McCardHeader :title="$t('user.userInfo')">
        <div class="w-full flex flex-col justify-start items-start py-4">
          <div class="w-full gap-x-12 flex justify-start items-center relative">
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
            <div class="w-[40%]">
              <a-form-item
                validate-trigger="blur"
                field="phoneNumber"
                label="Phone Number"
                :rules="[{ required: true, message: 'Phone Number is required' }]"
              >
                <InputField
                  class=""
                  v-model="form.phoneNumber"
                  :placeholder="$t('field.enterPhoneNumber')"
                >
                  <template #prefix>
                    <a-dropdown @select="(v: any) => (countryCode = v)" position="bottom">
                      <a-button
                        type="text"
                        class="!p-0 !w-[90px] !h-full !border-none !rounded-l-lg !bg-opacity-0"
                      >
                        <div class="w-full h-full flex justify-between items-center pl-3">
                          <IconKh v-if="countryCode === '855'"></IconKh>
                          <IconCh v-if="countryCode === '86'"></IconCh>
                          <IconIn v-if="countryCode === '91'"></IconIn>
                          <p class="mx-2 font-semibold text-black text-opacity-70">
                            +{{ countryCode }}
                          </p>
                          <!-- <div class="h-[60%] bg-main w-[1.5px]"></div> -->
                        </div>
                      </a-button>
                      <template #content>
                        <a-doption value="855">
                          <div class="flex justify-center items-center">
                            <IconKh></IconKh>
                            <p class="w-16 ml-2 font-medium">+855</p>
                          </div>
                        </a-doption>

                        <a-doption value="86">
                          <div class="flex justify-center items-center">
                            <IconCh></IconCh>
                            <p class="w-16 ml-2 font-medium">+86</p>
                          </div>
                        </a-doption>

                        <a-doption value="91">
                          <div class="flex justify-center items-center">
                            <IconIn></IconIn>
                            <p class="w-16 ml-2 font-medium">+91</p>
                          </div>
                        </a-doption>
                      </template>
                    </a-dropdown>
                  </template>
                </InputField>
              </a-form-item>
            </div>
          </div>
          <div class="w-full gap-x-12 flex justify-start items-center relative mt-4">
            <div class="w-[40%]">
              <a-form-item
                field="password"
                label="Password"
                :rules="[{ required: true, message: 'Password is required' }]"
              >
                <InputPassword v-model="form.password" class="!pl-2"></InputPassword>
              </a-form-item>
            </div>
            <div class="w-[40%]">
              <a-form-item
                field="role"
                label="Role"
                :rules="[{ required: true, message: 'Role is required' }]"
              >
                <a-select
                  v-model="form.role"
                  class="mc-select !w-full !bg-transparent !rounded-md !border-[1.5px] !border-[#d8dce0]"
                >
                  <a-option
                    :value="item._id"
                    v-for="(item, index) in roleStore.roleList"
                    :key="index"
                  >
                    {{ item.name }}
                  </a-option>
                </a-select>
              </a-form-item>
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
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()
const roleStore = useRoleStore()

const countryCode = ref('855')
const form = reactive({
  name: '',
  phoneNumber: '',
  role: '',
  password: ''
})

const submitting = ref(false)

const formRef = ref(null) as any

const onSubmit = async () => {
  submitting.value = true
  const phone = countryCode.value + form.phoneNumber
  await userStore.onCreateUser(form.name, phone, form.password, form.role)
  submitting.value = false
}

const onSave = () => {
  formRef.value?.handleSubmit()
}

onMounted(async () => {})
</script>

<style>
.mc-select.arco-select-view-single.arco-select-view-focus {
  border-color: #0083b0 !important;
}

.arco-form-item-error .mc-select {
  border-color: red !important;
}
</style>
