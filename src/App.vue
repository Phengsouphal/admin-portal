<template>
  <div id="app" class="bg-white w-full h-full flex flex-col justify-start items-center">
    <div v-if="loading" class="w-full h-full flex flex-col justify-center items-center">
      <div class=" ">
        <Space size="large">
          <Spin size="large" />
        </Space>
      </div>

      <!-- <p class="text-main font-medium text-xl -mt-4">
          {{ $t('download.loading') }}
        </p> -->
    </div>
    <a-config-provider v-else :locale="locale != 'zh' ? enUS : zhCN">
      <RouterView />
    </a-config-provider>
  </div>
</template>
<script setup lang="ts">
import { useAuthStore } from './stores/auth'

import enUS from '@arco-design/web-vue/es/locale/lang/en-us'
import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn'
import { useRoleStore } from './stores/role'
import { useMyProfileStore } from './stores/my-profile'

const { locale } = useI18n()

const isDark = useDark()
const authStore = useAuthStore()
const roleStore = useRoleStore()
const myProfileStore = useMyProfileStore()
const ggg = useToggle(isDark)
const toggle = () => {
  ggg()
}

const loading = ref(false)

onMounted(async () => {
  authStore.setDeviceInfo()
  if (authStore.isAuthenticated) {
    await roleStore.getRolePermissionList()
    await roleStore.getRoleList()
    await myProfileStore.getMyProfile()
    const res = await roleStore.getRoleById(myProfileStore.myProfile?.roleId)
    if (res) {
      myProfileStore.myRolePermission = res.permissions
    }

    console.log(myProfileStore.myRolePermission)
  }
})
</script>

<style lang="scss">
#app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
