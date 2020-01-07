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
        :columns-url="functionParams.requestColBaseUrl + '/baselengFm'" 
        url="/bas/leng/page"
        :pagination="true"
        @row-click="tableRowClick"
      ></vTable>
    </div>
    <editForm
      :isLoaddingDone="isLoaddingDone"
      :form-detail-data="formDetailData"
      :action="action"
      @submit-success="search()"
      v-model="showEditWindow"
    />
  </div>
</template>
<script>
import vTable from "@/components/tables/vTable";
import htmlTemplate from "../components/htmlTemplate";
import editForm from "./edit/edit-leng";
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
        requestBaseUrl: "/bas/leng",
        uniqueId: "lengId"
      },
      // 查询参数 ,注意格式
      queryParamsDefault: [
        {
          title: "层数",
          code: "lpCS",
          lpCS: ""
        },
        {
          title: "楞别",
          name: "lbCode",
          lbCode: ""
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
        this.currrentRowItem.rowName = rowData.lpCS + " " + rowData.lbCode;
      }
    }
  }
};
</script>

<style></style>
