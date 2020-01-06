<template>
  <div>
    <editWindow
      class="cl-edit-dieCuttingPlate"
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
        :label-width="130"
      >
        <Row>
          <Col span="24">
            <Row>
              <Col span="8">
                <FormItem label="模切板编号" prop="dpNo">
                  <Input v-model="formDataInfo.dpNo" maxlength="20" placeholder="请输入模切板编号"></Input>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="客户" prop="cusName">
                  <popup
                    v-model="formDataInfo.cusCode"
                    field-name="cusCode"
                    :disabled="false"
                    popup-name="CustomerSingleBox"
                    :fill-model.sync="formDataInfo"
                    render-fields="custId,cusCode,cusName"
                    from-fields="id,cusCode,cusName"
                    :suffix="true"
                    :suffix-model="formDataInfo.cusName"
                    :query-params="{}"
                  />
                  <!-- <Input
                    v-model="formDataInfo.custId"
                    type="number"
                    maxlength="20"
                    placeholder="请输入客户"
                  ></Input>-->
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="产品" prop="bpName">
                  <popup
                    v-model="formDataInfo.bpNo"
                    field-name="bpNo"
                    :disabled="false"
                    popup-name="BasicProductBox"
                    :fill-model.sync="formDataInfo"
                    render-fields="productId,bpNo,bpName"
                    from-fields="id,bpNo,bpName"
                    :suffix="true"
                    :suffix-model="formDataInfo.bpName"
                    :query-params="{}"
                  />
              </FormItem>
              </Col>
            </Row>
          </Col>
          <Col span="8">
            <FormItem label="盒式" prop="boxName">
                  <popup
                    v-model="formDataInfo.boxCode"
                    field-name="boxCode"
                    :disabled="false"
                    popup-name="BoxSingleBox"
                    :fill-model.sync="formDataInfo"
                    render-fields="boxId,boxCode,boxName"
                    from-fields="id,boxCode,boxName"
                    :suffix="true"
                    :suffix-model="formDataInfo.boxName"
                    :query-params="{}"
                  />
               
                </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="用纸规格(inch)宽" prop="dpLengthInch">
              <Input
                v-model="formDataInfo.dpLengthInch"
                type="number"
                maxlength="20"
                placeholder="请输入用纸规格(inch)宽"
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
                  <FormItem label="用纸规格(inch)长" prop="dpWidthInch">
                    <Input
                      v-model="formDataInfo.dpWidthInch"
                      type="number"
                      maxlength="20"
                      placeholder="请输入用纸规格(inch)长"
                    ></Input>
                  </FormItem>
          </Col>
          <Col span="8">
                  <FormItem label="版类" prop="dpVerType">
                    <optionSearch
                      @onChange="optionOnChange"
                      :defaultItem="formDataInfo.dpVerType"
                      :loaddingDataWhen="showWindow"
                      formKey="dpVerType"
                      query="dpVerType"
                    />
                  </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="用纸规格(cm)宽" prop="dpLengthmm">
              <Input
                v-model="formDataInfo.dpLengthmm"
                type="number"
                maxlength="20"
                placeholder="请输入用纸规格(cm)宽"
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="用纸规格(cm)长" prop="dpWidthmm">
              <Input
                v-model="formDataInfo.dpWidthmm"
                type="number"
                maxlength="20"
                placeholder="请输入用纸规格(cm)长"
              ></Input>
            </FormItem>
          </Col>
          

                
                <Col span="8">
                        <FormItem label="模数" prop="dpDieCuttingQty">
                          <Input
                            v-model="formDataInfo.dpDieCuttingQty"
                            tyoe="number"
                            maxlength="20"
                            placeholder="请输入模模数"
                          ></Input>
                        </FormItem>
                    </Col>
                
            
          
               
          <Col span="8">
            <FormItem label="刀模规格长" prop="dpModelSizeL">
              <Input
                v-model="formDataInfo.dpModelSizeL"
                type="number"
                maxlength="20"
                placeholder="请输入刀模规格长"
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="刀模规格宽" prop="dpModelSizeW">
              <Input
                v-model="formDataInfo.dpModelSizeW"
                type="number"
                maxlength="20"
                placeholder="请输入刀模规格宽"
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
                        <FormItem label="公用" prop="iisPublicCompany">
                          <i-switch size="default" v-model="formDataInfo.iisPublicCompany">
                            <span slot="open">是</span>
                            <span slot="close">否</span>
                          </i-switch>
                        </FormItem>
                </Col>
          
          <Col span="16">
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
import popup from "@/components/popup/popup";
import optionSearch from "../../components/optionSearch";
import editBaseMixins from "../../mixins/edit";
import { customValidator ,uniqueValidator} from "@/libs/validator";
const default_formDataInfo = {
  boxId: " 0",
  boxName: "",
  cusName: "",
  cusCode: "", // 详细缺少字段
  custId: " 0",
  dpDieCuttingQty: " 0",
  dpImg: "",
  dpLengthInch: " 0",
  dpLengthmm: " 0",
  dpModelSizeL: " 0",
  dpModelSizeW: " 0",
  dpNo: "",
  dpVerType: " 0",
  dpVerTypeText: "",
  dpWidthInch: " 0",
  dpWidthmm: " 0",
  productId: " 0",
  productCode: " 0", // 详细缺少字段
  productName: "",
  remark: ""
};
export default {
  name: "edit-dieCuttingPlate",
  mixins: [editBaseMixins],
  components: { optionSearch, popup },
  data() {
    return {
      requestBaseUrl: "/bas/dieCuttingPlate", // 请求 查询 操作的基础路径
      formDataInfo: Object.assign({}, default_formDataInfo), // 防止添加和更新数据提交发生冲突
      // 需要验证的数据
      ruleValidate: {
        dpNo: [{ required: true, message: "模切板编码不能为空", trigger: "blur" },
              {validator:customValidator,
              trigger:"blur",
              customRule:["toCDB","identifier","spaceStr"],
              fieldDesc:"模切板编码"
              },
              {
                  validator:uniqueValidator,
                  trigger: "blur",
                  fieldDesc: "模切板编码",
                  params:{
                    fieldName:'dpNo',
                    formName:'dieCuttingPlateFm',
                    id:()=>{
                      return this.formDataInfo.id;
                    }
                  }
                }
        ],
        // dpDieCuttingQty: [{ required: true, message: "", trigger: "blur" }]
      }
    };
  },

  methods: {
    // 重写父类,添加时候,清空数据
    HandleFormDataInfo() {
      this.formDataInfo = Object.assign({}, default_formDataInfo);
    }
  }
};
</script>

<style>
.cl-edit-dieCuttingPlate .ivu-select-item {
  display: block;
}
.cl-edit-art .ivu-select-item {
  display: block;
}
.cl-edit-art .ivu-select-item {
  display: block;
}
</style>
