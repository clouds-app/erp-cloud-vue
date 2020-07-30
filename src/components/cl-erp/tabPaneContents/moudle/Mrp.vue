<template>
      <div class="mrpContent">
       <!-- <Row>
      <Col span="1">&nbsp;</Col>

      <Col span="6" offset="1">
      <Card>
        <p slot="title">
        生产
      </p>
         <br/>

        <p style="padding: 10px;">
          <Button @click="handleSubMenuEvent('boxprodplan','mrp-boxprodplan','纸箱生产排程')" type="info">纸箱生产排程</Button>
        </p>

      </Card>
      </Col>
    </Row> -->
         <div class="mrpItem leftItem">
          <div @click="handleSubMenuEvent('boxprodplan','mrp-boxprodplan','纸箱生产排程',secondenum.boxprodplan.val.disabled)" :class="[secondenum.boxprodplan.val.disabled?'diabledOrAccess':'']" class="circleBallItem cartonScheduling cursorPointer ">
            <div class="itemIcon">
              <div class="itemIconTitle">纸箱生产排程</div>
            </div>
          </div>
           <div  class="circleBallItem productOutsourcing cursorPointer" :class="[secondenum.prosendout.val.disabled?'diabledOrAccess':'']" @click="handleSubMenuEvent('prosendout','mrp-prosendout','产品外发',secondenum.prosendout.val.disabled)">
            <div class="itemIcon">
              <div class="itemIconTitle">产品外发</div>
            </div>
          </div>
           <div  class="circleBallItem processOutsourcing cursorPointer" :class="[secondenum.procedureout.val.disabled?'diabledOrAccess':'']" @click="handleSubMenuEvent('procedureout','mrp-procedureout','工序外发',secondenum.prosendout.val.disabled)">
            <div class="itemIcon">
              <div class="itemIconTitle">工序外发</div>
            </div>
          </div>

    </div>
    <div class="mrpItem rightItem">
         <div class="leftContentItem">
            <div class="moduleDataTitleBg">
               <div class="moduleDataTitle">模块数据</div>
                <div class="moduleDataListBox cursorPointer">
                     <!-- <div @click="handleSubMenuEvent('supplier','Purchase-supplier','供应商')" class="moduleDataItem">供应商</div>
                     <div @click="handleSubMenuEvent('supplierArt','purchase-supplierArt','供应商纸质')" class="moduleDataItem">供应商纸质</div> -->
                </div>
            </div>
         </div>
         <div class="leftContentItem marginTop10">
           <div class="reportTitleBg">
              <div class="reportTitle">报表</div>
                <div class="reportDataListBox cursorPointer">
                     <!-- <div @click="handleSubMenuEvent('purPaperPoAnalyz','purchase-purPaperPoAnalyz','纸板采购情况分析')" class="reportDataItem">纸板采购情况分析</div>
                    -->
                    <div class="reportDataItem" style="color: #bdb7b7;"	>印唛使用查询</div>
                    <div class="reportDataItem" style="color: #bdb7b7;"	>模切板使用查询</div>
                    <div class="reportDataItem" style="color: #bdb7b7;"	>废品统计查询</div>
                    <div class="reportDataItem" style="color: #bdb7b7;"	>纸箱排程明细查询</div>
                    <div class="reportDataItem" style="color: #bdb7b7;"	>纸箱未排程分析</div>
                    <div class="reportDataItem" style="color: #bdb7b7;"	>纸箱工序完工查询</div>
                    <div class="reportDataItem" style="color: #bdb7b7;"	>纸箱工序排程查询</div>
                    <div class="reportDataItem" style="color: #bdb7b7;"	>待排程及用纸分析</div>
                    <div class="reportDataItem" style="color: #bdb7b7;"	>原纸销售查询</div>
                    <div class="reportDataItem" style="color: #bdb7b7;"	>原纸报损查询</div>
                    <div class="reportDataItem" style="color: #bdb7b7;"	>原纸调拨查询</div>
              </div>
           </div>
         </div>
    </div>
    </div>
</template>

<script>
import globleMixin from '@/mixins'
export default {
  mixins: [globleMixin],
  data () {
    return {

    }
  },
  computed: {
    secondenum () {
      let dataList = this.$store.state.app.Secondaryauthority.Mrp
      console.log(dataList)
      return dataList
    }
  },
  methods: {
    // 子页面 参数: 页面.vue,唯一区别ID,TAB 标签显示名称
    handleSubMenuEvent (currentPage, uniqueKey, tabName) {
      let params = {
        menuName: 'Mrp',
        page: currentPage, // 显示控件页面
        uniqueKey: uniqueKey,
        lable: tabName,
        isActive: true
      }
      this.handleMenuBaseEvent(params) // 调用MIXIN 共用方法
    }
  }
}
</script>

