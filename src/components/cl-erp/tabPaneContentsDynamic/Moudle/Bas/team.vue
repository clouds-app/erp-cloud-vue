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
    <div ref="contextMenuTarget" class="content-container" :style="{ height: tableHeight + 'px' }">
      <Split :v-model="splitModel" mode="vertical">
        <div slot="top" class="demo-split-pane">
          <vTable
            tabletitle="班组主表"
            :height="tableHeight / 2"
            ref="master_list_table"
           :columns-url="functionParams.requestColBaseUrl + '/teamFm'"
            url="/bas/team/page"
            :pagination="true"
            @row-click="tableRowClick"
            name="teamFm"
          ></vTable>
        </div>
        <div slot="bottom" :style="{ 'padding-top': '6px' }">
          <Tabs>
            <TabPane label="班组人员" name="name1">
              <vTable
                tabletitle="班组人员"
                :height="tableHeight / 2"
                ref="tableFieldRef"
                :table-data="tableFieldData"
                :columns-url="functionParams.requestColBaseUrl + '/workerlistFm'"
                :pagination="false"
                name="workerlistFm"
              ></vTable>
            </TabPane>
          </Tabs>
        </div>
      </Split>
    </div>
    <editForm
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
import editForm from './edit/edit-team'
import listBaseMixins from '../mixins/list'
import request from '@/libs/request'
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
        requestBaseUrl: '/bas/team',
        uniqueId: 'teamId'
      },
      // 查询参数 ,注意格式
      queryParamsDefault: [
        {
          title: '班组编码',
          code: 'teamCode',
          teamCode: ''
        },
        {
          title: '班组名称',
          name: 'teamName$like',
          'teamName$like': ''
        }
      ],

      tableFieldColuns: [
        {
          title: '人员编号',
          key: 'workCode',
          align: 'center',
          width: '100'
        },
        {
          title: '人员名称',
          key: 'workName',
          align: 'center',
          width: '100'
        },
        {
          title: '备注',
          key: 'remark',
          align: 'center',
          width: '100'
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
        this.currrentRowItem.rowName =
          rowData.teamCode + ' ' + rowData.teamName
      }
      if (this.masterRowSelection) {
        this.getWorkerDataById()
      }
    },
    getWorkerDataById () {
      // debugger
      let url = `/bas/worker/list`
      let data = {
        deptId: this.masterRowSelection.deptId,
        teamId: this.masterRowSelection.id
      }
      let _self = this
      request.post(url, data).then(res => {
        // debugger
        _self.tableFieldData = res
      })
    }
  }
}
</script>

<style></style>
