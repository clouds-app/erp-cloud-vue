<template>
     
      <div class="cl-top-menu">
               <div class="topMenuDiv" :class="{ active: currentSelected==='sale'}"  @mouseover="menuMouceOver('sale')" @mouseleave="menuMouseLeave('sale')" @click="clickTopMenu('sale')">
                    <img  class="menuImg" :src="sale" key="max-sale" />
                    <div class="menuText" :class="{ menuTextMouseOver: currentMouseOver==='sale'}">
                        销售
                    </div>
               </div>
                <div class="topMenuDiv" :class="{ active: currentSelected==='Purchase'}"  @mouseover="menuMouceOver('Purchase')" @mouseleave="menuMouseLeave('Purchase')" @click="clickTopMenu('Purchase')">
                     <img class="menuImg" :src="Purchase" key="max-Purchase" />
                     <div class="menuText" :class="{ menuTextMouseOver: currentMouseOver==='Purchase'}">
                        采购
                    </div>
               </div>
               <div class="topMenuDiv" :class="{ active: currentSelected==='Mrp'}"  @mouseover="menuMouceOver('Mrp')" @mouseleave="menuMouseLeave('Mrp')" @click="clickTopMenu('Mrp')">
                      <img class="menuImg" :src="Mrp" key="max-Mrp" />
                      <div class="menuText" :class="{ menuTextMouseOver: currentMouseOver==='Mrp'}">
                        生产
                    </div>
               </div>
               <div class="topMenuDiv" :class="{ active: currentSelected==='Stock'}"  @mouseover="menuMouceOver('Stock')" @mouseleave="menuMouseLeave('Stock')" @click="clickTopMenu('Stock')">
                      <img class="menuImg" :src="Stock" key="max-Stock" />
                      <div class="menuText" :class="{ menuTextMouseOver: currentMouseOver==='Stock'}">
                        储运
                    </div>
               </div>
                <div class="topMenuDiv" :class="{ active: currentSelected==='Account'}"  @mouseover="menuMouceOver('Account')" @mouseleave="menuMouseLeave('Account')" @click="clickTopMenu('Account')">
                        <img class="menuImg" :src="Account" key="max-Account" />
                      <div class="menuText" :class="{ menuTextMouseOver: currentMouseOver==='Account'}">
                        财务
                    </div>
               </div>
                 <div class="topMenuDiv" :class="{ active: currentSelected==='report'}"  @mouseover="menuMouceOver('report')" @mouseleave="menuMouseLeave('report')" @click="clickTopMenu('report')">
                         <img class="menuImg" :src="report" key="max-report" />
                     <div class="menuText" :class="{ menuTextMouseOver: currentMouseOver==='report'}">
                        报表
                    </div>
                </div>
                 <div class="topMenuDiv" :class="{ active: currentSelected==='Bas'}"  @mouseover="menuMouceOver('Bas')" @mouseleave="menuMouseLeave('Bas')" @click="clickTopMenu('Bas')">
                        <img class="menuImg" :src="Bas" key="max-Bas" />
                      <div class="menuText" :class="{ menuTextMouseOver: currentMouseOver==='Bas'}">
                        基础数据
                    </div>
               </div>
                 <div class="topMenuDiv" :class="{ active: currentSelected==='Sys'}"  @mouseover="menuMouceOver('Sys')" @mouseleave="menuMouseLeave('Sys')" @click="clickTopMenu('Sys')">
                          <img class="menuImg" :src="Sys" key="max-Sys" />
                     <div class="menuText" :class="{ menuTextMouseOver: currentMouseOver==='Sys'}">
                        系统设置
                    </div>
               </div>
    </div>
</template>
<script>
// 后期 做成一个控件 
import Account from '@/assets/images/topMenu/Account.png'
import Bas from '@/assets/images/topMenu/Bas.png'
import Mrp from '@/assets/images/topMenu/Mrp.png'
import Purchase from '@/assets/images/topMenu/Purchase.png'
import report from '@/assets/images/topMenu/report.png'
import sale from '@/assets/images/topMenu/sale.png'
import Stock from '@/assets/images/topMenu/Stock.png'
import Sys from '@/assets/images/topMenu/Sys.png'
import baseMixin from '@/mixins'
export default {
    data(){
        return {
            Account,Bas,Mrp,Purchase,report,sale,Stock,Sys,//图片路径
            currentMouseOver:'', //默认经过菜单 sale
            isSelected:false,
        }
    },
    mixins:[baseMixin],
    computed:{
        // 默认 选中菜单
         currentSelected(){
             return this.$store.state.app.currentTopMenu
         },
        
    },
    methods:{
        //选中菜单
        clickTopMenu(val){
           //  debugger
            this.$store.commit('setCurrentTopMenu', val)
            if(this.currentCurrentPage!='main'){
                 this.$store.commit('setCurrentPage','main')
                 this.$router.push({name:'main',params:{menuType:val}})
                
            }
        
        },
        //经过菜单
        menuMouceOver(val){
            this.currentMouseOver =  val
        },
        //离开菜单
        menuMouseLeave(val){
             this.currentMouseOver =  ''
        }
    },
    
    beforeDestroy(){
        
    }
}
</script>
<style>
.menuImg{
    height:28px;
    width:auto;
}
.active{
    border-bottom:2px solid #0e67b7;
     color: #0e67b7;
}
.menuText{
    font-weight: bold;
    vertical-align: top;
   
}
.menuTextMouseOver {
    color: #0e67b7;
}
.topMenuDiv{
     cursor: pointer;
      margin-left: 15px;
      /* border: 1px solid red; */
}

.topMenuDiv img{
    
     /* border: 1px solid pink; */
     margin-top: 8px;
}
.cl-top-menu{
    text-align: center;
    /* border: 1px solid red; */
}
.cl-top-menu div{
    display:inline;
}
  .btn-topMenu{
      margin-left: 15px;
  }
</style>