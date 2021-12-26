import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// export default createStore({
export const store = new Vuex.Store({
    state: {
        ref: {},
        isMobile: false,
        cookie: { //위치 변경 예정
          get: function (name) {
              var nameEQ = name + "=";
              var ca = document.cookie.split(';');
              for (var i = 0; i < ca.length; i++) {
                  var c = ca[i];
                  while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                  if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
              }
              return null;
          },
          set: function (name, value, days) {
              var expires = "";
              if (days) {
                  var date = new Date();
                  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                  expires = "; expires=" + date.toUTCString();
              }
              document.cookie = name + "=" + (value || "") + expires + "; path=/";
          }
        },
        popup: {
          isOpen: false,
          name: '',
          txt: '',
          type: '',  //alert, confirm
          trueCallback: ''
        },
        test: 'test'
    },
    mutations: {
        isMobile(state) {
          let UserAgent = navigator.userAgent;
          if (UserAgent.match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null
          || UserAgent.match(/LG|SAMSUNG|Samsung/) != null){
            state.isMobile = true;
          }else{
            state.isMobile = false;
          }
        },
        test(state, option) {
          console.log(option);
        },
        alert2(state, option){
          this.commit('initPopup');
          state.popup.txt = option.txt;
          state.popup.isOpen = true;
          state.popup.type = 'alert';
        },

        confirm2(state, option){
          this.commit('initPopup');
          state.popup.name = option.name;
          if(!state.popup.name) state.popup.txt = option.txt;
          state.popup.isOpen = true;
          state.popup.type = 'confirm';
          state.popup.trueCallback = option.fnc;
        },
        
        initPopup(state){
          state.popup.isOpen = false;
          state.popup.name = '';
          state.popup.txt = '';
          state.popup.type = '';
          state.popup.trueCallback = undefined;
        },

        btn_ok(state){
          const fnc = state.popup.trueCallback;
          this.commit('initPopup');
          typeof fnc === 'function' ? fnc() : '';
        }
    },

    ref: {
    },
});