<template>
  <div class="w-full h-full px-6 pt-5">
    <McTitle
      :title="$t('category.title')"
      :hasBtnAdd="true"
      :btn-txt="$t('button.addCategory')"
      @on-click="$router.push('/' + RouteName.ADD_CATEGORY)"
    >
    </McTitle>
    <McCard
      v-if="cateList.length == 0 && !loading && cateStore.cateQueryData.search == ''"
      title="No Category"
      subTitle="Click to add category"
      :btn-txt="$t('button.addCategory')"
      @onClick="onCreateDiscount"
    >
      <template #icon>
        <IconCategoryEmpty></IconCategoryEmpty>
      </template>
      <template #iconBtn>
        <IconPlus></IconPlus>
      </template>
    </McCard>

    <McCardHeader v-else>
      <div class="w-full">
        <div class="w-full py-4 flex justify-between items-center">
          <p class="text-lg font-medium text-[#111827]">
            {{ $t('category.allCategories') }}({{ cateStore.cateMeta?.itemCount }})
          </p>

          <div class="w-[30%]">
            <FilterInputField
              :is-show-filter="false"
              @handle-select="onHandleSelect"
              @on-enter="onEnterSearch"
            ></FilterInputField>
          </div>
        </div>
        <div v-if="!isGrid" class="w-full py-2">
          <a-table
            v-if="!loading"
            class="mc-table"
            :bordered="false"
            :columns="columns"
            :data="cateList"
            :row-selection="rowSelection"
          >
            <template #name="{ record }">
              <div class="flex justify-start items-center">
                <a-image
                  width="56"
                  height="56"
                  fit="cover"
                  class="flex-shrink-0"
                  :src="record.category?.image?.url"
                />
                <p class="ml-2 line-clamp-2">{{ record.category.name }}</p>
              </div>
            </template>

            <template #count="{ record }">
              {{ record.productCount }} {{ record.productCount > 1 ? 'Products' : 'Product' }}
            </template>

            <template #action="{ record }">
              <div class="flex justify-start items-center gap-x-2">
                <a-button type="text" class="!px-0" @click="handleSelect('Edit', record)">
                  <p class="text-[#007BE0] font-medium text-base">{{ $t('button.edit') }}</p>
                </a-button>
                <a-button type="text">
                  <p
                    class="text-[#E23618] font-medium text-base"
                    @click="handleSelect('Delete', record)"
                  >
                    {{ $t('button.delete') }}
                  </p>
                </a-button>
              </div>
            </template>

            <template #pagination-left>
              <div class="w-full text-black text-left">
                {{
                  $t('table.showResult', {
                    total: cateStore.cateMeta?.totalItems,
                    from: 1,
                    to: cateStore.cateMeta?.itemCount
                  })
                }}
              </div>
            </template>
          </a-table>

          <div v-else class="h-96 flex justify-center items-center">
            <a-spin :size="32" />
          </div>
        </div>
      </div>
    </McCardHeader>

    <template v-if="!loading">
      <div class="w-full" v-if="isGrid">
        <a-row class="grid-demo" :gutter="24">
          <a-col :span="8" v-for="(item, index) in cateList" :key="index">
            <div
              class="cat-card mt-4 p-4 rounded-lg w-full overflow-hidden flex justify-start items-center relative"
            >
              <a-image
                width="60"
                height="60"
                class="flex-shrink-0"
                fit="cover"
                :src="item?.category?.image?.url"
              />
              <div class="flex flex-col flex-grow text-left ml-2 truncate">
                <p class="text-[#6B7280] text-sm font-medium">
                  {{ item.productCount }}
                  {{ item.productCount > 1 ? $t('product.products') : $t('product.title') }}
                </p>
                <p class="text-[#111827] text-lg font-semibold mt-1 truncate">
                  {{ item.category.name }}
                </p>
              </div>

              <a-dropdown @select="(v) => handleSelect(v, item)" position="br">
                <a-button
                  type="text"
                  class="!absolute !top-2 !right-2 !p-0 !w-fit !h-fit !border-none"
                >
                  <IconOption> </IconOption>
                </a-button>
                <template #content>
                  <a-doption>
                    <div class="flex justify-center items-center">
                      <IconEdit></IconEdit>
                      <p class="w-16 ml-2 font-medium">{{ $t('button.edit') }}</p>
                    </div>
                  </a-doption>

                  <a-doption>
                    <div class="flex justify-center items-center">
                      <IconDelete></IconDelete>
                      <p class="w-16 ml-2 font-medium">{{ $t('button.delete') }}</p>
                    </div>
                  </a-doption>
                </template>
              </a-dropdown>
            </div>
          </a-col>
        </a-row>
      </div>
    </template>
    <McLoading v-else> </McLoading>
  </div>

  <McDeleteModal
    :title="$t('category.deleteCategory')"
    :sub-title="$t('category.areYouSureYouWantToDeleteCategory')"
    v-model:show="showDeleteModal"
    @on-cancel="showDeleteModal = false"
    @on-confirm="onConfirmDelete"
  ></McDeleteModal>
</template>

<script setup lang="ts">
import { Message } from '@arco-design/web-vue'
import { ICategoryListData } from '~/constants/common'
import RouteName from '~/constants/router-name'
import { useCategoryStore } from '~/stores/category'

const cateStore = useCategoryStore()
const router = useRouter()

const onCreateDiscount = () => {
  Message.info({ content: `Create Category`, showIcon: true })
  router.push('/' + RouteName.ADD_CATEGORY)
}

const isGrid = ref(true)
const loading = ref(true)

const showDeleteModal = ref(false)

const cateList = computed(() => cateStore.cateList)

const rowSelection = reactive({
  type: 'checkbox',
  size: 'medium',
  showCheckedAll: true,
  checkStrictly: true
}) as any

const selectedItem = ref<ICategoryListData | null>(null)

const columns = [
  {
    title: 'Name',
    slotName: 'name',
    width: 280
  },
  {
    title: 'Product Count',
    slotName: 'count'
  },
  {
    title: 'Collection',
    slotName: 'collection'
  },
  {
    title: 'Action',
    slotName: 'action'
  }
]

const onEnterSearch = (search: string) => {
  cateStore.cateQueryData.search = search
  console.log(search)
  fetchData()
}

const handleSelect = (type: any, item: any) => {
  console.log(type, item)
  selectedItem.value = item
  if (type == 'Delete') {
    showDeleteModal.value = true
  } else {
    router.push('/' + RouteName.EDIT_CATEGORY + '/' + item.category?._id)
  }
}

const onConfirmDelete = async () => {
  console.log(selectedItem, 'selectedItem selectedItem selectedItem')
  await cateStore.deleteCateById(selectedItem.value?.category?._id)
  showDeleteModal.value = false
  await fetchData()
}

const onHandleSelect = (v: any) => {
  console.log(v)
  isGrid.value = v == 'grid'
}

async function fetchData() {
  loading.value = true
  await cateStore.getCateList()
  loading.value = false
}

onMounted(async () => {
  await fetchData()
})
</script>

<style scoped>
.mc-table :deep(.arco-table-th) {
  background-color: transparent;
}

.cat-card {
  background: #ffffff;
  box-shadow: 0px 1px 2px 0px #0000000f;
  box-shadow: 0px 1px 3px 0px #0000001a;
}
</style>
