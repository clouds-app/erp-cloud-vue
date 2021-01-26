<template>
  <div class="cl-moudle">
    <htmlTemplate
     ref="htmlTemplate"
      :currrentRowItem="currrentRowItem"
      @isLoaddingDone="getLoaddingDone"
      :requestBaseUrl="functionParams.requestBaseUrl"
      :uniqueId="functionParams.uniqueId"
      :queryParamsDefault="queryParamsDefault"
      :editShow="functionParams.editShow"
      :deleteShow="functionParams.deleteShow"
    ></htmlTemplate>
    <div ref="contextMenuTarget" :style="{ height: tableHeight + 'px' }" v-if="formInitData.listView">
      <Row>
         <vTable :upDownMove="true"
            @row-dblclick="showDetailswindow"
            tabletitle="装车安排"
            :height="tableHeight / 2"
            ref="master_list_table"
            url="/stock/boxCar/page"
            :columns="formInitData.columns[`${functionParams.formInitPreName}Fm`].listColumns"
            :pageSize="formInitData.listView[`${functionParams.formInitPreName}Fm`].pageSize"
            :pagination="true"
            @row-click="tableRowClick"
            name="stockBoxLibCheckFm"
          ></vTable>
        </Row>
      <Row>
          <Tabs>
            <TabPane label="装车安排明细" name="name1">
              <vTable
                tabletitle="装车安排明细"
                :height="tableHeight / 2 - 30"
                ref="tableFieldRef"
                :table-data="tableFieldData"
                :columns="formInitData.columns[`${functionParams.formInitPreName}itemFm`].listColumns"
                :url="`${functionParams.requestBaseUrl}/item/list`"
                :pagination="false"
                name="stockboxCarItemFm"
                childrenTable
              ></vTable>
            </TabPane>
          </Tabs>
        </Row>
    </div>

    <editForm
     ref="editForm"
      :formInitData="formInitData"
      :isLoaddingDone="isLoaddingDone"
      :form-detail-data="formDetailData"
      moduleName="worker"
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
    editForm: function (resolve) {
      // 组件的异步加载
      require(['./edit/edit-boxCar'], resolve)
    },
    htmlTemplate,
    vTable
  },
  data () {
    return {
      // editShow:false,
      // deleteShow:false,
      // who:'editForm', // 动态指定编辑控件
      functionParams: {
        formInitPreName: 'stockboxcar', // 查询表格列头信息 前缀 例如:purchasesupplierArt Fm/itemFm/mdataFm
        requestBaseUrl: '/stock/boxCar',
        uniqueId: 'bcId',
        editShow: true,
        deleteShow: true
      },
      // 查询参数 ,注意格式
      queryParamsDefault: [
        {
          title: '装车单号',
          code: 'bcNo',
          bcNo: ''
        },
        {
          title: '车牌号',
          name: 'carNo$like',
          carNo$like: ''
        }
      ],
      columns: [],
      // 纸箱入库明细
      tableFieldColuns: []
    }
  },

  created () {
    // debugger
  // 查询多个表格列表头数据
  // 无需变更,配置functionParams 参数即可
    if (this.functionParams.formInitPreName) {
      this.getFormInitData(`${this.functionParams.formInitPreName}Fm`)
    }
  },
  methods: {
    tableRowClick (rowData, rowIndex) {
      // debugger
      this.formDetailData = {} // 清除上次缓存数据 增加体验良好
      this.masterRowSelection = rowData
      if (rowData != null) {
        // debugger
        // 是否 确认 审核 反审核 删除 禁用等 提示标题 列数据
        this.currrentRowItem.rowName =
          rowData.bcNo + ' ' + rowData.carNo
      }
      if (this.masterRowSelection) {
        this.getItemDataById()
      }
    },
    // 获取装车明细
    getItemDataById () {
      // debugger
      let url = `/stock/boxCar/item/list`
      let data = {
        bcId: this.masterRowSelection.id
      }
      let _self = this
      request.post(url, data).then(res => {
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
