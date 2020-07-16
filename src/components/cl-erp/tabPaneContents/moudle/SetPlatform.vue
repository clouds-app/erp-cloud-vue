<template>
  <div style=" ">
    <Row>
      <Col span="1">&nbsp;</Col>
      <Col span="6" offset="1">
        <Card>
          <p slot="title">平台运维</p>
          <p style="padding: 10px;">
            <Button @click="handleSubMenuEvent('sysForm','setplatform-form','表单')" type="info">表单</Button>
          </p>
          <p style="padding: 10px;">
            <Button
              @click="handleSubMenuEvent('popopConfig','popop-config','弹框配置')"
              type="info"
            >弹框配置</Button>
          </p>
          <p style="padding: 10px;">
            <Button
              @click="handleSubMenuEvent('platformResource','platform-resource','资源配置')"
              type="info"
            >资源配置</Button>
          </p>
        </Card>
      </Col>
      <Col span="6">
        <Card>
          <p slot="title">系统设置</p>
         <p style="padding: 10px;">
            <Button @click="handleSubMenuEvent('sysReport','setplatform-report','报表设计')" type="info">报表设计</Button>
          </p>
        </Card>
      </Col>
    </Row>
  </div>
 
</template>

<script>
import globleMixin from "@/mixins";
//import subMenuMixin from './mixins'
export default {
  mixins: [globleMixin],
  data() {
    return {};
  },
  methods: {
    // 子页面 参数: 页面.vue,唯一区别ID,TAB 标签显示名称
    handleSubMenuEvent(currentPage, uniqueKey, tabName, ) {
      let params = {
        menuName: "SetPlatform",
        page: currentPage, //显示控件页面
        uniqueKey: uniqueKey,
        lable: tabName,
        isActive: true
      };
      this.handleMenuBaseEvent(params,true); // 调用MIXIN 共用方法
     
    }
  }
};
</script>

