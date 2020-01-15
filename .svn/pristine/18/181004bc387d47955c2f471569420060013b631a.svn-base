/**
 * @desc index 描述 所有.vue 公共方法 .vue 中 添加mixin:[name]
 *
 * 主要用于 表单的的添加 删除  update mixins
 *
 * @author Andy Huang
 *
 * @created 2019/11/20 17:08:28
 */
import AsyncValidator from 'async-validator'
import config from '@/config'
import clTabs from '@/components/cl-erp/tabs'
import clTabPane from '@/components/cl-erp/tabs/pane'
import editWindow from '@/components/edit-window/edit-window'
import eTable from '@/components/e-table/e-table'
import request from '@/libs/request'
import Form from '@/components/form/form'
export default {
  data () {
    return {
      spinLoaddingText: '提交中...', // 加载SPin 提示信息
      updateId: -1, // 当前数据是否可以更新
      actionLableName: '增加', // 当前操作行为的标题
      actionSubtitle: '', // 副标题 当前操作页面 描述
      showWindow: false, // 是否显示窗体S
      requestBaseUrl: '', // 请求的基础路径
      formDataInfo: {}, // 表单的内容 ,在基础类中重写
      tableFieldInitData: {}, // 编辑子表数据
      tableFieldsValidator: {}, // 子表TABLE列验证规则
      initData: {}
    }
  },
  components: {
    Form,
    clTabs,
    clTabPane,
    editWindow,
    eTable
  },
  props: {
    // 是否加载完成
    isLoaddingDone: {
      type: Boolean,
      default: false
    },
    // 是否显示
    value: {
      type: Boolean,
      default: false
    },
    // 表单+表格列头 默认初始值  add by andy 2020/01/06
    formInitData: {
      default: () => {
        return {}
      }
    },
    // 表单详细 注意[点击"修改/编辑"的时候,functionBtnList.vue ,会查询详情 赋值 formDetailData]
    formDetailData: {
      default: () => {
        return {}
      }
    },
    // 当前操作 添加/更新
    action: {
      type: String,
      default: 'add'
    },
    // 当前操作模块 特殊处理 标记
    moduleName: {
      type: String,
      default: ''
    }
  },
  watch: {
    // 回调
    showWindow (n, o) {
      this.$emit('input', n)
    },
    // 是否实现当前窗体
    value (n, o) {
      this.showWindow = n
      // 修改标题
      this.resetTitle()
      // 清除动作/数据/缓存
      this.cleanOrResetData()
    },
    // 当前添加 OR 修改
    action (n, o) {

    },
    // 点击"修改/编辑"的时候,functionBtnList.vue ,会查询详情 赋值 formDetailData
    // 变化时 监控
    formDetailData (n, o) {
      // debugger;
      if (n && Object.keys(n).length > 0) {
        this.formDataInfo = n // 表单 需要更新的数据,子类中需要添加实际所需字段
        // fix 主从表字段无效问题
        if (n.master != null && n.master.id) {
          // debugger
          this.updateId = n.master.id // 获取当前数据的ID
        } else if (n.id) { // 单表是没有master的
          this.updateId = n.id
        }
      }
    }
  },
  computed: {
    tableInitData () {
      if (this.initData.initData) {
        return this.initData.initData
      }
      return {}
    }
  },
  methods: {
    // 单表绑定 下拉框切换事件[静态数据查询]
    optionOnChange (itemObj) {
      // debugger
      if (itemObj) {
        this.formDataInfo[itemObj.key] = itemObj.value
      }
    },
    // 主从表绑定 下拉框切换事件[静态数据查询]
    optionOnChangeBy (itemObj) {
      // debugger
      if (itemObj) {
        this.formDataInfo.master[itemObj.key] = itemObj.value
      }
    },
    // 修改标题
    resetTitle () {
      // debugger
      this.actionLableName = '增加 ' + this.actionSubtitle
      if (this.action !== 'add') {
        this.actionLableName = '修改 ' + this.actionSubtitle
      }
    },
    // 清除动作/数据/缓存
    cleanOrResetData () {
      if (this.action == 'add') {
        this.tableFieldInitData = {}
        this.$refs['formDataInfo'].resetFields() // fix 清除上次的错误提示
        this.HandleFormDataInfo()
      }
    },
    // 继承中修改 添加时候,清空数据,附加默认值
    HandleFormDataInfo () {
      // 因为每个模块的的字段不一样
    },
    // 提交主从表数据
    formTableDataSubmit () {
      // debugger
      let _self = this
      this.$refs['formDataInfo'].validate(valid => {
        if (!valid) {
          return
        }
        let result = this.$refs['tableFields'].validate()
        if (result) {
          return
        }
        _self.insertOrUpdateData()
      })
    },
    // 提交表单数据
    formDataSubmit () {
      // debugger
      let _self = this
      this.$refs['formDataInfo'].validate(valid => {
        if (valid) {
          // debugger;
          if (_self.action === 'add') {
            _self.insertData()
          } else {
            _self.updateData()
          }
        } else {
          _self.$Message.error('请输入必填数据!')
        }
      })
    },
    // 增加 or 更新 主从表数据
    insertOrUpdateData () {
      // debugger
      if (this.validateBeforePost()) {
        return
      }
      debugger
      let _self = this
      let url = `${this.requestBaseUrl}/saveOrUpdate`
      let data = this.resetformDataInfo(this.formDataInfo)
      request.post(url, data).then(res => {
        this.showWindow = false // 关闭当前编辑窗口
        this.tableFieldInitData = {
          // id: ""
        }
        this.$refs['tableFields'].reset()
        this.$store.commit('setUpdataSubItem', true) // 更新字表数据查询
        this.infoTips()
      })
    },
    // 增加 数据
    insertData () {
      if (this.validateBeforePost()) {
        return
      }
      let url = `${this.requestBaseUrl}/save`
      let data = this.resetAddformDataInfo(this.formDataInfo)
      request
        .post(url, data)
        .then(res => {
          this.infoTips()
        })
        .catch(err => {
          this.spinLoaddingText = ''
        })
    },
    // 更新 数据
    updateData () {
      debugger
      if (this.validateBeforePost()) {
        return
      }
      if (this.updateId == -1) {
        this.$Message.error('获取数据异常,请稍后重试!')
        return
      }
      let url = `${this.requestBaseUrl}/update?id=${this.updateId}`
      let data = this.resetformDataInfo(this.formDataInfo)
      request
        .post(url, data)
        .then(res => {
          this.infoTips()
        })
        .catch(err => {
          this.spinLoaddingText = ''
        })
    },
    // 继承中修改,添加数据时,重置修改一些提交的数据
    resetAddformDataInfo (_data) {
      return _data
    },
    // 继承中修改,更新数据时,重置修改一些提交的数据
    resetformDataInfo (_data) {
      return _data
    },
    // 继承中修改,提交数据前 验证数据 ,默认 false 没有错误
    validateBeforePost () {
      return false
    },
    // 信息提示
    infoTips () {
      this.$Message.success('操作成功')
      if (this.action !== 'add') {
        // 组从表,需要查询更新字表数据查询
        this.showWindow = false // 更新时,关闭当前比较窗口
      }
      if (this.action === 'add') {
        this.$refs['formDataInfo'].resetFields()
      }
      this.$emit('submit-success')
    },
    getFormInitData () {
      // 加载初始化数据
      if (this.formName) {
        //  let url = `/sys/form/init/${this.formName}`;
        //  request.get(url).then(res => {
        //    this.initData = res;
        //  });
        this.initData = this.formInitData
      }
    }
  },
  created () {
    this.getFormInitData()
  }
}
