<template>
  <a-layout class="layout-demo w-full">
    <a-layout-sider
      @collapse="onCollapse"
      :collapsed-width="60"
      :width="300"
      collapsible
      :collapsed="collapse"
      breakpoint="xl"
      class="!bg-main"
      hide-trigger
      :trigger="null"
    >
      <div
        class="pt-6 pb-4 flex items-center"
        :class="[collapse ? 'px-0 justify-center' : ' px-6 justify-start']"
      >
        <a-image :src="logo"></a-image>
      </div>

      <div
        v-if="$route.name === RouteName.ACCOUNT_SETTING"
        class="flex items-center mt-12"
        :class="[collapse ? 'justify-center' : ' px-6 justify-start']"
      >
        <a-avatar :size="!collapse ? 56 : 48">
          <img class="w-full h-full" alt="avatar" :src="myProfileStore.myProfile?.avatarUrl" />
        </a-avatar>
        <p v-if="!collapse" class="text-xl text-white font-semibold ml-3">
          {{ myProfileStore.myProfile?.fullName }}
        </p>
      </div>

      <div class="w-full flex justify-end items-center my-3">
        <a-button
          @click="collapse = !collapse"
          type="text"
          class="!p-0 !h-fit !w-fit hover:!bg-transparent"
        >
          <IconCollapseNew v-if="collapse"></IconCollapseNew>
          <IconNotCollapseNew v-else></IconNotCollapseNew>
        </a-button>
      </div>

      <a-menu
        v-model:selected-keys="selectedKeys"
        v-model:open-keys="openKeys"
        :default-open-keys="[]"
        :style="{ width: '100%' }"
        :mode="collapse ? 'pop' : 'vertical'"
        class="mc-menu !bg-main !px-3 mt-6 mx-auto"
        :tooltip-props="{
          'content-class': 'mc-menu-tooltip'
        }"
        :trigger-props="{
          'content-class': 'mc-menu-tooltip'
        }"
      >
        <template v-if="$route.name != RouteName.ACCOUNT_SETTING">
          <template v-for="item in menuList()">
            <a-menu-item
              @click="onClickMenuItem(item)"
              v-if="item.children.length === 0"
              :key="item.id"
              :name="item.id"
            >
              <template #icon>
                <component :is="item.icon" />
              </template>
              <p class="ml-2">{{ item.name }}</p>
            </a-menu-item>
            <template v-else :key="'sub' + item.id">
              <!--  v-if="
                  myProfileStore.myRolePermission?.[0] === '*' ||
                  item?.children
                    ?.map((i) => i.permission)
                    .some((item) => myProfileStore.myRolePermission.includes(item))
                " -->
              <a-sub-menu :name="'sub' + item.id" :title="item.name">
                <template #icon>
                  <component :is="item.icon" />
                </template>
                <template #title>
                  <p class="ml-2">{{ item.name }}</p>
                </template>
                <template #expand-icon-down="{ collapsed }">
                  {{ collapsed }}
                  <IconNotCollapse v-if="collapsed"></IconNotCollapse>
                  <IconNotCollapse v-else></IconNotCollapse>
                </template>

                <template v-for="subItem in item.children" :key="item.id + '_' + subItem.subId">
                  <!--   v-if="
                      myProfileStore.myRolePermission?.[0] === '*' ||
                      myProfileStore.myRolePermission?.includes(subItem?.permission || '')
                    " -->
                  <a-menu-item
                    :name="item.id + '_' + subItem.subId"
                    @click="onClickMenuItem(subItem)"
                    class="!py-0"
                    :class="[!collapse ? 'ml-[29px]' : '']"
                  >
                    {{ subItem.name }}
                  </a-menu-item>
                </template>
              </a-sub-menu>
            </template>
          </template>
        </template>

        <template v-else>
          <a-menu-item key="acc-setting" name="acc-setting">
            <template #icon>
              <IconAccountSettingMenu></IconAccountSettingMenu>
            </template>
            <p class="ml-2">{{ $t('admin.accountSetting') }}</p>
          </a-menu-item>
          <a-menu-item @click="authStore.showLogout = true" key="logout" name="logout">
            <template #icon>
              <IconLogoutMenu></IconLogoutMenu>
            </template>
            <p class="ml-2">{{ $t('button.logout') }}</p>
          </a-menu-item>
        </template>
      </a-menu>
      <!-- trigger -->
      <template #trigger="{ collapsed }">
        <IconCollapse v-if="collapsed"></IconCollapse>
        <IconNotCollapse v-else></IconNotCollapse>
      </template>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="padding-left: 20px; height: 74px">
        <div class="w-full h-full flex justify-end items-center">
          <div class="flex justify-center items-center gap-4 mr-6">
            <a-button type="text" @click="useLayout.showNotification = true">
              <template #icon>
                <IconNotification />
              </template>
            </a-button>
            <a-popover
              trigger="click"
              position="br"
              arrow-class="!bg-transparent"
              class="language-popup"
              content-class="!bg-white !p-0"
            >
              <a-button class="!h-10 !p-0" type="text">
                <div class="flex justify-center items-center">
                  <IconEn class="w-10 h-7" v-if="locale == 'en'"></IconEn>
                  <IconCh class="w-10 h-7" v-else-if="locale == 'zh'"></IconCh>
                  <IconKh class="w-10 h-7" v-else-if="locale == 'km'"></IconKh>
                  <IconIn class="w-10 h-7" v-else-if="locale == 'hi'"></IconIn>
                  <p class="ml-3">
                    {{
                      'en' == locale
                        ? 'English'
                        : 'zh' == locale
                          ? '中文(简体)'
                          : 'hi' == locale
                            ? 'हिन्दी भाषा'
                            : 'km' == locale
                              ? 'ខ្មែរ Khmer'
                              : ''
                    }}
                  </p>
                  <IconDown class="ml-6"></IconDown>
                </div>
              </a-button>
              <template #content>
                <div class="w-full flex flex-col justify-center items-center">
                  <a-button
                    class="!w-full !p-0 !py-6 !px-4"
                    type="text"
                    v-for="(item, index) in ['en', 'zh', 'hi', 'km']"
                    :key="index"
                    @click="onChangeLang(item)"
                  >
                    <div class="w-full flex justify-between items-center">
                      <IconEn v-if="'en' == item"></IconEn>
                      <IconCh v-if="'zh' == item"></IconCh>
                      <IconKh v-if="'km' == item"></IconKh>
                      <IconIn v-if="'hi' == item"></IconIn>
                      <p class="w-28 ml-4 text-base text-left text-black text-opacity-70">
                        {{
                          'en' == item
                            ? 'English'
                            : 'zh' == item
                              ? '中文(简体)'
                              : 'hi' == item
                                ? 'हिन्दी भाषा'
                                : 'km' == item
                                  ? 'ខ្មែរ Khmer'
                                  : ''
                        }}
                      </p>
                      <IconCheck
                        class="ml-10"
                        :class="[item == locale ? 'visible' : 'invisible']"
                      ></IconCheck>
                    </div>
                  </a-button>
                </div>
              </template>
            </a-popover>

            <div class="w-[1px] h-[28px] bg-[#D9D9D9]"></div>

            <a-popover
              trigger="click"
              position="br"
              arrow-class="!bg-transparent"
              content-class="!p-0 !py-2 !bg-white"
            >
              <a-button class="!h-fit !p-2" type="text">
                <div class="flex justify-center items-center">
                  <a-avatar :size="40">
                    <img
                      class="w-full h-full"
                      alt="avatar"
                      :src="myProfileStore.myProfile?.avatarUrl"
                    />
                  </a-avatar>
                  <p class="ml-3">{{ myProfileStore.myProfile?.fullName }}</p>
                  <IconDown class="ml-6"></IconDown>
                </div>
              </a-button>
              <template #content>
                <div class="w-64 flex flex-col justify-center items-center">
                  <div class="w-full">
                    <a-button class="!w-full !h-fit !px-4 !py-2" type="text" @click="">
                      <div class="w-full flex justify-start items-center">
                        <a-avatar :size="40">
                          <img
                            class="w-full h-full"
                            alt="avatar"
                            :src="myProfileStore.myProfile?.avatarUrl"
                          />
                        </a-avatar>
                        <p class="ml-3 text-base text-black text-opacity-70 font-semibold">
                          {{ myProfileStore.myProfile?.fullName }}
                        </p>
                      </div>
                    </a-button>
                  </div>

                  <div class="w-full border-b border-[#F3F4F6] my-2"></div>
                  <div class="w-full pb-2">
                    <a-button
                      class="!w-full !p-0 !px-4"
                      type="text"
                      @click="$router.push('/' + RouteName.ACCOUNT_SETTING)"
                    >
                      <div class="w-full flex justify-start items-center">
                        <IconAccountSetting></IconAccountSetting>
                        <p class="ml-3 text-base text-black text-opacity-70">Account setting</p>
                      </div>
                    </a-button>
                    <a-button
                      class="!w-full !p-0 !mt-3 !px-4"
                      type="text"
                      @click="authStore.showLogout = true"
                    >
                      <div class="w-full flex justify-start items-center">
                        <IconLogout></IconLogout>
                        <p class="ml-3 text-base text-black text-opacity-70">Log out</p>
                      </div>
                    </a-button>
                  </div>
                </div>
              </template>
            </a-popover>
          </div>
        </div>
      </a-layout-header>
      <a-layout style="padding: 0px">
        <!-- <a-breadcrumb :style="{ margin: '16px 0' }">
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item>List</a-breadcrumb-item>
          <a-breadcrumb-item>App</a-breadcrumb-item>
        </a-breadcrumb> -->
        <a-layout-content class="!bg-transparent">
          <router-view v-slot="{ Component }">
            <keep-alive :include="useLayout.includeArr">
              <component :is="Component" />
            </keep-alive>
          </router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>

  <McNotificationDrawer></McNotificationDrawer>

  <McDeleteModal
    title="Logout of this account"
    sub-title="Are you sure you want to logout of this account?"
    :confirm-btn-txt="$t('button.logout')"
    v-model:show="authStore.showLogout"
    @on-cancel="authStore.showLogout = false"
    @on-confirm="authStore.onLogOut"
  ></McDeleteModal>
