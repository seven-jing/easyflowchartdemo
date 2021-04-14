import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
import './plugins/element.js'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/reset.scss'
import '@/components/ef/index.css'
import '@/assets/css/element-blue-ui.scss'
import '@/assets/css/element-green-ui.scss'
import '@/assets/css/element-dark-ui.scss'
new Vue({
  render: h => h(App),
}).$mount('#app')
