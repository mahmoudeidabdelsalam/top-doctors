import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import i18n from './i18n';

// Axios
import axios from 'axios';
import VueAxios from 'vue-axios';
// axios config
axios.defaults.headers.common['lang'] = i18n.locale;
Vue.use(VueAxios, axios);

// Axios progress bar
import 'axios-progress-bar/dist/nprogress.css';
import { loadProgressBar } from 'axios-progress-bar';
loadProgressBar();

// Vue Material icons
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
Vue.use(VueMaterial);

// VueToast Alerts
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
Vue.use(VueToast);

// Scss
import '@/assets/scss/app.scss';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
