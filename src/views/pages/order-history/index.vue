<template>
  <div class="w-full h-full px-6 pt-5">
    <McTitle :title="$t('orderHistory.title')"> </McTitle>
    <McCard
      v-if="list.length === 0 && !loading"
      :hasBtnAdd="false"
      title="No Order History"
      subTitle="You haven’t gotten any orders yet"
    >
      <template #icon>
        <IconConfirmOrderEmpty></IconConfirmOrderEmpty>
      </template>
    </McCard>

    <McCardHeader v-else>
      <div class="w-full">
        <div class="w-full py-4 flex justify-between items-center">
          <p class="text-lg font-medium text-[#111827]">
            {{ $t('order.allOrder') }}({{ list.length }})
          </p>

          <div class="w-[40%]">
            <FilterInputField @handle-select=""></FilterInputField>
          </div>
        </div>
        <div v-if="!loading" class="w-full py-2">
          <a-table
            v-if="!loading"
            class="mc-table"
            :bordered="false"
            :columns="columns()"
            :data="list"
            :pagination="{
              total: orderStore.orderMeta?.totalItems,
              current: orderStore.orderMeta?.currentPage
            }"
            @page-change="onPageChange"
          >
            <template #customer="{ record }">
              <div class="flex justify-start items-center">
                <a-image
                  width="56"
                  height="56"
                  fit="cover"
                  class="flex-shrink-0"
                  :src="record?.order?.customer?.avatarUrl"
                />
                <p class="ml-2 line-clamp-2">{{ record.order.customer.fullName }}</p>
              </div>
            </template>

            <template #orderNumber="{ record }">
              {{ record.order.id }}
            </template>

            <template #total="{ record }"> ${{ record.order.total }} </template>

            <template #status="{ record }">
              <McStatus :text="displayStatus(record.order.status)"></McStatus>
            </template>

            <template #orderDate="{ record }">
              {{ dayjs(record.order.createdAt).format('DD/MM/YYYY') }}
            </template>
            <template #orderTime="{ record }">
              {{ dayjs(record.order.createdAt).format('hh:mm A') }}
            </template>

            <template #action="{ record }">
              <div class="flex justify-start items-center gap-x-2">
                <a-button type="text" class="!px-0" @click="$router.push('/order-detail')">
                  <p class="text-[#007BE0] font-medium text-base">{{ $t('button.detail') }}</p>
                </a-button>
              </div>
            </template>

            <template #pagination-left>
              <div class="w-full text-black text-left">
                {{
                  $t('table.showResult', {
                    total: orderStore.orderMeta?.totalItems,
                    from: 1,
                    to: orderStore.orderMeta?.itemCount
                  })
                }}
              </div>
            </template>
          </a-table>

          <div v-else class="h-96 flex justify-center items-center">
            <a-spin :size="32" />
          </div>
        </div>
        <McLoading v-else> </McLoading>
      </div>
    </McCardHeader>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { useOrderStore } from '~/stores/order'

const { t } = useI18n()
const orderStore = useOrderStore()
const showCfmOrder = ref(false)
const loading = ref(false)
const list = computed(() => orderStore.orderList)

const columns = () => [
  {
    title: t('table.orderNumber'),
    slotName: 'orderNumber',
    width: 140
  },
  {
    title: t('table.customer'),
    slotName: 'customer',
    width: 200
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
    title: t('table.status'),
    slotName: 'status'
  },
  {
    title: t('table.action'),
    slotName: 'action'
  }
]

const displayStatus = (status: any) => {
  const data = {
    PENDING: 'Pending',
    CONFIRMED: 'Confirmed',
    REJECTED: 'Reject',
    CANCELED: 'Cancelled',
    COMPLETED: 'Completed',
    FAILED: 'Failed'
  }
  return data[status]
}

async function onPageChange(v: any) {
  console.log(v)
  orderStore.orderQueryData.page = v
  loading.value = true
  await fetchData()
  loading.value = false
}

async function fetchData() {
  await orderStore.getOrderList()
}

onMounted(async () => {
  loading.value = true
  await fetchData()
  loading.value = false
})
</script>

<style scoped></style>
