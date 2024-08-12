<template>
  <div class="w-full h-full px-6 py-5">
    <McTitle :title="$t('button.editProduct')"> </McTitle>
    <a-form
      ref="formRef"
      :model="form"
      :layout="'vertical'"
      :rules="rules"
      @submit-success="onSubmit"
      @submit-failed="onSubmitFail"
    >
      <McCardHeader :title="$t('product.gallery')">
        <div class="w-full py-6 overflow-x-scroll relative">
          <McUpload
            ref="uploadRef"
            :is-error="isUploadError"
            @on-uploaded="onUploaded"
            @on-delete="onDelete"
          >
          </McUpload>
        </div>
      </McCardHeader>
      <McCardHeader :title="$t('product.productInfo')">
        <div class="w-[65%] py-2">
          <div class="w-full relative">
            <a-form-item
              field="name"
              :label="$t('field.name')"
              class=""
              :rules="[{ required: true, message: $t('field.nameIsRequired') }]"
            >
              <InputField :max-length="75" v-model="form.name" class="!px-3"></InputField>
              <template #help>
                <div class="text-transparent"></div>
              </template>
              <!-- <a-input v-model="form.post" placeholder="please enter your post..." /> -->
            </a-form-item>
            <div class="absolute right-0 bottom-0">
              <div class="flex justify-end items-center text-[#AEAEAE] text-xs">
                {{ form.name.length }} / 75
              </div>
            </div>
          </div>

          <a-form-item
            field="description"
            :label="$t('field.description')"
            class="editor-container !relative !mb-3"
            :rules="[
              { required: true, message: $t('field.descriptionIsRequired') },
              {
                validator: (_value: any, cb: any) => {
                  if (countDes > 300) {
                    cb($t('field.descriptionReachMaximum'))
                  } else {
                    cb()
                  }
                }
              }
            ]"
          >
            <!-- <a-textarea
              v-model="form.description"
              placeholder="Please enter something"
              allow-clear
            /> -->
            <TextEditorProduct ref="editorRef" v-model="form.description"></TextEditorProduct>

            <template #help>
              <div class="text-transparent"></div>
            </template>
            <div class="absolute right-0 bottom-0">
              <div class="flex justify-end items-center text-[#AEAEAE] text-xs">
                {{ countDes }} / 300
              </div>
            </div>
          </a-form-item>
        </div>
      </McCardHeader>
      <McCardHeader :title="$t('product.pricing')">
        <div class="w-full py-2">
          <a-form-item
            class="!w-[40%]"
            field="price"
            :label="$t('field.price')"
            :rules="[
              { required: true, message: $t('field.priceIsRequired') },
              {
                validator: (value: any, cb: any) => {
                  if (value == 0 || value == null) {
                    cb($t('field.priceIsRequired'))
                  } else {
                    cb()
                  }
                }
              }
            ]"
          >
            <InputNumber
              v-model="form.price"
              :hide-button="true"
              class="!pl-2"
              @input="(e) => (form.price = e)"
            >
              <template #suffix>
                <div
                  class="px-4 bg-slate-200 h-full flex justify-center items-center rounded-tr-md rounded-br-md"
                >
                  $
                </div>
              </template>
            </InputNumber>
          </a-form-item>

          <a-form-item :label="$t('field.onSale')">
            <a-switch v-model="isOnSale" />
          </a-form-item>
          <div v-if="isOnSale" class="w-[70%] mt-2 gap-x-6 flex justify-start items-center">
            <a-form-item field="discount" :label="$t('field.discount')" :rules="discountValidate">
              <InputField class="!pl-2" v-model="form.discount">
                <template #suffix>
                  <a-dropdown position="bottom" @select="onSelectDiscount">
                    <a-button class="!rounded-tr-md !rounded-br-md">
                      {{
                        form.discountType == DiscountEnum.PERCENTAGE
                          ? $t('common.percentage')
                          : $t('common.amount')
                      }}
                      <icon-down class="icon-discount ml-2" />
                    </a-button>
                    <template #content>
                      <a-doption :value="DiscountEnum.PERCENTAGE">{{
                        $t('common.percentage')
                      }}</a-doption>
                      <a-doption :value="DiscountEnum.AMOUNT">{{ $t('common.amount') }}</a-doption>
                    </template>
                  </a-dropdown>
                </template>
              </InputField>
            </a-form-item>
          </div>
        </div>
      </McCardHeader>
      <McCardHeader
        :title="$t('product.productVariants')"
        :title-class="!isProductVariants ? '!border-none' : ''"
      >
        <template #header>
          <div class="ml-4">
            <a-switch v-model="isProductVariants" />
          </div>
        </template>
        <div
          v-show="isProductVariants"
          class="overflow-hidden w-full flex flex-col justify-between items-center"
        >
          <a-form
            ref="formVariantRef"
            :model="formVariant"
            :layout="'vertical'"
            @submit-success="onSubmitVariant"
            :rules="rulesVariant"
          >
            <div
              class="w-full border-b border-[#d9d9d9] pr-4 py-4 flex flex-col justify-center items-start"
            >
              <a-form-item
                field="variantImg"
                :label="$t('field.image')"
                validate-trigger="blur"
                :rules="[{ required: true, message: $t('field.imageIsRequired') }]"
              >
                <McUploadButton
                  ref="uploadVariantRef"
                  @on-uploaded="onUploadedVariant"
                  @on-delete="onDeleteImgVariant"
                ></McUploadButton>
              </a-form-item>
              <a-form-item
                class="!my-4 !relative !w-[70%]"
                field="variantName"
                :label="$t('field.name')"
                :rules="[{ required: true, message: $t('field.nameIsRequired') }]"
              >
                <InputField v-model="formVariant.variantName" class="!pl-3"></InputField>
                <template #help>
                  <div class="text-transparent"></div>
                </template>
                <!-- <a-input v-model="form.post" placeholder="please enter your post..." /> -->

                <div class="absolute right-0 bottom-0">
                  <div class="flex justify-end items-center text-[#AEAEAE] text-xs">
                    {{ formVariant.variantName.length }} / 75
                  </div>
                </div>
              </a-form-item>
              <a-form-item
                key="variantPrice"
                class="!w-[40%] !mb-3"
                field="variantPrice"
                :label="$t('field.price')"
              >
                <InputNumber
                  class="!pl-3"
                  v-model="formVariant.variantPrice"
                  :hide-button="true"
                  @input="(e) => (formVariant.variantPrice = e)"
                >
                  <template #suffix>
                    <div
                      class="px-4 bg-slate-200 h-full flex justify-center items-center rounded-tr-md rounded-br-md"
                    >
                      $
                    </div>
                  </template>
                </InputNumber>
              </a-form-item>
              <a-button type="primary" class="!rounded-md" @click="onAddProductVariant"
                >{{ $t('button.add') }}
              </a-button>
            </div>
          </a-form>
          <div class="w-full py-2 gap-y-2" v-if="form.variants.length > 0">
            <p class="text-main font-semibold my-2 text-left">
              {{ form.variants.length > 1 ? $t('button.addProducts') : $t('button.addProduct') }}
              ({{ form.variants.length }})
            </p>
            <div class="mt-3">
              <div class="w-fit relative" v-for="(item, index) in form.variants" :key="index">
                <div
                  class="w-full mb-4 flex justify-start items-center bg-[#F8F8F8] p-1 rounded-md"
                >
                  <a-image class="mr-3 flex-shrink-0" width="40" height="40" :src="item.img" />
                  <p class="text-black text-opacity-70 text-sm text-left pr-2">
                    {{ item.name }}
                  </p>
                  <p class="text-base font-semibold text-main ml-2 pr-3">${{ item.price }}</p>
                </div>

                <a-button
                  type="text"
                  size="small"
                  shape="circle"
                  class="!w-[16px] !h-[16px] ! !absolute -right-2 -top-1"
                  @click="onDeleteVariant(item.id)"
                >
                  <IconClose />
                </a-button>
              </div>
            </div>
          </div>
        </div>
      </McCardHeader>
      <McCardHeader :title="$t('product.category')">
        <template #headerRight>
          <a-button type="text" class="mr-4" @click="onShowCreateCate">
            <div class="flex justify-center items-center">
              <IconPlusThin></IconPlusThin>
              <p class="ml-1">{{ $t('button.addCategory') }}</p>
            </div>
          </a-button>
        </template>
        <div class="w-full flex justify-start mb-3">
          <a-radio-group class="w-full" direction="vertical" v-model="form.categoryId">
            <a-row class="grid-demo" :gutter="24">
              <a-col class="mt-3" :span="8" v-for="(item, index) in cateList" :key="index">
                <a-radio :value="item.category._id">
                  <template #radio="{ checked }">
                    <McCategoryRadio
                      :name="item.category.name"
                      :url="item.category?.image?.url"
                      :check="checked"
                    ></McCategoryRadio>
                  </template>
                </a-radio>
              </a-col>
            </a-row>
          </a-radio-group>
        </div>
      </McCardHeader>
      <McCardHeader :title="$t('product.collection')">
        <div class="w-full my-3 flex flex-col justify-center items-start">
          <a-checkbox-group class="!mb-1" v-model="form.collectionIds" direction="vertical">
            <a-checkbox
              :value="item.collection?._id"
              v-for="(item, index) in collection"
              :key="index"
            >
              <template #checkbox="{ checked }">
                <div class="flex justify-start items-center">
                  <IconRadioCheck v-if="checked"> </IconRadioCheck>
                  <IconRadioUncheck v-else> </IconRadioUncheck>
                  <p class="text-black text-opacity-70 ml-1">{{ item.collection?.name }}</p>
                </div>
              </template>
            </a-checkbox>
          </a-checkbox-group>

          <div
            class="flex justify-start items-center ml-[5px] mb-3"
            v-for="(item, index) in addCollectionList"
            :key="index"
          >
            <IconRadioUncheck class="h-5 w-5 flex-shrink-0"> </IconRadioUncheck>
            <InputField
              class="!ml-1 !pl-2 !w-52"
              v-model="addCollectionList[index].name"
            ></InputField>
            <a-button
              type="outline"
              class="!border-[#D1D5DB] !text-[#374151] !rounded-md !mx-3"
              @click="onRemoveAddCollection(item.id)"
            >
              {{ $t('button.cancel') }}
            </a-button>

            <a-button
              type="primary"
              class="!rounded-md"
              @click="onCreateCollection(item.id, index)"
              :loading="addCollectionList[index].loading"
            >
              {{ $t('button.add') }}
            </a-button>
          </div>
          <a-button type="text" class="!px-0 !mt-2" @click="onAddNewCollection">
            <div class="flex justify-center items-center">
              <IconPlusThin></IconPlusThin>
              <p class="ml-1">{{ $t('button.addCollection') }}</p>
            </div>
          </a-button>
        </div>
      </McCardHeader>

      <div class="w-full flex justify-end items-center gap-4 mt-6">
        <a-button
          type="outline"
          class="!border-[#D1D5DB] !text-[#374151] !rounded-md"
          @click="$router.go(-1)"
        >
          {{ $t('button.cancel') }}
        </a-button>

        <a-button type="primary" class="!rounded-md" @click="onSave">
          {{ $t('button.save') }}
        </a-button>
      </div>
    </a-form>
  </div>

  <ModalCreateCate ref="modalCateRef"></ModalCreateCate>
