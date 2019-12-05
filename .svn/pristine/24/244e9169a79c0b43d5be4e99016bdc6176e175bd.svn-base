<template>

<!-- <div style="padding: 50px;">
<br/>
  <Button type="primary" @click="formDesign">表单设计</Button>
  <Button type="primary" @click="formDesign">表单设计</Button> 
<br/>
<Divider>弹出框示例</Divider>
   <Row :gutter="20">
     <Col span="4">
       <popup v-model="editFormItem.main.piRemark"
       					   field-name="piRemark"
                    :disabled="false"
       					   popup-name="dicPopup"
       					   :fill-model.sync="editFormItem.main"
       					   render-fields="piRemark,piNo"
       		         from-fields="dicLabel,dicValue"
       		         :suffix="true"
       		         :suffix-model="editFormItem.main.piNo"
       					   :query-params="{}">
       	</popup>
     </Col>

     <Col span="4">
       <popup v-model="editFormItem.main.piRemark"
       					   field-name="piRemark"
                    :disabled="false"
       					   popup-name="dicPopup"
       					   :fill-model.sync="editFormItem.main"
       					   render-fields="piRemark,piNo"
       		         from-fields="dicLabel,dicValue"
       					   :query-params="{}">
         	</popup>
     </Col>
   </Row>
</div> -->


</template>

<script>
    import popup from '@/components/popup/popup'
    export default{
      components:{popup},
      data(){
        return {
          editFormItem:{
            main:{
              piRemark:'',
              piNo:''
            }
          }
        }
      },
      methods:{
        formDesign(){
          this.$router.push({
            name:'formDesign'
          })
        }
      }
    }
</script>

<style>
</style>
