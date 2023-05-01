<template>
  <div class="listBa">
    <!-- 搜索部分 -->
  <!-- <div>sj</div> -->
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
          @clear="orderList()"
        />
        <el-button @click="orderList()">Seach</el-button>
      </div>
      <div class>
        <el-button type="success" @click="addUserData()">add</el-button>
      </div>
    </div>
    <!-- 添加框 -->
    <!-- 列表内容 -->
    <div class="list">
      <el-table
        ref="tableRef"
        :data="store.tableData"
        size="large"
        :height="tableHeight"
        style="width: 100%"
      >
        <el-table-column prop="essay_id" label="ID" width="70"/>
        <el-table-column prop="essay_title" label="文章标题" />
        <el-table-column prop="userid" label="创建文章ID"/>
        <el-table-column prop="essay_status" label="是否发布" >
          <template #default="scope">
              <el-tag class="ml-2" type="success" v-if="scope.row.essay_status == 1">已发布</el-tag>
             <el-tag class="ml-2" type="danger" v-else>未发布</el-tag>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="is_send" label="是否发货" />
        <el-table-column prop="create_time" label="下单时间" /> -->
        <!-- <el-table-column prop="username" label="用户名" width="100"/> -->
        <!-- <el-table-column prop="username" label="用户名" width="100"/> -->
        <el-table-column label="操作" align="center" width="150">
          <template #default="scope">
            <el-button size="small" @click="upUserData(scope.row)">Edit</el-button>
            <el-button size="small" type="danger" @click="DelUser(scope.row.essay_id)">删除</el-button>
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
        @current-change="orderList()"
      />
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import {useCounterStore} from "@/stores/indexContent.ts"
const store = useCounterStore();
import { useRouter } from "vue-router";
const router = useRouter()
const tableRef = ref(null); //表格自适应大小使用
const tableHeight = ref(); //表格自适应大小使用
onMounted(() => {
  // 设置表格初始高度为innerHeight-offsetTop-表格底部与浏览器底部距离85
  tableHeight.value = window.innerHeight - tableRef.value.$el.offsetTop - 85;
  // 监听浏览器高度变化
  window.onresize = () => {
    tableHeight.value = window.innerHeight - tableRef.value.$el.offsetTop - 85;
  };
  orderList();
});
let mess = reactive({});
const orderList = async () => {
    store.orderList()
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
   store.contentDel(id)
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
      // state.dialogFormVsible = true
       state.form.essay_title=row.essay_title ,
        state.form.essay_content=row.essay_content ,
        state.form.type_id=row.type_id,
        state.form.essay_status=row.essay_status,
         row.essay_status ==1 ? state.form.delivery =true :state.form.delivery =false
        // state.form.essay_status=row.essay_status
      // state.form.email = row.email
      // state.form.mobile = row.mobile
      state.form.id = row.essay_id
  })
   router.push({path:'/indexContent/add'});
}
const addUserData = (row) =>{
    store.$patch(state =>{
        state.addORup =false
        // state.dialogFormVsible = true
          state.form = {
            essay_title: "",
            essay_content:"",
            type_id:"",
            essay_status:"",
            delivery:false
      }
  })
  router.push({path:'/indexContent/add'});
}
</script>
<style scoped>
.pagination .el-pagination {
  display: flex;
  justify-content: center;
}
</style>
