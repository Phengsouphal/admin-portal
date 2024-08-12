<template>
  <a-menu
    :active-name="useLayout.activeMenu"
    theme="light"
    width="auto"
    :class="menuitemClasses"
    :open-names="['002', '009']"
    @on-open-change="onExpenseClick"
  >
    <template v-for="(item, index) in menuData(t)" :key="index">
      <a-menu-item
        v-if="!item.children"
        :name="item.id"
        @click="onMenuClick(item, index + '-' + index)"
      >
        <div
          class="flex items-center"
          :class="props.isCollapsed ? 'justify-center' : 'justify-start'"
        >
          <font-awesome-icon class="menu-icon h-4 w-4 text-zinc-500" :icon="item.icon" />
          <p v-if="!props.isCollapsed" class="ml-2">{{ item.name }}</p>
        </div>
      </a-menu-item>

      <a-sub-menu v-else :name="item.id">
        <template #title>
          <div
            class="flex items-center"
            :class="props.isCollapsed ? 'justify-center' : 'justify-start'"
          >
            <font-awesome-icon class="menu-icon h-4 w-4 text-zinc-500" :icon="item.icon" />
            <p v-if="!props.isCollapsed" class="ml-2">{{ item.name }}</p>
          </div>
        </template>
        <a-menu-item
          @click="onMenuClick(subItem, index + '-' + subIndex)"
          v-for="(subItem, subIndex) in item.children"
          :key="index"
          :name="'sub' + subItem.id"
        >
          <div
            class="flex items-center"
            :class="props.isCollapsed ? 'justify-center' : 'justify-start'"
          >
            <font-awesome-icon
              v-if="props.isCollapsed"
              class="menu-icon h-4 w-4 !!text-zinc-500"
              :icon="subItem?.icon"
            />
            <p v-else>{{ subItem.name }}</p>
          </div>
        </a-menu-item>
      </a-sub-menu>
    </template>
  </a-menu>
</template>

<script setup lang="ts">
import RouteName, { menuData } from '~/constants/router-name'
import { useAuthStore } from '~/stores/auth'
import { useLayoutStore } from '~/stores/layoutStore'

const useLayout = useLayoutStore()
const authStore = useAuthStore()
const { t } = useI18n()
const lastOpen = ref([]) as any

const props = defineProps<{ isCollapsed: boolean }>()

const onMenuClick = (item: any, _name: string) => {
  //   data.activeName = name;
  useLayout.switchNavbarPage(item)
}

const menuitemClasses = computed(() => {
  return ['menu-item', props.isCollapsed ? 'dd' : '']
})

const onExpenseClick = (v: any[]) => {
  if (v.includes('sub6')) {
    lastOpen.value
    // const dom = document.getElementsByClassName('ivu-layout-sider-children')
    // if (dom?.[0]) {
    //   setTimeout(() => {
    //     dom[0].scrollTo({
    //       top: dom[0].scrollHeight,
    //       behavior: 'smooth'
    //     })
    //   }, 200)
    // }
  }
}
</script>

<style scoped lang="scss">
.dd :deep(.ivu-icon-ios-arrow-down:before) {
  content: '';
}
.menu-item :deep(.ivu-menu-submenu-title) {
  padding: 15px;
}

.ivu-menu span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}

.ivu-menu i {
  transform: translateX(0px);
  transition:
    font-size 0.2s ease,
    transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}

.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition:
    font-size 0.2s ease 0.2s,
    transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}

.collapsed-menu :deep(.ivu-icon-ios-arrow-down),
.collapsed-menu :deep(p),
.collapsed-menu :deep(.ivu-menu) {
  display: none;
}
.dev-run-preview .dev-run-preview-edit {
  display: none;
}

.menu-item :deep(.ivu-menu-item),
.menu-item :deep(.ivu-menu-submenu-title) {
  padding: 15px;
}

.menu-item :deep(.ivu-menu-item-active ul .ivu-menu-item) {
  color: #71717a !important;
}

.menu-item :deep(.ivu-menu-item-active ul .ivu-menu-item-active.ivu-menu-item-selected) {
  color: #2d8cf0 !important;
}

.menu-item > .ivu-menu-item.ivu-menu-item-active .menu-icon {
  color: #2d8cf0 !important;
}

.menu-item > .ivu-menu-submenu.ivu-menu-item-active > .ivu-menu-submenu-title .menu-icon {
  color: #2d8cf0 !important;
}
</style>
