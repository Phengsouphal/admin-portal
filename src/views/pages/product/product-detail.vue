<template>
  <div class="w-full h-full px-6 py-6">
    <McTitle :title="''">
      <template #suffix>
        <div class="w-full flex justify-start items-center">
          <a-button type="text" class="!p-0" @click="$router.go(-1)">
            <div class="flex justify-center items-center">
              <IconArrowLeft></IconArrowLeft>
              <p class="text-black text-opacity-70 text-2xl font-semibold">
                {{ product?.variants?.[0]?.name }}
              </p>
            </div>
          </a-button>
        </div>
      </template>
    </McTitle>
    <McCardHeader :title="$t('product.productInfo')">
      <template #headerRight>
        <a-button
          type="text"
          class="!w-fit !px-0 mr-4"
          @click="$router.push(`/${RouteName.EDIT_PRODUCT}/` + product?.product?._id)"
        >
          <div class="flex justify-center items-center">
            <IconEditDetail></IconEditDetail>
          </div>
        </a-button>
      </template>

      <div class="w-full pb-4 pt-6">
        <div class="w-full h-fit flex justify-between items-start">
          <div class="w-[70%] flex flex-col flex-grow-0 justify-center items-start text-[#111827]">
            <div class="flex justify-start items-center">
              <img
                class="object-cover rounded-lg"
                width="100"
                height="100"
                :src="product?.variants?.[0]?.medias?.[0]?.url"
                alt=""
              />
              <div class="flex flex-col justify-start items-start ml-4">
                <p>{{ product?.variants?.[0]?.name }}</p>
                <p class="text-[#E23618] text-[22px] font-semibold mt-2">
                  ${{ product?.variants?.[0]?.price }}
                </p>
              </div>
            </div>

            <div class="flex flex-col justify-start items-start mt-4">
              <p class="text-lg font-semibold">{{ $t('product.productDetial') }}</p>
              <p class="text-left mt-4 leading-7" v-html="product?.product?.description"></p>
            </div>
          </div>

          <div
            class="w-[30%] h-full pl-16 flex flex-col flex-grow justify-center items-start text-[#111827]"
          >
            <p class="text-[#111827] text-lg font-medium">{{ $t('product.category') }}</p>
            <p class="mt-4 text-black text-opacity-70 text-base font-medium">
              {{ product?.product?.category?.name }}
            </p>

            <p class="text-[#111827] text-lg font-medium mt-6">{{ $t('product.collection') }}</p>
            <p
              class="mt-4 text-black text-opacity-70 text-base font-medium"
              v-for="(item, index) in product?.product?.collections"
              :key="index"
            >
              {{ item.name }}
            </p>
          </div>
        </div>
        <div class="w-full h-[1px] my-6 bg-[#D9D9D9]"></div>

        <div class="w-full flex flex-col justify-start items-start">
          <p class="text-[#111827] text-lg font-semibold mb-4">
            {{ $t('product.productVariants') }}
          </p>

          <div
            class="flex justify-center items-center bg-[#F8F8F8] mb-4 p-3 rounded-lg"
            v-for="(item, index) in product?.variants?.slice(1)"
            :key="index"
          >
            <a-image
              width="44"
              height="44"
              class="!rounded-md"
              :src="item?.medias?.[0].url"
            ></a-image>
            <p class="ml-2 text-black text-base font-medium text-opacity-70">
              {{ item.name }}
            </p>
          </div>
        </div>
      </div>
    </McCardHeader>

    <McCardHeader :title="$t('product.topRate')">
      <div class="w-full flex flex-col justify-center items-start py-4">
        <div
          class="flex justify-center items-center py-1 mt-2"
          v-for="(item, index) in 5"
          :key="index"
        >
          <IconStar></IconStar>
          <p class="text-black text-opacity-70 text-lg font-medium mx-4">5.0</p>
          <a-progress
            :show-text="false"
            size="large"
            :percent="0.8"
            :stroke-width="18"
            :style="{ width: '240px', height: '50px' }"
            class="!h-4 mc-progress"
          />
          <p class="text-[#AEAEAE] text-lg font-medium ml-4">{{ item }}k People</p>
        </div>
      </div>
    </McCardHeader>

    <McCardHeader :title="$t('product.feedback')">
      <div class="w-full py-4">
        <div class="w-full" v-for="(item, index) in 3" :key="index">
          <div class="flex justify-start items-center">
            <a-image
              width="44"
              height="44"
              class="!rounded-md"
              src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp"
            ></a-image>
            <p class="ml-4 text-black text-lg text-opacity-70 font-medium">Math Sarihas</p>
          </div>
          <a-typography-paragraph
            class="text-left !mt-4"
            :ellipsis="{
              suffix: '--Arco Design',
              rows: 2,
              expandable: true
            }"
          >
            <template #expand-node="{ expanded }">
              <span class="text-[#AEAEAE] font-medium">
                {{ expanded ? 'See Less' : 'See More' }}
              </span>
            </template>
            A design is a plan or specification for the construction of an object or system or for
            the implementation of an activity or process, or the result of that plan or
            specification in the form of a prototype, product or process. The verb to design
            expresses the process of developing a design. The verb to design expresses the process
            of developing a design.A design is a plan or specification for the construction of an
            object or system or for the implementation of an activity or process, or the result of
            that plan or specification in the form of a prototype, product or process. The verb to
            design expresses the process of developing a design. The verb to design expresses the
            process of developing a design.
          </a-typography-paragraph>
          <div class="flex justify-start items-center gap-x-4 overflow-x-scroll">
            <a-image
              width="105"
              height="105"
              class="!rounded-md"
              src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp"
              v-for="(_item, index) in 5"
              :key="index"
            ></a-image>
          </div>

          <div v-if="item !== 3" class="w-full h-[1px] bg-slate-400 my-4"></div>
        </div>
      </div>
    </McCardHeader>

    <McOrderCustomerTable> </McOrderCustomerTable>

    <McCardHeader :title="$t('product.totalOrder')">
      <div class="w-full py-4 flex justify-start items-center gap-x-6">
        <div
          class="w-[35%] flex justify-between items-center rounded-lg p-4 border border-[#007BE050]"
        >
          <div class="flex flex-col justify-start items-start">
            <p class="text-black text-opacity-70">{{ $t('product.itemsOrder') }}</p>
            <p class="text-[#3A3A3A] font-semibold text-[30px] mt-1">
              {{ product?.product?.orderCount }}
            </p>
          </div>
          <IconOrdered></IconOrdered>
        </div>
        <div
          class="w-[40%] flex justify-between items-center rounded-lg p-4 border border-[#007BE050]"
        >
          <div class="flex flex-col justify-start items-start">
            <p class="text-black text-opacity-70">{{ $t('product.itemsSold') }}</p>
            <p class="text-[#3A3A3A] font-semibold text-[30px] mt-1">
              {{ product?.product?.soldCount }}
            </p>
          </div>
          <IconOrderSold></IconOrderSold>
        </div>
      </div>
    </McCardHeader>
  </div>
</template>

<script setup lang="ts">
import { IProductItemList } from '~/constants/common'
import RouteName from '~/constants/router-name'
import { useProductStore } from '~/stores/product'
const route = useRoute()
const productStore = useProductStore()

const product = ref<IProductItemList | null>(null)

onMounted(async () => {
  const id = route.params.id as string
  const res = await productStore.getProductById(id)
  if (res) {
    product.value = res
  }
})
</script>

<style scoped>
.mc-progress :deep(.arco-progress-line-bar) {
  background: linear-gradient(45deg, #48b35e, #ff784e);
}

.mc-table :deep(tr:last-child td) {
  border-bottom: none;
}
</style>
