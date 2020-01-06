<template>
  <div>
    <editWindow
      :title="actionLableName"
      v-model="showWindow"
      :fullscreen="false"
      width="70%"
      :loading="!isLoaddingDone"
      @on-ok="formDataSubmit()"
    >
      <Form
        ref="formDataInfo"
        :show-message="true"
        :model="formDataInfo"
        :rules="ruleValidate"
        :label-width="120"
      >
        <Row :gutter="18">
          <Col span="16">
            <Row>
              <Col span="24">
                <Row :gutter="18">
                     <Col span="12">
                  <FormItem label="印版编号" prop="tpNo">
                    <Input v-model="formDataInfo.tpNo" maxlength="20" placeholder="请输入印版编号"></Input>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="版类" prop="tpVerType">
                    <optionSearch
                      @onChange="optionOnChange"
                      :defaultItem="formDataInfo.tpVerType"
                      :loaddingDataWhen="showWindow"
                      formKey="tpVerType"
                      query="tpVerType"
                    />

                  </FormItem>
                </Col>
                </Row>
              </Col>

                <Col span="12">
                  <FormItem label="客户" prop="custId">
                    <popup
                      v-model="formDataInfo.custId"
                      field-name="custId"
                      :disabled="false"
                      popup-name="CustomerSingleBox"
                      :fill-model.sync="formDataInfo"
                      render-fields="custId,custCode,cusName"
                      from-fields="id,custCode,cusName"
                      :suffix="true"
                      :suffix-model="formDataInfo.cusName"
                      :query-params="{}"
                    />

                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="产品" prop="productId">
                    <popup
                      v-model="formDataInfo.productId"
                      field-name="bpNo"
                      :disabled="false"
                      popup-name="BasicProductBox"
                      :fill-model.sync="formDataInfo"
                      render-fields="productId,producCode,bpName"
                      from-fields="id,bpNo,bpName"
                      :suffix="true"
                      :suffix-model="formDataInfo.bpName"
                      :query-params="{}"
                    />

                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="印版规格(mm)长" prop="tpItemL">
                    <Input
                      v-model="formDataInfo.tpItemL"
                      type="number"
                      maxlength="20"
                      placeholder="请输入印版规格(mm)长"
                    ></Input>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="厚度(mm)" prop="tpPly">
                    <Input
                      v-model="formDataInfo.tpPly"
                      type="number"
                      maxlength="20"
                      placeholder="请输入厚度(mm)"
                    ></Input>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="印版规格(mm)宽" prop="tpItemW">
                    <Input
                      v-model="formDataInfo.tpItemW"
                      type="number"
                      maxlength="20"
                      placeholder="请输入印版规格(mm)宽"
                    ></Input>
                  </FormItem>
                </Col>

                <Col span="12">
                  <FormItem label="公用" prop="iisPublicCompany">
                          <i-switch size="default" v-model="formDataInfo.iisPublicCompany">
                            <span slot="open">是</span>
                            <span slot="close">否</span>
                          </i-switch>
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
          </Col>
          <Col span="8">
              <div>
                图片上传
                <uploadImg
                  moduleName="bas"
                  :imgUrl="formDataInfo.tpImg"
                  @uploadSuccess="uploadSuccessHeads"
                  tipInfo="图片路径"
                />
              </div>
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
import popup from '@/components/popup/popup'
import uploadImg from '@/components/cl-erp/uploadImg'
import { customValidator, uniqueValidator } from '@/libs/validator'
const default_formDataInfo = {
  tpNo: '',
  tpVerType: '0',
  tpImg: '',
  tpPly: '0',
  tpItemL: '0',
  tpItemW: '0',
  custId: '',
  productId: '',
  remark: ''
}
export default {
  name: 'edit-print',
  mixins: [editBaseMixins],
  components: { optionSearch, popup, uploadImg },
  data () {
    return {
      requestBaseUrl: '/bas/print', // 请求 查询 操作的基础路径
      formDataInfo: Object.assign({}, default_formDataInfo), // 防止添加和更新数据提交发生冲突
      // 需要验证的数据
      ruleValidate: {
        tpNo: [
          { required: true, message: '印版编码不能为空', trigger: 'blur' },
          { validator: customValidator,
            trigger: 'blur',
            customRule: ['toCDB', 'identifier', 'spaceStr'],
            fieldDesc: '印版编号' },
          {
            validator: uniqueValidator,
            trigger: 'blur',
            fieldDesc: '印版编号',
            params: {
              fieldName: 'tpNo',
              formName: 'printFm',
              id: () => {
                return this.formDataInfo.id
              }
            }
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
