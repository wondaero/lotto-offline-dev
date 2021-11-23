import Vue from 'vue'
import Router from 'vue-router'

import initPage from "@/components/InitPage.vue"
import playGame from "@/components/PlayGame.vue"
import loginPage from "@/components/LoginPage.vue"

Vue.use(Router)

export default new Router({
  mode: 'history', // history 모드는 자연스러운 url 가능, 지정하지 않으면 해시(#)기호로 url 사용
  routes: [
      {
          path: "/initPage", // 경로
          name: "init", // 해당 경로의 이름 
          component: initPage // 이동할 컴포넌트
      },
      {
          path: "/loginPage", // 경로
          name: "login", // 해당 경로의 이름 
          component: loginPage // 이동할 컴포넌트
      },
      {
          path: "/playGame", // 경로
          name: "play", // 해당 경로의 이름 
          component: playGame // 이동할 컴포넌트
      },
  ]
})



