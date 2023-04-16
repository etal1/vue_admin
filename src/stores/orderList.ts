import { computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
export const useCounterStore = defineStore("orderLIst", {
  state: () => {
    return {
      list: 75,
      input1: "",
      pagenum: 1,
      pagesize: 5,
      pagetota: 0,
      tableData: [],
      activities: [],
      dialogFormVsible: false,
      orderFormVsibles: false,
      addORup: false,
      form: {
        id: "",
        username: "",
        region:""
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
    async orderList() {
      let { data: res } = await axios.get("/orders", {
        params: {
          query: this.input1,
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }
      });
      if (res.meta.status == 200) {
        // console.log(res.data);
        this.tableData = res.data.goods;
        this.pagetota = res.data.total;
        this.pagenum = res.data.pagenum;
      }
    },
    //添加
    async addDataUser() {
      let { data: res } = await axios.post("/users", this.form);
      if (res.meta.status != 201) {
        return ElMessage.error("Oops, this is a error message.");
      }
      ElMessage({
        message: "数据添加成功",
        type: "success"
      });
      this.dialogFormVsible = false;
      this.useList();
    },
    //修改
    async updataUser() {
      let { data: res } = await axios({
        method: "put",
        url: "/users/" + this.form.id,
        data: {
          email: this.form.email,
          mobile: this.form.mobile
        }
      });
      if (res.meta.status != 200) return ElMessage.error("修改失败");
      ElMessage({
        message: "数据修改成功",
        type: "success"
      });
      this.useList();
      this.dialogFormVsible = false;
    },
    //获取订单状态
    async oderStatus(id) {
      console.log(id);
      let { data: res } = await axios({
        method: "get",
        url: "/kuaidi/" + id
      });
      if (res.meta.status != 200) {
        return ElMessage.error("获取失败失败");
      }
      this.activities = res.data
      
      // this.useList();
    }
  }
  // return { count, doubleCount, increment }
});
