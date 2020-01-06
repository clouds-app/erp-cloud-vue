<template>
  <div class="cl-modal">
    <div class="toolbar-container">
      <Card :bordered="false">
        <Row>
          <Col span="12">
            <Row :gutter="10" type="flex" justify="start">
              <Col span="4">
                <page></page>
              </Col>
              <Col span="2">
              <Button type="info" size="small" @click="addAction">添加</Button>
              </Col>
              <Col span="2">
              <Button type="success" size="small" @click="editAction">编辑</Button>
              </Col>
              <Col span="2">
              <Button type="warning" size="small" @click="deleteAction">删除</Button>
              </Col>
              <Col span="2">
              <Button type="error" size="small" @click="createTableAction">建表</Button>
              </Col>
              <!-- <Col span="1">
              <Button type="info" size="small">审核</Button>
              </Col>
              <Col span="1">
              <Button type="success" size="small">反审</Button>
              </Col> -->
            </Row>
          </Col>
          <Col span="12">

              <Row :gutter="10" type="flex" justify="end">
                <Col span="4">
                <Input placeholder="请输入表名" v-model="queryParams.tableName" size="small" />
                </Col>
                <Col span="4">
                <Input placeholder="请输入描述" size="small" v-model="queryParams.tableDesc" />
                </Col>

                <Col span="2" style="text-align: right;">
                <Button type="info" size="small" @click="search()">搜索</Button>
                </Col>
              </Row>
          </Col>

        </Row>

      </Card>
    </div>

    <!-- <div class="search-container">
      <Card>

      </Card>
    </div> -->

    <div class="content-container" :style="{'height':tableHeight+'px'}">
      <Split :v-model="splitModel" mode="vertical">
        <div slot="top">
           <vTable :upDownMove="true" :height="tableHeight / 2 " ref="master_list_table" :columns="columns" url="/sys/table/page" :pagination="true" @row-click="tableRowClick"></vTable>
        </div>
        <div slot="bottom" :style="{'padding-top':'6px'}">
            <Tabs>
              <TabPane label="表列信息" name="name1">
                <vTable  :upDownMove="true" :height="tableHeight / 2" ref="tableFieldRef" :table-data="tableFieldData" :columns="tableFieldColuns" :pagination="false"></vTable>
              </TabPane>
              <!-- <TabPane label="表页面信息" name="name2">
                <vTable :columns="columns" :pagination="false"></vTable>
              </TabPane> -->
            </Tabs>
        </div>
      </Split>
    </div>
    <sysEdit
    ref="sysEdit"
    v-model="showEditWindow"
    :form-detail-data="formDetailData"
    :action="action"
    @submit-success = "search()"
    ></sysEdit>
  </div>
</template>

<script>
import vTable from '@/components/tables/vTable'
import request from '@/libs/request'
import sysEdit from './edit'
import page from '@/components/page/page'
export default {
  components: {
    vTable,
    sysEdit,
    page
  },
  data () {
    return {
      splitModel: 0.5,
      showEditWindow: false,
      queryParams: {

      },
      columns: [{
        title: '表名',
        key: 'tableName',
        titleAlign: 'center',
        align: 'left',
        resizable: true,
        width: 200
      },
      {
        title: '说明',
        key: 'tableDesc',
        titleAlign: 'center',
        align: 'left',
        resizable: true,
        width: 200
      }, {
        title: '表单名',
        key: 'formName',
        align: 'center',
        resizable: true,
        width: 200
      },
      {
        title: '是否创建',
        key: 'tableCreated',
        render: (h, params) => {
          return h('div', params.row.tableCreated ? '是' : '否')
        },
        align: 'center',
        width: 200
      }
      ],
      tableFieldColuns: [{
        title: '列名',
        key: 'fieldName',
        align: 'center',
        resizable: true
      }, {
        title: '说明',
        key: 'fieldDesc',
        align: 'center',
        resizable: true
      }, {
        title: '数据类型',
        key: 'fieldDataType',
        align: 'center',
        resizable: true
      }, {
        title: '数据长度',
        key: 'fieldLength',
        align: 'center',
        resizable: true
      }, {
        title: '默认值',
        key: 'fieldDefault',
        align: 'center',
        resizable: true
      }, {
        title: '是否主键',
        key: 'fieldPk',
        align: 'center',
        render: (h, params) => {
          return params.row.fieldPk ? h('span', '是') : h('span', '否')
        },
        resizable: true
      }, {
        title: '不为空',
        key: 'fieldNotnull',
        align: 'center',
        render: (h, params) => {
          return params.row.fieldNotnull ? h('span', '是') : h('span', '否')
        },
        resizable: true
      }, {
        title: '字段顺序',
        key: 'fieldOrder',
        align: 'center',
        resizable: true,
        width: 200
      }, {
        title: '国际化KEY',
        key: 'fieldI18n',
        align: 'center',
        resizable: true,
        width: 200
      }],
      tableFieldData: [],
      masterRowSelection: {},
      formDetailData: {},
      action: 'add',
      tableHeight: 0
    }
  },
  methods: {
    tableRowClick (rowData, rowIndex) {
      this.masterRowSelection = rowData
      let url = `/sys/table/${rowData.id}`
      let _self = this
      request.get(url).then(res => {
        _self.tableFieldData = res.tableFields.defaultList
      })
    },
    getMasterSelectId () {
      if (Object.keys(this.masterRowSelection).length == 0) {
        this.$Message.warning('请选择需要操作的数据')
        return false
      }
      return this.masterRowSelection.id
    },
    editAction () {
      let selectionId = this.getMasterSelectId()
      if (!selectionId) {
        return
      }
      // 编辑窗口展示
      this.showEditWindow = true
      this.$refs.sysEdit.action = 'update'
      this.$refs.sysEdit.loadding = true
      this.detailAction()
    },
    detailAction () {
      // 加载详情数据
      let url = `/sys/table/${this.masterRowSelection.id}`
      let _self = this
      request.get(url).then(res => {
        _self.formDetailData = res
      })
    },
    addAction () {
      // 数据添加
      debugger
      this.$refs.sysEdit.action = 'add'
      this.$refs.sysEdit.loadding = false
      this.formDetailData = []
      this.showEditWindow = true
    },
    search () {
      // 表单搜索
      this.$refs['master_list_table'].search(this.queryParams)
    },
    deleteAction () {
      let selectionId = this.getMasterSelectId()
      if (!selectionId) {
        return
      }
      this.$Modal.confirm({
        title: '删除确认',
        content: '确定要删除当前选中数据吗？',
        onOk: () => {
          let url = `/sys/table/delete/${selectionId}`
          let _self = this
          request.post(url).then(res => {
            _self.search()
          })
        }
      })
    },
    createTableAction () {
      let selectionId = this.getMasterSelectId()
      if (!selectionId) {
        return
      }
      if (this.masterRowSelection.tableCreated) {
        this.$Message.info('表已经被创建')
        return
      }
      let url = `/sys/table/${selectionId}/created`
      let _self = this
      request.post(url).then(res => {
        _self.$Message.success('数据库表创建成功')
        _self.search()
      })
    },
    comptuedTableHeight () {
      // 计算table高度
      let height = document.body.offsetHeight
      this.tableHeight = height - (46 + 40 + 48 + 6 + 25)
    }
  },
  created () {
    this.comptuedTableHeight()
  }
}
</script>

<style>
</style>
