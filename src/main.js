import Vue from 'vue'
import App from './App.vue'
import store from './store'
import PortalVue from 'portal-vue'

Vue.config.productionTip = false
Vue.use(PortalVue)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
