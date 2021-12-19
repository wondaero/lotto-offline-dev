<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <aside class="fixed top0 left0 right0 bottom0 bg-000-0_5 z-idx5 flex a-items-c j-content-c pd10" :style="{background: '#808080d9 url(' + img.popup_bg + ')'}"
    v-if="popup.isOpen">
      <div class="mx-h100p bg-fff w100p mg0auto mx-w480 radius10">
        <header class="pd10 txt-r">
          <div class="inline-block txt-c" @click="popup.isOpen = false; popup.name = ''; popup.content = '';">
            <img :src="img.btn_x" width="20" alt="btn_x" class="v-top" />
          </div>
        </header>
        <section class="pd10">
          <init-num v-if="popup.isOpen && popup.name === 'initNum'"></init-num>
          <p v-if="!$store.state.name">{{$store.state.msg}}</p>
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
import popup_bg from '@/assets/img/popup_bg.png';

export default {
  name: 'App',
  data: () => {
    return {
      img: {
        btn_x: btn_x,
        popup_bg: popup_bg
      },
      popup: {
        isOpen: false,
        name: '',
      },
      test: 'aaa'
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
@import url('https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&display=swap');
#app {
  font-family: 'Nanum Pen Script', cursive;
  font-weight:900;
  font-size:1.125rem;
  /* font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}



</style>
