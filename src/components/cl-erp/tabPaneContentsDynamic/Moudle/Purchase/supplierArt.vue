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
          ref="master_list_purSupplierArtFm"
          :columns="formInitData.columns.purSupplierArtFm.listColumns"
          url="/purchase/supplierArt/page"
          :pageSize="formInitData.listView.purSupplierArtFm.pageSize"
          :pagination="true"
          @row-click="masterTableRowClick"
        ></vTable>
      </Row>
      <Row>
        <Col span="24">
          <Tabs>
            <TabPane :label="formInitData.listView.purSupplierArtItemFm.tableDesc" name="name1">
              <vTable
                :height="tableHeight / 3 - 30"
                ref="slave_list_purSupplierArtItemFm"
                :columns="formInitData.columns.purSupplierArtItemFm.listColumns"
                url="/purchase/supplierArt/item/list"
                :pagination="false"
                @row-click="purSupplierArtItemFmTableRowClick"
              ></vTable>
            </TabPane>
          </Tabs>
        </Col>
        <Col span="24">
          <Tabs>
            <TabPane :label="formInitData.listView.purSupplierArtPZFm.tableDesc" name="name1">
              <vTable
                :height="tableHeight / 3"
                ref="sub_list_purSupplierArtPZFm"
                :columns="formInitData.columns.purSupplierArtPZFm.listColumns"
                url="/purchase/supplierArt/pz/list"
                :pagination="false"
                :query-params="{supplierArtItemId:-1}"
              ></vTable>
            </TabPane>
          </Tabs>
        </Col>

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
    'editForm': function (resolve) { // 组件的异步加载
      require(['./edit/edit-supplierArt'], resolve)
    },
    htmlTemplate,
    vTable
  },
  data () {
    return {
      functionParams: {
        requestBaseUrl: '/purchase/supplierArt',
        uniqueId: 'supplierArtId'
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
          name: 'purName',
          purName: ''
        }
      ],
      columns: [

      ],
      tableFieldColuns: [

      ]
    }
  },
  methods: {
    masterTableRowClick (rowData, rowIndex) {
      this.masterRowSelection = rowData
      this.currrentRowItem.rowName = rowData.purCode + ' ' + rowData.purName
      this.$refs.slave_list_purSupplierArtItemFm.search({ supplierArtId: rowData.id })
    },
    purSupplierArtItemFmTableRowClick (rowData, rowIndex) {
      this.slaveRowselection = rowData
      this.$refs.sub_list_purSupplierArtPZFm.search({ supplierArtItemId: rowData.id })
    },

    tableRowClick (rowData, rowIndex) {
      this.formDetailData = {} // 清除上次缓存数据 增加体验良好
      this.masterRowSelection = rowData
      if (rowData != null) {
        // debugger
        // 是否 确认 审核 反审核 删除 禁用等 提示标题 列数据
        // this.currrentRowItem.rowName = rowData.purCode + " " + rowData.purName;
      }
      if (this.masterRowSelection) {
        this.getItemDataById()
        // this.getItemDataById_1();
      }
    },
    handleUpdateEvent () {
      debugger
      this.getItemDataById()
      // this.getItemDataById_1();
    }
    // 供应商纸质明细
    // getItemDataById() {
    //   //debugger
    //   let url = `/purchase/supplierArt/item/list`;
    //   let data = {
    //     supplierArtId: this.masterRowSelection.id
    //   };
    //   let _self = this;
    //   request.post(url, data).then(res => {
    //     //debugger
    //     _self.tableFieldData = res;
    //   });
    // },
    // 供应商纸质配纸
    // getItemDataById_1() {
    //   //debugger
    //   let url = `/purchase/supplierArt/pz/list`;
    //   let data = {
    //     supplierArtItemId: this.masterRowSelection.id
    //   };
    //   let _self = this;
    //   request.post(url, data).then(res => {
    //     //debugger
    //     _self.tableFieldData = res;
    //   });
    // },

  },
  created () {
    // 加载页面初始数据
    this.getFormInitData('purSupplierArtFm')
  }
}
// 供应商纸质明细
// getItemDataById() {
//   //debugger
//   let url = `/purchase/supplierArt/item/list`;
//   let data = {
//     supplierArtId: this.masterRowSelection.id
//   };
//   let _self = this;
//   request.post(url, data).then(res => {
//     //debugger
//     _self.tableFieldData = res;
//   });
// },
// 供应商纸质配纸
// getItemDataById_1() {
//   //debugger
//   let url = `/purchase/supplierArt/pz/list`;
//   let data = {
//     supplierArtItemId: this.masterRowSelection.id
//   };
//   let _self = this;
//   request.post(url, data).then(res => {
//     //debugger
//     _self.tableFieldData = res;
//   });
// },
// 重写父类方法, 更新操作

</script>

<style></style>
