<template>
  <div class="w-full h-full px-6 pt-5">
    <McTitle
      :title="$t('role.title')"
      :hasBtnAdd="true"
      :btn-txt="$t('role.addRole')"
      @on-click="$router.push('/' + RouteName.ADD_ROLE)"
    >
    </McTitle>
    <McCard
      v-if="list.length === 0 && !loading"
      :hasBtnAdd="false"
      title="No Customer"
      subTitle="You don't have any customer yet"
    >
      <template #icon>
        <IconCustomerEmpty></IconCustomerEmpty>
      </template>
    </McCard>
    <McCardHeader v-else>
      <div class="w-full">
        <div class="w-full py-4 flex justify-between items-center">
          <p class="text-lg font-medium text-[#111827]">
            {{ $t('role.role') }}
          </p>

          <div class="w-[40%]"></div>
        </div>
        <div v-if="!loading" class="w-full py-2">
          <a-table
            v-if="!loading"
            class="mc-table"
            :bordered="false"
            :columns="columns()"
            :data="list"
          >
            <template #name="{ record }">
              <p class="ml-2 line-clamp-2">{{ record?.name }}</p>
            </template>

            <template #id="{ record }">
              {{ record._id }}
            </template>

            <template #createDate="{ record }">
              <p class="font-semibold text-sm text-main">
                {{ dayjs(record?.createdAt).format('MMMM DD YYYY | hh:mm A') }}
              </p>
            </template>

            <template #action="{ record }">
              <div v-if="!record.isDefault" class="flex justify-start items-center gap-x-3">
                <a-button
                  type="text"
                  class="!p-0"
                  @click="$router.push(`/${RouteName.EDIT_ROLE}/${record._id}`)"
                >
                  <IconSqareEdit></IconSqareEdit>
                </a-button>
                <a-button type="text" class="!p-0">
                  <IconSqareDelete></IconSqareDelete>
                </a-button>
              </div>
            </template>

            <template #pagination-left>
              <div class="w-full text-black text-left">
                {{
                  $t('table.showResult', {
                    total: roleStore.roleMeta?.totalItems,
                    from: 1,
                    to: roleStore.roleMeta?.itemCount
                  })
                }}
              </div>
            </template>
          </a-table>

          <div v-else class="h-96 flex justify-center items-center">
            <a-spin :size="32" />
          </div>
        </div>
        <McLoading v-else></McLoading>
      </div>
    </McCardHeader>
  </div>

  <McDeleteModal
    :title="$t('common.deleteThisInfo')"
    :sub-title="$t('common.areYouSureYouWantToDeleteThisInfo')"
    v-model:show="showDeleteModal"
    :confirm-btn-texts="$t('button.delete')"
    @on-cancel="showDeleteModal = false"
    @on-confirm="onConfirmDelete"
  ></McDeleteModal>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { IUserData } from '~/constants/common'
import RouteName from '~/constants/router-name'
import { useRoleStore } from '~/stores/role'

const { t } = useI18n()
const roleStore = useRoleStore()
const list = computed(() => roleStore.roleList)
const loading = ref(false)
const showDeleteModal = ref(false)

const selectedRole = ref<IUserData | null>(null)

const columns = () => [
  {
    title: t('table.no'),
    slotName: 'id',
    width: 180
  },
  {
    title: t('table.name'),
    slotName: 'name',
    width: 240
  },
  {
    title: t('table.createDate'),
    slotName: 'createDate'
  },
  {
    title: t('table.action'),
    slotName: 'action'
  }
]

const onConfirmDelete = async () => {
  await roleStore.deleteRoleId(selectedRole.value?._id)
}

const fetchData = async () => {
  loading.value = true
  await roleStore.getRoleList()
  loading.value = false
}

onMounted(async () => {
  fetchData()
})
</script>

<style>
.mc-select.arco-select-view-single.arco-select-view-focus {
  border-color: #0083b0 !important;
}
</style>
