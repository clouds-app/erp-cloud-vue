<template>
  <editWindow :draggable="false" :zindex="10"  :width="90+'%'" class="preferential" v-model="showWindow" @on-ok="preferentialOk"  :fullscreen="false" title="修改送货通知单">
       <div class="page">
          <Page :current="page.pageNumber" :total="page.total" :page-size="page.pageSize" simple @on-change="onPageNumberChange"/>
       </div>
       <vTable
        ref="vipTable"
        :pagination="true"
        :height="tableHeight-20"
        :columns="columnData"
        :query-params="{}"
        :table-data="tableData"
        @on-selection-change="selectGroupChange"
        @select-all="selectGroupChange"
        name="boxDeliPopFm"
      ></vTable>
     
  </editWindow>

</template>

<script>
  import editWindow from '@/components/edit-window/edit-window.vue'
  import request from "@/libs/request";
  import { deepCopy } from "view-design/src/utils/assist";
  import vTable from '@/components/tables/vTable'
  import axios from '@/libs/api.request'
  export default {
    name: 'preferential',
    components: {
      editWindow,vTable
    },
    data() {
      return {
        page:{
          pageNumber:1,
          total:0,
          pageSize:20,
          pages:0,//总页数
        },
        selectionItems:[],
        tableHeight:'',
        tableData:[],
        columnData:[],
        showWindow:false,
        bcNo:'',
        biDeEndDate:'',
        biDeStarDate:'',
        iisUser:''
      }
    },
    watch: {
      showWindow(n,o){
        this.$emit('input',n);
        if(n){
         this.bcNo = this.bcNos
         this.getTableData()
         this.getTableList()
        }else{
          this.tableData = []
        }
      },
      value(n,o){
        this.showWindow = n;
      },
    },
    created() {
        this.comptuedTableHeight()
    },
    props:{
      value:false,
      supplierArtData:{
        type:Object,
        default:function(){
          return {}
        }
      },
      bcNos:{
        type:String,
        default:''
      }
    },
    computed: {
    },
    methods: {
        selectGroupChange(selection){
           this.selectionItems = selection;
        },
        comptuedTableHeight() {
            // 计算table高度
            let height = document.body.offsetHeight
            //this.tableHeight = height*0.85+5
            this.tableHeight = height-160
        },
      preferentialOk() {
          if (this.selectionItems.length == 0) {
            this.$Message.warning('请选择内容');
            return;
          }
          this.$emit("preferential-ok",this.selectionItems)
          this.showWindow = false
      },
      getTableData(){
        request.get('/sys/form/init/boxDeliPopFm').then(res => {
            this.columnData = res.columns.boxDeliPopFm.listColumns
              this.columnData.unshift({
              type: 'selection',
              width: 40,
              titleAlign: 'center',
              align: 'center'
            });
        }).catch(()=>{
           
        });
      },
      getTableList(){
        let params={
          bcNo:this.bcNo,
          biDeEndDate:this.biDeEndDate,
          biDeStarDate:this.biDeStarDate,
          iisUser:this.iisUser
        }
         axios.request({
            url:'/sale/deliReq/sub/getOrderMain',
            params: this.page,
            method: 'post',
            data: params
          }).then(res => {
            let data = res.data.result
            this.tableData = data.records
            this.page.pageNumber = parseInt(data.current)
            this.page.pageSize = parseInt(data.size)
            this.page.total = parseInt(data.total)
            this.page.pages = parseInt(data.pages)
          })
      },
        // 分页页码改变
      onPageNumberChange(pageNumber){
        this.page.pageNumber = pageNumber
        this.getTableList()
      },
    }
  }
</script>

<style  lang="scss" scoped>
  .preferential{
      overflow: hidden;
  }
  .page{
    display: flex;
    justify-content: flex-end;
  }
</style>
