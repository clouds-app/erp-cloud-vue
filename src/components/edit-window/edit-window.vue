<template>
  <div>
     <transition>
            <div v-if="show" class="modalMask_editWindow"></div>
     </transition>
<Modal
      :transfer="true"
      :draggable="!fullscreen && draggable"
      :z-index="zindex"
      :styles="{top: fullscreen?'0':'45px'}"
      v-model="show"
      :mask-closable="maskClosable"
      class="edit-window"
      :scrollable="scrollable"
      :fullscreen="fullscreen"
      :title="title"
      @on-ok="onOk"
      @on-cancel="onCancel"
      @on-visible-change="onVisibleChange"
      :width="windowOffsetWidth">
      <p slot="header">
      <Icon type="md-help-circle" style="color:#2D8CF0" @click="IconClick" size='18'/>
      <span style="margin-left:10px">{{title}}</span>
    </p>
    <div>
       <Spin size="large" fix v-if="loading"></Spin>
    </div>
    <slot :detailDisabled="detailDisabled" ref="windowContent"></slot>
    <div slot="footer">
       <div class="footerBox">
         <div :class="showNextDetailBtn?'footerItem left':'footerItem zero'" >
            <div  v-show="showNextDetailBtn">
                <ButtonGroup>
                  <Button :loading="loaddingPreOrNextDetail" @click="preRowDetail()"  type="info">
                      <Icon type="ios-arrow-back" />
                      上一条
                  </Button>
                  <Button :loading="loaddingPreOrNextDetail"  @click="nextRowDetail()"  type="success">
                      下一条
                      <Icon type="ios-arrow-forward" />
                  </Button>
              </ButtonGroup>
            </div>
           
         </div>
        <div :class="showPageConfig ?'footerItem left':'footerItem zero'" >
            <div  v-if="showPageConfig">
              
                <Row type="flex">
                    <Col span="3"> <Button type="text">{{pageConfig.pageNum}} / {{totoalPage}}</Button> </Col>
                  <Col span="3">  <Button :disabled="pageConfig.pageNum==totoalPage || pageConfig.pageNum>totoalPage" @click="pageOnChange" type="text">更多>></Button></Col>
                </Row>
               
            </div>
         </div>
         <div class="footerItem right">
             <slot name="footer">
              <div>
                  <Button v-if="customerActionBtnText!=''" type="success"  @click="onCustomerAction">{{customerActionBtnText}}</Button>
                  <Button v-if="$parent.detailDisabled" type="error" @click="detailToUpdate()" :disabled="!$parent.detailConvertUpdate">编辑</Button>
                  <Button v-show="showOkBtn" :disabled="disabledSubmitBtn" v-else :loading="loaddingBtn" type="primary" @click="onOk">
                      <Icon type="ios-arrow-down" />
                      确定
                </Button>
                  <Button @click="onCancel">
                    <Icon color="red" type="md-close" />
                      取消 (Esc)
                </Button>
              </div>
            </slot>
         </div>
       </div>
    </div>
  </Modal>
  </div>
  
</template>

