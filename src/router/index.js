import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/user/Users.vue'
import Rights from '../components/power/Rights.vue'
import Roles from '../components/power/Roles.vue'
import Cate from '../components/goods/Cate.vue'

Vue.use(VueRouter)

// const routes = [
//   {
//     path: '/',
//     name: 'Home',
//     component: Home
//   },
//   {
//     path: '/about',
//     name: 'About',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
//   }
// ]

const router = new VueRouter({
  routes:[
    {path:'/',redirect:'/login'},//路由重定向
    {path:'/login',component: Login },
    {path:'/home',component: Home,redirect:'/welcome',children:[//重定向到子路由
      {path:'/welcome',component: Welcome },
      {path:'/users',component: Users },
      {path:'/rights',component: Rights },
      {path:'/roles',component: Roles },
      {path:'/categories',component: Cate }
    ] },
  ]
})

//挂载路由导航守卫
//为路由对象，添加beforeEach导航守卫
router.beforeEach((to,from,next)=>{
  //to 将要访问的路径
  //from 代表从哪个路径跳转而来
  //next是一个函数，表示放行
  //next() 放行  next('/login')  强制跳转
  //如果用户访问的登录页，直接放行
  if(to.path==='/login')return next();
  //获取token
  const tokenStr=window.sessionStorage.getItem('token');
  //没有token，强制跳转到登录页
  if(!tokenStr)return next('/login');
  next();
})

export default router
