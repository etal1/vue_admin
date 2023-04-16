<template>
  <div class="common-layout">
    <el-container>
      <el-header><Header/></el-header>
      <el-container>
        <el-aside width="200px"><Menu /></el-aside>
        <el-main> <RouterView /></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
  import { RouterLink, RouterView } from 'vue-router'
  import Menu from "../components/menu.vue"
  import Header from "../components/header.vue"
</script>
<style scoped>
.el-header{ /* 导航栏样式 */
  background: #214252;
  border-radius:0 0 8px 8px;
  overflow: hidden;
  box-shadow: 0px 0px 2px 0px rgba(0,0,0,0.5) ;
}
</style>
