import { createApp } from 'vue'
import { Quasar } from 'quasar'
import router from './router/index'
import './assets/style.css'
import App from './App.vue'
// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'
// Import Quasar css
import 'quasar/src/css/index.sass'
//  主应用引入wujie
import WujieVue from "wujie-vue3";
const { bus, setupApp, preloadApp, destroyApp } = WujieVue;

setupApp({ name: "vue3", url: "//localhost:7300/", exec: true, sync: true })
setupApp({ name: "ApplicationManage", url: "//localhost:9528/", exec: true, sync: true })
// setupApp({ name: "subManage", url: "//localhost:7300/", exec: true, el: "容器", sync: true })
// setupApp({
//   name: "react16",
//   url: hostMap("//localhost:7600/"),
//   attrs,
//   exec: true,
//   props,
//   fetch: credentialsFetch,
//   plugins,
//   prefix: { "prefix-dialog": "/dialog", "prefix-location": "/location" },
//   degrade,
//   ...lifecycles,
// });

preloadApp({
    name: "vue3",
});
preloadApp({
    name: "ApplicationManage",
});


createApp(App).use(router).use(Quasar,{
    plugins:{}  // import Quasar plugins and add here
}).use(WujieVue).mount('#app')
