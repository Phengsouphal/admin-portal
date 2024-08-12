<template>
  <div class="w-full h-full p-6">
    <McTitle :title="''">
      <template #suffix>
        <div class="w-full flex justify-start items-center">
          <a-button type="text" class="!p-0" @click="$router.go(-1)">
            <div class="flex justify-center items-center">
              <IconArrowLeft></IconArrowLeft>
            </div>
          </a-button>
          <p class="ml-1 text-black text-opacity-70 text-2xl font-semibold">
            {{ $t('admin.accountSetting') }}
          </p>
        </div>
      </template>
    </McTitle>
    <McCardHeader :title="$t('admin.accountInfo')" contentClass="!p-0 !overflow-hidden">
      <div class="w-full rounded-b-2xl overflow-hidden">
        <div class="py-3 px-6 mc-border-b">
          <!-- <McUploadStore ref="uploadRef" @onUploaded="onUploaded"></McUploadStore> -->
          <div class="flex justify-start items-center">
            <a-button type="text" class="!p-0 !h-fit !rounded-full" @click="avatarClick">
              <div class="w-[80px] h-[80px] rounded-full bg-[#EEEEEE] relative">
                <div
                  v-if="formSimple.avatar == ''"
                  class="w-full h-full flex flex-col justify-center items-center"
                >
                  <IconUploadStore></IconUploadStore>
                </div>
                <a-avatar v-else :size="80">
                  <img alt="avatar" :src="formSimple.avatar" />
                </a-avatar>

                <IconCamera class="absolute -right-1 -bottom-1"></IconCamera>
              </div>
            </a-button>

            <a-button type="text">
              <p class="text-sm font-semibold text-[#007BE0]" @click="showUpdatePhoneNumber = true">
                {{ $t('button.removeProfile') }}
              </p>
            </a-button>
          </div>

          <input
            ref="uploadInput"
            type="file"
            hidden
            accept="image/jpg, image/jpeg, image/png, image/gif"
            @change="selectFile"
          />
        </div>
        <div class="row mc-border-b">
          <p class="title">Full Name</p>
          <p class="value">{{ data?.fullName }}</p>
          <a-button type="text">
            <p
              class="text-sm font-medium text-[#007BE0]"
              @click="
                () => {
                  typeSimple = 'Name'
                  showUpdateSimple = true
                }
              "
            >
              {{ $t('button.update') }}
            </p>
          </a-button>
        </div>

        <p class="main-title">Login Info</p>

        <div class="row mc-border-b border-t">
          <p class="title">Phone Number</p>
          <p class="value">{{ data?.phoneNumber }}</p>
          <a-button type="text">
            <p class="text-sm font-medium text-[#007BE0]" @click="showUpdatePhoneNumber = true">
              {{ $t('button.update') }}
            </p>
          </a-button>
        </div>

        <div class="row mc-border-b border-t">
          <p class="title">Password</p>
          <p class="value">Last Update {{ dayjs(data?.updatedAt)?.format('DD/MM/YYYY') }}</p>
          <a-button type="text">
            <p
              class="text-sm font-medium text-[#007BE0]"
              @click="
                () => {
                  typeSimple = 'Password'
                  showUpdateSimple = true
                }
              "
            >
              {{ $t('button.update') }}
            </p>
          </a-button>
        </div>

        <div class="w-full mt-6">
          <div class="w-full px-6 flex justify-between items-center">
            <p class="text-[#111827] text-lg font-semibold">{{ $t('admin.loginAcivity') }}</p>
            <a-button type="text" class="!p-0">
              <p class="text-sm font-semibold text-[#007BE0]" @click="showUpdatePhoneNumber = true">
                {{ $t('add.logOutFomAllDevices') }}
              </p>
            </a-button>
          </div>
          <div class="w-full mt-6">
            <a-table
              class="mc-table"
              :bordered="false"
              :pagination="false"
              :columns="columns"
              :data="tableData"
            >
              <template #date="{}">
                {{ dayjs().format('DD/MM/YYYY hh:mm a') }}
              </template>
              <template #device="{ record }">{{ record.device }} </template>

              <template #location="{ record }">
                {{ record?.location }}
              </template>

              <template #browser="{ record }">
                {{ record?.browser }}
              </template>

              <template #action="{ record }">
                <a-button type="text">
                  <p class="text-sm font-semibold text-main">{{ $t('button.logout') }}</p>
                </a-button>
              </template>
            </a-table>
          </div>
        </div>
      </div>
    </McCardHeader>
  </div>

  <!-- Modal edit User info -->
  <a-modal
    v-model:visible="showUpdateSimple"
    :closable="false"
    class="mc-modal"
    :footer="false"
    body-class="!p-0"
  >
    <div
      class="w-full h-16 px-6 flex justify-between items-center rounded-t-2xl border-b border-[#D9D9D9]"
    >
      <p class="text-[#111827] font-semibold text-base">{{ 'Update Full Name' }}</p>
      <a-button type="text" class="!p-0 !h-fit" @click="showUpdateSimple = false">
        <IconCross></IconCross>
      </a-button>
    </div>
    <a-form
      v-show="typeSimple === 'Name'"
      :model="formSimple"
      ref="formSimpleRef"
      layout="vertical"
      class=""
      @submit-success="onSubmit"
    >
      <div class="w-full px-6 mt-6">
        <a-form-item
          field="fullName"
          label="Full Name"
          :rules="[{ required: true, message: 'Full Name is required' }]"
        >
          <InputField v-model="formSimple.fullName" :max-length="30" class="!pl-3"></InputField>
        </a-form-item>
      </div>
    </a-form>
    <a-form
      v-show="typeSimple === 'Password'"
      :model="formPassword"
      ref="formPasswordRef"
      layout="vertical"
      class=""
      @submit-success="onSubmitUpdatePassword"
    >
      <div class="w-full px-6 mt-6">
        <a-form-item
          field="password"
          :label="$t('field.currentPassword')"
          :rules="[{ required: true, message: $t('field.currentPasswordRequired') }]"
        >
          <InputPassword v-model="formPassword.password" class="!pl-2"></InputPassword>
          <!-- <a-input v-model="form.post" placeholder="please enter your post..." /> -->
        </a-form-item>
        <a-form-item
          field="newPassword"
          :label="$t('field.newPassword')"
          :rules="[{ required: true, message: $t('field.newPasswordRequired') }]"
        >
          <InputPassword v-model="formPassword.newPassword" class="!pl-2"></InputPassword>
          <!-- <a-input v-model="form.post" placeholder="please enter your post..." /> -->
        </a-form-item>
        <a-form-item
          field="confirmPassword"
          :label="$t('field.cfmPassword')"
          :rules="[
            { required: true, message: $t('field.cfmPasswordRequired') },
            {
              validator: (value, cb) => {
                if (value !== formPassword.newPassword) {
                  cb($t('field.confirmPasswordNotMatch'))
                } else {
                  cb()
                }
              }
            }
          ]"
        >
          <InputPassword v-model="formPassword.confirmPassword" class="!pl-2"></InputPassword>
          <!-- <a-input v-model="form.post" placeholder="please enter your post..." /> -->
        </a-form-item>
      </div>
    </a-form>

    <div class="w-full flex justify-end items-center my-6 px-6 gap-x-5">
      <a-button
        type="outline"
        class="!border-[#D1D5DB] !text-[#374151] !px-6 !rounded-md"
        @click="showUpdateSimple = false"
      >
        {{ $t('button.cancel') }}
      </a-button>

      <a-button type="primary" class="!rounded-md !px-6" @click="onEditInfo">
        {{ $t('button.save') }}
      </a-button>
    </div>
  </a-modal>

  <!-- Modal Update User phone number -->
  <a-modal
    v-model:visible="showUpdatePhoneNumber"
    :closable="false"
    class="mc-modal"
    :footer="false"
    body-class="!p-0"
  >
    <a-form
      ref="formPhoneNumberRef"
      :model="formPhoneNumber"
      @submit-success="onSubmitChangePhoneNumber"
      layout="vertical"
      class=""
    >
      <div
        class="w-full h-16 px-6 flex justify-between items-center rounded-t-2xl border-b border-[#D9D9D9]"
      >
        <p class="text-[#111827] font-semibold text-base">{{ 'Update Phone Number' }}</p>
        <a-button type="text" class="!p-0 !h-fit" @click="showUpdatePhoneNumber = false">
          <IconCross></IconCross>
        </a-button>
      </div>
      <div class="w-full px-6 mt-6">
        <a-form-item
          field="phoneNumber"
          label="Phone Number"
          :rules="[{ required: true, message: 'Phone Number is required' }]"
        >
          <InputField
            class="h-[38px]"
            v-model="formPhoneNumber.phoneNumber"
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
                    <p class="mx-2 font-semibold text-black text-opacity-70">+{{ countryCode }}</p>
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

        <a-form-item
          field="otp"
          :label="$t('field.OTPCode')"
          :required="true"
          :rules="[
            {
              validator: (value, cb) => {
                if (!value) {
                  cb($t('field.OTPCodeRequired'))
                } else {
                  cb()
                }
              }
            }
          ]"
        >
          <InputField
            :input-attrs="{
              type: 'tel'
            }"
            :hide-button="true"
            :model-value="formPhoneNumber.otp"
            class="opt-input !pl-2"
            @input="
              (e) => {
                formPhoneNumber.otp = e.replace(/[^0-9]+/g, '')
              }
            "
          >
            <template #suffix>
              <a-button
                :disabled="formPhoneNumber.phoneNumber.length <= 7"
                type="text"
                class="!rounded-md"
                @click="onRequestOtp"
              >
                <p class="text-main font-medium">
                  {{
                    isCountDown
                      ? second == 0
                        ? $t('button.resend')
                        : second + 's'
                      : $t('button.send')
                  }}
                </p>
              </a-button>
            </template>
          </InputField>
        </a-form-item>
      </div>
      <div class="w-full flex justify-end items-center my-6 px-6 gap-x-5">
        <a-button
          type="outline"
          class="!border-[#D1D5DB] !text-[#374151] !px-6 !rounded-md"
          @click="showUpdatePhoneNumber = false"
        >
          {{ $t('button.cancel') }}
        </a-button>

        <a-button
          type="primary"
          html-type="submit"
          class="!rounded-md !px-6"
          @click="onEditPhoneNumber"
        >
          {{ $t('button.save') }}
        </a-button>
      </div>
    </a-form>
  </a-modal>

  <!-- Conform Change Image -->
  <a-modal title="" :closable="false" v-model:visible="showChangeImg" :footer="false">
    <div class="w-full flex flex-col justify-center items-center">
      <div class="w-full flex justify-start items-start">
        <icon-info-circle-fill size="30" class="!text-blue-600" />
        <p class="ml-3 text-lg text-black text-opacity-70">
          {{ $t('admin.areYouSureYouWantToChangeImage') }}
        </p>
      </div>
      <div class="w-full flex justify-end items-center mt-4 gap-x-5">
        <a-button
          type="outline"
          class="!border-[#D1D5DB] !text-[#374151] !px-6 !rounded-md"
          @click="onCancelChangeImg"
        >
          {{ $t('button.cancel') }}
        </a-button>

        <a-button type="primary" class="!rounded-md !px-6" @click="onSaveImg">
          {{ $t('button.save') }}
        </a-button>
      </div>
    </div>
  </a-modal>

  <!-- Modal Crop Image -->
  <a-modal
    title=""
    width="auto"
    :closable="false"
    :footer="false"
    v-model:visible="showCropImg"
    body-class="!p-0 !bg-transparent"
    modal-class="!bg-transparent"
  >
    <div class="w-[700px] h-[700px]">
      <VuePictureCropper
        :boxStyle="{
          width: '100%',
          height: '100%',
          backgroundColor: 'transparent',
          margin: 'auto'
        }"
        :img="pic"
        :options="{
          viewMode: 1,
          dragMode: 'move',
          aspectRatio: 1,
          cropBoxResizable: false
        }"
        :presetMode="{
          mode: 'round',
          width: 400,
          height: 400
        }"
      />
    </div>

    <div class="w-full flex justify-end items-center mt-4 gap-x-5">
      <a-button
        type="outline"
        class="!border-white !text-white !px-6 !rounded-md"
        @click="onCloseCrop"
      >
        {{ $t('button.cancel') }}
      </a-button>

      <a-button type="primary" class="!rounded-md !px-6" :loading="uploadingImg" @click="onCropImg">
        {{ $t('button.save') }}
      </a-button>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import VuePictureCropper, { cropper } from 'vue-picture-cropper'

