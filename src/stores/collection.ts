import { defineStore } from 'pinia'
import {
  ICollectionData,
  ICollectionList,
  ICollectionListData,
  IProduct,
  IProductItemList
} from '~/constants/common'
import { deleteData, get, post, put } from '~/services/https'
import { Message } from '@arco-design/web-vue'

export const useCollectionStore = defineStore('collection', () => {
  const router = useRouter()
  const collectionList = ref<ICollectionListData[]>([])
  const collectionData = ref<ICollectionListData | null>(null)
  const collectionQueryData = ref({
    page: 1,
    pageSize: 10,
    search: ''
  })

  const proList = ref<IProductItemList[]>([])
  const proQueryData = ref({
    page: 1,
    pageSize: 10,
    search: ''
  })

  const onCreateCollection = async (name: string, des: string, isActive: boolean) => {
    const res = await post<any[]>('/v1/collection', {
      name: name,
      description: des,
      status: isActive ? 'ACTIVE' : 'INACTIVE'
    })

    if (res.message == 'success') {
      Message.success('Create category Successfully')
      router.go(-1)
    } else {
      Message.error('Fail create category')
    }
  }

  const onEditCollection = async (name: string, des: string, isActive: boolean, id: string) => {
    const res = await put<any>('/v1/collection/' + id, {
      name: name,
      description: des,
      status: isActive ? 'ACTIVE' : 'INACTIVE'
    })
    if (res.message == 'success') {
      Message.success('Edit category Successfully')
    } else {
      Message.error('Fail edit category')
    }
  }

  async function deleteCollectionById(id?: string) {
    const res = await deleteData<any>('/v1/collection/' + id, {})
    if (res?.message == 'success') {
      Message.success('Delete category successfully!')
    }
  }

  async function getCollectionById(id?: string) {
    const res = await get<any>('/v1/collection/' + id, {})
    if (res?.message == 'success') {
      return res.data
    }
  }

  async function getAddCollection() {
    const res = await get<any[]>('/v1/collection', {
      params: {
        limit: 10000,
        page: 1
      }
    })
    if (res?.message == 'success') {
      return res.data
    }
    return null
  }

  async function getCollectionList(search = '') {
    const res = await get<any[]>('/v1/collection', {
      params: {
        limit: collectionQueryData.value.pageSize,
        page: collectionQueryData.value.page,
        search: collectionQueryData.value.search
      }
    })
    if (res?.message == 'success') {
      collectionList.value = [...res.data]
    }
    // if (res?.statusCode == 200) {
    //   groupFaqList.value = res.data
    // }
  }

  async function getProductNotInCollection(collectId?: string) {
    const res = await get<any[]>('/v1/product', {
      params: {
        limit: collectionQueryData.value.pageSize,
        page: collectionQueryData.value.page,
        notCollectionIds: collectId
      }
    })
    if (res?.message == 'success') {
      console.log(res.data)
      proList.value = res.data
    } else {
    }
  }

  async function getProductInCollection(collectId?: string) {
    const res = await get<any[]>('/v1/product', {
      params: {
        limit: 100,
        page: 1,
        collectionIds: collectId
      }
    })
    if (res?.message == 'success') {
      console.log(res.data)
      return res.data
    } else {
    }
  }

  async function setProductsCollection(productIds: string[], collectionId?: string) {
    const res = await put<any[]>('/v1/collection/' + collectionId + '/set-product', {
      productIds: productIds
    })

    if (res.message == 'success') {
      Message.success("Set product's collection Successfully")
    } else {
      Message.error("Fail to set product's collection")
    }
  }

  return {
    collectionList,
    collectionData,
    proList,
    proQueryData,
    collectionQueryData,
    // Function

    deleteCollectionById,
    getCollectionById,
    getCollectionList,
    onCreateCollection,
    onEditCollection,
    getProductNotInCollection,
    setProductsCollection,
    getProductInCollection,
    getAddCollection
  }
})
