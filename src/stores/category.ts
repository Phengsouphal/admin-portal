import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { ICategoryData, ICategoryListData, IMeta, IProduct } from '~/constants/common'
import { deleteData, get, post, put } from '~/services/https'
import { Message } from '@arco-design/web-vue'
import router from '~/router'
import { useProductStore } from './product'

export const useCategoryStore = defineStore('category', () => {
  const productStore = useProductStore()
  const cateList = ref<ICategoryListData[]>([])
  const cateMeta = ref<IMeta | null>(null)

  const cateData = ref<ICategoryData | null>(null)
  const cateQueryData = ref({
    page: 1,
    pageSize: 10,
    search: ''
  })

  const onCreateCate = async (name: string, des: string, imgId: string, fromModal = false) => {
    const res = await post<any>('/v1/category', {
      name: name,
      description: des,
      imageId: imgId
    })
    if (res.message == 'success') {
      Message.success('Create category Successfully')
      if (!fromModal) {
        router.go(-1)
      } else {
        const resCreateCate = await getCategoryById(res?.data?._id)
        if (resCreateCate) {
          console.log(resCreateCate)

          productStore.allCategories = [resCreateCate, ...productStore.allCategories]
        }
      }
    } else {
      Message.error('Fail create category')
    }
  }

  const onEditCategory = async (name: string, des: string, imgId: string, id: string) => {
    const res = await put<any>('/v1/category/' + id, {
      name: name,
      description: des,
      imageId: imgId
    })
    if (res.message == 'success') {
      Message.success('Edit category Successfully')
      router.go(-1)
    } else {
      Message.error('Fail edit category')
    }
  }

  async function getCategoryById(id?: string) {
    const res = await get<any>('/v1/category/' + id, {})
    if (res?.message == 'success') {
      return res.data
    }
  }

  async function deleteCateById(id?: string) {
    const res = await deleteData<any>('/v1/category/' + id, {})
    if (res?.message == 'success') {
      Message.success('Delete category successfully!')
    }
  }

  async function getCateList(search = '') {
    const res = await get<any[]>('/v1/category', {
      params: {
        limit: cateQueryData.value.pageSize,
        page: cateQueryData.value.page,
        search: cateQueryData.value.search
      }
    })
    if (res?.message == 'success') {
      cateMeta.value = res.meta as any
      cateList.value = [...res.data]
    }
  }

  async function getCateAll() {
    const res = await get<any[]>('/v1/category', {
      params: {
        limit: 1000,
        page: 1
      }
    })
    console.log(res)
    if (res?.message == 'success') {
      return res.data
    }
    return null
  }

  return {
    cateList,
    cateData,
    cateMeta,
    cateQueryData,
    // Function

    deleteCateById,
    getCateList,
    onCreateCate,
    onEditCategory,
    getCategoryById,
    getCateAll
  }
})
