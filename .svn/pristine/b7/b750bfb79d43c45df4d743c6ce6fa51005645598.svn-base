// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ViewUI from 'view-design'
import i18n from '@/locale'
import config from '@/config'
import XLSX from "xlsx";
import importDirective from '@/directive'
import installPlugin from '@/plugin'
// import 'iview/dist/styles/iview.css'
import 'view-design/dist/styles/iview.css'
import './index.less' // 样式重置
// import './globle.less' // 全局变量
import '@/assets/icons/iconfont.css'
import _ from 'lodash'
import request from './libs/request'
import { _eventBus } from './libs/event-bus'
// import 'xe-utils'
// import VXETable from 'vxe-table'
// import 'vxe-table/lib/index.css'
// import './vex-tableReset.scss' // 样式重置
// Vue.use(VXETable, {
//   size: 'small',
//   zIndex: 99999, // 全局 zIndex 起始值
//   tooltipConfig: {
//     // zIndex: 300000
//   }
// })
// 右键菜单组件和样式
import contentmenu from 'v-contextmenu'
import 'v-contextmenu/dist/index.css'
Vue.use(contentmenu)

// 实际打包时应该不引入mock
/* eslint-disable */
//if (process.env.NODE_ENV !== 'production') require('@/mock')
window.ViewUI = ViewUI;
window.i18n = i18n;
//import 'lib-flexible/flexible.js'  //自动適配
//用于兄弟组件之间通信的事件总线
export const eventBus = _eventBus;
//Vue.prototype.$eventBus = eventBus
/* Vue.use(ViewUI, {
  i18n: (key, value) => i18n.t(key, value)
}) */
// ViewUI全局配置
Vue.use(ViewUI, {
	size: 'small',
	i18n: function(path, options) {
		let value = i18n.t(path, options)
		if(value !== null && value !== undefined) {
			return value
		}
		return ''
	}
})

/**
 * @description 注册admin内置插件
 */
installPlugin(Vue)
/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config
Vue.prototype._ = _

request.post('/common/sys/param').then(res=>{
        Vue.prototype.$params = res;
})
/**
 * 注册指令
 */
importDirective(Vue)

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	i18n,
	store,
	render: h => h(App),
  mounted(){
    _eventBus.$on("login-success",()=>{
      request.post('/common/sys/param').then(res=>{
              Vue.prototype.$params = res;
      })
    })
  }
})
