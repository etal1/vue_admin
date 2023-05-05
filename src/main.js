import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from "axios";
import App from './App.vue'
import router from './router'
import './assets/style.css' 
axios.defaults.baseURL ="/api/laravel10.6.2/public"


// axios.interceptors.request.use(config => {
//     const token = Cookies.get('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   });
  
axios.interceptors.request.use(config =>{
    const token = window.sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})
router.beforeEach((to,from,next) =>{
    if(to.path == "/login") return next()
    const cook = window.sessionStorage.getItem("token")
    if(cook == null) return next("/login")
    next()
})
const app = createApp(App)
window.axios = axios
app.use(createPinia())
app.use(router)

app.mount('#app')
