<template>
    <div class="masterContainer">
        <div class="header">
            <div class="info">
                 <div class="header info leftItem">
                     <div class="compInfo">深圳晨龙科技有限公司</div>
                     <div class="expiryDateInfo">
                         <span>续费时间:2020-07-20</span>
                         <span class="renewalNow">立即续费>></span>
                     </div>
                </div>
                <div  class="header info centerItem">

                </div>
                <div class="header info rightItem">
                    <div class="contactService">联系客服</div>
                    <div class="loginUserInfo">
                        <Icon :size="20" type="md-contact" />
                         <span class="userIdInfo"> ID:admin</span>
                    </div>
                    <div class="systemConfig"></div>
                </div>
            </div>
            <div class="menu">
                   <div class="menuItem activeMenu"> <div class="menuText homeIcon">用户首页</div></div>
                   <div class="menuItem"> <div class="menuText saleIcon"> 销售管理</div></div>
                   <div class="menuItem"> <div class="menuText purchaseIcon"> 采购管理</div></div>
                   <div class="menuItem"> <div class="menuText mrpIcon"> 生产管理</div></div>
                   <div class="menuItem"> <div class="menuText stockIcon"> 仓储管理</div></div>
                   <div class="menuItem"> <div class="menuText accountIcon"> 财务管理</div></div>
                   <div class="menuItem"> <div class="menuText reportIcon"> 报表管理</div></div>
                   <div class="menuItem"> <div class="menuText basIcon"> 基础数据</div></div>
                   <!-- <div class="menuItem"> <div class="menuText sysIcon"> 系统设置</div></div> -->
            </div>
        </div>
         <div class="masterContainer bodyContent">
            <div class="orderCardInfoBox">
                <div class="orderCardItem orderCardInfo">
                    <div class="cardFlexBox">
                        <div class="cardFlexItem cardLeft">
                            <div class="cardTitle">今天接单</div>
                             <img class="cardIcon" :src="cardOrderIcon">
                        </div>
                        <div class="cardFlexItem cardRight">
                            <div class="cardMoney">23,800,00 元</div>
                            <div class="cardArea">13398 M</div>
                        </div>
                    </div>
                </div>
                <div class="orderCardItem saleCardInfo">
                     <div class="cardFlexBox">
                        <div class="cardFlexItem cardLeft">
                            <div class="cardTitle">今天销售</div>
                             <img class="cardIcon" :src="cardSaleIcon">
                        </div>
                        <div class="cardFlexItem cardRight">
                            <div class="cardMoney">23,800,00 元</div>
                            <div class="cardArea">13398 M</div>
                        </div>
                    </div>
                </div>
                <div class="orderCardItem purchaseCardInfo">
                     <div class="cardFlexBox">
                        <div class="cardFlexItem cardLeft">
                            <div class="cardTitle">今天采购</div>
                             <img class="cardIcon" :src="cardPurchaseIcon">
                        </div>
                        <div class="cardFlexItem cardRight">
                            <div class="cardMoney">23,800,00 元</div>
                            <div class="cardArea">13398 M</div>
                        </div>
                    </div>
                </div>
                <div class="orderCardItem stockCardInfo">
                     <div class="cardFlexBox">
                        <div class="cardFlexItem cardLeft">
                            <div class="cardTitle">今天入库</div>
                             <img class="cardIcon" :src="cardStockIcon">
                        </div>
                        <div class="cardFlexItem cardRight">
                            <div class="cardMoney">23,800,00 元</div>
                            <div class="cardArea">13398 M</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="echartInfoBox">
                <div class="echartItem leftEchartIcon">
                </div>
                 <div class="echartItem compassIconConfig">
                     <div class=compassTitle>经营罗盘</div>
                     <img class="compassIcon" :src="compassIcon">
                </div>
                 <div class="echartItem rightEchartIcon">
                </div>
            </div>
            <div class="echartOtherInfoBox">
                 <div class="echartOtherItem">
                </div>
                 <div class="echartOtherItem echartOtherConfig">
                </div>
                 <div class="echartOtherItem echartOtherConfig">
                </div>
                  <div class="echartOtherItem echartOtherConfig">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// 新的主页
