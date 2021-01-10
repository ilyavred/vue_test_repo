import Vue from 'vue'
import App from './App.vue'
import Coupon_input from './coupon_input.vue'
import App_work_sheduller from './app-work-sheduller.vue'
import Deal_thumbnail from './deal-thumbnail.vue'
import Deal_context_menu from './deal_context-menu.vue'

Vue.component ('app-coupon', Coupon_input)
Vue.component ('app-work-sheduller', App_work_sheduller)
Vue.component ('deal-thumbnail', Deal_thumbnail)
Vue.component ('deal-context-menu', Deal_context_menu)

new Vue({
  el: '#app',
  render: h => h(App),
  data: {

  }
})
