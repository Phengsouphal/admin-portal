<template>
  <div class="w-full h-full px-6 pt-5">
    <McTitle
      :title="$t('report.productReport')"
      :hasBtnAdd="true"
      :btn-txt="$t('button.downloadReport')"
      @on-click=""
      typeIcon="download"
    >
    </McTitle>
    <McCard
      v-if="list.length === 0"
      :hasBtnAdd="false"
      :title="$t('report.noProductReport')"
      :subTitle="$t('report.youHaveNotProductReport')"
    >
      <template #icon>
        <IconConfirmOrderEmpty></IconConfirmOrderEmpty>
      </template>
    </McCard>
    <div class="w-full h-full">
      <a-row class="grid-demo" :gutter="{ md: 8, lg: 24, xl: 32 }">
        <a-col :span="6" v-for="(item, index) in 4" :key="index">
          <div class="ddd bg-white flex justify-between items-center p-5 rounded-lg">
            <div class="text-left">
              <p class="text-[#6B7280] text-sm">
                {{
                  item == 1
                    ? $t('report.totalProduct')
                    : item == 2
                      ? $t('report.totalCategory')
                      : item == 3
                        ? $t('report.totalView')
                        : $t('report.totalRates')
                }}
              </p>
              <p class="text-[#111827] text-3xl font-semibold mt-2">
                {{
                  item == 1
                    ? productOverall.totalProducts
                    : item == 2
                      ? productOverall.totalCategories
                      : item == 3
                        ? productOverall.totalViews
                        : productOverall.totalFeedbacks
                }}
              </p>
            </div>
            <IconReportProduct v-if="item == 1"></IconReportProduct>
            <IconReportCategory v-else-if="item == 2"></IconReportCategory>
            <IconReportView v-else-if="item == 3"></IconReportView>
            <IconReportRate v-else-if="item == 4"></IconReportRate>
          </div>
        </a-col>
        <!-- <a-col :span="6">
          <div class="ddd bg-white flex justify-between items-center">
            <div></div>
            <IconReportCategory></IconReportCategory>
          </div>
        </a-col>
        <a-col :span="6">
          <div class="ddd bg-white flex justify-between items-center">
            <div></div>
            <IconReportView></IconReportView>
          </div>
        </a-col>
        <a-col :span="6">
          <div class="ddd bg-white flex justify-between items-center">
            <div></div>
            <IconReportRate></IconReportRate>
          </div>
        </a-col> -->
      </a-row>

      <div class="w-full mt-6">
        <a-row class="grid-demo" :gutter="{ md: 8, lg: 24, xl: 32 }">
          <a-col :span="12">
            <div class="w-full min-h-[375px] p-4 bg-white border border-[#D9D9D9] rounded-2xl">
              <McReportPicker
                v-model="ddd"
                :title="$t('report.top5FavoriteProduct')"
              ></McReportPicker>
              <McReportTable
                :list-count="productMostFavorite.map((item) => item.totalFavorite)"
                :list-product-name="
                  productMostFavorite.map((item) => item.productDetail?.variants?.[0]?.name)
                "
                :lastColTitle="$t('common.favorite')"
                typeRank="rank"
                class="mt-6"
              ></McReportTable>
            </div>
          </a-col>
          <a-col :span="12">
            <div class="w-full min-h-[375px] p-4 bg-white border border-[#D9D9D9] rounded-2xl">
              <McReportPicker :title="$t('report.percentageOfProductRating')"></McReportPicker>

              <div class="w-full h-full mt-6 flex flex-col justify-center items-center">
                <VChart
                  :loading="data.loadingPieChart"
                  style="height: 280px; width: 100%"
                  ref="pieChartRef"
                  class="chart"
                  autoresize
                  :option="data.pieChartOpt"
                  @click="onPieChartClick"
                  @legendselectchanged="onLegendSelectedChange"
                />
              </div>
            </div>
          </a-col>
        </a-row>
      </div>
      <div class="w-full mt-6">
        <a-row class="grid-demo" :gutter="{ md: 8, lg: 24, xl: 32 }">
          <a-col :span="12">
            <div class="w-full min-h-[375px] p-4 bg-white border border-[#D9D9D9] rounded-2xl">
              <McReportPicker :title="$t('report.top5ViewProduct')"></McReportPicker>
              <McReportTable
                :list-count="productMostView.map((item) => item.totalViews)"
                :list-product-name="
                  productMostView.map((item) => item.productDetail?.variants?.[0]?.name)
                "
                :lastColTitle="$t('common.viewed')"
                typeRank="rank"
                class="mt-6"
              ></McReportTable>
            </div>
          </a-col>
          <a-col :span="12">
            <div class="w-full min-h-[375px] p-4 bg-white border border-[#D9D9D9] rounded-2xl">
              <McReportPicker :title="$t('report.top5RateProduct')"></McReportPicker>
              <McReportTable
                :list-count="productMostRated.map((item) => item.totalStars)"
                :list-product-name="
                  productMostRated.map((item) => item.productDetail?.variants?.[0]?.name)
                "
                :lastColTitle="$t('common.itemSold')"
                class="mt-6"
              ></McReportTable>
            </div>
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { IProductItemList } from '~/constants/common'
import { useStatisticStore } from '~/stores/statistic'
import VChart from 'vue-echarts'

