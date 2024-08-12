<template>
  <a-modal
    v-model:visible="voucherStore.showBrowseCustomer"
    :footer="false"
    :closable="false"
    modalClass="!rounded-lg !w-[70%] !h-[70%]"
    bodyClass="!p-0 !h-full"
    @open="onOpen"
  >
    <div class="w-full h-full flex flex-col justify-between items-center">
      <div class="w-full">
        <div
          class="w-full h-14 px-6 flex justify-between items-center rounded-t-2xl border-b border-[#D9D9D9]"
        >
          <p class="text-[#111827] font-semibold text-base">{{ 'Update Full Name' }}</p>
          <div class="flex justify-end items-center">
            <InputField
              v-model="search"
              placeholder="search customer"
              :max-length="75"
              class="!mr-12"
            >
              <template #prefix>
                <div
                  class="px-2 bg-transparent h-full flex justify-center items-center rounded-tr-md rounded-br-md"
                >
                  <IconSearch></IconSearch>
                </div>
              </template>
            </InputField>
            <a-button
              type="text"
              class="!p-0 !h-fit"
              @click="voucherStore.showBrowseCustomer = false"
            >
              <IconCross></IconCross>
            </a-button>
          </div>
        </div>
        <div v-if="loading" class="w-full flex justify-center items-center pt-8">
          <a-spin :size="32" />
        </div>
        <div class="w-full h-full p-6" v-if="!loading">
          <div
            class="flex justify-between items-center"
            v-for="(item, index) in customerList"
            :key="index"
          >
            <div
              class="cursor-pointer flex justify-start items-center gap-x-4"
              @click="onCheckCustomer(item._id)"
            >
              <IconCustomerCheck v-if="checkCustomer.includes(item._id)"></IconCustomerCheck>
              <IconCustomerUnCheck v-else></IconCustomerUnCheck>
              <a-image
                width="40"
                height="40"
                class="!flex-shrink-0 !rounded-md"
                :src="item?.customer?.avatarUrl"
              />
              <p>{{ item?.customer?.fullName }}</p>
            </div>
            <p>{{ item?.customer.phoneNumber }}</p>
          </div>
        </div>
        <p v-else-if="customerList?.length == 0 && !loading" class="text-left">
          Your store doesn’t have any customer yet.
        </p>
      </div>

      <div class="w-full flex justify-end items-center gap-4 mt-6 p-6">
        <a-button
          type="outline"
          class="!border-[#D1D5DB] !text-[#374151] !rounded-md"
          @click="voucherStore.showBrowseCustomer = false"
        >
          {{ $t('button.cancel') }}
        </a-button>

        <a-button type="primary" class="!rounded-md" @click="onChooseCustomer">
          {{ $t('button.choose') }}
        </a-button>
      </div>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { ICustomerListData } from '~/constants/common'
import { useVoucherStore } from '~/stores/voucher'

const emit = defineEmits(['onChooseCustomer'])

const search = ref('')
const customerList = ref<ICustomerListData[]>([])
const checkCustomer = ref<string[]>([])
const voucherStore = useVoucherStore()

const loading = ref(false)

const onCheckCustomer = (id: string) => {
  const index = checkCustomer.value.findIndex((item) => item == id)
  if (index != -1) {
    checkCustomer.value = checkCustomer.value.filter((item) => item !== id)
  } else {
    checkCustomer.value.push(id)
  }
}

const onChooseCustomer = () => {
  const list = customerList.value.filter((item) => checkCustomer.value.includes(item._id))
  emit('onChooseCustomer', list)
  voucherStore.showBrowseCustomer = false
}

const onOpen = async () => {
  if (customerList.value.length > 0) return

  loading.value = true
  const res = await voucherStore.getVoucherCustomer()
  if (res) {
    customerList.value = res
  }
  loading.value = false
}

const setCheckCustomer = async (ids: string[]) => {
  checkCustomer.value = ids
}

defineExpose({
  setCheckCustomer
})
</script>

<style scoped></style>
