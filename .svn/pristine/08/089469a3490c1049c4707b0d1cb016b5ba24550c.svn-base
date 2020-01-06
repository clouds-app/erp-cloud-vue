<template>
  <div>
    <editWindow
      class="cl-edit-supplier"
      :title="actionLableName"
      v-model="showWindow"
      :fullscreen="false"
      width="90%"
      :loading="!isLoaddingDone"
      @on-ok="formDataSubmit()"
    >
      <Form
        ref="formDataInfo"
        :show-message="false"
        :model="formDataInfo"
        :rules="ruleValidate"
        :label-width="130"
      >
        <Row :gutter="18">
            <Col span="24">
                <Row :gutter="18">
                    <Col span="6">
                        <FormItem label="供应商编号：" prop="purCode">
                        <Input v-model="formDataInfo.purCode" maxlength="20" placeholder="请输入供应商"></Input>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="供应商名称：" prop="purName">
                        <Input v-model="formDataInfo.purName" maxlength="20" placeholder="请输入供应商"></Input>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="简称：" prop="shortName">
                        <Input v-model="formDataInfo.shortName" maxlength="20" placeholder="请输入简称"></Input>
                        </FormItem>
                    </Col>
                     <Col span="6">
                        <FormItem label="英文名称：" prop="enName">
                        <Input v-model="formDataInfo.enName" maxlength="20" placeholder="请输入英文名称"></Input>
                        </FormItem>
                    </Col>
          

                </Row>
            </Col>
             <Col span="6">
                <FormItem label="联系人：" prop="vContractor">
                  <Input v-model="formDataInfo.vContractor" maxlength="20" placeholder="请输入联系人"></Input>
                </FormItem>
              </Col>
            <Col span="6">
                        <FormItem label="联系人电话：" prop="vContractorTel">
                        <Input v-model="formDataInfo.vContractorTel" maxlength="20" type="number" placeholder="请输入联系人电话"></Input>
                        </FormItem>
                    </Col>
                    
          <Col span="6">
            <FormItem label="结算货币：" prop="coinId">
                <optionSearch
                    @onChange="optionOnChange"
                    v-model="formDataInfo.coinId"
                    :loaddingDataWhen="showWindow"
                    formKey="coinId"
                    query="coinId"
                />
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="付款方式：" prop="payCode">
              <optionSearch
                  @onChange="optionOnChange"
                  v-model="formDataInfo.payCode"
                  :loaddingDataWhen="showWindow"
                  formKey="payCode"
                  query="payCode"
                />
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="单价小数位：" prop="ctDot">
              <Input
                v-model="formDataInfo.ctDot"
                type="number"
                maxlength="20"
                placeholder="请输入单价小数位"
              ></Input>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="金额小数位：" prop="amtDot">
              <Input
                v-model="formDataInfo.amtDot"
                type="number"
                maxlength="20"
                placeholder="请输入金额小数位："
              ></Input>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="供应商等级：" prop="vLevel">
                 <optionSearch
                  @onChange="optionOnChange"
                  v-model="formDataInfo.vLevel"
                  :loaddingDataWhen="showWindow"
                  formKey="vLevel"
                  query="vLevel"
                />
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="纸板金额：" prop="priceAreaMode">
             
              <i-switch
                @input="
                                    value => {
                                    valueChangeAssign(value, index, row, 'priceAreaMode');
                                    }
                                "
                v-model="formDataInfo.priceAreaMode"
              />纸板金额=报价*总面积
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="折扣%：" prop="discount">
              <Input
                v-model="formDataInfo.discount"
                type="number"
                maxlength="20"
                placeholder="请输入折扣%"
              ></Input>
            </FormItem>
          </Col>
          
          <Col span="6">
            <FormItem label="月结方式：" prop="arpType">
               <optionSearch
                  @onChange="optionOnChange"
                  v-model="formDataInfo.arpType"
                  :loaddingDataWhen="showWindow"
                  formKey="arpType"
                  query="arpType"
                />
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="月结天数：" prop="monthDays">
              <Input
                v-model="formDataInfo.monthDays"
                type="number"
                maxlength="20"
                placeholder="请输入月结天数"
              ></Input>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="月结终止日：" prop="monthEnd">
              <Input
                v-model="formDataInfo.monthEnd"
                type="number"
                maxlength="20"
                placeholder="请输入月结终止日"
              ></Input>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="税率%" prop="taxRate">
              <Input v-model="formDataInfo.taxRate"
              type="number"
              maxlength="20"
              placeholder="请输入税率%"></Input>
            </FormItem>
          </Col>
          
          
          <Col span="6">
            <FormItem label="税别：" prop="taxTP">
              <optionSearch
                  @onChange="optionOnChange"
                  v-model="formDataInfo.taxTP"
                  :loaddingDataWhen="showWindow"
                  formKey="taxTP"
                  query="taxTP"
                />
            </FormItem>
          </Col>

          <Col span="6">
            <FormItem label="纸板采购模式" prop="poType">
               <optionSearch
                  @onChange="optionOnChange"
                  v-model="formDataInfo.poType"
                  :loaddingDataWhen="showWindow"
                  formKey="poType"
                  query="poType"
                />
            </FormItem>
          </Col>
         
          <Col span="6">
            <FormItem label="业务类型：" prop="vType">
              <optionSearch
                  @onChange="optionOnChange"
                  v-model="formDataInfo.vType"
                  :loaddingDataWhen="showWindow"
                  formKey="vType"
                  query="vType"
                />
            </FormItem>
          </Col>
          
          <Col span="6">
            <FormItem label="开户银行：" prop="backName">
              <Input v-model="formDataInfo.backName" maxlength="20" placeholder="请输入开户银行："></Input>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="银行账号：" prop="bankNo">
              <Input v-model="formDataInfo.bankNo" maxlength="20" placeholder="请输入银行账号"></Input>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="税号：" prop="taxLicence">
              <Input v-model="formDataInfo.taxLicence" maxlength="20" placeholder="请输入税号"></Input>
            </FormItem>
          </Col>
          
          <Col span="6">
            <FormItem label="电话：" prop="vTel">
              <Input v-model="formDataInfo.vTel" maxlength="20" type="number" placeholder="请输入电话"></Input>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="报价模式：" prop="priceMode">
              <optionSearch
                  @onChange="optionOnChange"
                  v-model="formDataInfo.priceMode"
                  :loaddingDataWhen="showWindow"
                  formKey="priceMode"
                  query="priceMode"
                />
            </FormItem>
          </Col>
           <Col span="6">
            <FormItem label="计价方式：" prop="priceWay">
              <optionSearch
                  @onChange="optionOnChange"
                  v-model="formDataInfo.priceWay"
                  :loaddingDataWhen="showWindow"
                  formKey="priceWay"
                  query="priceWay"
                />
            </FormItem>
          </Col>
                   
          <Col span="6">
            <FormItem label="计量单位：" prop="unitId">
              <!-- <Input v-model="formDataInfo.unitId" maxlength="20" placeholder="请输入计量单位"></Input> -->
               <optionSearch
                  @onChange="optionOnChange"
                  v-model="formDataInfo.unitId"
                  :loaddingDataWhen="showWindow"
                  formKey="unitId"
                  query="unitId"
                />
            </FormItem>
          </Col>
         <Col span="6">
            <FormItem label="传真：" prop="vFax">
              <Input v-model="formDataInfo.vFax" maxlength="20" placeholder="请输入传真"></Input>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="所属地区：" prop="areaIds">
              <Input v-model="formDataInfo.areaIds" maxlength="20" placeholder="请输入所属地区"></Input>
            </FormItem>
          </Col>

          <Col span="6">
            <FormItem label="详细地址：" prop="addrDetail">
              <Input v-model="formDataInfo.addrDetail" maxlength="20" placeholder="请输入详细地址"></Input>
            </FormItem>
          </Col>
         
          <Col span="6">
            <FormItem label="备注:" prop="remark">
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
import editBaseMixins from "../../mixins/edit";
import popup from "@/components/popup/popup";
import optionSearch from "../../components/optionSearch"

