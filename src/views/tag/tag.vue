<template>
  <div class="listBa">
    <!-- 搜索部分 -->
    <div class="flex-row flex-js-spb mg-tb20 pd-lr20">
      <div>
        <span class="f30">总计：</span>
        <span>{{store.pagetota}}条</span>
      </div>
      <div class="flex-row flex-lg-nowrap flex-al-center">
        <el-input
          v-model="store.input1"
          class="w-50 m-2 mg-r10"
          placeholder="Please Input"
          clearable
          @clear="typeList()"
        />
        <el-button @click="typeList()">Seach</el-button>
      </div>
      <div class>
        <el-button type="success" @click="addUserData()">add</el-button>
      </div>
    </div>
        <!-- 添加框 -->
    <el-dialog v-model="store.dialogFormVsible" title="addUser">
      <el-form :model="store.form">
      <el-form-item label="用户名称" label-width="140px">
            <el-input v-model="store.form.type_name" autocomplete="off"/>
      </el-form-item>
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
        <el-table-column prop="type_id" label="ID" />
        <el-table-column prop="type_name" label="类别" />
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-button size="small" @click="upUserData(scope.row)">Edit</el-button>
            <el-button size="small" type="danger" @click="DelUser(scope.row.type_id)">删除</el-button>
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
        @current-change="typeList()"
      />
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import {tagCounterStore} from "@/stores/tag.ts"
const store = tagCounterStore();

const tableRef = ref(null); //表格自适应大小使用
const tableHeight = ref(); //表格自适应大小使用
onMounted(() => {
  // 设置表格初始高度为innerHeight-offsetTop-表格底部与浏览器底部距离85
  tableHeight.value = window.innerHeight - tableRef.value.$el.offsetTop - 85;
  // 监听浏览器高度变化
  window.onresize = () => {
    tableHeight.value = window.innerHeight - tableRef.value.$el.offsetTop - 85;
  };
  typeList();
});
let mess = reactive({});
const typeList = async () => {
    store.typeList()
};
const isAddOrUpdata = async () => {
  // 因为修改添加用同一组件所以判断提交时是添加还是修改
  if(!store.addORup){
      // console.log("添加")
  store.addDatatype()
  }else{
   store.updatatype()
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
const upUserData = (row) =>{
  store.$patch(state =>{
      state.addORup =true
      state.dialogFormVsible = true
      state.form.type_name = row.type_name
      state.form.id = row.type_id
  })
  
}
const addUserData = (row) =>{
    store.$patch(state =>{
        state.addORup =false
        state.dialogFormVsible = true
          state.form = {
          type_name:"",
      }
  })

}
</script>
<style scoped>
.pagination .el-pagination {
  display: flex;
  justify-content: center;
}
</style>
