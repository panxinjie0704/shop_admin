export default {
  name :"roles",
  data(){
    return {
    rolesList:[
      
    ] ,

    // 分配的对话框
    assignDialogVisible:false,

    rightTreeData: [],
    //分配权限的列表
    defaultProps: {
      children: 'children',
      label: 'authName'
    }
    }

    
    
  },

  created(){
  this.getRolesList();
  },

  methods:{
    // index
    indexMethod(index) {
      return index;
    },

    // 1、进入到页面中获取到数据
    async getRolesList(){
    const res = await this.$http.get('/roles');
    console.log(res);
    const {meta,data} = res.data;
    if(meta.status===200){
      this.rolesList = res.data.data
    }
    },

   

    // 2、分配权限的对话框

    async assignUserRights(role){
      // 这里要注意一定要加上this，不然对话框不会出现
      const res = await this.$http.get(`rights/tree`);
      // console.log(res);
      const {meta ,data} = res.data;
      if(meta.status===200){
      this.rightTreeData = data;

      this.assignDialogVisible=true; 
      
      // console.log(this.$refs);
      // console.log(this.$refs.rightsTree);
      // 这两个没有获取到数据，是因为dom的更新是异步的,所以说数据在页面中显现出来
      //了之后，其实dom树还没有更新，所以要在this.$nextTick()中可以获取到
 
      this.$nextTick(()=>{
        //这边是要遍历三级的菜单，只要三级菜单全部选中之后就可以选中全部
        const level3Id =[];
      role.children.forEach(function(e) {
        e.children.forEach(function(e) {
          e.children.forEach(function(e) {
            level3Id.push(e.id);
          })
        })
      })
      console.log(level3Id);
      //把东西全部渲染到页面中
      this.$refs.rightsTree.setCheckedKeys(level3Id);
      })
      }
      
      // 获取到id

      this.id = role.id

      
      
    },

    //获取到设置权限的值
    async setRoleRights (){
      const id = this.id;
      // console.log(id);

      // 1、获取到所有选中和半选中的权限的id

      const getCheckedKeys = this.$refs.rightsTree.getCheckedKeys();
      const getHalfCheckedKeys = this.$refs.rightsTree.getHalfCheckedKeys();

      // console.log(getCheckedKeys,getHalfCheckedKeys);

      const arrayAll = getCheckedKeys.concat( getHalfCheckedKeys);
      // console.log(arrayAll);
      //根据接口发送数据，数据需要转化为逗号分隔字符串形式
      const arrayAll1=arrayAll.join(',');
      // console.log(arrayAll1);
      

    const res = await this.$http.post(`roles/${id}/rights`,{rids:arrayAll1});
    console.log(res);
    const {meta,data} =res.data;
    // console.log(meta);
    
    if (meta.status===200){
      //关闭对话框
      this.assignDialogVisible=false; 
      //重新刷新            
      this.getRolesList();      

      
    }
    
    }

  }
}