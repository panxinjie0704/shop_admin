export default {
  name:'rights',
  data(){
    return {
     rightsList:[
       
     ]
    }
  },

  created(){
  this.getRightsList();
  },

  methods:{
  
    indexMethod(index) {
      return index;
    },
    async getRightsList() {
    const res = await this.$http.get(`rights/list`);
    console.log(res);
    const {data,meta}= res.data;
    this.rightsList = data;
    
    
    
    }
  }

}