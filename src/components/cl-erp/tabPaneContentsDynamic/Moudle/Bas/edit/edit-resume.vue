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
        :show-massage="false"
        :model="formDataInfo"
        :rules="ruleValidate"
        :label-width="80"
      >
        <FormItem label="摘要编号" prop="resumeCode">
          <Input
            v-model="formDataInfo.resumeCode"
            maxlength="20"
            placeholder="请输入摘要说明"
          ></Input>
        </FormItem>

        <FormItem label="摘要说明" prop="resumeName">
          <Input
            v-model="formDataInfo.resumeName"
            type="textarea"
            maxlength="100"
            :autosize="{ minRows: 2, maxRows: 5 }"
            placeholder="请输入摘要说明"
          ></Input>
        </FormItem>
        <FormItem label="摘要分类" prop="resumeType">
           <optionSearch @onChange="optionOnChange" :defaultItem="formDataInfo.resumeType" :loaddingDataWhen="showWindow"  query="resumeType"/>
          <!-- <Input
            v-model="formDataInfo.resumeType"
            maxlength="20"
            placeholder="请输入摘要分类 "
          ></Input> -->
        </FormItem>

         <FormItem label="备注" prop="remark">
          <Input
            v-model="formDataInfo.remark"
            type="textarea"
            maxlength="100"
            :autosize="{ minRows: 2, maxRows: 5 }"
            placeholder="请输入备注..."
          ></Input>
        </FormItem>
      </Form>
    </editWindow>
  </div>
</template>

<script>
/**
 * @desc edit-dept 描述
 * 所有重要 可以重用的方法 放在了基类,继承即可用重复使用 dyBaseMixins,
 * 可以根据需求重写所需的方法:
 *
 * @params 参数
 *
 * @return 返回
 *
 * @author Andy Huang
 *
 * @created 2019/11/20 17:07:54
 */
import optionSearch from '../../components/optionSearch'
import editBaseMixins from '../../mixins/edit'
import { customValidator, uniqueValidator } from '@/libs/validator'
const default_formDataInfo = {
  resumeCode: '',
  resumeName: '',
  resumeType: 'A',
  remark: ''
}
export default {
  name: 'edit-resume',
  mixins: [editBaseMixins],
  components: { optionSearch },
  data () {
    return {
      requestBaseUrl: '/bas/resume', // 请求 查询 操作的基础路径
      formDataInfo: Object.assign({}, default_formDataInfo), // 防止添加和更新数据提交发生冲突
      // 需要验证的数据
      ruleValidate: {
        resumeCode: [
          { required: true, message: '摘要编号不能为空', trigger: 'blur' },
          { validator: customValidator,
            trigger: 'blur',
            customRule: ['toCDB', 'identifier', 'spaceStr'],
            fieldDesc: '摘要编号' },
          {
            validator: uniqueValidator,
            trigger: 'blur',
            fieldDesc: '摘要编号',
            params: {
              fieldName: 'resumeCode',
              formName: 'resumeFm',
              id: () => {
                return this.formDataInfo.id
              }
            }
          }
        ],
        resumeType: [{ required: true, message: '摘要分类不能为空', trigger: 'blur' }],
        resumeName: [{ required: true, message: '摘要说明不能为空', trigger: 'blur' }]
      }
    }
  },

  methods: {
    // 重写父类,添加时候,清空数据
    HandleFormDataInfo () {
      this.formDataInfo = Object.assign({}, default_formDataInfo)
    }
  }
}
</script>

<style></style>
