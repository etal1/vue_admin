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
        name: "",
        password: "",
        qq: "",
        user_sex: "",
        is_superuser: "",
        stu_id: "",
        personal_name: "",
        email:"",
        user_profile:"",
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
          name: this.input1,
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
      this.form.is_superuser == '管理员' ? this.form.is_superuser = 1 : this.form.is_superuser =0;
      this.form.user_sex == '男' ? this.form.user_sex = 1 : this.form.user_sex =0;
      let { data: res } = await axios.post("/adduser", this.form);
      if (res.status != 200) {
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
      console.log(this.form)
      this.form.is_superuser == '管理员' ? this.form.is_superuser = 1 : this.form.is_superuser =0;
      this.form.user_sex == '男' ? this.form.user_sex = 1 : this.form.user_sex =0;
      let { data: res } = await axios({
        method: "post",
        url: "/edituser",
        data: {
          name: this.form.name,
          password: this.form.password,
          email: this.form.email,
          qq: this.form.qq,
          user_sex: this.form.user_sex,
          personal_name: this.form.personal_name,
          stu_id: this.form.stu_id,
          is_superuser: this.form.is_superuser,
          id:this.form.id,
          user_profile:this.form.user_profile,
        }
      });
      if (res.status != 200) return ElMessage.error("修改失败");
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
          id: id,
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
