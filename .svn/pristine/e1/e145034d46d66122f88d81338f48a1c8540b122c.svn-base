<template>
  <div>
    <editWindow
      class="cl-edit-accPay"
      :title="actionLableName"
      v-model="showWindow"
      :fullscreen="true"
      width="90%"
      :loading="!isLoaddingDone"
      :loaddingBtn="loading_submit_btn"
      :spinLoaddingText="spinLoaddingText"
      @on-ok="formTableDataSubmit()"
      v-if="initData.columns"
      :disabledSubmitBtn="disabledSubmitBtn"
    >
      <div
        @contextmenu.prevent
        ref="masterHeight"
        class="masterHeightClass"
        :style="{ height: getMasterheight() + '%' }"
      >
        <Form
          ref="formDataInfo"
          :show-message="true"
          :model="formDataInfo.master"
          :rules="masterRuleValidate"
          :label-width="90"
          :disabled="detailDisabled"
        >
          <Row>
            <Col span="6">
              <FormItem label="立账单号" prop="apNo">
                <Input
                  :disabled="true"
                  v-model="formDataInfo.master.apNo"
                  maxlength="80"
                  placeholder="立账单号"
                ></Input>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="立账日期" prop="apDate">
                <DatePicker
                  @on-change="onChange_apDate"
                  transfer
                  :clearable="false"
                  :value="formDataInfo.master.apDate"
                  type="date"
                  format="yyyy-MM-dd"
                ></DatePicker>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem
                :label-width="100"
                label="供应商编号"
                prop="supplierCode"
              >
                <popup
                  v-model="formDataInfo.master.supplierCode"
                  field-name="supplierCode"
                  :disabled="false"
                  popup-name="SupplierSingleBox"
                  :fill-model.sync="formDataInfo.master"
                  render-fields="supplierId,supplierCode,supplierName,taxRate,supplierType,discount,arpType"
                  from-fields="id,purCode,purName,taxRate,vType,discount,arpType"
                  :suffix="true"
                  :suffix-model="formDataInfo.master.supplierName"
                  @on-fill="supplierCodeOnFillEvent"
                />
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem :label-width="90" label="供应商类型">
                <optionSearch
                  :disabled="true"
                  @onChange="optionOnChangeBy"
                  :defaultItem="formDataInfo.master.supplierType"
                  :loaddingDataWhen="showWindow"
                  formKey="supplierType"
                  query="vType"
                />
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="月结年月" prop="apMonth">
                <DatePicker
                  @on-change="onChange_apMonth"
                  transfer
                  :clearable="false"
                  :value="formDataInfo.master.apMonth"
                  type="month"
                  format="yyyyMM"
                ></DatePicker>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="起始日期" prop="startDate">
                <DatePicker
                  @on-change="onChange_startDate"
                  transfer
                  :clearable="false"
                  :value="formDataInfo.master.startDate"
                  type="date"
                  format="yyyy-MM-dd"
                ></DatePicker>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="结束日期" prop="endDate">
                <DatePicker
                  @on-change="onChange_endDate"
                  transfer
                  :clearable="false"
                  :value="formDataInfo.master.endDate"
                  type="date"
                  format="yyyy-MM-dd"
                ></DatePicker>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem :label-width="90" label="货款到期日" prop="arriveDate">
                <DatePicker
                  @on-change="onChange_arriveDate"
                  transfer
                  :clearable="false"
                  :value="formDataInfo.master.arriveDate"
                  type="date"
                  format="yyyy-MM-dd"
                ></DatePicker>
              </FormItem>
            </Col>

            <Col span="6">
              <FormItem label="金额" prop="amt">
                <InputNumber
                  :disabled="true"
                  placeholder="金额"
                  :min="0"
                  v-model="formDataInfo.master.amt"
                />
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem
                :label-width="100"
                label="明细折后金额"
                prop="itemDisAmt"
              >
                <InputNumber   :disabled="true" placeholder="明细折后金额" :min="0" v-model="formDataInfo.master.itemDisAmt"/>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="折扣(%)" prop="discount">
                <InputNumber
                  @on-change="sumTotalMoney()"
                  :disabled="false"
                  placeholder="折扣(%)"
                  :min="0"
                  :max="100"
                  v-model="formDataInfo.master.discount"
                />
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="折后金额" prop="disAmt">
                <InputNumber
                  :disabled="true"
                  placeholder="折后金额"
                  :min="0"
                  v-model="formDataInfo.master.disAmt"
                />
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="税率" prop="taxRate">
                <InputNumber
                 style="width:100%"
                  placeholder="税率"
                  :min="0"
                  v-model="formDataInfo.master.taxRate"
                />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="备注" prop="remark">
                <Input
                  v-model="formDataInfo.master.remark"
                  maxlength="80"
                  placeholder="备注"
                ></Input>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
      <div ref="otherHeight" class="otherHeightClass">
        <Tabs>
          <TabPane label="应付对账单明细" name="stockboxdeliitem">
            <eTable
              ref="slave_list_table_edit"
              unqiue-mark="id"
              :height="otherHeight - 40"
              :index-menu="true"
              :col-start="0"
              :row-init-data="
                initData.initData[`${functionParams.formInitPreName}itemFm`]
              "
              :data="formDataInfo['accPayItems'].defaultList"
              :rules="slaveTableFieldsValidator"
              @row-delete="slave_list_table_edit_Delete"
              @tableColTiggerEventCall="tableColTiggerEventCall"
            >
              <template slot="head">
                <tr
                  v-for="(columnGroup, index) in initData.columns[
                    `${functionParams.formInitPreName}itemFm`
                  ].editGroups"
                  :key="index"
                >
                  <template v-for="(column, index2) in columnGroup">
                    <th
                      v-if="excludeFiled('itemFm', column.key)"
                      :key="index2"
                      :class="`ivu-table-column-${column.titleAlign}`"
                      :width="column.editWidth"
                      :colspan="column.colSpan"
                      :rowspan="column.rowSpan"
                      :columnKey="column.key"
                    >
                      <div class="ivu-table-cell">
                        <span class="">{{ column.title }}</span>
                      </div>
                    </th>
                  </template>
                </tr>
              </template>
              <template
                slot="body"
                slot-scope="{
                  row,
                  index,
                  valueChangeAssign,
                  tableColTiggerEvent
                }"
              >
                <template
                  v-for="(column, subIndex) in initData.columns[
                    `${functionParams.formInitPreName}itemFm`
                  ].editColumns"
                >
                  <td
                    :key="subIndex"
                    :class="`ivu-table-column-${column.align}`"
                    v-if="excludeFiled('itemFm', column.key)"
                    :width="column.editWidth"
                  >
                    <!-- 控件特殊处理 单据号 -->
                    <template v-if="column.key == 'billNo'">
                      <Input
                        v-model="row[column.key]"
                        :disabled="true"
                        @input="
                          value => {
                            valueChangeAssign(value, index, row, column.key);
                          }
                        "
                      >
                        <Icon
                          @click="openProductsList()"
                          slot="suffix"
                          type="md-add"
                        />
                      </Input>
                    </template>
                      <!-- 单据类型-->
                      <Select @on-change="value => {valueChangeAssign(value, index, row,column.key)}" :disabled="true" v-else-if="column.key == 'billType'" v-model="row[column.key]" transfer>
                        <Option v-for="(item,index) in accPayItemBillTypeList" :key="index" :value="item.dicValue+''">{{item.dicLabel}}</Option>
                      </Select>
                    <!-- 明细折扣-->
                    <template v-else-if="column.key === 'discount'">
                      <Input
                        v-model="row[column.key]"
                        @input="
                          tableColTiggerEvent(
                            row,
                            column,
                            index,
                            'discountChangeEvent'
                          )
                        "
                      >
                      </Input>
                    </template>
                    <!--其它 控件 :placeholder="column.title"-->
                    <template v-else>
                      <formControl
                        :align="column.align"
                        :control-type="column.controlType"
                        v-model="row[column.key]"
                        :disabled="column.readOnly"
                        @input="
                          value => {
                            valueChangeAssign(value, index, row, column.key);
                          }
                        "
                      ></formControl>
                    </template>
                  </td>
                </template>
              </template>
            </eTable>
          </TabPane>
        </Tabs>
      </div>
    </editWindow>
    <editForm
      @on-cancel="onCancelEditForm"
      @submit-success="onSubmitEditForm"
      :isLoaddingDone="salveWindow.isLoaddingDone"
      :action="salveWindow.action"
      v-model="salveWindow.showEditWindow"
      :searchParams="searchParams"
    />
  </div>
