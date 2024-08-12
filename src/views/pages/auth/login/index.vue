<template>
  <div class="login-container relative">
    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div class="min-w-[525px] flex flex-col justify-center items-center">
        <a-image :src="logo" width="300"></a-image>

        <p class="w-full text-center font-semibold text-xl mb-4 mt-6">
          {{ $t('login.signInToYourAcc') }}
        </p>

        <div class="form-container w-full p-10">
          <a-form
            class="w-full"
            :model="form"
            :layout="'vertical'"
            @submit-failed="onFail"
            @submit-success="onSubmit"
          >
            <a-form-item
              field="phoneNumber"
              :label="$t('field.phoneNumber')"
              class="!mb-6"
              :rules="[{ required: true, message: $t('field.phoneNumberRequired') }]"
              :validate-trigger="['change', 'input']"
            >
              <InputField
                class="h-[38px]"
                v-model="form.phoneNumber"
                :placeholder="$t('field.enterPhoneNumber')"
              >
                <template #prefix>
                  <a-dropdown @select="(v: any) => (countryCode = v)" position="bottom">
                    <a-button
                      type="text"
                      class="!p-0 !w-[90px] !h-full !border-none !rounded-l-lg !bg-opacity-0 !mr-2"
                    >
                      <div class="w-full h-full flex justify-between items-center pl-3">
                        <IconKh v-if="countryCode === '855'"></IconKh>
                        <IconCh v-if="countryCode === '86'"></IconCh>
                        <IconIn v-if="countryCode === '91'"></IconIn>
                        <p class="mx-2 font-semibold text-black text-opacity-70">
                          +{{ countryCode }}
                        </p>
                        <div class="h-[60%] bg-main w-[1.5px]"></div>
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
            <a-form-item
              v-if="isForgetPassword"
              field="password"
              :label="$t('field.password')"
              :rules="[{ required: true, message: $t('field.passwordRequired') }]"
            >
              <InputPassword v-model="form.password" class="!pl-2"></InputPassword>
              <!-- <a-input v-model="form.post" placeholder="please enter your post..." /> -->
            </a-form-item>
            <a-form-item
              v-else
              field="otp"
              :label="$t('field.OTPCode')"
              :required="true"
              :rules="[
                {
                  validator: (value, cb) => {
                    if (!value) {
                      cb($t('field.OTPCodeRequired'))
                    } else {
                      cb()
                    }
                  }
                }
              ]"
            >
              <InputField
                :input-attrs="{
                  type: 'tel'
                }"
                :hide-button="true"
                :model-value="form.otp"
                class="opt-input !pl-2"
                @input="
                  (e) => {
                    form.otp = e.replace(/[^0-9]+/g, '')
                  }
                "
              >
                <template #suffix>
                  <a-button
                    :disabled="form.phoneNumber.length <= 7"
                    type="text"
                    class="!rounded-md"
                    @click="onRequestOtp"
                  >
                    <p class="text-main font-medium">
                      {{
                        isCountDown
                          ? second == 0
                            ? $t('button.resend')
                            : second + 's'
                          : $t('button.send')
                      }}
                    </p>
                  </a-button>
                </template>
              </InputField>
            </a-form-item>
            <div class="w-full flex justify-end items-center mb-7 mt-3">
              <a-button type="text" class="!p-0" @click="isForgetPassword = !isForgetPassword">
                <p class="text-black text-opacity-70 font-medium text-base">
                  {{ isForgetPassword ? 'Forget password?' : 'Log in via password' }}
                </p>
              </a-button>
            </div>
            <a-form-item class="w-full">
              <a-button
                class="!h-[40px] !rounded-md"
                type="primary"
                html-type="submit"
                long
                :loading="submitting"
              >
                <p class="text-base font-semibold text-white">
                  {{ $t('button.signIn') }}
                </p>
              </a-button>
            </a-form-item>
          </a-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import logo from '~/assets/images/logo.png'
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()
const isForgetPassword = ref(true)

const countryCode = ref('855')

const showPhoneError = ref(false)
const submitting = ref(false)
const form = reactive({
  phoneNumber: '',
  password: '',
  otp: null,
  isRead: false
})

const onFail = (e: any) => {
  console.log(e, e?.name?.field)
  if (e?.errors?.name?.field) {
    showPhoneError.value = true
    console.log(showPhoneError.value)
  }
}

const onSubmit = async () => {
  submitting.value = true
  const phone = '+' + countryCode.value + form.phoneNumber
  const secret = isForgetPassword.value ? form.password : form.otp
  await authStore.onLogin(form.phoneNumber, countryCode.value, secret || '', isForgetPassword.value)
  submitting.value = false
}

const isCountDown = ref(false)
const second = ref(60)
const onRequestOtp = async () => {
  if (second.value !== 0 && second.value !== 60) {
    return
  }
  const phone = '+' + countryCode.value + form.phoneNumber
  const res = await authStore.sendOtpRequest(phone, 'LOGIN')
  console.log(res)
  isCountDown.value = true
  countdown()
}

function countdown() {
  second.value = 60
  console.log(second.value)
  const interval = setInterval(() => {
    second.value--
    console.log(second.value)
    if (second.value === 0) {
      clearInterval(interval)
      console.log('Countdown has finished!')
    }
  }, 1000)
}
</script>

<style scoped>
.login-container {
  width: 100%;
  height: 100%;
  position: absolute;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: 50%;
}
.form-container {
  box-shadow: 0px 2px 3px 0px #00000033;
  border-radius: 10px;
}

:deep(.mc-input) {
  height: 38px;
  border-radius: 6px;
  border: 1px solid #d8dce0;
}

:deep(.opt-input .arco-input-suffix) {
  border-left: none !important;
}
</style>
