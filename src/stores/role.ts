import { defineStore } from 'pinia'
import { IMeta, IRoleData, IRolePermissionData } from '~/constants/common'
import { deleteData, get, post, put } from '~/services/https'
import { Message } from '@arco-design/web-vue'
import router from '~/router'

export const useRoleStore = defineStore('role', () => {
  const roleList = ref<IRoleData[]>([])
  const roleMeta = ref<IMeta | null>(null)

  const roleQueryData = ref({
    page: 1,
    pageSize: 10,
    search: ''
  })

  const rolePermissionList = ref<IRolePermissionData[]>([])

  async function getRoleList() {
    const res = await get<any[]>('/v1/role/', {
      params: {
        limit: roleQueryData.value.pageSize,
        page: roleQueryData.value.page,
        search: roleQueryData.value.search
      }
    })
    if (res?.message == 'success') {
      roleList.value = res.data.map((item, index) => {
        return { ...item, key: `${index + 1}` }
      })
      roleMeta.value = res.meta as any
    }
  }

  async function getRolePermissionList() {
    const res = await get<any[]>('/v1/role/permissions', {
      params: {
        limit: 1000,
        page: 1
      }
    })
    console.log(res.data)

    if (res?.message == 'success') {
      rolePermissionList.value = res.data.map((item, index) => {
        return { ...item, key: `${index + 1}` }
      })
    }
  }

  async function getRoleById(id?: string) {
    const res = await get<any>('/v1/role/' + id, {})
    if (res?.message == 'success') {
      return res.data
    }
  }

  const onCreateRole = async (name: string, des: string, keys: string[]) => {
    const res = await post<any>('/v1/role', {
      permissions: keys,
      name: name,
      description: des
    })
    console.log(res)
    if (res.message == 'success') {
      Message.success('Create role Successfully')
      router.go(-1)
    } else {
      Message.error('Fail create role')
    }
  }

  const onEditRole = async (name: string, keys: string[], id?: string) => {
    const res = await put<any>('/v1/role/' + id, {
      permissions: keys,
      name: name,
      description: ' '
    })
    console.log(res)
    if (res.message == 'success') {
      Message.success('Edited role successfully')
      router.go(-1)
    } else {
      Message.error('Fail to role role')
    }
  }

  async function deleteRoleId(id?: string) {
    const res = await deleteData<any>('/v1/role/' + id, {})
    if (res?.message == 'success') {
      Message.success('Delete role successfully!')
    }
  }

  return {
    roleList,
    roleMeta,
    roleQueryData,
    rolePermissionList,
    // Function

    getRolePermissionList,
    getRoleById,
    getRoleList,
    onCreateRole,
    onEditRole,
    deleteRoleId
  }
})
