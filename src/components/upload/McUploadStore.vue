<template>
  <div class="w-full flex items-start justify-start gap-4 pb-2">
    <div class="w-auto">
      <a-upload
        ref="uploadRef"
        :show-file-list="false"
        :custom-request="customRequest"
        :list-type="'picture-card'"
        @success="(file: any) => onChange(file)"
        @progress="beforeUpload"
      >
        <template #upload-button>
          <div class="w-[80px] h-[80px] rounded-full bg-[#EEEEEE] relative">
            <div
              v-if="files.length === 0"
              class="w-full h-full flex flex-col justify-center items-center"
            >
              <IconUploadStore></IconUploadStore>
            </div>
            <a-avatar v-else :size="80">
              <img alt="avatar" :src="files[0]?.url" />
            </a-avatar>

            <IconCamera class="absolute -right-1 -bottom-1"></IconCamera>
          </div>
        </template>
      </a-upload>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { useMediaStore } from '~/stores/media'

const authStore = useAuthStore()
const mediaStore = useMediaStore()

const uploadRef = ref(null) as any
const files = ref<any[]>([])

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
  const { onProgress, onError, onSuccess, fileItem, name } = option
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
  files.value = files.value.filter((item) => {
    return item.uid != file.uid
  })
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
  console.log(file)
  emit('onUploaded', files.value)
}

const setUploadedImages = (imageList: any[]) => {
  files.value = imageList
}

defineExpose({
  setUploadedImages
})
</script>

<style scoped></style>
