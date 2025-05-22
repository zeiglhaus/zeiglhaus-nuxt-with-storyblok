// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxt/icon',
    'nuxt-security',
    ['@storyblok/nuxt', { accessToken: 'XVm3HgGZZ3p3kEeNr4pnpAtt' }],
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts'
  ],
  devServer: {
    port: 3001,
    https: {
      key: './localhost-key.pem',
      cert: './localhost.pem'
    }
  },
  googleFonts: {
    families: {
      Fraunces: true,
      Montserrat: {
        // Common weights for body text:
        wght: [300, 400, 500, 600, 700],
        ital: [100]
      },
      Caveat: true
    },
    display: 'swap',
    download: true,
    inject: true
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