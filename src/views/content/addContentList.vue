<template>
  <div class="wangEditor">
    <el-form :model="store.form" label-width="130px">
      <el-form-item label="标题">
        <el-input v-model="store.form.essay_title" maxlength="10"/>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="store.form.type_id" placeholder="please select your zone">
          <el-option :label="item.type_name" :value="item.type_id" v-for="(item,index) in data.form " :key="index"/>
          <!-- <el-option label="Zone two" value="beijing" /> -->
        </el-select>
      </el-form-item>
      <el-form-item label="Instant delivery">
      <el-switch v-model="store.form.delivery" @change="changeDelivery" />
    </el-form-item>
      <div v-html="store.form.essay_content"></div>
      <wangEditor @changeData="changeMess" :content= store.form.essay_content />
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button>返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { RouterLink, RouterView } from "vue-router";
import wangEditor from "../../components/wangEditor.vue";
import { useCounterStore } from "@/stores/contentList.ts";
import axios from "axios";
const store = useCounterStore();
console.log(store)
let data = reactive({
  form:[],//文章类型
  // content:"skm"
});
onMounted(() => {
  typeLists();
});
//获取标签列表展示
const typeLists = async () => {
  let { data: res } = await axios.get("/type/list", {
    params: {
      type_name: "",
      page: 1,
      pageSize: 10
    }
  });
  if (res.status == 200) {
    console.log(res.data.data);
    data.form = res.data.data
    // this.tableData = res.data.data;
    // this.pagetota = res.data.total;
    // this.pagenum = res.data.current_page;
  }
};
const changeMess = (value) => {
  
  // console.log(store.form);
  store.form.essay_content = value.data
  // console.log(store.form.essay_content);
};
const changeDelivery = () => {
    store.form.delivery == true  ?  store.form.essay_status = 1 :store.form.essay_status = 0
    console.log(store.form.essay_status)
    console.log(store.form.delivery)
}
const onSubmit = async () => {3
    if (store.addORup) {
     store.updataContent()
    } else {
     store.addDataContent()
    }
};
</script>
<style scoped>
.wangEditor {
  /* 导航栏样式 */
  width: 80%;
}
</style>
