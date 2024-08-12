import axios, { AxiosInstance, AxiosResponse } from 'axios'

// import forge from 'node-forge'
import { useAuthStore } from '~/stores/auth'
// import {
//   decryptAES128WithSecret,
//   encryptAES128WithSecret,
//   encryptOAEP,
//   toBase64
// } from '~/utils/aes'

// Create a new instance of Axios with a base URL
const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URI
})

// @param url
// @param data
// @param file
// @param auth
// get request
type Response<T> = {
  data: T
  meta: T
  statusCode: number
  message: string
}

// Add an interceptor to handle requests
instance.interceptors.request.use(
  async (config) => {
    // Modify the request config here if needed
    // get url
    const url = config.url
    // get data
    const data = config.data
    // get params
    const params = config.params

    // if (url?.includes('admin')) {
    //   // handle encrypt request
    //   let sessionKey = useStorage('sessionKey', '')

    //   if (!sessionKey.value) {
    //     await handleCreateSession()
    //     sessionKey = useStorage('sessionKey', '')
    //   }
    //   if (data && Object.keys(typeof data == 'string' ? JSON.parse(data) : data).length > 0) {
    //     const pd = typeof data == 'string' ? JSON.parse(data) : data
    //     if (!pd.encrypted) {
    //       try {
    //         const encrypted = encryptAES128WithSecret(data, sessionKey.value || '')
    //         config.data = {
    //           encrypted
    //         }
    //       } catch (error) {
    //         config.data = {}
    //       }
    //     }
    //   }
    //   if (params && Object.keys(params).length > 0) {
    //     if (!params.encrypted) {
    //       const data: any = {}
    //       Object.keys(params).forEach((key) => {
    //         data[key] = params[key]
    //         delete params[key]
    //       })
    //       try {
    //         const encrypted = encryptAES128WithSecret(data, sessionKey.value || '')
    //         config.params['encrypted'] = encrypted
    //       } catch (error) {
    //         config.params['encrypted'] = ''
    //       }
    //     }
    //   }
    // }
    return config
  },
  (error) => {
    // Handle request error here
    return Promise.reject(error)
  }
)

// Add an interceptor to handle response
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Re-perform the request if HTTP status is 401
    if (error.response && error.response.status === 401 && !error.config._retry) {
      try {
        // Perform create session request
        // const oldSessionKey = localStorage.getItem('sessionKey')
        await handleRefreshToken()
        const originalRequest = error.config
        originalRequest._retry = true
        const authStore = useAuthStore()
        originalRequest.headers['Authorization'] = authStore.accessToken
        const response = await instance(originalRequest)

        return response
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        throw new Error(error)
      }
    } else if (error.response.status === 307) {
      // const authStore = useAuthStore()
      // authStore.onLogout()
      // handleCreateSession()
    }
    return Promise.reject(error)
  }
)

export const handleRefreshToken = async () => {
  const authStore = useAuthStore()

  const res = await post<any>('/v1/auth/refresh-token/' + authStore.refreshToken, {})
  if (res?.message == 'success') {
    authStore.refreshToken = res?.data?.refreshToken
    authStore.accessToken = res?.data?.accessToken
  }
}

// export const handleCreateSession = async () => {
//   const sessionKey = useStorage('sessionKey', '')
//   try {
//     // request rsa key
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     const response: any = await getNoEncrypt('web/encryption/rsa-key', {})
//     // TODO: handle to store prefer own public key
//     const publicKey = forge.pki.publicKeyFromPem(response.data.data.publicKey)
//     // encrypt session key
//     const sessionKeyRes = toBase64(forge.random.getBytesSync(16))
//     sessionKey.value = sessionKeyRes
//     const encrypted = encryptOAEP(sessionKey.value, publicKey)
//     // save session key
//     await postNoEncrypt('web/encryption/session-key', {
//       encrypted: toBase64(encrypted),
//       isAdmin: true
//     })
//   } catch (error) {
//     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//     // @ts-expect-error
//     throw new Error(error)
//   }
// }

// Define a function for making POST requests
async function post<T>(url: string, data: any): Promise<Response<T>> {
  try {
    const deviceId = useStorage('deviceId', '')
    const deviceType = useStorage('deviceType', '')
    const authStore = useAuthStore()
    const response = await instance.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-device-id': deviceId.value,
        'x-device-type': deviceType.value,
        Authorization: `Bearer ${authStore.accessToken}`
      }
    })

    // const newSectionKey = useStorage('sessionKey', '')
    // if (!newSectionKey) {
    //   window.location.reload()
    // }
    // const dec = decryptAES128WithSecret(response.data, newSectionKey.value)
    // const responseData = JSON.parse(dec)
    // return responseData
    return response.data
  } catch (error: any) {
    // const newSectionKey = useStorage('sessionKey', '')
    // if (!newSectionKey) {
    //   window.location.reload()
    // }
    // const dec = decryptAES128WithSecret(error?.response?.data, newSectionKey.value)
    // const responseData = JSON.parse(dec)
    // return responseData
    return error?.response
  }
}

