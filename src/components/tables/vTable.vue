<template>
  <div class="vTable">
    <div :style="{ position: 'relative' }" class="edit-table">
      <Table
        :loading="isLoading"
        column-width-drag
        stripe
        border
        :show-header="showHeader"
        style="width:100%"
        :columns="columnsComputed"
        :highlight-row="highlightRow"
        :width="width"
        :height="tableHeight"
        :data="tableDataItems"
        size="small"
        v-bind="$attrs"
        v-on="$listeners"
        :upDownMove="upDownMove"
        @on-row-click="rowClick"
        @on-select="selectGroupChange"
        @on-select-all="selectAll"
        @on-row-dblclick="rowDbClick"
        @on-selection-change="onSelectionChange"
        @on-column-width-resize="onColumnWidthResize"
        ref="vTable"
        :row-class-name="rowClassName"
      >
          <!-- 无法使用slot 模块,直接赋值 -->
         <template slot-scope="{ row, index }" slot="report.slot.templatePath">
              <a target="_blank" :href="getReportPath(row)">{{row.templatePath}}</a>
         </template>
      </Table>
      <div v-if="paginationControl == 'scroll'">
        <!-- <page simple :total="page.total" :page-size-opts="pageSizeOpts" show-total :page-size="page.pageSize" @on-change="onPageNumberChange" @on-page-size-change="onPageSizeChange" size="small" show-elevator show-sizer ></page>
        -->
      </div>
      <div
        v-else
        style="padding:3px 10px;background-color: #F4F4F4;border:1px solid #c4c4c4;border-top:0;"
      >
        <Page
          :total="page.total"
          :page-size-opts="pageSizeOpts"
          show-total
          :page-size="page.pageSize"
          @on-change="onPageNumberChange"
          @on-page-size-change="onPageSizeChange"
          size="small"
          show-elevator
          show-sizer
        ></Page>
      </div>
    </div>
  </div>
</template>

