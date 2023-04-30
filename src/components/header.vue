<template>
  <div class="colffffff w-all pd-tb10">
      <div class="flex-row flex-js-spb flex-al-center">
        <span>Background system</span>
        <div class="user flex-row flex-js-spb flex-al-center"> 
          <span class="img mg-r10"></span>
          <a href="#" @click="outLogin">退出~</a>
        </div>
      </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import axios from "axios";
const router = useRouter()
const  outLogin = async () =>{
      // window.sessionStorage.removeItem("token");
      let dd = window.sessionStorage.getItem("token");
      await axios.post("/logout",{token:dd}).then(() =>{
        window.sessionStorage.removeItem("token");
           router.push({ path:"/login"})
      });
    
}
</script>

<style>
.user .img{
  width: 30px;
  height: 30px;
  border-radius:50%;
  background: wheat; 
}
a:hover{
  color: bisque
}
</style>