import dayjs from 'dayjs'
import { useAuthStore } from '~/stores/auth'
import { useMyProfileStore } from '~/stores/my-profile'
import { uploader } from '~/services/https'

const { t } = useI18n()
const myProfileStore = useMyProfileStore()
const authStore = useAuthStore()

const columns = [
  {
    title: 'Device',
    slotName: 'device'
  },
  {
    title: 'Location',
    slotName: 'location'
  },
  {
    title: 'Date',
    slotName: 'date'
  },
  {
    title: 'Browser',
    slotName: 'browser'
  },
  {
    title: 'Action',
    slotName: 'action'
  }
]

const tableData = reactive([
  {
    device: 'Mac OS',
    location: 'PhnomPenh, Cambodia',
    browser: 'Chrome'
  },
  {
    device: 'Mac OS',
    location: 'PhnomPenh, Cambodia',
    browser: 'Firefox'
  }
])

const countryCode = ref('855')
const formSimple = reactive({
  avatar: '',
  fullName: ''
})

const formPassword = reactive({
  password: '',
  newPassword: '',
  confirmPassword: ''
})

const formPhoneNumber = reactive({
  code: '',
  phoneNumber: '',
  otp: ''
})

const uploadingImg = ref(false)
const showCropImg = ref<boolean>(false)
const uploadInput = ref<HTMLInputElement | null>(null)
const pic = ref<string>('')
const result = reactive({
  dataURL: '',
  blobURL: ''
})

