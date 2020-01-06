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
    <div :style="{ height: tableHeight + 'px' }" v-if="formInitData.listView">
      <Row>
        <vTable
          :height="tableHeight / 3 - 60"
          ref="master_list_productUnionFm"
         :columns="formInitData.columns.productUnionFm.listColumns"
          url="/bas/productUnion/page"
          :pageSize="formInitData.listView.productUnionFm.pageSize"
          :pagination="true"
          @row-click="masterTableRowClick"
        ></vTable>
      </Row>
      <Row>
        <Tabs>
          <TabPane :label="formInitData.listView.productUnionItemFm.tableDesc" name="name1">
            <vTable
              :height="tableHeight / 3 - 30"
              ref="slave_list_productUnionItemFm"
             :columns="formInitData.columns.productUnionItemFm.listColumns"
             url="/bas/productUnion/unionItem/list"
              :pagination="false"
              @row-click="slaveProductUnionItemFmTableRowClick"
              :query-params="{productId:-1}"
            ></vTable>
          </TabPane>
        </Tabs>
      </Row>
      <Row>
        <Tabs>
          <TabPane :label="formInitData.listView.productUnionSubFm.tableDesc" name="name1">
            <vTable
              :height="tableHeight / 3"
              ref="sub_list_productUnionSubFm"
              :columns="formInitData.columns.productUnionSubFm.listColumns"
              url="/bas/productUnion/unionSub/list"
              :pagination="false"
              :query-params="{productId:-1}"
            ></vTable>
          </TabPane>
        </Tabs>
      </Row>
    </div>
    <editForm
      :isLoaddingDone="isLoaddingDone"
      :form-detail-data="formDetailData"
       moduleName="worker"
      :action="action"
      @submit-success="search()"
      v-model="showEditWindow"
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
    editForm: function (resolve) {
      // 组件的异步加载
      require(['./edit/edit-productSuite'], resolve)
    },
    htmlTemplate,
    vTable
  },
  data () {
    return {
      functionParams: {
        requestBaseUrl: '/bas/productUnion',
        uniqueId: 'productId'
      },
      // 查询参数 ,注意格式
      queryParamsDefault: [
        {
          title: '仓库编号',
          code: 'whCode',
          whCode: ''
        },
        {
          title: '仓库名称',
          name: 'whName',
          whName: ''
        }
      ]
    }
  },
  methods: {
    masterTableRowClick (rowData, rowIndex) {
      this.masterRowSelection = rowData
      this.currrentRowItem.rowName = rowData.whCode + ' ' + rowData.whName
      this.$refs.slave_list_productUnionItemFm.search({ productId: rowData.id })
    },
    slaveProductUnionItemFmTableRowClick (rowData, rowIndex) {
      this.slaveRowselection = rowData
      this.$refs.sub_list_productUnionSubFm.search({ productId: rowData.id })
    },
    tableRowClick (rowData, rowIndex) {
      this.formDetailData = {} // 清除上次缓存数据 增加体验良好
      this.masterRowSelection = rowData
      if (rowData != null) {
        // debugger
        // 是否 确认 审核 反审核 删除 禁用等 提示标题 列数据

      }
      if (this.masterRowSelection) {
        this.getItemDataById()
      }
    },
    // 重写父类方法, 更新操作
    handleUpdateEvent () {
      debugger
      this.getItemDataById()
    }
  },
  created () {
    // 加载页面初始数据
    this.getFormInitData('productUnionFm')
  }
}
</script>

<style></style>
