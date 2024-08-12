<template>
  <div class="w-full flex items-start justify-start gap-4 pb-2">
    <div class="w-auto">
      <a-upload
        v-show="files.length == 0"
        ref="uploadRef"
        :show-file-list="false"
        :custom-request="customRequest"
        :list-type="'picture-card'"
        @success="(file: any) => onChange(file)"
        @progress="beforeUpload"
      >
        <template #upload-button>
          <a-button type="text" class="!h-fit !p-0">
            <div
              class="!bg-[#0083B0] !bg-opacity-10 !p-3 rounded-md flex justify-center items-center"
            >
              <IconImageDefault class=""></IconImageDefault>
              <p class="ml-3 font-medium">Add Images</p>
            </div>
          </a-button>
        </template>
      </a-upload>
      <div v-show="files.length > 0" class="relative">
        <a-image width="56" height="56" :src="files[0]?.url"> </a-image>
        <a-button
          type="text"
          class="!h-fit !p-0 !absolute !-top-1.5 !-right-1.5"
          @click="onDeleteUpload"
        >
          <IconClose class=""></IconClose>
        </a-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { useMediaStore } from '~/stores/media'

const uploadRef = ref(null) as any
const files = ref<any[]>([])
const mediaStore = useMediaStore()
const authStore = useAuthStore()

const emit = defineEmits(['onUploaded', 'onDelete'])

const props = defineProps({
  isList: {
    type: Boolean,
    defualt: true,
    required: false
  },
  url: {
    type: String,
    defualt: '',
    required: false
  }
})

const customRequest = (option: any) => {
  const { onProgress, onError, onSuccess, fileItem } = option
  const xhr = new XMLHttpRequest()
  if (xhr.upload) {
    xhr.upload.onprogress = function (event) {
      let percent
      if (event.total > 0) {
        // 0 ~ 1
        percent = event.loaded / event.total
      }
      onProgress(percent, event)
    }
  }
  xhr.onerror = function error(e) {
    onError(e)
  }
  xhr.onload = async function onload() {
    if (xhr.status < 200 || xhr.status >= 300) {
      return onError(xhr.responseText)
    }

    try {
      const data = JSON.parse(xhr.response)
      console.log(data)
      if (data.message == 'success') {
        const name = fileItem.file.name
        const type = fileItem.file.type
        const mediaRes = await mediaStore.createMedia(name, type, data.data.url)
        if (mediaRes?.message == 'success') {
          onSuccess(mediaRes.data)
        } else {
          return onError(xhr.responseText)
        }
      }
    } catch (error) {
      return onError(xhr.responseText)
    }
  }

  const formData = new FormData()
  formData.append('file', fileItem.file)

  xhr.open('post', import.meta.env.VITE_API_BASE_URI + '/v1/upload/file', true)
  const deviceId = useStorage('deviceId', '')
  const deviceType = useStorage('deviceType', '')
  xhr.setRequestHeader('x-device-id', deviceId.value)
  xhr.setRequestHeader('x-device-type', deviceType.value)

  xhr.setRequestHeader('Authorization', `Bearer ${authStore.accessToken}`)

  xhr.send(formData)

  return {
    abort() {
      xhr.abort()
    }
  }
}

const onDeleteUpload = (file: any) => {
  files.value = []
  emit('onDelete', file)
}

const beforeUpload = (file: any) => {
  files.value = []
  const index = files.value.findIndex((item) => item.uid === file.uid)
  if (index === -1) {
    files.value = [...files.value, file]
  } else {
    files.value[index] = file
  }
}

const onChange = (file: any) => {
  emit('onUploaded', files.value)
  // files.value.push(file)
}

const deleteImg = () => {
  emit('onDelete', files.value?.[0])
  files.value = []
}

defineExpose({
  deleteImg
})
</script>

<style scoped></style>
