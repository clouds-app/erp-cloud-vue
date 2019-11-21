<template>
  <div class="cl-moudle">
    <div class="toolbar-container">
        <Card :bordered="false" dis-hover>
        <Row>
          <Col span="14">
                <functionBtnList :currrentRowItem="currrentRowItem" @isLoaddingDone="getLoaddingDone" :requestBaseUrl="functionParams.requestBaseUrl" :uniqueId="functionParams.uniqueId"/>
          </Col>
          <Col span="10">
            <searchForm/>
          </Col>
        </Row>
      </Card>
    </div>

    <div class="content-container" :style="{'height':tableHeight+'px'}">
      <vTable :height="tableHeight " ref="master_list_table" :columns="columns" url="/bas/team/page" @row-dblclick="rowDblclick()" :pagination="true" @row-click="tableRowClick"></vTable>
    </div>
   <editForm  
   :isLoaddingDone="isLoaddingDone"
   :form-detail-data="formDetailData"
    :action="action"
    @submit-success="search()" 
    v-model="showEditWindow"/>
  </div>
</template>
<script>
import editForm from './edit/edit-team'
import listBaseMixins from "../mixins/list";
  export default {
   mixins: [listBaseMixins],
   components: {
       editForm
      },
    data() {
      return {
        functionParams:{
            requestBaseUrl: '/bas/team',
            uniqueId:'teamId'
        },
       columns: [
          {
            title: '班组编码',
            key: 'teamCode',
            align: 'center'
          },
           {
            title: '班组名称',
            key: 'teamName',
            align: 'center'
          },
           {
            title: '班组类型',
            key: 'teamType',
            align: 'center'
          },
           {
            title: '部门编码',
            key: 'deptCode',
            align: 'center'
          },
           {
            title: '部门名称',
            key: 'deptName',
            align: 'center'
          },
          {
            title: '备注',
            key: 'remark',
            align: 'center'
          },
            {
            title: '审核状态',
            key: 'iisAudit',
            align: 'center'
          },
             {
            title: '状态',
            key: 'status',
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
       
      }
    },
    methods: {
      tableRowClick(rowData, rowIndex) {
       this.formDetailData ={} // 清除上次缓存数据 增加体验良好
       this.masterRowSelection = rowData;
       if(rowData!=null){
          // 是否 确认 审核 反审核 删除 禁用等 提示标题 列数据
          this.currrentRowItem.rowName=rowData.teamCode+' '+rowData.teamName
       }
     },
    },
   
  }
</script>

<style>
</style>
