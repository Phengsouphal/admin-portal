<template>
  <div class="w-full h-full px-6 pt-5">
    <McTitle
      :title="$t('collection.title')"
      :has-btn-add="true"
      :btnTxt="$t('button.addCollection')"
      @on-click="$router.push('/' + RouteName.ADD_COLLECTION)"
    >
    </McTitle>
    <McCard
      v-if="list.length == 0 && !loading && collectionStore.collectionQueryData.search == ''"
      :title="$t('collection.noCollection')"
      :subTitle="$t('collection.clickToCreateCollection')"
      :btn-txt="$t('button.addCollection')"
      @onClick="$router.push('/' + RouteName.ADD_COLLECTION)"
    >
      <template #icon>
        <IconCollectionEmpty></IconCollectionEmpty>
      </template>
      <template #iconBtn>
        <IconPlus></IconPlus>
      </template>
    </McCard>

    <template v-else>
      <McCardHeader>
        <div class="w-full">
          <div class="w-full py-4 flex justify-between items-center">
            <p class="text-lg font-medium text-[#111827]">
              {{ $t('collection.allCollection') }} ({{ list.length }})
            </p>

            <div class="w-[30%]">
              <FilterInputField
                :is-show-filter="false"
                @handle-select="onHandleSelect"
                @on-enter="onEnterSearch"
              ></FilterInputField>
            </div>
          </div>
        </div>
      </McCardHeader>

      <div v-if="!loading" class="w-full">
        <a-row class="grid-demo" :gutter="24">
          <a-col :span="8" v-for="(item, index) in list" :key="index">
            <div
              class="cat-card mt-4 p-3 rounded-lg w-full flex justify-start items-center overflow-hidden relative"
              @click="
                () => {
                  showAddCollectToProduct = true
                  selectedItem = item
                }
              "
            >
              <div class="w-full text-left ml-2 truncate">
                <div class="w-full flex justify-between items-center">
                  <p class="text-[#6B7280] text-sm font-medium">
                    {{ item.productCount }}
                    {{ item.productCount > 1 ? $t('product.products') : $t('product.title') }}
                  </p>

                  <div v-if="item.collection.isDefault" class="text-main text-sm font-medium">
                    {{ $t('common.default') }}
                  </div>
                </div>

                <p class="w-[70%] text-[#111827] text-lg font-semibold mt-1 truncate">
                  {{ item.collection.name }}
                </p>
              </div>

              <a-dropdown @select="(v) => handleSelect(v, item)" position="br">
                <a-button
                  v-if="!item.collection.isDefault"
                  type="text"
                  @click.stop=""
                  class="!absolute !top-2 !right-3 !p-0 !w-fit !h-fit !border-none"
                >
                  <IconOption> </IconOption>
                </a-button>
                <template #content>
                  <a-doption value="Edit">
                    <div class="flex justify-center items-center">
                      <IconEdit></IconEdit>
                      <p class="w-16 ml-2 font-medium">{{ $t('button.edit') }}</p>
                    </div>
                  </a-doption>

                  <a-doption value="Delete">
                    <div class="flex justify-center items-center">
                      <IconDelete></IconDelete>
                      <p class="w-16 ml-2 font-medium">{{ $t('button.delete') }}</p>
                    </div>
                  </a-doption>
                </template>
              </a-dropdown>

              <div class="absolute bottom-2 right-3">
                <div class="flex justify-end items-center">
                  <div
                    class="w-1 h-1 rounded-full"
                    :class="[item.collection.status === 'INACTIVE' ? 'bg-danger' : 'bg-success']"
                  ></div>
                  <p
                    class="text-sm ml-1"
                    :class="[
                      item.collection.status === 'INACTIVE' ? 'text-danger' : 'text-success'
                    ]"
                  >
                    {{
                      item.collection.status === 'INACTIVE'
                        ? $t('status.inactive')
                        : $t('status.active')
                    }}
                  </p>
                </div>
              </div>
            </div>
          </a-col>
        </a-row>
      </div>
      <McLoading v-else> </McLoading>
    </template>
  </div>

  <a-modal
    :visible="visible"
    :closable="false"
    :footer="false"
    title=""
    body-class="!p-0 !bg-transparent"
    modal-class=" !bg-transparent"
  >
    <div class="w-full flex flex-col justify-center items-center bg-white rounded-2xl">
      <div class="w-full flex justify-between items-center py-4 px-4 bg-[#e4e4e4] rounded-t-2xl">
        <p class="text-[#111827] font-semibold text-base">
          {{ $t('collection.selectCollectionType') }}
        </p>
        <a-button type="text" class="!p-0 !h-fit" @click="visible = false">
          <IconCross></IconCross>
        </a-button>
      </div>
      <a-button type="text" class="!w-full !h-fit !p-0" v-for="(_item, index) in 3" :key="index">
        <div class="w-full py-4 flex justify-between items-center px-4 !border-b !border-gray">
          <div class="flex flex-col justify-center items-start">
            <p class="text-[#111827] text-sm font-medium">{{ $t('product.popularProduct') }}</p>
            <p class="text-[#6B7280]">{{ $t('collection.allPopularProduct') }}</p>
          </div>
          <IconChevronLeft></IconChevronLeft>
        </div>
      </a-button>
      <div class="w-full flex justify-start items-center p-4">
        <a-button type="text" class="!p-0">
          <div class="flex justify-end items-center">
            <IconPlusThin> </IconPlusThin>
            <p>{{ $t('button.addCollection') }}</p>
          </div>
        </a-button>
      </div>
    </div>
  </a-modal>

  <McDeleteModal
    :title="$t('collection.deleteCollection')"
    :sub-title="$t('collection.areYouSureYouWantToDeleteCollection')"
    v-model:show="showDeleteModal"
    @on-cancel="showDeleteModal = false"
    @on-confirm="onConfirmDelete"
  ></McDeleteModal>

  <a-modal
    :visible="showEditModal"
    :closable="false"
    :footer="false"
    title=""
    body-class="!p-0 !bg-transparent"
    modal-class=" !bg-transparent !w-full"
    @close=""
  >
    <div class="w-full flex flex-col justify-center items-center rounded-lg p-10">
      <div class="w-[70%]">
        <McCardHeader :title="$t('collection.editCollection')">
          <div class="w-full p-4">
            <a-form
              ref="formEditRef"
              :model="formEdit"
              :layout="'vertical'"
              @submit-success="onSubmitEdit"
            >
              <a-form-item
                field="name"
                :label="$t('field.name')"
                class="!relative"
                :rules="[{ required: true, message: $t('field.nameIsRequired') }]"
              >
                <InputField
                  v-model="formEdit.name"
                  :max-length="75"
                  class="!pl-3 !pr-3"
                ></InputField>
                <template #help>
                  <div class="text-transparent"></div>
                </template>
                <div class="absolute right-0 bottom-0">
                  <div class="flex justify-end items-center text-[#AEAEAE] text-xs">
                    {{ formEdit.name.length }} / 75
                  </div>
                </div>
              </a-form-item>

              <div class="flex justify-start items-center mt-3">
                <a-switch v-model="formEdit.isActive"></a-switch>
                <p class="text-base text-black text-opacity-70 ml-4">
                  {{ formEdit.isActive ? $t('common.active') : $t('common.inactive') }}
                </p>
              </div>
              <!-- <a-form-item
                field="description"
                label="Description"
                :rules="[{ required: true, message: 'Description is required' }]"
              >
                <a-textarea
                  v-model="formEdit.description"
                  placeholder="Please enter something"
                  allow-clear
                />
              </a-form-item> -->
            </a-form>

            <div class="w-full flex justify-end items-center gap-4 mt-2">
              <a-button
                type="outline"
                class="!border-[#D1D5DB] !text-[#374151] !rounded-md"
                @click="showEditModal = false"
              >
                {{ $t('button.cancel') }}
              </a-button>

              <a-button type="primary" class="!rounded-md" @click="onEdit">
                {{ $t('button.save') }}
              </a-button>
            </div>
          </div>
        </McCardHeader>
      </div>
    </div>
  </a-modal>

  <a-modal
    :visible="showAddCollectToProduct"
    :closable="false"
    :footer="false"
    title=""
    body-class="!p-0 !bg-transparent"
    modal-class="!w-[60%] !bg-transparent"
    @open="onAddProductOpen"
    @close="selectedProductList = []"
  >
    <div
      class="w-full min-h-[450px] flex flex-col justify-between items-center bg-white rounded-md"
    >
      <div class="w-full">
        <div class="w-full flex justify-between items-center px-4 py-2 border-b border-[#D9D9D9]">
          <p class="w-[80%] truncate text-[#111827] text-xl font-semibold">
            {{ selectedItem?.collection?.name }}
          </p>

          <a-button
            type="text"
            class="!px-0"
            @click="
              () => {
                selectedItem = null
                showAddCollectToProduct = false
              }
            "
          >
            <IconCross></IconCross>
          </a-button>
        </div>
        <div class="w-full mt-6">
          <div class="w-full px-4">
            <p class="mb-2 text-sm font-medium">{{ $t('collection.chooseProduct') }}</p>
            <a-select
              :key="dayjs().unix()"
              :style="{ width: '400px' }"
              class="!rounded !border-[1px] !border-[#CED4DA]"
              :placeholder="$t('collection.pleaseChooseProduct')"
              allow-search
              :loading="loadingProduct"
              @change="onChange"
            >
              <a-option
                :value="item.product._id"
                v-for="(item, index) in collectionStore.proList"
                :key="index"
              >
                <div class="w-full flex justify-start items-center">
                  <a-image
                    width="24"
                    height="24"
                    class="!flex-shrink-0"
                    :src="item.variants[0].medias?.[0]?.url"
                  />
                  <p class="w-[90%] ml-2 truncate">{{ item.variants[0].name }}</p>
                </div>
              </a-option>

              <template #arrow-icon>
                <IconSelectDropdown></IconSelectDropdown>
              </template>

              <template #empty>
                <div class="">
                  <p class="text-[#6B7280] text-sm text-center py-6">{{ $t('common.noData') }}</p>
                </div>
              </template>
            </a-select>
          </div>

          <div class="border-t border-[#D9D9D9] mt-6 pt-6 px-4">
            <p class="font-semibold text-left" v-if="selectedProductList.length > 0">
              {{
                selectedProductList.length > 1 ? $t('button.addProducts') : $t('button.addProduct')
              }}
              ({{ selectedProductList.length }})
            </p>
            <div class="w-full max-h-[300px] overflow-y-scroll pt-6">
              <div class="w-fit relative" v-for="(item, index) in selectedProductList" :key="index">
                <div
                  class="w-full mb-4 flex justify-start items-center bg-[#F8F8F8] p-1 rounded-md"
                >
                  <a-image
                    class="mr-3 flex-shrink-0"
                    width="40"
                    height="40"
                    :src="item.variants[0]?.medias[0]?.url"
                  />
                  <p class="text-black text-opacity-70 text-sm text-left pr-2">
                    {{ item.variants[0]?.name }}
                  </p>
                  <p class="text-base font-semibold text-main ml-2 pr-3">
                    ${{ item.variants[0]?.price }}
                  </p>
                </div>

                <a-button
                  type="text"
                  size="small"
                  shape="circle"
                  class="!w-[16px] !h-[16px] ! !absolute -right-2 -top-1"
                  @click="onDeleteSelectProduct(item.product._id)"
                >
                  <IconClose />
                </a-button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full flex justify-end items-center gap-4 px-4 py-4">
        <a-button
          type="outline"
          class="!border-[#D1D5DB] !text-[#374151] !rounded-md"
          @click="
            () => {
              selectedItem = null
              showAddCollectToProduct = false
            }
          "
        >
          {{ $t('button.cancel') }}
        </a-button>

        <a-button
          type="primary"
          class="!rounded-md"
          :loading="submittingProduct"
          @click="onSetProductsCollection"
        >
          {{ $t('button.save') }}
        </a-button>
      </div>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { ICollectionListData, IProductItemList } from '~/constants/common'
