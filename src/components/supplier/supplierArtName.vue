<template>
  <editWindow :draggable="false" :zindex="10" width="500" class="preferential" v-model="showWindow" @on-ok="preferentialOk"  :fullscreen="false" title="修改供应商配纸">

      <Form :label-colon="true" :label-width="40" :model="formData" ref="editFormItem">
        <Row>
          <Col span="7">
          <FormItem>
              <popup
                v-model="formData.value1"
                field-name="value1"
                popup-name="paperCodeMultiPriceBox"
                :fill-model.sync="formData"
                render-fields="value1"
                from-fields="paperCode"
                @on-fill="producibleLbCodesvalidator"
              />
            </FormItem>
          </Col>
          <Col span="7">
          <FormItem>
               <popup
                v-model="formData.value2"
                field-name="value2"
                popup-name="paperCodeMultiPriceBox"
                :fill-model.sync="formData"
                render-fields="value2"
                from-fields="paperCode"
                @on-fill="producibleLbCodesvalidator"
              />
          </FormItem>
          </Col>
          <Col span="7">
          <FormItem >
             <popup
                v-model="formData.value3"
                field-name="value3"
                popup-name="paperCodeMultiPriceBox"
                :fill-model.sync="formData"
                render-fields="value3"
                from-fields="paperCode"
                @on-fill="producibleLbCodesvalidator"
              />
          </FormItem>
          </Col>
          <Col span="7">
          <FormItem>
               <popup
                v-model="formData.value4"
                field-name="value4"
                popup-name="paperCodeMultiPriceBox"
                :fill-model.sync="formData"
                render-fields="value4"
                from-fields="paperCode"
                @on-fill="producibleLbCodesvalidator"
              />
          </FormItem>
          </Col>
          <Col span="7">
          <FormItem>
               <popup
                v-model="formData.value5"
                field-name="value5"
                popup-name="paperCodeMultiPriceBox"
                :fill-model.sync="formData"
                render-fields="value5"
                from-fields="paperCode"
                @on-fill="producibleLbCodesvalidator"
              />
          </FormItem>
          </Col>
          <Col span="7">
          <FormItem >
              <popup
                v-model="formData.value6"
                field-name="value6"
                popup-name="paperCodeMultiPriceBox"
                :fill-model.sync="formData"
                render-fields="value6"
                from-fields="paperCode"
                @on-fill="producibleLbCodesvalidator"
              />          </FormItem>
          </Col>
          <Col span="7">
          <FormItem>
              <popup
                v-model="formData.value7"
                field-name="value7"
                popup-name="paperCodeMultiPriceBox"
                :fill-model.sync="formData"
                render-fields="value7"
                from-fields="paperCode"
                @on-fill="producibleLbCodesvalidator"
              />
          </FormItem>
          </Col>
          <Col span="7">
          <FormItem>
               <popup
                v-model="formData.value8"
                field-name="value8"
                popup-name="paperCodeMultiPriceBox"
                :fill-model.sync="formData"
                render-fields="value8"
                from-fields="paperCode"
                @on-fill="producibleLbCodesvalidator"
              />
          </FormItem>
          </Col>
          <Col span="7">
          <FormItem >
             <popup
                v-model="formData.value9"
                field-name="value9"
                popup-name="paperCodeMultiPriceBox"
                :fill-model.sync="formData"
                render-fields="value9"
                from-fields="paperCode"
                @on-fill="producibleLbCodesvalidator"
              />
          </FormItem>
          </Col>
         
         
          
        </Row>
        <Row>
           <Col span="9">
          <FormItem  :label-width="110" label="原纸报价">
            <Input class="elInput" v-model="formData.value11" disabled></Input>
          </FormItem>
          </Col>
        </Row>
         <Row>
            <Col span="9">
          <FormItem :label-width="110" label="楞别加价">
            <Input class="elInput" v-model="formData.value12" disabled></Input>
          </FormItem>
          </Col>
        </Row>
         <Row>
           <Col span="9">
          <FormItem :label-width="110" label="配纸报价">
            <Input class="elInput" v-model="formData.value10" disabled></Input>
          </FormItem>
          </Col>
        </Row>
      </Form>
     
  </editWindow>

