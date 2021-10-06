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
                    <span class="inline-block w80 bg-000-0_2 h18 mg-l10 relative" v-if="isShowNumberBoard">
                      <span class="inline-block bg-blue absolute bottom0 left0 h100p bg-fff" :style="{width: 100 - ((100 / 120) * timer) + '%'}"></span>
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
                      <h5 class="mg0 mg-b5 txt-l">힌트({{difficulty}})</h5>
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

      difficulty: 0, //난이도

      setInterval: '',
      timer: 0
    }
  },

  methods: {
    initLotto() {
      if(confirm('로또 숫자를 초기화 하시겠습니까?')){
        const t = this;
        t.btnType = 'check';
        t.pickedBalls = [];
        t.btnState = {};
  
        document.querySelectorAll('[data-symbol]').forEach((currentValue) => {
          currentValue.classList.add('none');
        })
  
        clearInterval(t.setInterval);
        t.timer = 0;
  
        t.getRandomNum();
  
        t.setInterval = setInterval(() => {
          t.timer++;
  
          if(t.timer == 120){
            alert('문제가 초기화 됩니다.');
            t.timer = 0;
            clearInterval(t.setInterval);
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

        

        t.setInterval = setInterval(() => {
          t.timer++;

          if(t.timer == 120){
            alert('문제가 초기화 됩니다.');
            t.timer = 0;
            clearInterval(t.setInterval);
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
        let alphabets = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
        for(let i = 0 ; i < 9; i++){
          if(el == (1 + i) || el == (10 + i) || el == (19 + i) || el == (28 + i) || el == (37 + i)){
            colomns += alphabets[i];
          }
        }
      })

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
      홀: ${odds}, 짝: ${tmpArr.length - odds}
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


      // parent.querySelector('[data-symbol="' + (t.isTestBtn + t.btnType) + '"]').classList.remove('none');

      if(tmpArr.length > 0){
        t.pickedBalls = tmpArr.sort(function(a, b)  {
          if(a > b) return 1;
          if(a === b) return 0;
          if(a < b) return -1;
        });
      }

      // if(t.btnState[btnNum] == t.btnType){
      //   if(t.btnType == 'check' || t.btnType == 'check2'){
      //     let elemIdx = tmpArr.indexOf(Number(btnNum));
      //     if (elemIdx > -1){
      //       tmpArr.splice(elemIdx, 1);
      //     }
      //   }

      //   parent.querySelector('[data-symbol="' + t.btnType + '"]').classList.add('none');
      //   t.btnState[btnNum] = false;

      // }else{
      //   if(t.btnType == 'check' || t.btnType == 'check2'){
      //     if(tmpArr.length > 5){
      //       alert('6개를 넘을 수 없습니다.');
      //       return;
      //     }

      //     tmpArr.push(Number(btnNum));
      //   }else{
      //     let elemIdx = tmpArr.indexOf(Number(btnNum));
      //     if (elemIdx > -1){
      //       tmpArr.splice(elemIdx, 1);
      //     }
      //   }

      //   parent.querySelector('[data-symbol="' + t.btnType + '"]').classList.remove('none');
      //   t.btnState[btnNum] = t.btnType;
      // }

      // if(tmpArr.length > 0){
      //   t.pickedBalls = tmpArr.sort(function(a, b)  {
      //     if(a > b) return 1;
      //     if(a === b) return 0;
      //     if(a < b) return -1;
      //   });
      // }
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
            alert(t.randomNumArr7 + '\n5등 당첨!\n나의 숫자\n' + t.pickedBalls);
          break;
          case 4:
            alert(t.randomNumArr7 + '\n4등 당첨!\n나의 숫자\n' + t.pickedBalls);
          break;
          case 5:
            if(matchBonus){
              alert(t.randomNumArr7 + '\n2등 당첨!\n나의 숫자\n' + t.pickedBalls);
            }else{
              alert(t.randomNumArr7 + '\n3등 당첨!\n나의 숫자\n' + t.pickedBalls);
            }
          break;
          case 6:
            alert(t.randomNumArr7 + '\n1등 당첨!\n나의 숫자\n' + t.pickedBalls);
          break;
          default:
            alert(t.randomNumArr7 + '\n꽝!\n나의 숫자\n' + t.pickedBalls);
            break;
        }
      }
    },

    getQuestLevel() {
      const t = this;
      let copiedArr = JSON.parse(JSON.stringify(t.randomNumArr7));

      //초기화
      t.difficulty = 0;
      t.questLevel.row = {};
      t.questLevel.col = {};

      let arr45 = [];
      for(let i = 0; i < 45; i++){
        arr45.push(i + 1);
      }

      console.log(copiedArr);

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
          if(copiedArr[j] == (i + 1)){
            hasNumCnt++;
          }
          if(copiedArr[j] == (i + 10)){
            hasNumCnt++;
          }
          if(copiedArr[j] == (i + 19)){
            hasNumCnt++;
          }
          if(copiedArr[j] == (i + 28)){
            hasNumCnt++;
          }
          if(copiedArr[j] == (i + 37)){
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
        }else if(hasNumCnt > 1){
          t.difficulty -= (hasNumCnt - 1);
        }
      }

      for(let key in t.questLevel.row){ //가로세로체크(가로기준(row))
        let colCnt = 0;
        for(let key2 in t.questLevel.col){
          if(t.questLevel.col[key2] == 0){
            colCnt++;
          }
        }
        if(t.questLevel.row[key] + colCnt > 8){
          t.difficulty -= t.questLevel.row[key];
        }
      }

      for(let key in t.questLevel.col){ //가로세로체크(세로기준(col))
        let rowCnt = 0;
        for(let key2 in t.questLevel.row){
          if(t.questLevel.row[key2] == 0){
            rowCnt++;
          }
        }
        if(t.questLevel.col[key] + rowCnt > 4){
          t.difficulty -= t.questLevel.col[key];
        }
      }

      let copiedArrWithoutBonus = [];
      for(let i = 0; i < 6; i++){
        copiedArrWithoutBonus.push(copiedArr[i]);
      }
      let arrToStr = copiedArrWithoutBonus.join('').split('').sort().join('');

      let elObj = {};

      for(let i = 0; i < arrToStr.length; i++){
        if(!elObj[arrToStr[i]]){
          elObj[arrToStr[i]] = 1;
        }else{
          elObj[arrToStr[i]]++;
        }
      }

      for(let i = 0; i < 10; i++){
        if(!elObj[i]){
          t.difficulty--;
          for(let j = 0 ; j < arr45.length; j++){
            let hasNoNumIdx = String(arr45[j]).indexOf(i);
            if(hasNoNumIdx > -1){
              arr45.splice(j, 1);
            }
          }
        }
      }

      console.log(arr45);
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
