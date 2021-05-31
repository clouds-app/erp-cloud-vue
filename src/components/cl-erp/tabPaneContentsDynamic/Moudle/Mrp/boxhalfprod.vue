<template>
  <div class="cl-moudle">
    <htmlTemplate
     ref="htmlTemplate"
      :currrentRowItem="currrentRowItem"
      @isLoaddingDone="getLoaddingDone"
      :requestBaseUrl="functionParams.requestBaseUrl"
      :uniqueId="functionParams.uniqueId"
      :queryParamsDefault="queryParamsDefault"
    >
    </htmlTemplate>
    <div  class="content-container" :style="{ height: tableHeight + 'px' }">
      <Split :v-model="splitModel" mode="vertical">
        <div slot="top" class="demo-split-pane">
          <div ref="contextMenuTarget">
              <vTable :upDownMove="true"
            @row-dblclick="showDetailswindow"
            :height="tableHeight / 2"
            ref="master_list_table"
            :columns-url="functionParams.requestColBaseUrl + '/boxhalfprodFm '"
            url="/mrp/boxHalfProd/page"
            :pagination="true"
            @row-click="tableRowClick"
            name="boxhalfprodFm"
          ></vTable>
          </div>
        </div>
        <div slot="bottom" :style="{ 'padding-top': '6px' }">
          <Tabs @on-click="TabsClickEvent">
            <TabPane label="工序完工登记明细表" name="boxhalfproditemFm">
              <vTable
                :height="tableHeight / 2-40"
                ref="tableFieldRef"
                :table-data="tableFieldData"
                :columns-url="functionParams.requestColBaseUrl + '/boxhalfproditemFm'"
                :pagination="false"
                name="boxhalfproditemFm"
              ></vTable>
            </TabPane>
            <TabPane label="工分分配" name="boxhalfprodworkerFm">
              <vTable
                :height="tableHeight / 2-40"
                ref="tableFieldRef2"
                :table-data="tableFieldData2"
                :columns-url="functionParams.requestColBaseUrl + '/boxhalfprodworkerFm'"
                :pagination="false"
                name="boxhalfprodworkerFm"
                childrenTable
              ></vTable>
            </TabPane>
          </Tabs>
        </div>
      </Split>
    </div>

    <editForm
     ref="editForm"
      :isLoaddingDone="isLoaddingDone"
      :form-detail-data="formDetailData"
      :action="action"
      @submit-success="search()"
      v-model="showEditWindow"
      :detailDisabled="detailDisabled"
      :detailConvertUpdate="detailConvertUpdate"
    />
  </div>
</template>
<script>
import vTable from '@/components/tables/vTable'
import htmlTemplate from '../components/htmlTemplate'
import listBaseMixins from '../mixins/list'
import request from '@/libs/request'
export default {
  mixins: [listBaseMixins],
  components: {
    'editForm': function (resolve) { // 组件的异步加载
      require(['./edit/edit-boxhalfprod'], resolve)
    },
    htmlTemplate,
    vTable
  },
  data () {
    return {
      tableDataList: [
        { ref: 'master_list_table', title: '工序完工登记' },
        { ref: 'tableFieldRef', title: '工序完工登记明细表' },
        { ref: 'tableFieldRef2', title: '工分分配' }
      ],
      tableFieldData: [], // 客户联系人列表
      tableFieldData2: [], // 附加地址列表
      currentTabName: 'boxhalfproditemFm', // 当前TABL名称
      functionParams: {
        requestBaseUrl: '/mrp/boxHalfProd',
        uniqueId: 'hpId'
      },
      // 查询参数 ,注意格式
      queryParamsDefault: [
        {
          title: '请输入工序编号',
          code: 'wpNo',
          wpNo: ''
        },
        {
          title: '请输入工序名称',
          name: 'wpName$like',
          'wpName$like': ''
        }
      ]
  
    }
  },
  methods: {
    // tab 切换事件
    TabsClickEvent (name) {
      // debugger
      this.currentTabName = name
      if (this.masterRowSelection && this.masterRowSelection.id != null && this.masterRowSelection.id != '') {
        if (name === 'boxhalfproditemFm') {
          this.get_boxhalfproditem()
        } else if (name === 'boxhalfprodworkerFm') {
          this.get_boxhalfprodworker()
        }
      }
    },
    tableRowClick (rowData, rowIndex) {
      this.formDetailData = {} // 清除上次缓存数据 增加体验良好
      this.masterRowSelection = rowData
      if (rowData != null) {
        // debugger
        // 是否 确认 审核 反审核 删除 禁用等 提示标题 列数据
        this.currrentRowItem.rowName =
          rowData.wpNo + ' ' + rowData.wpName
      }
      if (this.masterRowSelection) {
        this.TabsClickEvent(this.currentTabName)
      }
    },
    // 工序完工登记明细表
    get_boxhalfproditem () {
      // debugger
      let url = `/mrp/boxHalfProd/item/list`
      let data = {
        hpId: this.masterRowSelection.id
      }
      let _self = this
      request.post(url, data).then(res => {
         _self.tableFieldData = res
      })
    },
    // 工分分配
    get_boxhalfprodworker () {
      // debugger
      let url = `/mrp/boxHalfProd/worker/list`
      let data = {
        hpId: this.masterRowSelection.id
      }
      let _self = this
      request.post(url, data).then(res => {
         _self.tableFieldData2 = res
        
      })
    },
    // 重写父类方法, 更新操作
    handleUpdateEvent () {
      this.TabsClickEvent(this.currentTabName)
    }
  }
}
</script>

<style></style>
