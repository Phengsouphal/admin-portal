<template>
  <a-drawer
    :width="500"
    :header="false"
    :footer="false"
    :visible="layoutStore.showNotification"
    unmountOnClose
    class="mc-notification-drawer"
  >
    <div class="w-full h-full pt-[74px]">
      <div class="w-full h-full bg-white rounded-tl-lg">
        <div
          class="w-full flex justify-between items-center rounded-tl-lg px-4 py-4 bg-[#D9D9D970]"
        >
          <p class="text-[#111827] text-base font-semibold">
            {{ $t('common.notification') }}
          </p>

          <div class="flex justify-end items-center gap-x-6">
            <a-button
              v-if="listNotification.length > 0"
              type="text"
              class="!h-fit !p-0"
              @click="layoutStore.showNotification = false"
            >
              <p class="text-main font-semibold">{{ $t('button.clearAll') }}</p>
            </a-button>

            <a-button type="text" class="!h-fit !p-0" @click="layoutStore.showNotification = false">
              <IconCross class=""></IconCross>
            </a-button>
          </div>
        </div>
        <div class="w-full">
          <a-tabs v-if="listNotification.length > 0" class="mc-notification-tab">
            <template #extra>
              <a-button type="text" class="!h-fit !p-0 mr-4" @click="">
                <p class="text-main font-semibold">{{ $t('button.markAll') }}</p>
              </a-button>
            </template>
            <a-tab-pane key="1" class="tdddd">
              <template #title>
                <div class="flex justify-center items-center gap-x-2">
                  <p>
                    {{ $t('admin.unRead') }}
                  </p>
                  <div class="w-5 h-5 rounded-full bg-[#0083B0] flex justify-center items-center">
                    <p class="text-white text-[10px]">10+</p>
                  </div>
                </div>
              </template>
              <div class="w-full">
                <McNotificationCard></McNotificationCard>
                <McNotificationCard :is-read="true"></McNotificationCard>
              </div>
            </a-tab-pane>
            <a-tab-pane key="2" title="Tab 2">
              <template #title>
                <div>
                  <p>
                    {{ $t('admin.all') }}
                  </p>
                </div>
              </template>
              <div>Content</div>
            </a-tab-pane>
          </a-tabs>
          <div class="w-full flex flex-col justify-center items-center mt-8">
            <IconNoNotification></IconNoNotification>
            <p class="text-[#111827] text-sm font-semibold mt-3">
              {{ $t('admin.noNotificationYet') }}
            </p>
            <p class="text-[#6B7280] text-sm mt-1">{{ $t('admin.youWillGetSoon') }}</p>
          </div>
        </div>
      </div>
    </div>
  </a-drawer>
</template>

<script setup lang="ts">
import { useLayoutStore } from '~/stores/layoutStore'

const layoutStore = useLayoutStore()
const listNotification = ref([])
</script>

<style scoped></style>
