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
      <vTable :height="tableHeight " ref="master_list_table" :columns="columns" url="/bas/printMarks/page" :pagination="true" @row-click="tableRowClick"></vTable>
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
import editForm from './edit/edit-printMarks'
import listBaseMixins from "../mixins/list";
  export default {
   mixins: [listBaseMixins],
   components: {
       editForm,htmlTemplate,vTable
      },
    data() {
      return {
        functionParams:{
            requestBaseUrl: '/bas/printMarks',
            uniqueId:'printMarksId'
        },
       // 查询参数 ,注意格式
        queryParamsDefault:[
            {
            title: '请输入产品编码',
            code:'productId',
            productId:''
           },
           {
            title: '请输入印唛编码',
            name:'pmNo',
            pmNo: '',
          },
        ],
        columns: [
           {
            title: '产品编码',
            key: 'productId',
            align: 'center'
          },
           {
            title: '印唛编码',
            key: 'pmNo',
            align: 'center'
          },
          {
            title: '侧唛（一）',
            key: 'pmCMRemark1',
            align: 'center'
          },
           {
            title: '侧唛（二）',
            key: 'pmCMRemark2',
            align: 'center'
          },
          {
            title: '文档1路径',
            key: 'pmDocNo1',
            align: 'center'
          },
           {
            title: '文档2路径',
            key: 'pmDocNo2',
            align: 'center'
          },
          {
            title: '上摇（一）',
            key: 'pmSYRemark1',
            align: 'center'
          },
           {
            title: '上摇（二）',
            key: 'pmSYRemark2',
            align: 'center'
          },
          {
            title: '下摇（一）',
            key: 'pmXYRemark1',
            align: 'center'
          },
           {
            title: '下摇（二）',
            key: 'pmXYRemark2',
            align: 'center'
          },
          {
            title: '正唛（一）',
            key: 'pmZMRemark1',
            align: 'center'
          },
           {
            title: '正唛（二）',
            key: 'pmZMRemark2',
            align: 'center'
          },
          
          
           
           {
              title:'审核状态',
              key:'iisAudit',
              align:'center'
          },
          
           {
              title:'备注',
              key:'remark',
              align:'center'
          },
           {
              title:'状态',
              key:'status',
              align:'center'
          },
          {
              title:'0私用,1公用',
              key:'iisPublic',
              align:'center',
          },
          {
              title:'创建时间',
              key:'createTime',
              align:'center'
          },
          {
              title:'创建人',
              key:'createUser',
              align:'center'
          },
           
          {
              title:'修改时间',
              key:'updateTime',
              align:'center'
          },
          {
              title:'修改人',
              key:'updateUser',
              align:'center'
          },
           {
              title:'审核时间',
              key:'auditTime',
              align:'center'
          },
          {
              title:'审核人',
              key:'auditUser',
              align:'center'
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
          this.currrentRowItem.rowName=rowData.productId+' '+rowData.pmNo
       }
     },
    },
   
  }
</script>

<style>
</style>
