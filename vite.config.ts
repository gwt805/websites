import { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { AntdvNextResolver } from '@antdv-next/auto-import-resolver';
import { webUpdateNotice } from "@plugin-web-update-notification/vite";
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/websites/',
  build: {
    outDir: "docs"
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [AntdvNextResolver(), ElementPlusResolver()],
    }),
    webUpdateNotice({
      versionType: "build_timestamp",
      checkInterval: 1000,
      checkOnWindowFocus: true,
      locale: "zh_CN",
      localeData: {
        en_US: {
          title: "📢 system update",
          description: "System update, please refresh the page",
          buttonText: "refresh",
          dismissButtonText: "dismiss",
        },
        zh_CN: {
          title: "📢 系统更新",
          description: "有新版本发布, 请刷新页面",
          buttonText: "好的",
          dismissButtonText: "取消",
        }
      }
    })
  ],
  resolve:{
    alias:{
      '@': resolve(__dirname,'./src')
    }
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    open: true
  }
})
