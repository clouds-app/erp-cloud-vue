<template>
  <div>
    <div>
      <div class="popup-box">
        <popupField v-model="popupFieldValue" :query-params="queryParams" :popup-name="popupName" :field-name="fieldName"
          :disabled="disabled" :fillMapping="fillMapping" @on-fill="onFill" @on-click="onClick" @input="inputEvent"></popupField>
        <Input class="right-text" v-model="suffixValue" v-if="suffix" size="small" :disabled="disabled"></Input>
      </div>
    </div>
    <div>
      <popup-window ref="popupWindow" @on-ok="onOk" v-model="popupShow" :popup-name="popupName" :queryParams="queryParams"></popup-window>
    </div>
  </div>
</template>

<script>
  import popupField from '../popup-field/popup-field'
  import popupWindow from '../popup-window/popup-window'
  export default {
    components: {
      popupField,
      popupWindow
    },
    name: 'popup',
    props: {
      value: {
        type:[String,Number,Date,Boolean]
      },
      queryParams: Object,
      popupName: String,
      fieldName: String,
      disabled: {
        type: Boolean,
        default: false
      },
      index: {
        type: Number,
        default: -1
      },
      fillModel: Object, //数据对象
      fillMapping: {
        type: Object,
        default: ()=>{
          return {};
        }
      }, //填充映射{a返回字段:b要填充的字段}
      fromFields: String,
      renderFields: String,
      initData: Object,
      suffix: {
        type: Boolean,
        default: false
      },
      suffixModel: {
        type:[String,Number,Date,Boolean]
      },
      suffixFromField: String,
      popupClickValidator: Function
    },
    data() {
      return {
        popupShow: false,
        isResize: false,
        suffixValue: '',
        fillModelObj:{},
        popupFieldValue:''
      }
    },
    watch: {
      value(n, o) {
        this.popupFieldValue = n;
        if (n == '') {
          this.suffixValue = '';
        }
      },
      suffixModel(n, o) {
        this.suffixValue = n;
      },fillMode:{
        deep:true,
        handler(n,o){
          this.fillModelObj = this.fillMode;
        }
      },popupFieldValue(n,o){
        this.$emit('input',n);
      }
    },
    methods: {
      onFill(item, isArray) {
        debugger;
        //数据填充
        let fillData = [];
        //如果结果是数组，需要替换当前行，并追加数据
        if (isArray) {
          let data = Object.assign(this.fillModelObj[this.index], JSON.parse(JSON.stringify(this.mappingReplace(item[0]))));
          this.$set(this.fillModelObj, this.index, data);
          fillData.push({
            index: this.index,
            data: data
          });
          if (Array.isArray(this.fillModelObj)) {
            if (item.length > 1) {
              for (let i = 1; i < item.length; i++) {
                if (this.initData) {
                  let init = JSON.parse(JSON.stringify(this.initData));
                  let pushData = Object.assign(init, JSON.parse(JSON.stringify(this.mappingReplace(item[i]))));
                  this.fillModelObj.push(pushData);
                  fillData.push({
                    index: (this.fillModelObj.length - 1),
                    data: pushData
                  });
                } else {
                  console.error('在添加行时没有传递initData,发生错误');
                }
              }
            }
          }
        } else {
          let data;
          if (this.index != -1 && Array.isArray(this.fillModelObj)) {
            data = Object.assign(this.fillModelObj[this.index], JSON.parse(JSON.stringify(this.mappingReplace(item))));
            this.$set(this.fillModelObj, this.index, data);
            fillData.push({
              index: this.index,
              data: data
            });
          } else {
            data = Object.assign({}, this.fillModelObj, JSON.parse(JSON.stringify(this.mappingReplace(item))));
            //this.$set(,data);
            console.log(data);
            this.fillModelObj = data;
            fillData.push({
              data: data
            });
          }
          this.$emit('update:fillModel', data);
        }
        this.$emit('on-fill', fillData);
      },
      onClick() {
        if (this.popupClickValidator) {
          let result = false;
          if (this.index != -1 && Array.isArray(this.fillModelObj)) {
            result = this.popupClickValidator(this.fillModelObj[this.index]);
          } else {
            result = this.popupClickValidator(this.fillModelObj);
          }
          if (!result) {
            return;
          }
        }
        if (!this.isResize) {
          this.$refs.popupWindow.resize();
          this.isResize = true;
        }
        this.popupShow = true;
      },
      onOk(item, isArray) {
        this.onFill(item, isArray);
      },
      mappingReplace(item) {
        //返回结果替换
        if (this.fillMapping && Object.keys(this.fillMapping).length > 0) {
          let data = {};
          for (let key in this.fillMapping) {
            data[this.fillMapping[key]] = item[key];
          }
          //return Object.assign(data,item);
          return data;
        }
        return item;
      },
      inputEvent(value) {
        this.$emit('input', value);
      }
    },
    created() {
      if (this.fromFields && this.renderFields) {
        let fromFields = this.fromFields.split(',');
        let renderField = this.renderFields.split(',');
        for (let i = 0; i < fromFields.length; i++) {
          this.fillMapping[fromFields[i]] = renderField[i];
        }
      }
    }
  }
</script>

<style>
</style>
