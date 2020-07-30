<template>
  <div>
    <editWindow
      :title="actionLableName"
      v-model="showWindow"
      :fullscreen="false"
      width="50%"
      :loading="!isLoaddingDone"
      @on-ok="formDataSubmit()"
      :detailDisabled="detailDisabled"
    >
      <Form
        ref="formDataInfo"
        :show-massage="false"
        :model="formDataInfo"
        :rules="ruleValidate"
        :label-width="110"
        >
        <Row :gutter="18">
          <Col span="24">
            <FormItem label="部门编码" prop="deptCode">
              <referenceField v-model="formDataInfo.deptCode"
              :disabled="detailDisabled"
                maxlength="20"
                placeholder="请输入部门编码"
                :form-name="frommastername"
                :id="formDataInfo.id"
              ></referenceField>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="部门名称" prop="deptName">
              <Input :disabled="detailDisabled" v-model="formDataInfo.deptName" maxlength="80" placeholder="请输入部门名称"></Input>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="备注" prop="remark">
              <Input
                :disabled="detailDisabled"
                v-model="formDataInfo.remark"
                maxlength="100"
                placeholder="请输入备注..."
              ></Input>
            </FormItem>
          </Col>
        </Row>
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
import editBaseMixins from '../../mixins/edit'
import { customValidator, uniqueValidator } from '@/libs/validator'
import referenceField from '@/components/referenceField/referenceField'
const default_formDataInfo = {
  deptCode: '',
  deptName: '',
  remark: ''
}
export default {
  name: 'edit-dept',
  mixins: [editBaseMixins],
  components: {
    referenceField
  },

  data () {
    return {
      frommastername: 'deptFm',
      actionSubtitle: '部门信息', // 当前操作副标题
      requestBaseUrl: '/bas/dept', // 请求 查询 操作的基础路径
      formDataInfo: Object.assign({}, default_formDataInfo), // 防止添加和更新数据提交发生冲突
      // 需要验证的数据
      ruleValidate: {
        deptCode: [
          { required: true, message: '部门编号不能为空', trigger: 'blur' },
          {
            validator: customValidator,
            trigger: 'blur',
            customRule: ['identifier'],
            fieldDesc: '部门编号'
          },
          {
            validator: uniqueValidator,
            trigger: 'blur',
            fieldDesc: '部门编号',
            params: {
              fieldName: 'deptCode',
              formName: 'deptFm',
              id: () => {
                return this.formDataInfo.id
              }
            }
          }
        ],
        deptName: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' },
          {
            validator: customValidator,
            trigger: 'blur',
            customRule: ['toCDB', 'spaceStr', 'spaceStr'],
            fieldDesc: '部门名称'
          }
        ]
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
