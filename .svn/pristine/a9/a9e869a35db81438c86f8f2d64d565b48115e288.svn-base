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
      <vTable :height="tableHeight " ref="master_list_table" columns-url="/sys/popup/specPriceFm/columns" url="/bas/specPrice/page" :pagination="true" @row-click="tableRowClick"></vTable>
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
import editForm from './edit/edit-specPrice'
import listBaseMixins from "../mixins/list";
  export default {
   mixins: [listBaseMixins],
   components: {
       editForm,htmlTemplate,vTable
      },
    data() {
      return {
        functionParams:{
            requestBaseUrl: '/bas/specPrice',
            uniqueId:'specPriceId'
        },
       // 查询参数 ,注意格式
        queryParamsDefault:[
            {
            title: '请输入客户id',
            code:'custId',
            custId:''
           },
           {
            title: '请输入盒式id',
            name:'boxId',
            boxId: '',
          },
        ],
        // columns: [
        //    {
        //     title: '客户id',
        //     key: 'custId',
        //     align: 'center'
        //   },
        //    {
        //     title: '盒式id',
        //     key: 'boxId',
        //     align: 'center'
        //   },
        //    {
        //       title:'面积公式',
        //       width:"110",
        //       key:'spAreaExpr',
        //       align:'center'
        //   },
        //   {
        //       title:'面积公式描述',
        //       width:"120",
        //       key:'spAreaExprMsg',
        //       align:'center'
        //   },
          
        //    {
        //       title:'厘米计价公式',
        //       width:"110",
        //       key:'spCMExpr',
        //       align:'center'
        //   },

        //    {
        //       title:'厘米计价公式描述',
        //       width:"120",
        //       key:'spCMExprMsg',
        //       align:'center'
        //   },
        //    {
        //       title:'英寸计价公式',
        //       width:"110",
        //       key:'spInchExpr',
        //       align:'center'
        //   },

        //    {
        //       title:'英寸计价公式描述',
        //       width:"130",
        //       key:'spInchExprMsg',
        //       align:'center'
        //   },
        //    {
        //       title:'重量公式',
        //       key:'spWeightExpr',
        //       align:'center'
        //   },

        //    {
        //       title:'重量公式描述',
        //       width:"130",
        //       key:'spWeightExprMsg',
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
          this.currrentRowItem.rowName=rowData.custId+' '+rowData.boxId
       }
     },
    },
   
  }
</script>

<style>
</style>
