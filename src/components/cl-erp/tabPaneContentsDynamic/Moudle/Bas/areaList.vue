<template>
  <div class="cl-moudle">
    <div class="toolbar-container">
        <Card :bordered="false" dis-hover>
        <Row>
          <Col span="12">
                <functionBtnList :requestBaseUrl="functionParams.requestBaseUrl" :uniqueId="functionParams.uniqueId"/>
          </Col>
          <Col span="12">
            <searchForm/>
          </Col>
        </Row>
      </Card>
    </div>

    <div class="content-container" :style="{'height':tableHeight+'px'}">
      <vTable :height="tableHeight " ref="master_list_table" :columns="columns" url="/bas/area/list" :pagination="false" @row-click="tableRowClick"></vTable>
    </div>
   
  </div>
</template>

<script>
  import functionBtnList from '../components/functionBtnList.vue'
  import searchForm from '../components/searchForm.vue'
  import vTable from '@/components/tables/vTable'
  import request from '@/libs/request'
 
  export default {
    components: {
      vTable,functionBtnList,searchForm
    },
    data() {
      return {
        functionParams:{
            requestBaseUrl: '/bas/area',
            uniqueId:'areaInfoId'
        },
        showEditWindow: false,
        columns: [
            {
            title: '',
            key: 'id',
            align: 'center'
           },
           {
            title: '地区编码',
            key: 'areaCode',
            align: 'center'
          },
           {
            title: '地区名称',
            key: 'areaName',
            align: 'center'
          },
          {
            title: '所属区域',
            key: 'areaPCode',
            align: 'center'
          },
          {
            title: '备注',
            key: 'remark',
            align: 'center'
          },
             {
            title: '状态',
            key: 'status',
            align: 'center'
          },
            {
            title: '审核状态',
            key: 'iisAudit',
            align: 'center'
          },
             {
            title: '创建人',
            key: 'createUser',
            align: 'center'
          },
          {
            title: '创建时间',
            key: 'createTime',
            align: 'center'
          },
             {
            title: '修改人',
            key: 'updateUser',
            align: 'center'
          },
             {
            title: '修改时间',
            key: 'updateTime',
            align: 'center'
          },
          {
            title: '审核人',
            key: 'auditUser',
            align: 'center'
          },
           {
            title: '审核时间',
            key: 'auditTime',
            align: 'center'
          },
        ],
        tableFieldData: [],
        masterRowSelection: {},
        formDetailData: {},
        action: 'add',
        tableHeight:0
      }
    },
    methods: {
      tableRowClick(rowData, rowIndex) {
        //debugger
        this.masterRowSelection = rowData;
        let url = `${this.requestBaseUrl}/detailDept?${this.uniqueId}=${rowData.id}`;
        // let _self = this;
        // request.get(url).then(res => {
        //   _self.tableFieldData = res.tableFields.defaultList;
        // });
      },
      getMasterSelectId() {
        if (Object.keys(this.masterRowSelection).length == 0) {
          this.$Message.warning('请选择需要操作的数据');
          return false;
        }
        return this.masterRowSelection.id;
      },
      editAction() {
        let selectionId = this.getMasterSelectId();
        if (!selectionId) {
          return;
        }
        //编辑窗口展示
        this.showEditWindow = true;
        this.action = 'update';
        this.detailAction();
      },
      detailAction() {
        //加载详情数据
        let url = `${this.requestBaseUrl}/detailDept?${this.uniqueId}=${this.masterRowSelection.id}`;
        let _self = this;
        request.post(url).then(res => {
          _self.formDetailData = res;
        });
      },
      addAction() {
        //数据添加
        this.action = 'add';
        this.showEditWindow = true;
      },
      search(queryParams) {
        //表单搜索
        this.$refs['master_list_table'].search(queryParams);
      },
     
      createTableAction(){
        let selectionId = this.getMasterSelectId();
        if (!selectionId) {
          return;
        }
        if(this.masterRowSelection.tableCreated){
          this.$Message.info('表已经被创建');
          return;
        }
        let url = `${this.requestBaseUrl}/${selectionId}/created`;
        let _self = this;
        request.post(url).then(res => {
          _self.$Message.success('数据库表创建成功');
          _self.search();
        });
      },
      comptuedTableHeight(){
        //计算table高度
        let height = document.body.offsetHeight;
        this.tableHeight = height - (46 + 40 + 48 + 6 + 25);
      }
    },
    created() {
      this.comptuedTableHeight();
    }
  }
</script>

<style>
</style>