<style lang="scss">
.sysContent{
  color: white;
  min-height: 600px;
  width: 100%;
  display: flex;
  display: -webkit-flex; /* Safari */
  background: rgba(33, 46, 129, 1);
    .sysItem {
      display: flex;
      display: -webkit-flex; /* Safari */
      flex-direction: row;
      margin: 10px;
      width: 100%;
      border-radius: 5px;
      box-shadow: 0px 0px 10px rgba(0, 222, 255, 1) inset;
      .contentHeightBox{
        &.left {
        width: 50%;
        margin: 15px;
        // border: 1px solid red;
        .acdountItem{
          padding-left: 1px;
          padding-top: 10px;
          margin: 15px;
          // border: 1px solid #000;
            .moduleDataTitleBg{
              background-image: url("../../../../assets/images/page-design/Report/icon-keySys.png");
              background-position: 10px top;
              background-repeat: no-repeat;
              background-size: auto 20px;
                .moduleDataTitle {
                  color: #FFFFFF;
                  margin-left: 35px;
                  width: 100%;
                }
            }
        }
        .acdountItemfont{
          // border: 1px solid #000;
          margin: 15px;
          padding: 15px;
          background: #393588;
          border-radius: 5px;
          // height: 100%;
          .top{
              margin-top: 4%;
              display: flex;
              justify-content:center;
              align-items:center;
              .downItem{            
                cursor:pointer;
                &.userFrom{
                  width: 110px;
                  height: 110px;
                  border-radius: 50%;
                  // border: 1px solid #000;
                  .oneOrderBgIcon {
                    background-image: url("../../../../assets/images/page-design/Report/icon-UserSys.png");
                    background-position: center 35%;
                    background-repeat: no-repeat;
                    // background-size: auto 50px;
                    width: 100%;
                    height: 100%;
                    .oneOrderTitle {
                      padding-top: 110px;
                      padding-left: 40px;
                    }
                  }
                }
                &.resources{
                  width: 110px;
                  height: 110px;
                  border-radius: 50%;
                  // border: 1px solid #000;
                  .oneOrderBgIcon {
                    background-image: url("../../../../assets/images/page-design/Report/icon-resources.png");
                    background-position: center 35%;
                    background-repeat: no-repeat;
                    // background-size: auto 50px;
                    width: 100%;
                    height: 100%;
                    .oneOrderTitle {
                      padding-top: 110px;
                      padding-left: 20px;
                    }
                  }
                }
              }
            .centerBoxItem-ArrowItem {
              // display: flex;
              height: 16px;
              width: 30%;
              // margin: 10px;
              background-image: url("../../../../assets/images/page-design/Report/icon-toparrow.png");
              background-position: left top;
              background-repeat: no-repeat;
              background-size: auto 16px;
              &.arrowMargin {
                margin-top: 200px;
              }
            }
          }
          .centerdata{
            display: flex;
            justify-content:center;
            align-items:center;
            height: 160px;
            // border: 1px solid white;
            .centerBoxItem-left{
              height: 160px;
              width: 17%;
              // margin: 10px;
              // background: chartreuse;
              background-image: url("../../../../assets/images/page-design/Report/icon-leftarrow.png");
              background-position: left top;
              background-repeat: no-repeat;
              // background-size: auto 16px;
              
            }
            .centerBoxItem-right{
              height: 160px;
              width: 17%;
              background-image: url("../../../../assets/images/page-design/Report/icon-rigntarrow.png");
              background-position: right top;
              background-repeat: no-repeat;
              // background-size: auto 16px;
             
            }
          }
          .bottomdata{
            display: flex;
            justify-content:center;
            align-items:center;
            margin-bottom: 5%;
            .downItem{
                cursor:pointer;
                &.role{
                  width: 110px;
                  height: 110px;
                  border-radius: 50%;
                  // border: 1px solid #000;
                  .oneOrderBgIcon {
                    background-image: url("../../../../assets/images/page-design/Report/icon-role.png");
                    background-position: center 35%;
                    background-repeat: no-repeat;
                    // background-size: auto 50px;
                    width: 100%;
                    height: 100%;
                    .oneOrderTitle {
                      padding-top: 110px;
                      padding-left: 40px;
                    }
                  }
                }
              }
          }
        }
      }
        &.right{
          width: 50%;
          margin: 15px;
          // border: 1px solid red;
          .acdountItem{
            padding-left: 1px;
            padding-top: 10px;
            margin: 15px;
            // border: 1px solid #000;
              .moduleDataTitleBg{
                // background-image: url("../../../../assets/images/page-design/Report/icon-keySys.png");
                // background-position: 10px top;
                // background-repeat: no-repeat;
                // background-size: auto 20px;
                  .moduleDataTitle {
                    color: #FFFFFF;
                    margin-left: 35px;
                    width: 100%;
                  }
              }
          }
          .acdountItemfont{
            margin: 15px;
            // border: 1px solid red;
            display: flex;
            flex-direction:column;
            .topdata{
              margin:0px 7% 15px 9%;
              background: #3E3692;
              border-radius: 5px;
              .downItem{
                cursor:pointer;
                width: 100%;
                height: 135px;
                border-radius: 50%;
                display: -webkit-box;
                display: flex;
                flex-direction:row;
                justify-content:center;
                align-items:center;
                // flex-direction:row;
                // justify-content:center;
                .oneOrderBgIcon{
                  height: 100%;
                  width: 31%;
                  margin: 10px;
                  background-image: url("../../../../assets/images/page-design/Report/icon-DocumentRules.png");
                  background-position: left ;
                  background-repeat: no-repeat;
                  // background-size: auto 16px;
                }
                .oneOrderTitle{

                }
              }
            }
             .centerdata{
              margin:15px 7% 15px 9%;
              background: #3E3692;
              border-radius: 5px;
              .downItem{
                cursor:pointer;
                width: 100%;
                height: 135px;
                border-radius: 50%;
                display: -webkit-box;
                display: flex;
                flex-direction:row;
                justify-content:center;
                align-items:center;
                .oneOrderBgIcon{
                  height: 100%;
                  width: 30%;
                  margin: 10px;
                  background-image: url("../../../../assets/images/page-design/Report/icon-DataDictionary.png");
                  background-position: left ;
                  background-repeat: no-repeat;
                }
                .oneOrderTitle{
                  // padding-left: 2%;
                }
              }
            }
             .bottomdata{
              margin:15px 7% 15px 9%;
              background: #3E3692;
              .downItem{
                cursor:pointer;
                width: 100%;
                height: 135px;
                border-radius: 50%;
                display: -webkit-box;
                display: flex;
                flex-direction:row;
                justify-content:center;
                align-items:center;
                .oneOrderBgIcon{
                  height: 100%;
                  width: 34%;
                  margin: 10px;
                  background-image: url("../../../../assets/images/page-design/Report/icon-SysParameter.png");
                  background-position: left ;
                  background-repeat: no-repeat;
                }
                .oneOrderTitle{
                  margin-right: 2%;
                }
              }
            }
          }
        }
      }
    }
}
</style>
