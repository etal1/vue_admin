import { computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
export const tagCounterStore = defineStore("tagLIst", {
  state: () => {
    return {
      list: 75,
      input1: "",
      pagenum: 1,
      pagesize: 2,
      pagetota: 0,
      tableData: [],
      activities: [],
      dialogFormVsible: false,
      orderFormVsibles: true,
      addORup: false,
      form: {
        id: "",
        type_name: "",
      }
    };
  },
  getters: {
    sunPrice: () => {
      return;
    }
  },
  actions: {
    //获取列表
    async typeList() {
      let { data: res } = await axios.get("/type/list", {
        params: {
          type_name: this.input1,
          page: this.pagenum,
          pageSize: this.pagesize
        }
      });
      if (res.status == 200) {
        console.log(res.data);
        this.tableData = res.data.data;
        this.pagetota = res.data.total;
        this.pagenum = res.data.current_page;
      }
      
    },
    //添加
    async addDatatype() {
      let { data: res } = await axios.post("/type/add", this.form);
      console.log(res)
      if (res.status != 200) {
        return ElMessage.error("Oops, this is a error message.");
      }   
      ElMessage({
        message: "数据添加成功",
        type: "success"
      });
      this.dialogFormVsible = false;
      this.typeList();
    },
    //修改
    async updatatype() {
      let { data: res } = await axios({
        method: "post",
        url: "/type/edit" ,
        data: {
          type_id:this.form.id,
          type_name: this.form.type_name,
          
        }
      });
     
      if (res.status != 200) return ElMessage.error("修改失败");
      ElMessage({
        message: "数据修改成功",
        type: "success"
      });
      this.typeList();
      this.dialogFormVsible = false;
    },
    //删除文章
    async typeDel(id) {
      console.log(id+"sss");
      let { data: res } = await axios.get(
       "/type/del" ,{
         params:{
          type_id :id
         }
       }
      );
      if (res.status != 200) {
        return ElMessage.error("获取失败失败");
      }
      ElMessage({
        message: "数据删除成功",
        type: "success"
      });
      this.typeList();
      
      // this.useList();
    }
  }
  // return { count, doubleCount, increment }
});
