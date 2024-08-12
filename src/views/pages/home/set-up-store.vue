<template>
  <div class="w-full h-full px-6 pt-5">
    <McTitle :title="$t('store.storeSetUp')"></McTitle>
    <p class="text-left text-base text-[#AEAEAE]">
      {{ $t('store.setUpStoreForFirstTime') }}
    </p>
    <a-form class="setup-form w-full" :model="form" :layout="'vertical'" @submit-failed="">
      <McCardHeader :title="$t('store.storeInfo')" content-class="!p-0">
        <div class="w-full py-4 pl-4">
          <McUploadStore></McUploadStore>
        </div>
        <div class="w-full h-[1px] bg-[#D9D9D9]"></div>

        <div class="w-full py-4 pl-4">
          <div class="w-[40%]">
            <a-form-item
              field="post"
              :label="$t('field.storeName')"
              :rules="[{ required: true, message: $t('field.storeNameIsRequired') }]"
            >
              <InputField v-model="form.name"></InputField>
              <!-- <a-input v-model="form.post" placeholder="please enter your post..." /> -->
            </a-form-item>
            <a-form-item
              field="post"
              :label="$t('field.currency')"
              :rules="[{ required: true, message: $t('field.currencyIsRequired') }]"
            >
              <a-select
                class="!w-full !bg-transparent !rounded-md !border !border-[#D8DCE0]"
                :style="{ width: '320px' }"
                :placeholder="$t('field.pleaseSelectCurrency')"
              >
                <a-option>Beijing</a-option>
                <a-option>Shanghai</a-option>
                <a-option>Guangzhou</a-option>
              </a-select>
            </a-form-item>
            <a-form-item
              field="post"
              :label="$t('field.openHour')"
              :rules="[{ required: true, message: $t('field.openHourIsRequired') }]"
            >
              <div class="flex flex-col justify-center items-start">
                <a-radio-group direction="vertical" v-model="form.openHourType">
                  <a-radio :value="1" class="!p-0">
                    <template #radio="{ checked }">
                      <div class="flex justify-start items-center">
                        <IconRadioCheck v-if="checked"></IconRadioCheck>
                        <IconRadioUncheck v-else></IconRadioUncheck>
                        <p class="text-black text-opacity-70 text-base font-semibold ml-2">
                          {{ 'Open' }}
                        </p>
                      </div>
                    </template>
                  </a-radio>
                  <div v-if="form.openHourType === 1" class="flex justify-center items-center">
                    <McDateRage></McDateRage>
                  </div>

                  <a-radio :value="2">
                    <template #radio="{ checked }">
                      <div class="flex justify-start items-center">
                        <IconRadioCheck v-if="checked"></IconRadioCheck>
                        <IconRadioUncheck v-else></IconRadioUncheck>
                        <p class="text-black text-opacity-70 text-base font-semibold ml-2">
                          {{ 'Close Temporary' }}
                        </p>
                      </div>
                    </template>
                  </a-radio>
                  <div v-if="form.openHourType === 2" class="flex justify-center items-center">
                    <McDateRage></McDateRage>
                  </div>

                  <a-radio :value="3">
                    <template #radio="{ checked }">
                      <div class="flex justify-start items-center">
                        <IconRadioCheck v-if="checked"></IconRadioCheck>
                        <IconRadioUncheck v-else></IconRadioUncheck>
                        <p class="text-black text-opacity-70 text-base font-semibold ml-2">
                          {{ $t('status.close') }}
                        </p>
                      </div>
                    </template>
                  </a-radio>
                </a-radio-group>
              </div>
            </a-form-item>
          </div>
        </div>
      </McCardHeader>

      <McCardHeader :title="$t('store.payment')" content-class="!p-0">
        <div class="w-[40%] pl-4 py-4">
          <a-form-item
            field="post"
            :label="$t('field.walletName')"
            :rules="[{ required: true, message: $t('field.walletNameIsRequired') }]"
          >
            <InputField v-model="form.name"></InputField>
            <!-- <a-input v-model="form.post" placeholder="please enter your post..." /> -->
          </a-form-item>
          <a-form-item
            field="post"
            :label="$t('field.walletAddress')"
            :rules="[{ required: true, message: $t('field.walletAddressIsRequired') }]"
          >
            <InputField v-model="form.name"></InputField>
            <!-- <a-input v-model="form.post" placeholder="please enter your post..." /> -->
          </a-form-item>
        </div>
      </McCardHeader>

      <McCardHeader :title="$t('store.contactAndAddress')" content-class="!p-0">
        <div class="w-[40%] pl-4 py-4">
          <a-form-item
            field="post"
            :label="$t('field.contactNumber')"
            :rules="[{ required: true, message: $t('field.contactNumberIsRequired') }]"
          >
            <InputField v-model="form.name"></InputField>
            <!-- <a-input v-model="form.post" placeholder="please enter your post..." /> -->
          </a-form-item>
          <a-form-item
            field="post"
            :label="$t('field.email')"
            :rules="[{ required: true, message: $t('field.emailIsRequired') }]"
          >
            <InputField v-model="form.name"></InputField>
            <!-- <a-input v-model="form.post" placeholder="please enter your post..." /> -->
          </a-form-item>
          <a-form-item
            field="post"
            :label="$t('field.address')"
            :rules="[{ required: true, message: $t('field.addressIsRequired') }]"
          >
            <InputField v-model="form.name"></InputField>
            <!-- <a-input v-model="form.post" placeholder="please enter your post..." /> -->
          </a-form-item>
        </div>
      </McCardHeader>

      <McCardHeader :title="$t('admin.deliveryFee')" content-class="!p-0">
        <div class="w-[40%] pl-4 py-4">
          <a-form-item
            field="post"
            :label="$t('field.defaultChange')"
            :rules="[{ required: true, message: $t('field.defaultChangeIsRequired') }]"
          >
            <InputField v-model="form.name"></InputField>
            <!-- <a-input v-model="form.post" placeholder="please enter your post..." /> -->
          </a-form-item>
        </div>
      </McCardHeader>

      <McCardHeader :title="$t('order.order')" content-class="!p-0">
        <div class="w-[40%] py-4 pl-4">
          <a-form-item
            field="post"
            :label="$t('field.minimumOrder')"
            :rules="[{ required: true, message: $t('field.minimumOrderIsRequired') }]"
          >
            <InputField v-model="form.name"></InputField>
            <!-- <a-input v-model="form.post" placeholder="please enter your post..." /> -->
          </a-form-item>

          <div class="flex justify-start items-center">
            <a-switch />
            <p class="text-black ml-4">{{ 'Auto Confirm Order' }}</p>
          </div>
        </div>
      </McCardHeader>

      <div class="w-full flex justify-end items-center gap-x-4 mt-4">
        <a-button type="outline" class="!rounded-md !border-[#D1D5DB] !text-black">
          {{ $t('button.cancel') }}
        </a-button>
        <a-button type="primary" class="!rounded-md"> {{ $t('button.save') }} </a-button>
      </div>
    </a-form>
  </div>
</template>

<script setup lang="ts">
const form = reactive({
  name: '',
  openHourType: 1
})
</script>

<style scoped>
.setup-form :deep(.arco-form-item-label-required-symbol) {
  display: none;
}

:deep(.arco-radio) {
  padding: 0px;
}
</style>
