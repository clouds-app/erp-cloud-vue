<template>
  <div>
    <editWindow
      class="cl-edit-paperJoin"
      :title="actionLableName"
      v-model="showWindow"
      :fullscreen="false"
      width="90%"
      :loading="!isLoaddingDone"
      :spinLoaddingText="spinLoaddingText"
      @on-ok="formTableDataSubmit()"
    >
      <Form
        ref="formDataInfo"
        :show-message="false"
        :model="formDataInfo.master"
        :rules="ruleValidate"
        :label-width="100"
      >
        <Row>
          <Col span="8">
            <Row>
              <Col span="12">
                <FormItem label="入库单号" prop="pjNumber">
                  <Input v-model="formDataInfo.master.pjNumber" maxlength="20" placeholder disabled></Input>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="入库日期" prop="pjDate" style="margin-left:-20px;">
                  <DatePicker
                    type="date"
                    format="yyyy-MM-dd"
                    v-model="formDataInfo.master.pjDate"
                  ></DatePicker>
                </FormItem>
              </Col>
            </Row>
          </Col>

          <Col span="7">
            <FormItem label="数量" prop="qty">
              <!-- <Input v-model="formDataInfo.master.qty" maxlength="20" placeholder disabled></Input> -->
              <InputNumber
                disabled
                v-model="formDataInfo.master.qty"
                :formatter="value => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                :parser="value => value.replace(/\$\s?|(,*)/g, '')"
                style="width:100%"
                maxlength="20"
                placeholder
              ></InputNumber>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="供应商编号" prop="supplierCode">
              <div>
                <popup
                  @on-fill="Initializationdata"
                  v-model="formDataInfo.master.supplierCode"
                  field-name="supplierCode"
                  popup-name="SupplierSingleBox"
                  :fill-model.sync="formDataInfo.master"
                  render-fields="supplierId,supplierCode,supplierName,curyId,taxTp,taxRat,rate"
                  from-fields="id,purCode,purName,coinCode,taxTP,taxRate,coinRate"
                  :suffix="true"
                  :suffix-model="formDataInfo.master.supplierName"
                  :query-params="{}"
                />
              </div>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="仓库" prop="wareHouseCode">
              <div>
                <popup
                  v-model="formDataInfo.master.wareHouseCode"
                  field-name="wareHouseCode"
                  popup-name="WareHouseSingleBox"
                  :fill-model.sync="formDataInfo.master"
                  render-fields="wareHouseId,wareHouseCode,wareHouseName"
                  from-fields="id,whCode,whName"
                  :suffix="true"
                  :suffix-model="formDataInfo.master.wareHouseName"
                  :query-params="{whType:0}"
                />
              </div>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="车牌号" prop="carNo">
              <!-- <Input v-model="formDataInfo.master.carNo" maxlength="20" placeholder></Input> -->
              <div>
                <popup
                  v-model="formDataInfo.master.carNo"
                  field-name="carNo"
                  popup-name="CarSingleBox"
                  :fill-model.sync="formDataInfo.master"
                  render-fields="carNo"
                  from-fields="carNo"
                  :suffix="false"
                />
              </div>
            </FormItem>
          </Col>
          <Col span="8">
            <Row>
              <Col span="8">
                <FormItem label="月结" prop="isAcc">
                  <Checkbox v-model="formDataInfo.master.isAcc" maxlength="20" placeholder></Checkbox>
                </FormItem>
              </Col>
              <Col span="16">
                <FormItem label="月结日期" prop="accDate" >
                  <DatePicker
                    disabled
                    type="date"
                    format="yyyy-MM-dd HH:mm:ss"
                    v-model="formDataInfo.master.accDate"
                  ></DatePicker>
                </FormItem>
              </Col>
            </Row>
          </Col>

          <Col span="8">
            <FormItem label="送货单号" prop="shNumber">
              <Input v-model="formDataInfo.master.shNumber" maxlength="20" placeholder disabled></Input>
            </FormItem>
          </Col>

          <Col span="7">
            <FormItem label="金额" prop="money">
              <!-- <Input v-model="formDataInfo.master.money" maxlength="20" placeholder disabled></Input> -->
              <InputNumber
                disabled
                v-model="formDataInfo.master.money"
                :formatter="value => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                :parser="value => value.replace(/\$\s?|(,*)/g, '')"
                style="width:100%"
                maxlength="20"
                placeholder
              ></InputNumber>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="币别" prop="curyId">
              <Input v-model="formDataInfo.master.curyId" maxlength="20" placeholder disabled></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="汇率" prop="rate">
              <Input v-model="formDataInfo.master.rate" maxlength="20" placeholder disabled></Input>
            </FormItem>
          </Col>

          <Col span="7">
            <FormItem label="税率" prop="taxRat">
              <Input v-model="formDataInfo.master.taxRat" maxlength="20" placeholder disabled></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="税别" prop="taxTp">
              <Input v-model="formDataInfo.master.taxTp" maxlength="20" placeholder disabled></Input>
            </FormItem>
          </Col>

          <Col span="24">
            <FormItem label="备注">
              <Input
                v-model="formDataInfo.master.remark"
                type="textarea"
                maxlength="100"
                :autosize="{ minRows: 2, maxRows: 5 }"
                placeholder="请输入备注..."
              ></Input>
            </FormItem>
          </Col>
        </Row>
      </Form>

      <Tabs>
        <!--  注意:eTable formDataInfo.artLengs.defaultList  ===artLengs=== 需要根据实际接口修改,其它不变-->
        <TabPane label="纸板入库明细" name="name1">
          <eTable
            ref="tableFields"
            unqiue-mark="id"
            :index-menu="true"
            :col-start="0"
            :width="200"
            :height="280"
            :row-init-data="tableInitData?tableInitData.stockPurPaperJoinItemFm:{}"
            :data.sync="formDataInfo.paperJoinItemEditDTOS.defaultList"
            :rules="tableFieldsValidator"
          >
            <template slot="head">
              <tr>
                <th class="ivu-table-column-center" width="70">
                  <div class="ivu-table-cell">
                    <span class>月结</span>
                  </div>
                </th>
                <th class="ivu-table-column-center" width="100">
                  <div class="ivu-table-cell">
                    <span class>工单号</span>
                  </div>
                </th>
                <th class="ivu-table-column-center" width="80">
                  <div class="ivu-table-cell">
                    <span class>批次</span>
                  </div>
                </th>
                <th class="ivu-table-column-center" width="100">
                  <div class="ivu-table-cell">
                    <span class>本厂纸质</span>
                  </div>
                </th>
                <th class="ivu-table-column-center" width="100">
                  <div class="ivu-table-cell">
                    <span class>供应商纸质</span>
                  </div>
                </th>
                <th class="ivu-table-column-center" width="80">
                  <div class="ivu-table-cell">
                    <span class>楞别</span>
                  </div>
                </th>
                <th class="ivu-table-column-center" width="80">
                  <div class="ivu-table-cell">
                    <span class>纸宽</span>
                  </div>
                </th>
                <th class="ivu-table-column-center" width="80">
                  <div class="ivu-table-cell">
                    <span class>纸长</span>
                  </div>
                </th>
                <th class="ivu-table-column-center" width="80">
                  <div class="ivu-table-cell">
                    <span class>压线</span>
                  </div>
                </th>
                <th class="ivu-table-column-center" width="80">
                  <div class="ivu-table-cell">
                    <span class>采购数量</span>
                  </div>
                </th>
                <th class="ivu-table-column-center" width="80">
                  <div class="ivu-table-cell">
                    <span class>本次入库数</span>
                  </div>
                </th>
                <th class="ivu-table-column-center" width="80">
                  <div class="ivu-table-cell">
                    <span class>备品数</span>
                  </div>
                </th>
                
                <th class="ivu-table-column-center" width="80">
                  <div class="ivu-table-cell">
                    <span class>已入库数</span>
                  </div>
                </th>
                <th class="ivu-table-column-center" width="80">
                  <div class="ivu-table-cell">
                    <span class>退货数</span>
                  </div>
                </th>
                <th class="ivu-table-column-center" width="80">
                  <div class="ivu-table-cell">
                    <span class>报价</span>
                  </div>
                </th>
                <th class="ivu-table-column-center" width="80">
                  <div class="ivu-table-cell">
                    <span class>单价</span>
                  </div>
                </th>
                <th class="ivu-table-column-center" width="80">
                  <div class="ivu-table-cell">
                    <span class>金额</span>
                  </div>
                </th>
                <th class="ivu-table-column-center" width="80">
                  <div class="ivu-table-cell">
                    <span class>单面积</span>
                  </div>
                </th>
                <th class="ivu-table-column-center" width="80">
                  <div class="ivu-table-cell">
                    <span class>面积</span>
                  </div>
                </th>
                <th class="ivu-table-column-center" width="80">
                  <div class="ivu-table-cell">
                    <span class>客户</span>
                  </div>
                </th>
                <th class="ivu-table-column-center" width="80">
                  <div class="ivu-table-cell">
                    <span class>产品名称</span>
                  </div>
                </th>
                <th class="ivu-table-column-center" width="80">
                  <div class="ivu-table-cell">
                    <span class>产品编号</span>
                  </div>
                </th>
                <th class="ivu-table-column-center" width="80">
                  <div class="ivu-table-cell">
                    <span class>料号</span>
                  </div>
                </th>
                <th class="ivu-table-column-center" width="80">
                  <div class="ivu-table-cell">
                    <span class>备注</span>
                  </div>
                </th>
              </tr>
            </template>

            <template slot="body" slot-scope="{ row, index, valueChangeAssign }">
              <!--月结	-->
              <td class="ivu-table-column-center" width="100">
                <Checkbox
                  size="default"
                  v-model="row.isAcc"
                  @input="
                    value => {
                      valueChangeAssign(value, index, row, 'isAcc');
                    }
                  "
                ></Checkbox>
              </td>
              <!--工单号 -->
              <td class="ivu-table-column-center" width="100">
                <Input
                  v-model="row.groupNo"
                  @input="
                    value => {
                        valueChangeAssign(value, index, row, 'groupNo');
                    }
                    "
                  size="small"
                  :maxlength="20"
                ></Input>
              </td>
              <!-- 批次 -->
              <td class="ivu-table-column-left" width="100">
                <Input
                  v-model="row.boxUseBatchOn"
                  @input="
                      value => {
                        valueChangeAssign(value, index, row, 'boxUseBatchOn');
                      }
                    "
                  size="small"
                  :maxlength="20"
                ></Input>
              </td>
              <!--本厂纸质 -->
              <td class="ivu-table-column-left" width="100">
                <popup
                  :popupClickValidator="clickValuedate"
                  v-model="row.artCode"
                  field-name="artCode"
                  :disabled="false"
                  popup-name="PurSupplierArtItemSingleBox"
                  :fill-model.sync="formDataInfo.paperJoinItemEditDTOS.defaultList"
                  render-fields="supplierArtId,supplierArtName,artId,artCode,lbCode,lengId"
                  from-fields="supplierArtId,supplierArtName,artId,artCode,lbCode,lengId"
                  :index="index"
                  :init-data="itemInitData"
                  :query-params="{supplierId:formDataInfo.master.supplierId,'supplierArtName$ne':row.supplierArtName}"
                  @input="
                      value => {
                        valueChangeAssign(value, index, row, 'ppoArtCode');
                      }
                    "
                />
                <!-- <Input
                  v-model="row.ppoArtCode"
                  @input="
                      value => {
                        valueChangeAssign(value, index, row, 'ppoArtCode');
                      }
                    "
                  size="small"
                  :maxlength="20"
                ></Input>-->
              </td>
              <!-- 供应商纸质 -->
              <td class="ivu-table-column-left" width="100">
                <popup
                  :popupClickValidator="clickValuedate"
                  v-model="row.supplierArtName"
                  field-name="supplierArtName"
                  :disabled="false"
                  popup-name="PurSupplierArtItemSingleBox"
                  :fill-model.sync="formDataInfo.paperJoinItemEditDTOS.defaultList"
                  render-fields="supplierArtId,supplierArtName,artId,artCode,lbCode,lengId"
                  from-fields="supplierArtId,supplierArtName,artId,artCode,lbCode,lengId"
                  :index="index"
                  :init-data="itemInitData"
                  :query-params="{supplierId:formDataInfo.master.supplierId,'supplierArtName$ne':row.supplierArtName}"
                  @input="
                      value => {
                        valueChangeAssign(value, index, row, 'supplierArtName');
                      }
                    "
                />
              </td>
              <!-- 楞别 -->
              <td class="ivu-table-column-center" width="100">
                <Input
                  v-model="row.lbCode"
                  @input="
                    value => {
                        valueChangeAssign(value, index, row, 'lbCode');
                    }
                    "
                  size="small"
                  :maxlength="20"
                ></Input>
              </td>
              <!--纸宽 -->
              <td class="ivu-table-column-center" width="100">
                <Input
                  v-model="row.sizeW"
                  @input="
                    value => {
                        valueChangeAssign(value, index, row, 'sizeW');
                    }
                    "
                  size="small"
                  :maxlength="20"
                ></Input>
              </td>
              <!--纸长 -->
              <td class="ivu-table-column-center" width="100">
                <Input
                  v-model="row.sizeL"
                  @input="
                    value => {
                        valueChangeAssign(value, index, row, 'sizeL');
                    }
                    "
                  size="small"
                  :maxlength="20"
                ></Input>
              </td>
              <!--压线 -->
              <td class="ivu-table-column-center" width="100">
                <Input
                  v-model="row.sizeLine"
                  @input="
                    value => {
                        valueChangeAssign(value, index, row, 'sizeLine');
                    }
                    "
                  size="small"
                  :maxlength="20"
                ></Input>
              </td>
              <!--采购数量 -->
              <td class="ivu-table-column-center" width="100">
                <Input
                  v-model="row.stockQty"
                  @input="
                    value => {
                        valueChangeAssign(value, index, row, 'stockQty');
                    }
                    "
                  size="small"
                  :maxlength="20"
                ></Input>
              </td>
              <!--本次入库数 -->
              <td class="ivu-table-column-center" width="100">
                <Input
                  @on-change="getqty"
                  v-model="row.qty"
                  @input="
                    value => {
                        valueChangeAssign(value, index, row, 'qty');
                    }
                    "
                  size="small"
                  :maxlength="20"
                ></Input>
              </td>
              <!--备品数 -->
              <td class="ivu-table-column-center" width="100">
                <Input
                  v-model="row.prepQty"
                  @input="
                    value => {
                        valueChangeAssign(value, index, row, 'prepQty');
                    }
                    "
                  size="small"
                  :maxlength="20"
                ></Input>
              </td>
           
              <!--已入库数 -->
              <td class="ivu-table-column-center" width="100">
                <Input
                  v-model="row.inQty"
                  @input="
                    value => {
                        valueChangeAssign(value, index, row, 'inQty');
                    }
                    "
                  size="small"
                  :maxlength="20"
                ></Input>
              </td>
              <!--退货数 -->
              <td class="ivu-table-column-center" width="100">
                <Input
                  v-model="row.rQty"
                  @input="
                    value => {
                        valueChangeAssign(value, index, row, 'rQty');
                    }
                    "
                  size="small"
                  :maxlength="20"
                ></Input>
              </td>
              <!--报价 -->
              <td class="ivu-table-column-center" width="100">
                <Input
                  v-model="row.quotePrice"
                  @input="
                    value => {
                        valueChangeAssign(value, index, row, 'quotePrice');
                    }
                    "
                  size="small"
                  :maxlength="20"
                ></Input>
              </td>
              <!--单价 -->
              <td class="ivu-table-column-center" width="100">
                <Input
                  v-model="row.price"
                  @input="
                    value => {
                        valueChangeAssign(value, index, row, 'price');
                    }
                    "
                  size="small"
                  :maxlength="20"
                ></Input>
              </td>
              <!--金额-->
              <td class="ivu-table-column-center" width="100">
                <Input
                  @on-change="getmoney"
                  v-model="row.money"
                  @input="
                    value => {
                        valueChangeAssign(value, index, row, 'money');
                    }
                    "
                  size="small"
                  :maxlength="20"
                ></Input>
              </td>
              <!--单面积 -->
              <td class="ivu-table-column-center" width="100">
                <Input
                  v-model="row.sArea"
                  @input="
                    value => {
                        valueChangeAssign(value, index, row, 'sArea');
                    }
                    "
                  size="small"
                  :maxlength="20"
                ></Input>
              </td>
              <!--面积-->
              <td class="ivu-table-column-center" width="100">
                <Input
                  v-model="row.ppoArea"
                  @input="
                    value => {
                        valueChangeAssign(value, index, row, 'ppoArea');
                    }
                    "
                  size="small"
                  :maxlength="20"
                ></Input>
              </td>
              <!-- 客户	-->
              <td class="ivu-table-column-left" width="100">
                <Input
                  v-model="row.custCode"
                  @input="
                    value => {
                        valueChangeAssign(value, index, row, 'custCode');
                    }
                    "
                  size="small"
                  :maxlength="20"
                ></Input>
              </td>
              <!-- 产品名称	-->
              <td class="ivu-table-column-left" width="100">
                <Input
                  v-model="row.partName"
                  @input="
                    value => {
                        valueChangeAssign(value, index, row, 'partName');
                    }
                    "
                  size="small"
                  :maxlength="20"
                ></Input>
              </td>
              <!-- 产品编号	-->
              <td class="ivu-table-column-left" width="100">
                <Input
                  v-model="row.prodNo"
                  @input="
                    value => {
                        valueChangeAssign(value, index, row, 'prodNo');
                    }
                    "
                  size="small"
                  :maxlength="20"
                ></Input>
              </td>
              <!--料号-->
              <td class="ivu-table-column-center" width="100">
                <Input
                  v-model="row.partNumer"
                  @input="
                    value => {
                        valueChangeAssign(value, index, row, 'partNumer');
                    }
                    "
                  size="small"
                  :maxlength="20"
                ></Input>
              </td>
                 <!--备注-->
              <td class="ivu-table-column-left" width="100">
                <Input
                  v-model="row.remark"
                  @input="
                      value => {
                        valueChangeAssign(value, index, row, 'remark');
                      }
                    "
                  size="small"
                  :maxlength="20"
                ></Input>
              </td>
            </template>
          </eTable>
        </TabPane>
      </Tabs>
    </editWindow>
    <!-- <preferential v-model="showpreferential" @preferential-ok="preferentialOk"></preferential> -->
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
import preferential from "@/components/preferential/preferential";
import popup from "@/components/popup/popup";
import editWindow from "@/components/edit-window/edit-window";
import eTable from "@/components/e-table/e-table";
import request from "@/libs/request";
import editBaseMixins from "../../mixins/edit";
import optionSearch from "../../components/optionSearch";
import dayjs from "dayjs";
import Sys from "@/api/sys";
const default_formDataInfo = {
  // 主表 更改字段
  master: {
    isAcc: true,
    carNo: "",
    pjDate: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    accDate: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    iisAudit: 0,
    money: 0,
    pjNumber: "",
    qty: 0,
    rate: 0,
    remark: "",
    shNumber: "",
    status: 0,
    supplierId: 0,
    supplierName: "",
    taxRat: 0,
    taxTp: "",
    updateUsername: ""
  },
  // 子表 artLengs 根据实际接口更改,其它不变
  paperJoinItemEditDTOS: {
    addList: [], // 添加列
    defaultList: [], // 默认列
    deleteList: [], // 删除列
    updateList: [] // 更新列
  }
};
export default {
  name: "edit-paperJoin",
  mixins: [editBaseMixins],
  components: {
    editWindow,
    optionSearch,
    preferential,
    eTable,
    popup
    // Form,
  },
  data() {
    return {
      formName: "stockPurPaperJoinItemFm",
      //   currentExpressType:"", //当前打开的优惠方式类型
      //   showpreferential:false,
      requestBaseUrl: "/stock/paperJoin", // 请求 查询 操作的基础路径
      formDataInfo: Object.assign({}, default_formDataInfo), // 防止添加和更新数据提交发生冲突
      itemInitData: {},
      // 需要验证的数据
      ruleValidate: {
        //  pactNo: [
        //   { required: true, message: "合同编号不能为空", trigger: "blur" }
        //  ]
      },
      cliclleng: null,
      getsupplierId:0
    };
  },
  methods: {
    //判断数据是新增还是修改
    formDetailDataCall() {
      //debugger
      if (this.action != 'add') {
          //debugger
          this.getsupplierId = this.formDataInfo.master.supplierId
        }
    },
     //当主表客户弹框改变时促发初始化子表数据
    Initializationdata(){
        let tableData = this.$refs["tableFields"].getCategorizeData();
        //debugger
        if (this.formDataInfo.master.supplierId) {
          if (this.formDataInfo.master.supplierId != this.getsupplierId) {
            this.formDataInfo.paperJoinItemEditDTOS.defaultList = []
           tableData.deleteList = tableData.updateList 
          }
          this.getsupplierId = this.formDataInfo.master.supplierId
        }
    },
    //获取子表金额  money金额
    getmoney() {
      let mastermoney = 0;
      //debugger;
      let tableData = this.$refs["tableFields"].getCategorizeData();
      for (let i = 0; i < tableData.addList.length; i++) {
        let money = Number(tableData.addList[i].money);
        if (!!tableData.addList[i].money) {
          mastermoney += money;
        }
      }
      this.formDataInfo.master.money = mastermoney;
    },

    //获取子表本次入库数总数  qty本次入库数
    getqty() {
      let masterstockqty = 0;
      let tableData = this.$refs["tableFields"].getCategorizeData();
      for (let i = 0; i < tableData.addList.length; i++) {
        let stockqty = Number(tableData.addList[i].qty);
        if (!!tableData.addList[i].qty) {
          masterstockqty += stockqty;
        }
      }
      this.formDataInfo.master.qty = masterstockqty;
    },
    //判断主表供应商弹框不能为空
    clickValuedate() {
      //debugger;
      if (
        !this.formDataInfo.master.supplierCode ||
        this.formDataInfo.master.supplierCode == ""
      ) {
        this.$Message.error("供应商编号不能为空");
        return false;
      }
      console.log(this.$refs["tableFields"].data);
      return true;
    },
    //判断子表供应商弹框不能为空
    // clickValueleng(){
    //   for (let i = 0; i < this.$refs['tableFields'].cloneData.length; i++) {
    //     //debugger
    //     this.cliclleng = this.$refs['tableFields'].cloneData[i].ppoArtId
    //     if(!this.cliclleng || this.cliclleng == ""){
    //       this.$Message.error("供应商纸质不能为空")
    //       return false
    //     }
    //     console.log(this.$refs['tableFields'].data)
    //       return true

    //   }

    // },
    // 重写父类,添加时候,清空数据
    HandleFormDataInfo() {
      this.formDataInfo = Object.assign({}, default_formDataInfo);
    },
    // 重写父类,修改提交数据
    resetformDataInfo(_data) {
      let tableData = this.$refs["tableFields"].getCategorizeData();
      //debugger;
      this.formDataInfo.paperJoinItemEditDTOS = tableData;
      if (!!_data.master.accDate || !!_data.master.pjDate) {
        _data.master.accDate = dayjs(_data.master.accDate).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        _data.master.pjDate = dayjs(_data.master.pjDate).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      }
      console.log(this.formDataInfo);
      return this.formDataInfo;
    }
  }
};
</script>

<style>
.cl-edit-paperJoin .ivu-form-item {
  margin-bottom: 5px !important;
}
.cl-edit-paperJoin .ivu-select-item {
  display: block;
}
/* .cl-edit-paperJoin .ivu-input-type-text{
  width: 200px
} */
.cl-edit-paperJoin .right-text{
  width: 500px
}
</style>
