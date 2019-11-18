<template>
    <div>
        sale <Input size="large" placeholder="large size" />
       <Button @click="handleSubMenuEvent('sale-test','sale-test','销售测试')" type="info">测试</Button>
    </div>
</template>

<script>
import globleMixin from '@/mixins'
import baseMixin from './mixins'
export default {
    name:'sale-area',
    mixins:[globleMixin,baseMixin],
    data() {
        return {

        }
    },
    methods:{
        // 子页面-SUB子模块 点击事件
      handleSubMenuEvent(pathName,uniqueKey,tabName){
        //  debugger
       let subItem = {
           uniqueKey:uniqueKey,
           lable:tabName
       }  
       let params = {
           type:'sale',
           uniqueKey:subItem.uniqueKey,
           lable:subItem.lable,
           isActive:true
       }
       //判断是否已经存在,不要重复添加菜单
       let isExist =false;
       let currentOperateMenu= this.currentSelectedSubMenu.sale
       if(this.currentSelectedSubMenu && currentOperateMenu.length>0){
             currentOperateMenu.forEach((item)=>{
                 item.isActive =false //重置其它菜单为 未选中
                 if(item.uniqueKey ==params.uniqueKey){
                     isExist = true
                     item.isActive =true // 当前的设置为 TRUE
                 }
             })
       }

       // 不存在则添加 子页面
       if(!isExist){
         currentOperateMenu =Object.assign(currentOperateMenu,currentOperateMenu.push(params))
       }
       this.$store.commit('setCurrentSubMenu', this.currentSelectedSubMenu)
       //打开指定页面
       this.$emit('openSubMenu',params)
      // this.$router.push({name:pathName})
      },
    }
}
</script>