import RouteName from '~/constants/router-name'
import { useCollectionStore } from '~/stores/collection'

const collectionStore = useCollectionStore()
const visible = ref(false)
const loading = ref(false)

const showEditModal = ref(false)

const formEdit = reactive({
  name: '',
  description: ' ',
  isActive: false
})

const formEditRef = ref(null) as any

const selectedItem = ref<ICollectionListData | null>(null)
const showDeleteModal = ref(false)

const showAddCollectToProduct = ref(false)
const loadingProduct = ref(false)
const submittingProduct = ref(false)
const selectedProductList = ref<IProductItemList[]>([])

const list = computed(() => collectionStore.collectionList)

const onEnterSearch = (search: string) => {
  collectionStore.collectionQueryData.search = search
  fetchData()
}

const onHandleSelect = (_v: any) => {
  // isGrid.value = v == 'grid'
}

const onSetProductsCollection = async () => {
  submittingProduct.value = true
  const ids = selectedProductList.value.map((item) => item.product._id)
  collectionStore.setProductsCollection(ids, selectedItem.value?.collection?._id)
  submittingProduct.value = false
  showAddCollectToProduct.value = false
  selectedItem.value = null
  fetchData()
}

const onChange = (v: any) => {
  const item = collectionStore.proList.find((item) => item.product._id === v)
  const index = selectedProductList.value.findIndex((item) => item.product._id === v)
  if (item && index === -1) {
    selectedProductList.value.push(item)
  }
}

