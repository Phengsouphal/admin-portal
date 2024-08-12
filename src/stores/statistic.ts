import { defineStore } from 'pinia'
import { get } from '~/services/https'

export const useStatisticStore = defineStore('statistic', () => {
  async function getCategoryMostSold(startDate = undefined, endDate = undefined) {
    const res = await get<any>('/v1/statistic/category/most-sold', {
      params: {
        startDate: startDate,
        endDate: endDate
      }
    })
    if (res?.message == 'success') {
      return res.data
    }
  }

  async function getOrderHistorical(year: number) {
    const res = await get<any>('/v1/statistic/order/historical', {
      params: {
        year: year
      }
    })
    if (res?.message == 'success') {
      return res.data
    }
  }

  async function getOrderStatisticOverall() {
    const res = await get<any>('/v1/statistic/order/overall', {})
    if (res?.message == 'success') {
      return res.data
    }
  }

  async function getProductMostFavorite(startDate = undefined, endDate = undefined) {
    const res = await get<any>('/v1/statistic/product/most-favorite', {
      params: {
        startDate: startDate,
        endDate: endDate
      }
    })
    if (res?.message == 'success') {
      return res.data
    }
  }

  async function getProductMostRated(startDate = undefined, endDate = undefined) {
    const res = await get<any>('/v1/statistic/product/most-rated', {
      params: {
        startDate: startDate,
        endDate: endDate
      }
    })
    if (res?.message == 'success') {
      return res.data
    }
  }

  async function getProductRatings(startDate = undefined, endDate = undefined) {
    const res = await get<any>('/v1/statistic/product/ratings', {
      params: {
        startDate: startDate,
        endDate: endDate
      }
    })
    if (res?.message == 'success') {
      return res.data
    }
  }

  async function getProductMostSold(startDate = undefined, endDate = undefined) {
    const res = await get<any>('/v1/statistic/product/most-sold', {
      params: {
        startDate: startDate,
        endDate: endDate
      }
    })
    if (res?.message == 'success') {
      return res.data
    }
  }

  async function getProductMostView(startDate = undefined, endDate = undefined) {
    const res = await get<any>('/v1/statistic/product/most-viewed', {
      params: {
        startDate: startDate,
        endDate: endDate
      }
    })
    if (res?.message == 'success') {
      return res.data
    }
  }

  async function getProductStatisticOverall() {
    const res = await get<any>('/v1/statistic/product/overall', {})
    if (res?.message == 'success') {
      return res.data
    }
  }

  async function getStoreStatisticOverall() {
    const res = await get<any>('/v1/statistic/product/overall', {})
    if (res?.message == 'success') {
      return res.data
    }
  }
  return {
    // Function

    getOrderHistorical,
    getCategoryMostSold,
    getOrderStatisticOverall,
    getProductMostFavorite,
    getProductMostRated,
    getProductMostSold,
    getProductMostView,
    getProductStatisticOverall,
    getProductRatings,
    getStoreStatisticOverall
  }
})
