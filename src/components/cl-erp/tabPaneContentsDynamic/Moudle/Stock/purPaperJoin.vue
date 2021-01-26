<template>
  <div class="cl-moudle">
    <!-- 0. 无需变更,修改 functionParams 配置参数即可 -->
    <htmlTemplate
     ref="htmlTemplate"
      :currrentRowItem="currrentRowItem"
      @isLoaddingDone="getLoaddingDone"
      :requestBaseUrl="functionParams.requestBaseUrl"
      :uniqueId="functionParams.uniqueId"
      :queryParamsDefault="queryParamsDefault"
    >
    </htmlTemplate>
    <div  :style="{ height: tableHeight + 'px' }" v-if="formInitData.listView">
      <Row>
        <!-- 1. 无需变更,修改 functionParams 配置参数即可 master_list_table 固定不变,不要修改-->
        <div ref="contextMenuTarget">
           <vTable :upDownMove="true"
          @row-dblclick="showDetailswindow"
          name=" stockpurpaperjoinFm_new 	"
          :height="tableHeight / 3"
           ref="master_list_table"
          :url="`${functionParams.requestBaseUrl}/page`"
          :columns="formInitData.columns[`${functionParams.formInitPreName}Fm_new`].listColumns"
          :pageSize="formInitData.listView[`${functionParams.formInitPreName}Fm_new`].pageSize"
          :pagination="true"
          @row-click="master_list_tableRowClick"
        ></vTable>
        </div>
      </Row>
      <Row>
         <!-- 2.  :query-params="{boxCoMainId:-1}" 变更 query-params 参数为详细查询唯一ID,其它修改functionParams配置参数即可 slave_list_table 固定不变,不要修改-->
        <Tabs>
          <TabPane label="纸板入库明细" name="name1">
            <vTable
             :getDataByParams="true"
             name="boxcoitemFm"
              :height="tableHeight / 3-10"
              ref="slave_list_table"
              :url="`${functionParams.requestBaseUrl}/item/list`"
              :columns="formInitData.columns[`${functionParams.formInitPreName}itemFm_new`].listColumns"
              :pagination="false"
              @row-click="slave_list_tableRowClick"
            ></vTable>
          </TabPane>
        </Tabs>
      </Row>
      <Row>
         <!-- 3. 变更 query-params 参数为详细查询唯一ID, 其它 修改functionParams配置参数即可 sub_list_table 固定不变,不要修改-->
        <Tabs>
          <TabPane label="纸板入库信息" name="firstTab">
            <vTable
              name="boxcomdataFm"
              :height="tableHeight / 3-50"
              ref="sub_list_table"
              :table-data="tableBoxCoModelData"
              :columns="formInitData.columns[`${functionParams.formInitPreName}dataFm_new`].listColumns"
              :pagination="false"
            ></vTable>
          </TabPane>
        </Tabs>
      </Row>
    </div>
    <!-- 添加: formInitData  属性,用于表单表格初始化数据,多用于三层表 -->
    <editForm
       ref="editForm"
      :formInitData="formInitData"
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
// 纸板入库(NEW) 20201229
import vTable from '@/components/tables/vTable'
import htmlTemplate from '../components/htmlTemplate'
import listBaseMixins from '../mixins/list'
import request from '@/libs/request'
import axios from '@/libs/api.request'
export default {
  mixins: [listBaseMixins],
  components: {
    editForm: function (resolve) {
      // 组件的异步加载
      require(['./edit/edit-purPaperJoin'], resolve)
    },
    htmlTemplate,
    vTable
  },
  data () {
    return {
      extendWindow: {// 扩展窗口配置
        // Tips:"提示：此窗口只显示有供应商纸质/纸板进价的工单！",
        isLoaddingDone: false, // 窗口是否加载完成
        showEditWindow: false, // 是否显示edit-boxSalesOrderSlave 编辑窗口
        action: null, // 当前操作功能 添加/编辑
        formDetailData: {} // 当前表单的详细信息
      },
      tableDataList: [// 导出配置
        { ref: 'master_list_table', title: '纸板入库' },
        { ref: 'slave_list_table', title: '纸板入库明细' },
        { ref: 'sub_list_table', title: '纸板入库信息' },
      ],
      tableBoxCoModelData: [], // 纸板规格 数据
      tableBoxCoWorkProcData: [], // 生产工序 数据
      // 查询配置参数
      functionParams: {
        formInitPreName: 'stockpurpaperjoin', // 查询表格列头信息 前缀 例如:boxco mainFm/itemFm/mdataFm
        requestBaseUrl: '/stock/purPaperJoin', // 查询 表格行 数据 接口前缀地址
        uniqueId: 'paperJoinId' // 查询详细的唯一ID,需要顶部查询中使用
      },
      // 分页查询接口获取字段, 查询参数配置 ,注意格式,一般为编码和名称
      queryParamsDefault: [
        {
          title: '入库单号',
          code: 'pjNumber',
          pjNumber: ''
        },
        {
          title: '供应商编号',
          name: 'supplierCode$like',
          supplierCode$like: ''
        },
        {
          title: '供应商名称',
          name: 'supplierName$like',
          supplierName$like: ''
        }
      ]
    }
  },
  methods: {
  
    // 刷新主表页面数据
    refreshMasterData(){
       this.$refs['master_list_table'].search()
    },

    // 加载 第三层表格 数据
    LoadThirdData () {
      // debugger
      let url = `${this.functionParams.requestBaseUrl}/sub/list`
      let data = {
        paperJoinItemId: this.slaveRowselection.id
      }
      let _self = this
      request.post(url, data).then(res => {
        _self.tableBoxCoModelData = res
      })
    },
   
    // 主表点击事件,需要修改 查询参数:productPriceId 和 查询反馈内容  rowData.custCode + " " + rowData.custName 一般对应 queryParamsDefault 即可
    master_list_tableRowClick (rowData, rowIndex) {
      this.masterRowSelection = rowData
      this.currrentRowItem.rowName = rowData.pjNumber + ' ' + rowData.supplierName
      this.$refs['slave_list_table'].search({ paperJoinId: rowData.id })
      // 清空第三层表数据
      this.$refs['sub_list_table'].reset()
    },

    // 从表点击事件,需要修改 查询参数:productPriceId
    slave_list_tableRowClick (rowData, rowIndex) {
      //console.log('从表点击事件,需要修改 查询参数:productPriceId')
      this.slaveRowselection = rowData
     // this.$refs['sub_list_table'].search({ paperJoinItemId: rowData.id })
      if (this.slaveRowselection) {
        this.LoadThirdData()
      }
    }
  },
  created () {
    // 查询多个表格列表头数据
    // 无需变更,配置functionParams 参数即可
    if (this.functionParams.formInitPreName) {
      this.getFormInitData(`${this.functionParams.formInitPreName}Fm_new`)
    }
  }
}
</script>

<style></style>