const list = ref([1])
const ddd = ref(dayjs().format('YYYY-MM-DD'))

const data = reactive({
  loadingPieChart: false,
  pieChartOpt: {
    title: {
      text: '',
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      right: 30,
      top: 'center'
    },
    series: [
      {
        name: 'Sell Statistic',
        type: 'pie',
        radius: ['40%', '80%'],
        data: [
          // { value: 335, name: '1.0' },
          // { value: 310, name: '2.0' },
          // { value: 234, name: '3.0' },
          // { value: 135, name: '4.0' },
          // { value: 1548, name: '5.0' }
        ] as any[],
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold'
          }
        }
      }
    ]
  }
})

const productOverall = ref({
  totalCategories: 0,
  totalFeedbacks: 0,
  totalProducts: 0,
  totalViews: 0
})

const productMostView = ref<{ productDetail: IProductItemList; totalViews: number }[]>([])
const productMostFavorite = ref<{ productDetail: IProductItemList; totalFavorite: number }[]>([])
const productMostRated = ref<{ productDetail: IProductItemList; totalStars: number }[]>([])

const statisticStore = useStatisticStore()

const onLegendSelectedChange = (params: any) => {
  console.log(params)
}

const onPieChartClick = (params: any) => {
  console.log(params)
}

onMounted(async () => {
  data.loadingPieChart = true
  const resRatings = await statisticStore.getProductRatings()
  const resMostFavorite = await statisticStore.getProductMostFavorite()
  const resRated = await statisticStore.getProductMostRated()
  const resMostView = await statisticStore.getProductMostView()
  const resOverall = await statisticStore.getProductStatisticOverall()
  data.loadingPieChart = false

  if (resRatings) {
    resRatings.forEach((item: any) => {
      data.pieChartOpt.series[0].data.push({ value: item.totalReviews, name: '0.' + item.rating })
    })
  }
  if (resMostFavorite) {
    productMostFavorite.value = resMostFavorite
  }
  if (resMostView) {
    productMostView.value = resMostView
  }
  if (resOverall) {
    productOverall.value = {
      ...resOverall
    }
  }
  if (resRated) {
    productMostRated.value = resRated
  }
})
</script>

<style scoped>
.card-title {
  @apply text-xl font-semibold text-black;
}

.ddd {
  box-shadow: 0px 1px 2px 0px #0000000f;
  box-shadow: 0px 1px 3px 0px #0000001a;
}
</style>
