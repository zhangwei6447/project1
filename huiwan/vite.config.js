import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [vue()],
  server: {
    host: 'localhost',
    port: 9999,
    proxy: {
      "/apis": {
        target: 'http://127.0.0.1:8888',
        changeOrigin: true,
        rewrite: function (pathname) {
          return pathname.replace('/apis', '')
        }
      },
      "/yszh":{
        target: 'http://www.yszhsc.com:15666',
        changeOrigin: true,
        rewrite: (pathname) => {
          return pathname.replace('/yszh', '')
        }
      },
      "/bili":{
        target: 'https://i0.hdslb.com',
        changeOrigin: true,
        rewrite: (pathname) => {
          return pathname.replace('/bili', '')
        }
      },
    }
  }

})
