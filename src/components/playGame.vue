<template>
  <div class="max-w500 mg0auto h100vh flex a-items-c j-content-c" :style="{background:'#f8f8f8 url(' + img.mainBg + ') no-repeat 50% 0'}">
    <div class="border-box pd10 w100p">
      <!-- <header class="flex j-content-sb pd10">
        <div class="flex a-items-c">
          <img src="" class="mg-r5 v-middle" width="30"/>
          <strong class="v-middle">최대여섯글자</strong>
        </div>
        <div class="flex a-items-c">
          <strong class="v-middle">&#9829;&Cross;<span>3</span></strong>
        </div>
      </header> -->
      <div class="border-box">
        <section id="page_main">
            <article>
              <div class="pd10 bg-fff-0_6 radius10 txt-c" style="box-shadow:0 1px 1px #bbb;">
                <div class="flex j-content-sb a-items-c mg-b10">
                  <span>
                    <img :src="[starCnt >= idx ? img.icon.star_on : img.icon.star_off]" v-for="(idx) in 5" :key="idx" alt="star" height="15"
                    class="relative top2" :style="{'z-index': 5 - idx, 'left': ((idx - 1) * -8) + 'px'}"/>
                  </span>
                  <!-- <h5 class="mg0" @click="initLotto();">리셋</h5> -->
                  <h5 class="mg0" @click="openResetPopup();">리셋</h5>
                </div>
                <!-- <div class="mg-b10 border-ddd radius10 pd10"  v-if="isShowNumberBoard"> -->
                <div class="mg-b10 border-ddd radius10 pd10 overflow-y-auto" style="max-height:calc(100vh - 40vh - 195px);" v-if="isShowNumberBoard">
                  <div v-html="baseHint" class="mg-b5"></div>
                  <div v-if="isShowHint" v-html="moreHint"></div>
                  <div class="mg-t10" v-if="!isShowHint">
                    <button class="w70 pd10 border0 outline0 mg-r5 radius50 font12 border-eee bg-fff" @click="showMoreHint();"><strong>더보기</strong></button>
                  </div>
                </div>
                <div class="pd-v10 mg-b10 border-v-dashed-ddd" v-if="isShowNumberBoard">
                  <div>
                    <div class="mg-b10 btns flex j-content-sb a-items-c">
                      <span class="inline-block">
                        <!-- <span class="inline-block w80 h18 relative radius50 overflow-hidden bg-eee"
                        v-if="isShowNumberBoard"> -->
                        <span class="inline-block w80 h18 relative radius50 bg-eee overflow-hidden" style="box-shadow:0 1px 0 #ccc;" v-if="isShowNumberBoard">
                          <span class="inline-block bg-blue absolute bottom0 left0 h100p radius50"
                          :style="{width: 100 - ((100 / 120) * timer) + '%', background: `linear-gradient(to bottom, #eee, ${timerColor}, #eee)`}"></span>
                          <strong class="w100p inline-block txt-c relative color-000 relative op1" :class="timerEffectClass">{{120 - timer}}</strong>
                        </span>
                      </span>

                      <h4 class="txt-c mg0 inline-block">{{pickedBalls.length}} / 6</h4>
                      <div>
                        <label class="mg-r10">
                          <input type="checkbox" class="mg-r3 relative top1" v-model="isTestBtn">
                          <span>가설</span>
                        </label>
                        <label class="mg-r10 relative top2">
                          <input type="radio" name="btn" class="none" v-model="btnType" value="check" checked>
                          <img :src="img.icon.icon_o" width="15"/>
                        </label>
                        <label class="relative top2">
                          <input type="radio" name="btn" class="none" v-model="btnType" value="remove">
                          <img :src="img.icon.icon_x" width="15"/>
                        </label>
                      </div>
                    </div>
                    <div>
                      <div class="">
                        <span class="inline-block font11 color-bbb relative" style="width:8vw; height:8vw; max-width:43px; max-height:43px;"
                        v-for="idx in 9" :key="idx" :class="{'mg-r5': idx != 9}">
                          <span class="vertical-m">{{colAlphabet[idx - 1]}}</span>
                        </span>
                      </div>
                      <div :class="{'mg-b5': idx != 5}" v-for="idx in 5" :key="idx">
                        <span class="inline-block border-box font11 color-fff relative radius50p" style="width:8vw; height:8vw; max-width:43px; max-height:43px;"
                        v-for="idx2 in 9" :key="idx2" :style="{background:`url(${img.balls[idx]}) no-repeat 50%`, backgroundSize: '100%'}" :class="{'mg-r5': idx2 != 9}">
                          <span class="vertical-m">{{((idx - 1) * 9) + idx2}}</span>
                          <img class="absolute top0 left0 right0 bottom0 font25 txt-c color-000 none scale1_3" data-symbol="falsecheck" :src="img.icon.icon_o"/>
                          <img class="absolute top0 left0 right0 bottom0 font25 txt-c color-000 none scale1_3" data-symbol="falseremove" :src="img.icon.icon_x"/>
                          <img class="absolute top0 left0 right0 bottom0 font25 txt-c color-000 none scale1_3 op0_5" data-symbol="truecheck" :src="img.icon.icon_o"/>
                          <img class="absolute top0 left0 right0 bottom0 font25 txt-c color-000 none scale1_3 op0_5" data-symbol="trueremove" :src="img.icon.icon_x"/>
                          <b class="absolute top0 left0 right0 bottom0 font25 txt-c color-000" @click.self="pickTheBall($event)"></b>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="txt-c" v-if="isShowNumberBoard">
                  <button class="w70 pd10 border0 outline0 mg-r5 radius50 font12 border-eee" style="background:#fd0;" @click="submitTheNumber();"><strong>제출</strong></button>
                  <button class="w70 pd10 border0 outline0 mg-r5 radius50 font12 border-eee bg-fff" @click="initNum();"><strong>초기화</strong></button>
                  <!-- <div class="mg-b5"></div>
                  <select class="border0 outline0 border-eee w70 mg-r5 pd-h10 font12 radius50 v-top h35 bg-fff" v-model="setStarCnt">
                    <option value="0">랜덤</option>
                    <option :value="idx" v-for="idx in 5" :key="idx">&#9733;&#215;{{idx}}</option>
                  </select>
                  <button class="w70 pd10 border0 outline0 mg-r5 radius50 font12 border-eee bg-fff v-top" @click="initLotto();"><strong>리셋</strong></button> -->
                </div>
              </div>
            </article>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
