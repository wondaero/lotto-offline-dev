<template>
  <div class="max-w500 mg0auto" :style="{background:'#f8f8f8 url(' + mainBg + ') no-repeat 50% 0'}" style="background-attechment:fixed;">
    <header class="cf h45 border-box fixed top0 left50p w100p z-idx2 mx-w500 translate-x-50p pd-h15">
      <strong class="inline-block h100p line-h45px v-top">사소한 로또</strong>
    </header>
    <aside class="fixed top0 left0 right0 bottom0 bg-000-0_5 z-idx2 pd10 none">
      <div class="vertical-m mx-h100p bg-fff w80p mg0auto media-mx-w767-w100p radius10">
        <header class="h30 cf">
          <div class="float-r h30 w30 font30 txt-c line-h30px color-fff">
            &#10799;
          </div>
        </header>
      </div>
    </aside>
    <div class="h100vh pd-t45 border-box">
      <div class="h100p border-box overflow-y-auto">
        <div class="h100p border-box pd-h15">
          <div class="pd3 border-box">
            <section id="page_main" class="mg-b15">
                <article>
                  <h4 class="mp0 mg-b10 color-333">
                    <!-- <span>오늘의 사또</span> -->
                    <span>로또 맞추기</span>
                    <!-- <button class="w60 pd10 border0 outline0 mg-r5 radius50 font12 border-eee bg-fff mg-l5" @click="initLotto();">
                      <strong>리셋</strong>
                    </button> -->
                    <span class="inline-block w80 h18 mg-l10 relative" style="box-shadow:inset 0 0 10px #999;" v-if="isShowNumberBoard">
                      <span class="inline-block bg-blue absolute bottom0 left0 h100p"
                      :style="{width: 100 - ((100 / 120) * timer) + '%', background: timerColor}"></span>
                      <span class="w100p inline-block txt-c relative color-000">{{120 - timer}}</span>
                    </span>
                  </h4>
                  <div class="pd15 bg-fff-0_6 radius10 txt-c" style="box-shadow:0 1px 1px #bbb;">
                    <p class="mg0 font14 none">
                      참여시간: 08:00 ~ 19:59<br>
                      정답공개: 20:45 ~<br>
                      <strong class="inline-block mg-t10">*위 시간을 준수해주세요.</strong>
                    </p>
                    <div class="txt-c mg-b10">
                        <strong class="mg-r3 inline-block radius50p txt-c border-box bg-ddd" style="width:9vw; height:9vw; max-width:54px; max-height:54px;"
                        v-for="idx in 6" :key="idx">
                          <span class="vertical-m">?</span>
                        </strong>
                        <strong class="mg-r3">+</strong>
                        <strong class="mg-r3 inline-block radius50p txt-c border-box bg-ddd" style="width:9vw; height:9vw; max-width:54px; max-height:54px">
                          <span class="vertical-m">?</span>
                        </strong>
                    </div>
                    <div class="txt-c" v-if="!isShowNumberBoard">
                      <button class="w70 pd10 border0 outline0 mg-r5 radius50 font12 border-eee" style="background:#fd0;" @click="showNumberBoard();"><strong>참여</strong></button>
                    </div>
                    <div class="mg-b10 border-ddd radius10 pd10" v-if="isShowNumberBoard">
                      <h5 class="mg0 mg-b10 txt-l">
                        <span class="mg-r5">힌트</span>
                        <span>
                          <span class="font18 color-000-0_3" v-for="(idx) in 5" :key="idx"
                          :class="[starCnt >= idx ? 'color-ffd400' : '']">&#9733;</span>
                        </span>
                      </h5>
                      <div v-html="baseHint" class="mg-b10"></div>
                      <div v-if="isShowHint" v-html="moreHint"></div>
                      <h4 class="mg0"><strong class="font10 color-f00">*모든 힌트는 보너스 숫자를 포함하지 않습니다.</strong></h4>
                      <div class="mg-t10" v-if="!isShowHint">
                        <button class="w70 pd10 border0 outline0 mg-r5 radius50 font12 border-eee bg-fff" @click="showMoreHint();"><strong>더보기</strong></button>
                      </div>
                    </div>
                    <div class="pd-v10 mg-b10 border-v-dashed-ddd" v-if="isShowNumberBoard">
                      <div class="mg-b10">
                        <div class="txt-r mg-b10 btns">
                          <label class="mg-r15 relative top-2">
                            <input type="checkbox" class="mg-r3 relative top1" v-model="isTestBtn">
                            <span>가설</span>
                          </label>
                            <label class="mg-r10">
                              <input type="radio" name="btn" class="none" v-model="btnType" value="check" checked>
                              <img :src="icon.icon_o" width="15"/>
                            </label>
                            <label>
                              <input type="radio" name="btn" class="none" v-model="btnType" value="remove">
                              <img :src="icon.icon_x" width="15"/>
                            </label>
                        </div>
                        <div>
                          <div class="mg-b3">
                            <span class="inline-block radius50p border-box font11 color-fff relative bg-bbb" style="width:7.8vw; height:7.8vw; max-width:43px; max-height:43px;"
                            v-for="idx in 9" :key="idx" :class="{'mg-r3': idx != 9}">
                              <span class="vertical-m">{{colAlphabet[idx - 1]}}</span>
                            </span>
                          </div>
                          <div :class="{'mg-b3': idx != 5}" v-for="idx in 5" :key="idx">
                            <span class="inline-block radius50p border-box font11 color-fff relative" style="width:7.8vw; height:7.8vw; max-width:43px; max-height:43px;"
                            v-for="idx2 in 9" :key="idx2" :style="{background: ballColors[idx - 1]}" :class="{'mg-r3': idx2 != 9}">
                              <span class="vertical-m">{{((idx - 1) * 9) + idx2}}</span>
                              <img class="absolute top0 left0 right0 bottom0 font25 txt-c color-000 none radius50p" data-symbol="falsecheck" :src="icon.icon_o"/>
                              <img class="absolute top0 left0 right0 bottom0 font25 txt-c color-000 none radius50p" data-symbol="falseremove" :src="icon.icon_x"/>
                              <img class="absolute top0 left0 right0 bottom0 font25 txt-c color-000 none radius50p op0_3" data-symbol="truecheck" :src="icon.icon_o"/>
                              <img class="absolute top0 left0 right0 bottom0 font25 txt-c color-000 none radius50p op0_5" data-symbol="trueremove" :src="icon.icon_x"/>
                              <b class="absolute top0 left0 right0 bottom0 font25 txt-c color-000" @click.self="pickTheBall($event)"></b>
                            </span>
                          </div>
                        </div>
                      </div>
                      <h4 class="txt-c mg0">
                        {{pickedBalls.length}} / 6 
                      </h4>
                    </div>
                    <div class="txt-c" v-if="isShowNumberBoard">
                      <button class="w70 pd10 border0 outline0 mg-r5 radius50 font12 border-eee" style="background:#fd0;" @click="sumitTheNumber();"><strong>제출</strong></button>
                      <!-- <button class="w70 pd10 border0 outline0 mg-r5 radius50 font12 border-eee bg-fff" @click="showNumberBoard();"><strong>취소</strong></button> -->
                      <button class="w70 pd10 border0 outline0 mg-r5 radius50 font12 border-eee bg-fff" @click="initNum();"><strong>초기화</strong></button>
                      <button class="w60 pd10 border0 outline0 radius50 font12 border-eee bg-fff" @click="initLotto();"><strong>리셋</strong></button>
                    </div>
                  </div>
                </article>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mainBg from '@/assets/img/mainBg.png';
