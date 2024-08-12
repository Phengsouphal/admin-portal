import { defineStore } from 'pinia'
import { IDiscountCreateData, IDiscountListData, IMeta } from '~/constants/common'
import { deleteData, get, post, put } from '~/services/https'
import { Message } from '@arco-design/web-vue'
import router from '~/router'
import dayjs from 'dayjs'

export const useDiscountStore = defineStore('discount', () => {
  const discountList = ref<IDiscountListData[]>([])
  const discountMeta = ref<IMeta | null>(null)

  const showBrowseProduct = ref(false)

  const discountQueryData = ref({
    page: 1,
    pageSize: 10,
    search: ''
  })

  async function getDiscountList() {
    const res = await get<any[]>('/v1/discount', {
      params: {
        limit: discountQueryData.value.pageSize,
        page: discountQueryData.value.page,
        search: discountQueryData.value.search
      }
    })
    if (res?.message == 'success') {
      discountList.value = res.data.map((item, index) => {
        return { ...item, key: item._id }
      })
      discountMeta.value = res.meta as any
    }
  }

  async function getDiscountById(id: string) {
    const res = await get<any>('/v1/discount/' + id, {})
    console.log(res.data)

    if (res?.message == 'success') {
      return res?.data
    }
  }

  const onCreateDiscount = async (data: IDiscountCreateData) => {
    const res = await post<any>('/v1/discount', {
      ...data,
      startAt: dayjs(data.startAt)?.toISOString(),
      endAt: dayjs(data.endAt)?.toISOString()
    })
    console.log(res)
    if (res.message == 'success') {
      Message.success('Create discount Successfully')
      router.go(-1)
    } else {
      Message.error('Fail create discount')
    }
  }

  const onEditDiscount = async (data: IDiscountCreateData, id?: string) => {
    const res = await put<any>('/v1/discount/' + id, {
      ...data,
      startAt: dayjs(data.startAt)?.toISOString(),
      endAt: dayjs(data.endAt)?.toISOString()
    })
    console.log(res)
    if (res.message == 'success') {
      Message.success('Edited discount successfully')
      router.go(-1)
    } else {
      Message.error('Fail to edit discount')
    }
  }

  async function deleteDiscountId(id?: string) {
    const res = await deleteData<any>('/v1/discount/' + id, {})
    if (res?.message == 'success') {
      Message.success('Delete discount successfully!')
    }
  }

  async function getDiscountProduct(search = '') {
    const res = await get<any[]>('/v1/product', {
      params: {
        limit: 1000,
        page: 1,
        search: search
      }
    })

    if (res?.message == 'success') {
      return res.data
    }
  }

  return {
    discountList,
    discountMeta,
    discountQueryData,
    showBrowseProduct,
    // Function

    getDiscountList,
    getDiscountById,
    onCreateDiscount,
    onEditDiscount,
    deleteDiscountId,
    getDiscountProduct
  }
})
