import { computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
export const indexCommentStore = defineStore("indexcomment", {
  state: () => {
    return {
      list: 75,
      input1: "",
      pagenum: 1,
      pagesize: 10,
      pagetota: 0,
      tableData: [],
      activities: [],
      dialogFormVsible: false,
      orderFormVsibles: true,
      addORup: false,
      form: {
        essay_id: "",
      }
    };
  },
  getters: {
    sunPrice: () => {
      return;
    }
  },
  actions: {
    // 获取列表
    async carouselist() {
      let { data: res } = await axios.get("getcomment/index", {
        params: {
          comment_content:this.form.essay_id,
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
    // },
    //删除
    async typeDel(id) {
      // console.log(id+"sss");
      let { data: res } = await axios.get(
       `delIndexComment/${id}`
      );
      if (res.status != 200) {
        return ElMessage.error("获取失败失败");
      }
      ElMessage({
        message: "数据删除成功",
        type: "success"
      });
      this.carouselist();
      
      // this.useList();
    }
  }
  // return { count, doubleCount, increment }
});
