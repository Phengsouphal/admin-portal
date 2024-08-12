<template>
  <div class="w-full h-full p-6">
    <McTitle :title="$t('admin.storeSetting')"> </McTitle>

    <McCardHeader :title="$t('admin.storeInfo')" contentClass="!p-0">
      <div class="w-full">
        <div class="py-3 px-6 mc-border-b">
          <McUploadStore ref="uploadRef" @onUploaded="onUploaded"></McUploadStore>
        </div>
        <div class="row mc-border-b">
          <p class="title">{{ $t('field.storeName') }}</p>
          <p class="value">{{ data?.name }}</p>
          <a-button type="text">
            <p class="text-sm font-medium text-[#007BE0]" @click="onShowUpdateSimple('Name')">
              {{ $t('button.update') }}
            </p>
          </a-button>
        </div>
        <div class="row mc-border-b">
          <p class="title">{{ $t('field.currency') }}</p>
          <p class="value">{{ data?.currency }}</p>
          <a-button type="text">
            <p class="text-sm font-medium text-[#007BE0]" @click="onShowUpdateSimple('Currency')">
              {{ $t('button.update') }}
            </p>
          </a-button>
        </div>
        <div class="row mc-border-b">
          <p class="title">{{ $t('admin.openHour') }}</p>
          <p
            class="value"
            :class="[data?.openStatus === OpenStatusEnum.OPEN ? '!text-success' : '!text-danger']"
          >
            {{
              data?.openStatus === OpenStatusEnum.OPEN
                ? $t('common.open')
                : data?.openStatus === OpenStatusEnum.CLOSE
                  ? $t('common.close')
                  : $t('common.closeTemporary')
            }}
          </p>
          <a-button type="text">
            <p class="text-sm font-medium text-[#007BE0]" @click="onShowUpdateSimple('Open')">
              {{ $t('button.update') }}
            </p>
          </a-button>
        </div>

        <p class="main-title">{{ $t('admin.payment') }}</p>

        <div class="row mc-border-b border-t">
          <p class="title">{{ $t('admin.wallet') }}</p>
          <div>
            <p class="value">{{ data?.walletName }}</p>
            <p class="text-xs text-left font-medium text-[#AEAEAE]">
              {{ data?.walletAddress }}
            </p>
          </div>
          <a-button type="text">
            <p class="text-sm font-medium text-[#007BE0]" @click="onShowUpdateSimple('Payment')">
              {{ $t('button.update') }}
            </p>
          </a-button>
        </div>

        <p class="main-title">{{ $t('admin.contactAndAddress') }}</p>

        <div class="row mc-border-b border-t">
          <p class="title">{{ $t('admin.contactNumber') }}</p>
          <p class="value">{{ data?.phoneNumber }}</p>
          <a-button type="text">
            <p class="text-sm font-medium text-[#007BE0]" @click="onShowUpdateSimple('Phone')">
              {{ $t('button.update') }}
            </p>
          </a-button>
        </div>
        <div class="row mc-border-b">
          <p class="title">{{ $t('admin.email') }}</p>
          <p class="value">{{ data?.email }}</p>
          <a-button type="text">
            <p class="text-sm font-medium text-[#007BE0]" @click="onShowUpdateSimple('Email')">
              {{ $t('button.update') }}
            </p>
          </a-button>
        </div>
        <div class="row mc-border-b">
          <p class="title">{{ $t('admin.address') }}</p>
          <p class="value">{{ data?.address }}</p>
          <a-button type="text">
            <p class="text-sm font-medium text-[#007BE0]" @click="onShowUpdateSimple('Address')">
              {{ $t('button.update') }}
            </p>
          </a-button>
        </div>

        <p class="main-title">{{ $t('admin.deliveryFee') }}</p>
        <div class="row mc-border-b border-t">
          <p class="title">{{ $t('admin.defaultCharge') }}</p>
          <p class="value">{{ data?.deliveryFee }}</p>
          <a-button type="text">
            <p class="text-sm font-medium text-[#007BE0]" @click="onShowUpdateSimple('Fee')">
              {{ $t('button.update') }}
            </p>
          </a-button>
        </div>

        <p class="main-title">{{ $t('admin.order') }}</p>
        <div class="row mc-border-b border-t">
          <p class="title">{{ $t('admin.minimumOrder') }}</p>
          <p class="value">{{ data?.minOrderAmount }}</p>
          <a-button type="text">
            <p class="text-sm font-medium text-[#007BE0]" @click="onShowUpdateSimple('MinOrder')">
              {{ $t('button.update') }}
            </p>
          </a-button>
        </div>
        <div class="row mc-border-b">
          <p class="title">{{ $t('admin.autoConfirmOrder') }}</p>
          <a-switch
            v-model="autoConfirm"
            :beforeChange="handleChangeIntercept"
            class="!min-w-12"
          ></a-switch>
          <!-- <a-button type="text">
            <p class="text-sm font-medium text-[#007BE0]">{{ $t('button.update') }}</p>
          </a-button> -->
        </div>
      </div>
    </McCardHeader>
  </div>

  <!-- Model update simple data -->
  <a-modal
    v-model:visible="showUpdateSimple"
    :closable="false"
    class="mc-modal"
    :footer="false"
    body-class="!p-0"
  >
    <a-form :model="form" ref="formSimpleRef" layout="vertical" class="" @submit-success="onSubmit">
      <div
        class="w-full h-16 px-6 flex justify-between items-center rounded-t-2xl border-b border-[#D9D9D9]"
      >
        <p class="text-[#111827] font-semibold text-base">{{ displaySimpleTitle }}</p>
        <a-button type="text" class="!p-0 !h-fit" @click="showUpdateSimple = false">
          <IconCross></IconCross>
        </a-button>
      </div>
      <div class="w-full px-6 mt-6">
        <a-form-item
          v-if="typeEdit === 'Name'"
          field="name"
          :label="$t('field.storeName')"
          :rules="[{ required: true, message: $t('field.storeNameIsRequired') }]"
        >
          <InputField v-model="form.name" :max-length="30" class="!pl-3"></InputField>
        </a-form-item>
        <a-form-item
          v-if="typeEdit === 'Address'"
          field="address"
          :label="$t('field.address')"
          :rules="[{ required: true, message: $t('field.addressIsRequired') }]"
        >
          <InputField v-model="form.address" :max-length="30" class="!pl-3"></InputField>
        </a-form-item>
        <a-form-item
          v-if="typeEdit === 'Email'"
          field="email"
          :label="$t('field.email')"
          :rules="[{ required: true, message: $t('field.emailIsRequired') }]"
        >
          <InputField v-model="form.email" :max-length="30" class="!pl-3"></InputField>
        </a-form-item>

        <template v-if="typeEdit === 'Payment'">
          <a-form-item
            :label="$t('field.walletName')"
            :rules="[{ required: true, message: $t('field.walletNameIsRequired') }]"
          >
            <InputField v-model="form.walletName" :max-length="30" class="!pl-3"></InputField>
          </a-form-item>
          <a-form-item
            field="walletAddress"
            :label="$t('field.walletAddress')"
            :rules="[{ required: true, message: $t('field.walletAddressIsRequired') }]"
          >
            <InputField v-model="form.walletAddress" :max-length="30" class="!pl-3"></InputField>
          </a-form-item>
        </template>

        <a-form-item
          v-if="typeEdit === 'Currency'"
          field="currency"
          :label="$t('field.currency')"
          :rules="[{ required: true, message: $t('field.currencyIsRequired') }]"
        >
          <a-select
            v-model="form.currency"
            class="mc-select !w-full !bg-transparent !rounded-md !border-[1.5px] !border-[#d8dce0]"
          >
            <a-option :value="CurrencyEnum.USD">United States Dollar ($)</a-option>
            <a-option :value="CurrencyEnum.YUAN">Yuan (¥)</a-option>
            <a-option :value="CurrencyEnum.KHR">Cambodian Riel (៛)</a-option>
          </a-select>
        </a-form-item>

        <a-form-item
          v-if="typeEdit === 'Fee'"
          field="deliveryFee"
          :label="$t('admin.deliveryFee')"
          :rules="[{ required: true, message: $t('field.deliveryFeeIsRequired') }]"
        >
          <InputNumber
            v-model="form.deliveryFee"
            :hide-button="true"
            class="!pl-2"
            @input="(e) => (form.deliveryFee = e)"
          >
            <template #suffix>
              <div
                class="px-4 bg-slate-200 h-full flex justify-center items-center rounded-tr-md rounded-br-md"
              >
                $
              </div>
            </template>
          </InputNumber>
        </a-form-item>

        <a-form-item
          v-if="typeEdit === 'MinOrder'"
          field="minOrderAmount"
          :label="$t('admin.minOrderAmount')"
          :rules="[{ required: true, message: $t('field.minOrderAmountIsRequired') }]"
        >
          <InputNumber
            v-model="form.minOrderAmount"
            :hide-button="true"
            class="!pl-2"
            @input="(e) => (form.minOrderAmount = e)"
          >
            <template #suffix>
              <div
                class="px-4 bg-slate-200 h-full flex justify-center items-center rounded-tr-md rounded-br-md"
              >
                $
              </div>
            </template>
          </InputNumber>
        </a-form-item>
      </div>
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
    </a-form>
  </a-modal>

  <!-- Model update phone number data -->
  <a-modal
    v-model:visible="showUpdatePhoneNumber"
    :closable="false"
    class="mc-modal"
    :footer="false"
    body-class="!p-0"
  >
    <a-form :model="form" layout="vertical" class="">
      <div
        class="w-full h-16 px-6 flex justify-between items-center rounded-t-2xl border-b border-[#D9D9D9]"
      >
        <p class="text-[#111827] font-semibold text-base">{{ displaySimpleTitle }}</p>
        <a-button type="text" class="!p-0 !h-fit" @click="showUpdatePhoneNumber = false">
          <IconCross></IconCross>
        </a-button>
      </div>
      <div class="w-full px-6 mt-6">
        <a-form-item field="phoneNumber" :label="$t('field.phoneNumber')">
          <InputField
            class="h-[38px]"
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
            :model-value="form.otp"
            class="opt-input !pl-2"
            @input="
              (e) => {
                form.otp = e.replace(/[^0-9]+/g, '')
              }
            "
          >
            <template #suffix>
              <a-button
                :disabled="form.phoneNumber.length <= 7"
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

        <a-button type="primary" class="!rounded-md !px-6" @click="onEditInfo">
          {{ $t('button.save') }}
        </a-button>
      </div>
    </a-form>
  </a-modal>

  <!-- Model update Open Hour data -->
  <a-modal
    v-model:visible="showUpdateOpenHour"
    :closable="false"
    class="mc-modal"
    :footer="false"
    body-class="!p-0"
  >
    <a-form :model="form" layout="vertical" class="">
      <div
        class="w-full h-16 px-6 flex justify-between items-center rounded-t-2xl border-b border-[#D9D9D9]"
      >
        <p class="text-[#111827] font-semibold text-base">{{ displaySimpleTitle }}</p>
        <a-button type="text" class="!p-0 !h-fit" @click="showUpdateOpenHour = false">
          <IconCross></IconCross>
        </a-button>
      </div>
      <div class="w-full px-6 mt-6">
        <McRadio
          class="mb-2"
          :check="form.openStatus === OpenStatusEnum.OPEN"
          :text="$t('common.open')"
          @click="form.openStatus = OpenStatusEnum.OPEN"
        ></McRadio>
        <template v-if="form.openStatus === OpenStatusEnum.OPEN">
          <div class="w-full flex justify-between items-center gap-x-6">
            <a-form-item
              field="openFromDay"
              :label="$t('field.openFrom')"
              :rules="[{ required: true, message: $t('field.openFromDayIsRequired') }]"
            >
              <McChooseDay :placeholder="$t('field.chooseDay')" v-model="form.openFromDay">
              </McChooseDay>
            </a-form-item>
            <a-form-item
              field="openToDay"
              :label="$t('field.openTo')"
              :rules="[{ required: true, message: $t('field.openToDayIsRequired') }]"
            >
              <McChooseDay
                :placeholder="$t('field.chooseDay')"
                v-model="form.openToDay"
              ></McChooseDay>
            </a-form-item>
          </div>
          <div class="w-full flex justify-between items-center gap-x-6">
            <a-form-item
              field="openFromHour"
              :label="$t('field.openTime')"
              :rules="[{ required: true, message: $t('field.openTimeIsRequired') }]"
            >
              <a-time-picker format="HH:mm a" v-model="form.openFromHour" class="!w-full" />
            </a-form-item>
            <a-form-item
              field="openToHour"
              :label="$t('field.closeTime')"
              :rules="[{ required: true, message: $t('field.closeTimeIsRequired') }]"
            >
              <a-time-picker format="HH:mm a" v-model="form.openToHour" class="!w-full" />
            </a-form-item>
          </div>
        </template>

        <McRadio
          class="mb-2"
          :check="form.openStatus === OpenStatusEnum.TEMPORARY_CLOSE"
          :text="$t('common.closeTemporary')"
          @click="form.openStatus = OpenStatusEnum.TEMPORARY_CLOSE"
        ></McRadio>

        <div
          v-if="form.openStatus === OpenStatusEnum.TEMPORARY_CLOSE"
          class="w-full flex justify-between items-center"
        >
          <a-form-item
            class="!my-4 !w-1/2"
            field="tempCloseStart"
            :label="$t('field.startDate')"
            :rules="[{ required: true, message: $t('field.startAtIsRequired') }]"
          >
            <a-date-picker
              :placeholder="$t('field.pleaseSelectStartDate')"
              class="!bg-transparent !rounded-md !border !border-[#D8DCE0]"
              :show-now-btn="false"
              format="YYYY-MM-DD"
              :default-value="form.tempCloseStart"
              :model-value="form.tempCloseStart"
              @change="(v) => onChangeStartOrEndDate(v, 'start')"
            >
              <template #prefix> <IconCalendar></IconCalendar> </template>
              <template #suffix-icon> <p></p></template>
            </a-date-picker>
          </a-form-item>

          <a-form-item
            class="!my-4 !w-1/2"
            field="tempCloseEnd"
            :label="$t('field.endDate')"
            :rules="[
              { required: true, message: $t('field.endAtIsRequired') },
              {
                validator: (value: any, cb: any) => {
                  const endDate = dayjs(value)
                  const startDate = dayjs(form.tempCloseStart)
                  if (endDate.isBefore(startDate)) {
                    cb($t('field.endDateCannotBeSmallerThanStartDate'))
                  } else {
                    cb()
                  }
                }
              }
            ]"
          >
            <a-date-picker
              :placeholder="$t('field.pleaseSelectEndDate')"
              class="!bg-transparent !rounded-md !border !border-[#D8DCE0]"
              :show-now-btn="false"
              format="YYYY-MM-DD"
              :default-value="form.tempCloseEnd"
              :model-value="form.tempCloseEnd"
              @change="(v) => onChangeStartOrEndDate(v, 'end')"
            >
              <template #prefix> <IconCalendar></IconCalendar> </template>
              <template #suffix-icon> <p></p></template>
            </a-date-picker>
          </a-form-item>
        </div>

        <McRadio
          class="mb-2"
          :check="form.openStatus === OpenStatusEnum.CLOSE"
          :text="$t('common.close')"
          @click="form.openStatus = OpenStatusEnum.CLOSE"
        ></McRadio>
      </div>
      <div class="w-full flex justify-end items-center my-6 px-6 gap-x-5">
        <a-button
          type="outline"
          class="!border-[#D1D5DB] !text-[#374151] !px-6 !rounded-md"
          @click="showUpdateOpenHour = false"
        >
          {{ $t('button.cancel') }}
        </a-button>

        <a-button type="primary" class="!rounded-md !px-6" @click="onEditInfo">
          {{ $t('button.save') }}
        </a-button>
      </div>
    </a-form>
  </a-modal>

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
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { CurrencyEnum, DayEnum, OpenStatusEnum } from '~/constants/common'
import { useAuthStore } from '~/stores/auth'
import { useStoreStore } from '~/stores/store'

