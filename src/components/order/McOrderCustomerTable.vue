<template>
  <McCardHeader title="Customer Ordered">
    <div class="w-full py-4">
      <a-table class="mc-table" :bordered="false" :columns="columns()" :data="data">
        <template #orderNumber="{}">
          {{ dayjs().unix() }}
        </template>
        <template #customer="{ record }">
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
        <template #orderTime="{}">
          {{ dayjs().format('hh:mm a') }}
        </template>
        <template #total="{ record }"> $ {{ record.key }} </template>

        <template #status="{ record }">
          <McStatus :status="record.status" :text="record.status"></McStatus>
        </template>

        <template #action="{ record }">
          <a-button type="text">
            <p class="text-base text-main">{{ $t('button.detail') }}</p>
          </a-button>
        </template>

        <template #pagination-left>
          <div class="w-full text-black text-left">
            {{
              $t('table.showResult', {
                total: 1,
                from: 1,
                to: 1
              })
            }}
          </div>
        </template>
      </a-table>
    </div>
  </McCardHeader>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'

const { t } = useI18n()
const columns = () => [
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
    title: t('table.status'),
    slotName: 'status'
  },
  {
    title: t('table.action'),
    slotName: 'action'
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

.mc-table :deep(tr:last-child td) {
  border-bottom: none;
}
</style>
