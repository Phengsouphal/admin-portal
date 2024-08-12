import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path, { resolve } from 'path'

import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import AutoImport from 'unplugin-auto-import/vite'
import svgLoader from 'vite-svg-loader'
import Components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    svgLoader(),
    VueI18nPlugin({
      runtimeOnly: false,
      include: resolve('./src/i18n/locales/**') // provide a path to the folder where you'll store translation data (see below)
    }),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'vue-i18n',
        // 'vue/macros',
        // '@vueuse/head',
        '@vueuse/core'
      ],
      dts: 'types/auto-imports.d.ts',
      // dirs: ['src/composables', 'src/store'],
      vueTemplate: true
    }),
    Components({
      extensions: ['vue'],
      include: [/\.vue$/, /\.vue\?vue/],
      dts: 'types/components.d.ts',
      dirs: ['src/components', 'src/views/**/components'],
      exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
      resolvers: []
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          'arcoblue-6': '#0083B0',
          'danger-6': '#DC2626'
        },
        javascriptEnabled: true
      }
    }
  }
})
