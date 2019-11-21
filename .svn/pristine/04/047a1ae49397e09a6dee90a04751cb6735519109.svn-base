<template>
    <div>
        <ul>
            <li>
                 <Input style="width:100px;" placeholder="请输部门编码" v-model="queryParams.tableName" size="small" />
            </li>
            <li>
                  <Input style="width:100px;" placeholder="请输入部门名称" size="small" v-model="queryParams.tableDesc" />
            </li>
            <li>
                 <clButton iconColor="#57c5f7" icon="md-search"  type="customer" size="small" @click="search()">搜索</clButton>
            </li>
        </ul>
    </div>
   
</template>
<script>
import clButton from '@/components/cl-erp/button'
export default {
    name:'searchform',
  components:{
    clButton
  },
    data(){
        return {
             queryParams: {
                 tableName:'',
                 tableDesc:''
             },
        }
    },
   computed: {
    // 是否更新
     updateFlag() {
         return this.$store.state.bas.updateFlag;
    }
  
  },
  watch: {
    // 监控 主菜单 切换 出发查询 子菜单数据
    updateFlag(newVal, oldVal) {
       if(newVal!=null &&newVal===true && newVal!=oldVal){
           this.search()
       }
      
    }
  },
    methods:{
        search(){
            let selectionId = this.$parent.$parent.$parent.$parent.search(this.queryParams);
            this.$store.commit('setUpdateFlag', false)
        }
    },
}
</script>
<style>
ul{
    float: right;
}
ul li{
    display: inline;
    margin-left: 5px;
}

</style>