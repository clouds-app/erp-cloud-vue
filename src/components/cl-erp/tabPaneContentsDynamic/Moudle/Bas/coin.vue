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
        :columns-url="functionParams.requestColBaseUrl + '/coinFm'"
        url="/bas/coin/page"
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
import vTable from '@/components/tables/vTable'
import htmlTemplate from '../components/htmlTemplate'
import editForm from './edit/edit-coin'
import listBaseMixins from '../mixins/list'
export default {
  mixins: [listBaseMixins],
  components: {
    editForm,
    htmlTemplate,
    vTable
  },
  data () {
    return {
      functionParams: {
        requestBaseUrl: '/bas/coin',
        uniqueId: 'coinId'
      },
      // 查询参数 ,注意格式
      queryParamsDefault: [
        {
          title: '货币名称',
          code: 'coinName',
          companyId: ''
        },
        {
          title: '货币编号',
          name: 'coinCode',
          lbCode: ''
        }
      ]
      // columns: [

      //    {
      //     title: '货币编号',
      //     key: 'coinCode',
      //     align: 'center'
      //   },
      //    {
      //     title: '货币名称',
      //     key: 'coinName',
      //     align: 'center'
      //   },

      //   {
      //     title: '日期',
      //     key: 'coinDate',
      //     align: 'center'
      //   },
      //    {
      //     title: '备注',
      //     key: 'remark',
      //     align: 'center'
      //   },
      //   {
      //     title: '汇率',
      //     key: 'coinRate',
      //     align: 'center'
      //   },
      //    {
      //       title:'0私用,1公用',
      //       key:'iisPublic',
      //       align:'center'
      //   },
      //    {
      //       title:'审核状态',
      //       key:'iisAudit',
      //       align:'center'
      //   },
      //   {
      //     title: '审核人',
      //     key: 'auditUser',
      //     align: 'center'
      //   },
      //   {
      //     title: '审核时间 ',
      //     key: 'auditTime',
      //     align: 'center'
      //   },
      //   {
      //     title: '创建人',
      //     key: 'createUser',
      //     align: 'center'
      //   },
      //   {
      //     title: '创建时间',
      //     key: 'createTime',
      //     align: 'center'
      //   },
      //    {
      //     title: '修改人',
      //     key: 'updateUser',
      //     align: 'center'
      //   },
      //    {
      //     title: '修改时间',
      //     key: 'updateTime',
      //     align: 'center'
      //   },

      // ],
    }
  },
  methods: {
    tableRowClick (rowData, rowIndex) {
      this.formDetailData = {} // 清除上次缓存数据 增加体验良好
      this.masterRowSelection = rowData
      if (rowData != null) {
        // 是否 确认 审核 反审核 删除 禁用等 提示标题 列数据
        this.currrentRowItem.rowName =
          rowData.coinCode + ' ' + rowData.coinName
      }
    }
  }
}
</script>

<style></style>
