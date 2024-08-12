<template>
  <div class="w-full h-full px-6 pt-5">
    <McTitle :title="$t('confirmOrder.title')"> </McTitle>
    <McCard
      v-if="list.length === 0 && !loading"
      :hasBtnAdd="false"
      :title="$t('order.noOrder')"
      :subTitle="$t('order.youHaveNotGottenAnyOrdersYet')"
    >
      <template #icon>
        <IconConfirmOrderEmpty></IconConfirmOrderEmpty>
      </template>
    </McCard>

    <McCardHeader v-else>
      <div class="w-full">
        <div class="w-full py-4 flex justify-between items-center">
          <p class="text-lg font-medium text-[#111827]">
            {{ $t('order.allOrder') }} ({{ list.length }})
          </p>

          <div class="w-[40%]">
            <FilterInputField @handle-select="onHandleSelect"></FilterInputField>
          </div>
        </div>
        <div class="w-full py-2" v-if="!loading">
          <a-table
            class="mc-table"
            :bordered="false"
            :columns="columns"
            :data="list"
            :pagination="{
              total: orderStore.comingMeta?.totalItems,
              current: orderStore.comingMeta?.currentPage
            }"
            @page-change="onPageChange"
          >
            <template #orderNumber="{ record }"> {{ record.order.id }} </template>

            <template #customer="{ record }">
              <McAvatar
                :src="record?.order?.customer?.avatarUrl"
                :text="record?.order?.customer?.fullName"
              ></McAvatar>
            </template>
            <template #orderDate="{ record }">
              {{ dayjs(record.order.createdAt).format('DD/MM/YYYY') }}
            </template>
            <template #orderTime="{ record }">
              {{ dayjs(record.order.createdAt).format('hh:mm a') }}
            </template>

            <template #total="{ record }"> $ {{ record.order.total }} </template>

            <template #action="{ record }">
              <div class="flex justify-start items-center gap-x-4">
                <a-button type="text" class="!p-0">
                  <p class="text-black text-opacity-70 font-medium text-sm">
                    {{ $t('button.detail') }}
                  </p>
                </a-button>
                <a-button type="text" class="!p-0" @click="onShowConfirm(record?.order._id)">
                  <p class="text-[#007BE0] font-medium text-sm">{{ $t('button.confirm') }}</p>
                </a-button>
                <a-button type="text" class="!p-0">
                  <p class="text-[#E23618] font-medium text-sm">{{ $t('status.reject') }}</p>
                </a-button>
              </div>
            </template>

            <template #pagination-left>
              <div class="w-full text-black text-left">
                {{
                  $t('table.showResult', {
                    total: orderStore.comingMeta?.totalItems,
                    from: 1,
                    to: orderStore.comingMeta?.itemCount
                  })
                }}
              </div>
            </template>
          </a-table>
        </div>
        <McLoading v-else> </McLoading>
      </div>
    </McCardHeader>
  </div>

  <!-- Coming Order-->
  <a-modal
    :visible="showCfmOrder"
    :closable="false"
    :footer="false"
    title=""
    body-class="!p-0 !bg-transparent"
    modal-class="!w-[50%] !bg-transparent !-mt-20"
  >
    <div class="w-full flex flex-col justify-center items-center bg-white rounded-lg">
      <div
        class="w-full flex justify-between items-center py-4 px-4 border-b border-[#D9D9D9] rounded-t-lg"
      >
        <p class="text-[#111827] font-medium text-base">{{ $t('order.orderReceipt') }}</p>
        <a-button type="text" class="!p-0 !h-fit" @click="showCfmOrder = false">
          <IconCross></IconCross>
        </a-button>
      </div>

      <div class="w-full flex justify-between items-start my-5 px-4">
        <div>
          <p class="mb-3">{{ $t('table.customer') }}</p>
          <McAvatar text="Math Sarihas"></McAvatar>
        </div>
        <div>
          <p class="mb-3">{{ $t('product.products') }}</p>
          <McAvatar text="Red Color #01...(2 more)"></McAvatar>
        </div>
        <div class="h-full">
          <p class="mb-3">{{ $t('table.total') }}</p>
          <div class="h-[56px] flex justify-center items-center">
            <p>$ 50.00</p>
          </div>
        </div>
      </div>

      <div class="w-full flex justify-between items-center p-4">
        <a-button type="text" class="!p-0 !rounded-md">
          <p class="font-semibold underline">{{ $t('button.viewDetail') }}</p>
        </a-button>

        <div class="flex justify-center items-center gap-x-4">
          <a-button type="primary" status="danger" class="!rounded-md">
            <p class="">{{ $t('status.reject') }}</p>
          </a-button>
          <a-button type="primary" class="!rounded-md">
            <p class="">{{ $t('button.confirm') }}</p>
          </a-button>
        </div>
      </div>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { useOrderStore } from '~/stores/order'

const { t } = useI18n()
const orderStore = useOrderStore()
const showCfmOrder = ref(false)
const loading = ref(false)
const list = computed(() => orderStore.orderComingList)

const columns = [
  {
    title: t('table.orderNumber'),
    slotName: 'orderNumber'
  },
  {
    title: t('table.customer'),
    slotName: 'customer'
  },
  {
    title: t('table.orderDate'),
    slotName: 'orderDate'
  },
  {
    title: t('table.orderTime'),
    slotName: 'orderTime'
  },
  {
    title: t('table.total'),
    slotName: 'total'
  },
  {
    title: t('table.action'),
    slotName: 'action'
  }
]

const onHandleSelect = (v: any) => {
  console.log(v)
}

const onShowConfirm = (id: string) => {
  showCfmOrder.value = true
  orderStore.onApproveOrder(id)
}

async function onPageChange(v: any) {
  console.log(v)
  orderStore.comingQueryData.page = v
  loading.value = true
  await fetchData()
  loading.value = false
}

async function fetchData() {
  await orderStore.getComingOrderList()
}

onMounted(async () => {
  loading.value = true

  await fetchData()
  loading.value = false
})
</script>

<style scoped>
.mc-table :deep(.arco-table-th) {
  background-color: transparent;
  border-bottom: 1px solid var(--color-neutral-3);
  @apply py-2;
}
</style>
