import { createApp } from 'vue'
import { Quasar,Dialog } from 'quasar'
import router from './router/index'
import './assets/style.css'
import App from './App.vue'
// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'
// ...
import iconSet from 'quasar/icon-set/fontawesome-v5'
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css'
// Import Quasar css
import 'quasar/src/css/index.sass'


createApp(App).use(router).use(Quasar, {
    plugins: {Dialog}, // import Quasar plugins and add here
    iconSet: iconSet
}).mount('#app')