const onDeleteSelectProduct = (id: string) => {
  selectedProductList.value = selectedProductList.value.filter((item) => item.product._id !== id)
}

const onAddProductOpen = async () => {
  loadingProduct.value = true
  await collectionStore.getProductNotInCollection(selectedItem.value?.collection?._id)
  const res = await collectionStore.getProductInCollection(selectedItem.value?.collection?._id)
  selectedProductList.value = res || []
  loadingProduct.value = false
}

const handleSelect = (type: any, item: any) => {
  selectedItem.value = item
  if (type == 'Delete') {
    showDeleteModal.value = true
  } else {
    showEditModal.value = true
    formEdit.name = selectedItem.value?.collection?.name || ''
    formEdit.description = selectedItem.value?.collection?.description || ''
    formEdit.isActive = selectedItem.value?.collection?.status == 'ACTIVE'
  }
}

const onEdit = async () => {
  formEditRef.value?.handleSubmit()
}

const onSubmitEdit = async () => {
  await collectionStore.onEditCollection(
    formEdit.name,
    formEdit.description,
    formEdit.isActive,
    selectedItem.value?.collection?._id || ''
  )
  showEditModal.value = false
  await fetchData()
}

const onConfirmDelete = async () => {
  await collectionStore.deleteCollectionById(selectedItem.value?.collection?._id)
  showDeleteModal.value = false
  await fetchData()
}

async function fetchData() {
  loading.value = true
  await collectionStore.getCollectionList()
  loading.value = false
}

onMounted(async () => {
  await fetchData()
})
</script>

<style scoped>
.cat-card {
  background: #ffffff;
  box-shadow: 0px 1px 2px 0px #0000000f;
  box-shadow: 0px 1px 3px 0px #0000001a;
}
</style>