</template>

<script setup lang="ts">
import { v4 } from 'uuid'
import { IProductItemList } from '~/constants/common'
import router from '~/router'
import { useProductStore } from '~/stores/product'

enum DiscountEnum {
  AMOUNT = 'AMOUNT',
  PERCENTAGE = 'PERCENTAGE'
}

const { t } = useI18n()

const route = useRoute()
const productStore = useProductStore()

const isUploadError = ref(false)

const cateList = computed(() => productStore.allCategories)
const collection = computed(() => productStore.allCollection)

const addCollectionList = ref<{ id: string; name: string; loading: boolean }[]>([])
const countDes = ref(0)

const form = reactive({
  name: '',
  description: '',
  price: null as null | number,
  discount: '',
  discountType: DiscountEnum.AMOUNT,
  categoryId: '',
  collectionIds: [] as string[],
  imgIds: [] as any[],
  variants: [] as any[]
})

const formRef = ref(null) as any
const editorRef = ref(null) as any
const uploadRef = ref(null) as any

const uploadVariantRef = ref(null) as any

const formVariant = reactive({
  variantName: '',
  variantImg: '',
  variantImgId: '',
  variantPrice: null
})

const rules = {
  price: [
    {
      validator: (value: any, cb: any) => {
        if (value == 0 || value == null) {
          cb(t('field.priceIsRequired'))
        } else {
          cb()
        }
      }
    }
  ]
}

