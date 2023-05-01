import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

let routes= [
  {
    path: '/',
    name: 'index',  
    redirect:"/userList",
    children:[
      {path:"/userList",component: () => import('../views/useList/useList.vue')},
      {path:"/tagList",component: () => import('../views/tag/tag.vue')},
      {path:"/carousel",component: () => import('../views/carousel/carousel.vue')},
      {path:"/shopList",component: () => import('../views/shop/shopList.vue')},
      {path:"/contentList",component: () => import('../views/content/contentList.vue')},
      {path:"/contentList/add",component: () => import('../views/content/addContentList.vue')},
      {path:"/indexContent",component: () => import('../views/indexContent/contentList.vue')},
      {path:"/indexContent/add",component: () => import('../views/indexContent/addContentList.vue')},
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
