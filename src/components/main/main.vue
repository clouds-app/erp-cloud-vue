<template>
  <div class="masterContainer">
    <div class="header">
      <div
        v-show="currentSelected === '' || currentSelected === 'Home'"
        class="info"
      >
        <div class="header info leftItem">
          <div class="compInfo">{{ companyInfo }} (单位代码: {{companyCode}}) <span @click="shareLinkEvent()" :data-clipboard-text="shareLink" class="shareLink">分享链接</span></div>
          <div class="expiryDateInfo">
            <span>到期时间:{{ expireDate }}</span>
            <span class="renewalNow">立即续费>></span>
          </div>
        </div>
        <div class="header info centerItem"></div>
        <div class="header info rightItemBox">
          <div class="rightItemSubItem contactService">
            <Badge dot>
              联系客服
            </Badge>
          </div>
          <div
            class="rightItemSubItem topLoginUserInfoBox"
            @mouseenter="handleMouseenter"
            @mouseleave="handleMouseleave"
          >
            <div class="topLoginUserInfoItem">
              <Icon type="md-contact" size="26" color="#fff" />
            </div>
            <div class="topLoginUserInfoItem">
              <div class="userDesc">{{ userName }}</div>
            </div>
            <ul v-show="currentVisibleLogout" class="toplogoutInfoBox">
              <li @click="openOperationLink()" class="toplogoutInfoItem">操作说明</li>
              <li @click="resetPassword()" class="toplogoutInfoItem">
                重置密码
              </li>
              <li @click="logout()" class="toplogoutInfoItem">退出</li>
            
            </ul>
          </div>
        </div>
      </div>
      <div
        :style="
          `margin-top:${
            currentSelected === '' || currentSelected === 'Home' ? 54 : 0
          }px`
        "
        class="menuBox"
      >
        <div
          @click="turnToHome()"
          v-show="currentSelected !== '' && currentSelected !== 'Home'"
          class="menuItem logoItem"
        >
          <div class="LogoIcon"></div>
        </div>
        <div
          :class="{
            activeMenu: currentSelected === '' || currentSelected === 'Home'
          }"
          @click="turnToHome()"
          class="menuItem"
        >
          <div class="menuText homeIcon">用户首页</div>
        </div>
        <div
          :class="{ activeMenu: currentSelected === 'Sale' }"
          @click="clickTopMenu('Sale')"
          class="menuItem"
        >
          <div class="menuText saleIcon">销售管理</div>
        </div>
        <div
          :class="{ activeMenu: currentSelected === 'Purchase' }"
          @click="clickTopMenu('Purchase')"
          class="menuItem"
        >
          <div class="menuText purchaseIcon">采购管理</div>
        </div>
        <div
          :class="{ activeMenu: currentSelected === 'Mrp' }"
          @click="clickTopMenu('Mrp')"
          class="menuItem"
        >
          <div class="menuText mrpIcon">生产管理</div>
        </div>
        <div
          :class="{ activeMenu: currentSelected === 'Stock' }"
          @click="clickTopMenu('Stock')"
          class="menuItem"
        >
          <div class="menuText stockIcon">仓储管理</div>
        </div>
        <div
          :class="{ activeMenu: currentSelected === 'Account' }"
          @click="clickTopMenu('Account')"
          class="menuItem"
        >
          <div class="menuText accountIcon">财务管理</div>
        </div>
        <div
          :class="{ activeMenu: currentSelected === 'Report' }"
          @click="clickTopMenu('Report')"
          class="menuItem"
        >
          <div class="menuText reportIcon">报表管理</div>
        </div>
        <div
          :class="{ activeMenu: currentSelected === 'Bas' }"
          @click="clickTopMenu('Bas')"
          class="menuItem"
        >
          <div class="menuText basIcon">基础数据</div>
        </div>
        <div
          :class="{ activeMenu: currentSelected === 'Sys' }"
          @click="clickTopMenu('Sys')"
          class="menuItem"
        >
          <div class="menuText sysIcon">系统设置</div>
        </div>
        <div
          :class="{ activeMenu: currentSelected === 'SetPlatform' }"
          @click="(showmodel = true), (SetPlatformpassword = '')"
          class="menuItem"
        >
          <div class="menuText sysIcon">平台设置</div>
        </div>
        <div
          v-show="currentSelected !== '' && currentSelected !== 'Home'"
          class="menuItem"
        >
          <div
            class="loginUserInfoBox"
            @mouseenter="handleMouseenter"
            @mouseleave="handleMouseleave"
          >
            <div class="loginUserInfoItem">
              <Icon type="md-contact" size="26" color="#fff" />
            </div>
            <div class="loginUserInfoItem">
              <div class="userDesc">{{ userName }}</div>
            </div>
            <ul v-show="currentVisibleLogout" class="logoutInfoBox">
              <li @click="openOperationLink()" class="logoutInfoItem">操作说明</li>
              <li @click="resetPassword()" class="logoutInfoItem">重置密码</li>
              <li @click="logout()" class="logoutInfoItem">退出</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <keep-alive>
      <router-view />
    </keep-alive>
    <Modal
      title="请输入密码"
      v-model="showmodel"
      @on-ok="checkmodeal"
      @on-cancel="showmodel = false"
    >
      <Input
        v-model="SetPlatformpassword"
        type="password"
        password
        placeholder="请输入密码"
        style="width: 100%"
      />
    </Modal>
    <Modal
      @on-cancel="cancelResetPassword"
      v-model="showResetPassword"
      width="360"
    >
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>重置密码?</span>
      </p>
      <div class="resetPasswordBox">
        <Form
          ref="formResetPassword"
          :model="formResetPassword"
          :rules="ruleFormResetPassword"
        >
          <FormItem prop="userCode">
            <Input
              size="default"
              type="text"
              disabled
              :value="formResetPassword.userCode"
              placeholder="用户名称"
            >
              <Icon
                color="#000"
                :size="25"
                type="ios-person-outline"
                slot="prepend"
              ></Icon>
            </Input>
          </FormItem>
          <FormItem prop="oldPassword">
            <Input
              size="default"
              type="password"
              v-model="formResetPassword.oldPassword"
              placeholder="旧密码"
            >
              <Icon
                color="#000"
                :size="25"
                type="ios-lock-outline"
                slot="prepend"
              ></Icon>
            </Input>
          </FormItem>
          <FormItem prop="newPassword">
            <Input
              size="default"
              type="password"
              v-model="formResetPassword.newPassword"
              placeholder="新密码"
            >
              <Icon
                color="#000"
                :size="25"
                type="ios-lock-outline"
                slot="prepend"
              ></Icon>
            </Input>
          </FormItem>
          <FormItem prop="comfirmPassword">
            <Input
              size="default"
              type="password"
              v-model="formResetPassword.comfirmPassword"
              placeholder="确认密码"
            >
              <Icon
                color="#000"
                :size="25"
                type="ios-lock-outline"
                slot="prepend"
              ></Icon>
            </Input>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long @click="submitResetPassword()"
          >确定</Button
        >
      </div>
    </Modal>
  </div>
