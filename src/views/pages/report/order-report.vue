<template>
  <div class="w-full h-full px-6 pt-5">
    <McTitle
      :title="$t('report.orderReport')"
      :hasBtnAdd="true"
      :btn-txt="$t('button.downloadReport')"
      @on-click=""
      typeIcon="download"
    >
    </McTitle>
    <McCard
      v-if="list.length === 0"
      :hasBtnAdd="false"
      title="No Order Report"
      subTitle="You haven’t gotten any orders yet"
    >
      <template #icon>
        <IconConfirmOrderEmpty></IconConfirmOrderEmpty>
      </template>
    </McCard>
    <div class="w-full h-full">
      <a-row class="grid-demo" :gutter="{ md: 8, lg: 24, xl: 32 }">
        <a-col :span="8" v-for="(item, index) in 3" :key="index">
          <div class="ddd bg-white flex justify-between items-center p-5 rounded-lg">
            <div class="text-left">
              <p class="text-[#6B7280] text-sm">
                {{
                  item == 1
                    ? $t('report.totalProduct')
                    : item == 2
                      ? $t('product.totalOrder')
                      : item == 3
                        ? $t('common.totalSold')
                        : ''
                }}
              </p>
              <p class="text-[#111827] text-3xl font-semibold mt-2">
                {{
                  item === 1
                    ? overall.totalCategories
                    : item === 2
                      ? overall.totalViews
                      : overall.totalCategories
                }}
              </p>
            </div>
            <IconReportProduct v-if="item == 1"></IconReportProduct>
            <IconReportOrder v-else-if="item == 2"></IconReportOrder>
            <IconReportItemSold v-else-if="item == 3"></IconReportItemSold>
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
        <div class="w-full min-h-[375px] p-4 bg-white border border-[#D9D9D9] rounded-2xl">
          <McReportPicker
            :title="$t('report.historicalProductsOrdered')"
            :is-year-picker="true"
            v-model="yearPic"
          ></McReportPicker>
          <div class="w-full relative">
            <div
              class="rotate-text h-full absolute left-0 text-black text-opacity-70 font-semibold text-base"
            >
              <p>{{ $t('report.amountOfOrder') }}</p>
            </div>
            <VChart
              :loading="data.loadingPieChart"
              style="height: 350px; width: 100%"
              ref="lineChartRef"
              class="line"
              autoresize
              :option="data.lineChartOpt"
              @click="onPieChartClick"
              @legendselectchanged="onLegendSelectedChange"
            />
          </div>
        </div>
      </div>
      <div class="w-full mt-6">
        <a-row class="grid-demo" :gutter="{ md: 8, lg: 24, xl: 32 }">
          <a-col :span="12">
            <div class="w-full min-h-[375px] p-4 bg-white border border-[#D9D9D9] rounded-2xl">
              <McReportPicker :title="$t('report.top5PopularCategory')"></McReportPicker>
              <McReportTable
                :list-count="cateMostSold.map((item) => item.soldCount)"
                :list-product-name="cateMostSold.map((item) => item.categoryDetail.category.name)"
                :lastColTitle="$t('common.viewed')"
                typeRank="rank"
                class="mt-6"
              ></McReportTable>
            </div>
          </a-col>
          <a-col :span="12">
            <div class="w-full min-h-[375px] p-4 bg-white border border-[#D9D9D9] rounded-2xl">
              <McReportPicker :title="$t('report.top5BestSellProduct')"></McReportPicker>
              <McReportTable
                :lastColTitle="$t('common.itemSold')"
                class="mt-6"
                :list-count="productMostSold.map((item) => item.soldCount)"
                :list-product-name="
                  productMostSold.map((item) => item.productDetail.variants?.[0]?.name)
                "
              ></McReportTable>
            </div>
          </a-col>
        </a-row>
      </div>
      <div class="w-full mt-6">
        <div class="w-full min-h-[375px] p-4 bg-white border border-[#D9D9D9] rounded-2xl">
          <McReportPicker :title="$t('report.historicalProductsOrdered')"></McReportPicker>
          <div class="w-full"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { ICategoryListData, IProductItemList } from '~/constants/common'
import { useStatisticStore } from '~/stores/statistic'
import VChart from 'vue-echarts'

const statisticStore = useStatisticStore()
const date = ref(dayjs().format('YYYY-MM-DD'))
const yearPic = ref(dayjs().format('YYYY'))

const data = reactive({
  loadingPieChart: false,
  lineChartOpt: {
    title: {
      show: false
    },
    tooltip: {
      trigger: 'item',
      formatter: function (params: any) {
        return `Sell Per-month <br/>${params.name} : ${params.data.value}$ (${params.data.count} sold)`
      }
    },
    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Sell Per-month',
        itemStyle: {
          borderRadius: 6,
          color: '#ff784e'
        },
        data: [] as any[],
        type: 'bar'
      }
    ]
  }
})

const overall = ref({
  totalCategories: 0,
  totalFeedbacks: 0,
  totalProducts: 0,
  totalViews: 0
})

const cateMostSold = ref<{ categoryDetail: ICategoryListData; soldCount: number }[]>([])
const productMostSold = ref<{ productDetail: IProductItemList; soldCount: number }[]>([])

const list = ref([1])

const onLegendSelectedChange = (params: any) => {
  console.log(params)
}

const onPieChartClick = (params: any) => {
  console.log(params)
}

onMounted(async () => {
  const year = parseInt(dayjs(date.value).format('YYYY'))
  const resOrderHistorical = await statisticStore.getOrderHistorical(year)
  const res2 = await statisticStore.getOrderStatisticOverall()
  const resMostCateSold = await statisticStore.getCategoryMostSold()
  const resMostProductSold = await statisticStore.getProductMostSold()
  if (resOrderHistorical) {
    resOrderHistorical.forEach((item: any) => {
      data.lineChartOpt.series[0].data.push({ value: item.amount, count: item.count })
    })
  }

  if (res2) {
    overall.value = res2
  }
  if (resMostCateSold) {
    cateMostSold.value = resMostCateSold
  }
  if (resMostProductSold) {
    productMostSold.value = resMostProductSold
  }
})
</script>

<style scoped>
.rotate-text {
  writing-mode: vertical-lr;
  transform: scale(-1, -1);
}
</style>
