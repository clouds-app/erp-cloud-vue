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
    <div :style="{ height: tableHeight + 'px' }" v-if="formInitData.listView">
      <Row>
        <!-- 1. 无需变更,修改 functionParams 配置参数即可 master_list_table 固定不变,不要修改-->
        <div ref="contextMenuTarget">
        <vTable :upDownMove="true"
          @row-dblclick="showDetailswindow"
          name="saleDeliReqFm "
          :height="tableHeight / 3 - 60"
           ref="master_list_table"
          :url="`${functionParams.requestBaseUrl}/page`"
          :columns="formInitData.columns[`${functionParams.formInitPreName}Fm`].listColumns"
          :pageSize="formInitData.listView[`${functionParams.formInitPreName}Fm`].pageSize"
          :pagination="true"
          @row-click="master_list_tableRowClick"
        ></vTable>
        </div>
      </Row>
      <Row>
         <!-- 2. 变更 query-params 参数为详细查询唯一ID,其它修改functionParams配置参数即可 slave_list_table 固定不变,不要修改-->
        <Tabs>
          <TabPane :label="formInitData.listView[`${functionParams.formInitPreName}ItemFm`].tableDesc" name="name1">
            <vTable
              name="saleDeliReqItemFm"
              :height="tableHeight / 3 "
              ref="slave_list_table"
              :url="`${functionParams.requestBaseUrl}/item/list`"
              :columns="formInitData.columns[`${functionParams.formInitPreName}ItemFm`].listColumns"
              :pagination="false"
              @row-click="slave_list_tableRowClick"
                :query-params="{reqId:-1}"
            ></vTable>
          </TabPane>
        </Tabs>
      </Row>
      <Row>
         <!-- 3. 变更 query-params 参数为详细查询唯一ID, 其它 修改functionParams配置参数即可 sub_list_table 固定不变,不要修改-->
        <Tabs>
          <TabPane :label="formInitData.listView[`${functionParams.formInitPreName}DataFm`].tableDesc" name="name1">
            <vTable
              name="saleDeliReqDataFm"
              :height="tableHeight / 3"
              ref="sub_list_table"
              :url="`${functionParams.requestBaseUrl}/data/list`"
              :columns="formInitData.columns[`${functionParams.formInitPreName}DataFm`].listColumns"
              :pagination="false"
              :query-params="{reqItemId:-1}"
            ></vTable>
          </TabPane>
        </Tabs>
      </Row>
    </div>
    <!-- 添加: formInitData  属性,用于表单表格初始化数据,多用于三层表-->
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
import vTable from '@/components/tables/vTable'
import htmlTemplate from '../components/htmlTemplate'
import listBaseMixins from '../mixins/list'
// import request from '@/libs/request'
export default {
  mixins: [listBaseMixins],
  components: {
    editForm: function (resolve) {
      // 组件的异步加载
      require(['./edit/edot-saleDeliReqFm'], resolve)
    },
    htmlTemplate,
    vTable
  },
  data () {
    return {
      // 导出参数配置
      tableDataList:[
        {ref:'master_list_table',title:"送货通知单主表"},
        {ref:'slave_list_table',title:"送货通知单明细"},
        {ref:'sub_list_table',title:"送货通知单产品明细表"}
      ],
      // 查询配置参数
      functionParams: {
        formInitPreName: 'saleDeliReq', // 查询表格列头信息 前缀 例如:saleboxproductprice Fm/itemFm/mdataFm
        requestBaseUrl: '/sale/deliReq', // 查询 表格行 数据 接口前缀地址
        uniqueId: 'deliReqId' // 查询详细的唯一ID,需要顶部查询中使用
      },
      // 分页查询接口获取字段, 查询参数配置 ,注意格式,一般为编码和名称
      queryParamsDefault: [
        {
          title: '通知单号',
          code: 'drNo',
          custCode: ''
        },
        // {
        //   title: '客户名称',
        //   name: 'custName$like',
        //   custName$like: ''
        // }
      ]
    }
  },
  methods: {
    // 主表点击事件,需要修改 查询参数:productPriceId 和 查询反馈内容  rowData.custCode + " " + rowData.custName 一般对应 queryParamsDefault 即可
    master_list_tableRowClick (rowData, rowIndex) {
      this.masterRowSelection = rowData
      this.currrentRowItem.rowName = rowData.drNo
      this.$refs['slave_list_table'].search({ reqId: rowData.id })
    },
    // 从表点击事件,需要修改 查询参数:productPriceId
    slave_list_tableRowClick (rowData, rowIndex) {
      // debugger
      this.slaveRowselection = rowData
      this.$refs['sub_list_table'].search({ reqItemId: rowData.id })
    }
  },
  created () {
    // 查询多个表格列表头数据
    // 无需变更,配置functionParams 参数即可
    if (this.functionParams.formInitPreName) {
      this.getFormInitData(`${this.functionParams.formInitPreName}Fm`)
    }
  }
}
</script>

<style></style>
