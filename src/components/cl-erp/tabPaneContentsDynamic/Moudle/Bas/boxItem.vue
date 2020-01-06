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
         :columns-url="functionParams.requestColBaseUrl + '/boxFm'"
        url="/bas/boxItem/page"
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
import editForm from './edit/edit-boxItem'
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
        requestBaseUrl: '/bas/boxItem',
        uniqueId: 'boxItemId'
      },
      // 查询参数 ,注意格式
      queryParamsDefault: [
        {
          title: '开料单双片',
          code: 'boxCutMode',

          boxCutMode: ''
        },
        {
          title: '盒式公式Id',
          name: 'boxId',
          boxId: ''
        }
      ],
      columns: [
        {
          title: '开料单双片',
          key: 'boxCutMode',
          width: '100',
          align: 'center'
        },
        {
          title: '盒式公式Id',
          key: 'boxId',
          width: '100',
          companyId: 'center'
        },

        {
          title: '单双片条件',
          key: 'boxIfExpr',
          width: '100',
          align: 'center'
        },
        {
          title: '单双片条件',
          key: 'boxIfExprMsg',
          width: '100',
          align: 'center'
        },
        {
          title: '单双片值',
          key: 'boxIfValue',
          width: '80',
          align: 'center'
        },
        {
          title: '单片开槽',
          key: 'boxKC1Expr',
          width: '80',
          align: 'center'
        },
        {
          title: '单片开槽',
          key: 'boxKC1ExprMsg',
          width: '80',
          align: 'center'
        },
        {
          title: '双片开槽',
          key: 'boxKC2Expr',
          width: '80',
          align: 'center'
        },
        {
          title: '双片开槽',
          key: 'boxKC2ExprMsg',
          width: '80',
          align: 'center'
        },
        {
          title: '单片纸长',
          key: 'boxL1Expr',
          width: '80',
          align: 'center'
        },
        {
          title: '单片纸长',
          key: 'boxL1ExprMsg',
          width: '80',
          align: 'center'
        },
        {
          title: '双片纸长',
          key: 'boxL2Expr',
          width: '80',
          align: 'center'
        },
        {
          title: '双片纸长',
          key: 'boxL2ExprMsg',
          width: '80',
          align: 'center'
        },
        {
          title: '单片纸宽',
          key: 'boxW1Expr',
          width: '80',
          align: 'center'
        },
        {
          title: '单片纸宽',
          key: 'boxW1ExprMsg',
          width: '80',
          align: 'center'
        },
        {
          title: '双片纸宽',
          key: 'box_W2Expr',
          width: '80',
          align: 'center'
        },
        {
          title: '双片纸宽',
          key: 'boxW2ExprMsg',
          width: '80',
          align: 'center'
        },

        {
          title: '单片纸宽压线',
          key: 'boxYS1ExprMsg',
          width: '120',
          align: 'center'
        },
        {
          title: '单片纸宽压线',
          key: 'boxYS1_Expr',
          width: '120',
          align: 'center'
        },
        {
          title: '双片压线',
          key: 'boxYS2Expr',
          width: '80',
          align: 'center'
        },
        {
          title: '双片压线',
          key: 'boxYS2ExprMsg',
          width: '80',
          align: 'center'
        },

        {
          title: '备注',
          key: 'remark',
          width: '50',
          align: 'center'
        },
        {
          title: '审核状态',
          key: 'iisAudit',
          width: '80',
          align: 'center'
        },
        {
          title: '状态',
          key: 'status',
          width: '50',
          align: 'center'
        },
        {
          title: '创建人',
          key: 'createUser',
          width: '50',
          align: 'center'
        },
        {
          title: '创建时间',
          key: 'createTime',
          width: '80',
          align: 'center'
        },
        {
          title: '修改人',
          key: 'updateUser',
          width: '50',
          align: 'center'
        },
        {
          title: '修改时间',
          key: 'updateTime',
          width: '80',
          align: 'center'
        },
        {
          title: '审核人',
          key: 'auditUser',
          width: '50',
          align: 'center'
        },
        {
          title: '审核时间',
          key: 'auditTime',
          width: '80',
          align: 'center'
        }
      ]
    }
  },
  methods: {
    tableRowClick (rowData, rowIndex) {
      this.formDetailData = {} // 清除上次缓存数据 增加体验良好
      this.masterRowSelection = rowData
      if (rowData != null) {
        // 是否 确认 审核 反审核 删除 禁用等 提示标题 列数据
        this.currrentRowItem.rowName = rowData.boxCutMode + ' ' + rowData.boxId
      }
    }
  }
}
</script>

<style></style>
