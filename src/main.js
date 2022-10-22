import { createApp } from 'vue'
// import App from './components/FormsBuilder.vue'
import App from './components/FormsCreated.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

loadFonts()

createApp(App)
  .use(vuetify)
  .mount('#app')