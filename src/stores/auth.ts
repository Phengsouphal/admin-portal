import { defineStore } from 'pinia'
import { post } from '~/services/https'
import { v4 } from 'uuid'
import { Message } from '@arco-design/web-vue'
import { useMyProfileStore } from './my-profile'
import { useRoleStore } from './role'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const router = useRouter()
    const roleStore = useRoleStore()
    const myProfileStore = useMyProfileStore()
    const isAuthenticated = ref(false)
    const accessToken = ref('')
    const refreshToken = ref('')

    const deviceId = useStorage('deviceId', '')
    const deviceType = useStorage('deviceType', '')

    const showLogout = ref(false)

    const setDeviceInfo = () => {
      // const deviceModel = deviceInfo?.device?.model
      //   ? deviceInfo.device.model
      //   : deviceInfo.engine.name
      if (deviceType.value == '') {
        deviceType.value = 'WEB'
      }
      if (deviceId.value == '') {
        deviceId.value = v4()
      }
    }

    const onLogin = async (
      phoneNumber: string,
      countryCode: string,
      password: string,
      isOtpLogin: boolean
    ) => {
      try {
        let res: any
        if (isOtpLogin) {
          const data = {
            phone: {
              countryCode: countryCode,
              lineNumber: phoneNumber
            },
            password: password
          }
          res = await post<any>('/v1/auth/login', data)
        } else {
          const data = {
            phone: {
              countryCode: countryCode,
              lineNumber: phoneNumber
            },
            optCode: password
          }
          res = await post<any>('/v1/auth/login-via-otp', data)
        }
        const response = res?.data

        // if (response?.accessToken) {
        refreshToken.value = response?.refreshToken
        accessToken.value = response?.accessToken
        Message.success('Successfully logged in')
        isAuthenticated.value = true
        // await roleStore.getRolePermissionList()
        // await roleStore.getRoleList()
        // await myProfileStore.getMyProfile()
        // const res = await roleStore.getRoleById(myProfileStore.myProfile?.roleId)
        // if (res) {
        //   myProfileStore.myRolePermission = res.permissions
        // }
        router.push('/')
        // } else {
        //   Message.error(res.data.message)
        // }
      } catch (error: any) {
        console.log(error)
      }
    }

    const onResetPassword = async (otp: string, password: string, cfmPassword: string) => {
      const data = {
        accessToken: accessToken.value,
        otp: otp,
        password: password,
        passwordConfirm: cfmPassword
      }
      const res = await post<any>('/v1/auth/login', data)
      const response = res.data
    }

    const sendOtpRequest = async (
      phone: string,
      type: 'LOGIN' | 'RESET_PASSWORD' | 'CHANGE_PHONE_NUMBER'
    ) => {
      const data = {
        type: type,
        for: phone
      }
      const res = await post<any>('/v1/opt/request', data)
      return res
    }

    const sendOtpVerify = async (phone: string, type = 1, code: string) => {
      let _type = ''
      if (type === 1) {
        _type = 'RESET_PASSWORD'
      } else if (type === 2) {
        _type = 'CHANGE_PHONE_NUMBER'
      }
      const data = {
        type: type,
        for: phone,
        code: code
      }
      const res = await post<any>('/v1/otp/request', data)
      return res
    }

    const onLogOut = async () => {
      refreshToken.value = ''
      accessToken.value = ''

      showLogout.value = false
      isAuthenticated.value = false
      Message.success('Logout successfully!')
      router.push('/login')
    }

    return {
      isAuthenticated,
      accessToken,
      refreshToken,
      deviceId,
      deviceType,
      showLogout,

      // Otp
      sendOtpRequest,
      sendOtpVerify,

      //Function

      onLogin,
      onLogOut,
      onResetPassword,
      setDeviceInfo
    }
  },
  {
    persist: {
      paths: ['accessToken', 'isAuthenticated', 'deviceType', 'deviceId', 'refreshToken']
    }
  }
)