<script>
import { setToken, getToken } from '@/libs/util'
import axios from '@/libs/api.request'
import Table from '../table/table'
import formatter from '@/libs/formatter'
import { eventBus } from '../../main'
export default {
  name: 'vTable',
  components: { Table },
  data () {
    return {
      clickTime:'',//单击事件计时器
      countTemp: 0,
      resColumns: [], // 查询返回的列数据
      page: {
        pageNumber: 1,
        total: 0,
        pageSize: 30,
        pages: 0 // 总页数
      },
      tableDataItems: [],
      pageSizeOpts: [10, 30, 50, 70, 100],
      isLoading: false,
      verticalResizeOffset: this.pagination ? 32 : 0,
      scrollHeight: 0,
      formatter: {
        NUMBER_MARK: 'numberMark', // 千分位
        STATUS: 'statusFormat',
        POPLINK: 'popLinkFormat', // 格式链接
        // POPSHOW: "popShowFormat", // 弹框显示
        COMMON: 'commonFormat', // 普通格式
        AUDIT: 'auditFormat',
        CHECKBOX: 'checkBoxFormat',
        DECIMAL_DIGITS2: 'decimalDigits2Format',
        DECIMAL_DIGITS3: 'decimalDigits3Format',
        DECIMAL_DIGITS4: 'decimalDigits4Format',
        DECIMAL_DIGITS6: 'decimalDigits6Format'
      },
      rowClassValidates: [],
      colorItem: {
        red: '#ed4014',
        yellow: '#ff9900',
        green: '#19be6b',
        skyblue: '#2db7f5',
        blue: '#2d8cf0'
      },
      tableQueryParams: {},
      tableDataItemsIsClear: false,
      pageFlag: 'page_' + Math.random() * 100000000 // 分页标识，解决分页一个改变，全部都变的问题
    }
  },
  props: {
    // 必须通过查询参数获取数据
    getDataByParams: {
      type: Boolean,
      default: false
    },
    columns: {
      type: Array,
      default: () => {
        return []
      }
    },
    tableData: {
      type: Array,
      default: () => {
        return []
      }
    },
    height: {
      type: Number,
      default: -1
    },
    pagination: {
      type: Boolean,
      default: true
    },
    url: String,
    queryParams: {},
    total: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: -1
    },
    pageNumber: {
      type: Number,
      default: 1
    },
    width: Number,
    columnsUrl: String,
    format: {
      type: Boolean,
      default: true
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    highlightRow: {
      type: Boolean,
      default: true
    },
    upDownMove: {
      type: Boolean,
      default: false
    },
    columnsGroup: {
      type: Array,
      default: () => {
        return []
      }
    },
    paginationControl: {
      type: String,
      default: 'scroll'
    },
    showIndex: {
      type: Boolean,
      default: () => {
        return true
      }
    },
    columnParse: Function,
    name: String,
    childrenTable: {
      type: Boolean,
      default: false
    },
  },
  watch: {
       // 分页页码改变 on-pagenumber-change add by andy 20200820
    pageNumberChange:{
        deep:true,
        handler(n,o){
          this.onPageNumberChangeByVuex(n)
      }
    },
    // 监控 列查询 是否变动
    resColumns: {
      handler (n, o) {
        if (n.length > 0) {
          // this.handleColums();
        }
      },
      deep: true
    },
    tableData: {
      handler (n, o) {
        this.tableDataItems = n
        // 数据是否加载完毕
        //eventBus.$emit('loadDataDone', n.length)
        //==============分页当前页加载完毕==================
              let pageDoneParams = {
                 pageCount:n.length,
                 pageFlag:this.pageFlag,
              }
             this.$store.commit('setPageDataLoaddingDone',pageDoneParams)
        //==============分页当前页加载完毕==================
      },
      deep: true
    },

    total (n, o) {
      this.page.total = n
    },
    pageSize (n, o) {
      this.page.pageSize = n
    },
    pageNumber (n, o) {
      this.page.pageNumber = n
    },
    height (n, o) {
      // this.resize();
    },
    queryParams: {
      handler (n, o) {
        this.tableQueryParams = n
      },
      deep: true
    },
    tableDataItems: {
      handler (n, o) {
        if (n && n.length > 0) {
          this.$nextTick(() => {
            // debugger;
            // this.$refs.vTable.clickCurrentRow(0);
          })
        }
      },
      deep: true
    }
  },
  computed: {
    // 分页页码改变
    pageNumberChange(){
      return this.$store.state.app.pageNumberChange
    },
    columnsComputed () {
      //debugger
      if (this.name) {
        const data = this.$store.getters.getTableColumns(this.name)
        if (data && data.columns) {
          return data.columns
        }
      }
      let tempColums = this.columns
      if (this.resColumns.length > 0) {
        tempColums = JSON.parse(JSON.stringify(this.resColumns))
      }
      if (this.columnParse) {
        tempColums = this.columnParse(tempColums)
      }
      if (!this.format) {
        return this.columns
      }
      // let columns =tempColums
      let columns = this.columnsRenderParse(tempColums)
      if (this.showIndex) {
        let index = [
          {
            title: '行号',
            type: 'index',
            width: 30,
            align: 'center',
            titleAlign: 'center',
            fixed: 'left'
          }
        ]
        columns = index.concat(columns)
      }
      if (this.name && tempColums.length > 0) {
        const storeData = this.$store.state.root.tableColumnsData
        if(storeData && Object.keys(storeData).length>0){
          let currentTableConfig = storeData[this.name]
           if(currentTableConfig && Object.keys(currentTableConfig).length>0){
             // 防止分页配置被本地设置重置,所以已经有的不需要重新设置
               return
           }
        }
        this.$store.dispatch('setTableColumns', {
          tableName: this.name,
          columns: columns,
          pageSize: this.pageSize>1?this.pageSize:this.page.pageSize // 修复个别页面设置 直接先查询后赋值的情况
        })
      }
      return columns
    },
    tableHeight () {
      if (this.paginationControl == 'page') {
        return this.height - 32
      }
      return this.height
    }
  },
  created () {
    // debugger;
    this.tableQueryParams = this.queryParams
    if (this.name == undefined) {
      this.getFormColumns()
    } else {
      const data = this.$store.getters.getTableColumns(this.name)
      if (!data) {
        this.getFormColumns()
        return
      }
      // 如果是子表，初始化是不加载数据的 @白羊 2020-04-17
      if (!this.childrenTable) {
       // debugger
        this.getTableData()
      }
    }
    // this.getTableData();
  },
  methods: {
    onColumnWidthResize(width){
     // debugger
    },
    getReportPath (row) {
      let token = getToken()
      let url = `${this.$config.reportUrl}/report/design?token=${token}&reportFileName=${row.templatePath}`
      return url
    },
    handleColums () {
      return []
    },
    columnsGroupParse (columnsGroup) {
      // 列分组解析
      let columns = []
      // fieldName
      columnsGroup.forEach((column, index) => {
        if (column.fieldName && column.children) {
          // 需要替换同时又有子节点
          let children = this.columnsGroupParse(column.children)
          column = this.columns[column.fieldName]
          column['children'] = children
          columns.push(column)
        } else if (column.fieldName) {
          // 需要替换
          columns.push(this.columns[column.fieldName])
        } else if (column.children) {
          // 自定义的节点有子节点
          let children = this.columnsGroupParse(column.children)
          column['children'] = children
          columns.push(column)
        } else {
          // 自定义节点
          columns.push(column)
        }
      })
      return columns
    },
    columnsRenderParse (columns) {
      // 列添加render
      let newColumns = []
      columns.forEach(item => {
        if (item.children) {
          if (item.children.length == 0) {
            delete item.children
            // newColumns.push(item);
          } else {
            let column = this.columnsRenderParse(item.children)
            if (column.length > 0) {
              item.children = column
              // newColumns.push({ "children": column });
            }
          }
        }
        if (item.format && item.format != null && item.format != '') {
          let formatMethod = this.formatter[item.format]
          if (formatMethod) {
            // 匹配上了
            item['render'] = formatter[formatMethod]
          } else {
            item['render'] = eval('(function(h,params){' + item.format + '})')
          }
        }

        if (item.colorValidator != null && item.colorValidator != '') {
          this.rowClassValidates.push(item.colorValidator)
        }
        newColumns.push(item)
      })
      return newColumns
    },
    getTableData (pageChange=false) {
       //debugger
      if(this.getDataByParams){
        if(!!!this.tableQueryParams){
           // 必须通过参数获取数据, 主要用于屏蔽 子表默认查询全部的情况
            return
        }
      }
      this.isLoading = true
      if (this.url && this.url != null) {
      
        this.isLoading = true
        //debugger
        const storeData = this.$store.getters.getTableColumns(this.name)
        if (storeData && storeData.pageSize) {
          this.page.pageSize = storeData.pageSize
        }else{
          // 修复 读取配置分页
          if(this.pageSize>1){
             this.page.pageSize = this.pageSize
          }
        }
        if(!pageChange  && this.tableQueryParams && this.tableQueryParams.sourceFrom=='search'){
            this.page.pageNumber =1
        }
        axios
          .request({
            url: this.url,
            params: this.pagination ? this.page : {},
            method: 'post',
            data: this.tableQueryParams ? this.tableQueryParams : {}
          })
          .then(res => {
            // 数据是否加载完毕
            if (res.data.success) {
              //eventBus.$emit('loadDataDone', res.data.result.length)
              //==============分页当前页加载完毕==================
              let pageDoneParams = {
                 pageCount:res.data.result.length,
                 pageFlag:this.pageFlag,
              }
             this.$store.commit('setPageDataLoaddingDone',pageDoneParams)
              //==============分页当前页加载完毕==================
              let tableDataItems = []
              let data = res.data.result
              if (this.pagination) {
                tableDataItems = data.records
                this.page.pageNumber = parseInt(data.current)
                this.page.pageSize = parseInt(data.size)
                this.page.total = parseInt(data.total)
                this.page.pages = parseInt(data.pages)
                //eventBus.$emit('page-data-init', this.page, this.pageFlag)
                //==============分页初始信息==================
                let pageInitParams = {
                  pageDataInit:'page-data-init',
                  pageFlag:this.pageFlag,
                  page:this.page,
                  currentPage:this.page.pageNumber
                }
                this.$store.commit('setPageDataInit',pageInitParams)
                //==============分页初始信息==================
              } else {
                tableDataItems = data
              }
              this.tableDataItems = tableDataItems
              // this.tableDataItems.sort(function(a, b){return a.id - b.id})
            } else {
              let msg = res.data.message && res.data.message != '' ? res.data.message : '数据加载失败，请稍后再试...'
              this.$Message.error(msg)
            }
          })
          .finally(() => {
            this.isLoading = false
          })
      } else {
        this.isLoading = false
      }
    },
    onPageNumberChange (pageNumber) {
      this.page.pageNumber = pageNumber
      this.getTableData(true)
    },
    onPageNumberChangeByVuex(pageInfo) {
      if (this.pageFlag === pageInfo.pageFlag) {
        this.onPageNumberChange(pageInfo.pageNumber)
      }
    },
    onPageSizeChange (pageSize) {
      this.page.pageSize = pageSize
      this.getTableData(true)
    },
    // 清空数据
    reset () {
      this.tableDataItems = []
    },
    search (queryParams) {
      // debugger
      if (queryParams) {
        let data =
          this.tableQueryParams == null ||
          Object.keys(this.tableQueryParams).length == 0
            ? {}
            : this.tableQueryParams
        this.tableQueryParams = Object.assign(data, queryParams)
      }
      // this.page.pageNumber = 1
      this.tableDataItemsIsClear = true
      this.getTableData()
    },
    rowClick(rowData, rowIndex) {
      // debugger
      if (!!this.clickTime) {
        clearTimeout(this.clickTime)
      }
      this.clickTime = setTimeout(() => {
        this.$emit("row-click", rowData, rowIndex);
      }, 300);
    },
    selectGroupChange (selection) {
      this.$emit('select-group-change', selection)
    },
    selectAll (selection) {
      this.$emit('select-all', selection)
    },
    onSelectionChange (selection) {
      this.$emit('on-selection-change', selection)
    },
    resize () {
      // this.$refs.vTable.resize();
    },
    exportCsv (params) {
      this.$refs.vTable.exportCsv(params)
    },
    rowDbClick(rowIndex, rowData, column) {
      // debugger
      this.$emit("row-dblclick", rowIndex, rowData);
    },
    getFormColumns () {
     // debugger
      let _self = this
      // this.resColumns = []; // 默认值
      if (this.columnsUrl && this.columnsUrl != '') {
        if (this.columnsGroup && this.columnsGroup.length > 0) {
          this.columnsUrl = this.columnsUrl + '/group'
        }
        axios
          .request({
            url: this.columnsUrl,
            method: 'get'
          })
          .then(res => {
            if (res.data.success) {
              if (res.data.result.pageSize) {
                _self.page.pageSize = res.data.result.pageSize
                //  _self.$store.dispatch('setTableColumns', {
                //     tableName: _self.name,
                //     columns: res.data.result.columns,
                //     pageSize: _self.page.pageSize
                //   })
                _self.resColumns = res.data.result.columns
              } else {
                _self.resColumns = res.data.result
              }
              // this.columns = res.data.result;
              // 列加载成功了，在加载数据
              // 如果是子表，初始化是不加载数据的 @白羊 2020-04-17
              if (!this.childrenTable) {
                //debugger
                this.getTableData()
              }
            } else {
              this.$Message.error('列数据失败,请稍后再试')
            }
          })
      } else {
        // 如果是子表，初始化是不加载数据的 @白羊 2020-04-17
        if (!this.childrenTable) {
          //debugger
          this.getTableData()
        }
      }
    },
    rowClassName (row, index) {
      let classSty = 'column-cell-class-'
      for (let i = 0; i < this.rowClassValidates.length; i++) {
        let rowClassValidate = this.rowClassValidates[i]
        let exec = eval('(function(row,index){' + rowClassValidate + '})')
        let color = exec(row, index)
        return classSty + color
      }
      return classSty
    },
    scrollPaging () {
      // 滚动分页
      if (this.isLoading || this.page.pageNumber >= this.page.pages) {
        return
      }
      this.onPageNumberChange(this.page.pageNumber + 1)
    },
    pageScrollAddEventListener () {
      if (this.paginationControl == 'scroll') {
        let _self = this
        let loadding = true
        this.$refs.vTable.$refs.body.addEventListener('scroll', e => {
          if (
            loadding &&
            e.target.scrollHeight -
              (e.target.scrollTop + e.target.offsetHeight) <=
              0
          ) {
            // 加载更多
            // console.log('加载更多数据了...'+(e.target.scrollHeight - e.target.scrollTop));
            loadding = false
            _self.tableDataItemsIsClear = false
            _self.pageScrollRemoveEventListener()
            _self.scrollPaging()
          }
        })
      }
    },
    pageScrollRemoveEventListener () {
      this.$refs.vTable.$refs.body.removeEventListener('scroll', e => {})
    }
  },
  updated () {
    if (this.$refs.vTable.$children.length > 0) {
      var node1 = this.$refs.vTable.$children[0].$el
      if (
        node1.children.length > 0 &&
        node1.children[0].offsetWidth > this.$refs.vTable.$el.scrollWidth
      ) {
        this.scrollHeight = 20
      }
    }
  },
  mounted () {
    if (!this.name) {
      this.$Message.warning(
        'name属性检测，为提高性能，快给vTable添加name属性,使用formname作为名称'
      )
    }
    // 事件
    // eventBus.$on('on-pagenumber-change', (pageNumber, pageFlag) => {
    //   // console.log("on-pagenumber-change");
    //    console.log('on-pagenumber-change 数据加载完毕 this.$on')
    //   if (this.pageFlag === pageFlag) {
    //     this.onPageNumberChange(pageNumber)
    //   }
    // })
   },
  // beforeDestroy () {
  //   // 移除所有事件频道， 注意不需要添加任何参数
  //   eventBus.$off()
  // }
}
</script>

<style>
/* .ivu-table tr:nth-child(2n) td {
    background: #FFFAF0 !important;
} */

</style>
