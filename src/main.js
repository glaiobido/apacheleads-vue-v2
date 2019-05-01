import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ArgonDashboard from './plugins/argon-dashboard'
import './registerServiceWorker'
// import 'es6-promise/auto'

import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSweetalert2 from 'vue-sweetalert2';

// Vuex
import store from './store/store.js';

Vue.config.productionTip = false

Vue.use(ArgonDashboard);
Vue.use(VueAxios, axios);
Vue.use(VueSweetalert2);

axios.defaults.baseURL = "http://localhost:8000/api";

axios.interceptors.request.use(
    (config) => {
      let token = localStorage.getItem('token')
  
      if (token) {
        config.headers['Authorization'] = 'Bearer '.concat(token);
      }
  
      return config
    },
  
    (error) => {
      return Promise.reject(error)
    }
);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
