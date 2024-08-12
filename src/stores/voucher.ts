import { defineStore } from 'pinia'
import {
  IMeta,
  IRoleData,
  IRolePermissionData,
  IVoucherCreateData,
  IVoucherListData
} from '~/constants/common'
import { deleteData, get, post, put } from '~/services/https'
import { Message } from '@arco-design/web-vue'
import router from '~/router'
import dayjs from 'dayjs'

export const useVoucherStore = defineStore('voucher', () => {
  const voucherList = ref<IVoucherListData[]>([])
  const voucherMeta = ref<IMeta | null>(null)

  const showBrowseCustomer = ref(false)

  const voucherQueryData = ref({
    page: 1,
    pageSize: 10,
    search: ''
  })

  async function getVoucherList() {
    const res = await get<any[]>('/v1/voucher', {
      params: {
        limit: voucherQueryData.value.pageSize,
        page: voucherQueryData.value.page,
        search: voucherQueryData.value.search
      }
    })
    if (res?.message == 'success') {
      voucherList.value = res.data.map((item, index) => {
        return { ...item, key: item._id }
      })
      voucherMeta.value = res.meta as any
    }
  }

  async function getVoucherById(id: string) {
    const res = await get<any>('/v1/voucher/' + id, {})
    console.log(res.data)

    if (res?.message == 'success') {
      return res?.data
    }
  }

  const onCreateVoucher = async (data: IVoucherCreateData) => {
    const res = await post<any>('/v1/voucher', {
      ...data,
      minPurchaseAmount: data.minPurchaseAmount || 100000,
      startAt: dayjs(data.startAt)?.toISOString(),
      endAt: dayjs(data.endAt)?.toISOString()
    })
    console.log(res)
    if (res.message == 'success') {
      Message.success('Create voucher Successfully')
      router.go(-1)
    } else {
      Message.error('Fail create voucher')
    }
  }

  const onEditVoucher = async (data: IVoucherCreateData, id?: string) => {
    const res = await put<any>('/v1/voucher/' + id, {
      ...data,
      minPurchaseAmount: data.minPurchaseAmount || 100000,
      startAt: dayjs(data.startAt)?.toISOString(),
      endAt: dayjs(data.endAt)?.toISOString()
    })
    console.log(res)
    if (res.message == 'success') {
      Message.success('Edited voucher successfully')
      router.go(-1)
    } else {
      Message.error('Fail to edit voucher')
    }
  }

  async function deleteVoucherId(id?: string) {
    const res = await deleteData<any>('/v1/voucher/' + id, {})
    if (res?.message == 'success') {
      Message.success('Delete voucher successfully!')
    }
  }

  async function getVoucherCustomer() {
    const res = await get<any[]>('/v1/store-customer/', {
      params: {
        limit: 1000,
        page: 1,
        isBanned: false
      }
    })

    if (res?.message == 'success') {
      return res.data
    }
  }

  return {
    voucherList,
    voucherMeta,
    voucherQueryData,
    showBrowseCustomer,
    // Function

    getVoucherList,
    getVoucherById,
    onCreateVoucher,
    onEditVoucher,
    deleteVoucherId,
    getVoucherCustomer
  }
})
