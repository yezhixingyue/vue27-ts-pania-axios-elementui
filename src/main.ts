import Vue from 'vue';
import App from './App.vue';
import router from './router'
import './assets/css/index.scss';
import { createPinia, PiniaVuePlugin } from 'pinia'
import './assets/js/loadElement';

Vue.use(PiniaVuePlugin);
const pinia = createPinia()

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  pinia,
  router,
}).$mount('#app');
