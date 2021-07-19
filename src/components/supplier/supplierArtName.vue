<template>
  <editWindow :draggable="false" :zindex="10" width="500" class="preferential" v-model="showWindow" @on-ok="preferentialOk"  :fullscreen="false" title="修改供应商配纸">

      <Form :label-colon="true" :label-width="40" :model="formData" ref="editFormItem">
        <Row>
          <Col span="7">
          <FormItem>
              <Input @on-blur="inputBlurEvent(formData.value1)"   v-model="formData.value1" clearable></Input>
          </FormItem>
          </Col>
          <Col span="7">
          <FormItem>
              <Input @on-blur="inputBlurEvent(formData.value2)"   v-model="formData.value2" clearable></Input>
          </FormItem>
          </Col>
          <Col span="7">
          <FormItem >
            <Input @on-blur="inputBlurEvent(formData.value3)"   v-model="formData.value3" clearable></Input>
          </FormItem>
          </Col>
          <Col span="7">
          <FormItem>
              <Input @on-blur="inputBlurEvent(formData.value4)"   v-model="formData.value4" clearable></Input>
          </FormItem>
          </Col>
          <Col span="7">
          <FormItem>
              <Input @on-blur="inputBlurEvent(formData.value5)"   v-model="formData.value5" clearable></Input>
          </FormItem>
          </Col>
          <Col span="7">
          <FormItem >
            <Input @on-blur="inputBlurEvent(formData.value6)"   v-model="formData.value6" clearable></Input>
          </FormItem>
          </Col>
          <Col span="7">
          <FormItem>
              <Input @on-blur="inputBlurEvent(formData.value7)"   v-model="formData.value7" clearable></Input>
          </FormItem>
          </Col>
          <Col span="7">
          <FormItem>
              <Input @on-blur="inputBlurEvent(formData.value8)"   v-model="formData.value8" clearable></Input>
          </FormItem>
          </Col>
          <Col span="7">
          <FormItem >
            <Input @on-blur="inputBlurEvent(formData.value9)"   v-model="formData.value9" clearable></Input>
          </FormItem>
          </Col>
          <Col span="14">
          <FormItem :label-width="90" label="配纸报价">
            <Input v-model="formData.value10" disabled></Input>
          </FormItem>
          </Col>
        </Row>
      </Form>
     
  </editWindow>

</template>

<script>
  import editWindow from '../edit-window/edit-window'
  import request from "@/libs/request";
  import InputNumber from '@/components/input-number/input-number'
  export default {
    name: 'preferential',
    components: {
      editWindow,InputNumber
    },
    data() {
      return {
        formData:{
          value1:'',
          value2:'',
          value3:'',
          value4:'',
          value5:'',
          value6:'',
          value7:'',
          value8:'',
          value9:'',
          value10:0,
        },
        showWindow:false
      }
    },
    watch: {
      showWindow(n,o){
        this.$emit('input',n);
      },
      value(n,o){
        this.showWindow = n;
      },
    },
    created() {

    },
    props:{
      value:false,
      supplierArtData:{
        type:Object,
        default:function(){
          return {}
        }
      }
    },
    computed: {
      // priceUnitTextComptued() {
      //   if (this.preferential.priceMode == 0) {
      //     return '分';
      //   }
      //   return '%';
      // },
      // preferentialTextComptued() {
      //   return this.priceUnitItems[this.preferential.priceUnit] + this.getPreferentialText();
      // }
    },
    methods: {
      setsupplierArtName(){
        this.formData={
          value1:'',
          value2:'',
          value3:'',
          value4:'',
          value5:'',
          value6:'',
          value7:'',
          value8:'',
          value9:'',
          value10:0,
        }
      },
      inputBlurEvent(item){
        if(item==''){
          return
        }
        request.post('/purchase/purLbFee/detailPrice?lbCode='+this.supplierArtData.lbCode+"&spaperCode="+item+"&supplierId="+this.supplierArtData.supplierId).then(res=>{
           this.formData.value10+=Number(res)
        }).catch(err=>{

        })
        
      },
      preferentialOk() {
        this.$emit('preferential-ok',this.formData.value10);
        this.showWindow = false;
      },
    
    }
  }
</script>

<style>
  .preferential .ivu-form-item{
    margin-bottom: 0 !important;
  }

  .preferential .ivu-input[disabled], fieldset[disabled] .ivu-input{
    color: #666666;
  }
  .preferential .ivu-modal{
    width:30.625rem;
    min-width: 30rem;
  }
</style>
