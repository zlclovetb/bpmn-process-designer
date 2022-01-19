import Vue from "vue";
import App from "./App.vue";

import axios from "axios";
Vue.prototype.$axios = axios;

// 加载基础ElementUI
import ElementUI from "element-ui";
import i18n from './i18n/index';
import locale from 'element-ui/lib/locale/lang/en';
Vue.use(ElementUI, { locale });
import "../package/theme/element-variables.scss";

import { vuePlugin } from "../package/highlight";
import "highlight.js/styles/atom-one-dark-reasonable.css";
Vue.use(vuePlugin);

import MyPD from "../package/index.js";
Vue.use(MyPD);
import "../package/theme/index.scss";

import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css";

// import "bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css"; // 右边工具栏样式

if(process.env.NODE_ENV == "development"){
  axios.defaults.baseURL = '';
  require('./mock');
} else {
  axios.defaults.baseURL = '/Spring/';
}

new Vue({
  i18n,
  render: h => h(App)
}).$mount("#app");



