<template>
  <div class="menuBox">
  <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
    <el-radio-button :label="false">expand</el-radio-button>
    <el-radio-button :label="true">collapse</el-radio-button>
  </el-radio-group> -->
    <el-menu
      :default-active="mess.defaultActive"
      class="el-menu-vertical-demo"
      :collapse="mess.isCollapse"
      @select="handleSelect"
    >
      <!-- <el-sub-menu :index="(index+1)+''" v-for="(item,index) in mess.data" :key="index+'1'">
        <template #title>
          <el-icon><location /></el-icon>
          <span>{{item.authName}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item :index="(index+1)+'-'+(indexs+1)" v-for="(item,indexs) in item.children" :key="indexs+'1'">{{item.authName}}</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu> -->
       <el-menu-item :index="(index+1)+''" v-for="(item,index) in mess.data" :key="index">
          <el-icon><icon-menu /></el-icon>
          <span>{{item}}</span>
      </el-menu-item>
      <!-- <el-menu-item index="2">
        <el-icon><icon-menu /></el-icon>
        <template #title>Navigator Two</template>
      </el-menu-item> -->
    </el-menu>
  </div>
</template>

<script setup>
import { ref, reactive,onMounted} from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import {
  Menu as IconMenu,
  Location,
} from '@element-plus/icons-vue'
import { useRouter } from "vue-router";
const router = useRouter()
let mess = reactive({
  defaultActive:'1',
  isCollapse:false,
  data:["用户列表","文章列表","标签列表"]
})

// onMounted(async () =>{ 
//   const {data:res} = await axios.get("/menus")
//   console.log(res) 
//   if(res.meta.status != 200) return ElMessage.error('菜单栏获取失败');
//   mess.data =  res.data  
// })

const handleSelect = (res) => {
  // console.log(res == '1-1')
  if(res == '1'){  router.push({path:'/userList'});}
  else if (res == '2') {router.push({path:'/contentList'}); }
  else if (res == '3') {router.push({path:'/tagList'}); }
  else if (res == '4') {router.push({path:'/orderList'}) }
  else if (res == '5') {router.push({path:'/erchaList'}) }
}
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.menuBox{
  margin-top: 20px
}
</style>