</template>
<script setup lang="ts">
import logo from '~/assets/images/logo.png'

import IconDiscount from '~/components/icons/side-bar/IconDiscount.vue'
import IconHome from '~/components/icons/side-bar/IconHome.vue'
import IconStore from '~/components/icons/side-bar/IconStore.vue'
import IconOrder from '~/components/icons/side-bar/IconOrder.vue'
import IconReport from '~/components/icons/side-bar/IconReport.vue'
import IconCustomer from '~/components/icons/side-bar/IconCustomer.vue'
import IconAdmin from '~/components/icons/side-bar/IconAdmin.vue'
import RouteName from '~/constants/router-name'
import { useLayoutStore } from '~/stores/layoutStore'
import { useAuthStore } from '~/stores/auth'
import { useMyProfileStore } from '~/stores/my-profile'

const useLayout = useLayoutStore()
const authStore = useAuthStore()
const myProfileStore = useMyProfileStore()
const { t, locale } = useI18n()
const router = useRouter()
const route = useRoute()
const lang = useStorage('lang', 'en')

const selectedKeys = ref([]) as any

const openKeys = ref([]) as any
const collapse = ref(false)

const menuList = () => [
  {
    id: '0_1',
    name: t('sideBar.home'),
    icon: IconHome,
    route: RouteName.HOME,
    children: []
  },
  {
    id: '0_2',
    name: t('sideBar.store'),
    icon: IconStore,
    route: '',
    children: [
      {
        subId: '0_1',
        permission: 'product:*',
        name: t('sideBar.product'),
        route: RouteName.PRODUCT
      },
      {
        subId: '0_2',
        permission: 'category:*',
        name: t('sideBar.category'),
        route: RouteName.CATEGORY
      },
      {
        subId: '0_3',
        permission: 'collection:*',
        name: t('sideBar.collection'),
        route: RouteName.COLLECTION
      }
    ]
  },
  {
    id: '0_3',
    name: t('sideBar.order'),
    icon: IconOrder,
    route: '',
    children: [
      {
        subId: '0_1',
        permission: 'order:*',
        name: t('sideBar.confirmOrder'),
        route: RouteName.CONFIRM_ORDER
      },
      {
        subId: '0_2',
        permission: 'order:*',
        name: t('sideBar.orderHistory'),
        route: RouteName.ORDER_HISTORY
      }
    ]
  },
  {
    id: '0_4',
    name: t('sideBar.customer'),
    icon: IconCustomer,
    route: '',
    children: [
      {
        subId: '0_1',
        permission: 'customer:*',
        name: t('sideBar.customerList'),
        route: RouteName.CUSTOMER_LIST
      },
      {
        subId: '0_2',
        permission: 'customer:*',
        name: t('sideBar.blockCustomer'),
        route: RouteName.BLOCKED_CUSTOMER
      }
    ]
  },
  {
    id: '0_5',
    name: t('sideBar.report'),
    icon: IconReport,
    route: RouteName.REPORT,
    children: [
      {
        subId: '0_1',
        permission: 'report:*',
        name: t('sideBar.productReport'),
        route: RouteName.PRODUCT_REPORT
      },
      {
        subId: '0_2',
        permission: 'report:*',
        name: t('sideBar.orderReport'),
        route: RouteName.ORDER_REPORT
      }
    ]
  },
  {
    id: '0_6',
    name: t('sideBar.promotion'),
    icon: IconDiscount,
    route: '',
    children: [
      {
        subId: '0_1',
        permission: 'promotion:*',
        name: t('sideBar.voucher'),
        route: RouteName.VOUCHER
      },
      {
        subId: '0_2',
        permission: 'promotion:*',
        name: t('sideBar.discount'),
        route: RouteName.DISCOUNT
      }
    ]
  },
  {
    id: '0_7',
    name: t('sideBar.adminstration'),
    icon: IconAdmin,
    route: '',
    children: [
      {
        subId: '0_1',
        permission: 'store:*',
        name: t('sideBar.storeSetting'),
        route: RouteName.STORE_SETTING
      },
      { subId: '0_2', permission: 'user:*', name: t('sideBar.user'), route: RouteName.USER },
      { subId: '0_3', permission: 'role:*', name: t('sideBar.role'), route: RouteName.ROLE }
    ]
  }
]

