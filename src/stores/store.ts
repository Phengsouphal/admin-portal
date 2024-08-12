import { defineStore } from 'pinia'
import { IStore } from '~/constants/common'
import { get, post, put } from '~/services/https'
import { Message } from '@arco-design/web-vue'
import router from '~/router'
import dayjs from 'dayjs'

export const useStoreStore = defineStore('store', () => {
  const store = ref<IStore | null>(null)

  async function getStore() {
    const res = await get<any>('/v1/store/', {})
    if (res?.message == 'success') {
      store.value = res.data?.store
      return res.data
    }
  }

  const onEditStore = async () => {
    const res = await put<any>('/v1/store/', {
      ...store.value,
      tempCloseStart: dayjs(store.value?.tempCloseStart || dayjs()).toISOString(),
      tempCloseEnd: dayjs(store.value?.tempCloseEnd || dayjs()).toISOString()
    })
    console.log(res)
    if (res.message == 'success') {
      Message.success('Edited Store successfully')
    } else {
      Message.error('Fail to edit store')
    }
  }

  return {
    store,
    // Function

    onEditStore,
    getStore
  }
})