const default_formDataInfo = {
  addrDetail: "",
  amtDot: 0,
  areaIds: "",
  arpType: "",
  backName: "",
  bankNo: "",
  coinId:0,
  coinCode:"",
  coinName:"",
  ctDot: 0,
  curyCode: "",
  discount: 0,
  enName: "",
  iisAudit: 0,
  monthDays: 0,
  monthEnd: 0,
  payCode: "",
  poType: 0,
  pointj: 0,
  pointw: 0,
  priceAreaMode: 0,
  priceMode: "",
  priceWay: "",
  purCode: "",
  purName: "",
  remark: "",
  shortName: "",
  status: 0,
  taxLicence: "",
  taxRate: 0,
  taxTP: "",
  unitId: "",
  vContractor: "",
  vContractorTel: "",
  vFax: "",
  vLevel: "",
  vTel: "",
  vType: ""
};
export default {
  name: "edit-supplier",
  mixins: [editBaseMixins],
  components:{
      optionSearch,
      popup,
  },

  data() {
    return {
      requestBaseUrl: "/purchase/supplier", // 请求 查询 操作的基础路径
      formDataInfo: Object.assign({}, default_formDataInfo), // 防止添加和更新数据提交发生冲突
      // 需要验证的数据
      ruleValidate: {
        // pointj: [
        //   { required: true, message: "位置经度不能为空", trigger: "blur" }
        // ],
        // pointw: [
        //     { required: true, message: "位置纬度不能为空", trigger: "blur" }
        // ],
        purCode: [
          { required: true, message: "供应商编号不能为空", trigger: "blur" }
        ],
        purName: [
          { required: true, message: "供应商名称不能为空", trigger: "blur" }
        ]
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
.cl-edit-supplier .ivu-select-item {
  display: block;
}
</style>
