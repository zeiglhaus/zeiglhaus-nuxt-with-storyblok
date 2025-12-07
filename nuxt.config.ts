// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  ssr: process.env.NUXT_PUBLIC_NODE_ENV === 'production',
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Zeiglhaus Parkstein e.V.',
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' }
      ]
    }
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/image',
    'nuxt-security',
    ['@storyblok/nuxt', { accessToken: 'XVm3HgGZZ3p3kEeNr4pnpAtt' }],
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts'
  ],
  image: {
    provider: 'storyblok',
    storyblok: {
      baseURL: 'https://a.storyblok.com'
    },
  },
  devServer: {
    port: 3001,
    https: {
      key: './localhost-key.pem',
      cert: './localhost.pem'
    }
  },
  googleFonts: {
    families: {
      Caveat: true,
      'Fira Mono': {
        wght: [400, 500, 700]
      },
      'Fira Sans': {
        wght: [400, 500, 600],
        ital: [100]
      },
    },
    display: 'swap',
    download: true,
    inject: true
  },
  security: {
    headers: {
      contentSecurityPolicy: {
        'frame-ancestors': 'app.storyblok.com',
        'img-src': "'self' a.storyblok.com data:",
        'script-src': `'self' 'unsafe-eval' https: ${process.env.NODE_ENV === 'development' ? "'unsafe-inline'" : ''}`,
        'script-src-attr': "'unsafe-inline'",
        'style-src': "'self' 'unsafe-inline' https:",
        'font-src': "'self' https: data:",
        'connect-src': "'self' https: wss:",
        'object-src': "'none'",
        'base-uri': "'self'"
      },
      xContentTypeOptions: false,
      xFrameOptions: false,
    },
  },
  runtimeConfig: {
    menuPassword: process.env.MENU_PASSWORD || '',
    storyblokManagementToken: process.env.STORYBLOK_MANAGEMENT_TOKEN || '',
    public: {
      NODE_ENV: process.env.NODE_ENV
    }
  },
})
