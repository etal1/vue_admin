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
          @clear="useList()"
        />
        <el-button @click="useList()">Seach</el-button>
      </div>
      <div class>
        <el-button type="success" @click="addUserData()">add</el-button>
      </div>
    </div>
        <!-- 添加框 -->
    <el-dialog v-model="store.dialogFormVsible" title="addUser">
      <el-form :model="store.form">
        <el-form-item label="用户名称" label-width="140px" v-if="!store.addORup">
            <el-input v-model="store.form.username" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="用户密码" label-width="140px" v-if="!store.addORup">
            <el-input v-model="store.form.password" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="邮箱" label-width="140px">
          <el-input v-model="store.form.email" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="电话" label-width="140px">
          <el-input v-model="store.form.mobile" autocomplete="off"/>
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
        <el-table-column prop="userid" label="ID" width="70"/>
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="password" label="密码" />
        <el-table-column prop="qq" label="QQ"/>
        <el-table-column prop="user_sex" label="性别" >
          <!-- <template #default="scope">
              <span>{{row.user_sex==1 ? 男 :女}}</span>
              <span>女</span>
          </template> -->
        </el-table-column>
        <el-table-column prop="email" label="邮箱"/>
        <!-- <el-table-column prop="username" label="用户名" width="100"/> -->
        <el-table-column prop="username" label="用户名" />
        <el-table-column label="操作" align="center" width="150">
          <template #default="scope">
            <el-button size="small" @click="upUserData(scope.row)">Edit</el-button>
            <el-button size="small" type="danger" @click="DelUser(scope.row.userid)">Delete</el-button>
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
        @current-change="useList()"
      />
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import {useCounterStore} from "@/stores/useList.ts"
const store = useCounterStore();

const tableRef = ref(null); //表格自适应大小使用
const tableHeight = ref(); //表格自适应大小使用
onMounted(() => {
  // 设置表格初始高度为innerHeight-offsetTop-表格底部与浏览器底部距离85
  tableHeight.value = window.innerHeight - tableRef.value.$el.offsetTop - 85;
  // 监听浏览器高度变化
  window.onresize = () => {
    tableHeight.value = window.innerHeight - tableRef.value.$el.offsetTop - 85;
  };
  useList();
});
let mess = reactive({});
const useList = async () => {
    store.useList()
};
const isAddOrUpdata = async () => {
  // 因为修改添加用同一组件所以判断提交时是添加还是修改
  if(!store.addORup){
      // console.log("添加")
  store.addDataUser()
  }else{
   store.updataUser()
  }
};
const DelUser =  (id) => {
      ElMessageBox.confirm(
    '确定要删除吗?',
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  ) .then(() => {
   store.deleUser(id)
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled',
      })
    })
};
const upUserData = (row) =>{
  store.$patch(state =>{
      state.addORup =true
      state.dialogFormVsible = true
      state.form.email = row.email
      state.form.mobile = row.mobile
      state.form.id = row.id
  })
  
}
const addUserData = (row) =>{
    store.$patch(state =>{
        state.addORup =false
        state.dialogFormVsible = true
          state.form = {
          username:"",
          password:"",
          email:"" ,
          mobile:""
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
