import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import Vuex from 'vuex'

//css
import "./assets/css/normalize.css";
import "./assets/css/layout.css";

//js
import router from "./assets/router/router.js";
import { store } from "./store.js";


Vue.config.productionTip = false;
Vue.use(Router);
Vue.use(Vuex);

new Vue({
  router,
  render: h => h(App),
  store: store,
}).$mount('#app')


router.replace('/playGame').catch(()=>{});  //초기페이지