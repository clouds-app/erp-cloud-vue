<template>
    <div>
        Bas 
        <p>
             <Button @click="handleSubMenuEvent('dept','bas-department','部门')" type="info">部门</Button>
       </p>
       <br/>
        <p>
               <Button @click="handleSubMenuEvent('team','bas-team','班组')" type="success">班组</Button>
       </p>
        <br/>
        <p>
              <Button @click="handleSubMenuEvent('position','bas-position','职位')" type="warning">职位</Button>
       </p>
        <br/>
        <p>
               <Button @click="handleSubMenuEvent('worker','bas-worker','人员')" type="error">人员</Button>
        </p>
         <br/>
          <p>
               <Button @click="handleSubMenuEvent('areaList','bas-areaList','区域')" type="error">区域</Button>
        </p>
         <br/>
          <p>
               <Button @click="handleSubMenuEvent('car','bas-car','车辆')" type="error">车辆</Button>
        </p>
         <br/>
          <p>
               <Button @click="handleSubMenuEvent('warehouse','bas-warehouse','仓库')" type="error">仓库</Button>
        </p>
         <br/>

    </div>
</template>

<script>
import globleMixin from '@/mixins'
//import subMenuMixin from './mixins'
export default {
    mixins:[globleMixin],
    data() {
        return {

        }
    },
    methods:{
      // 子页面 参数: 页面.vue,唯一区别ID,TAB 标签显示名称
      handleSubMenuEvent(currentPage,uniqueKey,tabName){
        //  debugger
       let subItem = {
           uniqueKey:uniqueKey,
           lable:tabName
       }  
       let params = {
           type:'Bas',
           page:currentPage, //显示控件页面
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
 
      },
  }
}
</script>