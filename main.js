import Vue from 'vue'
import App from './App.vue'
import Coupon_input from './coupon_input.vue'
import App_work_sheduller from './app-work-sheduller.vue'
import Deal_thumbnail from './deal-thumbnail.vue'

Vue.component ('app-coupon', Coupon_input)
Vue.component ('app-work-sheduller', App_work_sheduller)
Vue.component ('deal-thumbnail', Deal_thumbnail)

new Vue({
  el: '#app',
  render: h => h(App),
  data: {

  }
})
