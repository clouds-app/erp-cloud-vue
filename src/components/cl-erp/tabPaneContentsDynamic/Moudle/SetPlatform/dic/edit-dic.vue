<template>
  <div>
    <editWindow
      :title="actionLableName"
      v-model="showWindow"
      :fullscreen="false"
      width="30%"
      :loading="!isLoaddingDone"
      @on-ok="formDataSubmit()"
    >
      <Form
        ref="formDataInfo"
        :model="formDataInfo"
        :rules="ruleValidate"
        :label-width="110"
      >
        <FormItem label="数据字典名称" prop="dicLabel">
          <Input
            v-model="formDataInfo.dicLabel"
            maxlength="20"
            placeholder="请输入数据字典名称"
          ></Input>
        </FormItem>
        <FormItem label="数据字典Key" prop="dicValue">
          <Input
            v-model="formDataInfo.dicValue"
            maxlength="20"
            placeholder="请输入数据字典Key"
          ></Input>
        </FormItem>

        <FormItem label="序号" prop="dicSort">
          <Input
            v-model="formDataInfo.dicSort"
            maxlength="20"
            placeholder="请输入序号"
          ></Input>
        </FormItem>

        <FormItem label="国际化">
          <Input
            v-model="formDataInfo.dicI18n"
            maxlength="20"
            placeholder="请输入国际化"
          ></Input>
        </FormItem>
         <!-- <FormItem label="id">
          <Input
            v-model="formDataInfo.id"
            maxlength="20"
            placeholder="id"
          ></Input>
        </FormItem> -->
      </Form>
    </editWindow>
  </div>
</template>

<script>
/**
 * @desc edit-dic 描述
 * 所有重要 可以重用的方法 放在了基类,继承即可用重复使用
 * 可以根据需求重写所需的方法:
 */
import editBaseMixins from "../../mixins/edit";
const default_formDataInfo ={
        dicLabel: "",
        dicValue: "",
        dicSort: "10",
        dicI18n: "",
        parentId:"0",
      }
export default {
  name: "edit-dic",
  mixins: [editBaseMixins],
  props:{
      parentId:{
          type:String|Number,
          default:"0"
      }
  },
  data() {
    return {
      requestBaseUrl: "/sys/dic", // 请求 查询 操作的基础路径
      formDataInfo:Object.assign({},default_formDataInfo),// 防止添加和更新数据提交发生冲突
      // 需要验证的数据
      ruleValidate: {
        dicLabel: [{ required: true, message: "数据字典名称不能为空", trigger: "blur" }],
        dicValue: [{ required: true, message: "数据字典Key不能为空", trigger: "blur" }],
        dicSort: [{ required: true, message: "序号不能为空", trigger: "blur" }],
      }
    };
  },

  methods: {
     //加载页面时, 重写父类,添加时候,清空数据,重置所需字段
    HandleFormDataInfo(){
     this.formDataInfo=Object.assign({},default_formDataInfo)
    },
    //提交数据时,重写父类 修改一些提交的数据
    resetAddformDataInfo(_data){
        // debugger
      // 时间格式化
       if(!!this.parentId){
         _data.parentId = this.parentId
       }

      return _data
    },
  }
};
</script>

<style></style>