const uploadRef = ref(null) as any
const uploadedImg = ref(null) as any
const imgData = ref(null) as any

const typeSimple = ref<'Name' | 'Password'>('Password')

const showUpdateSimple = ref(false)
const showUpdatePhoneNumber = ref(false)

const showChangeImg = ref(false)

const formSimpleRef = ref(null) as any
const formPasswordRef = ref(null) as any
const formPhoneNumberRef = ref(null) as any

const data = computed(() => myProfileStore.myProfile)

const onUploaded = (files: any) => {
  uploadedImg.value = files[0]
  showChangeImg.value = true
  // form.imgId = files[0]?.response?._id
  // form.imgData = files[0]
}

const isCountDown = ref(false)
const second = ref(60)

const onRequestOtp = async () => {
  if (second.value !== 0 && second.value !== 60) {
    return
  }
  const phone = '+' + countryCode.value + formPhoneNumber.phoneNumber
  const res = await authStore.sendOtpRequest(phone, 'CHANGE_PHONE_NUMBER')
  isCountDown.value = true
  countdown()
}

function countdown() {
  second.value = 60
  const interval = setInterval(() => {
    second.value--
    if (second.value === 0) {
      clearInterval(interval)
    }
  }, 1000)
}

const onEditPhoneNumber = () => {
  formPhoneNumberRef.value?.handleSubmit()
}

