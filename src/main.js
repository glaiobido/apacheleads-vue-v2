import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import ArgonDashboard from './plugins/argon-dashboard'
import 'es6-promise/auto'

import axios from 'axios'
import VueAxios from 'vue-axios'

// Vuex
import store from './store/store.js';

Vue.config.productionTip = false

Vue.use(ArgonDashboard)
Vue.use(VueAxios, axios)

axios.defaults.baseURL = "http://localhost:8000/api";
const token = localStorage.getItem('token');
if (token) {
   axios.defaults.headers.common['Authorization'] = token;
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
