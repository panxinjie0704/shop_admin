<template>
  <div class="home">
     <el-container class="home_content">
       <el-header class="home_head">
          <el-row class="head_row">
            <el-col :span="8" class="left">
              <img src="@/assets/logo.png" alt="黑马程序员">
            </el-col>
            <el-col :span="8" class="center">
              <h1>电商后台管理系统</h1> 
              </el-col>
            <el-col :span="8" class="right">
              欢迎上海前端22期星曜会员 
              <a href="javascript:;" class="logo_out" @click="logo_out">退出</a>
              </el-col>
          </el-row>
       </el-header>
       <el-container class="home_main">
         <!-- 侧边栏区域 -->
       <el-aside width="200px" class="main_aside">
           <el-col>
     <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      :unique-opened="true"
      :router="true"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">

          <el-submenu :index="'/'+menu1.path" v-for="menu1 in menuList " :key="menu1.id">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{menu1.authName}}</span>
            </template>
            
            <el-menu-item :index="'/'+menu2.path" v-for="menu2 in menu1.children" :key="menu2.id">
              <i class="el-icon-menu"></i>
              <span slot="title">{{menu2.authName}}</span>
            </el-menu-item>
          </el-submenu>

         
        </el-menu>
      </el-col>
         </el-aside>
         <el-main>
           <!-- 这边里面子组件的的出口 -->
           <router-view></router-view>
         </el-main>
       </el-container>
     </el-container>
  </div>
</template>

<script>
export default {
  // 数据
  data(){
  return {
   menuList:[]
  }
  
  },
  // 已进入到页面中，就要显现出来
  created(){
  this.getUserList();
  },
  methods:{
    logo_out(){      
      this.$confirm('您确定要退出吗？', '提示', {
          confirmButtonText: '退出',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '退出成功!',
          });
          localStorage.removeItem("token");
          this.$router.push("/login");
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          });          
        });
       
    },

    async getUserList(){
      const res = await this.$http.get(`/menus`);
      // console.log(res);
      const {meta,data} = res.data;
      if(meta.status ===200){
        this.menuList = data
      }
      console.log(this.$route.path);

      // console.log(this.$route.path.slice(1));
      
      
      
    }

  }
 
}
</script>

<style>
.home {
  width: 100%;
  height: 100%;
}
.home_content {
  width: 100%;
  height: 100%;
}

/* 头部区域 */
.home .home_head {
  background-color: #B3C1CD;
  line-height: 60px;
}
.home .home_head h1 {
  margin: 0;
}
.head_row ,
.head_row .left {
  height: 100%;
}
.head_row .left img {
  vertical-align: middle;
}
.head_row .center {
  text-align: center;
  color: #ffffff;
}
.head_row .right {
  text-align: right;
  font-weight: bolder;
}
.logo_out {
  color:#B07A17;
}

/* 下面的内容主题区域模块 */
.home_main {
  height: 100%;
}
.main_aside {
  background-color: #545C64;
  height: 100%;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  
}
</style>


