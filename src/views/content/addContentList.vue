<template>
  <div class="wangEditor">
    <!-- <img src="http://localhost:5137/93290262-ac70-4004-bee5-66ccfff5dbc7" /> -->
    <el-form :model="store.form" label-width="70px">
      <el-form-item label="标题">
        <el-input v-model="store.form.essay_title" maxlength="50"/>
      </el-form-item>
      <el-form-item label="简介">
        <el-input v-model="store.form.essay_brief" maxlength="50"/>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="store.form.type_id" placeholder="please select your zone">
          <el-option :label="item.type_name" :value="item.type_id" v-for="(item,index) in data.form " :key="index"/>
          <!-- <el-option label="Zone two" value="beijing" /> -->
        </el-select>
      </el-form-item>
      <el-form-item label="是否发布">
      <el-switch v-model="store.form.delivery" @change="changeDelivery" />
    </el-form-item>
    
    <div>
          <input class="imgIcon" type="file" ref="fileInput" @change="store.uploadImage">
          <div v-if="store.form.home_image">
            <img :src="store.form.home_image" alt="Uploaded image" width="250" height="250">
          </div>
    </div>

    <!-- <el-upload
    class="avatar-uploader"
    action="/api/laravel10.6.2/public/content/homeimage"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload> -->
      <div class="wangEdition">
        <div v-html="store.form.essay_content"></div>
        <wangEditor @changeData="changeMess" :content= store.form.essay_content />
      </div>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button>返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { ElMessage } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';
import type { UploadProps } from 'element-plus';
import { RouterLink, RouterView } from "vue-router";
import wangEditor from "../../components/wangEditor.vue";
import { useCounterStore } from "@/stores/contentList.ts";
import axios from "axios";
const store = useCounterStore();


const imageUrl = ref('')

const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
  console.log(imageUrl.value)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 20) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}


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

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.wangEdition{
  margin-bottom: 20px;
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>