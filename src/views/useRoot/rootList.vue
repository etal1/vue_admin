<template>
  <div class="listBa">
    <!-- 搜索部分 -->
    <div class="flex-row flex-js-spb mg-tb20 pd-lr20">
      <div>
        <span class="f30">总计：</span>
        <span>{{mess.tableData.length}}条</span>
      </div>
      <div class="flex-row flex-lg-nowrap flex-al-center">
        <el-input
          v-model="mess.input1"
          class="w-50 m-2 mg-r10"
          placeholder="Please Input"
          clearable
          @clear="useList()"
        />
        <el-button @click="seachRoot()">Seach</el-button>
      </div>
      <div class>
        <el-button type="success" @click="addUserData()">add</el-button>
      </div>
    </div>
        <!-- 添加框 -->
    <el-dialog v-model="mess.dialogFormVisible" title="addUser">
      <el-form :model="mess.form">
        <el-form-item label="权限" label-width="140px">
            <el-input v-model="mess.form.roleName" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="描述" label-width="140px">
            <el-input v-model="mess.form.roleDesc" autocomplete="off"/>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="mess.dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="isAddOrUpdata()">Confirm</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 列表内容 -->
    <div class="list">
      <el-table
        ref="tableRef"
        :data="mess.tableData"
        size="large"
        :height="tableHeight"
        style="width: 100%"
      >
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="roleName" label="权限"/>
        <el-table-column prop="roleDesc" label="描述" />
        <el-table-column label="操作" align="center" >
          <template #default="scope">
            <el-button size="small" @click="upUserData(scope.row)">Edit</el-button>
            <el-button size="small" type="danger" @click="DelUser(scope.row.id)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <!-- <div class="pagination mg-t20 mg-b10">
      <el-pagination
        background
        :page-size="mess.pagesize"
        :pager-count="7"
        v-model:current-page="mess.pagenum"
        layout="prev, pager, next"
        :total="mess.pagetota"
        @current-change="useList()"
      />
    </div> -->
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
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
let mess = reactive({
  input1: "",
  tableData: [],
  dialogFormVsible:false,
  addORup:false,
  form:{
    id:"",
    roleName:"",
    roleDesc:"",
}
});
const useList = async () => {
  let { data: res } = await axios.get("/roles");
  if (res.meta.status == 200) {
    mess.tableData = res.data;
  }
};
const seachRoot = async () => {
  let { data: res } = await axios.get("/roles/"+mess.input1);
  if (res.meta.status == 200) {
    mess.tableData = [{id:res.data.roleId,...res.data}];
  }
};
const isAddOrUpdata = async () => {
  // 因为修改添加用同一组件所以判断提交时是添加还是修改
  if(!mess.addORup){
      // console.log("添加")
       let { data: res } = await axios.post("/roles",mess.form);
    if(res.meta.status != 201) {ElMessage.error('Oops, this is a error message.') }
       ElMessage({
            message: '数据添加成功',
            type: 'success',
      })
      mess.dialogFormVisible = false
      useList();
    console.log(res)
  }else{
      let { data: res } =await axios({
            method:'put',
            url:'/roles/'+ mess.form.id,
            data:{
                  roleName:mess.form.roleName,
                  roleDesc:mess.form.roleDesc
                },
         })
  if(res.meta.status != 200) return ElMessage.error('修改失败') 
     ElMessage({
            message: '数据修改成功',
            type: 'success',
          })
        useList();
        mess.dialogFormVisible = false
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
  ) .then( async () => {
        let { data: res } = await axios({
            method:'delete',
            url:'/roles/'+id,
         });
        if(res.meta.status != 200) {return ElMessage.error('删除失败') }
          ElMessage({
                message: '数据删除成功',
                type: 'success',
          })
        useList();
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled',
      })
    })
};
const upUserData = (row) =>{
  mess.addORup =true
  mess.dialogFormVisible = true
  mess.form.roleName = row.roleName
  mess.form.roleDesc = row.roleDesc
  mess.form.id = row.id
}
const addUserData = (row) =>{
  mess.addORup =false
  mess.dialogFormVisible = true
    mess.form = {
    roleName:"",
    roleDesc:"",
}
}
</script>
<style scoped>
.pagination .el-pagination {
  display: flex;
  justify-content: center;
}
</style>