</template>

<script>
const default_inputValue={
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
          value11:0,
          value12:0,
        
}
  import popup from '@/components/popup/popup'
  import editWindow from '../edit-window/edit-window'
  import request from "@/libs/request";
  import InputNumber from '@/components/input-number/input-number'
  import { deepCopy } from "view-design/src/utils/assist";
  export default {
    name: 'preferential',
    components: {
      editWindow,InputNumber,popup
    },
    data() {
      return {
        formData:deepCopy(default_inputValue),
        inputValue:deepCopy(default_inputValue),
        paperCodeList:deepCopy(default_inputValue),
        lbPriceList:deepCopy(default_inputValue),
        showWindow:false
      }
    },
    watch: {
      showWindow(n,o){
        this.$emit('input',n);
        if(!n){
           this.setsupplierArtName()
        }else{
          if(this.inputdata.value10){
             this.formData=deepCopy(this.inputdata)
             this.inputValue=deepCopy(this.inputValueList)
             this.paperCodeList=deepCopy(this.paperCodeValueList)
             this.lbPriceList=deepCopy(this.lbPriceValueList)
          }
        }
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
      ,inputdata:{
        type:Object,
        default:function(){
          return {}
        }
      },
      inputValueList:{
        type:Object,
        default:function(){
          return {}
        }
      },
      paperCodeValueList:{
        type:Object,
        default:function(){
          return {}
        }
      },
      lbPriceValueList:{
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
       // 可生产楞别回调
    producibleLbCodesvalidator (item) {
      let {data,fieldName,orignData} = item[0]
       if(data[fieldName]==undefined){
          this.inputValue[fieldName]=0
          this.paperCodeList[fieldName]=0
          this.lbPriceList[fieldName]=0
          let value1 = 0
          let value2 = 0
          let value3 = 0
          for(let i in this.inputValue){
             value1 +=Number(this.inputValue[i])
             value2 +=Number(this.paperCodeList[i])
             value3 +=Number(this.lbPriceList[i])
          }
          this.formData.value10 = value1
          this.formData.value11 = value2
          this.formData.value12 = value3
          return
        }
        request.post('/purchase/purLbFee/detailPrice?lbCode='+this.supplierArtData.lbCode+"&spaperCode="+data[fieldName]+"&supplierId="+this.supplierArtData.supplierId).then(res=>{
           this.inputValue[fieldName]=res.total
           this.paperCodeList[fieldName]=res.paperCode
           this.lbPriceList[fieldName]=res.lbPrice
           let value1 = 0
           let value2 = 0
           let value3 = 0
           for(let i in this.inputValue){
             value1 +=Number(this.inputValue[i])
             value2 +=Number(this.paperCodeList[i])
             value3 +=Number(this.lbPriceList[i])
           }
          this.formData.value10 = value1
          this.formData.value11 = value2
          this.formData.value12 = value3
        }).catch(err=>{

        })
    },
      setsupplierArtName(){
        this.formData=deepCopy(default_inputValue)
        this.inputValue=deepCopy(default_inputValue)
        this.paperCodeList=deepCopy(default_inputValue)
        this.lbPriceList=deepCopy(default_inputValue)
      },
      preferentialOk() {
        this.$emit("setsupplierArtName",this.formData,this.inputValue,this.paperCodeList,this.lbPriceList)
        this.$emit('preferential-ok',this.formData.value10);
        this.showWindow = false;
      },
    
    }
  }
</script>

<style  lang="scss" scoped>
  .elInput ::v-deep .ivu-input-small{
    text-align: right;
  }
</style>