import cardOrderIcon from '@/assets/images/page-design/master-page/card-order-icon.png'
import cardPurchaseIcon from '@/assets/images/page-design/master-page/card-purchase-icon.png'
import cardSaleIcon from '@/assets/images/page-design/master-page/card-sale-icon.png'
import cardStockIcon from '@/assets/images/page-design/master-page/card-stock-icon.png'
import compassIcon from '@/assets/images/page-design/master-page/compassIcon.png'
export default {
    name:'master',
    mixins:[],
    components:{},
    data(){
        return {
             cardOrderIcon,cardPurchaseIcon,cardSaleIcon,cardStockIcon,compassIcon//图片路径
        }
    },
    computed:{

    },
    watch:{

    },
    created(){

    },
    mounted(){

    },
    methods:{

    }
}
</script>
<style lang="scss">
   $master-background-color: #2c0f86;
   .masterContainer {
        height:1000px;
        overflow: auto;
        background-color: #2c0f86;
        .header{
            display: -webkit-flex; /* Safari */
            display: flex;
            flex-direction: row;
            //border: 1px #ccc solid;
            .info{
                 height: 65px;
                 // 共用数据
                 &.leftItem{
                    position:absolute;
                    top: 0px;
                    left: 0px;
                    color: white;
                    font-size: 12px;
                    display:flex;
                    flex-direction: column;
                    width: 36%;  
                    z-index: 3;
                    padding: 5px 15px;
                    background-image: url('../../assets/images/page-design/master-page/header-left-bg-all.png');
                    background-position: left top;
                    background-repeat:  no-repeat;
                    background-size:505px 44px;
                    .compInfo{
                        //margin-left: 10px;
                    }
                    .renewalNow{
                        margin-left: 20px;
                    }
                     
                 }
                 &.centerItem{
                    position:absolute;
                    top: 0px;
                    left: 33.33%;
                     z-index:1;
                     display:flex;
                     width: 33.33%; 
                    background-image:url('../../assets/images/page-design/master-page/logo.png'), url('../../assets/images/page-design/master-page/header-center-bg-all.png');
                    background-repeat:no-repeat,no-repeat;
                    background-position:center top, right top;
                    background-size:auto 43px,475px 75px;
                    width: 33%; // 必须添加宽度
                }
                 &.rightItem{
                    position:absolute;
                    top: 0px;
                    right: 0px;
                    display:flex;
                    width: 36%; 
                     color: white;
                     //padding: 10px 105px;
                    font-size: 12px;
                     z-index: 3;
                    background-image: url('../../assets/images/page-design/master-page/header-right-bg-all.png');
                    background-position: right top;
                    background-repeat:  no-repeat;
                    background-size:510px 44px;
                    .contactService{
                         margin-top: 14px;
                         margin-left: 130px;
                    }
                    .loginUserInfo{
                        margin-top: 14px;
                        margin-left: 50px;
                        .userIdInfo{
                            margin-left: 5px;
                        }
                    }
                   .systemConfig{
                        margin-top: 14px;
                        width: 100px;
                        background-image: url('../../assets/images/page-design/master-page//btn-icon-sys.png');
                        //background-position: 10% 47%; // 图表控制偏移
                        background-repeat: no-repeat;
                        background-size:auto 16px; // 菜单背景图大小
                        margin-left: 80px;
                   }
                }
            }
            .menu{
                //菜单总信息
                display: -webkit-flex; /* Safari */
                display: flex;
                flex-direction: row;
                justify-content:center;
                width: 100%;
                //border: 1px yellow solid;
                margin-top: 64px;
                //margin-left: 102px;
                .menuItem{
                    // 菜单共用信息
                    width: 130px; 
                    height: 50px;
                    margin-left: 5px;
                    &.activeMenu{
                        // 选中时的背景颜色
                        background-image: url('../../assets/images/page-design/master-page/bg-menu.png');
                        background-repeat: no-repeat;
                        background-size:auto 50px; // 菜单背景图大小
                    }
                   
                }
                .menuText{
                    // 菜单文字 控制 大小 颜色 偏移等属性
                    width: 100%;
                    padding: 15px 36px; // 字体偏移
                    color: white;
                     margin-left: 5px;// 图片字体一起 整体偏移
                     &.homeIcon{
                         // 首页模块 的主菜单ICON 图表
                        background-image: url('../../assets/images/page-design/master-page//btn-icon-home.png');
                        background-position: 10% 47%; // 图表控制偏移
                        background-repeat: no-repeat;
                        background-size:auto 16px; // 菜单背景图大小
                    }
                     &.saleIcon{
                         // 发售模块 的主菜单ICON 图表
                        background-image: url('../../assets/images/page-design/master-page//btn-icon-sale.png');
                        background-position: 10% 47%; // 图表控制偏移
                        background-repeat: no-repeat;
                        background-size:auto 16px; // 菜单背景图大小
                    }
                     &.purchaseIcon{
                         // 采购模块 的主菜单ICON 图表
                        background-image: url('../../assets/images/page-design/master-page//btn-icon-purchase.png');
                        background-position: 10% 47%; // 图表控制偏移
                        background-repeat: no-repeat;
                        background-size:auto 16px; // 菜单背景图大小
                    }
                     &.mrpIcon{
                         // 采购模块 的主菜单ICON 图表
                        background-image: url('../../assets/images/page-design/master-page//btn-icon-mrp.png');
                        background-position: 10% 47%; // 图表控制偏移
                        background-repeat: no-repeat;
                        background-size:auto 16px; // 菜单背景图大小
                    }
                      &.stockIcon{
                         // 仓储模块 的主菜单ICON 图表
                        background-image: url('../../assets/images/page-design/master-page//btn-icon-stock.png');
                        background-position: 10% 47%; // 图表控制偏移
                        background-repeat: no-repeat;
                        background-size:auto 16px; // 菜单背景图大小
                    }
                     &.accountIcon{
                         // 财务模块 的主菜单ICON 图表
                        background-image: url('../../assets/images/page-design/master-page//btn-icon-account.png');
                        background-position: 10% 47%; // 图表控制偏移
                        background-repeat: no-repeat;
                        background-size:auto 16px; // 菜单背景图大小
                    }
                      &.reportIcon{
                         // 财务模块 的主菜单ICON 图表
                        background-image: url('../../assets/images/page-design/master-page//btn-icon-report.png');
                        background-position: 10% 47%; // 图表控制偏移
                        background-repeat: no-repeat;
                        background-size:auto 16px; // 菜单背景图大小
                    }
                    &.basIcon{
                         // 财务模块 的主菜单ICON 图表
                        background-image: url('../../assets/images/page-design/master-page//btn-icon-bas.png');
                        background-position: 10% 47%; // 图表控制偏移
                        background-repeat: no-repeat;
                        background-size:auto 16px; // 菜单背景图大小
                    }
                     &.sysIcon{
                         // 财务模块 的主菜单ICON 图表
                        background-image: url('../../assets/images/page-design/master-page//btn-icon-sys.png');
                        background-position: 10% 47%; // 图表控制偏移
                        background-repeat: no-repeat;
                        background-size:auto 16px; // 菜单背景图大小
                    }
                     
                }
               
            }

        }
        .bodyContent{
           //border: 1px red solid;
           //height: calc(100% - 100px);
           .orderCardInfoBox{
                display: -webkit-flex; /* Safari */
                display: flex;
                flex-direction: row;
                justify-content:center;
                .orderCardItem{
                    width:290px;
                    height:120px;
                    border-radius:5px;
                    margin-top: 21px;
                    &.orderCardInfo{
                        background:linear-gradient(90deg,rgba(132,60,246,1),rgba(117,155,255,1));
                    }
                      &.saleCardInfo{
                       background:linear-gradient(90deg,rgba(252,82,134,1),rgba(251,170,162,1));
                        margin-left: 21px;
                    }
                      &.purchaseCardInfo{
                        background:linear-gradient(90deg,rgba(255,118,59,1),rgba(255,196,128,1));
                        margin-left: 21px;
                    }
                      &.stockCardInfo{
                        background:linear-gradient(90deg,rgba(14,76,253,1),rgba(106,142,255,1));
                        margin-left: 21px;
                    }
                  .cardFlexBox{
                      display: flex;
                      width: 100%;
                      .cardFlexItem{
                          width: 50%;
                         &.cardLeft{
                             color: white;
                             padding: 6% 10%;
                           .cardIcon{
                            padding: 10px 0;
                            width: 50px;
                            //height: auto;
                           }
                         }
                         &.cardRight{
                             color: white;
                             padding: 10% 5%;
                             font-size: 16px;
                            .cardMoney{
                                font-weight: bold;
                            }
                            .cardArea{
                                 font-weight: bold;
                                 margin-top: 10px;
                            }
                         }
                        
                      }
                  }  
                }

           }
           .echartInfoBox{
                display: -webkit-flex; /* Safari */
                display: flex;
                flex-direction: row;
                margin-top: 10px;
                justify-content:center; 
                .echartItem{
                   // 共用数据
                    &.leftEchartIcon{
                     width:470px;
                     height:250px;
                        background-image: url('../../assets/images/page-design/master-page/leftEchartIcon-bg.png');
                        background-position: left top;
                        background-repeat: no-repeat;
                        background-size:470px 250px;  
                    }
                    &.compassIconConfig{
                         //margin-left: 10%;
                         width:228;
                         height:101px;
                        .compassTitle{
                            color:white;
                            margin-left: 40%;
                        }
                    }
                    .compassIcon{
                        padding: 5px;
                       // margin-left: 20px;
                        width: 265px;
                    }
                    &.rightEchartIcon{
                          width:470px;
                          height:250px;
                        //margin-left: 10%;
                        background-image: url('../../assets/images/page-design/master-page/rightEchartIcon.png');
                        background-position: left top;
                        background-repeat: no-repeat;
                        background-size:470px 250px;  
                    }
                }
           }
           .echartOtherInfoBox{
                display: -webkit-flex; /* Safari */
                display: flex;
                flex-direction: row;
                margin-top: 10px;
                justify-content:center; 
                .echartOtherItem{
                    width:290px;
                    height:250px;
                    background-image: url('../../assets/images/page-design/master-page/centerEchartIcon-bg.png');
                    background-position: left top;
                    background-repeat: no-repeat;
                    background-size:290px 250px;  // 大小必须和上面的宽度设置范围内
                    &.echartOtherConfig{
                         margin-left: 20px;
                    }
                }
           }
        }
        // .footer{
        //     border: 1px yellow solid;
        //     height: 50px;
        // }
   }
 
</style>