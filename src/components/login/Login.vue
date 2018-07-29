<template>
<div class="login">
  <!-- 
    1、form组件提供了表单的验证的功能，只有通过了rule的属性传入约定的验证的
    规则；并将 Form-Item 的 prop 属性设置为需校验的字段名即可
   -->
<el-form class="login_form" ref="loginForm" :model="loginForm" :rules="rules" :label-position="labelPosition" label-width="80px">
  <el-form-item label="用户名" prop="username">
    <el-input v-model="loginForm.username"></el-input>
  </el-form-item>
   <el-form-item label="密码" prop="password">
     <!-- 这里添加的enter键登录，要注意加上native -->
    <el-input v-model="loginForm.password" type = "password" @keyup.enter.native='onSubmit'></el-input>
  </el-form-item>
  
  <el-form-item>
    <el-button type="primary" @click="onSubmit">登录</el-button>
    <el-button @click="resetForm">重置</el-button>
  </el-form-item>


</el-form>
</div>
</template>


<script>
// 引入axios的文件
// import axios from "axios";
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      //配置校验的规则
      rules: {
        username: [
          { required: true, message: "用户名是必填项", trigger: "blur" },
          { min: 4, max: 8, message: "长度在4到8个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码是必填项", trigger: "blur" },
          { min: 6, max: 12, message: "长度在 6 到 12 个字符", trigger: "blur" }
        ]
      },

      // 上对齐
      labelPosition: 'top',
    };
  },

  methods: {
    onSubmit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          //发送axios的请求
          // console.log(this.$http);
          
          this.$http
            .post("/login", this.loginForm)
            .then(res => {
              console.log(res);

              if (res.data.meta.status === 200) {

                //这边是登陆成功之后吧token的值存到localStorage中
                localStorage.setItem("token", res.data.data.token);
                console.log(localStorage);
                //这边要写在前面，因为守卫导航会根据，相对应的tocken值
                //来分配路由

                //js代码跳转页面
                this.$router.push("/Home");
                this.$message({
                  message: "登录成功",
                  type: "success",
                  duration: 1000
                });
              } else {
                this.$message({
                  message: "用户名或密码失败",
                  type: "error",
                  duration: 1000
                });
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 重置表单
    resetForm() {
      this.$refs.loginForm.resetFields();
    }
  }
};
</script>

<style>
.login {
width: 100%;
height: 100%;
background-color: #2D434C;
}
.login_form {
  width: 500px;
  position: absolute;
  top:50%;
  left: 50%;
  margin-top: -83px;
  margin-left: -250px;
  background-color: #fff;
  border-radius: 15px;
  padding: 35px;

  


  

}
</style>


