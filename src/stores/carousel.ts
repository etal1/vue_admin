import { computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
export const carouselStore = defineStore("carousel", {
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
        img: "",
      }
    };
  },
  getters: {
    sunPrice: () => {
      return;
    }
  },
  actions: {
    //图片上传
    async uploadImage(event){
      console.log("2762")
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('image', file);
      // console.log(formData)
      await axios.post('/type/imgUp', formData).then(res => {
          console.log(res.data.data.url)
         this.form.img = res.data.data.url;
         console.log(this.form.img)
        })
    },
    //获取列表
    async carouselist() {
      let { data: res } = await axios.get("carouselList", {
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
    async addDataCarousel() {
      let { data: res } = await axios.post("carouselAdd", this.form);
      console.log(res)
      console.log(222)
      if (res.status != 200) {
        return ElMessage.error("Oops, this is a error message.");
      }   
      ElMessage({
        message: "数据添加成功",
        type: "success"
      });
      this.dialogFormVsible = false;
      this.carouselist();
    },
    //修改
    async updataCarousel() {
      let { data: res } = await axios({
        method: "post",
        url: "carouselEdit" ,
        data: {
          id:this.form.id,
          img: this.form.img,
          
        }
      });
     
      if (res.status != 200) return ElMessage.error("修改失败");
      ElMessage({
        message: "数据修改成功",
        type: "success"
      });
      this.carouseistl();
      this.dialogFormVsible = false;
    },
    //删除
    async typeDel(id) {
      // console.log(id+"sss");
      let { data: res } = await axios.get(
       `carouselDel?id=${id}`
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
