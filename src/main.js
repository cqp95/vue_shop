import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
//导入全局样式表
import './assets/css/global.css'
//导入字体图标
import './assets/fonts/iconfont.css'
import TreeTable from 'vue-table-with-tree-grid'
//导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
//导入富文本编辑器对应的样式
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

import axios from 'axios'
//配置请求的根路径
axios.defaults.baseURL='http://127.0.0.1:8888/api/private/v1/'
//axios请求拦截
axios.interceptors.request.use(config=>{
  // console.log(config);
  //为请求头对象，添加Token验证的Authorization字段
  config.headers.Authorization=window.sessionStorage.getItem('token');
  //在最后必须return config
  return config;
})
Vue.prototype.$http=axios;
//阻止启动生产消息，常用作指令
Vue.config.productionTip = false
//定义组件
Vue.component('tree-table',TreeTable)
//将富文本编辑器，注册为全局可用的组件
Vue.use(VueQuillEditor)
//自定义过滤器，可被用于一些常见的文本格式化
Vue.filter('dateFormat',function(originVal){
  const dt=new Date(originVal)
  const y=dt.getFullYear()
  const m=(dt.getMonth()+1+'').padStart(2,'0')
  const d=(dt.getDate()+'').padStart(2,'0')

  const hh=(dt.getHours()+'').padStart(2,'0')
  const mm=(dt.getMinutes()+'').padStart(2,'0')
  const ss=(dt.getSeconds()+'').padStart(2,'0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`

})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')