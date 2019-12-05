<template>
<!-- 角色资源 -->
  <Row>
    <Col span="5">
      <Card dis-hover>
         <p slot="title">菜单</p>
          <Tree :data="resourceTreeData" @on-select-change="treeSelectEvent"></Tree>
          <Spin size="large" fix v-if="treeLoading"></Spin>
       </Card>
    </Col>
    <Col span="19">
      <vTable ref="table" :height="400" :columns="authBtnColumns" :table-data.sync="resourceList" @test-m="resourceTreeData=[]"></vTable>
       <Spin size="large" fix v-if="resourceLoadding"></Spin>
    </Col>
  </Row>

</template>

<script>
   import request from '@/libs/request'
   import vTable from '@/components/tables/vTable'
   export default{
     components:{vTable},
     data(){

       return {
         treeLoading:true,
         resourceLoadding:false,
         resourceTreeData:[],
         columnClickStatus:{},
         columnNames:['iisShow','iisAdd','iisEdit','iisDel','iisMoney','iisPrint','iisAudit','iisNotAudit','iisExport','iisImport'],
         selectAllStatus:false,
         authBtnColumns:[
           {
             key:'resourceName',
             title:'模块名称',
             titleAlign:'center',
             align:'right'
           },{
             key:'iisShow',
             title:'显示',
             align:'center',
             titleAlign:'center',
             renderHeader:(h,params)=>{
               return h('div',{
                 style:{
                   cursor: 'pointer'
                 },
                 on:{
                   'click':()=>{
                     this.columnClick(params.column.key);
                   }
                 }
               },params.column.title);
             },
             render:(h,params)=>{
               return h('Checkbox',{
                 props:{
                   value : params.row.iisShow,
                   size : 'small'
                 },on:{
                   'on-change':value => {
                     this.$set(this.roleResourceList[params.row.index],'iisShow',value);
                   }
                 }
               })
             }
           },{
             key:'iisAdd',
             title:'添加',
             align:'center',
             titleAlign:'center',
             render:(h,params)=>{
               return h('Checkbox',{
                 props:{
                   value : params.row.iisAdd,
                   size : 'small'
                 },on:{
                   'on-change':value => {
                     this.$set(this.roleResourceList[params.row.index],'iisAdd',value);
                   }
                 }
               })
             },
             renderHeader:(h,params)=>{
               return h('div',{
                 style:{
                   cursor: 'pointer'
                 },
                 on:{
                   'click':()=>{
                     this.columnClick(params.column.key);
                   }
                 }
               },params.column.title);
             }
           },{
             key:'iisEdit',
             title:'修改',
             titleAlign:'center',
             align:'center',
             render:(h,params)=>{
               return h('Checkbox',{
                 props:{
                   value : params.row.iisEdit,
                   size : 'small'
                 },on:{
                   'on-change':value => {
                     this.$set(this.roleResourceList[params.row.index],'iisEdit',value);
                   }
                 }
               })
             },
             renderHeader:(h,params)=>{
               return h('div',{
                 style:{
                   cursor: 'pointer'
                 },
                 on:{
                   'click':()=>{
                     this.columnClick(params.column.key);
                   }
                 }
               },params.column.title);
             }
           },{
             key:'iisDel',
             title:'删除',
             titleAlign:'center',
             align:'center',
             render:(h,params)=>{
               return h('Checkbox',{
                 props:{
                   value : params.row.iisDel,
                   size : 'small'
                 },on:{
                   'on-change':value => {
                     this.$set(this.roleResourceList[params.row.index],'iisDel',value);
                   }
                 }
               })
             },
             renderHeader:(h,params)=>{
               return h('div',{
                 style:{
                   cursor: 'pointer'
                 },
                 on:{
                   'click':()=>{
                     this.columnClick(params.column.key);
                   }
                 }
               },params.column.title);
             }
           },{
             key:'iisMoney',
             title:'金额',
             titleAlign:'center',
             align:'center',
             render:(h,params)=>{
               return h('Checkbox',{
                 props:{
                   value : params.row.iisMoney,
                   size : 'small'
                 },on:{
                   'on-change':value => {
                     this.$set(this.roleResourceList[params.row.index],'iisMoney',value);
                   }
                 }
               })
             },
             renderHeader:(h,params)=>{
               return h('div',{
                 style:{
                   cursor: 'pointer'
                 },
                 on:{
                   'click':()=>{
                     this.columnClick(params.column.key);
                   }
                 }
               },params.column.title);
             }
           },{
             key:'iisPrint',
             title:'打印',
             titleAlign:'center',
             align:'center',
             render:(h,params)=>{
               return h('Checkbox',{
                 props:{
                   value : params.row.iisPrint,
                   size : 'small'
                 },on:{
                   'on-change':value => {
                     this.$set(this.roleResourceList[params.row.index],'iisPrint',value);
                   }
                 }
               })
             },
             renderHeader:(h,params)=>{
               return h('div',{
                 style:{
                   cursor: 'pointer'
                 },
                 on:{
                   'click':()=>{
                     this.columnClick(params.column.key);
                   }
                 }
               },params.column.title);
             }
           },{
             key:'iisAudit',
             title:'审核',
             titleAlign:'center',
             align:'center',
             render:(h,params)=>{
               return h('Checkbox',{
                 props:{
                   value : params.row.iisAudit,
                   size : 'small'
                 },on:{
                   'on-change':value => {
                     params.row.iisAudit = value;
                     this.$set(this.roleResourceList[params.row.index],'iisAudit',value);
                   }
                 }
               })
             },
             renderHeader:(h,params)=>{
               return h('div',{
                 style:{
                   cursor: 'pointer'
                 },
                 on:{
                   'click':()=>{
                     this.columnClick(params.column.key);
                   }
                 }
               },params.column.title);
             }
           },{
             key:'iisNotAudit',
             title:'反审',
             titleAlign:'center',
             align:'center',
             render:(h,params)=>{
               return h('Checkbox',{
                 props:{
                   value : params.row.iisNotAudit,
                   size : 'small'
                 },on:{
                   'on-change':value => {
                     this.$set(this.roleResourceList[params.row.index],'iisNotAudit',value);
                   }
                 }
               })
             },
             renderHeader:(h,params)=>{
               return h('div',{
                 style:{
                   cursor: 'pointer'
                 },
                 on:{
                   'click':()=>{
                     this.columnClick(params.column.key);
                   }
                 }
               },params.column.title);
             }
           },{
             key:'iisImport',
             title:'导入',
             titleAlign:'center',
             align:'center',
             render:(h,params)=>{
               return h('Checkbox',{
                 props:{
                   value : params.row.iisImport,
                   size : 'small'
                 },on:{
                   'on-change':value => {
                     this.$set(this.roleResourceList[params.row.index],'iisImport',value);
                   }
                 }
               })
             },
             renderHeader:(h,params)=>{
               return h('div',{
                 style:{
                   cursor: 'pointer'
                 },
                 on:{
                   'click':()=>{
                     this.columnClick(params.column.key);
                   }
                 }
               },params.column.title);
             }
           },{
             key:'iisExport',
             title:'导出',
             titleAlign:'center',
             align:'center',
             render:(h,params)=>{
               return h('Checkbox',{
                 props:{
                   value : params.row.iisExport,
                   size : 'small'
                 },on:{
                   'on-change':value => {
                     this.$set(this.roleResourceList[params.row.index],'iisExport',value);
                   }
                 }
               })
             },
             renderHeader:(h,params)=>{
               return h('div',{
                 style:{
                   cursor: 'pointer'
                 },
                 on:{
                   'click':()=>{
                     this.columnClick(params.column.key);
                   }
                 }
               },params.column.title);
             }
           }
         ],
         roleResourceList:[],
         treeSelectedId:''
       }
     },computed:{
       resourceList(){
         //获取选中节点的资源
         return this.roleResourceList.filter((item,index)=>{
           item['index'] = index;
           return item.parentPath.indexOf(this.treeSelectedId) != -1 || item.resourceId == this.treeSelectedId;
         });
       }
     },methods:{
       getResourceTree(){
         this.treeLoading = true;
          request.get('/sys/resource/tree').then(res => {
            this.resourceTreeData.push({
              title: '标准模块',
              expand: true,
              children:res.common,
              id:'0'
            },{
              title: '非标模块',
              expand: true,
              children:res.owner
            });
            this.treeLoading = false;
          }).catch(()=>{
            this.treeLoading = false;
          });
       },
       getRoleResourceList(roleId){
         //sys/
         this.resourceLoadding = true;
         request.get('/sys/role/resource',{},{roleId:roleId}).then(res => {
           this.roleResourceList = res;
           this.resourceLoadding = false;
         }).catch(()=>{
           this.resourceLoadding = false;
         });
       },columnClick(columnName,selectAll){
         //列选中
         let status = !this.columnClickStatus[columnName];
         if(selectAll){
           status = this.selectAllStatus;
         }
         this.resourceList.forEach((item)=>{
           this.roleResourceList[item.index][columnName] = status;
         });
         this.columnClickStatus[columnName] = status;
       },treeSelectEvent(a,b){
         this.treeSelectedId = b.id;
       }
     },created() {
       this.getResourceTree();
       //this.getResourceList();
     },mounted() {

     }
   }
</script>

<style>
</style>
