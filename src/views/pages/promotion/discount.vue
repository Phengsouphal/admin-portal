<template>
  <div class="w-full h-full px-6 pt-5">
    <McTitle
      :title="$t('promotion.discount')"
      :has-btn-add="list.length > 0"
      :btn-txt="$t('button.createDiscount')"
      @on-click="$router.push('/' + RouteName.ADD_DISCOUNT)"
    >
    </McTitle>
    <McCard
      v-if="list.length == 0 && !loading"
      title="Manage discounts and promotions"
      subTitle="Click to create discount"
      :btn-txt="$t('button.createDiscount')"
      @onClick="$router.push('/' + RouteName.ADD_DISCOUNT)"
    >
      <template #icon>
        <IconVoucherEmpty></IconVoucherEmpty>
      </template>
      <template #iconBtn>
        <IconPlus></IconPlus>
      </template>
    </McCard>

    <McCardHeader v-else>
      <div class="w-full">
        <div class="w-full flex justify-between items-center mt-4 border-b border-[#E5E6EB]">
          <a-radio-group v-model="checkBox" class="" @change="onCheckChange">
            <a-radio
              :value="subItem.value"
              class="mb-4"
              :class="[index == 0 ? '!mr-12' : '']"
              v-for="(subItem, index) in checkboxList"
              :key="index"
            >
              <template #radio="{ checked }">
                <div class="w-full flex justify-between items-center">
                  <IconRoleCheck v-if="checked"></IconRoleCheck>
                  <IconRoleUnCheck v-else></IconRoleUnCheck>
                  <p class="ml-2 text-lg font-semibold text-[#111827]">{{ subItem.text }}</p>
                </div>
              </template>
            </a-radio>
          </a-radio-group>

          <a-dropdown @select="showSelectedDeleteModal = true" position="br">
            <a-button type="text" class="!w-fit !p-0 !h-fit">
              <IconDotRound></IconDotRound>
            </a-button>
            <template #content>
              <a-doption>
                <div class="flex justify-center items-center">
                  <IconDelete></IconDelete>
                  <p class="w-16 ml-2 font-medium">{{ $t('button.delete') }}</p>
                </div>
              </a-doption>
            </template>
          </a-dropdown>
        </div>
        <div class="w-full py-2" v-if="!loading">
          <a-table
            class="mc-table"
            :row-selection="rowSelection"
            :bordered="false"
            :selected-keys="selectedKeys"
            :show-header="false"
            :pagination="{
              total: discountStore.discountMeta?.totalItems,
              current: discountStore.discountMeta?.currentPage
            }"
            :columns="columns()"
            :data="list"
            :scroll="{ x: 700 }"
            :scrollbar="true"
            @selection-change="onSelectionChange"
            @page-change="onPageChange"
            @row-click="onRowClick"
          >
            <template #code="{ record }">
              <div class="flex justify-start items-start">
                <div class="mr-5">
                  <p class="text-base !mb-0 flex font-semibold text-black text-opacity-70">
                    {{ record.name }}
                  </p>
                </div>
                <!-- <a-button type="text" class="!p-0 !h-fit">
                  <IconCopy></IconCopy>
                </a-button> -->
              </div>
            </template>
            <template #status="{ record }">
              <McStatus :status="record.status"></McStatus>
            </template>

            <template #type="{ record }">
              <div>
                <p class="text-base font-semibold text-black text-opacity-70">
                  {{ $t('discount.simpleDiscount') }}
                </p>
              </div>
            </template>

            <template #action="{ record }">
              <div class="flex justify-end items-center gap-x-4">
                <a-button
                  type="text"
                  class="!p-0"
                  @click.stop="$router.push(`/${RouteName.EDIT_DISCOUNT}/${record._id}`)"
                >
                  <p class="text-[#007BE0] font-medium text-sm">{{ $t('button.edit') }}</p>
                </a-button>
                <a-button
                  type="text"
                  class="!p-0"
                  @click.stop="
                    () => {
                      showDeleteModal = true
                      selectedId = record?._id
                    }
                  "
                >
                  <p class="text-[#E23618] font-medium text-sm">{{ $t('button.delete') }}</p>
                </a-button>
              </div>
            </template>

            <template #pagination-left>
              <div class="w-full text-black text-left">
                {{
                  $t('table.showResult', {
                    total: discountStore.discountMeta?.totalItems,
                    from: 1,
                    to: discountStore.discountMeta?.itemCount
                  })
                }}
              </div>
            </template>
          </a-table>
        </div>

        <McLoading v-else></McLoading>
      </div>
    </McCardHeader>
  </div>

  <McDeleteModal
    :title="$t('promotion.deleteSelectedDiscount')"
    :sub-title="$t('promotion.deleteDiscountCannotBeUndo')"
    v-model:show="showSelectedDeleteModal"
    @on-cancel="showSelectedDeleteModal = false"
    @on-confirm="onConfirmDeleteSelected"
  ></McDeleteModal>

  <McDeleteModal
    :title="$t('promotion.deleteDiscount')"
    :sub-title="$t('common.areYouSureYouWantToDeleteThis')"
    v-model:show="showDeleteModal"
    @on-cancel="showDeleteModal = false"
    @on-confirm="onConfirmDelete"
  ></McDeleteModal>
