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
        :show-message="true"
        :model="formDataInfo"
        :rules="ruleValidate"
        :label-width="110"
      >
        <Row :gutter="18">
          <Col span="24">
            <Row :gutter="18">
              <Col span="6">
                <FormItem label="供应商编号" prop="purCode">
                  <referenceField
                    ref='firstFocusInput'
                    v-model="formDataInfo.purCode"
                    :form-name="frommastername"
                    :id="formDataInfo.id"
                    maxlength="20"
                    :disabled="detailDisabled"
                    placeholder="请输入供应商"
                  ></referenceField>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="供应商名称" prop="purName">
                  <Input
                    v-model="formDataInfo.purName"
                    maxlength="20"
                    :disabled="detailDisabled"
                    placeholder="请输入供应商"
                  ></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="简称" prop="shortName">
                  <Input
                    v-model="formDataInfo.shortName"
                    maxlength="20"
                    :disabled="detailDisabled"
                    placeholder="请输入简称"
                  ></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="英文名称" prop="enName">
                  <Input
                    v-model="formDataInfo.enName"
                    maxlength="20"
                    :disabled="detailDisabled"
                    placeholder="请输入英文名称"
                  ></Input>
                </FormItem>
              </Col>
            </Row>
          </Col>
          <Col span="6">
            <FormItem label="电话" prop="vTel">
              <Input
                v-model="formDataInfo.vTel"
                maxlength="12"
                :disabled="detailDisabled"
                placeholder="请输入电话"
              ></Input>
            </FormItem>
          </Col>

          <Col span="6">
            <FormItem label="传真" prop="vFax">
              <Input
                type="number"
                v-model="formDataInfo.vFax"
                maxlength="20"
                :disabled="detailDisabled"
                placeholder="请输入传真"
              ></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <Row>
              <Col span="14" >
                <FormItem label="所属地区" prop="areaIds">
                  <Cascader
                    style="padding-top: 5px;"
                    :data="cityCascader"
                    :disabled="detailDisabled"
                    :value="masterareaIds"
                    @on-change="getareaIds"
                    maxlength="20"
                    placeholder="请输入所属地区"
                  ></Cascader>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label prop="addrDetail" style=" width:100%" :label-width="10">
                  <Input
                    style="width: 250px;"
                    v-model="formDataInfo.addrDetail"
                    :disabled="detailDisabled"
                    maxlength="20"
                    placeholder="请输入详细地址"
                  ></Input>
                </FormItem>
              </Col>
            </Row>
          </Col>
          <Col span="6">
            <FormItem label="业务类型" prop="vType">
              <optionSearch
                :disabled="detailDisabled"
                @onChange="optionOnChange"
                :defaultItem="formDataInfo.vType"
                :loaddingDataWhen="showWindow"
                formKey="vType"
                query="vType"
              />
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="供应商等级" prop="vLevel">
              <optionSearch
                @onChange="optionOnChange"
                :disabled="detailDisabled"
                :default-item="formDataInfo.vLevel"
                :loaddingDataWhen="showWindow"
                formKey="vLevel"
                query="vLevel"
              />
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="纸板采购模式" prop="poType">
              <optionSearch
                @onChange="optionOnChange"
                :disabled="detailDisabled"
                :default-item="formDataInfo.poType"
                :loaddingDataWhen="showWindow"
                formKey="poType"
                query="poType"
              />
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="纸板金额" prop="priceAreaMode">
              =报价*总面积&nbsp;&nbsp;
              <Checkbox
                v-model="formDataInfo.priceAreaMode"
                :disabled="detailDisabled"
                maxlength="20"
                placeholder
              ></Checkbox>
            </FormItem>
          </Col>
          <Col span="24">
            <Row :gutter="18">
              <Col span="6">
                <FormItem label="结算货币" prop="coinCode">
                  <popup
                      v-model="formDataInfo.coinCode"
                      field-name="coinCode"
                      :disabled="detailDisabled"
                      popup-name="CoinSingleBox"
                      :fill-model.sync="formDataInfo"
                      render-fields="coinId,coinCode,coinName"
                      from-fields="id,coinCode,coinName"
                      :suffix="true"
                      :suffix-model="formDataInfo.coinName"
                      @on-fill="coinCodevalidator"
                      :query-params="{}"
                    />
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="计量单位" prop="unitId">
                  <!-- <Input v-model="formDataInfo.unitId" maxlength="20" placeholder="请输入计量单位"></Input> -->
                  <optionSearch
                    @onChange="optionOnChange"
                    :disabled="detailDisabled"
                    :defaultItem="formDataInfo.unitId"
                    :loaddingDataWhen="showWindow"
                    formKey="unitId"
                    query="unitId"
                  />
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="单价小数位" prop="ctDot">
                  <InputNumber
                    v-model="formDataInfo.ctDot"
                    :disabled="detailDisabled"
                    :formatter="value => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                    :parser="value => value.replace(/\$\s?|(,*)/g, '')"
                    style="width:100%"
                    maxlength="20"
                    placeholder="请输入单价小数位"
                  ></InputNumber>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="金额小数位" prop="amtDot">
                  <InputNumber
                    v-model="formDataInfo.amtDot"
                    :disabled="detailDisabled"
                    :formatter="value => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                    :parser="value => value.replace(/\$\s?|(,*)/g, '')"
                    style="width:100%"
                    maxlength="20"
                    placeholder="请输入金额小数位"
                  ></InputNumber>
                </FormItem>
              </Col>
            </Row>
          </Col>
          <Col span="24">
            <Row :gutter="18">
              <Col span="6">
                <FormItem label="付款方式" prop="payCode">
                  <div>
                    <popup
                      v-model="formDataInfo.payCode"
                      field-name="payCode"
                      :disabled="detailDisabled"
                      popup-name="PayTypeSingleBox"
                      :fill-model.sync="formDataInfo"
                      render-fields="payId,payCode,payName,monthDays"
                      from-fields="id,payCode,payName,payDays"
                      :suffix="true"
                      :suffix-model="formDataInfo.payName"
                      :query-params="{}"
                      @on-fill="payCodevalidator"
                    />
                  </div>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="月结方式" prop="arpType">
                  <optionSearch
                    @onChange="optionOnChange"
                    :disabled="detailDisabled"
                    v-model="formDataInfo.arpType"
                    :loaddingDataWhen="showWindow"
                    formKey="arpType"
                    query="arpType"
                  />
                </FormItem>
              </Col>

              <Col span="6">
                <FormItem label="月结天数" prop="monthDays">
                  <InputNumber
                    v-model="formDataInfo.monthDays"
                    :disabled="detailDisabled"
                    :formatter="value => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                    :parser="value => value.replace(/\$\s?|(,*)/g, '')"
                    style="width:100%"
                    maxlength="20"
                    placeholder="请输入月结天数"
                  ></InputNumber>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="月结终止日" prop="monthEnd">
                  <InputNumber
                    v-model="formDataInfo.monthEnd"
                    :disabled="detailDisabled"
                    :formatter="value => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                    style="width:100%"
                    :parser="value => value.replace(/\$\s?|(,*)/g, '')"
                    maxlength="20"
                    placeholder="请输入月结终止日"
                  ></InputNumber>
                </FormItem>
              </Col>
            </Row>
          </Col>
          <Col span="6">
            <FormItem label="联系人" prop="vContractor">
              <Input
                v-model="formDataInfo.vContractor"
                :disabled="detailDisabled"
                maxlength="20"
                placeholder="请输入联系人"
              ></Input>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="折扣%" prop="discount">
              <InputNumber
                v-model="formDataInfo.discount"
                :disabled="detailDisabled"
                :formatter="value => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                :parser="value => value.replace(/\$\s?|(,*)/g, '')"
                style="width:100%"
                maxlength="20"
                placeholder="请输入折扣%"
              ></InputNumber>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="税别" prop="taxTP">
              <optionSearch
                @onChange="optionOnChange"
                :disabled="detailDisabled"
                :defaultItem="formDataInfo.taxTP"
                :loaddingDataWhen="showWindow"
                formKey="taxTP"
                query="taxTP"
              />
            </FormItem>
          </Col>

          <Col span="6">
            <FormItem label="税率%" prop="taxRate">
              <Input
                @on-change="taxRateMessage"
                v-model="formDataInfo.taxRate"
                :disabled="detailDisabled"
                maxlength="20"
                placeholder="请输入税率%"
              ></Input>
            </FormItem>
          </Col>
          <!-- 联系人电话 -->
          <Col span="6">
            <FormItem label="联系人电话" prop="vContractorTel">
              <Input
                v-model="formDataInfo.vContractorTel"
                :disabled="detailDisabled"
                maxlength="20"
                type="number"
                placeholder="请输入联系人电话"
              ></Input>
            </FormItem>
          </Col>

          <Col span="6">
            <FormItem label="开户银行" prop="backName">
              <Input
                v-model="formDataInfo.backName"
                :disabled="detailDisabled"
                maxlength="20"
                placeholder="请输入开户银行"
              ></Input>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="银行账号" prop="bankNo">
              <Input
                v-model="formDataInfo.bankNo"
                :disabled="detailDisabled"
                maxlength="20"
                placeholder="请输入银行账号"
              ></Input>
            </FormItem>
          </Col>

          <Col span="6">
            <FormItem label="税号" prop="taxLicence">
              <Input
                v-model="formDataInfo.taxLicence"
                :disabled="detailDisabled"
                maxlength="20"
                placeholder="请输入税号"
              ></Input>
            </FormItem>
          </Col>
        <Col span="24">
          <Row :gutter="18">
             <Col span="6">
                <FormItem label="报价模式" prop="priceMode">
                  <!-- <Input v-model="formDataInfo.unitId" maxlength="20" placeholder="请输入计量单位"></Input> -->
                  <optionSearch
                    @onChange="optionOnChange"
                    :disabled="detailDisabled"
                    :defaultItem="formDataInfo.priceMode"
                    :loaddingDataWhen="showWindow"
                    formKey="priceMode"
                    query="priceMode"
                  />
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="备注:" prop="remark">
                  <Input
                    v-model="formDataInfo.remark"
                    :disabled="detailDisabled"
                    maxlength="100"
                    :autosize="{ minRows: 2, maxRows: 5 }"
                    placeholder="请输入备注..."
                  ></Input>
                </FormItem>
              </Col>
          </Row>
        </Col>
        <Col span="24">
          <Row :gutter="18">
            <Col span="6">
              <FormItem label="瓦线参数:">
              </FormItem>
            </Col>
          </Row>
        </Col>
        <Col span="6">
          <FormItem label="最大门幅(mm)" prop="widthMax" :label-width="128">
              <inputNumber
                v-model="formDataInfo.widthMax"
                :disabled="detailDisabled"
                maxlength="20"
                placeholder="请输入最大门幅"
              ></inputNumber>
            </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="最小门幅(mm)" prop="widthMin">
              <inputNumber
                v-model="formDataInfo.widthMin"
                :disabled="detailDisabled"
                maxlength="20"
                placeholder="请输入最小门幅"
              ></inputNumber>
            </FormItem>
        </Col>
        <Col span="6"><!--KsMax-->
          <FormItem label="最大开数" prop="KsMax">
              <optionSearch
                :disabled="detailDisabled"
                @onChange="optionOnChange"
                :defaultItem="formDataInfo.KsMax"
                :loaddingDataWhen="showWindow"
                formKey="KsMax"
                query="KsMax"
              />
            </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="最小切长(mm)" prop="cutLengthMin">
              <inputNumber
                v-model="formDataInfo.cutLengthMin"
                :disabled="detailDisabled"
                number
                maxlength="20"
                placeholder="请输入最小切长"
              ></inputNumber>
            </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="最小接单米数(m)" prop="orderLengthMin" :label-width="128">
              <inputNumber
                v-model="formDataInfo.orderLengthMin"
                :disabled="detailDisabled"
                maxlength="20"
                placeholder="请输入最小切长"
              ></inputNumber>
            </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="可生产楞别" prop="producibleLbCodes" >
              <popup
                v-model="formDataInfo.producibleLbCodes"
                field-name="producibleLbCodes"
                :disabled="detailDisabled"
                popup-name="LengMultiBox"
                :fill-model.sync="formDataInfo"
                render-fields="producibleLbCodes"
                from-fields="lbCode"
                :suffix="false"
                @on-fill="producibleLbCodesvalidator"
                :query-params="{lbCS:-1}"
              />
              <!-- <Input
                v-model="formDataInfo.producibleLbCodes"
                :disabled="detailDisabled"
                maxlength="20"
              ></Input> -->
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
import allCityList from '@/libs/area-data-min.js'
import referenceField from '@/components/referenceField/referenceField'
import editBaseMixins from '../../mixins/edit'
import popup from '@/components/popup/popup'
import optionSearch from '../../components/optionSearch'
import request from '@/libs/request'
import { customValidator, uniqueValidator } from '@/libs/validator'
import { deepCopy } from 'view-design/src/utils/assist'
import inputNumber from '@/components/input-number'

