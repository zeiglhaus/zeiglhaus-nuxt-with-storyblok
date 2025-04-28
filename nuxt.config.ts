// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxt/icon',
    'nuxt-security',
    ['@storyblok/nuxt', { accessToken: 'XVm3HgGZZ3p3kEeNr4pnpAtt' }],
    '@nuxtjs/tailwindcss'
  ],
  devServer: {
    port: 3001,
    https: {
      key: './localhost-key.pem',
      cert: './localhost.pem'
    }
  },
  security: {
    headers: {
      contentSecurityPolicy: {
        'frame-ancestors': 'app.storyblok.com',
        'img-src': '*'
      },
    },
  },
})