</template>

<script>
/**
 * @desc edit-accPay 描述 增加/编辑 应付对账单
 * 所有重要 可以重用的方法 放在了基类,继承即可用重复使用 editBaseMixins,
 * 可以根据需求重写所需的方法:
 *
 * @params 参数
 *
 * @return 返回
 *
 * @author Andy Huang
 *
 * @created 2020/05/12
 */
import popup from "@/components/popup/popup";
import editWindow from "@/components/edit-window/edit-window";
import eTable from "@/components/e-table/e-table";
import request from "@/libs/request";
import editBaseMixins from "../../mixins/edit";
import optionSearch from "../../components/optionSearch";
import InputNumber from "@/components/input-number";
import dayjs from "dayjs";
import Sys from "@/api/sys";
import editForm from "./edit-accPaySlave";
import formControl from "@/components/form-control/form-control";
import { deepCopy } from "view-design/src/utils/assist";
const default_formDataInfo = {
  // 主表 更改字段
  master: {
    amt: 0,
    apDate: new Date(dayjs().format("YYYY-MM-DD HH:mm:ss")),
    apMonth: new Date(dayjs().format("YYYY-MM")), // 会计月份,
    apNo: "",
    itemDisAmt:0,// 明细折后金额
    arriveDate:'',// new Date(dayjs().format("YYYY-MM-DD HH:mm:ss")),
    disAmt: 0,
    discount: 0,
    endDate: '',//new Date(dayjs().format("YYYY-MM-DD HH:mm:ss")),
    invoicedAmt: 0,
    notInvoicedAmt: 0,
    remark: "",
    startDate: '',//new Date(dayjs().subtract(1, 'month').format("YYYY-MM-DD" )),
    supplierCode: null,
    supplierId: 0,
    supplierName: "",
    supplierType: "",
    supplierTypeText: "",
    taxRate: null,
    arpType:''// 自定义 月结方式
  },
  accPayItems: {
    addList: [], // 添加列
    defaultList: [], // 默认列
    deleteList: [], // 删除列
    updateList: []
  }
};
export default {
  name: "edit-accPay",
  mixins: [editBaseMixins],
  components: {
    editForm,
    editWindow,
    optionSearch,
    eTable,
    InputNumber,
    popup,
    formControl
  },
  data() {
    return {
      accPayItemBillTypeList:[],// 应付对账单明细单据类型
      disabledSubmitBtn: false, // 是否禁用确认按钮
      formName: "accountaccpayFm", // 重写父类 查询表单名称 stockboxreitemFm
      // 查询配置参数
      functionParams: {
        formInitPreName: "accountaccpay", // 查询表格列头信息 前缀 例如:saleboxproductprice Fm/itemFm/mdataFm
        requestBaseUrl: "/account/accPay", // 查询 表格行 数据 接口前缀地址
        uniqueId: "apId" // 查询详细的唯一ID,需要顶部查询中使用
      },
      actionSubtitle: "应付对账单", //重写父类 当前操作副标题
      salveWindow: {
        isLoaddingDone: false, // 窗口是否加载完成
        showEditWindow: false, // 是否显示edit-invoiceCheckSlave 编辑窗口
        action: "add" // 当前操作功能 添加/编辑
      },
      formDataInfo: deepCopy(default_formDataInfo), // Object.assign({}, default_formDataInfo), // 防止添加和更新数据提交发生冲突
      masterRuleValidate: {
        supplierCode: [
          { required: true, message: "供应商编号不能为空", trigger: "blur" }
        ]
      }, // 纸箱出货 需要验证的数据
      slaveTableFieldsValidator: {}, // 纸箱出货明细 需要验证的数据
      masterHeight: 0, //表单高度
      otherHeight: 0, //剩余高度
      searchParams: {}, //传递查询参数
      boxReTypeList: [], //退仓类型 列表
      accPayguideDataList:[],// 应收对账单向导 数据列表
      loading_submit_btn:false,// 加载中 提交按钮
      disabledCustCode: false // 是否禁用 供应商编号
    };
  },
  watch: {
    showWindow: function(n, o) {
      if (n) {
        let _self = this;
        this.$nextTick(() => {
          this.registerEvent();
          this.pageResize();
          // 延迟赋值,不然数据还没有正确返回的情况下,无法绑定默认值
          setTimeout(() => {
            this.setDefaultData();
          }, 1000);
        });
      }
    }
  },
  created() {
     this.getAccPayItemBillTypeList()
  },
  methods: {
   
     // 通过参数查询数据列表
    searchDataBy() {
        this.accPayguideDataList = [] // 重置数据列表
       // 参数包括：
        let params = {
          //startDate: !!!this.formDataInfo.master.startDate?'': dayjs(this.formDataInfo.master.startDate).format("YYYY-MM-DD"), //(开始日期)
          //endDate: !!!this.formDataInfo.master.endDate?'':dayjs(this.formDataInfo.master.endDate).format("YYYY-MM-DD"), //(结束日期)
         // apDate: !!!this.formDataInfo.master.apDate?'':dayjs(this.formDataInfo.master.apDate).format("YYYY-MM-DD"), //((立账日期))
          apMonth:!!!this.formDataInfo.master.apMonth?'': dayjs(this.formDataInfo.master.apMonth).format("YYYYMM"), //((月结月份))
         // monthEnd: this.formDataInfo.master.monthEnd, //((月结终止日))
          mode:'1', //(采用供应商资料中的设置:0,1),开始时间,结束时间为空 模式必须为1
          supplierCodes: this.formDataInfo.master.supplierCode,// 供应商编号【多个用,隔开】
        };
        this.loading_submit_btn = true;
        request
          .post(
            `${this.functionParams.requestBaseUrl}/getAccPaySupplierData?pageNumber=1&pageSize=10`,
            params
          )
          .then(res => {
            if (res &&  res.records.length > 0) {
              // 注意返回的数据的结构
               this.accPayguideDataList = res.records
               if(this.accPayguideDataList && this.accPayguideDataList.length>0){
                 // 获取填充 起始时间，结束时间，货款到期日，折扣，税率 
                 let objItem = this.accPayguideDataList[0]
                  this.formDataInfo.master.startDate =  !!!objItem.startDate?'':new Date(dayjs(objItem.startDate).format("YYYY-MM-DD")) // 起始日期
                  this.formDataInfo.master.endDate =  !!!objItem.endDate?'':new Date(dayjs(objItem.endDate).format("YYYY-MM-DD")) // 结束日期
                  this.formDataInfo.master.arriveDate =  !!!objItem.arriveDate?'':new Date(dayjs(objItem.arriveDate).format("YYYY-MM-DD")) // 货款到期日
                  this.formDataInfo.master.discount =  objItem.discount // 折扣
                  this.formDataInfo.master.taxRate =  objItem.taxRate// 税率
               }
            }
            this.loading_submit_btn = false;
          })
          .catch(err => {
            this.loading_submit_btn = false;
          });
    },
    getAccPayItemBillTypeList(){
          //获取  单据类型 
        this.getDataFromDictionaryBy('accPayItemBillType').then(res=>{
          this.accPayItemBillTypeList = res
        })
      },
    // 供应商选择后回调事件
    supplierCodeOnFillEvent(item) {
      //单独校验客户编号
      this.$refs["formDataInfo"].validateField("supplierCode", err => {});
      this.searchDataBy()
    },
    // 弹框==确认==回调事件,返回选择的数据
    onSubmitEditForm(dataList) {
      if (dataList && Array.isArray(dataList) && dataList.length > 0) {
        this.disabledCustCode = true; // 禁用客户选择
        dataList = this.itemAdapter(dataList);
        let defaultList = this.formDataInfo["accPayItems"].defaultList;
        if (defaultList[0].billNo == "") {
          this.formDataInfo["accPayItems"].defaultList = dataList;
        } else {
          dataList.forEach(item => {
            if (!this.checkIsExistBy(item)) {
              defaultList.push(item);
            }
          });
          // 删除多余的空行
          defaultList.forEach((item, index) => {
            if (item.billNo == "" || item.billNo == null) {
              defaultList.splice(index, 1);
            }
          });
        }
      }
      this.sumTotalMoney();
    },
    // 检查列表数据是否已经存在,避免重复添加
    checkIsExistBy(item) {
      let isExistIndex = this.formDataInfo["accPayItems"].defaultList.findIndex(
        subItem => {
          return (
            subItem.billNo == item.billNo &&
            subItem.boxUseBatchOn == item.boxUseBatchOn // 批次号 唯一
          );
        }
      );
      if (isExistIndex != -1) {
        return true;
      } else {
        return false;
      }
    },
    //实体转换,获取相同Key的value,个别不同的手动修改值
    itemAdapter(dataList) {
      let newDataList = [];
      dataList.forEach(oldItem => {
        let newItem = JSON.parse(
          JSON.stringify(
            this.initData.initData[
              `${this.functionParams.formInitPreName}itemFm`
            ]
          )
        );
        let newItemKeys = Object.keys(newItem);
        newItemKeys.forEach(itemKey => {
          newItem[itemKey] = null;
          if (oldItem[itemKey]) {
            // itemKey in oldItem in右操作数必须是一个对象值
            //  var mycar = {make: "Honda", model: "Accord", year: 1998};
            // "make" in mycar  // 返回true
            newItem[itemKey] = oldItem[itemKey];
          }
        });
        // 应付对账单明细 折后金额= (金额 *	明细折扣(%)	)/100
        newItem.disAmt = ((Number(oldItem.amt) * Number(oldItem.discount))/100).toFixed(2);
        //====== 额外需要转换的字段S=======
        // newItem.iciZk = oldItem.discount; // 折扣
        //====== 额外需要转换的字段E=======
        newDataList.push(newItem);
      });
      return newDataList;
    },
    // 弹框==取消==回调事件
    onCancelEditForm() {},
    // 订单编号 点击事件,打开选择产品列表窗口
    openProductsList() {
      // 传递参数到 子窗口
      this.searchParams = {
        supplierId: this.formDataInfo.master.supplierId, // 供应商id
        arpType:this.formDataInfo.master.arpType,// 月结方式
        startDate:this.formDataInfo.master.startDate, // 起始日期
        endDate:this.formDataInfo.master.endDate, // 结束日期
        arriveDate:this.formDataInfo.master.arriveDate, // 货款到期日
        discount:this.formDataInfo.master.discount, // 折扣
        taxRate:this.formDataInfo.master.taxRate, // 税率
        apMonth:this.formDataInfo.master.apMonth // 月结月份
      };
      if (this.popupClickValidator()) {
        this.salveWindow.showEditWindow = true;
      }
    },
    // 纸箱退货明细 删除数据 回调
    slave_list_table_edit_Delete(index) {
       this.sumTotalMoney();
    },
    // 是否需要设置时间格式
    setNewDate(dateValue,needNewDate=false){
      if(needNewDate){
        return new Date(dateValue)
      }else{
        return dateValue
      }
    },
    // 初始值 设置
    setDefaultData() {
      this.disabledSubmitBtn = false
      let invoicedAmt = Number(this.formDataInfo.master.invoicedAmt);
      if (invoicedAmt > 0) {
        //已开票金额一旦写入值时，单据不能修改/不能删除
        this.disabledSubmitBtn = true;
      }
      if (!!!this.formDataInfo.master.supplierType) {
        // 供应商类型 :默认 全部
        this.formDataInfo.master.supplierType = "0";
      }
      this.formatDateTime(true)
    },
    // 立账日期 改变时间回调事件
    onChange_apDate(item) {
      if (!_.isEmpty(item)) {
        this.formDataInfo.master.apDate = new Date(item);
      }
    },
    // 起始日期 改变时间回调事件
    onChange_startDate(item) {
      if (!_.isEmpty(item)) {
        this.formDataInfo.master.startDate = new Date(item);
      }
    },
    // 结束日期 改变时间回调事件
    onChange_endDate(item) {
      if (!_.isEmpty(item)) {
        this.formDataInfo.master.endDate = new Date(item);
      }
    },
    // 会计月份 改变时间回调事件
    onChange_apMonth(item) {
      if (!_.isEmpty(item)) {
        this.formDataInfo.master.apMonth = new Date(
          dayjs(item).format("YYYY-MM")
        );
      }
    },
    // 货款到期日 改变时间回调事件
    onChange_arriveDate(item) {
      if (!_.isEmpty(item)) {
        this.formDataInfo.master.arriveDate = new Date(item);
      }
    },
    // 表格列值改变 回调事件处理event：{row, column, index, event,config}
    tableColTiggerEventCall(obj) {
      switch (obj.event) {
        //修改明细折扣，明细的折后金额会随着变化
        case "discountChangeEvent":
          // 触发修改值 直接修改原始数据 无效
            let disAmt = ((Number(obj.row.amt) * Number(obj.row.discount))/100).toFixed(2);
            this.$refs["slave_list_table_edit"].set(
              { discount: obj.row.discount,disAmt:disAmt },
              obj.index
            );

          this.sumTotalMoney();
          break;
        default:
          break;
      }
    },
    // 汇总总金额 ///修改主表折扣，也会影响主表金额
    sumTotalMoney() {
      let totolMoney = 0;
      let totolDiscontMoney = 0;
      this.formDataInfo["accPayItems"].defaultList.forEach((item, index) => {
        // 金额 累加
        let currentRowMoney = Number(
          (item.amt = null ? 0 : item.amt)
        );
        totolMoney = totolMoney + currentRowMoney;
        // 细折后金额 累加
        let currentRowDiscountMoney = Number(
          (item.disAmt = null ? 0 : item.disAmt)
        );
        totolDiscontMoney = totolDiscontMoney + currentRowDiscountMoney;
      });
      // 设置主表 总金额 
      this.formDataInfo.master.amt = totolMoney.toFixed(2);
       // 设置主表 总细折后金额
      this.formDataInfo.master.itemDisAmt = totolDiscontMoney.toFixed(2);
      //主表 折后金额=明细折后金额汇总 * 主表折扣
      this.formDataInfo.master.disAmt = ((this.formDataInfo.master.itemDisAmt * Number(this.formDataInfo.master.discount))/100).toFixed(2)
    },
    // 验证产品编号选择前先选择客户
    popupClickValidator() {
     // debugger;
      if (
        !this.formDataInfo.master.supplierCode ||
        this.formDataInfo.master.supplierCode == ""
      ) {
        this.$Message.error("请先选择供应商编号");
        return false;
      }
      return true;
    },
    custCodeOnFillEvent() {
      // 切换用户,清除明细信息
      let dataList = this.formDataInfo["accPayItems"].defaultList;
      if (dataList.length > 0) {
        if (dataList[0].billNo != null && dataList[0].billNo != "") {
          this.$refs["slave_list_table_edit"].deleteAllData(); // 仅仅记录删除记录,
          this.formDataInfo["accPayItems"].defaultList = [];
        }
      }
    },
    // 排除不需要显示的字段
    excludeFiled(type, key) {
      let exListitemFm = [];
      let exList = [];
      switch (type) {
        case "itemFm":
          exList = exListitemFm;
          break;
        default:
          exList = [];
          break;
      }
      if (exList.includes(key)) {
        return false;
      } else {
        return true;
      }
    },
    // 注册窗口事件
    registerEvent() {
      let _self = this; //赋值vue的this
      window.onresize = () => {
        //调用methods中的事件
        _self.pageResize();
      };
    },
    // 触发窗口大小变化事件
    pageResize() {
      this.$nextTick(() => {
        this.getTabWindowHeight();
      });
    },
    // 获取当前TAB标签的实际高度
    getTabWindowHeight() {
      this.getMasterheight();
      // 因为使用V-SHOW 隐藏,实际还会占用高度,所以切换时,设置为0 或使用V-IF 可以不用那么麻烦,但性能较低
      if (this.$refs["masterHeight"]) {
        this.masterHeight = this.$refs["masterHeight"].offsetHeight;
        this.otherHeight = this.$refs["otherHeight"].offsetHeight;
      }
    },
    getMasterheight() {
      return 30;
    },
    // 重写父类 关闭窗口时 触发事件
    closeActionTigger() {
      // fix 清除上次的错误提示 formDataInfo 为表单ref名称
      this.$refs["formDataInfo"].resetFields();
      this.$refs["slave_list_table_edit"].reset();
    },
    // 重写父类,添加时候,清空数据
    HandleFormDataInfo() {
      this.formDataInfo = deepCopy(default_formDataInfo);
    },
    //格式化时间格式,参数 :是否需要时间格式化 needNewDate.true/false
    formatDateTime(needNewDate){
      if (!!this.formDataInfo.master.apDate) {
        // 立账日期
        let apDate =  dayjs(this.formDataInfo.master.apDate).format("YYYY-MM-DD HH:mm:ss")
        this.formDataInfo.master.apDate = this.setNewDate(apDate,needNewDate)
      }
      if (!!this.formDataInfo.master.apMonth) {
        // 会计月份
        let apMonth =  dayjs(this.formDataInfo.master.apMonth).format("YYYY-MM")
        this.formDataInfo.master.apMonth = this.setNewDate(apMonth,needNewDate)
      }
      if (!!this.formDataInfo.master.arriveDate) {
        // 货款到期日
        let arriveDate =  dayjs(this.formDataInfo.master.arriveDate).format("YYYY-MM-DD HH:mm:ss")
        this.formDataInfo.master.arriveDate = this.setNewDate(arriveDate,needNewDate)
      }
      if (!!this.formDataInfo.master.startDate) {
        // 起始日期
        let startDate =  dayjs(this.formDataInfo.master.startDate).format("YYYY-MM-DD HH:mm:ss")
        this.formDataInfo.master.startDate =  this.setNewDate(startDate,needNewDate)
      }
      if (!!this.formDataInfo.master.endDate) {
        // 结束日期
        let endDate =  dayjs(this.formDataInfo.master.endDate).format("YYYY-MM-DD HH:mm:ss")
        this.formDataInfo.master.endDate = this.setNewDate(endDate,needNewDate)
      }
    },
    // 重写父类,修改提交数据
    resetformDataInfo() {
      let accPayItems = this.$refs["slave_list_table_edit"].getCategorizeData();
      this.formDataInfo["accPayItems"] = accPayItems;
      // 格式化 时间 
      this.formatDateTime(false)
      this.formDataInfo.master.apMonth = dayjs(this.formDataInfo.master.apMonth).format("YYYYMM")
      return this.formDataInfo;
    },

    // 提交主从表数据
    formTableDataSubmit() {
      this.$refs["formDataInfo"].validate(valid => {
        if (!valid) {
          return;
        }
        let submitData = this.resetformDataInfo();
        request
          .post(
            `${this.functionParams.requestBaseUrl}/saveOrUpdate`,
            submitData
          )
          .then(res => {
            this.showWindow = false; // 关闭当前编辑页面
            this.$Message.success("执行成功");
            this.$emit("submit-success"); // 刷新主页面数据
          });
      });
    }
  }
};
</script>

<style>
.masterHeightClass {
  height: 30%;
  overflow: auto;
}
.otherHeightClass {
  height: 70%;
  overflow: hidden;
}
.cl-edit-accPay .ivu-form-item-label {
  text-align: right;
  vertical-align: middle;
  float: left;
  font-size: 14px;
  color: #515a6e;
  line-height: 17px;
  padding: 7px 12px 10px 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
</style>
