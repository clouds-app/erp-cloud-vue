<template>
 
  <div class="stockContent">
    <div class="stockContentItem leftItem">
      <div class="leftRowItem">
        <div class="columnItem contentWidth20Box">
          <div class="columnModuleItem" style="padding-top:15px">
                <!-- <div @click="handleSubMenuEvent('paperJoin','stock-paperJoin','纸板入库',secondenum.paperJoin.val.disabled)" :class="[secondenum.paperJoin.val.disabled?'diabledOrAccess':'']"  class="buttonItem PaperStockIn cursorPointer">
                  <div class="PaperStockInTitle">纸板采购入库</div>
                </div> -->
                <div @click="handleSubMenuEvent('purPaperJoin','stock-purPaperJoin','纸板入库',secondenum.purPaperJoin.val.disabled)" :class="[secondenum.purPaperJoin.val.disabled?'diabledOrAccess':'']"  class="buttonItem PaperStockIn cursorPointer">
                  <div class="PaperStockInTitle">纸板采购入库</div>
                </div>
               
          </div>
          <div class="columnModuleItem marginTop20">
                 <div @click="handleSubMenuEvent('newBoxUseRe','stock-newBoxUseRe','纸板退货',secondenum.newBoxUseRe.val.disabled)" :class="[secondenum.newBoxUseRe.val.disabled?'diabledOrAccess':'']"  class="buttonItem PaperReturn cursorPointer">
                  <div class="PaperReturnTitle">纸板退货</div>
                </div>
          </div>
        </div>
        <div class="columnItem contentWidth10Box">
          <div class="iconArrow arrowRight"></div>
          <!-- <div style="display: flex;">
            <div style="height:1px; border:1px solid red; width:20px"></div>
            <Icon type="md-arrow-dropright" size="40"/>
          </div> -->
          <div class="iconArrow arrowLeft"></div>
        </div>
        <div class="columnItem contentWidth30Box">
          <div class="columnItemBg">
            <div @click="handleSubMenuEvent('selectBoxStore','stock-selectBoxStore','用料库存')" :class="[secondenum.selectBoxStore.val.disabled?'diabledOrAccess':'cursorPointer']"  class="buttonItem CartonStock">
              <div class="CartonStockTitle">用料库存</div>
            </div>
            <div class="buttonItem CardboardMaterialWarehouse">
              <div class="CardboardMaterialWarehouseTitle">纸板材料仓</div>
            </div>
            <div class="buttonItem buttonItemBoxConfig">
              <div class="buttonItemBox">
                <div @click="handleSubMenuEvent('boxUseAdjust','stock-boxUseAdjust','纸板用料盘点',secondenum.boxUseAdjust.val.disabled)" :class="[secondenum.boxUseAdjust.val.disabled?'diabledOrAccess':'']" class="buttonBelowSubItem MaterialInventory cursorPointer">
                  <div class="MaterialInventoryTitle">用料盘点</div>
                </div>
                <div class="buttonBelowSubItem MaterialAllocation diabledOrAccess">
                  <div class="MaterialAllocationTitle">用料调拨</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="columnItem contentWidth10Box">
          <div class="iconArrow arrowRight"></div>
          <div class="iconArrow arrowLeft"></div>
        </div>

        <div class="columnItem contentWidthLastBox">
          <div class="lastBoxItem upItem" style="padding-top:15px">
            <div @click="handleSubMenuEvent('boxUseOut','stock-boxUseOut','用料出库' ,secondenum.boxUseOut.val.disabled)" :class="[secondenum.boxUseOut.val.disabled?'diabledOrAccess':'']" class="upItemButton MaterialDelivery cursorPointer">
              <div class="MaterialDeliveryTitle">
                用料出库
              </div>
            </div>
            <div @click="handleSubMenuEvent('boxUseLost','stock-boxUseLost','用料报损',secondenum.boxUseLost.val.disabled)" :class="[secondenum.boxUseLost.val.disabled?'diabledOrAccess':'']" class="upItemButton MaterialLossReport cursorPointer">
              <div class="MaterialLossReportTitle">
                用料报损
              </div>
            </div>
          </div>
          <div class="lastBoxItem downItem">
            <div  @click="handleSubMenuEvent('boxUseBack','stock-boxUseBack','用料退仓',secondenum.boxUseBack.val.disabled)" :class="[secondenum.boxUseBack.val.disabled?'diabledOrAccess':'']" class="downItemButton cursorPointer">
              <div class="MaterialWithdrawalTitle">用料退仓</div>
            </div>
          </div>
        </div>
      </div>
      <div class="leftRowItem">
        <div class="columnItem contentWidth20Box">
          <div class="columnItemBg">
            <div @click="handleSubMenuEvent('boxLibInit','stock-boxLibInit','纸箱初始入库',secondenum.boxLibInit.val.disabled)" :class="[secondenum.boxLibInit.val.disabled?'diabledOrAccess':'']" class="buttonItem PaperStockIn cursorPointer">
              <div class="PaperStockInTitle">纸箱初始入库</div>
            </div>
            <div @click="handleSubMenuEvent('boxLibIn','stock-boxLibIn','纸箱成品入库',secondenum.boxLibIn.val.disabled)" :class="[secondenum.boxLibIn.val.disabled?'diabledOrAccess':'']"  class="buttonItem Cartonwarehousing cursorPointer">
              <div class="CartonwarehousingTitle">纸箱入库</div>
            </div>
          </div>
        </div>
        <div class="columnItem contentWidth10Box">
          <div class="iconArrow arrowRight"></div>
          <!-- <div class="iconArrow arrowLeft"></div> -->
        </div>
        <div class="columnItem contentWidth30Box">
          <div class="columnItemBg">
            <div class="buttonItem CartonStock cursorPointer" @click="handleSubMenuEvent('selectStoreTotal','stock-selectStoreTotal','纸箱库存')" :class="[secondenum.selectStoreTotal.val.disabled?'diabledOrAccess':'']">
              <div class="CartonStockTitle">纸箱库存</div>
            </div>
            <div class="buttonItem CardboardMaterialWarehouse">
              <div class="CardboardMaterialWarehouseTitle">纸箱成品仓</div>
            </div>
            <div class="buttonItem buttonItemBoxConfig">
              <div class="buttonItemBox">
                <div @click="handleSubMenuEvent('boxLibCheck','stock-boxLibCheck','纸箱库存盘点',secondenum.boxLibCheck.val.disabled)" :class="[secondenum.boxLibCheck.val.disabled?'diabledOrAccess':'']" class="buttonBelowSubItem MaterialInventory cursorPointer">
                  <div class="MaterialInventoryTitle">纸箱盘点</div>
                </div>
                <div @click="handleSubMenuEvent('boxLibMove','stock-boxLibMove','纸箱库存调拨',secondenum.boxLibMove.val.disabled)" :class="[secondenum.boxLibMove.val.disabled?'diabledOrAccess':'']" class="buttonBelowSubItem MaterialAllocation cursorPointer">
                  <div class="MaterialAllocationTitle">纸箱调拨</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="columnItem contentWidth10Box">
          <div class="iconArrow arrowRight"></div>
          <div class="iconArrow arrowLeft"></div>
        </div>
        <div class="columnItem contentWidthLastBox">
          <div class="lastBoxItem upItem" style="padding-top:15px">
            <div>
              <div @click="handleSubMenuEvent('boxDeli','stock-boxDeli','纸箱出货',secondenum.boxDeli.val.disabled)" :class="[secondenum.boxDeli.val.disabled?'diabledOrAccess':'']" class="upItemButton MaterialDelivery cursorPointer">
                <div class="MaterialDeliveryTitle">
                  纸箱出货
                </div>
              </div>
              <div @click="handleSubMenuEvent('boxCar','stock-boxCar','装车安排',secondenum.boxCar.val.disabled)" :class="[secondenum.boxCar.val.disabled?'diabledOrAccess':'']" class="upItemButton MaterboxCarvery cursorPointer">
                <div class="MaterboxCarveryTitle">
                  装车安排
                </div>
              </div>
            </div>
            
              <div @click="handleSubMenuEvent('boxLibLost','stock-boxLibLost','纸箱成品报损',secondenum.boxLibLost.val.disabled)" :class="[secondenum.boxLibLost.val.disabled?'diabledOrAccess':'']" class="upItemButton MaterialLossReport cursorPointer">
                <div class="MaterialLossReportTitle">
                  纸箱报损
                </div>
              </div>
             
           
          </div>
          <div class="lastBoxItem downItem">
            <div @click="handleSubMenuEvent('boxRe','stock-boxRe','纸箱退货',secondenum.boxRe.val.disabled)" :class="[secondenum.boxRe.val.disabled?'diabledOrAccess':'']" class="downItemButtonTwo cursorPointer">
              <div class="CartonReturnTitle">纸箱退货</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="stockContentItem rightItem">
      <!-- <div class="leftContentItem">
        <div class="moduleDataTitleBg">
          <div class="moduleDataTitle">模块数据</div>
          <div class="moduleDataListBox cursorPointer">
                    <div @click="handleSubMenuEvent('selectStoreTotal','stock-selectStoreTotal','纸箱库存查询')" class="moduleDataItem">纸箱库存查询</div>
                     <div @click="handleSubMenuEvent('selectAnalyzer','stock-selectAnalyzer','纸箱出货汇总查询')" class="moduleDataItem">纸箱出货汇总查询</div>
          </div>
        </div>
      </div> -->
      <div class="leftContentItem marginTop10">
        <div class="reportTitleBg">
          <div class="reportTitle">报表</div>
          <div class="reportDataListBox cursorPointer">
              <div @click="handleSubMenuEvent('boxRepurchase','stock-boxRepurchase','纸板采购退货查询',secondenum.boxRepurchase.val.disabled)" :class="[secondenum.boxRepurchase.val.disabled?'disabledColor':'']" class="reportDataItem">纸板采购退货查询</div>
              <div @click="handleSubMenuEvent('querypaperJoin','stock-querypaperJoin','纸板采购入库查询',secondenum.querypaperJoin.val.disabled)" :class="[secondenum.querypaperJoin.val.disabled?'disabledColor':'']" class="reportDataItem">纸板采购入库查询</div>
              <div  class="reportDataItem"></div>
              <div @click="handleSubMenuEvent('selectAnalyzer','stock-selectAnalyzer','纸箱出货汇总查询',secondenum.selectAnalyzer.val.disabled)" :class="[secondenum.selectAnalyzer.val.disabled?'disabledColor':'']" class="reportDataItem">纸箱出货汇总查询</div>
              <div @click="handleSubMenuEvent('cartonStock','stock-cartonStock','纸箱用料库存',secondenum.cartonStock.val.disabled)" :class="[secondenum.cartonStock.val.disabled?'disabledColor':'']" class="reportDataItem">纸箱用料库存</div>
              <div @click="handleSubMenuEvent('selectStoreTotal','stock-selectStoreTotal','纸箱库存查询',secondenum.selectStoreTotal.val.disabled)" class="reportDataItem" :class="[secondenum.selectStoreTotal.val.disabled?'disabledColor':'']">纸箱库存查询</div>
              <div @click="handleSubMenuEvent('stockDeliBack','stock-stockDeliBack','送货单回签情况表',secondenum.stockDeliBack.val.disabled)" class="reportDataItem" :class="[secondenum.stockDeliBack.val.disabled?'disabledColor':'']">送货单回签情况表</div>
              <!-- <div @click="handleSubMenuEvent('boxCar','stock-boxCar','装车安排',secondenum.boxCar.val.disabled)" class="reportDataItem" :class="[secondenum.boxCar.val.disabled?'disabledColor':'']">装车安排</div> -->
              <!-- <div @click="handleSubMenuEvent('purPaperJoin','stock-purPaperJoin','纸板入库查询',secondenum.purPaperJoin.val.disabled)" class="reportDataItem" :class="[secondenum.purPaperJoin.val.disabled?'disabledColor':'']">纸板入库查询</div> -->
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
    return {}
  },
  computed: {
    secondenum () {
      let dataList = this.$store.state.app.Secondaryauthority.Stock
        dataList = this.resetSecondeMenuList(dataList)
      return dataList
    }
  },
  methods: {
    // adopt(currentPage, uniqueKey, tabName){
    //   // this.relationSubMenu(currentPage,this.secondenum)
    //   let params = {
    //     menuName: 'Stock',
    //     page: currentPage, // 显示控件页面
    //     uniqueKey: uniqueKey,
    //     lable: tabName,
    //     isActive: true
    //   }
    //   this.handleMenuBaseEvent(params,true) // 调用MIXIN 共用方法
    // },
    // 子页面 参数: 页面.vue,唯一区别ID,TAB 标签显示名称
    handleSubMenuEvent (currentPage, uniqueKey, tabName, flag) {
       this.relationSubMenu(currentPage,this.secondenum)
      if (flag) {
        this.$Message.warning('暂无权限,请与管理员联系!')
        return
      }
      let params = {
        menuName: 'Stock',
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
.disabledColor{
  color: #bdb7b7;
}
.stockContent {
  color: white;
  min-height: 600px;
  width: 100%;
  display: flex;
  display: -webkit-flex; /* Safari */
  background: rgba(33, 46, 129, 1);
  .stockContentItem {
    // 项目共用参数
    &.leftItem {
      display: flex;
      display: -webkit-flex; /* Safari */
      flex-direction: column;
      margin: 10px;
      width: 80%;
      border-radius: 5px;
      box-shadow: 0px 0px 10px rgba(0, 222, 255, 1) inset;
      .leftRowItem {
        height: 50%;
       // border: 1px solid yellow;
        display: flex;
        display: -webkit-flex; /* Safari */
        flex-direction: row;
        .columnItem {
          //border: 1px solid gray;
          &.contentWidth20Box {
            display: flex;
            display: -webkit-flex; /* Safari */
            flex-direction: column;
            width: 25%;
            justify-content: center;
            align-items: center;
            .columnItemBg {
              display: flex;
              display: -webkit-flex; /* Safari */
              flex-direction: column;
              justify-content: center;
              align-items: center;
              height: 170px;
              width: 170px;
              margin-left: 30%;
              // background: #3e3692;
              // border: 1px solid #3e3692;
              border-radius: 10px;
              .buttonItem {
                width: 95px;
                height: 40px;
                border-radius: 20px;
                &.PaperStockIn {
                  //纸版采购入库
                  background: linear-gradient(
                    90deg,
                    rgba(17, 78, 253, 1),
                    rgba(125, 159, 255, 1)
                  );
                  border: 2px solid rgba(5, 66, 243, 0.38);
                  .PaperStockInTitle {
                    font-size: 13px;
                    text-align: center;
                    line-height: 35px;
                  }
                }
                &.PaperReturn {
                  //纸版退货
                  margin-top: 76px;
                  background: linear-gradient(
                    90deg,
                    rgba(254, 122, 59, 1),
                    rgba(255, 173, 133, 1)
                  );
                  border: 2px solid rgba(224, 91, 27, 0.38);
                  .PaperReturnTitle {
                    text-align: center;
                    line-height: 35px;
                  }
                }
                &.Cartonwarehousing{
                    //纸箱入库
                  margin-top: 20px;
                  background:linear-gradient(90deg,rgba(4,152,101,1),rgba(3,199,160,1));
                  border:2px solid rgba(2, 132, 89, 0.38);
                  .CartonwarehousingTitle {
                    text-align: center;
                    line-height: 35px;
                  }
                }
              }
            }
            .columnModuleItem{
                height: 80px;
                width: 170px;
                // background: #3e3692;
                // border: 1px solid #3e3692;
                margin-left: 30%;
                display: flex;
                display: -webkit-flex; /* Safari */
                flex-direction: column;
                justify-content: center;
                align-items: center;
                border-radius: 10px;
                &.marginTop20{
                  padding-bottom: 15px;
                  margin-top:68px;
                }
                .buttonItem {
                width: 95px;
                height: 40px;
                border-radius: 20px;
                &.PaperStockIn {
                  //纸版采购入库
                  background: linear-gradient(
                    90deg,
                    rgba(17, 78, 253, 1),
                    rgba(125, 159, 255, 1)
                  );
                  border: 2px solid rgba(5, 66, 243, 0.38);
                  .PaperStockInTitle {
                    font-size: 13px;
                    text-align: center;
                    line-height: 35px;
                  }
                }
                &.PaperReturn {
                  //纸版退货
                  //margin-top: 20px;
                  background: linear-gradient(
                    90deg,
                    rgba(254, 122, 59, 1),
                    rgba(255, 173, 133, 1)
                  );
                  border: 2px solid rgba(224, 91, 27, 0.38);
                  .PaperReturnTitle {
                    text-align: center;
                    line-height: 35px;
                  }
                }
                &.Cartonwarehousing{
                    //纸箱入库
                  margin-top: 20px;
                  background:linear-gradient(90deg,rgba(4,152,101,1),rgba(3,199,160,1));
                  border:2px solid rgba(2, 132, 89, 0.38);
                  .CartonwarehousingTitle {
                    text-align: center;
                    line-height: 35px;
                  }
                }
              }
            }
          }
          &.contentWidth10Box {
            width: 10%;
            display: flex;
            display: -webkit-flex; /* Safari */
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .iconArrow {
              width: 100%;
              &.arrowRight {
                     height: 100px;
                    //  background: url("../../../../assets/images/svgIcon/arrow-right.svg");
                     background: url("../../../../assets/images/right-4.png");
                     background-position: left center;
                     background-repeat: no-repeat;
                     background-size: 90px 15px;
              }
              &.arrowLeft {
                margin-top: 30px;
                height: 100px;
                // background: url("../../../../assets/images/svgIcon/arrow-left.svg");
                background: url("../../../../assets/images/left-3.png");
                background-position: left center;
                background-repeat: no-repeat;
                // background-size: 50px 100px;
                background-size: 90px 15px;
              }
            }
          }
          &.contentWidth30Box {
            display: flex;
            display: -webkit-flex; /* Safari */
            width: 30%;
            justify-content: center;
            align-items: center;
            .columnItemBg {
              display: flex;
              display: -webkit-flex; /* Safari */
              flex-direction: column;
              justify-content: center;
              align-items: center;
              height: 250px;
              width: 250px;
              background: #3e3692;
              border: 1px solid #3e3692;
              border-radius: 10px;
              .buttonItem {
                width: 95px;
                height: 40px;
                &.CartonStock {
                  //纸箱库存
                  border-radius: 20px;
                  background: linear-gradient(
                    90deg,
                    rgba(4, 152, 101, 1),
                    rgba(3, 199, 160, 1)
                  );
                  border: 2px solid rgba(2, 132, 89, 0.38);
                  .CartonStockTitle {
                    padding-top: 10px;
                    padding-left: 17px;
                  }
                }
                &.CardboardMaterialWarehouse {
                  margin-top: 20px;
                  .CardboardMaterialWarehouseTitle {
                    font-size: 16px;
                    font-weight: bold;
                    color: #6b6868;
                    padding-top: 10px;
                    padding-left: 10px;
                  }
                }
                &.buttonItemBoxConfig {
                  width: 95px+95px+10px;
                  height: 40px;
                  margin-top: 20px;
                  //border:1px solid yellow;
                  .buttonItemBox {
                    display: flex;
                    display: -webkit-flex; /* Safari */
                    width: 100%;
                    .buttonBelowSubItem {
                      width: 95px;
                      height: 40px;
                      border-radius: 20px;
                      &.MaterialInventory {
                        // 用料盘点
                        background: linear-gradient(
                          90deg,
                          rgba(132, 62, 246, 1),
                          rgba(153, 134, 250, 1)
                        );
                        border: 2px solid rgba(77, 14, 185, 0.38);
                        .MaterialInventoryTitle {
                          text-align: center;
                          line-height: 35px;
                        }
                      }
                      &.MaterialAllocation {
                        // 用料调拨
                        margin-left: 10px;
                        background: linear-gradient(
                          90deg,
                          rgba(5, 82, 197, 1),
                          rgba(84, 132, 253, 1)
                        );
                        border: 2px solid rgba(21, 9, 171, 0.38);
                        .MaterialAllocationTitle {
                          text-align: center;
                          line-height: 35px;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          &.contentWidthLastBox {
            display: flex;
            display: -webkit-flex; /* Safari */
            flex-direction: column;
            justify-content: space-around;;
            align-items: center;
            width: 30%;
            .lastBoxItem {
              //用料 共用数据
              // background: #3e3692;
              // border: 1px solid #3e3692;
              margin-right: 30%;
              border-radius: 10px;
              &.upItem {
                height: 120px;
                width: 270px;
                display: flex;
                display: -webkit-flex; /* Safari */
                flex-direction: row;
                justify-content: space-around;;
                align-items: center;
                .upItemButton {
                  width: 95px;
                  height: 40px;
                  border-radius: 20px;
                  &.MaterialDelivery {
                    background: linear-gradient(
                      90deg,
                      rgba(17, 78, 253, 1),
                      rgba(125, 159, 255, 1)
                    );
                    margin-bottom: 5px;
                    border: 2px solid rgba(5, 66, 243, 0.38);
                    .MaterialDeliveryTitle {
                      text-align: center;
                      line-height: 35px;
                    }
                  }
                  &.MaterboxCarvery {
                    background: linear-gradient(
                      90deg,
                     rgba(132, 62, 246, 1),
                    rgba(153, 134, 250, 1)
                    );
                    border: 2px solid rgba(5, 66, 243, 0.38);
                    .MaterboxCarveryTitle {
                      text-align: center;
                      line-height: 35px;
                    }
                  }
                  &.MaterialLossReport {
                    
                    background: linear-gradient(
                      90deg,
                      rgba(254, 122, 59, 1),
                      rgba(255, 173, 133, 1)
                    );
                    border: 2px solid rgba(224, 91, 27, 0.38);
                    .MaterialLossReportTitle {
                      text-align: center;
                      line-height: 35px;
                    }
                  }
                }
              }
              &.downItem {
                // margin-top: 10px;
                // margin-bottom: 23px;
                height: 120px;
                width: 235px;
                display: flex;
                display: -webkit-flex; /* Safari */
                flex-direction: column;
                justify-content: center;
                padding-bottom: 15px;
                // align-items: center;
                .downItemButton {
                  width: 95px;
                  height: 40px;
                  background: linear-gradient(
                    90deg,
                    rgba(132, 62, 246, 1),
                    rgba(153, 134, 250, 1)
                  );
                  border: 2px solid rgba(90, 30, 193, 0.38);
                  border-radius: 20px;
                  .MaterialWithdrawalTitle {
                    text-align: center;
                    line-height: 35px;
                  }
                }
                 .downItemButtonTwo {
                  width: 95px;
                  height: 40px;
                  background:linear-gradient(90deg,rgba(254,122,59,1),rgba(255,173,133,1));
                  border:2px solid rgba(224, 91, 27, 0.38);
                  border-radius: 20px;
                  .CartonReturnTitle {
                    text-align: center;
                    line-height: 35px;
                  }
                }
              }
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
      flex-direction: column;
      .leftContentItem {
        min-height: 100px;
        // width: 100px;
        //border:1px solid green;
        .moduleDataTitleBg {
          background-image: url("../../../../assets/images/page-design/master-page/icon-moduleData.png");
          background-position: 10px top;
          background-repeat: no-repeat;
          background-size: auto 20px;
          .moduleDataTitle {
            color: #ffcc00;
            margin-left: 35px;
            margin-top: 10px;
          }
          .moduleDataListBox {
            display: flex;
            display: -webkit-flex;
            flex-direction: column;
            .moduleDataItem {
              height: 20px;
              margin-left: 35px;
              // border:1px solid yellow;
            }
          }
        }
        .reportTitleBg {
          background-image: url("../../../../assets/images/page-design/master-page/icon-report.png");
          background-position: 10px top;
          background-repeat: no-repeat;
          background-size: auto 20px;
          .reportTitle {
            color: #18fa00;
            margin-left: 35px;
            margin-top: 10px;
          }
          .reportDataListBox {
            display: flex;
            display: -webkit-flex;
            flex-direction: column;
            margin-top:5px;
            .reportDataItem {
              margin-top: 10px;
              margin-left: 35px;
              height: 20px;
              // border-bottom:1px solid green;
            }
          }
        }
      }
      .marginTop10 {
        margin-top: 10px;
      }
    }
    // 禁用 获取功能未实现 灰色 按钮
    .diabledOrAccess {
      -webkit-filter: grayscale(100%);
      -moz-filter: grayscale(100%);
      -ms-filter: grayscale(100%);
      -o-filter: grayscale(100%);
      filter: grayscale(100%);
      filter: gray;
    }
    .cursorPointer {
      cursor: pointer;
    }
  }
}
</style>
