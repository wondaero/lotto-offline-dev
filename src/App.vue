<template>
  <div id="app">
    <aside class="fixed top0 left0 right0 bottom0 bg-000-0_5 z-idx5 flex a-items-c j-content-c pd10" :style="{background: '#808080d9 url(' + img.layerBg + ')'}"
    v-if="$store.state.popup.isOpen">
      <div class="mx-h100p bg-fff w100p mg0auto mx-w480 radius10" v-if="$store.state.popup.isOpen">
        <header class="pd10 txt-r">
          <div class="inline-block txt-c" @click="$store.commit('initPopup');">
            <img :src="img.btn_x" width="20" alt="btn_x" class="v-top" />
          </div>
        </header>
        <section class="pd10">
          <article>
            <popup v-if="$store.state.popup.name"></popup>
            <p v-else>{{$store.state.popup.txt}}</p>
            <div class="txt-c border-t-dashed-ddd pd-t10 mg-t10">
              <button class="w70 pd10 border0 outline0 mg-r5 radius50 font12 border-eee" style="background:#ffdd00;"
              @click="$store.commit('btn_ok');"><strong>확인</strong></button>
              <button class="w70 pd10 border0 outline0 mg-r5 radius50 font12 border-eee"
              v-if="$store.state.popup.type === 'confirm'" @click="$store.commit('initPopup');">
                <strong>취소</strong>
              </button>
            </div>
          </article>

        </section>
      </div>
    </aside>
    <router-view />
  </div>
</template>

<script>
import btn_x from '@/assets/img/btn_x.svg';
import popup_bg from '@/assets/img/popup_bg.png';

import popup from '@/components/popup/popup.vue';


export default {
  name: 'App',
  data: () => {
    return {
      test: 'test',
      img: {
        layerBg: popup_bg,
        btn_x: btn_x,
      },
    }
  },
  mounted() {
  },
  components: {
    popup
    // MainPage,
    // MainPage2,
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=East+Sea+Dokdo&display=swap');

#app {
  font-family: 'East Sea Dokdo', cursive;
  font-weight:100;
  font-size:1.125rem;
  color:#333;
  /* font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}



</style>
