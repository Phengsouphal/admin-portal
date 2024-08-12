<template>
  <div class="w-full flex items-center justify-center gap-4">
    <a-upload
      v-show="files.length == 0"
      class="!w-[70%]"
      :show-file-list="false"
      :custom-request="customRequest"
      ref="uploadRef"
      @success="onChange"
      @error="onError"
      @progress="beforeUpload"
    >
      <template #upload-button>
        <div
          class="bg-border border-[#D1D5DB] h-[190px] rounded-lg"
          :class="props.isError ? 'bg-err' : ''"
        >
          <div class="h-full flex flex-col justify-center items-center">
            <IconUpload></IconUpload>
            <p class="text-sm text-[#111827] font-medium mt-2">
              {{ props.title ? props.title : $t('upload.titleDefault') }}
            </p>
            <p
              v-if="props.showSubTitle"
              class="w-[60%] text-center text-[#AEAEAE] text-xs font-medium mt-2"
            >
              {{
                props.subTitle == ''
                  ? $t('upload.pictureHasBackgroudNoBackgroudAndIcon')
                  : props.subTitle
              }}
            </p>
          </div>
        </div>
      </template>
    </a-upload>
    <div
      v-show="files.length > 0"
      class="upload-list-container w-full flex justify-start items-center gap-x-8 text-black"
    >
      <div class="relative rounded-lg" v-for="(item, index) in files" :key="index">
        <a-image
          fit="cover"
          class="mc-image-product"
          v-if="!isVideoFile(item.name) || !isVideoMimeType(item?.file?.type)"
          width="180"
          height="180"
          :src="item.url"
        />
        <div v-else class="w-[180px] h-[180px] rounded-lg overflow-hidden relative">
          <video
            class="w-full h-full bg-white object-cover"
            :src="item?.response?.url + '#t=5'"
          ></video>

          <a-button
            type="text"
            class="!bg-transparent !absolute !top-1/2 !left-1/2 !transform !-translate-x-1/2 !-translate-y-1/2"
            @click="onShowVideo(item?.response?.url)"
          >
            <IconPlayVideo class=""></IconPlayVideo>
          </a-button>
        </div>
        <a-button
          type="primary"
          shape="circle"
          size="small"
          class="!absolute !-right-3 !-top-3 !bg-[#D9D9D9]"
          @click="onDeleteUpload(item)"
        >
          <IconDeleteUpload></IconDeleteUpload>
        </a-button>
        <div
          v-if="item.status == 'uploading'"
          class="w-[180px] h-[180px] rounded-lg bg-black bg-opacity-40 absolute top-0 left-0"
        >
          <div class="w-full h-full flex justify-center items-center">
            <a-spin :size="32" />
          </div>
        </div>
      </div>
      <div class="last-list-item" v-if="props.isList">
        <a-upload
          ref="uploadRef"
          :show-file-list="false"
          :custom-request="customRequest"
          @success="onChange"
          @progress="beforeUpload"
        >
          <template #upload-button>
            <div class="w-[180px] h-[180px] border border-dashed border-[#D1D5DB] py-6 rounded-lg">
              <div class="w-full h-full flex flex-col justify-center items-center">
                <IconUpload></IconUpload>
              </div>
            </div>
          </template>
        </a-upload>
      </div>
    </div>
  </div>

  <a-modal
    :visible="showVideo"
    :closable="false"
    :footer="false"
    title=""
    body-class="!p-0 !bg-transparent"
    modal-class=" !bg-transparent !w-full"
    @close="onModalClose"
  >
    <div class="w-full flex flex-col justify-center items-center rounded-lg p-10">
      <div class="w-[70%] relative p-10">
        <div class="w-full rounded-2xl overflow-hidden">
          <video class="bg-white w-full" id="videoUrl" controls></video>
        </div>

        <a-button
          type="text"
          class="!bg-transparent !absolute -top-4 -right-4"
          @click="showVideo = false"
        >
          <IconClosePlayVideo></IconClosePlayVideo>
        </a-button>
      </div>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { Message } from '@arco-design/web-vue'
import { useAuthStore } from '~/stores/auth'
import { useMediaStore } from '~/stores/media'
import { isVideoFile, isVideoMimeType } from '~/utils/function'

const uploadRef = ref(null) as any
const files = ref<any[]>([])

const showVideo = ref(false)
const videoUrl = ref('')
const mediaStore = useMediaStore()

const emit = defineEmits(['onUploaded', 'onDelete'])

const props = defineProps({
  isList: {
    type: Boolean,
    default: true,
    required: false
  },
  title: {
    type: String,
    default: '',
    required: false
  },
  showSubTitle: {
    type: Boolean,
    default: false,
    required: false
  },
  subTitle: {
    type: String,
    default: '',
    required: false
  },
  isError: {
    type: Boolean,
    default: false,
    required: false
  }
})

const onShowVideo = (url: string) => {
  showVideo.value = true
  videoUrl.value = url
  const dom = document.getElementById('videoUrl') as HTMLVideoElement
  if (dom) {
    dom.src = videoUrl.value
  }
}

const onModalClose = () => {
  const dom = document.getElementById('videoUrl') as HTMLVideoElement
  if (dom) {
    dom.pause()
  }
}

const customRequest = (option: any) => {
  const { onProgress, onError, onSuccess, fileItem } = option
  const xhr = new XMLHttpRequest()

  const authStore = useAuthStore()
  if (xhr.upload) {
    xhr.upload.onprogress = function (event) {
      let percent
      const index = files.value.findIndex((item) => item.uid == fileItem.uid)
      if (index != -1) {
        files.value[index].xhr = xhr
      }
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

  xhr.open('post', import.meta.env.VITE_API_BASE_URI + 'v1/upload/file', true)
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
  console.log(file)
  file?.xhr?.abort()
  files.value = files.value.filter((item) => {
    return item.uid != file.uid
  })
  emit('onDelete', file)
}

const beforeUpload = (file: any) => {
  const index = files.value.findIndex((item) => item.uid === file.uid)
  if (index === -1) {
    files.value = [...files.value, file]
  } else {
    files.value[index] = file
  }
}

const onError = (_file: any) => {
  Message.error('Failed to upload file')
  files.value = files.value.filter((item) => item.uid !== _file.uid)
}

const onChange = (_file: any) => {
  emit('onUploaded', files.value)
  // files.value.push(file)
}

const setUploadedImages = (imageList: any[]) => {
  files.value = imageList
}

defineExpose({
  setUploadedImages
})
</script>

<style scoped>
:deep(.mc-image-product .arco-image-img) {
  border-radius: 8px;
}

:deep(.upload-list-container .last-list-item) {
  background-color: white;
  padding: 20px;
  position: sticky;
  right: 0;
}

:deep(.bg-border) {
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='20' ry='20' stroke='%23D1D5DBFF' stroke-width='4' stroke-dasharray='6%2c 14%2c 6%2c 14' stroke-dashoffset='63' stroke-linecap='square'/%3e%3c/svg%3e");
  border-radius: 20px;
}

:deep(.bg-err) {
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='20' ry='20' stroke='%23E23618FF' stroke-width='4' stroke-dasharray='6%2c 14%2c 6%2c 14' stroke-dashoffset='63' stroke-linecap='square'/%3e%3c/svg%3e") !important;
}
</style>
