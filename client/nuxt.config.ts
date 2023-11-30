// https://nuxt.com/docs/api/configuration/nuxt-config
import startSocketServer from './server/sockets'

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/eslint-module',
    '@nuxt/image',
    'nuxt-icon',
    'nuxt-headlessui'
  ],
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' }
  },
  hooks: { listen: server => startSocketServer(server) }
})