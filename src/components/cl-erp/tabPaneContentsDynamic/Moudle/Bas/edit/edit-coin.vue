<template>
  <div>
    <editWindow
      :title="actionLableName"
      v-model="showWindow"
      :fullscreen="false"
      width="50%"
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
        <FormItem label="货币编号" prop="coinCode">
          <referenceField
           ref='firstFocusInput'
            v-model="formDataInfo.coinCode"
            :disabled="detailDisabled"
            maxlength="20"
            placeholder="请输入货币编号"
            :form-name="frommastername"
            :id="formDataInfo.id"
          ></referenceField>
        </FormItem>
        <FormItem label="货币名称" prop="coinName">
          <Input
            v-model="formDataInfo.coinName"
            :disabled="detailDisabled"
            maxlength="20"
            placeholder="请输入货币名称"
          ></Input>
        </FormItem>
        <FormItem label="汇率" prop="coinRate">
          <InputNumber
            v-model="formDataInfo.coinRate"
            :disabled="detailDisabled"
            :formatter="value => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
            :parser="value => value.replace(/\$\s?|(,*)/g, '')"
            style="width:100%"
            maxlength="20"
            placeholder="请输入汇率"
          ></InputNumber>
        </FormItem>
        <FormItem label="日期">
         <DatePicker type="datetime" :disabled="detailDisabled"  format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期" v-model="formDataInfo.coinDate"></DatePicker>
        </FormItem>

        <FormItem label="备注" prop="remark">
          <Input
            v-model="formDataInfo.remark"
            :disabled="detailDisabled"
            maxlength="100"
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
import dayjs from 'dayjs'
import referenceField from '@/components/referenceField/referenceField'
import editBaseMixins from '../../mixins/edit'
import { customValidator, uniqueValidator } from '@/libs/validator'
const default_formDataInfo = {
  coinCode: '',
  coinName: '',
  coinRate: 0,
  coinDate: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  remark: ''
}
export default {
  name: 'edit-coin',
  mixins: [editBaseMixins],
  components: { referenceField },
  data () {
    return {
      frommastername: 'coinFm',
      actionSubtitle: '货币信息', // 当前操作副标题
      requestBaseUrl: '/bas/coin', // 请求 查询 操作的基础路径
      formDataInfo: Object.assign({}, default_formDataInfo), // 防止添加和更新数据提交发生冲突
      // 需要验证的数据
      ruleValidate: {
        coinCode: [
          { required: true, message: '货币编码不能为空', trigger: 'blur' },
          { validator: customValidator,
            trigger: 'blur',
            customRule: ['identifier'],
            fieldDesc: '货币编码' }

        ],
        coinName: [
          { required: true, message: '货币名称不能为空', trigger: 'blur' },
          {
            validator: customValidator,
            trigger: 'blur',
            customRule: ['toCDB', 'spaceStr'],
            fieldDesc: '货币名称'
          }
        ],
        coinRate: [ {
          validator: customValidator,
          trigger: 'blur',
          customRule: ['mustDouble'],
          fieldDesc: '汇率'
        }
        ]
      }
    }
  },

  methods: {
    // 重写父类,添加时候,清空数据,附加默认值
    HandleFormDataInfo () {
      this.formDataInfo = Object.assign({}, default_formDataInfo)
    },
    // 重写父类 修改一些提交的数据
    resetformDataInfo (_data) {
      // 时间格式化
      if (_data.coinDate) {
        _data.coinDate = dayjs(_data.coinDate).format('YYYY-MM-DD HH:mm:ss')
      }
      return _data
    }
  }
}
</script>

<style></style>
