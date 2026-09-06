// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
    '@vueuse/nuxt'
  ],

  app: {
    head: {
      title: 'Studywiz - ศูนย์แนะแนวศึกษาต่อต่างประเทศครบวงจร',
      htmlAttrs: {
        lang: 'th'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Studywiz สถาบันแนะแนวศึกษาต่อต่างประเทศ ก่อตั้งปี 2528 สมาชิก TIECA & FELCA แนะแนวเรียนต่อภาษา มัธยม วิทยาลัย และมหาวิทยาลัยชั้นนำทั่วโลก'
        },
        { name: 'theme-color', content: '#1A56DB' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Prompt:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap'
        }
      ]
    }
  },

  css: ['~/assets/css/main.css'],

  nitro: {
    prerender: {
      crawlLinks: true,
      ignore: ['/admin']
    }
  }
});
