<template>
    <div class="purchaseContent">
       <Row>
      <Col span="1">&nbsp;</Col>
    
      <Col span="6" offset="1">
      <Card>
        <p slot="title">
        采购
      </p>
         <br/>
        <p style="padding: 10px;">
          <Button @click="handleSubMenuEvent('supplier','Purchase-supplier','供应商')" type="info">供应商</Button>
        </p>
        <p style="padding: 10px;">
          <Button @click="handleSubMenuEvent('supplierArt','purchase-supplierArt','供应商纸质')" type="info">供应商纸质</Button>
        </p>
        <p style="padding: 10px;">
          <Button @click="handleSubMenuEvent('paperPrice','purchase-paperPrice','纸板进价')" type="info">纸板进价</Button>
        </p>
        <p style="padding: 10px;">
          <Button @click="handleSubMenuEvent('purPaperPo','purchase-purPaperPo','纸板采购')" type="info">纸板采购</Button>
        </p>
      </Card>
      </Col>
      <Col span="6">
      <Card>
        <p slot="title">查询</p>
         <br/>
        <p style="padding: 10px;">
          <Button @click="handleSubMenuEvent('purPaperPoAnalyz','purchase-purPaperPoAnalyz','纸板采购情况分析')" type="info">纸板采购情况分析</Button>
        </p>
      </Card>
      </Col>
    </Row>
    </div>
</template>

<script>
  import globleMixin from '@/mixins'
  //import subMenuMixin from './mixins'
  export default {
    mixins: [globleMixin],
    data() {
      return {

      }
    },
  activated(){
    console.log('---------Purchase---- activated---------')
  },
  created(){
     console.log('---------Purchase----- created---------')
  },
    methods: {
      // 子页面 参数: 页面.vue,唯一区别ID,TAB 标签显示名称
      handleSubMenuEvent(currentPage, uniqueKey, tabName) {
         let params = {
              menuName: 'Purchase',
              page: currentPage, //显示控件页面
              uniqueKey: uniqueKey,
              lable: tabName,
              isActive: true
            };
      this.handleMenuBaseEvent(params) // 调用MIXIN 共用方法

      },
    }
  }
</script>

<style>
.purchaseContent{
  min-height: 600px;
  width: 100%;
  background:rgba(33,46,129,1);
  border:1px solid rgba(0,222,255,1);
}
</style>