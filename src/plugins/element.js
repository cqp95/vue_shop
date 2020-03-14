import Vue from 'vue'
import { Button } from 'element-ui'
import { Form,FormItem } from 'element-ui'
import { Input } from 'element-ui'//导入
import { Message } from 'element-ui' //导入弹框提示组件

Vue.use(Button)//全局
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.prototype.$message=Message//需要进行全局挂载
