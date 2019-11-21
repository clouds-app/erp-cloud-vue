<template>
    <div class="cl-tabPaneContents">
      <component @openSubMenu="openSubMenu" v-bind:is="who"></component>
    </div>
</template>
<script>

import * as type from "@/enum"; //菜单枚举

import Account from '@/components/cl-erp/treeMapper/Account.vue'
import Bas from '@/components/cl-erp/treeMapper/Bas.vue'
import Mrp from '@/components/cl-erp/treeMapper/Mrp.vue'
import Purchase from '@/components/cl-erp/treeMapper/Purchase.vue'
import report from '@/components/cl-erp/treeMapper/Report.vue'
import sale from '@/components/cl-erp/treeMapper/Sale.vue'
import Stock from '@/components/cl-erp/treeMapper/Stock.vue'
import Sys from '@/components/cl-erp/treeMapper/Sys.vue'
export default {
    props:{
        contentType:{
            type:String,
            default:'sale'
        }
    },
    components:{
            'Account':Account,
            'Bas':Bas,
            'Mrp':Mrp,
            'Purchase':Purchase,
            'report':report,
            'sale':sale,
            'Stock':Stock,
            'Sys':Sys,
     },
    data(){
        return {
           who:'sale',
           currentOperateMenu:[],//当前操作菜单数据
        }
    },
    computed: {
        // 顶部选中子菜单
        currentSelectedSubMenu() {
             return this.$store.state.app.currentSubMenu;
        }
    },
    watch: {
         contentType(newVal, oldVal) {
          // debugger
                this.switchTopMenuHanle(newVal);

          },
          currentSelectedSubMenu: {
                  handler(n,o){
                       this.switchTopMenuHanle(this.contentType);
                  },
                   immediate: true,  //刷新加载 立马触发一次handler
                   deep: true  // 可以深度检测到 子菜单 对象的属性值的变化
            }
    },
    mounted() {
        this.$nextTick(()=>{
            //  this.currentOperateMenu = this.currentSelectedSubMenu.sale //初始化数据
            //  this.switchTopMenuHanle(this.contentType);
        })

    },
  methods:{
    openSubMenu(params){
         this.$emit('openSubMenu',params)
    } ,
     // 切换菜单 查询子菜单 固定菜单 事件处理
    switchTopMenuHanle(key) {
      switch (key.toLowerCase()+"") {
        //财务管理
        case type.topMenu_Account:
            this.currentOperateMenu = this.currentSelectedSubMenu.Account
            this.who='Account'
          break;
          //基础数据
        case type.topMenu_Bas:
             this.currentOperateMenu = this.currentSelectedSubMenu.Bas
           this.who='Bas'
          break;
          //生产管理
        case type.topMenu_Mrp:
             this.currentOperateMenu = this.currentSelectedSubMenu.Mrp
            this.who='Mrp'
          break;
          //采购管理
        case type.topMenu_Purchase:
              this.currentOperateMenu = this.currentSelectedSubMenu.Purchase
         this.who='Purchase'
          break;
          //报表中心
        case type.topMenu_report:
             this.currentOperateMenu = this.currentSelectedSubMenu.report
        this.who='report'
          break;
          //销售管理
        case type.topMenu_sale:
            this.currentOperateMenu = this.currentSelectedSubMenu.sale
        this.who='sale'
          break;
          //储运管理
        case type.topMenu_Stock:
              this.currentOperateMenu = this.currentSelectedSubMenu.Stock
          this.who='Stock'
          break;
          //系统设置
         case type.topMenu_Sys:
              this.currentOperateMenu = this.currentSelectedSubMenu.Sys
           this.who='Sys'
          break;
          //默认
        default:
             this.currentOperateMenu = this.currentSelectedSubMenu.sale
             this.who='sale'
          break;
      }

    }
  }

}
</script>
<style>
.btn-subMenu{
    margin-left: 15px;
}
/* #minder-container{
     height: 500px;
}
  .cl-tabPaneContents{
      height: 100%;
  } */
</style>
