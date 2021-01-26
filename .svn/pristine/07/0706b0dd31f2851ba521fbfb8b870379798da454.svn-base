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
    <!-- 主表purSupplierArtFm  第二层pursupplierartitemFm  第三层purSupplierArtPZFm-->
    </htmlTemplate>
    <div :style="{ height: tableHeight + 'px' }" v-if="formInitData.listView">
      <Row>
        <div ref="contextMenuTarget">
            <vTable :upDownMove="true"
          @row-dblclick="showDetailswindow"
          tabletitle='纸板退货主表'
          :height="tableHeight / 3 - 30"
          ref="master_list_table"
          :url="`${functionParams.requestBaseUrl}/page`"
          :columns="formInitData.columns[`stockboxusereFm_new`].listColumns"
          :pageSize="formInitData.listView[`stockboxusereFm_new`].pageSize"
          :pagination="true"
          @row-click="masterTableRowClick"
          name="stockboxusereFm_new"
        ></vTable>
        </div>
      </Row>
      <Row>
          <Tabs>
            <TabPane label="纸板退货明细表" name="name1">
              <vTable
                tabletitle='纸板退货明细表'
                :height="tableHeight / 3 "
                ref="slave_list_table"
                :url="`${functionParams.requestBaseUrl}/item/list`"
                :columns="formInitData.columns[`stockboxusereitemFm_new`].listColumns"
                :pagination="false"
                @row-click="pursupplierartitemFmTableRowClick"
                name="stockboxusereitemFm_new"
                childrenTable
              ></vTable>
            </TabPane>
          </Tabs>
      </Row>
      <Row>
          <Tabs>
            <TabPane label="纸板退货详细表" name="name1">
              <vTable
                tabletitle='纸板退货详细表'
                :height="tableHeight / 3-30"
                ref="sub_list_table"
                :url="`${functionParams.requestBaseUrl}/sub/list`"
                :columns="formInitData.columns[`stockboxuseremdataFm_new`].listColumns"
                :pagination="false"
                name="stockboxuseremdataFm_new"
                childrenTable
              ></vTable>
            </TabPane>
          </Tabs>
        </Col>

      </Row>

    </div>
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
// import editForm from "./edit/edit-warehouse";
import listBaseMixins from '../mixins/list'
import request from '@/libs/request'
export default {
  mixins: [listBaseMixins],
  components: {
    editForm: function (resolve) { // 组件的异步加载
      require(['./edit/edit-newBoxUseRe'], resolve)
    },
    htmlTemplate,
    vTable
  },
  data () {
    return {
      // 导出表单配置
      tableDataList: [
        { ref: 'master_list_table', title: '纸板退货主表' },
        { ref: 'slave_list_table', title: '纸板退货明细表' },
        { ref: 'sub_list_table', title: '纸板退货详细表' }
      ],
      functionParams: {
        formInitPreName: 'stockBoxUseRe', // 查询表格列头信息 前缀 例如:purchasesupplierArt Fm/itemFm/mdataFm
        requestBaseUrl: '/stock/stockBoxUseRe', // 查询 表格行 数据 接口前缀地址
        uniqueId: 'boxUseReId'// 查询详细的唯一ID,需要顶部查询中使用
      },
      // 查询参数 ,注意格式
      queryParamsDefault: [
        {
          title: '供应商编号',
          code: 'supplierCode',
          supplierCode: ''
        },
        {
          title: '供应商简称',
          name: 'supplierName$like',
          supplierName$like: ''
        }
      ],
    }
  },
  methods: {
    // 主表点击事件,需要修改 查询参数:supplierArtId 和 查询反馈内容  rowData.custCode + " " + rowData.custName 一般对应 queryParamsDefault 即可
    masterTableRowClick (rowData, rowIndex) {
      this.masterRowSelection = rowData
      this.currrentRowItem.rowName = rowData.inWorkNo + ' ' + rowData.supplierName
      this.$refs['slave_list_table'].search({boxUseReId: rowData.id })
    },
    pursupplierartitemFmTableRowClick (rowData, rowIndex) {
      this.slaveRowselection = rowData
      this.$refs['sub_list_table'].search({boxUseReItemId: rowData.id})
    }
  },
  created () {
    // 查询多个表格列表头数据
    // 无需变更,配置functionParams 参数即可
    if (this.functionParams.formInitPreName) {
      this.getFormInitData(`stockboxusereFm_new`)
    }
  }
}

</script>

<style></style>