</template>

<script setup lang="ts">
import { StatusEnum } from '~/constants/common'
import RouteName from '~/constants/router-name'
import { useDiscountStore } from '~/stores/discount'

const { t } = useI18n()
const rowSelection = reactive({
  type: 'checkbox',
  showCheckedAll: true,
  onlyCurrent: false
}) as any

const columns = () => [
  {
    title: t('common.code'),
    slotName: 'code',
    ellipsis: true,
    width: 320
  },
  {
    title: t('table.status'),
    slotName: 'status'
  },
  {
    title: t('common.type'),
    slotName: 'type'
  },
  {
    title: t('table.action'),
    slotName: 'action'
  }
]

const selectedKeys = ref<string[]>([])
const selectedId = ref('')

const discountStore = useDiscountStore()

const checkBox = ref('')
const checkboxList = [
  { value: 1, text: t('common.allVouchers') },
  { value: 2, text: t('common.active') },
  { value: 3, text: t('common.expired') }
]

const list = computed(() => discountStore?.discountList)
const loading = ref(false)

const showDeleteModal = ref(false)
const showSelectedDeleteModal = ref(false)

async function onRowClick(v: any) {
  // router.push(`/${RouteName.VOUCHER_DETAIL}/${v._id}`)
}

async function onCheckChange(v: any) {
  selectedKeys.value = []
  if (v === 1) {
    selectedKeys.value = list.value.map((item) => item._id)
  } else {
    list.value.forEach((item) => {
      if (item.status === StatusEnum.ACTIVE && v === 2) {
        selectedKeys.value.push(item.key)
      } else if (item.status !== StatusEnum.ACTIVE && v === 3) {
        selectedKeys.value.push(item.key)
      }
    })
  }
}

async function onPageChange(v: any) {
  discountStore.discountQueryData.page = v
  loading.value = true
  // await fetchData()
  loading.value = false
}

const onConfirmDeleteSelected = async () => {
  for (const iterator of selectedKeys.value) {
    await discountStore.deleteDiscountId(iterator)
  }
  showSelectedDeleteModal.value = false
  fetchData()
}

const onConfirmDelete = async () => {
  await discountStore.deleteDiscountId(selectedId.value)
  showDeleteModal.value = false
  await fetchData()
}

async function fetchData() {
  await discountStore.getDiscountList()
}

const onSelectionChange = (rowKeys: any[]) => {
  // isSelectedAll.value = rowKeys.length == list.value.length
}

onMounted(async () => {
  loading.value = true
  await fetchData()
  loading.value = false
})
</script>

<style scoped></style>
