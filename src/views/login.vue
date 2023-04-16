<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { FormInstance, FormRules ,ElMessage} from 'element-plus';
import { useRouter } from "vue-router";
// const router = useRouter()
const router = useRouter()
const formSize = ref('default')
const ruleFormRef = ref()

const ruleForm = reactive({
  name: "",
  password:""
})

const rules = reactive({
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 6, message: 'Length should be 3 to 6', trigger: 'blur' },
  ],
  password: [
       { required: true, message: 'Please input password', trigger: 'blur' },
      { min: 3, max: 6, message: 'Length should be 3 to 6', trigger: 'blur' },
  ],
 
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async(valid, fields) => {
    if (valid) {
       let {data:res}  = 
       await axios.post( "/lact",
         { user: ruleForm.name, pwd: ruleForm.password },)
         if(res.status != 200) return ElMessage.error('账号或者密码错误');
           console.log(res)
          //  window.sessionStorage.setItem("token",res.data.token);
           router.push({ path:"/"})
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

</script>

<template>
  <div class="container">
    <div class="login-wrapper">
      <div class="header">login</div>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        :size="formSize"
        status-icon
      >
        <el-form-item label="user name" prop="name">
          <el-input v-model="ruleForm.name"/>
        </el-form-item>
        <el-form-item label="password" prop="password">
          <el-input v-model="ruleForm.password"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">login</el-button>
          <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}
body {
  height: 100%;
}
.container {
  position: absolute;
  width: 100%;
  height: 100%;
  /* height: 700px; */
  background-image: linear-gradient(110deg, #bdd7f9, #70aaf6);
}
.login-wrapper {
  background-color: #f1f6fb;
  width: 400px;
  height: 388px;
  border-radius: 50px;
  padding: 0 50px;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.header {
  font-size: 48px;
  font-weight: 900;
  text-align: center;
  line-height: 120px;
  margin-bottom: 10px
}
.el-form-item--default {
  margin-bottom: 25px;
}
</style>
