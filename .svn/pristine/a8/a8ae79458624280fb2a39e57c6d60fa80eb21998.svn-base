<template>
  <div class="cl-moudle">
    <htmlTemplate
       ref="htmlTemplate"
      :currrentRowItem="currrentRowItem"
      @isLoaddingDone="getLoaddingDone"
      :requestBaseUrl="functionParams.requestBaseUrl"
      :uniqueId="functionParams.uniqueId"
      :queryParamsDefault="queryParamsDefault"
    >
    </htmlTemplate>
    <div ref="contextMenuTarget" class="content-container" :style="{ height: tableHeight + 'px' }">
      <vTable :upDownMove="true"
        @row-dblclick="showDetailswindow"
        :height="tableHeight"
        ref="master_list_table"
        :columns-url="functionParams.requestColBaseUrl + '/basPaperFm'"
        url="/bas/paper/page"
        :pagination="true"
        @row-click="tableRowClick"
        name="baspaperFm"
      ></vTable>
    </div>
    <editForm
       ref="editForm"
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
import editForm from './edit/edit-paper'
import listBaseMixins from '../mixins/list'
export default {
  name:'paper',
  mixins: [listBaseMixins],
  components: {
    editForm,
    htmlTemplate,
    vTable
  },
  data () {
    return {
      functionParams: {
        requestBaseUrl: '/bas/paper',
        uniqueId: 'paperId'
      },
      // 查询参数 ,注意格式
      queryParamsDefault: [
        {
          title: '原纸编号',
          code: 'paperCode',
          lpCS: ''
        },
        {
          title: '原纸名称',
          name: 'paperName$like',
          'paperName$like': ''
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
        this.currrentRowItem.rowName = rowData.paperCode + ' ' + rowData.paperName
      }
    }
  }
}
</script>

<style></style>
