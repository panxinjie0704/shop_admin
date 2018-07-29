// 导入element-tree-grid

import ElementTreeGrid from 'element-tree-grid';

// 这个注册的是全局组件
// Vue.component(ElTreeGrid.name, ElTreeGrid)

export default{
name :"Categories",
data(){
return {
  // 1、获取全部的商品的列表
  categoriesList: [],

 //这边的总页数是要跟下面的相对应
  total:0,
//  这边是让加载效果出现
  loading: true ,

  AddCategoryDialog :false ,
  labelPosition: 'right',
  addCategoryForm: {
    name: '',
    parentName: '',
    
  },

  // 这个是级联的数据
  cartList:[],


  // 发送的数据
  addCategoryForm:{
    cat_name:'',
    cat_pid:[],
    cat_level:-1
  }
  

}
},

created(){
this.getCategoriesList();
},

methods:{
  async getCategoriesList(pagenum=1){
  const res = await this.$http.get('/categories',{
    params:{
      type:3,
      // 只要加上这两个参数，获得数据就是分页的效果了（但是接口文档里面没有这两个参数，要到请求头里面获取到）
      // 上面设定了默认值了，所以所这边的pagenum 不用设定值了，到时候通过点击页码可以获得当前页的数据
      pagenum,
      pagesize: 10
    }
  })

  console.log(res);
  const {meta,data} = res.data

  if(meta.status===200){
    // 这边也要注意，加上上面两个参数后，获得数据不再是data中的了
  // this.categoriesList = data
  this.categoriesList = data.result;
  this.total = data.total;

  // 获取完数据结束之后就让加载效果结束
  this.loading=false;

  }  
  },

  // 点击分页的功能
  async changePage (curentPage){
  // 每次点击分页的时候，都要有加载的效果
    this.loading=true
    this.getCategoriesList(curentPage)
  },

  //  点击添加分类出现对话框

  async showAddCategoryDialog(){

    this.AddCategoryDialog = true ;
    this.getCartList();
  },

  // 获取级联选择框的值

  async getCartList(){
    const res = await this.$http.get('/categories',{
      params:{
        type:2
      }
    });

    console.log(res);
    const {meta,data} = res.data;

    if(meta.status ===200){
      this.cartList = data;
    }
    
  },

  async addCartList(){
    console.log('hahah');
    console.log(this.addCategoryForm.cat_pid);
    
    const {cat_pid,cat_name,cat_level} = this.addCategoryForm;

    const res = await this.$http.post('/categories',{
      cat_name:cat_name,
      cat_pid:cat_pid[cat_pid.length-1],
      cat_level:cat_pid.length
    });
    console.log(res);

    const {meta,data} = res.data;

    if(meta.status ===201){

    this.AddCategoryDialog = false ;

    this.getCategoriesList();
    // 重置表单
    this.addCategoryForm.cat_name = '';
    this.addCategoryForm.cat_pid =[];
      
    }
    
    
  }
},

// 用于注册当前组件的局部组件
components: {
  // 'el-table-tree-column': ElementTreeGrid
  // 使用ES6中的属性名表达式
  [ElementTreeGrid.name]: ElementTreeGrid
},



}