import unocss from 'unocss/vite'
import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import postcssNested from 'postcss-nested'
import adonisjs from '@adonisjs/vite/client'
import { getDirname } from '@poppinss/utils'
import inertia from '@adonisjs/inertia/client'

export default defineConfig({
  plugins: [
    // @ts-expect-error missing types
    unocss(),
    inertia({
      ssr: {
        enabled: true,
        entrypoint: 'resources/ssr.ts',
      },
    }),
    vue({
      script: { defineModel: true },
      template: { compilerOptions: { isCustomElement: (tag) => ['model-viewer'].includes(tag) } },
    }),
    adonisjs({
      entrypoints: ['resources/app.ts'],
      reload: ['resources/views/**/*.edge'],
    }),
  ],

  resolve: {
    alias: {
      '@/': `${resolve(getDirname(import.meta.url), 'resources')}/`,
      '~/': `${resolve(getDirname(import.meta.url), '.')}/`,
    },
  },

  css: { postcss: { plugins: [postcssNested] } },
})
