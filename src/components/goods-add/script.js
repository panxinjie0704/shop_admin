// 1、导入富文本组件
import {quillEditor} from  'vue-quill-editor'

//2、 导入 富文本的样式

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'


export default {
  name:'goodsAdd',

  data(){
    return{
      // 激活进度条
      active: 0 ,
    // 单选框激活
      // radio: '1',

      // tab 激活
      activeName:'basic',

    // 这边是获取级联菜单的数据
      getGoodsList:[],

      // 往后台添加的数据

      getAddGoodList:{
        goods_name:'',
        goods_cat :[],
        goods_price:'',
        goods_number:'',
        goods_weight:'',
        pics:[],
        // 这里是那个单选框的激活
        is_promote:'1',
        // 富文本区域的内容
        goods_introduce:''
      },
     
      // 上传数据的配置项，不需要
      // fileList: [
      //   {name: 'food.jpeg', 
      //   url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, 
      //   {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
      // ] 
    
      //设置请求头，每次请求都要传递token ，来判断有没有用户有没有登录
      upLoadHeaders:{
         // 获取token
         Authorization: localStorage.getItem('token')
      },

      // 图片上传接口,地址要写全，因为不是axios请求，所以公共路径没有作用
      uploadUrl: 'http://localhost:8888/api/private/v1/upload',

    }
  },
  created(){
    // 进入到页面就要展现到数据
    this.getGood()
  },
  methods:{
   
//  使得与上面的进度条同步， 看文档changeTab有回调函数
    async changeTab(tab){
      console.log(tab,tab.index);
      // tab.index-0 这个使得变成数字，因为获得的是字符串
      this.active = tab.index-0; 
    } ,

   async getGood(){
    const res = await this.$http.get(`/categories`,{
      params:{
        type:3
      }
    });
    // console.log(res);
    const {meta,data} = res.data;
    if(meta.status===200){
      this.getGoodsList = data;
    }
    
  },

  // 下一页的事件
  async next(activeIndex,tabName){
    // 同步进度条
    this.active = activeIndex;
    //同步tab栏
    this.activeName = tabName;
  },

  // 上传图片的事件里面的细节
  handleRemove(file, fileList) {
    // console.log(file, fileList);
  },
  
  beforeRemove(file, fileList) {
    return this.$confirm(`确定移除 ${ file.name }？`);
  },

  handleSuccess(response, file, fileList){
  console.log(response, file, fileList);
  // 这边图片是一个数组，所以把图片添加进去，要用数组的push的方法
   this.getAddGoodList.pics.push ({
    pic: response.data.tmp_path
  }) 
  
  },

  // 点击确定按钮，发送请求

  async comfirm (){
    console.log( this.getAddGoodList);
    
  const res = await this.$http.post('/goods',{
    ...this.getAddGoodList,
    goods_cat: this.getAddGoodList.goods_cat.join(',')
  });
   console.log(res);
   const {meta ,data} = res.data;
   if(meta.status===201){
     // 提示创建成功的消息
    this.$message ({
      type:'success',
      message:meta.msg
    })

    // 路由导航，跳转到商品列表的首页

    this.$router.push('/goods');
     
     

   }
   

  }

  },
  // 注册为局部组件
  components: {
    quillEditor
  }
}