//img
import mainBg from '@/assets/img/mainBg.png';
import icon_x from '@/assets/img/icon_x.svg';
import icon_o from '@/assets/img/icon_o.svg';

import star_on from '@/assets/img/star_on.png';
import star_off from '@/assets/img/star_off.png';

import ball1 from '@/assets/img/balls/redBall.png';
import ball2 from '@/assets/img/balls/yellowBall.png';
import ball3 from '@/assets/img/balls/greenBall.png';
import ball4 from '@/assets/img/balls/blueBall.png';
import ball5 from '@/assets/img/balls/purpleBall.png';


export default {
  name: 'playGame',
  props: {
  },

  data: () => {
    return {
      name: 'playGame',
      img: {
        balls: {
          1: ball1,
          2: ball2,
          3: ball3,
          4: ball4,
          5: ball5,
        },
        mainBg: mainBg,
        icon: {
          icon_x: icon_x,
          icon_o: icon_o,
          star_on: star_on,
          star_off: star_off
        },
      },
      ballColors: ['#F15A5A', '#F0C419', '#4EBA6F', '#2D95BF', '#955BA5'],
      pickedBalls: [],
      colAlphabet: 'ABCDEFGHI',

      btnType: 'check',
      btnState: {},
      isTestBtn: false,

      randomNumArr7: [],
      baseHint: '',
      moreHint: '',

      isShowNumberBoard: false,
      isShowHint: true,

      questLevel: {
        row: {},
        col: {}
      },

      isShowDifficulty: false,
      starCnt: 0,
      setStarCnt: 0,

      setInterval: '',
      timer: 0,
      timerColor: '#5af181',
      timerEffectClass: 'timer-effect2',

      gameLevel: {
        arr45: [],
        arr6: [],
        arr7: [],
        row: {},
        col: {},
      },

      // ledNum: {
      //   none: [],
      //   0: [0,1,2,3,5,6,8,9,11,12,13,14],
      //   1: [2,5,8,11,14],
      //   2: [0,1,2,5,6,7,8,9,12,13,14],
      //   3: [0,1,2,5,6,7,8,11,12,13,14],
      //   4: [0,2,3,5,6,7,8,11,14],
      //   5: [0,1,2,3,6,7,8,11,12,13,14],
      //   6: [0,1,2,3,6,7,8,9,11,12,13,14],
      //   7: [0,1,2,5,8,11,14],
      //   8: [0,1,2,3,5,6,7,8,9,11,12,13,14],
      //   9: [0,1,2,3,5,6,7,8,11,12,13,14],
      // },
    }
  },

  methods: {
    initLotto(boolean) {
      if(boolean || confirm('로또 숫자를 초기화 하시겠습니까?')){
        const t = this;
        t.btnType = 'check';
        t.pickedBalls = [];
        t.btnState = {};
        t.isTestBtn = false;
        
  
        document.querySelectorAll('[data-symbol]').forEach((currentValue) => {
          currentValue.classList.add('none');
        })
  
        clearInterval(t.setInterval);
        t.timer = 0;
        t.timerColor = '#5af181';

        let rdmNum = t.getRandomNum();
        if(t.setStarCnt > 0 && rdmNum != t.setStarCnt) return t.initLotto(true);

        t.timerEffectClass = 'timer-effect2';
  
        t.setInterval = setInterval(() => {
          t.timer++;

          // t.timerEffectClass = 'timer-effect';
          // setTimeout(() => {t.timerEffectClass = 'timer-effect2';}, 100);

          if(t.timer > 109){
            t.timerColor = '#f55222';
            t.timerEffectClass = 'timer-effect';
            setTimeout(() => {t.timerEffectClass = 'timer-effect2';}, 100);
          }
          else if(t.timer > 59){
            t.timerColor = '#f5e67e';
          }

          if(t.timer == 120){
            clearInterval(t.setInterval);
            return t.initLotto();
          }

        }, 1000);
      }
    },

    initNum() {
      if(confirm('숫자판을 초기화 하시겠습니까?')){
        const t = this;
        t.btnType = 'check';
        t.pickedBalls = [];
        t.btnState = {};
        t.isTestBtn = false;

        document.querySelectorAll('[data-symbol]').forEach((currentValue) => {
          currentValue.classList.add('none');
        })
      }
    },

    getRandomNum() {
      const t = this;
      
      const getShuffleArr = (arr, length, shuffledArr) => {
        const random = (min, max) => {
          return Math.floor((Math.random() * (max - (min - 1)) + min));
        }
        let tmpArr = arr;
        let tmpShuffledArr = shuffledArr == undefined ? [] : shuffledArr;

        tmpShuffledArr.push(tmpArr.splice(random(0, tmpArr.length - 1), 1)[0]);

        if(tmpShuffledArr.length !== length) return getShuffleArr(tmpArr, length, tmpShuffledArr);

        return tmpShuffledArr;
      }

      let arr45 = [];
      for(let i = 0; i < 45; i++) arr45.push(i + 1);

      let shuffledArr = getShuffleArr(arr45, 7);
      shuffledArr[0] = '+ ' + shuffledArr[0];

      t.randomNumArr7 = [];
      t.randomNumArr7 = shuffledArr.sort(function(a, b)  {
        if(a > b) return 1;
        if(a === b) return 0;
        if(a < b) return -1;
      });

      t.randomNumArr7.push(t.randomNumArr7.shift());  //첫번째와 마지막번째 위치 변경

      t.baseHint = '';
      t.moreHint = '';

      t.getBaseHint();
      t.getMoreHint();

      let questLevel = t.getQuestLevel();
      return questLevel;
    },

    showNumberBoard() {
        const t = this;
        t.isShowNumberBoard = !t.isShowNumberBoard;
        t.pickedBalls = [];
        t.isTestBtn = false;

        t.timerEffectClass = 'timer-effect2';

        
        t.setInterval = setInterval(() => {
          t.timer++;

          // t.timerEffectClass = 'timer-effect';
          // setTimeout(() => {t.timerEffectClass = 'timer-effect2';}, 100);

          if(t.timer > 109){
            t.timerColor = '#f55222';
            t.timerEffectClass = 'timer-effect';
            setTimeout(() => {t.timerEffectClass = 'timer-effect2';}, 100);
          }
          else if(t.timer > 59){
            t.timerColor = '#f5e67e';
          }

          if(t.timer == 120){
              clearInterval(t.setInterval);
              t.initLotto();
          }
        }, 1000);

    },

    getBaseHint() {
      const t = this;
      let tmpArr = [];
      for(let i = 0; i < 6; i++) tmpArr.push(t.randomNumArr7[i]);
      let ballColors = [];

      tmpArr.forEach((el) => {
        if(el < 10){ballColors.push(t.img.balls[1])}
        else if(el < 19){ballColors.push(t.img.balls[2])}
        else if(el < 28){ballColors.push(t.img.balls[3])}
        else if(el < 37){ballColors.push(t.img.balls[4])}
        else{ballColors.push(t.img.balls[5])}
      })

      t.hint += '<p>';
      for(let i = 0; i < ballColors.length; i++){
        t.baseHint += `<strong class="inline-block radius50p border-box font11 color-fff mg-r3"
        style="width:7.8vw; height:7.8vw; max-width:43px; max-height:43px; background:url(${ballColors[i]}) no-repeat 50%; background-size:100%;">
          <span class="vertical-m">?<span>
        </strong>`;
      }
      t.hint += '</p>';
    },

    getMoreHint() {
      const t = this;
      let tmpArr = [];
      let odds = 0;
      let total = 0;
      let multiTotal = 1;
      let eachNum = []; //각 숫자별 자릿수의 차

      for(let i = 0; i < 6; i++) tmpArr.push(t.randomNumArr7[i]);

      let arrToStr = tmpArr.join('').split('').sort().join('');
      let colomns = '';

      tmpArr.forEach((el) => {
        if(el % 2 == 1) odds++; //홀짝
        total += el;  //합계
        multiTotal *= el; //각숫자의 곱

        let alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
        for(let i = 0 ; i < 9; i++){
          if(el == (1 + i) || el == (10 + i) || el == (19 + i) || el == (28 + i) || el == (37 + i)){
            colomns += alphabets[i];
          }
        }
        //각 숫자별 자릿수의 차
        if(String(el).length == 1){
          eachNum.push(0);
        }else{
          let numValue = String(el)[0] - String(el)[1];
          eachNum.push(Math.abs(numValue)); 
        }

      })

      eachNum.sort();

      colomns = colomns.split('').sort().join('');

      let duplStr = colomns[0];
      let duplCnt = 0;
      let changeStr = colomns[0];

      for(let i = 0; i < colomns.length; i++){
        if(colomns[i] == duplStr){
          duplCnt++;
        }else{
          changeStr += duplCnt + colomns[i];
          duplCnt = 1;
        }
        duplStr = colomns[i];
        if(i == (colomns.length - 1)) changeStr += duplCnt;
      }

      //출력

      t.moreHint += `<p class="mg0 mg-b5">
      홀: ${odds}개, 짝: ${tmpArr.length - odds}개
      </p>`;
      t.moreHint += `<p class="mg0 mg-b5">
      숫자구성: ${arrToStr}
      </p>`;
      t.moreHint += `<p class="mg0 mg-b5">
      모든 수의 합: ${total}
      </p>`;
      t.moreHint += `<p class="mg0 mg-b5">
      ${changeStr}
      </p>`;
      t.moreHint += `<p class="mg0">
      모든 숫자의 곱: ${multiTotal}
      </p>`;

    },

    showMoreHint() {
      const t = this;
      if(t.isShowHint) return;
      if(confirm('힌트를 보려면 하트가 소진됩니다.\n진행하시겠습니까?')) t.isShowHint = true;
    },

    pickTheBall(target) {
      const t = this;

      let parent = target.target.closest('span');
      let btnNum = parent.querySelector('span').innerText;
      let tmpArr = t.pickedBalls;

      // parent.querySelectorAll('[data-symbol]').forEach((currentValue) => {
      //   currentValue.classList.add('none');
      // })

      if(t.btnState[btnNum] == (t.isTestBtn + t.btnType)){
        if(t.btnType == 'check'){
          let elemIdx = tmpArr.indexOf(Number(btnNum));
          if (elemIdx > -1) tmpArr.splice(elemIdx, 1);
        }

        parent.querySelectorAll('[data-symbol]').forEach((currentValue) => {
          currentValue.classList.add('none');
        })

        parent.querySelector('[data-symbol="' + (t.isTestBtn + t.btnType) + '"]').classList.add('none');
        t.btnState[btnNum] = false;

      }else{
        if(t.btnType == 'check'){
          if(tmpArr.length > 5 && String(t.btnState[btnNum]).indexOf('check') == -1){
            alert('6개를 넘을 수 없습니다.');
            return;
          }

          if(String(t.btnState[btnNum]).indexOf('check') == -1 || !t.btnState[btnNum]){
            tmpArr.push(Number(btnNum));
          }
        }else{
          let elemIdx = tmpArr.indexOf(Number(btnNum));
          if (elemIdx > -1) tmpArr.splice(elemIdx, 1);
        }

        parent.querySelectorAll('[data-symbol]').forEach((currentValue) => {
          currentValue.classList.add('none');
        })

        parent.querySelector('[data-symbol="' + (t.isTestBtn + t.btnType) + '"]').classList.remove('none');
        t.btnState[btnNum] = (t.isTestBtn + t.btnType);
      }

      if(tmpArr.length > 0){
        t.pickedBalls = tmpArr.sort(function(a, b)  {
          if(a > b) return 1;
          if(a === b) return 0;
          if(a < b) return -1;
        });
      }

    },

    submitTheNumber() {
      const t = this;
      if(t.pickedBalls.length != 6){
        alert('6개의 숫자를 선택해주세요.');
        return;
      }

      let matchCnt = 0;
      let matchBonus = false;

      if(confirm(t.pickedBalls + '\n위 숫자로 제출하시겠습니까?')){
        for(let i = 0; i < t.pickedBalls.length; i++){
          for(let j = 0; j < t.randomNumArr7.length; j++){
            if(j == (t.randomNumArr7.length - 1)){
              if(t.pickedBalls[i] == t.randomNumArr7[j].substr(2, t.randomNumArr7[j].length)){
                matchBonus = true;
              }
            }else{
              if(t.pickedBalls[i] == t.randomNumArr7[j]){
                matchCnt++;
                break;
              }
            }
          }
        }

        switch(matchCnt){
          case 3:
            alert('남은시간: ' + (120 - t.timer) + '\n' + t.randomNumArr7 + '\n5등 당첨!\n나의 숫자\n' + t.pickedBalls);
          break;
          case 4:
            alert('남은시간: ' + (120 - t.timer) + '\n' + t.randomNumArr7 + '\n4등 당첨!\n나의 숫자\n' + t.pickedBalls);
          break;
          case 5:
            if(matchBonus){
              alert('남은시간: ' + (120 - t.timer) + '\n' + t.randomNumArr7 + '\n2등 당첨!\n나의 숫자\n' + t.pickedBalls);
            }else{
              alert('남은시간: ' + (120 - t.timer) + '\n' + t.randomNumArr7 + '\n3등 당첨!\n나의 숫자\n' + t.pickedBalls);
            }
          break;
          case 6:
            alert('남은시간: ' + (120 - t.timer) + '\n' + t.randomNumArr7 + '\n1등 당첨!\n나의 숫자\n' + t.pickedBalls);
          break;
          default:
            alert('남은시간: ' + (120 - t.timer) + '\n' + t.randomNumArr7 + '\n꽝!\n나의 숫자\n' + t.pickedBalls);
            break;
        }

        t.initLotto();
      }
    },

    getQuestLevel() {
      const t = this;
      const lv = t.gameLevel;

      //초기값
      lv.arr7 = JSON.parse(JSON.stringify(t.randomNumArr7));  //깊은복사
      lv.arr45 = [];
      lv.arr6 = [];
      for(let i = 0; i < 45; i++) lv.arr45.push(i + 1);
      for(let i = 0; i < 6; i++) lv.arr6.push(lv.arr7[i]);
      
      const lv1 = () => {
        const t = this;
        const lv = t.gameLevel;
        //초기화
        lv.row = {};
        lv.col = {};

        t.removeRow();
        t.removeCol();
        t.removeNoNum();

        let chkedArr = t.chkRemainNum(lv.row, lv.col, lv.arr45);
        if(chkedArr.length && lv.arr6.length) return lv1();

        return lv.arr6;
      }

      const lv2 = () => {
        const t = this;
        const lv = t.gameLevel;
        if(!lv.arr6.length) return;

        if(t.removeNoNum2().length && lv.arr6.length){
          lv1();
          return lv2();
        }

      }

      if(!lv1().length) return t.starCnt = 1
      else lv2();

      if(lv.arr6.length > 5) t.starCnt = 5
      else if(lv.arr6.length > 4) t.starCnt = 4
      else if(lv.arr6.length > 2) t.starCnt = 3
      else t.starCnt = 2;

      return t.starCnt;
    },

    getStrCntObj(str, loopCnt, obj) {
      if(isNaN(str)){
        console.log('String이 아닙니다.');
        return false;
      }
      
      const t = this;
      let cnt = loopCnt ? loopCnt : 0;
      let tmpObj = obj ? obj : {};

      if(tmpObj[str[cnt]]) tmpObj[str[cnt]]++
      else tmpObj[str[cnt]] = 1;

      if(++cnt != str.length) return t.getStrCntObj(str, cnt, tmpObj);

      return tmpObj;
    },

    removeRow() { //행지우기(색깔)
      const t = this;
      const lv = t.gameLevel;

      // let removeCnt = 0;
      for(let i = 0 ; i < 5; i++){
        let hasNumCnt = 0;

        for(let j = 0; j < 45; j++){
          if((i * 9) < lv.arr6[j] && lv.arr6[j] < ((i * 9) + 10)) hasNumCnt++;
        }

        lv.row[i] = hasNumCnt;

        if(hasNumCnt == 0){
          // lv.arr45.splice(((i * 9) - removeCnt), 9);
          // removeCnt += 9;

          for(let k = 0; k < 9; k++){
            // let elIdx = lv.arr45.indexOf(i + (k * 9) + 1);
            let elIdx = lv.arr45.indexOf((i * 9) + k + 1);
            if(elIdx > -1){
              lv.arr45.splice(elIdx, 1);
            }
          }
        }
      }

    },

    removeCol() { //열지우기(abc)
      const t = this;
      const lv = t.gameLevel;
      for(let i = 0; i < 9; i++){
        let hasNumCnt = 0;
        for(let j = 0; j < lv.arr6.length; j++){
          if(lv.arr6[j] == (i + 1)
          || lv.arr6[j] == (i + 10)
          || lv.arr6[j] == (i + 19)
          || lv.arr6[j] == (i + 28)
          || lv.arr6[j] == (i + 37)){
            hasNumCnt++;
          }
        }
        lv.col[i] = hasNumCnt;

        if(hasNumCnt == 0){
          for(let k = 0; k < 5; k++){
            let elIdx = lv.arr45.indexOf(i + (k * 9) + 1);
            if(elIdx > -1) lv.arr45.splice(elIdx, 1);
          }
        }
      }
    },

    removeNoNum() { //없는 번호 지우기
      const t = this;
      const lv = t.gameLevel;
      let arrToStr = lv.arr6.join('').split('').sort().join('');
      let elObj = t.getStrCntObj(arrToStr);

      for(let i = 0; i < 10; i++){
        if(!elObj[i]){
          let arr45Leng = lv.arr45.length;
          let delCnt = 0;
          for(let j = 0 ; j < arr45Leng; j++){ //for문 가끔 누락...?
            let hasNoNumIdx = String(lv.arr45[j + delCnt]).indexOf(i);
            if(hasNoNumIdx > -1){
              lv.arr45.splice(j + delCnt, 1);
              delCnt--;
            }
          }
        }
      }
    },

    removeNoNum2() {
      //056789 구성(중급난이도)
      const t = this;
      const lv = t.gameLevel;
      let arrToStr = lv.arr6.join('').split('').sort().join('');
      let elObj = t.getStrCntObj(arrToStr);
      let num056789Arr = [];
      let valid056789NumArr = [];

      for(let key in elObj){
        if(key == 0 || key > 4){
          let tmpNum056789Arr = [];
          for(let i = 0; i < lv.arr45.length; i++){
            if(String(lv.arr45[i]).substr(-1) == key){
              num056789Arr.push(lv.arr45[i]);
              tmpNum056789Arr.push(lv.arr45[i]);
            }
          }
          if(elObj[key] >= tmpNum056789Arr.length){
            tmpNum056789Arr.forEach((el) => {
              let matchedNum = lv.arr45.indexOf(el);
              let matchedNum2 = lv.arr6.indexOf(el);
              if(matchedNum > -1){
                lv.arr45.splice(matchedNum, 1);
                for(let i = 0; i < 9; i++){
                  if(i < 5){
                    if(i * 9 < el && el < (i * 9) + 10){  //row(색깔)
                      lv.row[i]--;
                    }
                  }
                  if(el == (i + 1)
                  || el == ((i + 1) + 9)
                  || el == ((i + 1) + 18)
                  || el == ((i + 1) + 27)
                  || el == ((i + 1) + 36)){ //col(ABC)
                    lv.col[i]--;
                  }
                }
              }

              if(matchedNum2 > -1) lv.arr6.splice(matchedNum2, 1);
            })
            valid056789NumArr.push(key);
          }
        }
      }
      // console.log(valid056789NumArr);
      return valid056789NumArr;
    },

    chkRemainNum (row, col, remainedNum) {
      const t = this;
      let confirmedNumArr = [];
      for(let key in row){  //row(색깔)
        let tmpConfirmedNumArr = [];
        remainedNum.forEach((el) => {
          if(Number(key) * 9 < el && el < (Number(key) * 9) + 10) tmpConfirmedNumArr.push(el);
        })

        if(row[key] >= tmpConfirmedNumArr.length){
          tmpConfirmedNumArr.forEach((el) => {
            confirmedNumArr.push(el);
          })
        }
      }

      for(let key in col){  //col(abc)
        let tmpConfirmedNumArr = [];
        remainedNum.forEach((el) => {
          if(el == (Number(key) + 1)
          || el == ((Number(key) + 1) + 9)
          || el == ((Number(key) + 1) + 18)
          || el == ((Number(key) + 1) + 27)
          || el == ((Number(key) + 1) + 36)){
            tmpConfirmedNumArr.push(el);
          }
        })

        if(col[key] >= tmpConfirmedNumArr.length){
          tmpConfirmedNumArr.forEach((el) => {
            if(confirmedNumArr.indexOf(el) == -1) confirmedNumArr.push(el);
          })
        }
      }

      if(confirmedNumArr.length){
        // alert('있어');
        confirmedNumArr.forEach(function(el){
          let numIdx45 = t.gameLevel.arr45.indexOf(el);
          let numIdx6 = t.gameLevel.arr6.indexOf(el);
          t.gameLevel.arr45.splice(numIdx45, 1);
          t.gameLevel.arr6.splice(numIdx6, 1);
          row[parseInt(el / 9.1)] -= 1;
          col[(el % 9) - 1] -= 1;
        });
        // return t.chkRemainNum(row, col, remainedNum);
      }

      return confirmedNumArr;
    },

    openResetPopup () {
      const t = this;
      const parent = t.$parent;
      parent.popup.isOpen = true;
      parent.popup.name = 'initNum';
    },
  },

  created() {
    const t = this;
    for(let i = 0; i < 45; i++){
      t.btnState[i + 1] = false;
    }
    // t.getRandomNum();
    // t.showNumberBoard();
  },
  mounted() {
      const t = this;
      t.getRandomNum();
      t.showNumberBoard();
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .btns img{opacity:0.3;}
  .btns input:checked + img{opacity:1;}

  .timer-effect{opacity:1; transform:scaleX(2);}
  .timer-effect2{opacity:1; transform:scaleX(1); transition:all .5s cubic-bezier(0.68, -0.55, 0.27, 1.55);}
</style>