const { t } = useI18n()
const storeStore = useStoreStore()
const authStore = useAuthStore()

const autoConfirm = ref(false)

const typeEdit = ref<
  'Name' | 'Currency' | 'Open' | 'Payment' | 'Phone' | 'Email' | 'Address' | 'Fee' | 'MinOrder'
>('Name')

const countryCode = ref('855')
const form = reactive({
  logoId: '',
  name: '',
  description: '',
  email: '',
  phoneNumber: '',
  address: '',
  currency: CurrencyEnum.USD,
  openStatus: OpenStatusEnum.OPEN,
  minOrderAmount: 0,
  deliveryFee: 0,
  isAutoConfirmOrder: true,
  walletName: '',
  walletAddress: '',
  otp: '',
  tempCloseEnd: '',
  tempCloseStart: '',
  openFromDay: DayEnum.MONDAY as any,
  openToDay: DayEnum.SATURDAY as DayEnum | string,
  openFromHour: '',
  openToHour: ''
})

const uploadRef = ref(null) as any
const uploadedImg = ref(null) as any
const imgData = ref(null) as any

const showUpdateSimple = ref(false)
const showUpdateOpenHour = ref(false)
const showUpdatePhoneNumber = ref(false)

const showChangeImg = ref(false)

const formSimpleRef = ref(null) as any

