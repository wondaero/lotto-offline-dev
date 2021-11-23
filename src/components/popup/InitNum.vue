<template>
  <div class="flex a-items-c j-content-c">
    <div>
      <p class="mp0 mg-b10">로또숫자를 리셋하시겠습니까?<br>리셋할 난이도를 선택해주세요.</p>
      <div class="mg-b10">
        <div><label><input type="radio" name="starCnt" value="0" class="relative top2 mg-r5" v-model="starCnt"><span>랜덤</span></label></div>
        <div><label><input type="radio" name="starCnt" value="1" class="relative top3 mg-r5" v-model="starCnt"><span style="color:#ffd400;">&#9733;</span></label></div>
        <div><label><input type="radio" name="starCnt" value="2" class="relative top3 mg-r5" v-model="starCnt"><span style="color:#ffd400;">&#9733;&#9733;</span></label></div>
        <div><label><input type="radio" name="starCnt" value="3" class="relative top3 mg-r5" v-model="starCnt"><span style="color:#ffd400;">&#9733;&#9733;&#9733;</span></label></div>
        <div><label><input type="radio" name="starCnt" value="4" class="relative top3 mg-r5" v-model="starCnt"><span style="color:#ffd400;">&#9733;&#9733;&#9733;&#9733;</span></label></div>
        <div><label><input type="radio" name="starCnt" value="5" class="relative top3 mg-r5" v-model="starCnt"><span style="color:#ffd400;">&#9733;&#9733;&#9733;&#9733;&#9733;</span></label></div>
      </div>
      <div class="txt-c border-t-dashed-ddd pd-t10">
        <button class="w70 pd10 border0 outline0 mg-r5 radius50 font12 border-eee" style="background:#ffdd00;" @click="initNum();"><strong>리셋</strong></button>
        <button class="w70 pd10 border0 outline0 mg-r5 radius50 font12 border-eee" @click="closePopup();"><strong>취소</strong></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'popup_initNum',
  props: {},
  data: () => {
    return {
      starCnt: 1
    }
  },

  methods: {
    initNum () {
      const t = this;
      t.$root.$children[0].$children.forEach((el) => {
        if(el.name != 'playGame') return true;
        el.setStarCnt = Number(t.starCnt);
        el.initLotto(true);
        t.closePopup();
      });
    },
    closePopup () {
      const t = this;
      t.$parent.popup.isOpen = false;
      t.$parent.popup.name = '';
      t.$parent.popup.content = '';
    }
  },

  created() {
  },
  mounted() {
    const t = this;
    t.$root.$children[0].$children.forEach((el) => {
      if(el.name != 'playGame') return true;
      t.starCnt = el.setStarCnt;
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
