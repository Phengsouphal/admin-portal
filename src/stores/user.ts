import { defineStore } from 'pinia'
import { ICustomerListData, IMeta, IUserData, StatusEnum } from '~/constants/common'
import { deleteData, get, post, put } from '~/services/https'
import { Message } from '@arco-design/web-vue'
import router from '~/router'

export const useUserStore = defineStore('user', () => {
  const userList = ref<IUserData[]>([])
  const userMeta = ref<IMeta | null>(null)

  const userQueryData = ref({
    page: 1,
    pageSize: 10,
    search: ''
  })

  async function getUserList() {
    const res = await get<any[]>('/v1/user/', {
      params: {
        limit: userQueryData.value.pageSize,
        page: userQueryData.value.page,
        search: userQueryData.value.search
      }
    })
    if (res?.message == 'success') {
      userList.value = res.data.map((item, index) => {
        return { ...item, key: `${index + 1}` }
      })
      userMeta.value = res.meta as any
    }
  }

  async function getUserById(id?: string) {
    const res = await get<any>('/v1/user/' + id, {})
    if (res?.message == 'success') {
      return res.data
    }
  }

  const onCreateUser = async (
    name: string,
    phoneNumber: string,
    password: string,
    roleId: string
  ) => {
    const res = await post<any>('/v1/user', {
      fullName: name,
      phoneNumber: phoneNumber,
      password: password,
      roleId: roleId
    })
    console.log(res)
    if (res.message == 'success') {
      Message.success('Create User Successfully')
      router.go(-1)
    } else {
      Message.error('Fail create user')
    }
  }

  const onEditUser = async (
    fullName: string,
    phoneNumber: string,
    countryCode: string,
    roleId: string,
    status: boolean,
    id?: string
  ) => {
    const res = await put<any>('/v1/user/' + id, {
      fullName: fullName,
      phone: {
        countryCode: countryCode,
        lineNumber: phoneNumber
      },
      roleId: roleId,
      status: status ? StatusEnum.ACTIVE : StatusEnum.INACTIVE
    })
    console.log(res)
    if (res.message == 'success') {
      Message.success('Edited user successfully')
    } else {
      Message.error('Fail to edit user')
    }
  }

  const onChangePhoneNumberUser = async (phoneNumber: string, id?: string) => {
    const res = await put<any>('/v1/user/' + id + '/change-phone-number', {
      phoneNumber: phoneNumber
    })
    console.log(res)
    if (res.message == 'success') {
      Message.success('Change Phone Number user successfully')
      router.go(-1)
    } else {
      Message.error('Fail to change Phone Number user')
    }
  }

  const onChangePasswordUser = async (
    confirmPassword: string,
    newPassword: string,
    id?: string
  ) => {
    const res = await put<any>('/v1/user/' + id + '/change-password', {
      newPassword: newPassword,
      confirmPassword: confirmPassword
    })
    console.log(res)
    if (res.message == 'success') {
      Message.success('Change Password user successfully')
    } else {
      Message.error('Fail to change password user')
    }
  }

  async function deleteUserId(id?: string) {
    const res = await deleteData<any>('/v1/user/' + id, {})
    if (res?.message == 'success') {
      Message.success('Delete user successfully!')
    }
  }

  return {
    userList,
    userMeta,
    userQueryData,
    // Function

    getUserById,
    getUserList,
    onCreateUser,
    onEditUser,
    onChangePhoneNumberUser,
    onChangePasswordUser,
    deleteUserId
  }
})
