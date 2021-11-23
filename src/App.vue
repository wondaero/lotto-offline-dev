<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <aside class="fixed top0 left0 right0 bottom0 bg-000-0_5 z-idx2 flex a-items-c j-content-c pd10" v-if="popup.isOpen">
      <div class="mx-h100p bg-fff w100p mg0auto mx-w480 radius10">
        <header class="h30 cf txt-r">
          <div class="inline-block w30 h30 font30 txt-c line-h20px" @click="popup.isOpen = false; popup.name = ''; popup.content = '';">&#10799;</div>
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

export default {
  name: 'App',
  data: () => {
    return {
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