const onCollapse = (e: any) => {
  collapse.value = e
}

const onChangeLang = (key: string) => {
  locale.value = key
  lang.value = locale.value
}

const onClickMenuItem = (item: any) => {
  router.push(`/${item.route}`)
}

onMounted(() => {
  menuList().forEach((v) => {
    console.log(route.name)
    if (v.route === route.name) {
      console.log(v.route === route.name, 'v.route === route.name')
      selectedKeys.value = [v.id]
    } else {
      v?.children?.forEach((c) => {
        if (c.route === route.name) {
          selectedKeys.value.push(v.id + '_' + c.subId)
          openKeys.value = ['sub' + v.id]
        }
      })
    }
  })
  if (route.name === RouteName.ACCOUNT_SETTING) {
    selectedKeys.value = ['acc-setting']
  }
})
</script>

<style scoped lang="scss">
.layout-demo {
  height: 500px;
  background: var(--color-fill-2);
  border: 1px solid var(--color-border);
}
.layout-demo :deep(.arco-layout-sider) .logo {
  height: 32px;
  margin: 12px 8px;
  background: rgba(255, 255, 255, 0.2);
}
.layout-demo :deep(.arco-layout-sider-light) .logo {
  background: var(--color-fill-2);
}
.layout-demo :deep(.arco-layout-header) {
  height: 64px;
  line-height: 64px;
  background: var(--color-bg-3);
}
.layout-demo :deep(.arco-layout-footer) {
  height: 48px;
  color: var(--color-text-2);
  font-weight: 400;
  font-size: 14px;
  line-height: 48px;
}
.layout-demo :deep(.arco-layout-content) {
  color: var(--color-text-2);
  font-weight: 400;
  font-size: 14px;
  background: var(--color-bg-3);
}
.layout-demo :deep(.arco-layout-footer),
.layout-demo :deep(.arco-layout-content) {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--color-white);
  font-size: 16px;
  font-stretch: condensed;
  text-align: center;
}

:deep(.arco-menu-collapsed .arco-menu-pop.arco-menu-pop-header) {
  background-color: transparent;
}

.mc-menu :deep(.arco-menu-inner) {
  padding: 0px;
}

.mc-menu :deep(.arco-menu-icon-suffix.is-open) {
  transform: rotate(90deg);
}

.mc-menu :deep(.arco-menu-item),
.mc-menu :deep(.arco-menu-inline-header) {
  padding: 4px 12px;
  background: transparent;
  color: white;
  font-size: 16px;
  font-weight: 600px;
}

.mc-menu :deep(.arco-menu-item.arco-menu-selected) {
  background: #05587466;
  border-radius: 8px;
}

.mc-menu :deep(.arco-menu-inline-header.arco-menu-selected),
:deep(.arco-menu-collapsed .arco-menu-pop.arco-menu-selected.arco-menu-pop-header) {
  background: #0558741a;
  border-radius: 8px;
}

.arco-layout-sider :deep(.arco-layout-sider-trigger-light) {
  background-color: transparent;
}

:deep(.arco-menu-collapsed.mc-menu) {
  padding: 0px !important;
}

:deep(.language-popup .arco-trigger-popup-wrapper .arco-trigger-content) {
  background: #ffff !important;
}
</style>
