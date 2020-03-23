<template>
  <Input
   size="small"
   v-bind="$attrs"
   v-on="$listeners"
   :disabled="disabled"
   >
  </Input>
</template>

<script>
  import request from "@/libs/request";
  export default{
    data(){
      return {
        disabled:false
      }
    },props:{
      formName:String,
      id:[String,Number]
    },
    watch:{
      id(n,o){
        if(n && n!=''){
          this.getReferce();
        }else{
          this.disabled = false;
        }
      }
    },
    methods:{
      getReferce(){
        if(this.formName && this.formName != '' && this.id && this.id !=''){
          request.post('/sys/form/validator/referenceData',{
            formName:this.formName,
            id:this.id
          }).then(res=>{
            this.disabled = res;
          });
        }
      }
    },created() {

    }
  }
</script>

<style>
</style>
