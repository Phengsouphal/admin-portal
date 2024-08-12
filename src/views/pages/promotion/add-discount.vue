<template>
  <div class="w-full h-full px-6 py-5">
    <McTitle :title="$t('promotion.createSimpleDiscount')"> </McTitle>
    <a-form
      ref="formRef"
      :model="form"
      :layout="'vertical'"
      :rules="rules"
      class="!w-full"
      @submit-success="onSubmit"
      @submit-failed="onSubmitFail"
    >
      <div class="w-full flex justify-between items-start gap-x-6">
        <div class="w-[60%]">
          <McCardHeader :title="$t('promotion.simpleDiscount')" class="pb-4">
            <div class="w-full relative mt-4">
              <a-form-item
                field="name"
                :label="$t('field.name')"
                class=""
                :rules="[{ required: true, message: $t('field.nameIsRequired') }]"
              >
                <InputField v-model="form.name" :max-length="75" class="!px-3"></InputField>
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
          </McCardHeader>

          <McCardHeader :title="$t('voucher.discountValue')" class="pb-4">
            <McRadio
              class="mb-2 mt-4"
              :check="form.valueType === DiscountEnum.PERCENTAGE"
              :text="$t('common.percentage')"
              @click="form.valueType = DiscountEnum.PERCENTAGE"
            ></McRadio>
            <McRadio
              class="mb-4"
              :check="form.valueType === DiscountEnum.AMOUNT"
              :text="$t('common.fixedAmount')"
              @click="form.valueType = DiscountEnum.AMOUNT"
            ></McRadio>
            <a-form-item
              v-if="form.valueType !== ''"
              class="!w-[60%]"
              field="value"
              :hide-label="true"
              :rules="[{ required: true, message: $t('field.valueIsRequired') }]"
            >
              <InputNumber
                v-model="form.value"
                :hide-button="true"
                class="!pl-2"
                @input="(e) => (form.value = e)"
              >
                <template #suffix>
                  <div
                    class="w-10 bg-slate-200 h-full flex justify-center items-center rounded-tr-md rounded-br-md"
                  >
                    {{ form.valueType === DiscountEnum.AMOUNT ? '$' : '%' }}
                  </div>
                </template>
              </InputNumber>
            </a-form-item>
          </McCardHeader>

          <McCardHeader :title="$t('discount.applyTo')" class="pb-4">
            <div class="mt-4"></div>
            <a-form-item
              class="!w-[60%] !my-4"
              field="applyTo"
              :hide-label="true"
              :rules="[{ required: true, message: $t('field.customerIsRequired') }]"
            >
              <div class="flex flex-col justify-center items-center">
                <McRadio
                  class="mb-2"
                  :check="form.applyTo === ApplyToEnum.ALL"
                  :text="$t(`common.allProduct`)"
                  @click="form.applyTo = ApplyToEnum.ALL"
                ></McRadio>
                <McRadio
                  class="mb-2"
                  :check="form.applyTo === ApplyToEnum.SPECIFIC"
                  :text="$t(`common.specificProduct`)"
                  @click="form.applyTo = ApplyToEnum.SPECIFIC"
                ></McRadio>
              </div>
            </a-form-item>
            <div v-if="ApplyToEnum.SPECIFIC === form.applyTo" class="flex justify-start ml-8">
              <a-button type="primary" class="!rounded-lg !h-[40px]" @click="onBrowseProduct">
                <p>{{ $t('button.browseCustomer') }}</p>
              </a-button>
            </div>
            <div
              v-if="ApplyToEnum.SPECIFIC === form.applyTo && productChosen.length > 0"
              class="w-full max-h-[300px] mt-4 rounded-md border border-[#D8DCE0]"
            >
              <div
                class="w-full flex justify-between items-center p-2 border-[#D8DCE0]"
                :class="[index == 0 ? '' : 'border-t ']"
                v-for="(item, index) in productChosen"
                :key="index"
              >
                <div class="w-[40%] flex justify-start items-center gap-x-4">
                  <a-image
                    width="40"
                    height="40"
                    class="!flex-shrink-0 !rounded-md"
                    :src="item?.variants?.[0]?.medias?.[0].url"
                  />
                  <p class="text-black text-opacity-70">{{ item?.variants?.[0]?.name }}</p>
                </div>
                <p class="w-36 text-left text-black text-opacity-70">
                  {{ item?.variants?.[0]?.price }} $
                </p>
                <a-button type="text" class="!p-0 !h-fit" @click="onRemoveChosen(item.product._id)">
                  <IconCross></IconCross>
                </a-button>
              </div>
            </div>
          </McCardHeader>

          <!-- <McCardHeader :title="$t('voucher.minimumPurchase')" class="pb-4">
            <a-form-item
              field="isNoMinPurchaseAmount"
              :hide-label="true"
              :rules="[{ required: true, message: 'Minimum purchase is required' }]"
            >
              <div class="flex flex-col">
                <McRadio
                  class="mb-2 mt-4"
                  :check="form.isNoMinPurchaseAmount == 'YES'"
                  text="No minimum requirements"
                  @click="form.isNoMinPurchaseAmount = 'YES'"
                ></McRadio>
                <McRadio
                  class="mb-2"
                  :check="form.isNoMinPurchaseAmount == 'NO'"
                  text="Minimum purchase amount"
                  @click="form.isNoMinPurchaseAmount = 'NO'"
                ></McRadio>
              </div>
            </a-form-item>
            <a-form-item
              v-if="form.isNoMinPurchaseAmount === 'NO'"
              class="!w-[60%] !mt-4"
              field="minPurchaseAmount"
              label=""
              :hide-label="true"
              :rules="[{ required: true, message: $t('field.minimumPurchaseIsRequired') }]"
            >
              <InputNumber
                v-model="form.minPurchaseAmount"
                :hide-button="true"
                class="!pl-2"
                @input="(e) => (form.minPurchaseAmount = e)"
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
          </McCardHeader> -->

          <McCardHeader :title="$t('voucher.customer')" class="pb-4">
            <div class="mt-4"></div>
            <a-form-item
              class="!w-[60%] !my-4"
              field="publishTo"
              :hide-label="true"
              :rules="[{ required: true, message: $t('field.publishToIsRequired') }]"
            >
              <div class="flex flex-col justify-center items-center">
                <template v-for="(item, index) in PublicToEnum" :key="index">
                  <McRadio
                    class="mb-2"
                    :check="form.publishTo === item"
                    :text="$t(`common.${item}`)"
                    @click="form.publishTo = item"
                    v-if="item !== PublicToEnum.SPECIFIC_CUSTOMER"
                  ></McRadio>
                </template>
              </div>
            </a-form-item>
          </McCardHeader>

          <McCardHeader :title="$t('voucher.maximunDiscount')" class="pb-4">
            <a-form-item
              field="usageLimit"
              :hide-label="true"
              :rules="[{ required: true, message: $t('field.maxDiscountIsRequired') }]"
            >
              <div class="flex flex-col">
                <McRadio
                  class="mb-2 mt-4"
                  :check="form.usageLimit === UsageLimitEnum.LIMITED"
                  :text="$t('field.limitNumberOfTimesThisDiscountUse')"
                  @click="form.usageLimit = UsageLimitEnum.LIMITED"
                ></McRadio>

                <a-form-item
                  v-if="form.usageLimit === UsageLimitEnum.LIMITED"
                  class="!w-[60%] !my-4"
                  field="maxUseLimit"
                  :hide-label="true"
                  :rules="[{ required: true, message: $t('field.maxUseLimitIsRequired') }]"
                >
                  <InputNumber
                    v-model="form.maxUseLimit"
                    :hide-button="true"
                    class="!pl-2"
                    @input="(e) => (form.maxUseLimit = e)"
                  >
                  </InputNumber>
                  <template #help>
                    <div class="text-[#6B7280] text-opacity-70">
                      {{ $t('voucher.applyToAllProduct') }}
                    </div>
                  </template>
                </a-form-item>

                <McRadio
                  class="mb-2"
                  :check="form.usageLimit === UsageLimitEnum.UNLIMITED"
                  :text="$t('field.unlimited')"
                  @click="form.usageLimit = UsageLimitEnum.UNLIMITED"
                ></McRadio>
              </div>
            </a-form-item>
          </McCardHeader>

          <McCardHeader :title="$t('voucher.activeDate')" class="pb-4">
            <a-form-item
              class="!my-4"
              field="startAt"
              :label="$t('field.startDate')"
              :rules="[{ required: true, message: $t('field.startAtIsRequired') }]"
            >
              <a-date-picker
                :placeholder="$t('field.pleaseSelectStartDate')"
                class="!bg-transparent !rounded-md !border !border-[#D8DCE0]"
                :show-now-btn="false"
                format="YYYY-MM-DD"
                @change="(v) => onChangeStartOrEndDate(v, 'start')"
              >
                <template #prefix> <IconCalendar></IconCalendar> </template>
                <template #suffix-icon> <p></p></template>
              </a-date-picker>
            </a-form-item>

            <a-form-item
              class="!my-4"
              field="endAt"
              :label="$t('field.endDate')"
              :rules="[
                { required: true, message: $t('field.endAtIsRequired') },
                {
                  validator: (value: any, cb: any) => {
                    const endDate = dayjs(value)
                    const startDate = dayjs(form.startAt)
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
                @change="(v) => onChangeStartOrEndDate(v, 'end')"
              >
                <template #prefix> <IconCalendar></IconCalendar> </template>
                <template #suffix-icon> <p></p></template>
              </a-date-picker>
            </a-form-item>
          </McCardHeader>
        </div>

        <div class="w-[40%] sticky top-0 right-0">
          <McCardHeader :title="$t('voucher.summary')">
            <div class="py-2 text-left">
              <template v-if="form.name !== ''">
                <p class="text-[#111827] font-semibold mt-4">{{ form.name }}</p>
              </template>
              <p v-else class="text-[#AEAEAE] font-semibold">
                {{ $t('voucher.noDiscountCodeYet') }}
              </p>

              <p class="text-lg text-[#111827] mt-4">{{ $t('common.type') }}</p>
              <ul class="text-black text-opacity-70 ml-4 list-disc mt-2">
                <li class="mt-1">{{ $t('voucher.simpleDiscount') }}</li>
              </ul>
              <p class="text-lg text-[#111827] mt-4">{{ $t('common.detail') }}</p>
              <ul
                v-if="form.value || form.isNoMinPurchaseAmount || form.applyTo || form.usageLimit"
                class="text-black text-opacity-70 ml-4 list-disc mt-2"
              >
                <li class="mt-1" v-if="form.value">
                  {{ form.value + (form.valueType == DiscountEnum.PERCENTAGE ? '%' : '$') }}
                  {{ $t('voucher.detail1') }}
                </li>
                <li class="mt-1">
                  {{
                    form.isNoMinPurchaseAmount == 'NO'
                      ? $t('voucher.minPurchase') + (form?.minPurchaseAmount || 0) + '$'
                      : $t('voucher.noMinPurchase')
                  }}
                </li>
                <li class="mt-1" v-if="form.applyTo">
                  {{ $t(`common.` + form.applyTo?.toLowerCase()) }}
                </li>
                <li class="mt-1" v-if="form.usageLimit">
                  {{
                    form.usageLimit == UsageLimitEnum.ONE_PER_CUSTOMER
                      ? $t('field.limitToOneUser')
                      : form.usageLimit == UsageLimitEnum.LIMITED
                        ? $t('voucher.limitOf', {
                            amount: form.maxUseLimit
                          })
                        : $t('field.unlimited')
                  }}
                </li>
              </ul>
              <p v-else class="text-[#AEAEAE] font-semibold mt-2 mb-10">
                {{ $t('voucher.noDetailShow') }}
              </p>
              <p class="text-lg text-[#111827] mt-4">{{ $t('common.performance') }}</p>

              <p class="text-[#AEAEAE] font-semibold mt-2 mb-6">
                {{ $t('voucher.notActiveYet') }}
              </p>
            </div>
          </McCardHeader>
        </div>
      </div>
      <div class="w-full flex justify-end items-center gap-4 mt-6">
        <a-button
          type="outline"
          class="!border-[#D1D5DB] !text-[#374151] !rounded-md"
          @click="$router.replace('/product')"
        >
          {{ $t('button.cancel') }}
        </a-button>

        <a-button type="primary" class="!rounded-md" @click="onSave">
          {{ $t('button.save') }}
        </a-button>
      </div>
    </a-form>
  </div>

  <McBrowseProduct ref="browseProductRef" @on-choose-customer="onChooseCustomer"></McBrowseProduct>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import {
  ApplyToEnum,
  DiscountEnum,
  DiscountTypeEnum,
  IProductItemList,
  PublicModeEnum,
  PublicToEnum,
  UsageLimitEnum
} from '~/constants/common'
import { useDiscountStore } from '~/stores/discount'

const browseProductRef = ref(null) as any
const discountStore = useDiscountStore()
const form = reactive({
  productIds: [] as string[],
  name: '',
  description: ' ',
  type: DiscountTypeEnum.PRODUCT_DISCOUNT,
  value: null,
  valueType: '' as DiscountEnum | string,
  isNoMinPurchaseAmount: '' as '' | 'NO' | 'YES',
  minPurchaseAmount: null,
  applyTo: '' as ApplyToEnum | string,
  publishTo: '' as PublicToEnum | string,
  publishMode: '' as PublicModeEnum | string,
  maxUseLimit: null,
  usageLimit: '' as UsageLimitEnum.UNLIMITED | UsageLimitEnum.LIMITED | string,
  startAt: '',
  endAt: ''
})

const productChosen = ref<IProductItemList[]>([])
const rules = {
  value: [
    {
      validator: (value: any, cb: any) => {
        console.log(value)
        if (value == 0 || value == null) {
          cb('Value is required')
        } else {
          cb()
        }
      }
    }
  ]
}

const formRef = ref(null) as any

const onRemoveChosen = (id: string) => {
  productChosen.value = productChosen.value.filter((item) => item.product._id != id)
}

const onBrowseProduct = () => {
  const list = productChosen.value.map((item) => item.product._id)
  browseProductRef.value?.setCheckProduct(list)
  discountStore.showBrowseProduct = true
}

const onChooseCustomer = (list: any[]) => {
  productChosen.value = list
}

const onChangeStartOrEndDate = (v: any, type: 'start' | 'end') => {
  if (type == 'start') {
    form.startAt = v
  } else {
    form.endAt = v
  }
}

const onSave = async () => {
  formRef.value?.handleSubmit()
}

const onSubmit = () => {
  let idsPro = [] as string[]
  if (form.applyTo === ApplyToEnum.SPECIFIC) {
    idsPro = productChosen.value.map((item) => item.product._id)
  }
  form.productIds = idsPro
  discountStore.onCreateDiscount(form)
}

const onSubmitFail = () => {}
</script>

<style scoped></style>
