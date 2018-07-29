export default {
  name:'goods',
  data(){
    return {
    getGoodsList:[],

    // 分页的总页数
    total:1,

    curPage:1,
    }
  },

  created(){
  //一进入到页面，就要加载商品的列表的信息
  // 这样这配置好，如果你当时写http://localhost:8081/#/goods/3，刷新的时候还会显示这样，
  this.getGoods(this.$route.params.page);
  },

  // 监听到路由的变化，通过当前的页面来获取到当前页面
  watch:{
  $route(to,from){
    // console.log("跳转到：",to,"来自于：",from);
    this.getGoods(to.params.page);
  }
  },

  methods:{
    //  获取到商品的列表，一进入就要加载出来

    async getGoods(pagenum=1){
      const res = await this.$http.get('goods',{
        params:{
          // pagenum:1,
          pagenum,
          pagesize:5
        }
      });

      console.log(res);

      const{meta,data} = res.data;
      if(meta.status===200){
        this.getGoodsList = data.goods;
        this.total = data.total;
      // 这边需要一个数字，但是这里获得是一个字符串
        this.curPage = data.pagenum-0;
      }
      
    },
  // 添加表格的索引号
  indexMethod(index) {
    return index +1 ;
  },

  // 注意，这边要传一个形参，为当点击的当前页，只要改变路由参数，就能转换页面
  async changePage (page){
    this.$router.push(`/goods/${page}`);
  }
  }
}