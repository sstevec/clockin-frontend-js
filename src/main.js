// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import Cookies from 'js-cookie'
import 'element-ui/lib/theme-chalk/index.css'
import VueI18n from 'vue-i18n'
import zh from "./lang/zh"
import zhc from "./lang/zhc"
import en from "./lang/en"
// 通过插件的形式挂载

Vue.use(VueI18n);
//console.log({...zh});
const messages={
  zh:{ ...zh},
  zhc:{ ...zhc},//添加
  en:{...en},
};

const i18n=new VueI18n({
  locale:Cookies.get('language') || 'zh',//添加
  messages,
})

Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  components: { App },
  template: '<App/>'
})
