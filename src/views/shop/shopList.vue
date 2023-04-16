<template>
  <div class="listBa">
    <!-- 搜索部分 -->
    <div class="flex-row flex-js-spb mg-tb20 pd-lr20">
      <div>
        <span class="f30">总计：</span>
        <span>{{mess.pagetota}}条</span>
      </div>
      <div class="flex-row flex-lg-nowrap flex-al-center">
        <el-input
          v-model="mess.input1"
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
    <el-dialog v-model="mess.dialogFormVisible" title="addUser">
      <el-form :model="mess.form">
        <el-form-item label="商品名称" label-width="140px" v-if="!mess.addORup">
            <el-input v-model="mess.form.goods_name" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="商品分类" label-width="140px" v-if="!mess.addORup">
            <el-input v-model="mess.form.goods_cat" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="商品价格" label-width="140px">
          <el-input v-model="mess.form.goods_price" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="商品数量" label-width="140px">
          <el-input v-model="mess.form.goods_number" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="商品重量" label-width="140px">
          <el-input v-model="mess.form.goods_weight " autocomplete="off"/>
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
        <el-table-column prop="goods_id" label="ID" width="70"/>
        <el-table-column prop="goods_name" label="商品名称" width="130"/>
        <el-table-column prop="username" label="" width="100"/>
        <el-table-column prop="goods_price" label="价格" width="110"/>
        <el-table-column prop="goods_number" label="数量" width="100"/>
        <el-table-column prop="goods_weight" label="重量" width="100"/>
        <el-table-column prop="is_promote" label="是否是热销品" width="100"/>
        <el-table-column prop="hot_mumber" label="热销品数量 " width="100"/>
        <el-table-column label="操作" align="center" width="150">
          <template #default="scope">
            <el-button size="small" @click="upUserData(scope.row)">Edit</el-button>
            <el-button size="small" type="danger" @click="DelUser(scope.row.goods_id)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="pagination mg-t20 mg-b10">
      <el-pagination
        background
        :page-size="mess.pagesize"
        :pager-count="7"
        v-model:current-page="mess.pagenum"
        layout="prev, pager, next"
        :total="mess.pagetota"
        @current-change="useList()"
      />
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { toNumber } from "lodash-es";
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
  pagenum: 1,
  pagesize: 5,
  pagetota: 0,
  tableData: [],
  dialogFormVsible:false,
  addORup:false,
  form:{
    id:"",
    goods_name:"",
    goods_cat:"",
    goods_price:"" ,
    goods_number:"",
    goods_weight:"",
    goods_introduce:"",
    goods_number:"",
    pics:"",
    attrs:"",
}
});
const useList = async () => {
  let { data: res } = await axios.get("/goods", {
    params: {
      query: mess.input1,
      pagenum: mess.pagenum,
      pagesize: mess.pagesize
    }
  });
  if (res.meta.status == 200) {
    // console.log(res.data);
    mess.tableData = res.data.goods;
    mess.pagetota = res.data.total;
    mess.pagenum = toNumber(res.data.pagenum);
  }
};
// const seachShopList= async () => {
//   let { data: res } = await axios.get("/goods/"+mess.input1);
//   if (res.meta.status == 200) {
//     mess.tableData = [res.data];
//   }
// };
const isAddOrUpdata = async () => {
  // 因为修改添加用同一组件所以判断提交时是添加还是修改
  if(!mess.addORup){
      // console.log("添加")
       let { data: res } = await axios.post("/goods",mess.form);
    if(res.meta.status != 201) {return ElMessage.error('Oops, this is a error message.') }
       ElMessage({
            message: '数据添加成功',
            type: 'success',
      })
      mess.dialogFormVisible = false
      useList();
  }else{
      let { data: res } =await axios({
            method:'put',
            url:'/users/'+ mess.form.id,
            data:{
                  email:mess.form.email,
                  mobile:mess.form.mobile
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
  // console.log(id)
      ElMessageBox.confirm(
    '确定要删除吗?',
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  ) .then( async () => {
    // console.log(id)
        let { data: res } = await axios({
            method:'delete',
            url:'/goods/'+id,
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
  mess.form.email = row.email
  mess.form.mobile = row.mobile
  mess.form.id = row.id
}
const addUserData = (row) =>{
  mess.addORup =false
  mess.dialogFormVisible = true
    mess.form ={
    id:"",
    goods_name:"",
    goods_cat:"",
    goods_price:"" ,
    goods_number:"",
    goods_weight:"",
    goods_introduce:"",
    goods_number:"",
    pics:"",
    attrs:"",
}
}
</script>
<style scoped>
.pagination .el-pagination {
  display: flex;
  justify-content: center;
}
</style>
