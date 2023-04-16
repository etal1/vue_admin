import { computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
export const useCounterStore = defineStore("counter", {
  state: () => {
    return {
      list: 77,
      input1: "",
      pagenum: 1,
      pagesize: 3,
      pagetota: 0,
      tableData: [],
      dialogFormVsible: false,
      addORup: false,
      form: {
        id: "",
        username: "",
        password: "",
        email: "",
        mobile: ""
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
    async useList() {
      let { data: res } = await axios.get("/userlist", {
        params: {
          username: this.input1,
          page: this.pagenum,
          pageSize: this.pagesize
        }
      });
      if (res.status == 200) {
        console.log(res.data.data);
        this.tableData = res.data.data;
        this.pagetota = res.data.total;
        this.pagenum = res.data.current_page;
        console.log(this.tableData);
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
    //删除
    async deleUser(id) {
      console.log(id);
      let { data: res } = await axios.get("/deluser", {
        params: {
          userid: id,
        }
      });
  
      if (res.status != 200) {
        return ElMessage.error("删除失败");
      }
      ElMessage({
        message: "数据删除成功",
        type: "success"
      });
      this.useList();
    }
  }
  // return { count, doubleCount, increment }
});
