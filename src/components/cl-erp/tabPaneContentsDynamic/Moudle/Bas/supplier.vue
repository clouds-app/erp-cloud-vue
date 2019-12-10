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
    <div class="content-container" :style="{'height':tableHeight+'px'}">
      <vTable :height="tableHeight " ref="master_list_table" columns-url="/bas/dept/purSupplierFm/columns" url="/bas/supplier/page" :pagination="true" @row-click="tableRowClick"></vTable>
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
import vTable from '@/components/tables/vTable'
import htmlTemplate from '../components/htmlTemplate'
import editForm from './edit/edit-supplier'
import listBaseMixins from "../mixins/list";
  export default {
   mixins: [listBaseMixins],
   components: {
       editForm,htmlTemplate,vTable
      },
    data() {
      return {
        functionParams:{
            requestBaseUrl: '/bas/supplier',
            uniqueId:'supplierId'
        },
       // 查询参数 ,注意格式
        queryParamsDefault:[
            {
            title: '供应商编号',
            code:'purCode',
            artCode:''
           },
           {
            title: '供应商名称',
            name:'purName',
            artCS: '',
          },
        ],
        // columns: [
        //    {
        //     title: '纸质代号',
        //     key: 'artCode',
        //     align: 'center'
        //   },
        //    {
        //     title: '层数',
        //     key: 'artCS',
        //     align: 'center'
        //   },
        //    {
        //       title:'停用:0是,1否',
        //       key:'artStop',
        //       align:'center'
        //   },
        //   {
        //       title:'按重量销售:0是,1否',
        //       width:"130",
        //       key:'saleByWt',
        //       align:'center'
        //   },
          
           
        //    {
        //       title:'审核状态:0未审核1已审核',
        //       width:"170",
        //       key:'iisAudit',
        //       align:'center'
        //   },
          
        //    {
        //       title:'备注',
        //       key:'remark',
        //       align:'center'
        //   },
        //    {
        //       title:'状态',
        //       key:'status',
        //       align:'center'
        //   },

        //   {
        //       title:'创建时间',
        //       key:'createTime',
        //       align:'center'
        //   },
        //   {
        //       title:'创建人',
        //       key:'createUser',
        //       align:'center'
        //   },
           
        //   {
        //       title:'修改时间',
        //       key:'updateTime',
        //       align:'center'
        //   },
        //   {
        //       title:'修改人',
        //       key:'updateUser',
        //       align:'center'
        //   },
        //    {
        //       title:'审核时间',
        //       key:'auditTime',
        //       align:'center'
        //   },
        //   {
        //       title:'审核人',
        //       key:'auditUser',
        //       align:'center'
        //   },
        // ],
       
      }
    },
    methods: {
      tableRowClick(rowData, rowIndex) {
       this.formDetailData ={} // 清除上次缓存数据 增加体验良好
       this.masterRowSelection = rowData;
       if(rowData!=null){
          // 是否 确认 审核 反审核 删除 禁用等 提示标题 列数据
          this.currrentRowItem.rowName=rowData.purCode+' '+rowData.purName
       }
     },
    },
   
  }
</script>

<style>
</style>
