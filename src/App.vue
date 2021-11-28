<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <aside class="fixed top0 left0 right0 bottom0 bg-000-0_5 z-idx5 flex a-items-c j-content-c pd10" v-if="popup.isOpen">
      <div class="mx-h100p bg-fff w100p mg0auto mx-w480 radius10">
        <header class="pd10 txt-r">
          <div class="inline-block txt-c" @click="popup.isOpen = false; popup.name = ''; popup.content = '';">
            <img :src="img.btn_x" width="20" alt="btn_x" class="v-top" />
          </div>
        </header>
        <section class="pd10">
          <init-num v-if="popup.isOpen && popup.name === 'initNum'"></init-num>
        </section>
      </div>
    </aside>
    <router-view />
  </div>
</template>

<script>
import initNum from './components/popup/InitNum.vue'
// import MainPage from './components/MainPage';
// import MainPage2 from './components/MainPage2';

import btn_x from '@/assets/img/btn_x.svg';

export default {
  name: 'App',
  data: () => {
    return {
      img: {
        btn_x: btn_x
      },
      popup: {
        isOpen: false,
        name: '',
      }
    }
  },
  components: {
    initNum
    // MainPage,
    // MainPage2,
  }
}
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
