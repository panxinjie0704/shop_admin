import Vue from 'vue';
// 引进vue是因为在下面运用到了vue了
import Router from 'vue-router';

// 路由懒加载，可以按需加载，缩短首屏加载的时间

const Home = () => import(/* webpackChunkName: 'home' */ '@/components/home/Home')
const Userlist = () => import(/* webpackChunkName: 'userlist' */'@/components/userlist')
const Rights = () => import(/* webpackChunkName: 'rights' */'@/components/rights')
const Roles = () => import(/* webpackChunkName: 'roles' */'@/components/roles')
const Categories = () => import(/* webpackChunkName: 'categories' */'@/components/categories')

// 说明：webpackChunkName 相同，那么，这两个组件会被打包生产一个JS文件
const Goods = () => import(/* webpackChunkName: 'goods' */'@/components/goods')
const goodAdd = () => import(/* webpackChunkName: 'goods' */'@/components/goods-add')

// 导入登录组件,不需要懒加载
import Login from '@/components/login/Login';

// import Home from '@/components/home/Home';

// import Userlist from '@/components/Userlist';

// // 导入rights组件
// import Rights from '@/components/rights';

// // 导入 roles 组件,因为文件名是index所以可以省略

// import Roles from '@/components/roles';

// // 商品的分类功能

// import Categories from '@/components/Categories';

// // 商品的列表的功能

// import Goods from '@/components/goods';

// // 商品添加页

// import goodAdd from '@/components/goods-add'

//下载router
Vue.use(Router);

const router = new Router({
  mode :'history',
  routes: [
    {
      path:'/',
      redirect:'/home'
    },
     {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      children:[
        {
          path:'/users',
          component:Userlist
        },
        {
          path:'/rights',
          component:Rights,
          // 这边不是components，不然会找不到组件
        },
       {
         path :'/roles',
         component :Roles,
       },
       {
         path :'/categories',
         component:Categories
       },
       
       {
        //  配置路由参数
         path :'/goods/:page?',
         component:Goods
       },
       {
       path:'/goods-add',
       component:goodAdd,
       meta:{
         keepAlive:true 
       }
       }
      ]
    },
   
  ]
})

//导航守卫

router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    next();
    return;
  }
  const token = localStorage.getItem('token');

  if (token) {
    next();
  } else {
    next('/login');
  }


});

export default router;
