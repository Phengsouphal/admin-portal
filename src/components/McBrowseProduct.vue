<template>
  <a-modal
    v-model:visible="discountStore.showBrowseProduct"
    :footer="false"
    :closable="false"
    modalClass="!rounded-lg !w-[70%] !h-[70%]"
    bodyClass="!p-0 !h-full"
    @open="onOpen"
  >
    <div class="w-full h-full flex flex-col justify-between items-center">
      <div class="w-full h-[calc(100%-80px)]">
        <div
          class="w-full h-14 px-6 flex justify-between items-center rounded-t-2xl border-b border-[#D9D9D9]"
        >
          <p class="text-[#111827] font-semibold text-base">{{ $t('product.addProducts') }}</p>
          <div class="flex justify-end items-center">
            <InputField
              v-model="search"
              :placeholder="$t('common.searchProduct')"
              :max-length="75"
              class="!mr-12"
              @press-enter="onEnterSearch"
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
              @click="discountStore.showBrowseProduct = false"
            >
              <IconCross></IconCross>
            </a-button>
          </div>
        </div>
        <div v-if="loading" class="w-full flex justify-center items-center pt-8">
          <a-spin :size="32" />
        </div>
        <div class="w-full h-[calc(100%-56px)] overflow-hidden pt-6 pb-4" v-if="!loading">
          <div class="w-full h-full overflow-y-scroll px-6">
            <div
              class="flex justify-between items-center mt-3"
              v-for="(item, index) in customerList"
              :key="index"
            >
              <div
                class="cursor-pointer flex justify-start items-center gap-x-4"
                @click="onCheckProduct(item.product._id)"
              >
                <IconCustomerCheck
                  v-if="checkProduct.includes(item.product._id)"
                ></IconCustomerCheck>
                <IconCustomerUnCheck v-else></IconCustomerUnCheck>
                <a-image
                  width="40"
                  height="40"
                  class="!flex-shrink-0 !rounded-md"
                  :src="item?.variants?.[0]?.medias?.[0]?.url"
                />
                <p>{{ item?.variants?.[0]?.name }}</p>
              </div>
              <p>{{ item?.variants?.[0]?.price }} $</p>
            </div>
          </div>
        </div>
        <p v-else-if="customerList?.length == 0 && !loading" class="text-left">
          {{ $t('promotion.yourStoreDoesNotHaveProduct') }}
        </p>
      </div>

      <div class="w-full flex justify-end items-center gap-4 p-6">
        <a-button
          type="outline"
          class="!border-[#D1D5DB] !text-[#374151] !rounded-md"
          @click="discountStore.showBrowseProduct = false"
        >
          {{ $t('button.cancel') }}
        </a-button>

        <a-button
          type="primary"
          :disabled="checkProduct.length == 0"
          class="!rounded-md"
          @click="onChooseProduct"
        >
          {{ $t('button.choose') }}
        </a-button>
      </div>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { IProductItemList } from '~/constants/common'
import { useDiscountStore } from '~/stores/discount'

const emit = defineEmits(['onChooseCustomer'])

const search = ref('')
const customerList = ref<IProductItemList[]>([])
const checkProduct = ref<string[]>([])
const discountStore = useDiscountStore()

const loading = ref(false)

const onCheckProduct = (id: string) => {
  const index = checkProduct.value.findIndex((item) => item == id)
  if (index != -1) {
    checkProduct.value = checkProduct.value.filter((item) => item !== id)
  } else {
    checkProduct.value.push(id)
  }
}

const onEnterSearch = () => {
  fetchData(search.value)
}

const onChooseProduct = () => {
  const list = customerList.value.filter((item) => checkProduct.value.includes(item.product._id))
  emit('onChooseCustomer', list)
  discountStore.showBrowseProduct = false
}

const fetchData = async (search = '') => {
  loading.value = true
  const res = await discountStore.getDiscountProduct(search)
  if (res) {
    customerList.value = res
  }
  loading.value = false
}

const onOpen = async () => {
  if (customerList.value.length > 0) return
  fetchData()
}

const setCheckProduct = async (ids: string[]) => {
  checkProduct.value = ids
}

defineExpose({
  setCheckProduct
})
</script>

<style scoped></style>
