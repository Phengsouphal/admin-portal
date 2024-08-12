<template>
  <div class="w-full h-full px-6 pt-5">
    <McTitle
      :title="$t('user.title')"
      :hasBtnAdd="true"
      :btn-txt="$t('button.addUser')"
      @on-click="$router.push('/' + RouteName.ADD_USER)"
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
            {{ $t('user.allUser') }}({{ userStore.userMeta?.itemCount }})
          </p>

          <div class="w-[40%]">
            <FilterInputField @handle-select=""></FilterInputField>
          </div>
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
              <p class="ml-2 line-clamp-2">{{ record?.fullName }}</p>
            </template>

            <template #id="{ record, rowIndex }"> 000{{ rowIndex + 1 }} </template>

            <template #phoneNumber="{ record }">
              {{ record?.phoneCountryCode + ' ' + record?.phoneLineNumber }}
            </template>

            <template #slotName="{ record }">
              {{ dayjs(record?.createdAt).format('DD/MM/YYYY') }}
            </template>

            <template #role="{ record }">
              {{ displayRole(record?.roleId)?.name }}
            </template>
            <template #status="{ record }">
              <div
                class="flex justify-center items-center px-2 py-0.5 rounded-full bg-opacity-20"
                :class="[record.status === StatusEnum.ACTIVE ? 'bg-success' : 'bg-[#E23618]']"
              >
                <div
                  class="w-1 h-1 rounded-full mr-2"
                  :class="[record.status === StatusEnum.ACTIVE ? 'bg-success' : 'bg-[#E23618]']"
                ></div>
                <p
                  :class="[record.status === StatusEnum.ACTIVE ? 'text-success' : 'text-[#E23618]']"
                >
                  {{
                    record.status === StatusEnum.ACTIVE
                      ? $t('common.active')
                      : $t('common.inactive')
                  }}
                </p>
              </div>
            </template>

            <template #action="{ record }">
              <a-dropdown @select="(v) => handleSelect(v, record)" position="br">
                <a-button type="text" class="!px-0" @click="">
                  <IconMore></IconMore>
                </a-button>
                <template #content>
                  <a-doption value="1">
                    <div class="w-[230px] flex justify-start items-center">
                      <p class="ml-2 font-medium text-[#00000070]">
                        {{ $t('button.updatePassword') }}
                      </p>
                    </div>
                  </a-doption>
                  <a-doption value="2">
                    <div class="flex justify-start items-center">
                      <p class="ml-2 font-medium text-[#00000070]">{{ $t('button.edit') }}</p>
                    </div>
                  </a-doption>

                  <a-doption value="3">
                    <div class="flex justify-start items-center">
                      <p class="ml-2 font-medium text-danger">{{ $t('button.delete') }}</p>
                    </div>
                  </a-doption>
                </template>
              </a-dropdown>
            </template>

            <template #pagination-left>
              <div class="w-full text-black text-left">
                {{
                  $t('table.showResult', {
                    total: userStore.userMeta?.totalItems,
                    from: 1,
                    to: userStore.userMeta?.itemCount
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

  <a-modal
    v-model:visible="showUpdateUser"
    :closable="false"
    class="mc-modal"
    :footer="false"
    body-class="!p-0"
  >
    <a-form :model="formUpdateUser" layout="vertical" class="">
      <div
        class="w-full h-16 px-6 flex justify-between items-center rounded-t-2xl border-b border-[#D9D9D9]"
      >
        <p class="text-[#111827] font-semibold text-base">{{ $t('common.editInfo') }}</p>
        <a-button type="text" class="!p-0 !h-fit" @click="showUpdateUser = false">
          <IconCross></IconCross>
        </a-button>
      </div>
      <div class="w-full px-6 mt-6">
        <a-form-item field="name" :label="$t('field.name')">
          <InputField v-model="formUpdateUser.name" :max-length="30" class="!pl-3"></InputField>
        </a-form-item>
        <a-form-item field="phoneNumber" :label="$t('field.phoneNumber')">
          <InputField
            class="h-[38px]"
            v-model="formUpdateUser.phoneNumber"
            :placeholder="$t('field.enterPhoneNumber')"
          >
            <template #prefix>
              <a-dropdown @select="(v: any) => (countryCode = v)" position="bottom">
                <a-button
                  type="text"
                  class="!p-0 !w-[90px] !h-full !border-none !rounded-l-lg !bg-opacity-0"
                >
                  <div class="w-full h-full flex justify-between items-center pl-3">
                    <IconKh v-if="countryCode == '855'"></IconKh>
                    <IconCh v-if="countryCode == '86'"></IconCh>
                    <IconIn v-if="countryCode == '91'"></IconIn>
                    <p class="mx-2 font-semibold text-black text-opacity-70">+{{ countryCode }}</p>
                    <!-- <div class="h-[60%] bg-main w-[1.5px]"></div> -->
                  </div>
                </a-button>
                <template #content>
                  <a-doption value="855">
                    <div class="flex justify-center items-center">
                      <IconKh></IconKh>
                      <p class="w-16 ml-2 font-medium">+855</p>
                    </div>
                  </a-doption>

                  <a-doption value="86">
                    <div class="flex justify-center items-center">
                      <IconCh></IconCh>
                      <p class="w-16 ml-2 font-medium">+86</p>
                    </div>
                  </a-doption>

                  <a-doption value="91">
                    <div class="flex justify-center items-center">
                      <IconIn></IconIn>
                      <p class="w-16 ml-2 font-medium">+91</p>
                    </div>
                  </a-doption>
                </template>
              </a-dropdown>
            </template>
          </InputField>
        </a-form-item>
        <a-form-item field="role" :label="$t('table.role')">
          <a-select
            v-model="formUpdateUser.role"
            class="mc-select !w-full !bg-transparent !rounded-md !border-[1.5px] !border-[#d8dce0]"
          >
            <a-option :value="item._id" v-for="(item, index) in roleStore.roleList" :key="index"
              >{{ item.name }}
            </a-option>
          </a-select>
        </a-form-item>
        <a-form-item field="status" :label="$t('table.status')">
          <a-switch v-model="formUpdateUser.status"> </a-switch>
        </a-form-item>
      </div>
      <div class="w-full flex justify-end items-center my-6 px-6 gap-x-5">
        <a-button
          type="outline"
          class="!border-[#D1D5DB] !text-[#374151] !px-6 !rounded-md"
          @click="showUpdateUser = false"
        >
          {{ $t('button.cancel') }}
        </a-button>

        <a-button type="primary" class="!rounded-md !px-6" @click="onEditInfo">
          {{ $t('button.save') }}
        </a-button>
      </div>
    </a-form>
  </a-modal>

  <a-modal
    v-model:visible="showUpdatePassword"
    title=""
    class="mc-modal"
    :footer="false"
    body-class="!p-0"
    :closable="false"
  >
    <a-form :model="formUpdatePassword" layout="vertical" @submit-success="submitUpdatePassword">
      <div
        class="w-full h-16 px-6 flex justify-between items-center rounded-t-2xl border-b border-[#D9D9D9]"
      >
        <p class="text-[#111827] font-semibold text-base">{{ $t('user.updatePassword') }}</p>
        <a-button type="text" class="!p-0 !h-fit" @click="showUpdatePassword = false">
          <IconCross></IconCross>
        </a-button>
      </div>
      <div class="w-full px-6 mt-6">
        <a-form-item
          field="currentPass"
          :label="$t('field.newPassword')"
          :rules="[{ required: true, message: $t('field.newPasswordRequired') }]"
        >
          <InputPassword v-model="formUpdatePassword.currentPass" class="!pl-2"></InputPassword>
        </a-form-item>
        <a-form-item
          field="cfmPass"
          :label="$t('field.cfmNewPassword')"
          :rules="[
            { required: true, message: $t('field.cfmPasswordRequired') },
            {
              validator: (value, cb) => {
                if (value !== formUpdatePassword.currentPass) {
                  cb($t('field.confirmPasswordNotMatch'))
                } else {
                  cb()
                }
              }
            }
          ]"
        >
          <InputPassword v-model="formUpdatePassword.cfmPass" class="!pl-2"></InputPassword>
        </a-form-item>
      </div>
      <div class="w-full flex justify-end items-center mb-6 px-6 gap-x-5">
        <a-button
          type="outline"
          class="!border-[#D1D5DB] !text-[#374151] !px-6 !rounded-md"
          @click="showUpdatePassword = false"
        >
          {{ $t('button.cancel') }}
        </a-button>

        <a-button type="primary" html-type="submit" class="!rounded-md !px-6">
          {{ $t('button.save') }}
        </a-button>
      </div>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { IUserData, StatusEnum } from '~/constants/common'
import RouteName from '~/constants/router-name'
import { useRoleStore } from '~/stores/role'
import { useUserStore } from '~/stores/user'

const { t } = useI18n()
const userStore = useUserStore()
const roleStore = useRoleStore()
const list = computed(() => userStore.userList)
const loading = ref(false)
const showDeleteModal = ref(false)
const showUpdateUser = ref(false)
const showUpdatePassword = ref(false)
const countryCode = ref('855')

const selectedUser = ref<IUserData | null>(null)

const formUpdateUser = reactive({
  name: '',
  phoneNumber: ' ',
  role: '',
  status: false
})

const formUpdatePassword = reactive({
  currentPass: '',
  cfmPass: ''
})

const columns = () => [
  {
    title: t('table.no'),
    slotName: 'id'
  },
  {
    title: t('table.name'),
    slotName: 'name',
    width: 140
  },
  {
    title: t('field.phoneNumber'),
    slotName: 'phoneNumber'
  },
  {
    title: t('table.role'),
    slotName: 'role'
  },
  {
    title: t('table.lastLoginAt'),
    slotName: 'lastLogin'
  },
  {
    title: t('table.status'),
    slotName: 'status',
    width: 120
  },
  {
    title: t('table.action'),
    slotName: 'action'
  }
]

const displayRole = (roleId: string) => {
  const role = roleStore.roleList.find((item) => item._id == roleId)
  return role
}

const handleSelect = (v: any, item: IUserData) => {
  selectedUser.value = item
  if (v == '1') {
    showUpdatePassword.value = true
  } else if (v == '2') {
    showUpdateUser.value = true
    countryCode.value = item.phoneCountryCode
    formUpdateUser.name = item.fullName
    formUpdateUser.phoneNumber = item.phoneLineNumber
    formUpdateUser.role = item?.roleId
    formUpdateUser.status = item.status == StatusEnum.ACTIVE
  } else {
    showDeleteModal.value = true
  }
  console.log(v, item)
}

const onEditInfo = async () => {
  const phone = formUpdateUser.phoneNumber
  await userStore.onEditUser(
    formUpdateUser.name,
    phone,
    countryCode.value,
    formUpdateUser.role,
    formUpdateUser.status,
    selectedUser.value?._id
  )
  showUpdateUser.value = false
  fetchData()
}

const submitUpdatePassword = async () => {
  await userStore.onChangePasswordUser(
    formUpdatePassword.currentPass,
    formUpdatePassword.cfmPass,
    selectedUser.value?._id
  )
  showUpdatePassword.value = false
}

const onConfirmDelete = async () => {
  await userStore.deleteUserId(selectedUser.value?._id)
  showDeleteModal.value = false
}

const fetchData = async () => {
  loading.value = true
  await userStore.getUserList()
  loading.value = false
}

onMounted(async () => {
  fetchData()
})
</script>

<style>
.mc-select.arco-select-view-single.arco-select-view-focus {
  border-color: #ff784e !important;
}
</style>
