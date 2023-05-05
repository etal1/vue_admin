<template>
    <div class="listBa"> 
      <div class="flex-row flex-js-spb mg-tb20 pd-lr20">
      <div>
        <span class="f30">总计：</span>
        <span>{{store.pagetota}}条</span>
      </div>
      <div class="flex-row flex-lg-nowrap flex-al-center">
        <el-input
          v-model="store.form.essay_id"
          class="w-50 m-2 mg-r10"
          placeholder="请输入标题"
          clearable
          @clear="carouselist()"
        />
        <el-button @click="carouselist()">Seach</el-button>
      </div>
      <div class>
        <!-- <el-button type="success" @click="addUserData()">add</el-button> -->
      </div>
    </div>
          <!-- 添加框 -->
      <el-dialog v-model="store.dialogFormVsible" title="addUser">
        <el-form :model="store.form">
          <div>
            <input class="imgIcon" type="file" ref="fileInput" @change="store.uploadImage  ">
            <div v-if="store.form.img">
              <img :src="store.form.img" alt="Uploaded image" width="250" height="250">
            </div>
          </div>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="store.$patch({dialogFormVsible : false})">Cancel</el-button>
            <el-button type="primary" @click="isAddOrUpdata()">Confirm</el-button>
          </span>
        </template>
      </el-dialog>
      <!-- 列表内容 -->
      <div class="list">
        <el-table
          ref="tableRef"
          :data="store.tableData"
          size="large"
          :height="tableHeight"
          style="width: 100%"
        >
          <el-table-column prop="comment_id" label="ID" />
          <el-table-column prop="comment_content" label="评论" />
          <el-table-column prop="essay_id" label="文章ID" />
          <el-table-column label="操作" align="center">
            <template #default="scope">
              <el-button size="small" type="danger" @click="DelUser(scope.row.comment_id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <div class="pagination mg-t20 mg-b10">
        <el-pagination
          background
          :page-size="store.pagesize"
          :pager-count="7"
          v-model:current-page="store.pagenum"
          layout="prev, pager, next"
          :total="store.pagetota"
          @current-change="carouselist()"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import { reactive, ref, onMounted } from "vue";
  import {indexCommentStore} from "@/stores/indexComment.ts"
  const store = indexCommentStore();
  // console.log(store)
  const tableRef = ref(null); //表格自适应大小使用
  const tableHeight = ref(); //表格自适应大小使用
  onMounted(() => {
    // 设置表格初始高度为innerHeight-offsetTop-表格底部与浏览器底部距离85
    tableHeight.value = window.innerHeight - tableRef.value.$el.offsetTop - 85;
    // 监听浏览器高度变化
    window.onresize = () => {
      tableHeight.value = window.innerHeight - tableRef.value.$el.offsetTop - 85;
    };
    carouselist();
  });
  let mess = reactive({});
  const carouselist = async () => {
      store.carouselist()
  };
  const isAddOrUpdata = async () => {
    // 因为修改添加用同一组件所以判断提交时是添加还是修改
    if(!store.addORup){
        // console.log("添加")
    store.addDataCarousel()
    }else{
     store.updataCarousel()
    }
  };
  const DelUser =  (id) => {
         ElMessageBox.confirm(
      '确定要删除该类型吗?',
      'Warning',
      {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
      }
    ) .then(() => {
     store.typeDel(id)
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: 'Delete canceled',
        })
      })
    // store.$patch({orderFormVsibles : true})
    
  };
  // const upUserData = (row) =>{
  //   store.$patch(state =>{
  //       state.addORup =true
  //       state.dialogFormVsible = true
  //       state.form.img = row.img
  //       state.form.id = row.id
  //   })
    
  // }
  // const addUserData = (row) =>{
  //     store.$patch(state =>{
  //         state.addORup =false
  //         state.dialogFormVsible = true
  //           state.form = {
  //           img:"",
  //       }
  //   })
  
  // }
  </script>
  <style scoped>
  .pagination .el-pagination {
    display: flex;
    justify-content: center;
  }
  .demo-image__error .image-slot {
    font-size: 30px;
  }
  .demo-image__error .image-slot .el-icon {
    font-size: 30px;
  }
  .demo-image__error .el-image {
    width: 100%;
    height: 200px;
  }
  </style>
  