const discountValidate = [
  { required: true, message: t('field.discountIsRequired') },
  {
    validator: (value: any, cb: any) => {
      const price = form?.price || 0
      if (form.discountType == DiscountEnum.AMOUNT) {
        if (value > price) {
          cb(t('field.discountCannotBeGreaterThanAmount'))
        } else {
          cb()
        }
      } else {
        if (value && value > 100) {
          cb(t('field.discountCannotBeGreaterThan100'))
        } else {
          cb()
        }
      }
    }
  }
]

const rulesVariant = {
  variantPrice: [
    {
      validator: (value: any, cb: any) => {
        if (value == 0 || value == null) {
          cb(t('field.priceIsRequired'))
        } else if (value < form.discount && form.discountType == DiscountEnum.AMOUNT) {
          cb(t('field.priceCannotBeSmallerThanDiscount'))
        } else {
          cb()
        }
      }
    }
  ]
}

const formVariantRef = ref(null) as any
const modalCateRef = ref(null) as any

const isOnSale = ref(false)
const isProductVariants = ref(false)

const onShowCreateCate = () => {
  modalCateRef.value?.showModal()
}

const onSelectDiscount = (e: any) => {
  form.discountType = e
  formRef.value.validateField('discount')
}

const onAddProductVariant = () => {
  formVariantRef.value?.handleSubmit()
}

