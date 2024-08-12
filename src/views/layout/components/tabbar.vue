<template>
  <div class="w-[96%]">
    <Tabs
      class="custom-tabs"
      @on-click="onTabClick"
      type="card"
      :closable="true"
      @on-tab-remove="(e: any) => useLayout.handleCloseTab(e)"
      v-model="selectName"
      :animated="false"
    >
      <TabPane
        v-for="tab in useLayout.listTabPannel"
        :label="$t('tab.' + tab.routeName)"
        v-bind:key="tab.routeName"
        :name="tab.routeName"
      >
      </TabPane>
    </Tabs>
  </div>
</template>

<script setup lang="ts">
import { menuData } from '~/constant/router-name'
import { useLayoutStore } from '~/stores/layoutStore'

const useLayout = useLayoutStore()
const route = useRoute()
const { t } = useI18n()

const onTabClick = (e: any) => {
  useLayout.switchPage(e)
}

const selectName = ref(route.name)

watch(
  () => route.fullPath,
  () => {
    selectName.value = route.name
    let data = null as any
    menuData(t).forEach((item) => {
      if (item.routeName === route.name) {
        data = item
        return
      } else {
        item.children?.forEach((sItem) => {
          if (sItem.routeName === route.name) {
            data = sItem
            return
          }
        })
      }
    })
    if (data) {
      useLayout.checkIfTabExist({ id: data?.id, routeName: data?.routeName })
    }
  }
)
</script>

<style scoped></style>