<style lang="scss">
.mrpContent {
  color: white;
  min-height: 600px;
  width: 100%;
  display: flex;
  display: -webkit-flex; /* Safari */
  background: rgba(33, 46, 129, 1);
  //border:1px solid rgba(0,222,255,1);
  .mrpItem {

    &.leftItem {
      display: flex;
      display: -webkit-flex; /* Safari */
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      margin: 10px;
      width: 80%;
      border-radius: 5px;
      box-shadow: 0px 0px 10px rgba(0, 222, 255, 1) inset;
      .circleBallItem {
        width: 137px;
        height: 137px;
        border-radius: 50%;
        &.cartonScheduling {
          background: linear-gradient(
            0deg,
            rgba(14, 76, 253, 1),
            rgba(106, 142, 255, 1)
          );
          .itemIcon {
            width: 140px;
            height: 130px;
            background-image: url("../../../../assets/images/page-design/master-page/icon-cartonScheduling.png");
            background-position: center center;
            background-repeat: no-repeat;
            background-size: auto 60px;
            .itemIconTitle {
              text-align: center;
              line-height: 210px;
            }
          }
        }
        &.productOutsourcing {
          background:linear-gradient(0deg,rgba(0,113,85,1),rgba(3,217,174,1));
          .itemIcon {
            width: 140px;
            height: 130px;
            background-image: url("../../../../assets/images/page-design/master-page/icon-productOutsourcing.png");
            background-position: center center;
            background-repeat: no-repeat;
            background-size: auto 60px;
            .itemIconTitle {
              text-align: center;
              line-height: 210px;
            }
          }
        }
        &.processOutsourcing {
          background:linear-gradient(0deg,rgba(152,40,210,1),rgba(205,111,254,1));
          .itemIcon {
            width: 140px;
            height: 130px;
            background-image: url("../../../../assets/images/page-design/master-page/icon-processOutsourcing.png");
            background-position: center center;
            background-repeat: no-repeat;
            background-size: auto 60px;
            .itemIconTitle {
              text-align: center;
              line-height: 210px;
            }
          }
        }
        &.purchaseOrder {
          background: linear-gradient(
            0deg,
            rgba(253, 113, 46, 1),
            rgba(255, 166, 124, 1)
          );
          .purchaseOrderIcon {
            width: 140px;
            height: 130px;
            background-image: url("../../../../assets/images/page-design/master-page/Icon-purchaseOrder.png");
            background-position: center center;
            background-repeat: no-repeat;
            background-size: auto 60px;
            .purchaseOrderTitle {
              text-align: center;
              line-height: 210px;
            }
          }
        }
      }
    }
    &.rightItem {
      margin: 10px;
      width: 20%;
      border-radius: 5px;
      box-shadow: 0px 0px 10px rgba(0, 222, 255, 1) inset;
      display: flex;
      display: -webkit-flex;
      flex-direction:column;
      .leftContentItem{
          min-height: 100px;
          // width: 100px;
          //border:1px solid green;
          .moduleDataTitleBg{
              background-image: url("../../../../assets/images/page-design/master-page/icon-moduleData.png");
              background-position: 10px top;
              background-repeat: no-repeat;
              background-size: auto 20px;
              .moduleDataTitle{
                color: #FFCC00;
                margin-left: 35px;
                margin-top:10px;
              }
              .moduleDataListBox{
                  display: flex;
                  display: -webkit-flex;
                  flex-direction:column;
                  .moduleDataItem{
                    height: 20px;
                    margin-left: 35px;
                   // border:1px solid yellow;
                  }

              }
          }
          .reportTitleBg{
              background-image: url("../../../../assets/images/page-design/master-page/icon-report.png");
              background-position: 10px top;
              background-repeat: no-repeat;
              background-size: auto 20px;
              .reportTitle{
                color: #18FA00;
                margin-left: 35px;
                margin-top:10px;
              }
              .reportDataListBox{
                   display: flex;
                   display: -webkit-flex;
                   flex-direction:column;
                  .reportDataItem{
                     margin-left: 35px;
                    height: 20px;
                   // border-bottom:1px solid green;
                  }
              }
          }
      }
      .marginTop10{
        margin-top: 10px;
      }

    }
     // 禁用 获取功能未实现 灰色 按钮
    .diabledOrAccess{
        -webkit-filter: grayscale(100%);
        -moz-filter: grayscale(100%);
        -ms-filter:grayscale(100%);
        -o-filter: grayscale(100%);
        filter: grayscale(100%);
        filter:gray;
    }
    .cursorPointer{
      cursor: pointer;
    }
  }
}
</style>