const default_formDataInfo = {
  widthMax: '0',
  widthMin: '0',
  KsMax: '1',
  KsMaxText: '',
  cutLengthMin: '0',
  orderLengthMin: '0',
  producibleLbCodes: '',
  payCode: '',
  vType: '0',
  payId: '0',
  payName: '',
  arpType: '0',
  vLevel: 'A',
  taxTP: 'I',
  areaNames: '',
  areaIds: '',
  addrDetail: '',
  amtDot: 2,
  poType: '',
  backName: '',
  bankNo: '',
  coinId: '',
  coinCode: '',
  coinName: '',
  ctDot: 2,
  curyCode: '',
  discount: 100,
  enName: '',
  iisAudit: 0,
  monthDays: 30,
  monthEnd: 31,
  pointj: 0,
  pointw: 0,
  priceAreaMode: 0,
  purCode: '',
  purName: '',
  remark: '',
  shortName: '',
  status: 1,
  taxLicence: '',
  taxRate: 0,
  vContractor: '',
  vContractorTel: '',
  vFax: '',
  vTel: '',
  unitId: '',
  priceMode:"1"
}
export default {
  name: 'edit-supplier',
  mixins: [editBaseMixins],
  components: {
    optionSearch,
    popup,
    referenceField,
    deepCopy,
    inputNumber
  },

  data () {
    return {
      frommastername: 'purSupplierFm',
      actionSubtitle: '供应商', // 当前操作副标题
      requestBaseUrl: '/purchase/supplier', // 请求 查询 操作的基础路径
      formDataInfo: deepCopy(default_formDataInfo), // 防止添加和更新数据提交发生冲突
      // 需要验证的数据
      ruleValidate: {
        // vTel: [
        //   {
        //     validator: customValidator,
        //     trigger: 'blur',
        //     customRule: ['phone'],
        //     fieldDesc: '电话'
        //   }
        // ],
        ctDot: [
          {
            validator: customValidator,
            trigger: 'blur',
            customRule: ['mustDouble'],
            fieldDesc: '单价小数位'
          }
        ],
        amtDot: [
          {
            validator: customValidator,
            trigger: 'blur',
            customRule: ['mustDouble'],
            fieldDesc: '金额小数位'
          }
        ],
        discount: [
          {
            validator: customValidator,
            trigger: 'blur',
            customRule: ['mustDouble'],
            fieldDesc: '折扣%'
          }
        ],
        monthDays: [
          {
            validator: customValidator,
            trigger: 'blur',
            customRule: ['mustDouble'],
            fieldDesc: '月结天数'
          }
        ],
        monthEnd: [
          {
            validator: customValidator,
            trigger: 'blur',
            customRule: ['mustDouble'],
            fieldDesc: '月结终止日'
          }
        ],
        taxRate: [
          {
            validator: customValidator,
            trigger: 'blur',
            customRule: ['mustDouble'],
            fieldDesc: '税率%'
          }
        ],
        purCode: [
          { required: true, message: '供应商编号不能为空', trigger: 'blur' }
        ],
        purName: [
          { required: true, message: '供应商名称不能为空', trigger: 'blur' }
        ],
        shortName: [
          { required: true, message: '简称不能为空', trigger: 'blur' }
        ],
        payCode: [
          { required: true, message: '付款方式不能为空', trigger: 'blur' }
        ],
        coinCode: [
          { required: true, message: '结算货币不能为空', trigger: 'blur' }
        ],
        widthMax: [
          {
            validator: customValidator,
            trigger: 'blur',
            customRule: ['mustDouble'],
            fieldDesc: '最大门幅'
          }
          // { required: true, message: "最大门幅不能为空", trigger: "blur,change" , type:'number'}
        ],
        widthMin: [
          {
            validator: customValidator,
            trigger: 'blur',
            customRule: ['mustDouble'],
            fieldDesc: '最小门幅'
          }
          // { required: true, message: "最小门幅不能为空", trigger: "blur,change" , type:'number'}
        ],
        cutLengthMin: [
          {
            validator: customValidator,
            trigger: 'blur',
            customRule: ['mustDouble'],
            fieldDesc: '最小切长'
          }
          // { required: true, message: "最小切长不能为空", trigger: "blur" }
        ],
        orderLengthMin: [
          {
            validator: customValidator,
            trigger: 'blur',
            customRule: ['mustDouble'],
            fieldDesc: '最小接单米数'
          }
          // { required: true, message: "最小接单米数不能为空", trigger: "blur" }
        ],
        producibleLbCodes: [
          { required: true, message: '可生产楞别不能为空', trigger: 'blur' }
        ]
      },
      cityCascader: allCityList,
      cityCascaderCount: 0
    }
  },
    computed:{
      masterareaIds(){
        let originData = this.formDataInfo.areaIds
        if(!!originData &&  originData.includes(',')){
            return originData.split(',')
        }else{
          return []
        }

      }
  },
  created () {
    // 获取纸板采购模式默认值
    let IsSmallQty = this.$params.IsSmallQty
    default_formDataInfo.poType = IsSmallQty
    // request.post('/bas/area/list', { pid: 0 }, { pid: 0 }).then(res => {
    //   res.forEach(item => {
    //     item['children'] = []
    //   })
    //   this.cityCascader = res
    // })
    let unit = this.$params.Unit
    if (unit === '1:厘米' || unit === '2:毫米') {
      default_formDataInfo.unitId = '1:平方米'
    } else {
      default_formDataInfo.unitId = '0:千平方英寸'
    }
  },
  methods: {
    // 所属地区回调事件
    getareaIds (value, selectedData) {
      this.formDataInfo.areaIds = value.map(val => val).join(',')
      this.formDataInfo.areaNames = selectedData.map(o => o.label).join(',')
    },
    payCodevalidator () {
      this.$refs['formDataInfo'].validateField('payCode', err => {
      })
    },
    // 结算货币回调事件
    coinCodevalidator () {
      // this.$refs['formDataInfo'].validateField('coinCode','payCode',err=>{})
      this.$refs['formDataInfo'].validateField('coinCode', err => {
      })
    },
    // 可生产楞别回调
    producibleLbCodesvalidator () {
      this.$refs['formDataInfo'].validateField('producibleLbCodes', err => {
      })
    },
    // 税率提示
    taxRateMessage () {
      if (this.formDataInfo.taxRate > 17) {
        this.$Message.warning('税率过高请注意')
      }
    },
    getCityCascader (item, callback) {
      // debugger;
      item.loading = true
      request.post('/bas/area/list', { pid: item.value, name: item.label }, { pid: item.value, name: item.label }).then(res => {
        if (res != null) {
          // debugger;
          res.forEach(item => {
            item['children'] = []
          })
          delete item.loading
          item.children = res
        }
        item.loading = false
        callback()
      })
    },
    // 重写父类,添加时候,清空数据
    HandleFormDataInfo () {
      // debugger
      this.$refs['formDataInfo'].resetFields()
      this.formDataInfo = deepCopy(default_formDataInfo)
    },
    // 关闭窗口触发
    closeActionTigger () {},
    // 打开窗口触发
    openActionTigger () {}
  }
}
</script>

<style>
.cl-edit-supplier .ivu-select-item {
  display: block;
}
</style>
