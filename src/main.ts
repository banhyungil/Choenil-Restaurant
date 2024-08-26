import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
// import { fas } from '@fortawesome/free-solid-svg-icons'
import { fas } from '@fortawesome/pro-solid-svg-icons'
import { faSquare } from '@fortawesome/pro-regular-svg-icons'
import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, fa } from 'vuetify/iconsets/fa-svg'

import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'fa',
    aliases,
    sets: {
      fa,
    },
  },
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#2aac8e',
          success: '#5697d4',
          warning: '#fa4a4a',
        },
      },
    },
  },
})
const app = createApp(App)

/* add icons to the library */
library.add(fas)
library.add(faSquare)
app.component('font-awesome-icon', FontAwesomeIcon)
app.component('VueDatePicker', VueDatePicker)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)

app.use(router)
app.use(vuetify)
app.use(FloatingVue)

app.mount('#app')
