<template>
    <div>
        Bas 
        <p>
             <Button @click="handleSubMenuEvent('bas-department','bas-department','部门管理')" type="info">部门</Button>
       </p>
       <br/>
        <p>
               <Button type="success">班组</Button>
       </p>
        <br/>
        <p>
              <Button type="warning">职位</Button>
       </p>
        <br/>
        <p>
               <Button type="error">人员</Button>
        </p>
         <br/>
    </div>
</template>

<script>
import globleMixin from '@/mixins'
import baseMixin from './mixins'
export default {
    name:'Bas-moudle',
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
           type:'Bas',
           uniqueKey:subItem.uniqueKey,
           lable:subItem.lable,
           isActive:true
       }
       //判断是否已经存在,不要重复添加菜单
       let isExist =false;
       let currentOperateMenu= this.currentSelectedSubMenu.Bas
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
       this.$router.push({name:pathName})
      },
  }
}
</script>