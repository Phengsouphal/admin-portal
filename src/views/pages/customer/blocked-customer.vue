<template>
  <div class="w-full h-full px-6 pt-5">
    <McTitle :title="$t('customer.blockCustomer')"> </McTitle>
    <McCard
      v-if="list.length === 0 && !loading"
      :hasBtnAdd="false"
      :title="$t('customer.noBlockCustomer')"
      :subTitle="$t('customer.youDontHaveBlockCustomer')"
    >
      <template #icon>
        <IconCustomerBlockEmpty></IconCustomerBlockEmpty>
      </template>
    </McCard>

    <McCardHeader v-else>
      <div class="w-full">
        <div class="w-full py-4 flex justify-between items-center">
          <p class="text-lg font-medium text-[#111827]">
            {{ $t('customer.allCustomer') }}({{ 4 }})
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
          >
            <template #name="{ record }">
              <div class="flex justify-start items-center">
                <a-image
                  width="56"
                  height="56"
                  fit="cover"
                  class="flex-shrink-0"
                  :src="record?.customer?.avatarUrl"
                />
                <p class="ml-2 line-clamp-2">{{ record?.customer?.fullName }}</p>
              </div>
            </template>

            <template #id="{ record }">
              {{ record.id }}
            </template>

            <template #contact="{ record }">
              {{ record.contact }}
            </template>

            <template #date="{ record }">
              {{ dayjs().format('DD/MM/YYYY') }}
            </template>

            <template #action="{ record }">
              <div class="flex justify-start items-center gap-x-2">
                <a-button type="text" class="!px-0" @click="handleSelect('Edit', record)">
                  <p class="text-[#007BE0] font-medium text-base">{{ $t('button.unblock') }}</p>
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

          <div v-else class="h-96 flex justify-center items-center">
            <a-spin :size="32" />
          </div>
        </div>
        <McLoading v-else></McLoading>
      </div>
    </McCardHeader>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { useCustomerStore } from '~/stores/customer'

const { t } = useI18n()

const customerStore = useCustomerStore()
const list = computed(() => customerStore.customerList)

const loading = ref(false)

const columns = () => [
  {
    title: t('table.customerId'),
    slotName: 'id',
    width: 180
  },
  {
    title: t('table.name'),
    slotName: 'name',
    width: 240
  },
  {
    title: t('table.joinDate'),
    slotName: 'date'
  },
  {
    title: t('table.contact'),
    slotName: 'contact'
  },
  {
    title: t('table.action'),
    slotName: 'action'
  }
]

const fetchData = async () => {
  loading.value = true
  await customerStore.getCustomerList(true)
  loading.value = false
}

onMounted(async () => {
  fetchData()
})
</script>

<style scoped></style>