const data = computed(() => storeStore.store)

const displaySimpleTitle = computed(() => {
  const data = {
    Name: 'Update Store Name',
    Currency: 'Update Currency',
    Open: 'Update Open Hour',
    Payment: 'Update Payment',
    Phone: 'Update Phone Number',
    Email: 'Update Email',
    Address: 'Update Address',
    Fee: 'Update Default Charge',
    MinOrder: 'Update Minimum Order'
  }
  return data[typeEdit.value]
})

const onChangeStartOrEndDate = (v: any, type: 'start' | 'end') => {
  if (type == 'end') {
    form.tempCloseEnd = v
  } else {
    form.tempCloseStart = v
  }
}

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
  const phone = '+' + countryCode.value + form.phoneNumber
  const res = await authStore.sendOtpRequest(phone, 'LOGIN')
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

const onEditInfo = () => {
  formSimpleRef.value?.handleSubmit()
}

const onShowUpdateSimple = (
  type:
    | 'Name'
    | 'Currency'
    | 'Open'
    | 'Payment'
    | 'Phone'
    | 'Email'
    | 'Address'
    | 'Fee'
    | 'MinOrder'
) => {
  typeEdit.value = type
  if (type !== 'Phone' && type !== 'Open') {
    showUpdateSimple.value = true
  } else if (type == 'Phone') {
    showUpdatePhoneNumber.value = true
  } else if (type == 'Open') {
    showUpdateOpenHour.value = true
  }
}

