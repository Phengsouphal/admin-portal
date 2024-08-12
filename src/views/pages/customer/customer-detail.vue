<template>
  <div class="w-full h-full px-6 pt-5">
    <McTitle :title="''">
      <template #suffix>
        <div class="w-full flex justify-start items-center">
          <a-button type="text" class="!p-0" @click="$router.go(-1)">
            <div class="flex justify-center items-center">
              <IconArrowLeft></IconArrowLeft>
              <p class="text-black text-opacity-70 text-2xl font-semibold">
                {{ $t('customer.customerDetail') }}
              </p>
            </div>
          </a-button>
        </div>
      </template>
    </McTitle>

    <McCardHeader :title="''">
      <div class="w-full py-4 text-black">
        <div class="w-full flex justify-between items-end">
          <div class="text-left">
            <p class="text-xl font-semibold text-black text-opacity-70 my-3">
              {{ $t('customer.profile') }}
            </p>
            <div class="flex justify-center items-start">
              <a-image
                width="56"
                height="56"
                class="!flex-shrink-0"
                :src="detail?.customer?.avatarUrl"
              />
              <div class="ml-3 text-lg">
                <p class="text-black text-opacity-70">
                  <span class="text-[#AEAEAE] text-base">{{ $t('table.name') }}:</span>
                  {{ detail?.customer.fullName }}
                </p>
                <p class="mt-4 text-black text-opacity-70">
                  <span class="text-[#AEAEAE] text-base"> {{ $t('table.customerId') }}:</span>
                  {{ detail?.customer.id }}
                </p>
                <p class="mt-4 text-black text-opacity-70">
                  <span class="text-[#AEAEAE] text-base"> {{ $t('table.joinDate') }}:</span>
                  {{ dayjs(detail?.customer?.createdAt).format('DD/MM/YYYY') }}
                </p>
              </div>
            </div>
          </div>

          <a-button
            type="primary"
            class="!mt-4 !h-[38px] !rounded-md !bg-danger"
            @click="showBlockModal = true"
          >
            <template #icon>
              <IconBlock></IconBlock>
            </template>
            <!-- Use the default slot to avoid extra spaces -->
            <template #default>{{ $t('button.blockCustomer') }}</template>
          </a-button>
        </div>
        <div class="w-full mt-6">
          <a-table
            v-if="!loading"
            class="mc-table"
            :bordered="false"
            :columns="columns()"
            :data="list"
          >
            <template #orderNumber="{ record }">
              <p class="ml-2 line-clamp-2">{{ 10299343 }}</p>
            </template>

            <template #total="{ record }"> ${{ 100 }} </template>

            <template #status="{ record }">
              <McStatus text="success"></McStatus>
            </template>

            <template #orderDate="{ record }">
              {{ dayjs().format('DD/MM/YYYY') }}
            </template>

            <template #action="{ record }">
              <div class="flex justify-start items-center gap-x-2">
                <a-button type="text" class="!px-0" @click="handleSelect('Edit', record)">
                  <p class="text-[#007BE0] font-medium text-base">{{ $t('button.detail') }}</p>
                </a-button>
              </div>
            </template>

            <template #pagination-left>
              <div class="w-full text-black text-left">
                {{
                  $t('table.showResult', {
                    total: 110,
                    from: 1,
                    to: 2
                  })
                }}
              </div>
            </template>
          </a-table>
        </div>
      </div>
    </McCardHeader>
    <McCardHeader :title="'Customer ordered'">
      <div class="w-full flex justify-start items-center py-4 text-black gap-x-6">
        <div
          class="w-[30%] flex justify-between items-center border-[0.5px] border-[#0083B050] rounded-xl p-4"
        >
          <div class="text-left">
            <p class="text-base text-black text-opacity-70">{{ $t('customer.itemOrdered') }}</p>
            <p class="text-[#3A3A3A] text-3xl font-semibold">{{ detail?.orderCount }}</p>
          </div>
          <IconOrdered></IconOrdered>
        </div>
        <div
          class="w-[30%] flex justify-between items-center border-[0.5px] border-[#0083B050] rounded-xl p-4"
        >
          <div class="text-left">
            <p class="text-base text-black text-opacity-70">{{ $t('customer.amountSpent') }}</p>
            <p class="text-[#3A3A3A] text-3xl font-semibold">${{ detail?.orderCount }}</p>
          </div>
          <IconOrderSold></IconOrderSold>
        </div>
      </div>
    </McCardHeader>
  </div>

  <McDeleteModal
    title="Block customer"
    sub-title="The customer will be unable to search or buy any product from your store"
    v-model:show="showBlockModal"
    :confirm-btn-texts="$t('button.block')"
    @on-cancel="showBlockModal = false"
    @on-confirm="onConfirmBlock"
  ></McDeleteModal>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { ICustomerListData } from '~/constants/common'
import { useCustomerStore } from '~/stores/customer'

const route = useRoute()
const customerStore = useCustomerStore()
const { t } = useI18n()

const detail = ref<ICustomerListData | null>(null)

const showBlockModal = ref(false)
const list = ref([
  {
    id: '00001',
    name: 'Math Sarihas',
    logo: 'https://newprofilepic.photo-cdn.net//assets/images/article/profile.jpg?90af0c8',
    contact: '+855 93840334'
  },
  {
    id: '00002',
    name: 'Hong Molika...',
    logo: 'https://newprofilepic.photo-cdn.net//assets/images/article/profile.jpg?90af0c8',
    contact: '+855 93840334'
  }
])
const loading = ref(false)

const columns = () => [
  {
    title: t('table.orderNumber'),
    slotName: 'orderNumber',
    width: 180
  },
  {
    title: t('table.orderDate'),
    slotName: 'orderDate',
    width: 240
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

const onConfirmBlock = async () => {
  const res = await customerStore.onBanCustomer(detail.value?.customer._id)
}

onMounted(async () => {
  const id = route.params.id as string
  const res = await customerStore.getCustomerById(id)
  if (res) {
    detail.value = res
  }
  console.log(res)
})
</script>

<style scoped>
.mc-table :deep(.arco-table-th) {
  background-color: transparent;
  height: 50px;
  border-top: 1px solid var(--color-neutral-3);
  border-bottom: 1px solid var(--color-neutral-3);
}
</style>
