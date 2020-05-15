<template>
  <div class="cl-moudle">
    <htmlTemplate
      :currrentRowItem="currrentRowItem"
      @isLoaddingDone="getLoaddingDone"
      :requestBaseUrl="functionParams.requestBaseUrl"
      :uniqueId="functionParams.uniqueId"
      :queryParamsDefault="queryParamsDefault"
    >
    </htmlTemplate>

    <div class="content-container" v-if="formInitData.listView" :style="{ height: tableHeight + 'px' }">
      <Split :v-model="splitModel" mode="vertical">
        <div slot="top" class="demo-split-pane" ref="contextMenuTarget">
          <vTable
            :height="tableHeight / 2"
            ref="master_list_table"
            :url="`${functionParams.requestBaseUrl}/page`"
            :columns="formInitData.columns[`${functionParams.formInitPreName}Fm`].listColumns"
            :pagination="true"
            @row-click="master_list_tableRowClick"
            :name="`${functionParams.formInitPreName}Fm`"
          ></vTable>
        </div>
        <div slot="bottom" :style="{ 'padding-top': '6px' }">
          <Tabs>
            <TabPane label="开票明细" :name="`${functionParams.formInitPreName}ItemFm`">
              <vTable
                :height="tableHeight / 2.3"
                ref="slave_list_table"
                :url="`${functionParams.requestBaseUrl}/item/list`"
                :columns="formInitData.columns[`${functionParams.formInitPreName}ItemFm`].listColumns"
                :pagination="false"
                @row-click="slave_list_tableRowClick"
                :name="`${functionParams.formInitPreName}ItemFm`"
              ></vTable>
            </TabPane>
          </Tabs>
        </div>
      </Split>
    </div>
    <editForm
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
// 发票登记信息 
import vTable from "@/components/tables/vTable";
import htmlTemplate from "../components/htmlTemplate";
import listBaseMixins from "../mixins/list";
import request from "@/libs/request"
import eTable from "@/components/e-table/e-table";
import editWindow from "@/components/edit-window/edit-window";
import formControl from "@/components/form-control/form-control";
import dayjs from "dayjs"
export default {
  mixins: [listBaseMixins],
  components: {
    eTable,
    editWindow,
    formControl,
    dayjs,
    'editForm':function(resolve) { //组件的异步加载
                require(["./edit/edit-invoiceCheck"], resolve);
            },
        
    htmlTemplate,
    vTable,
  },
  data() {
    return {
      tableContextMenu:this.$refs['contextmenu'],
      //数据查询修改等基本参数设置
      functionParams: {
        formInitPreName: 'accountInvoiceCheck', //  查询表格列头信息 前缀 例如:accountInvoiceCheck  Fm/itemFm 	
        requestBaseUrl: "/account/invoiceCheck",
        uniqueId: "invoiceId"
      },
      // 查询参数 ,注意格式
      queryParamsDefault: [
        {
          title: "请输入开票单号",
          code: "icNo",
          icNo: ""
        },
        {
          title: "请输入客户名称",
          name: "custName$like",
          custName$like: ""
        }
      ],
    };
  },
   
  created () {
    // 查询多个表格列表头数据
    // 无需变更,配置functionParams 参数即可
    if (this.functionParams.formInitPreName) {
      this.getFormInitData(`${this.functionParams.formInitPreName}Fm`)
    }
     
  },
  methods: {
    // 主表点击事件,需要修改 查询参数:productPriceId 和 查询反馈内容  rowData.custCode + " " + rowData.custName 一般对应 queryParamsDefault 即可
    master_list_tableRowClick (rowData, rowIndex) {
      this.masterRowSelection = rowData
      this.currrentRowItem.rowName = rowData.icNo + ' ' + rowData.custName
      this.$refs['slave_list_table'].search({ invoiceCheckId: rowData.id })
    },
    // 纸箱出货明细 行点击事件
    slave_list_tableRowClick(rowData, rowIndex){

    },
   

  }
};
</script>

<style></style>
