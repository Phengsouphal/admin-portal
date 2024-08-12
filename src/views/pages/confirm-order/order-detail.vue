<template>
  <div class="w-full h-full px-6 pt-5">
    <McTitle :title="''">
      <template #suffix>
        <div class="w-full flex justify-start items-center">
          <a-button type="text" class="!p-0">
            <div class="flex justify-center items-center">
              <IconArrowLeft></IconArrowLeft>
              <p class="text-black text-opacity-70 text-2xl font-semibold">
                {{ $t('button.detail') }}
              </p>
            </div>
          </a-button>
        </div>
      </template>
    </McTitle>
    <McCardHeader :title="''">
      <div class="w-full py-4">
        <div class="w-full flex justify-between items-start">
          <div class="">
            <p class="main-title">{{ $t('customer.profile') }}</p>
            <div class="flex justify-between items-center">
              <a-image
                width="56"
                height="56"
                :src="'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp'"
              />
              <div class="ml-4 flex flex-col justify-between items-start">
                <p class="text-black">Math Sarihas</p>
                <div class="flex justify-start items-center mt-1">
                  <IconStar></IconStar>
                  <span class="text-black ml-2">0.5</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <p class="main-title">{{ $t('order.order') }}</p>
            <p class="title">
              <span class="subTitle"> {{ $t('table.orderNumber') }}: </span>
              1020990394
            </p>
            <p class="title">
              <span class="subTitle"> {{ $t('table.orderDate') }}: </span>
              {{ dayjs().format('dd/MM/YYYY') }}
            </p>
            <p class="title">
              <span class="subTitle"> {{ $t('table.orderTime') }}: </span>
              {{ dayjs().format('hh:mm A') }}
            </p>
          </div>

          <div>
            <p class="main-title">{{ $t('table.shippingAddress') }}</p>
            <p class="title">
              <span class="subTitle"> {{ $t('order.receiverName') }}: </span>
              Math Sarihas
            </p>
            <p class="title">
              <span class="subTitle"> {{ $t('field.phoneNumber') }}: </span>
              +855 122 760 56
            </p>
            <p class="title">
              <span class="subTitle"> {{ $t('field.address') }}: </span>
              Aeon Mall Sensok, Phnom Penh, Cambodia
            </p>
          </div>
        </div>
        <div class="flex justify-start items-center my-4">
          <IconNote></IconNote>
          <p class="text-black text-opacity-70 font-medium ml-2">{{ $t('common.note') }}</p>
        </div>
        <p class="w-[45%] text-left text-black text-opacity-70 p-4 bg-[#F8F8F8] rounded-md">
          Please be careful with my product it’s so soft easy to broke thank you
        </p>

        <a-table
          class="mc-table mt-4"
          :pagination="false"
          :bordered="false"
          :columns="columns()"
          :data="data"
        >
          <template #quantity="{ record }"> {{ record.key }} </template>

          <template #product="{ record }">
            <McAvatar :text="record.name"></McAvatar>
          </template>
          <template #price="{ record }"> $ {{ record.price }} </template>
          <template #discount="{ record }"> {{ '45.00$' }} </template>

          <template #total="{ record }"> $ {{ record.price }} </template>
        </a-table>

        <div class="w-full h-[1px] bg-[#D9D9D9] my-4"></div>
        <p class="text-left text-black text-opacity-70">
          <span class="w-24 subTitle inline-block"> {{ $t('order.subTotal') }}</span>
          $60.00
        </p>

        <p class="text-left text-black text-opacity-70 mt-2">
          <span class="w-24 subTitle inline-block"> {{ $t('order.shippingFee') }}</span>
          $60.00
        </p>
        <p class="text-left text-black text-opacity-70 mt-2">
          <span class="w-24 subTitle inline-block"> {{ $t('field.discount') }}</span>
          -50%($30.00)
        </p>
        <p class="py-4 mt-4 text-left border-y-[1px] border-[#D9D9D9] text-danger font-semibold">
          <span class="text-black text-opacity-70 inline-block mr-6"> {{ $t('table.total') }}</span>
          $30.00
        </p>

        <div class="w-full flex justify-between items-center my-4 pt-2">
          <a-button type="text" class="!p-0" @click="showReceipt = true">
            <p class="font-semibold">{{ $t('button.viewReceipt') }}</p>
          </a-button>

          <div class="flex justify-center items-center gap-x-4">
            <a-button type="primary" status="danger" class="">
              <p>{{ $t('status.reject') }}</p>
            </a-button>
            <a-button type="primary" class="" @click="">
              <p>{{ $t('button.confirm') }}</p>
            </a-button>
          </div>
        </div>
      </div>
    </McCardHeader>
  </div>

  <!-- Receipt Detail -->
  <a-modal
    :visible="showReceipt"
    :closable="false"
    :footer="false"
    title=""
    body-class="!p-0 !bg-transparent"
    modal-class=" !bg-transparent"
  >
    <div class="w-full flex flex-col justify-center items-center bg-white rounded-lg">
      <div
        class="w-full flex justify-between items-center py-4 px-4 border-b border-[#D9D9D9] rounded-t-lg"
      >
        <p class="text-[#111827] font-medium text-base">{{ $t('order.orderReceipt') }}</p>
        <a-button type="text" class="!p-0 !h-fit" @click="showReceipt = false">
          <IconCross></IconCross>
        </a-button>
      </div>
      <div class="w-full flex flex-col justify-center items-center">
        <p class="mt-4">{{ $t('order.order') }} #1232234983</p>
        <p class="mt-4">{{ $t('order.orderOn') }} {{ dayjs().format('DD/MM/YYYY hh:mm A') }}</p>

        <div class="w-full flex justify-start items-start px-4 mt-4">
          <IconReceiptStore></IconReceiptStore>

          <div class="ml-2">
            <p class="text-[#AEAEAE] font-medium">{{ $t('order.orderFrom') }}</p>
            <p class="text-main mt-1">Good Product Shop</p>
          </div>
        </div>
        <div class="w-full flex justify-start items-start px-4 my-4">
          <IconPin></IconPin>
          <div class="ml-2">
            <p class="text-[#AEAEAE] font-medium">{{ $t('order.receivingAddress') }}</p>
            <p class="text-main mt-1">Aeon Mall Sensok, Phnom Penh, Cambodia</p>
          </div>
        </div>
        <div
          class="w-full flex justify-between items-center px-4 mt-2"
          v-for="(item, index) in 4"
          :key="index"
        >
          <p>
            <span class="inline-block mr-6"> x1 </span>

            Red color #01
          </p>
          <p>$20.00</p>
        </div>

        <div class="w-full h-[1px] my-4 bg-[#D9D9D9]"></div>
        <div class="w-full px-4">
          <div class="w-full flex justify-between items-center">
            <p class="summary-title">{{ $t('order.subTotal') }}:</p>
            <p>$60.00</p>
          </div>
          <div class="w-full flex justify-between items-center">
            <p class="summary-title">{{ $t('order.shippingFee') }}:</p>
            <p>$60.00</p>
          </div>
          <div class="w-full flex justify-between items-center">
            <p class="summary-title">{{ $t('promotion.discount') }}:</p>
            <p>$60.00</p>
          </div>
          <div class="w-full flex justify-between items-center">
            <p class="summary-title !font-semibold">{{ $t('common.paid') }}:</p>
            <p class="font-semibold text-danger">$60.00</p>
          </div>
        </div>

        <div class="w-full h-[1px] my-4 bg-[#D9D9D9]"></div>
        <div class="w-full px-4 text-left">
          <p class="summary-title !font-semibold">{{ $t('common.payWith') }}</p>
          <div class="w-full flex justify-between items-center">
            <p class="summary-title">{{ $t('common.account') }}</p>
            <p>$60.00</p>
          </div>
        </div>
      </div>

      <div class="w-full flex justify-end items-center p-4">
        <a-button type="primary" status="danger" class="!rounded-md">
          <p class="px-4">{{ $t('button.print') }}</p>
        </a-button>
      </div>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { Message } from '@arco-design/web-vue'
