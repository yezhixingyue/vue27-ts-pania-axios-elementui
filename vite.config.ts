import { fileURLToPath, URL } from 'node:url'
import { defineConfig, splitVendorChunkPlugin } from 'vite';
import vue from '@vitejs/plugin-vue2';
import legacy from '@vitejs/plugin-legacy';
import vueJsx from '@vitejs/plugin-vue2-jsx';
import Components from 'unplugin-vue-components/vite';
import { ElementUiResolver } from 'unplugin-vue-components/resolvers';
import { createStyleImportPlugin } from 'vite-plugin-style-import';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    splitVendorChunkPlugin(),
    legacy({
      targets: ['defaults']
    }),
    vueJsx({
      // options are passed on to @vue/babel-preset-jsx
    }),
    // Components({
    //   resolvers: [ElementUiResolver()],
    // }),
    // createStyleImportPlugin({
    //   libs: [
    //     {
    //       libraryName: 'element-ui',
    //       esModule: true,
    //       ensureStyleFile: true,
    //       resolveStyle: (name) => {
    //         return `element-ui/lib/theme-chalk/${name}.css`;
    //       },
    //     }
    //   ],
    // }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'element-ui': ['element-ui'],
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '0.0.0.0',
    proxy: {
      '/Api': {
        target: 'http://192.168.1.92:8060',
        changeOrigin: true,
      },
    }
  },
})
