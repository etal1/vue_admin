import { computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import { tr } from "element-plus/es/locale";
export const useCounterStore = defineStore("indexContent", {
  state: () => {
    return {
      // list: 75,
      input1: "",  //搜索框
      pagenum: 1,
      pagesize: 8,
      pagetota: 0,
      tableData: [], //显示列表
      activities: [],
      dialogFormVsible: false,
      orderFormVsibles: false,
      addORup: false, //判断时添加还是修改
      form: {
        id: "",
        essay_title: "",//标题
        essay_content:"",//内容
        type_id:"",//类型
        essay_status:'',//是否发布是实际发送给数据库的
        delivery:false,//是否发布是页面展示
        brief:"",
        image:"",//首页封面图片
      }
    };
  },
  getters: {
    sunPrice: () => {
      return;
    }
  },
  actions: {

 //封面图片
 uploadImage(event){
  const file = event.target.files[0];
  const formData = new FormData();
  formData.append('image', file);
  // console.log(formData)
  axios.post('type/imgUp', formData)
    .then(res => {
    console.log(res.data.data)
     this.form.image = res.data.data.url;
     console.log(this.form.image)
    })
},


    //获取列表
    async orderList() {
      let { data: res } = await axios.get("indexContent", {
        params: {
          essay_title: this.input1,
          page: this.pagenum,
          pageSize: this.pagesize
        }
      });
      if (res.status == 200) {
        console.log(res.data);
        this.tableData = res.data.data;
        this.pagetota = res.data.total        ;
        this.pagenum = res.data.current_page
        ;
      }
    },
    //添加
    async addDataContent() {
      let { data: res } = await axios.post("indexContent/add", this.form);
      if (res.status != 200) {
        return ElMessage.error("Oops, this is a error message.");
      }
      ElMessage({
        message: "数据添加成功",
        type: "success"
      });
     
    },
    //修改
    async updataContent() {
      let { data: res } = await axios({
        method: "post",
        url: "indexContent/edit",
        data: {
          essay_title: this.form.essay_title,
          essay_content: this.form.essay_content,
          type_id: this.form.type_id,
          essay_status: this.form.essay_status,
          essay_id: this.form.id,
        }
      });
      if (res.status != 200) return ElMessage.error("修改失败");
      ElMessage({
        message: "数据修改成功",
        type: "success"
      });
   
    },
    //删除文章
    async contentDel(id) {
      console.log(id);
      let { data: res } = await axios.get(
       "indexContent/del" ,{
         params:{
          contentId :id
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
      this.orderList();
      
      // this.useList();
    }
  }
  // return { count, doubleCount, increment }
});