// Define a function for making PUT requests
async function put<T>(url: string, data: any, accessTokenTemp = ''): Promise<Response<T>> {
  try {
    const authStore = useAuthStore()
    const deviceId = useStorage('deviceId', '')
    const deviceType = useStorage('deviceType', '')

    const response = await instance.put(url, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-device-id': deviceId.value,
        'x-device-type': deviceType.value,
        Authorization: `Bearer ${accessTokenTemp !== '' ? accessTokenTemp : authStore.accessToken}`
      }
    })

    // const newSectionKey = useStorage('sessionKey', '')
    // const dec = decryptAES128WithSecret(response.data, newSectionKey.value)
    // const responseData = JSON.parse(dec)

    return response.data
  } catch (error: any) {
    // const newSectionKey = useStorage('sessionKey', '')
    // if (!newSectionKey.value) {
    //   window.location.reload()
    // }
    // const dec = decryptAES128WithSecret(error?.response?.data, newSectionKey.value)
    // const responseData = JSON.parse(dec)
    return error?.response
  }
}

// Define a function for making GET requests
async function get<T>(url: string, data: any): Promise<Response<T>> {
  // const sessionKey = useStorage('sessionKey', '')
  // if (sessionKey.value == '') {
  //   window.location.reload()
  // }

  try {
    const authStore = useAuthStore()
    const deviceId = useStorage('deviceId', '')
    const deviceType = useStorage('deviceType', '')

    const newData = data?.params ? data?.params : {}
    const response = await instance.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'x-device-id': deviceId.value,
        'x-device-type': deviceType.value,
        Authorization: `Bearer ${authStore.accessToken}`
      },
      params: newData
    })

    // const newSectionKey = useStorage('sessionKey', '')
    // const dec = decryptAES128WithSecret(response.data, newSectionKey.value)
    // const responseData = JSON.parse(dec)
    return response.data
  } catch (error: any) {
    // const newSectionKey = useStorage('sessionKey', '')
    // if (!newSectionKey.value) {
    //   window.location.reload()
    // }
    // const dec = decryptAES128WithSecret(error?.response?.data, newSectionKey.value)
    // const responseData = JSON.parse(dec)
    // return responseData

    return error?.response
  }
}

export const clearSession = async () => {
  const deviceId = useStorage('deviceId', '')
  try {
    await instance.delete('web/encryption/session-key', {
      headers: {
        'Content-Type': 'application/json',
        'x-device-id': deviceId.value
      }
    })
  } catch (error: any) {
    throw new Error(error)
  }
}

async function deleteData<T>(url: string, data = {}): Promise<Response<T>> {
  try {
    const authStore = useAuthStore()
    const deviceId = useStorage('deviceId', '')
    const deviceType = useStorage('deviceType', '')

    const response = await instance.delete(url, {
      data: data,
      headers: {
        'x-device-id': deviceId.value,
        'x-device-type': deviceType.value,
        Authorization: `Bearer ${authStore.accessToken}`
      }
    })

    // const newSectionKey = useStorage('sessionKey', '')
    // const dec = decryptAES128WithSecret(response.data, newSectionKey.value)
    // const responseData = JSON.parse(dec)

    return response.data
  } catch (error: any) {
    // const newSectionKey = useStorage('sessionKey', '')
    // if (!newSectionKey.value) {
    //   window.location.reload()
    // }
    // const dec = decryptAES128WithSecret(error.response.data, newSectionKey.value)
    // const responseData = JSON.parse(dec)
    // return responseData

    return error?.response
  }
}

async function uploader(url: string, file: File, config: any) {
  const deviceId = useStorage('deviceId', '')
  const formData = new FormData()
  formData.append('file', file)
  const authStore = useAuthStore()
  const header = {
    Authorization: `Bearer ${authStore.accessToken}`,
    'x-device-id': deviceId.value,
    'x-device-type': 'WEB',
    ...config
    // onUploadProgress: (progressEvent: any) => console.log(progressEvent.loaded)
  }
  try {
    const res = await instance.post(url, formData, { headers: header })
    if (res.data?.message === 'success') {
      const response = await instance.post(
        'v1/media',
        {
          url: res.data?.data?.url,
          fileType: file?.type,
          fileName: file?.name
        },
        {
          headers: {
            'x-device-id': deviceId.value,
            'x-device-type': 'WEB',
            Authorization: `Bearer ${authStore.accessToken}`
          }
        }
      )
      if (response.data?.message === 'success') {
        return {
          url: response.data?.data?.url,
          mediaId: response.data?.data?._id,
          type: response.data?.data?.fileType
        }
      } else {
        throw new Error()
      }
    } else {
      throw new Error()
    }
  } catch (error: any) {
    throw new Error(error)
  }
}

const postNoEncrypt = async <T>(url: string, data: any): Promise<AxiosResponse<T>> => {
  const deviceId = useStorage('deviceId', '')
  const accessToken = useStorage('accessToken', '')
  const response = await instance.post<T>(url, data, {
    headers: {
      'Content-Type': 'application/json',
      'x-device-id': deviceId.value,
      Authorization: `Bearer ${accessToken.value}`
    }
  })
  return response
}

const getNoEncrypt = async <T>(url: string, data: any): Promise<AxiosResponse<T>> => {
  try {
    const deviceId = useStorage('deviceId', '')
    const accessToken = useStorage('accessToken', '')
    const response = await instance.get<T>(url, {
      headers: {
        'Content-Type': 'application/json',
        'x-device-id': deviceId.value,
        Authorization: `Bearer ${accessToken.value}`
      },
      params: data
    })
    return response
  } catch (error: any) {
    throw new Error(error)
  }
}

export { post, put, get, deleteData, uploader, postNoEncrypt, getNoEncrypt }
