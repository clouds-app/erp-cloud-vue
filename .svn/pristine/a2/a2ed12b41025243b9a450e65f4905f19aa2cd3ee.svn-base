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
    <div class="content-container" :style="{ height: tableHeight + 'px' }">
      <vTable
        :height="tableHeight"
        ref="master_list_table"
        :columns-url="functionParams.requestColBaseUrl + '/accountPurInitFm'"
        :url="`${functionParams.requestBaseUrl}/page`"
        :pagination="true"
        @row-click="tableRowClick"
        @row-dblclick="tableRowDBClick"
        name="accountPurInitFm"
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
import editForm from "./edit/edit-purinit";
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
        requestBaseUrl: "/account/purinit",
        uniqueId: "id"
      },
      // 查询参数 ,注意格式
      queryParamsDefault: [
        {
          title: "供应商编号",
          code: "purCode",
          purCode: ""
        },
        {
          title: "供应商名称",
          name: "purName$like",
          'purName$like': ""
        }
      ]
    };
  },
  methods: {
    tableRowClick(rowData, rowIndex) {
      this.formDetailData = {}; // 清除上次缓存数据 增加体验良好
      this.masterRowSelection = rowData;
      if (rowData != null) {
        // 是否 确认 审核 反审核 删除 禁用等 提示标题 列数据
        this.currrentRowItem.rowName =
          rowData.purCode + " " + rowData.purName;
      }
    },tableRowDBClick(rowIndex, rowData){
      this.editAction();
    }
  }
};
</script>

<style></style>