import dayjs from 'dayjs'
import RouteName from '~/constants/router-name'

const { t } = useI18n()
const router = useRouter()

const columns = () => [
  {
    title: t('product.title'),
    slotName: 'product'
  },
  {
    title: t('product.quantity'),
    slotName: 'quantity'
  },
  {
    title: t('table.price'),
    slotName: 'price'
  },
  {
    title: t('promotion.discount'),
    slotName: 'discount'
  },
  {
    title: t('table.total'),
    slotName: 'total'
  }
]

const data = reactive([
  {
    key: '1',
    name: 'Jane Doe',
    price: 23000,
    status: 'success',

    email: 'jane.doe@example.com'
  },
  {
    key: '2',
    name: 'Alisa Ross',
    price: 25000,
    status: 'pending',
    email: 'alisa.ross@example.com'
  },
  {
    key: '3',
    name: 'Kevin Sandra',
    price: 22000,
    status: 'reject',

    email: 'kevin.sandra@example.com'
  },
  {
    key: '4',
    name: 'Ed Hellen',
    price: 17000,
    status: 'pending',

    email: 'ed.hellen@example.com'
  },
  {
    key: '5',
    name: 'William Smith',
    price: 27000,
    status: 'success',

    email: 'william.smith@example.com'
  }
])

const showReceipt = ref(false)

const onCreateDiscount = () => {
  Message.info({ content: `Create Product`, showIcon: true })
  router.push(`/${RouteName.ADD_PRODUCT}`)
}
</script>

<style scoped>
.mc-table :deep(.arco-table-th) {
  background-color: transparent;
  @apply py-2 border-y-[1px] border-[#AEAEAE];
}

.main-title {
  @apply text-left text-black text-opacity-70 font-semibold mb-4;
}

.subTitle {
  @apply text-[#AEAEAE] text-base;
}

.title {
  @apply text-black text-opacity-70 font-medium text-left mb-2;
}

.summary-title {
  @apply text-black text-opacity-70 font-medium text-left mb-2;
}
</style>
