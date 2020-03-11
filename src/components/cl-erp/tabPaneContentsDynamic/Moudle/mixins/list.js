
/**
 * @desc index 描述 所有.vue 公共方法 .vue 中 添加mixin:[name]
 *
 * 主要用于 table 数据 操作
 *
 * @author Andy Huang
 *
 * @created 2019/11/20 17:08:28
 */

import config from '@/config'

import request from '@/libs/request'
export default {
  data () {
    return {
      who: '', // 动态指定编辑控件
      splitModel: 0.5,
      currrentRowItem: {
        rowName: '',
        rowId: ''
      }, // 当前选择列的基本信息 操作时 需要用
      isLoaddingDone: false, // 获取详细 是否获取完成
      functionParams: { // 清酒基础路径
        requestBaseUrl: '',
        uniqueId: '',
        requestColBaseUrl: 'sys/form/columns'
      },
      showEditWindow: false, // 是否显示编辑窗体
      columns: [], // 表格数据列表
      tableFieldData: [], // 子表数据集
      tableFieldData2: [], // 二级子表数据集
      tableFieldColuns: [], // 子表数据列
      masterRowSelection: {}, // 当前选择行
      formDetailData: {}, // 当前表单详细数据,再点击"修改/编辑"的时候,functionBtnList.vue ,会查询详情 赋值 formDetailData
      action: 'add', // 当前操作 添加 编辑
      tableHeight: 0, // 表格高度
      queryParamsDefault: [], // 默认搜索配置
      formInitData: {}, // 表单数据化数据,包含数据列,编辑初始数据,查询字段,列表信息 MR.Yang 2019.12.26
      slaveRowselection: {}, // 保存子表被选中的行信息
      slaveSlaveRowselection: {}// 保存第三层表都选中的行信息
    }
  },
  computed: {
    needToUpdate () {
      return this.$store.state.app.updataSubItem
    }

  },
  watch: {
    // 监控 是否需要刷新查询子表数据
    needToUpdate (newVal, oldVal) {
      // debugger
      if (newVal === true) {
        this.handleUpdateEvent()
        this.$store.commit('setUpdataSubItem', false)
      }
    },
    // 监控打开编辑窗口状态
    showEditWindow(n,o){
      this.showEditWindowTigger(n)
    }
  },
  created () {
    this.comptuedTableHeight()
  },
  methods: {
    showEditWindowTigger(n){

    },
    // 更新操作,可以子类中继承重写需要的操作
    handleUpdateEvent () {
      // do something you want to update in subItem

    },
    // 数据查询 master_list_table 为 talbe refs='master_list_table'
    search (queryParams) {
      this.$refs['master_list_table'].search(queryParams)
    },
    // 清除选择项
    cleanSelectedItem () {
      this.masterRowSelection = {}
    },
    // 是否加载完成
    getLoaddingDone (isDone) {
      this.isLoaddingDone = isDone
    },
    // 添加成功 回调事件 刷新数据
    submitSuccess () {
      this.search()
    },
    // 当前选择行的ID
    getMasterSelectId () {
      if (Object.keys(this.masterRowSelection).length == 0) {
        this.$Message.warning('请选择需要操作的数据')
        return false
      }
      return this.masterRowSelection.id
    },

    refresh () {
      this.$refs['master_list_table'].search()
    },
    // 数据双击
    rowDblclick () {
      // console.log('=====rowDblclick====')
    },
    comptuedTableHeight () {
      // 计算table高度
      let height = document.body.offsetHeight
      this.tableHeight = height - (118)
    },
    getFormInitData (formName) {
      let url = `/sys/form/init/${formName}`
      request.get(url).then(res => {
        this.formInitData = res
      })
    }
  }
}
