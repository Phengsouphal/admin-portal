import { defineStore } from 'pinia'
import { ICustomerListData, IMeta } from '~/constants/common'
import { get, post, put } from '~/services/https'
import { Message } from '@arco-design/web-vue'
import router from '~/router'

export const useCustomerStore = defineStore('customer', () => {
  const customerList = ref<ICustomerListData[]>([])
  const customerMeta = ref<IMeta | null>(null)

  const customerQueryData = ref({
    page: 1,
    pageSize: 10,
    search: ''
  })

  async function getCustomerList(isBanned = false) {
    const res = await get<any[]>('/v1/store-customer/', {
      params: {
        limit: customerQueryData.value.pageSize,
        page: customerQueryData.value.page,
        search: customerQueryData.value.search,
        isBanned: isBanned
      }
    })
    if (res?.message == 'success') {
      customerList.value = res.data.map((item, index) => {
        return { ...item, key: `${index + 1}` }
      })
      customerMeta.value = res.meta as any
    }
  }

  async function getCustomerById(id?: string) {
    const res = await get<any>('/v1/store-customer/' + id, {})
    if (res?.message == 'success') {
      return res.data
    }
  }

  const onBanCustomer = async (id?: string, ban = true) => {
    const res = await put<any>('/v1/store-customer/' + id + '/banning', {
      isBanned: true
    })
    console.log(res)
    if (res.message == 'success') {
      Message.success('Banned customer successfully')
      router.go(-1)
    } else {
      Message.error('Fail to ban customer')
    }
  }

  return {
    customerList,
    customerMeta,
    customerQueryData,
    // Function

    getCustomerList,
    getCustomerById,
    onBanCustomer
  }
})
