<template>
  <div>
    <editWindow
      class="cl-edit-machine"
      :title="actionLableName"
      v-model="showWindow"
      :fullscreen="false"
      width="60%"
      :loading="!isLoaddingDone"
      @on-ok="formDataSubmit()"
    >
      <Form
        ref="formDataInfo"
        :show-message="true"
        :model="formDataInfo"
        :rules="ruleValidate"
        :label-width="100"
      >
        <Row :gutter="18">
          <Col span="12">
            <FormItem label="机台编号" prop="moCode">
              <Input v-model="formDataInfo.moCode" maxlength="20" placeholder="请输入机台编号"></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="机台名称" prop="moName">
              <Input v-model="formDataInfo.moName" maxlength="20" placeholder="机台名称"></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="产能单位" prop="bwpiUnit">
              <optionSearch
                @onChange="optionOnChange"
                :defaultItem="formDataInfo.bwpiUnit"
                :loaddingDataWhen="showWindow"
                formKey="bwpiUnit"
                query="bwpiUnit"
              />

              <!-- <Input
                v-model="formDataInfo.bwpiUnitText"
                maxlength="20"
                placeholder="请输入产能单位"
              ></Input>-->
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="工作参量" prop="bwpiParamNum">
              <Input
                v-model="formDataInfo.bwpiParamNum"
                type="number"
                maxlength="20"
                placeholder="工作参量"
              ></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="换单间隔" prop="moInteral">
              <Input
                v-model="formDataInfo.moInteral"
                type="number"
                maxlength="20"
                placeholder="换单间隔(分钟)"
              ></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="机台类型" prop="moTypeText">
              <optionSearch
                @onChange="optionOnChange"
                :defaultItem="formDataInfo.moType"
                :loaddingDataWhen="showWindow"
                formKey="moType"
                query="wpType"
              />
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="最大尺寸长" prop="maxLength">
              <Input
                v-model="formDataInfo.maxLength"
                type="number"
                maxlength="20"
                placeholder="纸度废边mm"
              ></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="最大尺寸宽" prop="maxWidth">
              <Input
                v-model="formDataInfo.maxWidth"
                type="number"
                maxlength="20"
                placeholder="最大尺寸宽"
              ></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="最小尺寸长" prop="minLength">
              <Input
                v-model="formDataInfo.minLength"
                type="number"
                maxlength="20"
                placeholder="最小尺寸长"
              ></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="最小尺寸宽" prop="minWidth">
              <Input
                v-model="formDataInfo.minWidth"
                type="number"
                maxlength="20"
                placeholder="最小尺寸宽"
              ></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="备注" prop="remark">
              <Input
                v-model="formDataInfo.remark"
                type="textarea"
                maxlength="100"
                :autosize="{ minRows: 2, maxRows: 5 }"
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
import optionSearch from '../../components/optionSearch'
import editBaseMixins from '../../mixins/edit'
import { customValidator, uniqueValidator } from '@/libs/validator'

const default_formDataInfo = {
  moCode: '',
  moName: '',
  bwpiUnitText: '',
  moInteral: '',
  remark: '',
  bwpiParamNum: 0,
  bwpiUnit: 0,
  maxLength: 0,
  maxWidth: 0,
  minLength: 0,
  minWidth: 0
}
export default {
  name: 'edit-machine',
  mixins: [editBaseMixins],
  components: { optionSearch, optionSearch },
  data () {
    return {
      requestBaseUrl: '/bas/machine', // 请求 查询 操作的基础路径
      formDataInfo: Object.assign({}, default_formDataInfo), // 防止添加和更新数据提交发生冲突
      // 需要验证的数据
      ruleValidate: {
        moCode: [{ required: true, message: '机台编号不能为空', trigger: 'blur' },
          { validator: customValidator,
            trigger: 'blur',
            customRule: ['toCDB', 'identifier', 'spaceStr'],
            fieldDesc: '机台编号' },
          {
            validator: uniqueValidator,
            trigger: 'blur',
            fieldDesc: '机台编号',
            params: {
              fieldName: 'moCode',
              formName: 'machine',
              id: () => {
                return this.formDataInfo.id
              }
            }
          }
        ],
        moName: [{ required: true, message: '机台名称不能为空', trigger: 'blur' },
          { validator: customValidator,
            trigger: 'blur',
            customRule: ['toCDB', 'spaceStr'],
            fieldDesc: '机台名称' }

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

<style>
.cl-edit-machine.ivu-select-item {
  display: block;
}
</style>
