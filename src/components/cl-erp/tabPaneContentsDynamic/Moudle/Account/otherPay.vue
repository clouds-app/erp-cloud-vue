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
    <div ref="contextMenuTarget" class="content-container" :style="{ height: tableHeight + 'px' }">
      <vTable
        :height="tableHeight"
        ref="master_list_table"
        :columns-url="functionParams.requestColBaseUrl + '/otherPayFm'"
        :url="`${functionParams.requestBaseUrl}/page`"
        :pagination="true"
        @row-click="tableRowClick"
        @row-dblclick="tableRowDBClick"
        name="otherPayFm"
      ></vTable>
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
import vTable from "@/components/tables/vTable";
import htmlTemplate from "../components/htmlTemplate";
import editForm from "./edit/edit-otherPay";
import listBaseMixins from "../mixins/list";
export default {
  mixins: [listBaseMixins],
  components: {
    editForm,
    htmlTemplate,
    vTable
  },
  data() {
    return {
      functionParams: {
        requestBaseUrl: "/account/otherPay",
        uniqueId: "id"
      },
      // 查询参数 ,注意格式
      queryParamsDefault: [
        {
          title: "其他应收单号",
          code: "opNo",
          omNo: ""
        },
        {
          title: "供应商名称",
          name: "supplierName$like",
          'supplierName$like': ""
        }
      ]
    };
  },
  methods: {
      // 重写父类方法,确认当前行 是否可以删除,默认true可以删除,false 返回false 不可以删除
    canIDeleteRowItem(){
      let canDelete = true
      if(!!this.masterRowSelection){
        // 已开票金额
        let itemHasAmt = Number(this.masterRowSelection['opIvAmt']) 
        if(itemHasAmt>0){
          canDelete = false
        }
      }
      if(!canDelete){
           let  message = "当前数据(已开票金额不为0),不可操作";
           this.$Message.warning(message);
           return false
      }
      return true
    },
    tableRowClick(rowData, rowIndex) {
      this.formDetailData = {}; // 清除上次缓存数据 增加体验良好
      this.masterRowSelection = rowData;
      if (rowData != null) {
        // 是否 确认 审核 反审核 删除 禁用等 提示标题 列数据
        this.currrentRowItem.rowName =
          rowData.opNo + " " + rowData.supplierName;
      }
    },tableRowDBClick(rowIndex, rowData){
      this.editAction();
    }
  }
};
</script>

<style></style>
