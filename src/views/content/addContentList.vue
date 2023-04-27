<template>
  <div class="wangEditor">
  <el-form :model=".dataform" label-width="120px">
    <el-form-item label="Activity name">
      <el-input v-model="form.title"  maxlength="10"/>
    </el-form-item>
    <el-form-item label="Activity zone">
      <el-select v-model="form.type" placeholder="please select your zone">
        <el-option label="Zone one" value="shanghai" />
        <el-option label="Zone two" value="beijing" />
      </el-select>
    </el-form-item>
     <div v-html="data.content"></div>
    <!-- <div>{{data.content}}</div> -->
  <wangEditor  @changeData = "changeMess" />
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Create</el-button>
      <el-button>Cancel</el-button>
    </el-form-item>
  </el-form>

   <!-- <div>
     <label for="title">标题</label>
        <el-input
          name="title"
          v-model="text"
          maxlength="10"
          placeholder="Please input"
          show-word-limit
          type="text"
       />
   </div> -->
   
  </div>
</template>

<script setup>
import { ref, reactive,onMounted} from 'vue'
  import { RouterLink, RouterView } from 'vue-router'
  import wangEditor from "../../components/wangEditor.vue"
//   import Header from "../components/header.vue"
let data = reactive({
  form:{
    title:"",
    typr:""

  },
  content:"skm"
});
const  changeMess = (value) =>{
  console.log(value.data)
  data.content = value.data
}
// console.log(data.content)
</script>
<style scoped>
.wangEditor{ /* 导航栏样式 */
 width: 80%;
}
</style>
