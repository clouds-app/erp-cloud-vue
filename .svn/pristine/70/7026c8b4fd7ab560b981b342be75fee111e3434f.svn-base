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
    <div  class="content-container" :style="{ height: tableHeight + 'px' }">
      <Split :v-model="splitModel" mode="vertical">
        <div slot="top" class="demo-split-pane">
          <div ref="contextMenuTarget">
              <vTable :upDownMove="true"
              @row-dblclick="showDetailswindow"
              tabletitle='原纸进价'
              :height="tableHeight / 2"
              ref="master_list_table"
              :columns-url="functionParams.requestColBaseUrl + '/purSPaperPriceFm'"
              url="/purchase/purSpaperPrice/page"
              :pagination="true"
              @row-click="tableRowClick"
              name="purSPaperPriceFm"
            ></vTable>
          </div>
        </div>
        <div slot="bottom" :style="{ 'padding-top': '6px' }">
          <Tabs>
            <TabPane label="原纸进价明细" name="name1">
              <vTable
                tabletitle='原纸进价明细'
               :height="tableHeight / 2-37"
                ref="tableFieldRef"
                :table-data="tableFieldData"
                :columns-url="functionParams.requestColBaseUrl + '/purSPaperPriceItemFm'"
                :pagination="false"
                :query-params="{boxCoMainId:-1}"
                name="purSPaperPriceItemFm"
                childrenTable
              ></vTable>
            </TabPane>
          </Tabs>
        </div>
      </Split>
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
import listBaseMixins from '../mixins/list'
import request from '@/libs/request'
export default {
  mixins: [listBaseMixins],
  components: {
    'editForm': function (resolve) { // 组件的异步加载
      require(['./edit/edit-purSPaperPrice'], resolve)
    },

    htmlTemplate,
    vTable
  },
  data () {
    return {
      functionParams: {
        requestBaseUrl: '/purchase/purSpaperPrice',
        uniqueId: 'paperPriceId'
      },
      // 查询参数 ,注意格式
      queryParamsDefault: [
        {
          title: '请输入供应商编号',
          code: 'purCode',
          purCode: ''
        },
        {
          title: '请输入供应商名称',
          name: 'purName$like',
          'purName$like': ''
        }
      ],
      columns: [

      ],
      // 纸箱面积报价明细
      tableFieldColuns: [

      ]

    }
  },
  methods: {
    tableRowClick (rowData, rowIndex) {
      this.formDetailData = {} // 清除上次缓存数据 增加体验良好
      this.masterRowSelection = rowData
      if (rowData != null) {
        // debugger
        // 是否 确认 审核 反审核 删除 禁用等 提示标题 列数据
        this.currrentRowItem.rowName = rowData.purCode + ' ' + rowData.purName
      }
      if (this.masterRowSelection) {
        this.getItemDataById()
      }
    },
    // 获取纸板采购报价明细
    getItemDataById () {
      // debugger
      let url = `/purchase/purSpaperPrice/item/list`
      let data = {
        purPaperPriceId: this.masterRowSelection.id
      }
      let _self = this
      request.post(url, data).then(res => {
        // debugger
        _self.tableFieldData = res
      })
    },
    // 重写父类方法, 更新操作
    handleUpdateEvent () {
      this.getItemDataById()
    }
  }
}
</script>

<style></style>
