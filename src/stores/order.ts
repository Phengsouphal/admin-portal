import { defineStore } from 'pinia'
import { IMeta, IOrderItemList, IProductItemList, OrderStatusEnum } from '~/constants/common'
import { deleteData, get, post, put } from '~/services/https'
import { Message } from '@arco-design/web-vue'
import { status } from 'nprogress'

export const useOrderStore = defineStore('order', () => {
  const router = useRouter()

  const orderList = ref<IOrderItemList[]>([])
  const orderMeta = ref<IMeta | null>(null)
  const orderQueryData = ref({
    page: 1,
    pageSize: 10,
    status: 'All',
    search: ''
  })

  const orderComingList = ref<IOrderItemList[]>([])
  const comingMeta = ref<IMeta | null>(null)
  const comingQueryData = ref({
    page: 1,
    pageSize: 10,
    status: OrderStatusEnum.PENDING,
    search: ''
  })

  async function getOrderById(id?: string) {
    const res = await get<any>('/v1/order/' + id, {})
    if (res?.message == 'success') {
      return res.data
    }
  }

  const getComingOrderList = async () => {
    const res = await get<any[]>('/v1/order', {
      params: {
        limit: comingQueryData.value.pageSize,
        page: comingQueryData.value.page,
        statuses: comingQueryData.value.status,
        search: comingQueryData.value.search
      }
    })
    if (res.message === 'success') {
      orderComingList.value = res.data.map((item, index) => {
        return { ...item, key: `${index + 1}` }
      })
      comingMeta.value = res.meta as any
    } else {
    }
    console.log(orderComingList.value, '----->>>>><<<<<>>>>>')
  }

  const getOrderList = async () => {
    const statusList = [
      OrderStatusEnum.CANCELED,
      OrderStatusEnum.COMPLETED,
      OrderStatusEnum.CONFIRMED,
      OrderStatusEnum.FAILED,
      OrderStatusEnum.REJECTED
    ]
    const newStatus = orderQueryData.value.status === 'All' ? statusList?.join(',') : ''
    const res = await get<any[]>('/v1/order', {
      params: {
        limit: orderQueryData.value.pageSize,
        page: orderQueryData.value.page,
        statuses: newStatus,
        search: orderQueryData.value.search
      }
    })
    if (res.message === 'success') {
      orderList.value = res.data.map((item, index) => {
        return { ...item, key: `${index + 1}` }
      })
      orderMeta.value = res.meta as any
    } else {
    }
    console.log(orderList.value, '----->>>>><<<<<>>>>>')
  }

  async function getOrderStats(customerId?: string) {
    const res = await get<any>('/v1/order/stats', {
      params: {
        customerId: customerId
      }
    })
    if (res?.message == 'success') {
      Message.success('Delete product successfully!')
    }
  }

  const onApproveOrder = async (id: string) => {
    const res = await post<any>('/v1/order/' + id + '/approval', {
      confirm: true,
      remark: 'string'
    })
    if (res.message == 'success') {
      Message.success('Product category Successfully')
      router.go(-1)
    } else {
      Message.error('Fail create product')
    }
  }

  const onFinalizeOrder = async (id: string) => {
    const res = await post<any>('/v1/order/' + id + '/fanalize', {})
    if (res.message == 'success') {
      Message.success('Product category Successfully')
      router.go(-1)
    } else {
      Message.error('Fail create product')
    }
  }

  return {
    orderList,
    orderQueryData,
    orderMeta,

    comingMeta,
    comingQueryData,
    orderComingList,

    // Function
    getOrderById,
    getOrderList,
    getComingOrderList,
    onApproveOrder,
    onFinalizeOrder,
    getOrderStats
  }
})
