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
            {{ $t('voucher.voucherDetail') }}
          </p>
        </div>
      </template>
    </McTitle>

    <McCardHeader :title="$t('voucher.voucherInfo')" contentClass="!p-0 !overflow-hidden">
      <div class="w-full flex px-6 justify-between items-center rounded-b-2xl overflow-hidden">
        <div class="w-1/2">
          <p class="mc-label">
            {{ $t('voucher.voucherName') }}: <span class="value">{{ voucher?.name }}</span>
          </p>
          <p class="mc-label">
            {{ $t('voucher.discountValue') }}:
            <span class="value">$ {{ voucher?.discount?.toFixed(2) }}</span>
          </p>
          <p class="mc-label">
            {{ $t('voucher.activeDate') }}:
            <span class="value">{{
              dayjs(voucher?.startAt)?.format('DD/MM/YY') +
              ' - ' +
              dayjs(voucher?.endAt)?.format('DD/MM/YY')
            }}</span>
          </p>
        </div>
        <div class="w-1/2">
          <p class="mc-label">
            {{ $t('voucher.minimumPurchase') }}:
            <span class="value">{{ voucher?.minPurchaseAmount }}</span>
          </p>
          <p class="mc-label">
            {{ $t('voucher.maximunDiscount') }}:
            <span class="value">{{
              voucher?.usageLimit === UsageLimitEnum.LIMITED
                ? $t('common.limited')
                : voucher?.usageLimit === UsageLimitEnum.UNLIMITED
                  ? $t('common.unlimited')
                  : $t('common.oneUse')
            }}</span>
          </p>
          <p class="mc-label">
            {{ $t('voucher.customer') }}:
            <span class="value" v-for="(item, index) in PublicToEnum" :key="index">{{
              item == voucher?.publishTo ? $t(`common.${item}`) : ''
            }}</span>
          </p>
        </div>
      </div>
    </McCardHeader>

    <McCardHeader :title="''">
      <div class="w-full pb-4">
        <div class="w-full flex justify-between items-center py-3">
          <p class="text-lg text-[#111827] font-semibold py-3">
            {{ $t('common.customers') }}
          </p>
          <div class="w-[40%]">
            <FilterInputField @on-enter="" filterHeader="Filter Your Product">
              <template #filterContent> </template>
            </FilterInputField>
          </div>
        </div>

        <a-table class="mc-table" :bordered="false" :columns="columns()" :data="list">
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

          <template #action="{ record }"> </template>

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
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { IVoucherListData, PublicToEnum, UsageLimitEnum } from '~/constants/common'
import { useVoucherStore } from '~/stores/voucher'

const { t } = useI18n()
const route = useRoute()
const voucherStore = useVoucherStore()

const voucher = ref<IVoucherListData | null>(null)

const columns = () => [
  {
    title: t('table.no'),
    slotName: 'no'
  },
  {
    title: t('table.customer'),
    slotName: 'customers'
  },
  {
    title: t('table.orderNumber'),
    slotName: 'orderNumber'
  },
  {
    title: t('table.orderDate'),
    slotName: 'orderDate'
  },
  {
    title: t('table.amountSpent'),
    slotName: 'total'
  },
  {
    title: t('table.totalAmount'),
    slotName: 'totalAmount'
  }
]

const list = ref([1])

onMounted(async () => {
  const id = route.params.id as string
  const res = await voucherStore.getVoucherById(id)
  if (res) {
    voucher.value = res?.voucher
  }
})
</script>

<style scoped>
.mc-label {
  @apply text-[#AEAEAE] text-left font-medium text-base my-3;
}

.value {
  @apply text-black text-opacity-70 font-semibold;
}

.mc-table :deep(.arco-table-th) {
  /* background-color: transparent;
  border-bottom: 1px solid var(--color-neutral-3); */
  @apply bg-main text-white font-semibold;
}
</style>