const onAddNewCollection = () => {
  addCollectionList.value.push({ id: v4(), name: '', loading: false })
}

const onRemoveAddCollection = (id: string) => {
  addCollectionList.value = addCollectionList.value.filter((item) => item.id !== id)
}

const onCreateCollection = async (id: string, index: number) => {
  const collection = addCollectionList.value.find((item) => item.id === id)
  if (collection) {
    addCollectionList.value[index].loading = true
    await productStore.onCreateCollectionFromProduct(collection.name)
    addCollectionList.value[index].loading = false

    onRemoveAddCollection(id)
  }
}

const onSubmitVariant = () => {
  const uid = v4()
  form.variants = [
    ...form.variants,
    {
      id: uid,
      name: formVariant.variantName,
      price: formVariant.variantPrice,
      img: formVariant.variantImg,
      imgId: formVariant.variantImgId
    }
  ]
  formVariant.variantImg = ''
  formVariant.variantImgId = ''
  formVariant.variantPrice = null
  formVariant.variantName = ''
  uploadVariantRef.value?.deleteImg()
}

const onDeleteVariant = (id: string) => {
  const list = form.variants.filter((item) => item.id !== id)
  form.variants = list
}

const onDelete = (file: any) => {
  const id = file.response?._id
  const newIds = form.imgIds.filter((item) => item !== id)
  form.imgIds = newIds as any[]
}

