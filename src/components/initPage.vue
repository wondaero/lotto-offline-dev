<template>
  <div class="max-w500 mg0auto h100vh" :style="`background:#f8f8f8 url(${img.initBg}) no-repeat; background-size:100% 100%;`">
    <header class="flex j-content-sb pd10">
      <div class="flex a-items-c">
        <img :src="img.tier[0]" alt="등급" class="mg-r5 v-middle" width="30"/>
        <strong class="v-middle">최대여섯글자</strong>
      </div>
      <div class="flex a-items-c">
        <!-- <img :src="img.heart" alt="heart" width="20" class="v-middle"/> -->
        <strong class="v-middle">&#9829;&Cross;<span>3</span></strong>
      </div>
    </header>
    <section class="pd10 pd-t0" style="display:grid; grid-template-columns:1fr 1fr; gap:10px; grid-gap:10px; grid-template-rows:repeat(3, 80px);">
      <article class="border-ccc radius10 flex a-items-c j-content-c bg-eee" style="box-shadow:0 1px 1px #bbb;">스테이지모드</article>
      <article class="border-ccc radius10 flex a-items-c j-content-c bg-eee" style="box-shadow:0 1px 1px #bbb;">랭킹모드</article>
      <router-link to="/playGame" class="decoration-none color-000 border-ccc radius10 flex a-items-c j-content-c bg-fff" style="box-shadow:0 1px 1px #bbb;">
        <article>연습모드</article>
      </router-link>
      <article class="border-ccc radius10 flex a-items-c j-content-c bg-eee" style="box-shadow:0 1px 1px #bbb;">상점</article>
      <article class="border-ccc radius10 flex a-items-c j-content-c bg-eee" style="box-shadow:0 1px 1px #bbb;">설정</article>
      <article class="border-ccc radius10 flex a-items-c j-content-c bg-eee" style="box-shadow:0 1px 1px #bbb;"></article>
    </section>
  </div>
</template>

<script>
import initBg from '@/assets/img/initPage_bg.png';
import heart from '@/assets/img/heart.png';

//티어
import bronze from '@/assets/img/tier/bronze.png';
import silver from '@/assets/img/tier/silver.png';
import gold from '@/assets/img/tier/gold.png';
import platinum from '@/assets/img/tier/platinum.png';
import diamond from '@/assets/img/tier/diamond.png';
import master from '@/assets/img/tier/master.png';
import graduator from '@/assets/img/tier/graduator.png';


export default {
  name: 'initPage',
  props: {
  },
  data: () => {
    return {
      img: {
        initBg: initBg,
        heart: heart,
        tier: {
          0: bronze,
          1: silver,
          2: gold,
          3: platinum,
          4: diamond,
          5: master,
          6: graduator
        }
      },
    }
  },

  methods: {
  },

  created() {
  },
  mounted() {
    // const t = this;
    // const parent = t.$parent;
    // parent.popup.isOpen = false;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
