<template>
  <div class="cl-Sys-prinMarks">
    <Row :style="{height:getHeight+'px'}">
      <Col span="5">
        <resourceTree  @on-select-change="treeSelectEvent"></resourceTree>
      </Col>
      <Col span="19">
        <Card dis-hover>
          <div id="str">
            <span>系统功能列表：</span>
            
          </div>

           <div id="twop">
            <span>使用截止时间</span>
            {{company.erpExpirationTime}}
          </div>

          <div id="onep">
             <span>开通时间</span>
            {{company.erpOpeningtime}}    
          </div>

         
          

            <vTable ref="table"
            :height="getHeight - 51"
            :columns="columns"
            :table-data.sync="resourceList"></vTable>
         </Card>

      </Col>
    </Row>
  </div>
</template>

<script>
    import resourceTree from '../resource-tree/resourceTree'
    import vTable from '@/components/tables/vTable'
    import request from '@/libs/request'
    export default{
      components:{resourceTree,vTable},
      computed:{
        getHeight(){
          return window.innerHeight - 100;
        }
      },
      data(){
        return {
          columns:[{
            title:'功能名称',
            key:'resourceName',
            align:'center'
          }/* ,{
            title:'功能类型',
            key:'resourceType'
          } */,{
            title:'启用',
            key:'status',
            align:'center',
            render:(h,param)=>{
              let value = param.row.status == 1;
              return h('Checkbox',{
                props:{
                  value:value,
                  small:'size',
                  disabled:true
                }
              })
            }
          }],
          resourceList:[],
          company:{}
        }
      },methods:{
        treeSelectEvent(a,b){
          this.resourceList = [];
          this.setResourceChild(b.children);
        },setResourceChild(resArray){
          resArray.forEach((item)=>{
            this.resourceList.push(item.data);
          });
        },getCompany(){
          request.post('/sys/user/company').then(res=>{
            this.company = res;
          })
        }
      },created() {
        this.getCompany();
      }
    }
</script>

<style>
#str{
  float: left;
  font-size: 16px;
  padding-top: 12px;
  padding-bottom: 12px;
}
#onep {
  padding-top: 12px;
  font-weight:bold; 
  float: right;
  width: 280px; 
}
#onep span {
  
 
}
#twop{
  padding-top: 12px;
  width: 300px; 
   float: right;
   font-weight:bold; 
}
#twop span{
  font-weight:bold; 
 color: red;
} 

</style>