<script>
export default {
  data () {
    return {
      windowOffsetWidth:'auto',//默认百分比,使用拖动后,原有宽度变为AUTO了,因此需要实际计算宽宽
      loadDetailTimer:null,
      loaddingPreOrNextDetail:false, // 是否加载数据中
      showNextDetailBtn:false,// 是否显示 上一条下一条 按钮
      show: false,
      html: '',
      modal9: false,
      // 分页配置
      pageConfig:{
        pageNum:1,//(当前页),
        pageSize:10,//(每页显示条数)
        total:1,// 总条数
      },
    }
  },
  props: {
       // 是否显示分页
    showPageConfig: {
      type: Boolean,
      default: false
    },
    zindex:{
       type:  Number,
      default: 2
    },
     // 是否可以拖拽
    draggable: {
      type: Boolean,
      default: true
    },
    // 是否禁用确认按钮
    disabledSubmitBtn: {
      type: Boolean,
      default: false
    },
    // 自定义方法名称
    customerActionBtnText: {
      type: String,
      default: ''
    },
    // 是否显示确认按钮
    showOkBtn: {
      type: Boolean,
      default: true
    },
    spinLoaddingText: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    },
    loaddingBtn: {
      type: Boolean,
      default: false
    },
    maskClosable: {
      type: Boolean,
      default: false
    },
    scrollable: {
      type: Boolean,
      default: true
    },
    fullscreen: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: '窗口'
    },
    value: {
      type: Boolean,
      default: false
    },
    width: {
      type: String | Number,
      default: 'auto'
    },
    lazyTime: {
      required: false,
      default: 0
    },
    detailDisabled: {// 详情禁用控件
      type: Boolean,
      default: false
    }
  },
  computed:{
    totoalPage(){
      let sumPage = Number(this.pageConfig.total)/ Number(this.pageConfig.pageSize)
      let leftPage = Number(this.pageConfig.total)% Number(this.pageConfig.pageSize)
      if(leftPage>0){
        sumPage= parseInt(sumPage)+1
      }
      return parseInt(sumPage)
    },
    // 当前操作类型,编辑/添加/详细 
     currentActionType(){
       return this.$store.state.app.currentActionType
     }
  },
  watch: {
    // 监控当前操作类型 是否 编辑/添加/详细  是否隐藏上一条/下一条
    currentActionType(n,o){
      if(!!n && n=='detail'){
         this.showNextDetailBtn = true
      }else{
         this.showNextDetailBtn = false
      }
     
    },
    show (n, o) {
      this.$emit('input', n)
      if(n){
          //计算窗体的实际占用宽带
          this.calculateActualWidth()
      }
      if(!!!n){
         this.$store.commit('setCurrentActionType','')
      }
    },
    value (n, o) {
      this.show = n
    },
    detailDisabled (n, o) {

    }
  },
  methods: {
    pageOnChange(item){
      this.pageConfig.pageNum++
      console.log('edit-window-pageOnChange:'+this.pageConfig.pageNum)
      this.$emit('pageOnChange',this.pageConfig.pageNum)
    },
    //NEW 计算窗体的实际占用宽带,使用拖拽后,窗体百分比无效,需要计算实际宽度
    calculateActualWidth(){
       this.$nextTick(()=>{
             if(this.width!='auto'){
                 let offsetWidth = document.body.offsetWidth
               // console.log('=====windowOffsetWidth===='+offsetWidth)
                let currentWidth = this.width+''
                currentWidth = Number(currentWidth.replace('%',''))
                if(currentWidth>0 && currentWidth<100){
                   this.windowOffsetWidth = currentWidth * (offsetWidth/100)
                }else{
                   this.windowOffsetWidth = currentWidth
                }
             }
        })
    },
    // 上一条 ROW详情 信息
    preRowDetail(){
      this.loaddingPreOrNextDetail = true;
      clearTimeout(this.loadDetailTimer)
      this.loadDetailTimer = setTimeout(()=>{
          this.$store.commit('setPreOrNextAction','pre')
          this.loaddingPreOrNextDetail = false;
      },1000)
     
    },
    // 下一条 ROW详情  信息
    nextRowDetail(){
      this.loaddingPreOrNextDetail = true;
        clearTimeout(this.loadDetailTimer)
      this.loadDetailTimer = setTimeout(()=>{
         this.$store.commit('setPreOrNextAction','next')
           this.loaddingPreOrNextDetail = false;
      },1000)
     
    },
    onVisibleChange (val) {
      this.$emit('onVisibleChange', val)
    },
    // 自定义方法
    onCustomerAction () {
      this.$emit('onCustomerAction')
    },
    IconClick () {
      // debugger
      window.open('https://docs.qq.com/doc/DZklRckptTHhJd0NG?pub=1&dver=2.1.0', '', 'left=0,top=0,width='+ (screen.availWidth - 10) +',height='+ (screen.availHeight-50) +',scrollbars,resizable=yes,toolbar=no')
      //  myWindow.focus();
    },
    onOk () {
      this.$emit('on-ok')
    },
    onCancel () {
      this.show = false
      this.disabledUpdate = true
      this.$emit('on-cancel')
    },
    detailToUpdate () {
      if (this.$parent.detailConvertUpdate) {
        this.$parent.detailDisabled = false
      } else {
        this.$Message.warning('数据已被禁用不能编辑')
      }
    }
  },
  created () {
    // debugger;
    // this.detailDisabled = this.$parent.detailDisabled;
  }
}
</script>

<style lang='scss'>
.modalMask_editWindow{
  position: fixed;
  top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(55, 55, 55, 0.6);
    height: 100%;
    z-index: 20;
}

.footerBox{
  display: flex;
  .footerItem{
    &.right{
      flex:1;
      text-align: right;
    }
    &.left{
      width:30%;
      text-align: left;
    }
    &.zero{
      width:5%;
      text-align: left;
    }
  }
}

.edit-window .ivu-modal-body{
  padding: 10px 20px 0 10px !important;
}
.edit-window .ivu-modal-header{
  background-color: #fcfcfc;
}

</style>