const onEditInfo = () => {
  if (typeSimple.value === 'Name') {
    formSimpleRef.value?.handleSubmit()
  } else {
    formPasswordRef.value?.handleSubmit()
  }
}

const onCloseCrop = () => {
  showCropImg.value = false
}

const avatarClick = () => {
  uploadInput.value?.click()
}

function ready() {}

const onCancelChangeImg = async () => {
  showChangeImg.value = false
  uploadRef.value?.setUploadedImages([imgData.value])
}

const onCropImg = async () => {
  if (!cropper) return
  uploadingImg.value = true
  const blob: Blob | null = await cropper.getBlob()
  if (!blob) return

  const file = await cropper.getFile()

  const config = {
    'Content-Type': 'multipart/form-data'
    // onUploadProgress: (progressEvent: any) => console.log(progressEvent.loaded)
  }
  if (file) {
    const res = await uploader('v1/upload/file', file, config)
    formSimple.avatar = res.url
  }
  uploadingImg.value = false

  showCropImg.value = false
  showChangeImg.value = true

  //   result.dataURL = base64
  //   result.blobURL = URL.createObjectURL(blob)
  //   showCropImg.value = false
}

function selectFile(e: Event) {
  // Reset last selection and results
  pic.value = ''
  result.dataURL = ''
  result.blobURL = ''

  // Get selected files
  const { files } = e.target as HTMLInputElement
  if (!files || !files.length) return

  // Convert to dataURL and pass to the cropper component
  const file = files[0]
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => {
    // Update the picture source of the `img` prop
    pic.value = String(reader.result)

    // Show the modal
    showCropImg.value = true

    // Clear selected files of input element
    if (!uploadInput.value) return
    uploadInput.value.value = ''
  }
}

