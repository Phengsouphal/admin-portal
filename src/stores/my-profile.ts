import { defineStore } from 'pinia'
import { deleteData, get, post, put } from '~/services/https'
import { Message } from '@arco-design/web-vue'
import router from '~/router'
import { IProfile } from '~/constants/common'

export const useMyProfileStore = defineStore(
  'my-profile',
  () => {
    const myProfile = ref<IProfile | null>(null)
    const myRolePermission = ref<string[]>([])
    //
    async function getMyProfile() {
      const res = await get<any>('/v1/me/', {})
      if (res?.message == 'success') {
        myProfile.value = res.data
        delete myProfile.value?.['password']

        return res.data
      }
    }

    const onEditMyProfile = async (fullName: string, avatar: string) => {
      const res = await put<any>('/v1/me', {
        fullName: fullName,
        avatarUrl: avatar
      })
      console.log(res)
      if (res.message == 'success') {
        Message.success('Edited your profile successfully')
      } else {
        Message.error('Fail to edit your profile ')
      }
    }

    const changeMyPhoneNumber = async (phoneNumber: string, code: string, otp: string) => {
      const res = await put<any>('/v1/user/change-phone-number', {
        phone: {
          countryCode: code,
          lineNumber: phoneNumber
        },
        otp: otp
      })
      console.log(res)
      if (res.message == 'success') {
        Message.success('Change Phone Number user successfully')
        router.go(-1)
      } else {
        Message.error('Fail to change Phone Number user')
      }
    }

    const changeMyPassword = async (
      currentPassword: string,
      newPassword: string,
      confirmPassword: string
    ) => {
      const res = await put<any>('/v1/me/change-password', {
        currentPassword: currentPassword,
        newPassword: newPassword,
        confirmPassword: confirmPassword
      })
      console.log(res)
      if (res.message == 'success') {
        Message.success('Change Password user successfully')
        router.go(-1)
      } else {
        Message.error('Fail to change password user')
      }
    }

    return {
      myProfile,
      myRolePermission,
      // Function

      onEditMyProfile,
      getMyProfile,
      changeMyPhoneNumber,
      changeMyPassword
    }
  },
  {
    persist: {
      paths: ['myProfile']
    }
  }
)
