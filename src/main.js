/*!

 =========================================================
 * Vue Paper Dashboard - v2.0.0
 =========================================================

 * Product Page: http://www.creative-tim.com/product/paper-dashboard
 * Copyright 2019 Creative Tim (http://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard/blob/master/LICENSE.md)

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */
import Vue from "vue";
import App from "./App";
import router from "./router/index";
import BootstrapVue from 'bootstrap-vue'
import moment from 'moment'

/*********************************************************/
import axios from 'axios'
//import VueAxios from 'vue-axios'
 
//const app = Vue.createApp(...)
//Vue.use(VueAxios)
Vue.use(axios)

/*********************************************************/
import Ionic from "@ionic/vue";
import '@ionic/core/css/ionic.bundle.css';
Vue.use(Ionic);

/*********************************************************/
import PaperDashboard from "./plugins/paperDashboard";
import "vue-notifyjs/themes/default.css";
Vue.use(PaperDashboard);

/*********************************************************/
import VueToastr2 from 'vue-toastr-2'
import 'vue-toastr-2/dist/vue-toastr-2.min.css'

window.toastr = require('toastr') 
Vue.use(VueToastr2)

/*********************************************************/
import './components/matriz/declareComponents.js'


// Required to enable animations on dropdowns/tooltips/popovers
//Popper.Defaults.modifiers.computeStyle.gpuAcceleration = false

Vue.config.productionTip = false

Vue.use(BootstrapVue)
/*********************************************************/
import store from './store'

/*********************************************************/

axios.defaults.baseURL = 'http://127.0.0.1:8000/api';

Vue.filter('DateFormat',function(date){
  moment.locale('es');
  return moment(date).format('LL')
});
Vue.filter('ShortDate',function(date){
  moment.locale('es');
  return moment(date).format('L')
});
Vue.filter('FormatoDecimales',function(number){
  return parseFloat(number).toFixed(2);
});
Vue.filter('ThousandsSeparator', function(number){
var num = number.replace(/\./g,'');
if(!isNaN(num)){
  num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g,'$1.');
  num = num.split('').reverse().join('').replace(/^[\.]/,'');
  return num;
  }	
});

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
