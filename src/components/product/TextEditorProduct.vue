<template>
  <Editor
    ref="editorRef"
    v-bind="$attrs"
    ClassName="my-editor-container"
    :disabled="countText > 300"
    api-key="6pe66jyvqrvk5vvr0l0dl6ogunhi2xrx3bd4rbr4lk7pxyrc"
    :init="{
      selector: 'textarea#open-source-plugins',
      toolbar:
        'bold italic underline strikethrough forecolor | link image | table align bullist numlist',
      menubar: false,
      disable: true,
      width: '100%',
      maxlength: 300,
      statusbar: false,
      plugins: 'lists link image media table code help wordcount',
      images_upload_handler: example_image_upload_handler,
      setup: onSetUp
      // ed.on('change', function (event) {
      //   var numChars = ed.plugins.wordcount.body.getCharacterCount()
      //   console.log(ed)
      //   if (numChars > 300) {
      //     event.preventDefault()
      //     event.stopPropagation()
      //     return false
      //   }
      // })
    }"
  />
</template>

<script setup lang="ts">
import Editor from '@tinymce/tinymce-vue'
import { useAuthStore } from '~/stores/auth'

const editorRef = ref(null) as any
const attrs = useAttrs() as any

const countText = ref(0)

const example_image_upload_handler = (blobInfo: any, progress: any) =>
  new Promise((resolve, reject) => {
    const authStore = useAuthStore()

    const xhr = new XMLHttpRequest()
    xhr.withCredentials = false
    xhr.open('post', import.meta.env.VITE_API_BASE_URI + '/v1/upload/file', true)

    const deviceId = useStorage('deviceId', '')
    const deviceType = useStorage('deviceType', '')
    xhr.setRequestHeader('x-device-id', deviceId.value)
    xhr.setRequestHeader('x-device-type', deviceType.value)
    xhr.setRequestHeader('Authorization', `Bearer ${authStore.accessToken}`)

    xhr.upload.onprogress = (e) => {
      progress((e.loaded / e.total) * 100)
    }

    xhr.onload = () => {
      if (xhr.status === 403) {
        reject({ message: 'HTTP Error: ' + xhr.status, remove: true })
        return
      }

      if (xhr.status < 200 || xhr.status >= 300) {
        reject('HTTP Error: ' + xhr.status)
        return
      }
      const json = JSON.parse(xhr.responseText)
      if (!json.data || typeof json?.data?.url != 'string') {
        reject('Invalid JSON: ' + xhr.responseText)
        return
      }

      resolve(json?.data?.url)
    }

    xhr.onerror = () => {
      reject('Image upload failed due to a XHR Transport error. Code: ' + xhr.status)
    }

    const formData = new FormData()
    formData.append('file', blobInfo.blob(), blobInfo.filename())

    xhr.send(formData)
  })

let editorChangeHandlerId: any
const onSetUp = (editor: any) => {
  editor.on('Paste Change input Undo Redo keyup keydown', function (evt) {
    // event.preventDefault()
    // event.stopPropagation()
    // return false
    // clearTimeout(editorChangeHandlerId)
    // editorChangeHandlerId = setTimeout(function () {
    //   countText.value = 0
    //   evt?.stopPropagation()
    // }, 100)
    // if (editor.plugins.wordcount.body.getCharacterCount() > 300 && evt?.keyCode !== 8) {
    //   evt?.preventDefault()
    //   evt?.stopPropagation()
    //   return false
    // }
  })
}
// watch(
//   () => attrs?.modelValue,
//   () => {
//     countText.value = editorRef.value?.getEditor()?.getContent({ format: 'text' })?.length()
//   }
// )

defineExpose({
  editor: editorRef
})
</script>

<style>
.tox-toolbar__primary {
  transform: unset !important;
}
</style>
