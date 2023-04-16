import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

let routes= [
  {
    path: '/',
    name: 'index',  
    redirect:"/userList",
    children:[
      {path:"/userList",component: () => import('../views/useList/useList.vue')},
      {path:"/userRoot",component: () => import('../views/useRoot/rootList.vue')},
      {path:"/shopList",component: () => import('../views/shop/shopList.vue')},
      {path:"/orderList",component: () => import('../views/order/orderList.vue')},
    ],
    component:  () => import('../views/index.vue')
  },
  {
    path: '/login',
    name: 'home',
    component:  () => import('../views/login.vue')
  },
  {
    path: '/menu',
    name: 'menu',
    component: () => import('../components/menu.vue')
  }
]
const router = createRouter(
  {
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
  }
)

export default router
