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
       :columns-url="functionParams.requestColBaseUrl + '/carFm'"
        url="/bas/car/page"
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
import editForm from "./edit/edit-car";
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
        requestBaseUrl: "/bas/car",
        uniqueId: "carId"
      },
      // 查询参数 ,注意格式
      queryParamsDefault: [
        {
          title: "车牌号",
          code: "carNo",
          poCode: ""
        },
        {
          title: "司机名称",
          name: "driver",
          poName: ""
        }
      ]
      // columns: [
      //      {
      //     title: '面积',
      //     key: 'carArea',
      //     align: 'center'
      //   },
      //    {
      //     title: '体积',
      //     key: 'carCube',
      //     align: 'center'
      //   },
      //    {
      //     title: '司机',
      //     key: 'driver',
      //     align: 'center'
      //   },
      //    {
      //     title: '司机电话',
      //     key: 'driverTel',
      //     align: 'center'
      //   },
      //    {
      //     title: '外车',
      //     key: 'outSide',
      //     align: 'center'
      //   },
      //    {
      //     title: '车主',
      //     key: 'owner',
      //     align: 'center'
      //   },
      //    {
      //     title: '车主电话',
      //     key: 'ownerTel',
      //     align: 'center'
      //   },
      //    {
      //     title: '车牌号',
      //     key: 'carNo',
      //     align: 'center'
      //   },
      //   {
      //     title: '备注',
      //     key: 'remark',
      //     align: 'center'
      //   },
      //    {
      //     title: '审核状态',
      //     key: 'iisAudit',
      //     align: 'center'
      //   },
      //      {
      //     title: '状态',
      //     key: 'status',
      //     align: 'center'
      //   },
      //      {
      //     title: '创建人',
      //     key: 'createUser',
      //     align: 'center'
      //   },
      //   {
      //     title: '创建时间',
      //     key: 'createTime',
      //     align: 'center'
      //   },
      //      {
      //     title: '修改人',
      //     key: 'updateUser',
      //     align: 'center'
      //   },
      //      {
      //     title: '修改时间',
      //     key: 'updateTime',
      //     align: 'center'
      //   },
      //   {
      //     title: '审核人',
      //     key: 'auditUser',
      //     align: 'center'
      //   },
      //    {
      //     title: '审核时间',
      //     key: 'auditTime',
      //     align: 'center'
      //   },
      // ],
    };
  },
  methods: {
    tableRowClick(rowData, rowIndex) {
      //  debugger
      this.formDetailData = {}; // 清除上次缓存数据 增加体验良好
      this.masterRowSelection = rowData;
      if (rowData != null) {
        // 是否 确认 审核 反审核 删除 禁用等 提示标题 列数据
        this.currrentRowItem.rowName = rowData.carNo + " " + rowData.driver; // 要修改成对应的 列
      }
    }
  }
};
</script>

<style></style>
