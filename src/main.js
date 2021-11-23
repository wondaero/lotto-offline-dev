import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'

//css
import "./assets/css/normalize.css";
import "./assets/css/layout.css";

//js
import router from "./assets/router/router.js";


Vue.config.productionTip = false;
Vue.use(Router);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

router.replace('/playGame').catch(()=>{});  //초기페이지