import icon_x from '@/assets/img/icon_x.svg';
import icon_o from '@/assets/img/icon_o.svg';


export default {
  name: 'lotto-offline',
  props: {
  },
  data: () => {
    return {
      mainBg: mainBg,
      icon: {
        icon_x: icon_x,
        icon_o: icon_o
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

      finishedNumArr: [],
      finishedNumCnt: 0,

      difficulty: 0, //난이도
      isShowDifficulty: false,
      starCnt: 0, 

      setInterval: '',
      timer: 0,
      timerColor: '#5af181'
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
  
        t.getRandomNum();
  
        t.setInterval = setInterval(() => {
          t.timer++;

          if(t.timer > 109){
            t.timerColor = '#f55222';
          }else if(t.timer > 59){
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
      for(let i = 0; i < 45; i++){
        arr45.push(i + 1);
      }

      let shuffledArr = getShuffleArr(arr45, 7);
      shuffledArr[0] = '+ ' + shuffledArr[0];


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
      t.getQuestLevel();
    },

    showNumberBoard() {
        const t = this;
        t.isShowNumberBoard = !t.isShowNumberBoard;
        t.pickedBalls = [];
        t.isTestBtn = false;
        
        t.setInterval = setInterval(() => {
          t.timer++;

          if(t.timer > 109){
            t.timerColor = '#f55222';
          }else if(t.timer > 59){
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
      for(let i = 0; i < 6; i++){
        tmpArr.push(t.randomNumArr7[i]);
      }
      let ballColors = [];

      tmpArr.forEach((el) => {
        //숫자 컬러
        if(el < 10){ballColors.push(t.ballColors[0])}
        else if(el < 19){ballColors.push(t.ballColors[1])}
        else if(el < 28){ballColors.push(t.ballColors[2])}
        else if(el < 37){ballColors.push(t.ballColors[3])}
        else{ballColors.push(t.ballColors[4])}

      })

      t.hint += '<p>';
      for(let i = 0; i < ballColors.length; i++){
        t.baseHint += `<strong class="inline-block radius50p border-box font11 color-fff mg-r3" style="width:7.8vw; height:7.8vw; max-width:60px; max-height:60px; background:${ballColors[i]};">
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
      let eachNum = []; //각 숫자별 자릿수의 차

      for(let i = 0; i < 6; i++){
        tmpArr.push(t.randomNumArr7[i]);
      }

      let arrToStr = tmpArr.join('').split('').sort().join('');
      let colomns = '';

      tmpArr.forEach((el) => {
        if(el % 2 == 1){  //홀짝
          odds++;
        }
        total += el;  //합계
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
        if(i == (colomns.length - 1)){
          changeStr += duplCnt;
        }
      }

      //출력

      t.moreHint += `<p class="mg0 mg-b10">
      홀: ${odds}개, 짝: ${tmpArr.length - odds}개
      </p>`;
      t.moreHint += `<p class="mg0 mg-b10">
      숫자구성: ${arrToStr}
      </p>`;
      t.moreHint += `<p class="mg0 mg-b10">
      모든 수의 합: ${total}
      </p>`;
      t.moreHint += `<p class="mg0 mg-b10">
      ${changeStr}
      </p>`;
      t.moreHint += `<p class="mg0 mg-b10">
      각 숫자별 자릿수의 차(절대값): ${eachNum}
      </p>`;

    },

    showMoreHint() {
      const t = this;
      if(t.isShowHint) return;
      if(confirm('힌트를 보려면 하트가 소진됩니다.\n진행하시겠습니까?')){
        t.isShowHint = true;
      }
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
          if (elemIdx > -1){
            tmpArr.splice(elemIdx, 1);
          }
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
          if (elemIdx > -1){
            tmpArr.splice(elemIdx, 1);
          }
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

    sumitTheNumber() {
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
      let copiedArr = JSON.parse(JSON.stringify(t.randomNumArr7));

      //초기화
      t.difficulty = 0;
      t.questLevel.row = {};
      t.questLevel.col = {};
      t.finishedNumCnt = 0;
      t.finishedNumArr = [];

      let arr45 = [];
      for(let i = 0; i < 45; i++){
        arr45.push(i + 1);
      }

      let removeCnt = 0;

      for(let i = 0 ; i < 5; i++){  //행 지우기(색깔)
        let hasNumCnt = 0;

        for(let j = 0; j < 45; j++){
          if((i * 9) < copiedArr[j] && copiedArr[j] < ((i * 9) + 10)){
            hasNumCnt++;
          }
        }

        t.questLevel.row[i] = hasNumCnt;

        if(hasNumCnt == 0){
          arr45.splice(((i * 9) - removeCnt), 9);
          removeCnt += 9;
          t.difficulty--;
        }else if(hasNumCnt > 2){
          t.difficulty -= (hasNumCnt - 2);
        }
      }

      for(let i = 0; i < 9; i++){ //열지우기(abc)
        let hasNumCnt = 0;
        for(let j = 0; j < copiedArr.length; j++){
          if(copiedArr[j] == (i + 1)
          || copiedArr[j] == (i + 10)
          || copiedArr[j] == (i + 19)
          || copiedArr[j] == (i + 28)
          || copiedArr[j] == (i + 37)){
            hasNumCnt++;
          }
        }
        t.questLevel.col[i] = hasNumCnt;

        if(hasNumCnt == 0){
          t.difficulty--;
          for(let k = 0; k < 5; k++){
            let elIdx = arr45.indexOf(i + (k * 9) + 1);
            if(elIdx > -1){
              arr45.splice(elIdx, 1);
            }
          }
        }
        // else if(hasNumCnt > 1){
        //   t.difficulty -= (hasNumCnt - 1);
        // }
      }

      let copiedArrWithoutBonus = [];
      let oddsCnt = 0;

      for(let i = 0; i < 6; i++){
        copiedArrWithoutBonus.push(copiedArr[i]);

        if(copiedArr[i] % 2 == 1){
          oddsCnt++;
        }
      }

      //홀짝으로 인한 난이도 체크
      if(oddsCnt == 1 || oddsCnt == 5){
        t.difficulty -= 1;
      }else if((oddsCnt == 0 || oddsCnt == 6)){
        t.difficulty -= 2;
      }

      let arrToStr = copiedArrWithoutBonus.join('').split('').sort().join('');
      let elObj = t.getStrCntObj(arrToStr);

      //숫자구성에 없는 것 제거
      for(let i = 0; i < 10; i++){
        if(!elObj[i]){
          t.difficulty--;
          let arr45Leng = arr45.length;
          let delCnt = 0;
          for(let j = 0 ; j < arr45Leng; j++){ //for문 가끔 누락...
            let hasNoNumIdx = String(arr45[j + delCnt]).indexOf(i);
            if(hasNoNumIdx > -1){
              arr45.splice(j + delCnt, 1);
              delCnt--;
            }
          }
        }
      }

      //056789 구성
      let num056789Arr = [];
      let valid056789NumArr = [];
      for(let key in elObj){
        if(key == 0 || key > 4){
          let tmpNum056789Arr = [];
          for(let i = 0 ; i < arr45.length; i++){
            if(String(arr45[i]).substr(-1) == key){
              num056789Arr.push(arr45[i]);
              tmpNum056789Arr.push(arr45[i]);
            }
          }
          if(elObj[key] >= tmpNum056789Arr.length){
            t.difficulty -= tmpNum056789Arr.length;

            tmpNum056789Arr.forEach((el) => {
              let matchedNum = arr45.indexOf(el);
              let matchedNum2 = copiedArrWithoutBonus.indexOf(el);
              if(matchedNum > -1){
                let finishedNum =  arr45.splice(matchedNum, 1);
                t.finishedNumCnt += finishedNum.length;
                t.finishedNumArr.push(finishedNum[0]);

                for(let i = 0; i < 9; i++){
                  if(i < 5){
                    if(i * 9 < el && el < (i * 9) + 10){  //row(색깔)
                      t.questLevel.row[i]--;
                    }
                  }

                  if(el == (i + 1)
                  || el == ((i + 1) + 9)
                  || el == ((i + 1) + 18)
                  || el == ((i + 1) + 27)
                  || el == ((i + 1) + 36)){ //col(ABC)
                    t.questLevel.col[i]--;
                  }
                }
              }

              if(matchedNum2 > -1){
                copiedArrWithoutBonus.splice(matchedNum2, 1);
              }
            })

            valid056789NumArr.push(key);
          }
        }
      }

      let removedNumArr = t.chkRemainNum(t.questLevel.row, t.questLevel.col, arr45);

      removedNumArr.forEach((el) => {
        let matchedNum = arr45.indexOf(el);
        let matchedNum2 = copiedArrWithoutBonus.indexOf(el);
        if(matchedNum > -1){
          let finishedNum =  arr45.splice(matchedNum, 1);
          t.finishedNumCnt += finishedNum.length;
          t.finishedNumArr.push(finishedNum[0]);

          // for(let i = 0; i < 9; i++){
          //   if(i < 5){
          //     if(i * 9 < el && el < (i * 9) + 10){  //row(색깔)
          //       t.questLevel.row[i]--;
          //       console.log('로우', t.questLevel.row[i], el, i);
          //     }
          //   }

          //   if(el == (i + 1)
          //   || el == ((i + 1) + 9)
          //   || el == ((i + 1) + 18)
          //   || el == ((i + 1) + 27)
          //   || el == ((i + 1) + 36)){ //col(ABC)
          //     t.questLevel.col[i]--;
          //     console.log('콜', t.questLevel.col[i], el, i);
          //   }
          // }
        }

        if(matchedNum2 > -1){
          copiedArrWithoutBonus.splice(matchedNum2, 1);
        }
      });


      // console.log(arr45);
      // console.log(copiedArrWithoutBonus);
      // console.log(t.finishedNumArr);
      // console.log('확정숫자갯수', t.finishedNumCnt);


      // console.log('difficulty', t.difficulty);


      // num056789Arr.forEach((el) => {
        //   let isValid = false;
      //     for(let i = 0; i < valid056789NumArr.length; i++){
      //       if(valid056789NumArr[i] == String(el).substr(-1)){
      //         isValid = true;
      //         break;
      //       }
      //     }

      //     if(isValid) arr45.splice(arr45.indexOf(el), 1);
      // })


      //임시
      // if(t.difficulty < -20){
      //   t.starCnt = 1;
      // }else if(t.difficulty < -15){
      //   t.starCnt = 2;
      // }else if(t.difficulty < -10){
      //   t.starCnt = 3;
      // }else if(t.difficulty < -7){
      //   t.starCnt = 4;
      // }else{
      //   t.starCnt = 5;
      // }

      if(t.finishedNumCnt < 1) t.starCnt = 5;
      else if(t.finishedNumCnt < 2) t.starCnt = 4;
      else if(t.finishedNumCnt < 4) t.starCnt = 3;
      else if(t.finishedNumCnt < 6) t.starCnt = 2;
      else t.starCnt = 1;



      console.log(t.startCnt);
      return t.difficulty;
    },

    getStrCntObj(str, loopCnt, obj) {
      if(isNaN(str)){
        console.log('String이 아닙니다.');
        return false;
      }
      
      const t = this;
      let cnt = loopCnt ? loopCnt : 0;
      let tmpObj = obj ? obj : {};

      if(tmpObj[str[cnt]]){
        tmpObj[str[cnt]]++;
      }else{
        tmpObj[str[cnt]] = 1;
      }

      if(++cnt != str.length) return t.getStrCntObj(str, cnt, tmpObj);

      return tmpObj;
    },

    chkRemainNum (row, col, remainedNum) {
        let confirmedNumArr = [];
        for(let key in row){  //row(색깔)
          let tmpConfirmedNumArr = [];
          remainedNum.forEach((el) => {
            if(Number(key) * 9 < el && el < (Number(key) * 9) + 10){
              tmpConfirmedNumArr.push(el);
            }
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
              if(confirmedNumArr.indexOf(el) == -1){
                confirmedNumArr.push(el);
              }
            })
          }
        }

        return confirmedNumArr;
      }
  },

  created() {
    const t = this;
    for(let i = 0; i < 45; i++){
      t.btnState[i + 1] = false;
    }
  },
  mounted() {
    const t = this;
    t.getRandomNum();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .btns img{opacity:0.3;}
  .btns input:checked + img{opacity:1;}
</style>
