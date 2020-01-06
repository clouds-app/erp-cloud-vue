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
       :columns-url="functionParams.requestColBaseUrl + '/machine'"  
        url="/bas/machine/page"
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
import editForm from "./edit/edit-machine";
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
        requestBaseUrl: "/bas/machine",
        uniqueId: "machineId"
      },
      // 查询参数 ,注意格式
      queryParamsDefault: [
        {
          title: "机台编号",
          code: "moCode",
          moCode: ""
        },
        {
          title: "机台名称",
          name: "moName",
          moName: ""
        }
      ],
      columns: [
        {
          title: "机台编码",
          key: "moCode",
          align: "center"
        },
        {
          title: "机台名称",
          key: "moName",
          align: "center"
        },
        {
          title: "工序参量",
          key: "bwpiParamNum",
          align: "center"
        },
        {
          title: "产能单位",
          key: "bwpiUnit",
          align: "center"
        },

        {
          title: "最大尺寸长",
          key: "maxLength",
          align: "center"
        },
        {
          title: "最大尺寸宽",
          key: "maxWidth",
          align: "center"
        },

        {
          title: "最小尺寸长",
          key: "minLength",
          align: "center"
        },
        {
          title: "最小尺寸宽",
          key: "minWidth",
          align: "center"
        },
        {
          title: "换单间隔",
          key: "moInteral",
          align: "center"
        },
        {
          title: "机台类型",
          key: "moType",
          align: "center"
        },

        {
          title: "备注",
          key: "remark",
          align: "center"
        },
        {
          title: "审核状态",
          key: "iisAudit",
          align: "center"
        },
        {
          title: "状态",
          key: "status",
          align: "center"
        },
        {
          title: "创建人",
          key: "createUser",
          align: "center"
        },
        {
          title: "创建时间",
          key: "createTime",
          align: "center"
        },
        {
          title: "修改人",
          key: "updateUser",
          align: "center"
        },
        {
          title: "修改时间",
          key: "updateTime",
          align: "center"
        },
        {
          title: "审核人",
          key: "auditUser",
          align: "center"
        },
        {
          title: "审核时间",
          key: "auditTime",
          align: "center"
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
        this.currrentRowItem.rowName = rowData.moCode + " " + rowData.moName;
      }
    }
  }
};
</script>

<style></style>