const onSaveImg = async () => {
  await myProfileStore.onEditMyProfile(data.value?.fullName || '', formSimple.avatar)
  showChangeImg.value = false
  //   myProfileStore. = form
  //   await storeStore.onEditStore()
  //   showChangeImg.value = false
}

const onSubmit = async () => {
  await myProfileStore.onEditMyProfile(formSimple.fullName, formSimple.avatar)
  myProfileStore.getMyProfile()
  showUpdateSimple.value = false
}

const onSubmitUpdatePassword = async () => {
  await myProfileStore.changeMyPassword(
    formPassword.password,
    formPassword.newPassword,
    formPassword.confirmPassword
  )
}

const onSubmitChangePhoneNumber = async () => {
  formPhoneNumber.code = countryCode.value
  await myProfileStore.changeMyPhoneNumber(
    formPhoneNumber.phoneNumber,
    formPhoneNumber.code,
    formPhoneNumber.otp
  )
}

onMounted(async () => {
  //   await storeStore.getStore()
  //   imgData.value = {
  //     url: data.value?.logo?.url,
  //     response: {
  //       _id: data.value?.logo?._id,
  //       url: data.value?.logo?.url
  //     },
  //     file: {
  //       type: data.value?.logo?.fileType
  //     },
  //     status: '',
  //     name: data.value?.?.fileName
  //   }

  uploadRef.value?.setUploadedImages([imgData.value])
  formSimple.fullName = data.value?.fullName || ''
  formSimple.avatar = data.value?.avatarUrl || ''
})
</script>

<style scoped>
.main-title {
  @apply text-[#111827] px-6 mt-9 mb-4 text-lg font-medium min-w-60 text-left;
}
.row {
  @apply flex justify-start items-center p-3 px-6;
}
.title {
  @apply text-[#00000070] min-w-60 text-left;
}

.value {
  @apply text-[#00000070] min-w-64 text-sm font-medium text-left;
}

.mc-border-b {
  @apply border-b border-[#D9D9D9];
}

:deep(.opt-input .arco-input-suffix) {
  border-left: none !important;
}
</style>
