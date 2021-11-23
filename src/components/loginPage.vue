<template>
  <div class="max-w500 mg0auto">
    <section class="flex a-items-c h100vh flex-col j-content-c" :style="`background:#f8f8f8 url(${img.initBg}) no-repeat; background-size:100% 100%;`">
      <div class="h100vh pd-b20 pd-t20p flex j-content-s-b flex-col w100p">
        <article class="flex a-items-c j-content-c">
          <h1 class="mp0 relative txt-c">
            <img :src="img.logoMiner" width="80" class="absolute top-40 left-40 rotate345">
            <img :src="img.logoLotto" width="120">
          </h1>
        </article>
        <article class="txt-c">
          <div class="flex v-items-c a-items-c txt-c flex-col" style="gap:3px;">
          <!-- <div class="flex v-items-c j-content-s-e txt-c flex-col" style="gap:10px;"> -->
          <!-- <div class="txt-c" style="display:inline-grid; grid-template-columns:1fr 1fr; gap:10px;"> -->
            <!-- <figure class="pd0 mg0 w200 radius10 bg-fff pd5 flex a-items-c" style="border:5px solid #e2e5ea;">
              <img :src="img.google" alt="구글 로그인" width="30" class="mg-r20"/>
              <figcaption class="w80 txt-l">
                <router-link to="/initPage" class="decoration-none color-000">구글</router-link>
              </figcaption>
            </figure> -->
            <router-link to="/initPage" class="decoration-none color-000">
              <figure class="pd0 mg0 w200 radius10 bg-fff pd5 flex a-items-c" style="border:5px solid #e2e5ea;">
                <img :src="img.google" alt="구글 로그인" width="30" class="mg-r20"/>
                <figcaption class="w80 txt-l">구글</figcaption>
              </figure>
            </router-link>
            <router-link to="/initPage" class="decoration-none color-000">
              <figure class="pd0 mg0 w200 radius10 bg-fff pd5 flex a-items-c" style="border:5px solid #31ae36;">
                <img :src="img.naver" alt="네이버 로그인" width="30" class="mg-r20"/>
                <figcaption class="w80 txt-l">네이버</figcaption>
              </figure>
            </router-link>
            <router-link to="/initPage" class="decoration-none color-000">
              <figure class="pd0 mg0 w200 radius10 bg-fff pd5 flex a-items-c" style="border:5px solid #f3dd23;">
                <img :src="img.kakao" alt="카카오 로그인" width="30" class="mg-r20"/>
                <figcaption class="w80 txt-l">카카오</figcaption>
              </figure>
            </router-link>
            <router-link to="/initPage" class="decoration-none color-000">
              <figure class="pd0 mg0 w200 radius10 bg-fff pd5 flex a-items-c" style="border:5px solid #405a90;">
                <img :src="img.facebook" alt="페이스북 로그인" width="30" class="mg-r20"/>
                <figcaption class="w80 txt-l">페이스북</figcaption>
              </figure>
            </router-link>
          </div>
        </article>
      </div>
    </section>
    <!-- <aside class="fixed top0 left0 right0 bottom0 bg-000-0_5 z-idx2 pd10 none">
      <div class="vertical-m mx-h100p bg-fff w80p mg0auto media-mx-w767-w100p radius10">
        <header class="h30 cf">
          <div class="float-r h30 w30 font30 txt-c line-h30px color-fff">
            &#10799;
          </div>
        </header>
      </div>
    </aside> -->
  </div>
</template>

<script>
import initBg from '@/assets/img/loginPage_bg.png';
import logoMiner from '@/assets/img/logo_txt_minor.png';
import logoLotto from '@/assets/img/logo_txt_lotto.png';

import facebook from '@/assets/img/sns/sns_facebook.png';
import google from '@/assets/img/sns/sns_google.png';
import kakao from '@/assets/img/sns/sns_kakao.png';
import naver from '@/assets/img/sns/sns_naver.png';


export default {
  name: 'loginPage',
  props: {
  },
  data: () => {
    return {
      img: {
        initBg: initBg,
        logoMiner: logoMiner,
        logoLotto: logoLotto,
        facebook: facebook,
        google: google,
        kakao: kakao,
        naver: naver,
      },
    }
  },

  methods: {
  },

  created() {
  },
  mounted() {
  }
}
</script>

<style scoped>
</style>