const onCancelChangeImg = async () => {
  showChangeImg.value = false
  uploadRef.value?.setUploadedImages([imgData.value])
}

const onSaveImg = async () => {
  form.logoId = uploadedImg.value?.response?._id
  storeStore.store = form
  await storeStore.onEditStore()
  showChangeImg.value = false
}

const onSubmit = async () => {
  storeStore.store = { ...form, logo: storeStore.store?.logo }
  await storeStore.onEditStore()
  showUpdateSimple.value = false
}

const handleChangeIntercept = async () => {
  form.isAutoConfirmOrder = !form.isAutoConfirmOrder
  storeStore.store = form
  await storeStore.onEditStore()
  return true
}

onMounted(async () => {
  await storeStore.getStore()
  imgData.value = {
    url: data.value?.logo?.url,
    response: {
      _id: data.value?.logo?._id,
      url: data.value?.logo?.url
    },
    file: {
      type: data.value?.logo?.fileType
    },
    status: '',
    name: data.value?.logo?.fileName
  }

  uploadRef.value?.setUploadedImages([imgData.value])

  form.logoId = data.value?.logoId || ''
  form.name = data.value?.name || ''
  form.description = data.value?.description || 'ddd'
  form.email = data.value?.email || 'test@gmail.com'
  form.currency = data.value?.currency || CurrencyEnum.USD
  form.address = data.value?.address || 'PhnomPenh,Cambodia'
  form.phoneNumber = data.value?.phoneNumber || '+8559893290233'
  form.openStatus = data.value?.openStatus || OpenStatusEnum.OPEN
  form.minOrderAmount = data.value?.minOrderAmount || 0
  form.deliveryFee = data.value?.deliveryFee || 0
  form.isAutoConfirmOrder = data.value?.isAutoConfirmOrder || false
  form.walletName = data.value?.walletName || '用户72959'
  form.walletAddress = data.value?.walletAddress || 'mp0000000728'
  form.tempCloseStart = data.value?.tempCloseStart || ''
  form.tempCloseEnd = data.value?.tempCloseEnd || ''
  form.openFromDay = data.value?.openFromDay || ''
  form.openToDay = data.value?.openToDay || ''
  form.openFromHour = data.value?.openFromHour || ''
  form.openToHour = data.value?.openToHour || ''

  autoConfirm.value = data.value?.isAutoConfirmOrder || false
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
