<template>
  <div class="w-full h-full px-6 pt-5">
    <!-- <a-switch v-model="test"></a-switch> -->
    <!-- <div class="w-full" v-if="test">
      <div class="flex flex-col justify-start items-start">
        <p class="text-black text-2xl font-semibold">Get ready to sell</p>
        <p class="text-base text-[#AEAEAE] mt-1">
          Here’s a guide to get started. As your business grows, you’ll get fresh tips and insights
          here.
        </p>
      </div>

      <McCardHeader title="">
        <div class="w-full pt-4 pb-16 flex flex-col justify-start items-start">
          <p class="text-lg font-medium text-[#111827]">Setup guide</p>
          <p class="text-base text-[#6B7280] mb-4">
            Use this personalized guide to get your store up and running
          </p>

          <a-button
            type="text"
            v-for="(item, index) in 3"
            :key="index"
            class="!w-[50%] !h-fit !p-0"
          >
            <div
              class="w-full py-4 flex justify-between items-start border-t border-[#E5E7EB]"
              :class="[item == 3 ? 'border-b' : '']"
            >
              <IconAddProduct class="w-10 flex-shrink-0" v-if="item == 1"></IconAddProduct>
              <IconNameStore class="w-10 flex-shrink-0" v-if="item == 2"></IconNameStore>
              <IconPayment class="w-10 flex-shrink-0" v-if="item == 3"></IconPayment>
              <div class="flex flex-col text-left ml-4">
                <p class="text-sm font-medium text-[#111827]">Add your first product</p>
                <p class="text-sm text-[#6B7280] text-wrap">
                  Write a description, add photos, and set pricing for the products you plan to
                  sell.
                </p>
              </div>
              <div class="h-full flex-shrink-0 justify-self-center self-center ml-1">
                <IconChevronLeft></IconChevronLeft>
              </div>
            </div>
          </a-button>
        </div>
      </McCardHeader>
    </div> -->
    <div class="w-full">
      <McTitle :title="$t('common.overview')"> </McTitle>
      <McCardHeader>
        <div class="w-full py-4">
          <a-row class="grid-demo" :gutter="24">
            <a-col :span="8">
              <a-button type="text" class="!w-full !h-fit !p-0">
                <div class="overview">
                  <div>
                    <p class="overview-sub-title">{{ $t('common.totalSales') }}</p>
                    <p class="overview-title">$ 71,897</p>
                  </div>
                  <IconOverview1></IconOverview1>
                </div>
              </a-button>
            </a-col>
            <a-col :span="8">
              <a-button type="text" class="!w-full !h-fit !p-0">
                <div class="overview">
                  <div>
                    <p class="overview-sub-title">{{ $t('common.totalSold') }}</p>
                    <p class="overview-title">797</p>
                  </div>
                  <IconOverview2></IconOverview2>
                </div>
              </a-button>
            </a-col>
            <a-col :span="8">
              <a-button type="text" class="!w-full !h-fit !p-0">
                <div class="overview">
                  <div>
                    <p class="overview-sub-title">{{ $t('common.orderItem') }}</p>
                    <p class="overview-title">100</p>
                  </div>
                  <IconOverview3></IconOverview3>
                </div>
              </a-button>
            </a-col>
          </a-row>
        </div>
      </McCardHeader>
      <div class="w-full h-3"></div>
      <McTitle :title="$t('common.recentOrder')">
        <template #suffix>
          <a-button type="text" class="!w-hit !h-fit !p-0">
            <div class="text-sm text-[#AEAEAE] font-medium">{{ $t('button.goToOrderPage') }} →</div>
          </a-button>
        </template>
      </McTitle>

      <McCardHeader>
        <div class="w-full py-2">
          <a-table
            class="mc-table"
            :pagination="false"
            :bordered="false"
            :columns="columns()"
            :data="data"
          >
            <template #itemName="{ record }">
              <div class="flex justify-start items-center">
                <a-image
                  width="56"
                  height="56"
                  src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp"
                />
                <p class="ml-2">{{ record.name }}</p>
              </div>
            </template>

            <template #orderDate="{}">
              {{ dayjs().format('MMMM DD, YYYY') }}
            </template>

            <template #status="{ record }">
              <McStatus :status="record.status" :text="record.status"></McStatus>
            </template>
          </a-table>
        </div>
      </McCardHeader>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'

const { t } = useI18n()

const columns = () => [
  {
    title: t('table.itemName'),
    slotName: 'itemName'
  },
  {
    title: t('table.quantity'),
    dataIndex: 'salary'
  },
  {
    title: t('table.orderDate'),
    slotName: 'orderDate'
  },
  {
    title: t('table.status'),
    slotName: 'status'
  }
]

const data = reactive([
  {
    key: '1',
    name: 'Jane Doe',
    salary: 23000,
    status: 'success',

    email: 'jane.doe@example.com'
  },
  {
    key: '2',
    name: 'Alisa Ross',
    salary: 25000,
    status: 'pending',
    email: 'alisa.ross@example.com'
  },
  {
    key: '3',
    name: 'Kevin Sandra',
    salary: 22000,
    status: 'reject',

    email: 'kevin.sandra@example.com'
  },
  {
    key: '4',
    name: 'Ed Hellen',
    salary: 17000,
    status: 'pending',

    email: 'ed.hellen@example.com'
  },
  {
    key: '5',
    name: 'William Smith',
    salary: 27000,
    status: 'success',

    email: 'william.smith@example.com'
  }
])
</script>

<style scoped>
.mc-table :deep(.arco-table-th) {
  background-color: transparent;
}
.overview {
  @apply w-full p-4 rounded-lg flex justify-between items-center bg-[#EEEEEE];
  box-shadow: 0px 1px 2px 0px #0000000f;
  box-shadow: 0px 1px 3px 0px #0000001a;
}
.overview-title {
  @apply text-[30px] text-left font-semibold text-[#111827];
}

.overview-sub-title {
  @apply text-sm text-left font-medium text-[#6B7280];
}
</style>
