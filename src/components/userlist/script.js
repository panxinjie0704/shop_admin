//导入axios
// import axios from 'axios';

export default {
  data() {
    return {
      userList: [ ],
      // 每页的个数
      pageSize: 2,
      // 总条数
      total: 0,
      searchText:'',

      //这边有点疑问，要注意
      currentPage:1,

      // 使得表单显示
      userFormVisible: false,

      // 使得表单的双向数据绑定
      addUserForm:{
        username:'',
        password:'',
        email :'',
        mobile :''
      },
      
      labelPosition: 'right',

      rules:{
        username: [
          { required: true, message: '用户名为必填项', trigger: 'blur' },
          { min: 4, max: 12, message: '长度在 4 到 12个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码为必填项', trigger: 'blur' },
          { min: 4, max: 12, message: '长度在 4 到 12个字符', trigger: 'blur' }
        ],
      },

      // 使得编辑的表单的双向绑定
      editUserForm:{
        username:'',
        password:'',
        email :'',
        mobile :'',
        id:-1,
      },

      editUserFormVisible:false ,

      // 编辑的表单校验
      editRules:{
        username: [
          { min: 4, max: 12, message: '长度在 4 到 12个字符', trigger: 'blur' }
        ],
      },

      // 分配角色
      assignUserFormVisible:false ,

       // 分配角色的数据
      assignUserForm :{
        // 当前用户的名称
        username:'',
        // 默认选中角色的id值
        roleId:-1,
       // 用户id
        userId:-1,
        
      },

      // 下拉菜单的内容

      roleList: [
      ],
     
    }
  },

  //钩子函数，一进入到页面就展示页面
  created(){
    this.getUserlist();
    },

    methods:{
      getUserlist(currentPage = 1,searchText = ''){
        this.$http
        .get('/users',{
          params: {
            // 查询条件
           query:searchText,
           pagenum:currentPage,
           pagesize:this.pageSize,
          },
          headers: {Authorization: localStorage.token}
          // 设置的响应的头在接口的文档中提供的
        })
        .then ((res)=>{
          // console.log(res);
          const {data,meta} = res.data;
          //res.data 是个对象， {data,meta} 在对象中
          const {status} = meta;
          const {users} = data;
          const{total} = data;
          if(status === 200) {
            // console.log(users);
            this.userList = users;
            //这边要把total的数据获取到
            this.total = total;
          }         
        })
      },

      getCurPageUserList(currentPage){
        this.getUserlist(currentPage, this.searchText);
      },

      // 搜索框的功能
      search(){
        console.log('hahah');
        this.getUserlist(1,this.searchText);
      },

    // 这边是修改用户的状态
      changeStatus(user){
        // console.log('jaaj');
        console.log(user);
        
        // 已经拿到了数据了，现在发送请求，获取数据
        const url = '/users/'+user.id+'/state/'+user.mg_state
        this.$http
        // 这里面一共要有三个参数
        .put(url,null,{
          // 每次发送请求都要携带token
          headers: {Authorization: localStorage.token}
        })
        .then((res)=>{
          console.log(res);
          if(res.data.meta.status===200){
            this.$message({
              message:(res.data.data.mg_state==1?'启用':'禁用')+'成功',
              type: "success",
              duration: 1000
            });
          }else{
            this.$message({
              message: "修改失败",
              type: "error",
              duration: 1000
            });
          }

          
        })
        
        
      },

      //这边是展示添加用户的对话框
      showAddUserdialog(){
      // console.log('hahah'); 
      this.userFormVisible =true;
      },

      // 添加用户
      addUser(){
        // 点击确定前要加上校验
        this.$refs.addUserForm.validate((valid) => {
          if (valid) {
            // 成功之后，获取数据
            this.$http
            .post('/users',this.addUserForm)
            .then((res)=>{
            console.log(res);
            const {meta,data} = res.data;
            if(meta.status===201){
              // 关闭对话框
            this.userFormVisible = false;
    
            //重新加载数据,
            this.getUserlist(this.currentPage);
    
            // 重置表单，这边要在表单里面要加上$refs，这样能获得这个表单
    
            // 坑--------表单校验，一定要加上prop属性
    
            this.$refs.addUserForm.resetFields();
            
            }
            })
          } else {
            
            return false;
          }
        });
        
       
      },

      // 添加用户的取消重置 （自己添加的内容）

      cancel(){
        // 关闭对话框
        this.userFormVisible = false;

        // 重置内容
        this.$refs.addUserForm.resetFields();

      },

      // 展示编辑对话框

      showEditUserDialog(user ){
        // console.log('haha');
        // console.log(user);
        
        this.editUserFormVisible = true ;

        // 这三行代码是把数据展示到页面上
        this.editUserForm.username = user.username;
        this.editUserForm.email= user.email;
        this.editUserForm.mobile= user.mobile;

       // 获取到Id,因为下面有需要用到
        this.editUserForm.id = user.id;

      },

      // 修改用户
      editUser(){
        // console.log('ahah');

        // 发送axios的请求
      const data = {
        email:this.editUserForm.email,
        mobile:this.editUserForm.mobile,
      }

      const id = this.editUserForm.id;
      // console.log(id);
      
        this.$http
        .put(`users/${id}`,data)
        .then((res)=>{
          console.log(res);
          const {data,meta} = res.data;
          if(meta.status===200){
          this.editUserFormVisible = false;
          // 重新刷新
          this.getUserlist(this.currentPage);
             
          } 
        });
      },
      // 点击取消按钮，使得对话框框关闭
      editCancel(){
        this.editUserFormVisible = false ;
      },

      // 点击删除的按钮，显示对话框

      showDeleteUserDialog(id){
        // console.log(id);
        
        this.$confirm('您确定删除该用户吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          // 发送axios的请求，删除用户
          this.$http
          .delete(`/users/${id}`)
          .then((res)=>{
            // console.log(res);
            const{meta}=res.data;
            // console.log(meta);
            if(meta.status===200){
            // 重新刷新
            this.getUserlist(this.currentPage);
            }
            
            
            
          })
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },


     // 点击分配角色,展示对话框
      showAssignDialog(role){
      // console.log(role); 

      // 对话框展现出来
      this.assignUserFormVisible=true;

      this.assignUserForm.userId = role.id;

      this.assignUserForm.username = role.username;

      // 在对话框展示的时候调用
      this.getUserId ();
      
      // 在对话框展示的时候，就要把数据展现出来
      this.getUserroleList ();
      },

      // 通过id来获取到角色的id
     async getUserId (){
       const id = this.assignUserForm.userId;
      //  console.log(id);
       
       const res = await this.$http.get(`users/${id}`);
      //  console.log(res);

       const {meta,data} = res.data;
       const {rid} = data
      //  console.log(rid);
       

       if(meta.status===200){
         if (rid === -1){
          this.assignUserForm.roleId = '';
         }else {
          this.assignUserForm.roleId = rid;
         }
       }
     },


    //  获取到用户的角色

    async getUserroleList (){
    const res = await this.$http.get(`/roles`);
    // console.log(res);
    const {data,meta} = res.data;
    if(meta.status===200){

    this.roleList= data
    } 
    },

    // 点击确定按钮，来获取到分配的角色

    async getRoleList (){
      // const id = this.assignUserForm.userId;
      // const rid = this.assignUserForm.roleId;

      const {userId,roleId} = this.assignUserForm
      console.log(userId,roleId);
      
      const res = await this.$http.put(`users/${userId}/role`,{rid:roleId});
      console.log(res);

      const {meta,data}= res.data

      if(meta.status===200){
        //关闭对话框
      this.assignUserFormVisible= false;

      this.getUserlist(this.currentPage);
      }
      
    }
      
      


    }
}