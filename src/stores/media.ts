import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { get, post } from '~/services/https'

export const useMediaStore = defineStore('media', () => {
  const createMedia = async (name: string, type: string, url: string) => {
    const data = {
      url: url,
      fileType: type,
      fileName: name
    }
    const res = await post<any>('/v1/media', data)
    console.log(res)
    return res
  }

  async function getMediaById(id?: string) {
    const res = await get<any>('/v1/media/' + id, {})
    if (res?.message == 'success') {
      return res.data
    }
  }

  return {
    // Function
    createMedia,
    getMediaById
  }
})
