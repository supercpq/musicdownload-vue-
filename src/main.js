import Vue from 'vue'
import App from './App.vue'
import { Button, Input, Autocomplete } from 'element-ui'
import store from './store'

Vue.component(Button.name, Button)
Vue.component(Input.name, Input)
Vue.component(Autocomplete.name, Autocomplete)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
  beforeCreate() {
    Vue.prototype.$bus = this//安装全局事件总线
  }
}).$mount('#app')
