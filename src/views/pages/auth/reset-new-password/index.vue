<template>
  <div class="login-container relative">
    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <Card class="!w-80 !-mt-20">
        <p class="w-full text-center font-semibold text-lg mb-4 mt-2">
          {{ $t('login.resetPassword') }}
        </p>
        <p class="my-3 mb-6 text-center">{{ $t('login.resetPasswordDes') }}</p>

        <div class="ip-container"></div>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()

const router = useRouter()
const { t } = useI18n()

const loadingLogin = ref(false)

const handleSubmit = async () => {
  //router.push({ path: "/Home" });
}

const onEnter = () => {
  handleSubmit()
}

onMounted(() => {})
</script>

<style scoped>
.login-container {
  width: 100%;
  height: 100%;
  background: #2b303e;
  position: absolute;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: 50%;
}
</style>