const onUploaded = (files: any) => {
  isUploadError.value = false
  let ids = [] as any[]
  files.forEach((element: any) => {
    ids.push(element.response?._id)
  })
  form.imgIds = ids
}

const onDeleteImgVariant = () => {
  formVariant.variantImg = ''
  formVariant.variantImgId = ''
}

const onUploadedVariant = (files: any) => {
  formVariant.variantImg = files?.[0]?.response?.url
  formVariant.variantImgId = files?.[0]?.response?._id
}

const onSubmitFail = () => {
  if (form.imgIds.length === 0) {
    isUploadError.value = true
    return
  } else {
    isUploadError.value = false
  }
}

const onSubmit = async () => {
  if (form.imgIds.length === 0) {
    isUploadError.value = true
    return
  } else {
    isUploadError.value = false
  }

  const firstVariantItem = {
    name: form.name,
    price: form.price,
    description: form.description,
    mediaIds: form.imgIds
  }

  let variantList = [firstVariantItem] as any[]
  if (isProductVariants.value) {
    form.variants.forEach((item: any) => {
      variantList.push({
        name: item.name,
        price: item.price,
        description: '',
        mediaIds: [item.imgId]
      })
    })
  }

  const id = route.params?.id as string

  await productStore.onEditProduct(
    id,
    form.categoryId,
    form.collectionIds,
    form.description,
    form.discount,
    form.discountType,
    variantList
  )
}

const onSave = async () => {
  formRef.value?.handleSubmit()
}

onMounted(async () => {
  const id = route.params?.id as string
  const res = (await productStore.getProductById(id)) as IProductItemList
  if (!res) {
    router.go(-1)
  } else {
    form.categoryId = res.product.categoryId
    form.collectionIds = res.product.collectionIds
    form.description = res.product.description
    form.discountType = res.product.discountType
    form.discount = res.product.discount == 0 ? '' : res.product.discount?.toString()
    form.name = res.variants?.[0].name
    form.price = res.variants?.[0].price
    form.imgIds = res.variants?.[0].mediaIds
    isProductVariants.value = res.variants.length > 1

    isOnSale.value = res.product.discount > 0

    res.variants.forEach((item, index) => {
      if (index !== 0) {
        form.variants.push({
          id: item._id,
          name: item.name,
          price: item.price,
          img: item.medias?.[0]?.url,
          imgId: item.medias?.[0]?._id
        })
      }
    })

    let listMedias = [] as any[]
    res.variants?.[0]?.medias?.forEach((item) => {
      listMedias.push({
        url: item.url,
        uid: item._id,
        response: {
          _id: item._id,
          url: item.url
        },
        file: {
          type: item.fileType
        },
        status: '',
        name: item.fileName
      })
    })

    uploadRef.value?.setUploadedImages(listMedias)
  }

  await productStore.getAllCateAndCollection()
})

watch(
  () => form?.description,
  () => {
    countDes.value =
      editorRef.value?.editor?.getEditor()?.getContent({ format: 'text' })?.length || 0
  }
)
</script>

<style scoped>
.grid-demo .arco-col {
  height: 48px;
  color: var(--color-white);
}
.grid-demo .arco-col > div {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.grid-demo .arco-col:nth-child(2n) > div {
  background-color: rgba(var(--arcoblue-6), 0.9);
}
.grid-demo .arco-col:nth-child(2n + 1) > div {
  background-color: var(--color-primary-light-4);
}

.arco-dropdown-open .icon-discount {
  transform: rotate(180deg);
}

.editor-container :deep(.tox.tox-tinymce) {
  border-color: #d8dce0 !important;
  @apply !border-[1.5px];
}

.arco-form-item-error.editor-container :deep(.tox.tox-tinymce) {
  @apply !border-danger !border-[1.5px];
}
</style>
