<template>
  <div class="w-full h-full px-6 pt-5">
    <McTitle
      :title="$t('product.title')"
      :has-btn-add="list.length > 0"
      :btn-txt="$t('button.addProduct')"
      @on-click="onCreateProduct"
    >
    </McTitle>
    <McCard
      v-if="
        list.length == 0 &&
        !loading &&
        productStore.productQueryData.search == '' &&
        productStore.productQueryData.collectionIds == '' &&
        productStore.productQueryData.categoryIds == ''
      "
      :title="$t('product.noProducts')"
      :subTitle="$t('product.clickToCreateProduct')"
      :btn-txt="$t('button.addProduct')"
      @onClick="onCreateProduct"
    >
      <template #icon>
        <IconProductEmpty></IconProductEmpty>
      </template>
      <template #iconBtn>
        <IconPlus></IconPlus>
      </template>
    </McCard>

    <McCardHeader v-else>
      <div class="w-full">
        <div v-if="!isSelectedAll" class="w-full py-4 flex justify-between items-center">
          <p class="text-lg font-medium text-[#111827]">
            {{ $t('product.addProducts') }} ({{ productStore?.productMeta?.itemCount }})
          </p>

          <div class="w-[40%]">
            <FilterInputField @on-enter="onEnterSearch" :filterHeader="$t('product.filterProduct')">
              <template #filterContent>
                <div class="w-full h-[calc(100%-50px)] overflow-hidden">
                  <div class="w-full h-full overflow-y-scroll">
                    <a-collapse
                      :default-active-key="['1', '2']"
                      expand-icon-position="right"
                      class="mc-collapse"
                      :bordered="false"
                    >
                      <template #expand-icon="{ active }">
                        <IconDown v-if="active" class="rotate-180" />
                        <icon-down v-else />
                      </template>
                      <a-collapse-item key="1" class="bg-transparent">
                        <template #header>
                          <p class="text-lg font-semibold mt-2">{{ $t('category.title') }}</p>
                        </template>
                        <div>
                          <McRadio
                            class="mb-2"
                            :check="formFilter.selectCate == 'All'"
                            :text="$t('common.all')"
                            @click="onFilterData('category', 'All')"
                          ></McRadio>
                          <McRadio
                            class="mb-2"
                            :check="formFilter.selectCate == item.category._id"
                            :text="item.category.name"
                            v-for="(item, index) in allCategories"
                            :key="index"
                            @click="onFilterData('category', item.category._id)"
                          ></McRadio>
                        </div>
                      </a-collapse-item>

                      <a-collapse-item key="2">
                        <template #header>
                          <p class="text-lg font-semibold mt-2">{{ $t('collection.title') }}</p>
                        </template>
                        <div>
                          <McRadio
                            class="mb-2"
                            :check="formFilter.selectCol == 'All'"
                            :text="$t('common.all')"
                            @click="onFilterData('collection', 'All')"
                          ></McRadio>
                          <McRadio
                            class="mb-2"
                            :check="formFilter.selectCol == item.collection._id"
                            :text="item.collection.name"
                            v-for="(item, index) in allCollection"
                            :key="index"
                            @click="onFilterData('collection', item.collection._id)"
                          ></McRadio>
                        </div>
                      </a-collapse-item>
                    </a-collapse>
                  </div>
                </div>
              </template>
            </FilterInputField>
          </div>
        </div>
        <div v-else class="w-full flex justify-start items-center py-4" @click="">
          <a-button type="text" class="!w-fit !p-0" @click="showDeleteAllModal = true">
            <p class="text-danger text-lg font-medium">{{ $t('button.deleteAll') }}</p>
          </a-button>
        </div>
        <div class="w-full py-2" v-if="!loading">
          <a-table
            class="mc-table"
            :row-selection="rowSelection"
            :bordered="false"
            :pagination="{
              total: productStore.productMeta?.totalItems,
              current: productStore.productMeta?.currentPage
            }"
            :columns="columns"
            :data="list"
            :scroll="scroll"
            :scrollbar="scrollbar"
            @selection-change="onSelectionChange"
            @page-change="onPageChange"
            @row-click="onRowClick"
          >
            <template #name="{ record }">
              <McAvatar
                :src="record?.variants?.[0]?.medias?.[0]?.url"
                :text="record?.variants?.[0]?.name"
              ></McAvatar>
            </template>
            <template #category="{ record }"> {{ record?.product?.category?.name }} </template>
            <template #collection="{ record }">
              {{ displayCollection(record?.product?.collections) }}
            </template>

            <template #price="{ record }">
              <div class="flex justify-start items-center">
                <p class="mr-3">${{ record?.variants?.[0]?.price }}</p>
                <p class="text-danger" v-if="record?.product?.discount">
                  ({{
                    record?.product?.discount +
                    (record?.product?.discountType == DiscountEnum.PERCENTAGE ? '%' : '$')
                  }})
                </p>
              </div>
            </template>

            <template #action="{ record }">
              <div class="flex justify-start items-center gap-x-4">
                <a-button type="text" class="!p-0" @click.stop="onEditProduct(record)">
                  <p class="text-[#007BE0] font-medium text-sm">{{ $t('button.edit') }}</p>
                </a-button>
                <a-button type="text" class="!p-0" @click.stop="onDelete(record)">
                  <p class="text-[#E23618] font-medium text-sm">{{ $t('button.delete') }}</p>
                </a-button>
              </div>
            </template>

            <template #pagination-left>
              <div class="w-full text-black text-left">
                {{
                  $t('table.showResult', {
                    total: productStore.productMeta?.totalItems,
                    from: 1,
                    to: productStore.productMeta?.itemCount
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
    :title="$t('product.deleteProduct')"
    :sub-title="$t('product.areYouSureYouWantToDeleteProduct')"
    v-model:show="showDeleteModal"
    @on-cancel="showDeleteModal = false"
    @on-confirm="onConfirmDelete"
  ></McDeleteModal>

  <McDeleteModal
    :title="$t('product.deleteProducts')"
    :sub-title="$t('product.areYouSureYouWantToDeleteAllProducts')"
    v-model:show="showDeleteAllModal"
    @on-cancel="showDeleteAllModal = false"
    @on-confirm=""
  ></McDeleteModal>
</template>

<script setup lang="ts">
import { Message } from '@arco-design/web-vue'
import {
  DiscountEnum,
  ICategoryListData,
  ICollectionList,
  ICollectionListData,
  IProductItemList
} from '~/constants/common'
import RouteName from '~/constants/router-name'
import { useProductStore } from '~/stores/product'

const productStore = useProductStore()

const router = useRouter()
const scrollbar = ref(true)

const { t } = useI18n()

const formFilter = reactive({
  selectCate: 'All',
  selectCol: 'All'
})

const allCategories = ref<ICategoryListData[]>([])
const allCollection = ref<ICollectionListData[]>([])

const showDeleteAllModal = ref(false)

const showDeleteModal = ref(false)
const isSelectedAll = ref(false)

const selectedItem = ref<IProductItemList | null>(null)

const loading = ref(false)
const scroll = {
  x: 700
}
const rowSelection = reactive({
  type: 'checkbox',
  showCheckedAll: true,
  onlyCurrent: false
}) as any

const columns = [
  {
    title: t('table.name'),
    slotName: 'name',
    ellipsis: true,
    width: 220
  },
  {
    title: t('table.category'),
    slotName: 'category'
  },
  {
    title: t('table.collection'),
    slotName: 'collection'
  },
  {
    title: t('table.price'),
    slotName: 'price'
  },
  {
    title: t('table.active'),
    slotName: 'action'
  }
]

const list = computed(() => productStore.productList)

const displayCollection = (collection: ICollectionList[]) => {
  let name = ''
  collection.forEach((element) => {
    name += element.name + ', '
  })
  return name.slice(0, -2)
}

const onFilterData = (type: string, value: string) => {
  if (type === 'category') {
    formFilter.selectCate = value
    productStore.productQueryData.categoryIds =
      formFilter.selectCate === 'All' ? '' : formFilter.selectCate
  } else {
    formFilter.selectCol = value
    productStore.productQueryData.collectionIds =
      formFilter.selectCol === 'All' ? '' : formFilter.selectCol
  }
  onPageChange(1)
}

const onSelectionChange = (rowKeys: any[]) => {
  isSelectedAll.value = rowKeys.length == list.value.length
}
const onEditProduct = (item: IProductItemList) => {
  router.push(`/${RouteName.EDIT_PRODUCT}/${item.product._id}`)
}
const onCreateProduct = () => {
  Message.info({ content: `Create Product`, showIcon: true })
  router.push(`/${RouteName.ADD_PRODUCT}`)
}

const onDelete = (item: IProductItemList) => {
  selectedItem.value = item
  showDeleteModal.value = true
}

const onConfirmDelete = async () => {
  await productStore.deleteProductById(selectedItem.value?.product?._id)
  showDeleteModal.value = false
  await fetchData()
}

function onRowClick(v: any) {
  router.push(`/${RouteName.PRODUCT_DETAIL}/` + v?.product?._id)
}

async function onPageChange(v: any) {
  productStore.productQueryData.page = v
  loading.value = true
  await fetchData()
  loading.value = false
}

const onEnterSearch = async (search: string) => {
  loading.value = true
  productStore.productQueryData.search = search
  onPageChange(1)
}

async function fetchData() {
  await productStore.getProductList()
}

onMounted(async () => {
  loading.value = true

  await fetchData()
  await productStore.getAllCateAndCollection()
  allCategories.value = productStore.allCategories || []
  allCollection.value = productStore.allCollection || []
  loading.value = false
})
</script>

<style scoped>
.mc-table :deep(.arco-table-th) {
  background-color: transparent;
  border-bottom: 1px solid var(--color-neutral-3);
  @apply py-2;
}

.mc-table :deep(.arco-table-selection-checkbox-col) {
  width: 20px;
}

.mc-table :deep(.arco-table-checkbox .arco-table-cell) {
  justify-content: start;
}

.mc-collapse :deep(.arco-collapse-item-content) {
  background-color: transparent;
}

.mc-collapse :deep(.arco-collapse-item-active > .arco-collapse-item-header) {
  border-color: transparent;
}
</style>
