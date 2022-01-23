<template>
  <div>
    <div class="flex a-items-c j-content-c" v-if="$store.state.popup.name === 'initLottoPopup'">
      <div>
        <p class="mp0 mg-b10">로또숫자를 리셋하시겠습니까?<br>리셋할 난이도를 선택해주세요.</p>
        <div>
          <div><label><input type="radio" name="starCnt" value="0" class="relative top2 mg-r5" v-model="starCnt"><span>랜덤</span></label></div>
          <div v-for="(idx) in 5" :key="idx">
            <label>
              <input type="radio" name="starCnt" :value="idx" class="relative top3 mg-r5" v-model="starCnt">
              <span>
                <img :src="[idx >= idx2 ? img.icon.star_on : img.icon.star_off]" v-for="(idx2) in 5" :key="idx2" alt="star" height="15"
                class="relative top3" :style="{'z-index': 5 - idx2, 'left': ((idx2 - 1) * -8) + 'px'}"/>
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>

    <div class="flex a-items-c j-content-c" v-if="$store.state.popup.name === 'checkNumPopup'">
      <div>
        <p class="mp0 mg-b10">아래 숫자로 제출하시겠습니까?</p>
        <div>
          <strong class="radius50p border-box font11 color-fff mg-r3 inline-flex j-content-c a-items-c"
          style="width:7.8vw; height:7.8vw; max-width:43px; max-height:43px;"
          :style="{background: 'url(' + img.balls[ballsColor[num - 1]] + ') no-repeat 50% / 100%'}"
          v-for="(num, idx) in $store.state.ref.playGame.pickedBalls" :key="idx">
          <span>{{num}}</span>
          </strong>
        </div>
      </div>
    </div>

    <div class="flex a-items-c j-content-c" v-if="$store.state.popup.name === 'resultNumPopup'">
      <div>
        <div>
          <strong class="v-top testtt">난이도: </strong>
          <span>
            <img :src="[$store.state.ref.playGame.starCnt >= idx ? img.icon.star_on : img.icon.star_off]" v-for="(idx) in 5" :key="idx" alt="star" height="15"
            class="relative top2" :style="{'z-index': 5 - idx, 'left': ((idx - 1) * -8) + 'px'}"/>
          </span>
        </div>
        <div class="mg-b5">
          <strong class="v-top">남은시간: </strong>
          <span class="inline-block">
            <span class="inline-block w80 h18 relative radius50 bg-eee overflow-hidden" style="box-shadow:0 1px 0 #ccc;">
              <span class="inline-block bg-blue absolute bottom0 left0 h100p radius50"
              :style="{width: 100 - ((100 / 120) * timer) + '%', background: `linear-gradient(to bottom, #eee, ${timerColor}, #eee)`}"></span>
              <strong class="w100p inline-block txt-c relative color-000 relative op1 font-w900">{{120 - timer}}</strong>
            </span>
          </span>
        </div>
        <div>
          <div class="mg-b5">
            <span class="radius50p border-box font11 color-fff mg-r3 inline-flex j-content-c a-items-c relative overflow-hidden"
            style="width:7.8vw; height:7.8vw; max-width:43px; max-height:43px;"
            :style="{background: 'url(' + img.balls[6] + ') no-repeat 50% / 100%'}" v-for="(num, idx) in $store.state.ref.playGame.pickedBalls" :key="idx">
              <span class="absolute top0 left0 w100p h100p op0" :style="{background: 'url(' + img.balls[ballsColor[num - 1]] + ') no-repeat 50% / 100%'}"></span>
              <!-- <span class="absolute top0 left0 w100p h100p" :style="{background: 'url(' + img.balls[ballsColor[num - 1]] + ') no-repeat 50% / 100%'}"
              v-if="$store.state.ref.playGame.randomNumArr7.indexOf(num) > -1"></span> -->
              <strong class="relative z-idx1" data-type="pickedBall">{{num}}</strong>
            </span>
          </div>
          <p class="mp0 h50"><span class="vertical-m" v-html="resultTxt"></span></p>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

import star_on from '@/assets/img/star_on.png';
import star_off from '@/assets/img/star_off.png';

import ball1 from '@/assets/img/balls/redBall.png';
import ball2 from '@/assets/img/balls/yellowBall.png';
import ball3 from '@/assets/img/balls/greenBall.png';
import ball4 from '@/assets/img/balls/blueBall.png';
import ball5 from '@/assets/img/balls/purpleBall.png';
import ball6 from '@/assets/img/balls/grayBall.png';

export default {
  name: 'popup',
  props: {},
  data: () => {
    return {
      img: {
        balls: {
          1: ball1,
          2: ball2,
          3: ball3,
          4: ball4,
          5: ball5,
          6: ball6
        },
        icon: {
          star_on: star_on,
          star_off: star_off
        }
      },
      starCnt: 1,
      ballsColor: [],
      timer: 0,
      timerColor: '',
      resultTxt: '',
    }
  },

  methods: {},
  created() {
    const t = this;
    t.$store.state.ref['popup'] = t;
    for(let i = 0; i < 45; i++){
      if(i < 9){t.ballsColor.push(1); continue;}
      if(i < 18){t.ballsColor.push(2); continue;}
      if(i < 27){t.ballsColor.push(3); continue;}
      if(i < 36){t.ballsColor.push(4); continue;}
      if(i < 45){t.ballsColor.push(5); continue;}
    }
  },
  mounted() {
    const t = this;
    const playGame = t.$store.state.ref.playGame;
    t.starCnt = playGame.setStarCnt;
    t.timer = playGame.timer;
    t.timerColor = playGame.timerColor;

    if(t.$store.state.popup.name === 'resultNumPopup'){
      let timer = 0;
      let matchedNums = 0;
      t.$nextTick(() => {
        document.querySelectorAll('[data-type]').forEach((el) => {
          if(playGame.randomNumArr7.indexOf(Number(el.innerHTML)) > -1){
            matchedNums++;
            setTimeout(() => {
              el.closest('span').querySelector('span').classList.add('matched');
            }, (500 * timer++));
          }
        });

        if(matchedNums == 6) clearInterval(playGame.setInterval);
        setTimeout(() => {
          t.resultTxt = (matchedNums == 6 ? '6개 모두 맞히셨습니다!' : `6개 중 ${matchedNums}개를 맞히셨습니다.`) + '<br>로또 숫자를 초기화 하시겠습니까?';
        }, 500 * timer);
      });
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  span.matched{opacity:1; transition:opacity 1s;}
</style>