</template>
<script>
import Clipboard from 'clipboard'
import { passwordEncrypt } from "@/libs/password";
import dayjs from "dayjs";
import { getlocalStorage, setToken } from "@/libs/util";
import request from "@/libs/request";
import baseMixin from "@/mixins";
export default {
  name: "Main",
  mixins: [baseMixin],
  computed: {
    // 默认 选中菜单
    currentSelected() {
      let pageName = this.$store.state.app.currentTopMenu;
      return pageName;
    }
  },
  data() {
    const validatePassCheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("确认密码必填!"));
      } else if (value != this.formResetPassword.newPassword) {
        callback(new Error("新密码与确认密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      shareLink:'',//分享链接
      formResetPassword: {
        userCode: "",
        oldPassword: "",
        newPassword: "",
        comfirmPassword: ""
      },
      ruleFormResetPassword: {
        oldPassword: [
          { required: true, message: "旧密码必填!", trigger: "blur" }
        ],
        newPassword: [
          { required: true, message: "新密码必填!", trigger: "blur" },
          {
            type: "string",
            min: 6,
            message: "密码至少长度为6位!",
            trigger: "blur"
          }
        ],
        comfirmPassword: [{ validator: validatePassCheck, trigger: "blur" }]
      },
      showResetPassword: false, // 是否显示重置密码弹框
      currentVisibleLogout: false, // 是否显示登出信息
      showmodel: false,
      SetPlatformpassword: "",
      userCode: "",
      companyCode:'',// 公司代码
      appTopMenuList: null,
      currentMouseOver: "", // 默认经过菜单 sale
      isSelected: false,
      showmodal: false,
      password: "",
      LoginUserInfo: null
    };
  },
  computed: {
    companyInfo() {
      // debugger
      // "useTipsModel":{"companyName":"新晃县自强纸业有限责任公司","expire":false,"expireTime":"2021-07-01T16:27:14","tips":false},
      let companyName =
        this.LoginUserInfo && this.LoginUserInfo.useTipsModel.companyName;
      if (companyName) {
        return companyName;
      } else {
        //  this.errLogout()
        return "";
      }
    },
    expireDate() {
      let expireTime =
        this.LoginUserInfo && this.LoginUserInfo.useTipsModel.expireTime;
      if (expireTime) {
        return dayjs(expireTime).format("YYYY-MM-DD");
      } else {
        //  this.errLogout()
        return "";
      }
    },
    userName() {
      let userName = this.LoginUserInfo && this.LoginUserInfo.userName;
      if (userName) {
        return userName;
      } else {
        // this.errLogout()
        return "";
      }
    }
  },
  watch: {},
  created() {
    this.getTopMenu();
    let obj = JSON.parse(getlocalStorage("information"));
    this.LoginUserInfo = JSON.parse(getlocalStorage("loginUserInfo"));
    this.userCode = obj.userCode;
    this.formResetPassword.userCode = this.LoginUserInfo.userCode;
    this.companyCode = this.LoginUserInfo.useTipsModel.code;
  },
  methods: {
    // 分享链接
    shareLinkEvent(){
      this.shareLink = ''
      var clipboard = new Clipboard('.shareLink');
      clipboard.on('success', function(e) {
          console.info('Action:', e.action);
          console.info('Text:', e.text);
          console.info('Trigger:', e.trigger);

          e.clearSelection();
      });
      this.shareLink = `http://erp.szclsoft.com/#/login?companyCode=${this.companyCode}`
      this.$Message.info('链接已复制,可以分享给朋友了!')
    },
    // 打开操作说明
    openOperationLink(){
      let _url = 'https://docs.qq.com/doc/DZklRckptTHhJd0NG?pub=1&dver=2.1.0'
      window.open(_url,"_blank"); 
    },
    // 关闭重置密码弹框
    cancelResetPassword() {
      this.$refs["formResetPassword"].resetFields();
      this.showResetPassword = false;
    },
    // 确认重置密码
    submitResetPassword() {
      this.$refs["formResetPassword"].validate(valid => {
        if (valid) {
          let _url = `/sys/user/resetPwd`;
          let md5Pwd = passwordEncrypt(
            this.LoginUserInfo.userCode,
            this.formResetPassword.oldPassword
          );
          let params = {
            userCode: this.LoginUserInfo.userCode, //(用户编号),
            companyId: this.LoginUserInfo.companyId, //(单位id),
            oldPwd: md5Pwd, //(旧密码),
            passWord: this.formResetPassword.newPassword, //(新密码)
            surePwd: this.formResetPassword.comfirmPassword //(确认密码),
          };
          request.post(_url, params).then(res => {
            this.showResetPassword = false;
            this.$Message.success("重置成功,请重新登陆!");
            setTimeout(() => {
                setToken("");
                localStorage.clear();
                window.location.reload(); // 改用刷新页面清空其它vuex缓存
            }, 1000);
          });
        }
      });
    },
    handleMouseenter() {
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.currentVisibleLogout = true;
      }, 250);
    },
    handleMouseleave() {
      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.currentVisibleLogout = false;
        }, 150);
      }
    },
    // SetPlatform
    checkmodeal() {
      if (this.SetPlatformpassword == "clsoft") {
        this.turnToPage("SetPlatform");
      } else {
        this.SetPlatformpassword = "";
        this.$Message.error("密码错误请重新输入");
      }
    },
    errLogout() {
      setToken("");
      localStorage.clear();
      window.location.reload(); // 改用刷新页面清空其它vuex缓存
    },
    // 重置密码
    resetPassword() {
      this.showResetPassword = true;
    },
    logout() {
      let LoginUserInfo
      let companyCode
       try {
         LoginUserInfo = JSON.parse(getlocalStorage("loginUserInfo"));
         companyCode = LoginUserInfo.useTipsModel.code;
      } catch (error) {
        
      }
      this.$Modal.confirm({
        title: "提示",
        content: `确定退出登陆吗？`,
        onOk: () => {
          this.$store.state.app.currentSubMenu;
          for (let i in this.$store.state.app.currentSubMenu) {
            this.$store.state.app.currentSubMenu[i] = [];
          }
          this.showmodal = false;
          this.userCode = "";
          setToken("");
          localStorage.clear();
          let rediretUrl ='http://'+window.location.host+'/#/login'
          if(!!companyCode){
            rediretUrl =  `#/login?companyCode=${companyCode}`;
          }else{
            rediretUrl = "#/login";
          }
          window.history.pushState(null,null,rediretUrl);
          window.location.reload(); // 改用刷新页面清空其它vuex缓存
        }
      });
    },
    turnToHome() {
      if (this.currentCurrentPage != "home") {
        this.setGoHome();
      }
    },
    // 获取一级顶部菜单
    getTopMenu() {
      let _url = `/sys/resource/top-level-resource`;
      request.get(_url, {}).then(res => {
        this.appTopMenuList = res;
      });
    },
    cancel() {
      this.showmodal = false;
      this.password = "";
    },
    // 访问前权限检查
    checkRightBeforeAccess(type) {
      let flag = true;
      if(!!!this.appTopMenuList || this.appTopMenuList.length==0){
        this.getTopMenu()
        return
      }
      let moduleItem = this.appTopMenuList.filter(item => {
        return item.routerUrl == type;
      });
      if (
        !!moduleItem &&
        Array.isArray(moduleItem) &&
        moduleItem.length > 0 &&
        !moduleItem[0].disabled
      ) {
        flag = false;
        this.$store.commit("setTopMenuResourceId", moduleItem[0].id);
      }
      return flag;
    },
    // 选中菜单
    clickTopMenu(val) {
      if (this.checkRightBeforeAccess(val)) {
        this.$Message.warning("暂无权限,请与管理员联系!");
        return;
      }
      this.setSecondaryauthority(val);
    },
    turnToPage(val) {
      this.$store.commit("setCurrentTopMenu", val);
      if (this.currentCurrentPage != "main") {
        this.$store.commit("setCurrentPage", "main");
        this.$router.push({ name: "main", params: { menuType: val } });
      }
    },
    // 拿二级菜单权限
    setSecondaryauthority(val) {
      //debugger
      let topMenuResourceId = this.$store.state.app.topMenuResourceId;
      let _url = `/sys/resource/sub-resource?resourceId=${topMenuResourceId}`;
      request
        .get(_url, {})
        .then(res => {
          // debugger
          let dataList = this.formatval(res);
          this.$store.commit("setSecondaryauthority", { dataList, val }); // 将该二级菜单下的二级菜单权限存储到vuex中
          // 拿到该模块的二级菜单权限
          this.turnToPage(val);
        })
        .catch(err => {
          //this.$Message.error(err);
        });
    },
    // 格式化二级菜单权限
    formatval(data) {
     // debugger
      let custom = {};
      for (let val of data) {
        let item = {};
        let keydata = val.routerUrl;
        custom[keydata] = { val };
      }
      
      return custom;
    }
  }
};
</script>
<style lang="scss">
$master-background-color: #2c0f86;
.shareLink{
  margin-left:10px;
  cursor: pointer;
}
.masterContainer {
  height: 1000px;
  overflow: auto;
  background-color: #2c0f86;
  .header {
    display: -webkit-flex; /* Safari */
    display: flex;
    flex-direction: row;
    //border: 1px #ccc solid;
    .info {
      height: 65px;
      // 共用数据
      &.leftItem {
        position: absolute;
        top: 0px;
        left: 0px;
        color: white;
        font-size: 12px;
        display: flex;
        flex-direction: column;
        width: 36%;
        z-index: 3;
        padding: 5px 15px;
        background-image: url("../../assets/images/page-design/master-page/header-left-bg-all.png");
        background-position: left top;
        background-repeat: no-repeat;
        background-size: 98% 44px;
        .compInfo {
          //margin-left: 10px;
        }
        .renewalNow {
          margin-left: 20px;
        }
      }
      &.centerItem {
        position: absolute;
        top: 0px;
        left: 33.33%;
        z-index: 1;
        display: flex;
        width: 33.33%;
        background-image: url("../../assets/images/page-design/master-page/logo.png"),
          url("../../assets/images/page-design/master-page/header-center-bg-all.png");
        background-repeat: no-repeat, no-repeat;
        background-position: center 25%, right top;
        background-size: auto 33px, 99% 75px;
        width: 33%; // 必须添加宽度
      }
      &.rightItemBox {
        position: absolute;
        top: 0px;
        right: 0px;
        display: flex;
        width: 36%;
        color: white;
        //padding: 10px 105px;
        font-size: 12px;
        z-index: 3;
        background-image: url("../../assets/images/page-design/master-page/header-right-bg-all.png");
        background-position: right top;
        background-repeat: no-repeat;
        background-size: 98% 44px;
        .rightItemSubItem {
          // border: 1px solid red;
          width: 220px;
          height: 45px;
          &.contactService {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 280px;
          }
          &.topLoginUserInfoBox {
            display: flex;
            align-items: center;
            position: relative;
            cursor: pointer;
            .topLoginUserInfoItem {
              .userDesc {
                margin-left: 2px;
                margin-top: 5px;
                font-size: 12px;
                color: white;
              }
            }
            .toplogoutInfoBox {
              list-style: none;
              color: black;
              //background: white;
              position: absolute;
              top: 0;
              left: 0;
              margin-top: 40px;
              margin-left: 30px;
              // border:1px solid red;
              .toplogoutInfoItem {
                background: white;
                width: 80px;
                height: 30px;
                text-align: center;
                line-height: 2.5em;
                border-bottom: 1px dotted #ccc;
                border-radius: 5px;
                &:hover {
                  color: black;
                  background: #ccc;
                }
              }
            }
          }
        }

        .systemConfig {
          margin-top: 14px;
          width: 100px;
          background-image: url("../../assets/images/page-design/master-page//btn-icon-sys.png");
          //background-position: 10% 47%; // 图表控制偏移
          background-repeat: no-repeat;
          background-size: auto 16px; // 菜单背景图大小
          margin-left: 80px;
        }
      }
    }
    .menuBox {
      //菜单总信息
      display: -webkit-flex; /* Safari */
      display: flex;
      flex-direction: row;
      justify-content: center;
      width: 100%;
      cursor: pointer;
      //border: 1px yellow solid;
      //margin-top: 54px;
      //margin-left: 102px;
      .menuItem {
        //border:1px solid red;
        // 菜单共用信息
        width: 110px;
        height: 50px;
        margin-left: 5px;
        &.logoItem {
          width: 120px;
        }
        &.activeMenu {
          //width: 110px;
          // border: 1px solid blue;
          // 选中时的背景颜色
          background-image: url("../../assets/images/page-design/master-page/bg-menu.png");
          background-repeat: no-repeat;
          background-position: 42% 47%; // 图表控制偏移
          background-size: auto 38px; // 菜单背景图大小
        }
        .loginUserInfoBox {
          font-size: 12px;
          position: relative;
          //height: 60px;
          margin-top: 12px;
          // border:1px solid red;
          display: flex;
          flex-direction: row;
          .loginUserInfoItem {
            .userDesc {
              margin-left: 2px;
              margin-top: 5px;

              color: white;
            }
          }
        }
        .logoutInfoBox {
          color: black;
          list-style: none;
          position: absolute;
          left: 0;
          top: 0;
          z-index: 10;
          border-radius: 5px;
          margin-top: 30px;
          margin-left: 30px;
          .logoutInfoItem {
            border-radius: 5px;
            background: white;
            width: 80px;
            height: 30px;
            text-align: center;
            line-height: 2.5em;
            border-bottom: 1px dotted #ccc;
            &:hover {
              color: black;
              background: #ccc;
            }
          }
        }
      }
      .menuText {
        font-size: 0.8rem;
        // 菜单文字 控制 大小 颜色 偏移等属性
        width: 100%;
        padding: 15px 26px; // 字体偏移
        color: white;
        margin-left: 8px; // 图片字体一起 整体偏移
        &.homeIcon {
          // 首页模块 的主菜单ICON 图表
          background-image: url("../../assets/images/page-design/master-page/btn-icon-home.png");
          background-position: 8% 47%; // 图表控制偏移
          background-repeat: no-repeat;
          background-size: auto 16px; // 菜单背景图大小
        }
        &.saleIcon {
          // 发售模块 的主菜单ICON 图表
          background-image: url("../../assets/images/page-design/master-page/btn-icon-sale.png");
          background-position: 8% 47%; // 图表控制偏移
          background-repeat: no-repeat;
          background-size: auto 16px; // 菜单背景图大小
        }
        &.purchaseIcon {
          // 采购模块 的主菜单ICON 图表
          background-image: url("../../assets/images/page-design/master-page/btn-icon-purchase.png");
          background-position: 8% 47%; // 图表控制偏移
          background-repeat: no-repeat;
          background-size: auto 16px; // 菜单背景图大小
        }
        &.mrpIcon {
          // 采购模块 的主菜单ICON 图表
          background-image: url("../../assets/images/page-design/master-page/btn-icon-mrp.png");
          background-position: 8% 47%; // 图表控制偏移
          background-repeat: no-repeat;
          background-size: auto 16px; // 菜单背景图大小
        }
        &.stockIcon {
          // 仓储模块 的主菜单ICON 图表
          background-image: url("../../assets/images/page-design/master-page/btn-icon-stock.png");
          background-position: 8% 47%; // 图表控制偏移
          background-repeat: no-repeat;
          background-size: auto 16px; // 菜单背景图大小
        }
        &.accountIcon {
          // 财务模块 的主菜单ICON 图表
          background-image: url("../../assets/images/page-design/master-page/btn-icon-account.png");
          background-position: 8% 47%; // 图表控制偏移
          background-repeat: no-repeat;
          background-size: auto 16px; // 菜单背景图大小
        }
        &.reportIcon {
          // 财务模块 的主菜单ICON 图表
          background-image: url("../../assets/images/page-design/master-page/btn-icon-report.png");
          background-position: 8% 47%; // 图表控制偏移
          background-repeat: no-repeat;
          background-size: auto 16px; // 菜单背景图大小
        }
        &.basIcon {
          // 财务模块 的主菜单ICON 图表
          background-image: url("../../assets/images/page-design/master-page/btn-icon-bas.png");
          background-position: 8% 47%; // 图表控制偏移
          background-repeat: no-repeat;
          background-size: auto 16px; // 菜单背景图大小
        }
        &.sysIcon {
          // 财务模块 的主菜单ICON 图表
          background-image: url("../../assets/images/page-design/master-page/btn-icon-sys.png");
          background-position: 8% 47%; // 图表控制偏移
          background-repeat: no-repeat;
          background-size: auto 16px; // 菜单背景图大小
        }
      }
    }
  }
  .LogoIcon {
    width: 100%;
    padding: 18px 36px; // 字体偏移
    color: white;
    background-image: url("../../assets/images/page-design/master-page/logo.png");
    background-position: left bottom; // 图表控制偏移
    background-repeat: no-repeat;
    background-size: auto 25px; // 菜单背景图大小
  }
  .bodyContent {
    //border: 1px red solid;
    //height: calc(100% - 100px);
    .orderCardInfoBox {
      display: -webkit-flex; /* Safari */
      display: flex;
      flex-direction: row;
      justify-content: center;
      .orderCardItem {
        width: 290px;
        height: 120px;
        border-radius: 5px;
        margin-top: 10px;
        &.orderCardInfo {
          background: linear-gradient(
            90deg,
            rgba(132, 60, 246, 1),
            rgba(117, 155, 255, 1)
          );
        }
        &.saleCardInfo {
          background: linear-gradient(
            90deg,
            rgba(252, 82, 134, 1),
            rgba(251, 170, 162, 1)
          );
          margin-left: 21px;
        }
        &.purchaseCardInfo {
          background: linear-gradient(
            90deg,
            rgba(255, 118, 59, 1),
            rgba(255, 196, 128, 1)
          );
          margin-left: 21px;
        }
        &.stockCardInfo {
          background: linear-gradient(
            90deg,
            rgba(14, 76, 253, 1),
            rgba(106, 142, 255, 1)
          );
          margin-left: 21px;
        }
        .cardFlexBox {
          display: flex;
          width: 100%;
          .cardFlexItem {
            width: 50%;
            &.cardLeft {
              color: white;
              padding: 6% 10%;
              .cardIcon {
                padding: 10px 0;
                width: 50px;
                //height: auto;
              }
            }
            &.cardRight {
              color: white;
              padding: 10% 5%;
              font-size: 16px;
              .cardMoney {
                font-weight: bold;
              }
              .cardArea {
                font-weight: bold;
                margin-top: 10px;
              }
            }
          }
        }
      }
    }
    .echartInfoBox {
      display: -webkit-flex; /* Safari */
      display: flex;
      flex-direction: row;
      margin-top: 10px;
      justify-content: center;
      .echartItem {
        // 共用数据
        &.leftEchartIcon {
          position: relative;
          width: 470px;
          height: 250px;
          background-image: url("../../assets/images/page-design/master-page/leftEchartIcon-bg.png");
          background-position: left top;
          background-repeat: no-repeat;
          background-size: 470px 250px;
          // background-image: url('../../assets/images/page-design/master-page/echart-icon-pro-wast.png'),url('../../assets/images/page-design/master-page/leftEchartIcon-bg.png');
          // background-position: 40% center,left top;
          // background-repeat: no-repeat,no-repeat;
          // background-size:auto 230px,470px 250px;
        }
        &.compassIconConfig {
          //margin-left: 10%;
          width: 228;
          height: 101px;
          .compassTitle {
            color: white;
            margin-left: 40%;
          }
        }
        .compassIcon {
          padding: 5px;
          // margin-left: 20px;
          width: 265px;
        }
        &.rightEchartIcon {
          position: relative;
          width: 470px;
          height: 250px;
          //margin-left: 10%;
          background-image: url("../../assets/images/page-design/master-page/rightEchartIcon.png");
          background-position: left top;
          background-repeat: no-repeat;
          background-size: 470px 250px;
          // background-image: url('../../assets/images/page-design/master-page/echart-icon-stockSum.png'),url('../../assets/images/page-design/master-page/rightEchartIcon.png');
          // background-position: 40% center,left top;
          // background-repeat: no-repeat,no-repeat;
          // background-size:auto 230px,470px 250px;
          .stockStatisticsOtherInfo {
            // position: absolute;
            // left: 0;
            // top: 0;
            // z-index: 9999;
            // height: 100px;
            // width: 100px;
            // border:1px solid red;
          }
        }
      }
    }
    .echartOtherInfoBox {
      display: -webkit-flex; /* Safari */
      display: flex;
      flex-direction: row;
      margin-top: 10px;
      justify-content: center;
      .echartOtherItem {
        width: 290px;
        height: 250px;
        background-image: url("../../assets/images/page-design/master-page/centerEchartIcon-bg.png");
        background-position: left top;
        background-repeat: no-repeat;
        background-size: 290px 250px; // 大小必须和上面的宽度设置范围内
        &.echartOtherConfig-one {
          //  margin-left: 20px;
          // background-image: url('../../assets/images/page-design/master-page/echart-icon-sale.png'),url('../../assets/images/page-design/master-page/centerEchartIcon-bg.png');
          // background-position: center center,left top;
          // background-repeat: no-repeat,no-repeat;
          // background-size:auto 230px,290px 250px;  // 大小必须和上面的宽度设置范围内
        }
        &.echartOtherConfig-two {
          margin-left: 20px;
          //   background-image: url('../../assets/images/page-design/master-page/echart-icon-productsx.png'),url('../../assets/images/page-design/master-page/centerEchartIcon-bg.png');
          // background-position: center center,left top;
          // background-repeat: no-repeat,no-repeat;
          // background-size:auto 230px,290px 250px;  // 大小必须和上面的宽度设置范围内
        }
        &.echartOtherConfig-three {
          margin-left: 20px;
          // background-image: url('../../assets/images/page-design/master-page/echart-icon-jxzb.png'),url('../../assets/images/page-design/master-page/centerEchartIcon-bg.png');
          // background-position: center center,left top;
          // background-repeat: no-repeat,no-repeat;
          // background-size:auto 230px,290px 250px;  // 大小必须和上面的宽度设置范围内
        }
        &.echartOtherConfig-four {
          position: relative;
          margin-left: 20px;
          //    background-image: url('../../assets/images/page-design/master-page/echart-icon-equiment.png'),url('../../assets/images/page-design/master-page/centerEchartIcon-bg.png');
          // background-position: center 15%,left top;
          // background-repeat: no-repeat,no-repeat;
          // background-size:auto 180px,290px 250px;  // 大小必须和上面的宽度设置范围内
        }
        // 设备运转率 暂未开通 遮罩层
        .gaugeEquipmentOperationRateMask {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          //border:1px solid red;
          background: #ccc;
          opacity: 0.7;
          //border-radius: 15px;
          .maskDescDiv {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            .maskDesc {
              color: black;
              font-size: 20px;
              font-weight: bold;
            }
          }
        }
      }
    }
  }
}

//以下实例在屏幕可视窗口尺寸小于 1000px 像素时将执行
@media screen and (max-width: 1000px) {
  //   .functionTitle{
       
  //     display: none;
  //   }
  //  .commonButtonListBox .commonButtonListItem{
  //       min-width: 30px;
  //   }
}
</style>
