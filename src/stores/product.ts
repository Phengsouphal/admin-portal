import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {
  ICategoryListData,
  ICollectionList,
  ICollectionListData,
  IMeta,
  IProduct,
  IProductItemList
} from '~/constants/common'
import { deleteData, get, post, put } from '~/services/https'
import { Message } from '@arco-design/web-vue'

export const useProductStore = defineStore('product', () => {
  const router = useRouter()
  const productList = ref<IProductItemList[]>([])
  const productData = ref<IProduct | null>(null)

  const productMeta = ref<IMeta | null>(null)

  const productQueryData = ref({
    page: 1,
    pageSize: 10,
    search: '',
    categoryIds: '',
    collectionIds: ''
  })

  const allCategories = ref<ICategoryListData[]>([])
  const allCollection = ref<ICollectionListData[]>([])

  async function createProduct(product: IProduct) {
    const res = await post<any[]>('/v1/product', {
      ...product
    })
  }

  const getAllCateAndCollection = async () => {
    const resCate = await get<any[]>('/v1/category', {
      params: {
        limit: 1000,
        page: 1,
        search: ''
      }
    })
    if (resCate.message === 'success') {
      allCategories.value = resCate.data
    } else {
    }

    const resCollection = await get<any[]>('/v1/collection', {
      params: {
        limit: 1000,
        page: 1,
        search: ''
      }
    })
    if (resCollection.message === 'success') {
      allCollection.value = resCollection.data
    } else {
    }
    console.log(resCate, '----->>>>><<<<<>>>>>', resCollection)
  }

  async function getProductById(id?: string) {
    const res = await get<any>('/v1/product/' + id, {})
    if (res?.message == 'success') {
      return res.data
    }
  }

  const getProductList = async () => {
    const res = await get<any[]>('/v1/product', {
      params: {
        limit: productQueryData.value.pageSize,
        page: productQueryData.value.page,
        search: productQueryData.value.search,
        categoryIds: productQueryData.value.categoryIds || undefined,
        collectionIds: productQueryData.value.collectionIds || undefined
      }
    })
    if (res.message === 'success') {
      productList.value = res.data.map((item, index) => {
        return { ...item, key: `${index + 1}` }
      })
      productMeta.value = res.meta as any
    } else {
    }

    console.log(productList.value, '----->>>>><<<<<>>>>>')
  }

  async function deleteProductById(id?: string) {
    const res = await deleteData<any>('/v1/product/' + id, {})
    if (res?.message == 'success') {
      Message.success('Delete product successfully!')
    }
  }

  const onCreateProduct = async (
    categoryId: string,
    collectionIds: string[],
    des: string,
    discount: string,
    discountType: string,
    variants: any[]
  ) => {
    const res = await post<any[]>('/v1/product', {
      categoryId: categoryId,
      collectionIds: collectionIds,
      description: des,
      discount: discount == '' ? 0 : parseInt(discount),
      discountType: discountType,
      variants: variants
    })

    if (res.message == 'success') {
      Message.success('Product category Successfully')
      router.go(-1)
    } else {
      Message.error('Fail create product')
    }
  }

  const onEditProduct = async (
    id: string,
    categoryId: string,
    collectionIds: string[],
    des: string,
    discount: string,
    discountType: string,
    variants: any[]
  ) => {
    const res = await put<any>('/v1/product/' + id, {
      categoryId: categoryId,
      collectionIds: collectionIds,
      description: des,
      discount: parseInt(discount),
      discountType: discountType,
      variants: variants
    })

    if (res.message == 'success') {
      Message.success('Product edit Successfully')
      router.go(-1)
    } else {
      Message.error('Fail edit category')
    }
  }

  const onCreateCollectionFromProduct = async (name: string) => {
    const res = await post<any>('/v1/collection', {
      name: name,
      description: ' '
    })

    if (res.message == 'success') {
      Message.success('Create category Successfully')
      allCollection.value.push(res.data)
      console.log(res)
    } else {
      Message.error('Fail create category')
    }
  }

  return {
    productList,
    productQueryData,
    productData,
    allCategories,
    allCollection,
    productMeta,

    // Function
    getProductById,
    deleteProductById,
    getProductList,
    onCreateProduct,
    onEditProduct,
    createProduct,
    getAllCateAndCollection,
    onCreateCollectionFromProduct
  }
})
