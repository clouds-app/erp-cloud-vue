<template>
  <div>
    <editWindow
      class="cl-edit-boxProduct"
      :title="actionLableName"
      v-model="showWindow"
      :fullscreen="true"
      width="66%"
      :loading="!isLoaddingDone"
      :spinLoaddingText="spinLoaddingText"
      @on-ok="formTableDataSubmit()"
      v-if="initData.columns"
    >
    <div ref="masterHeight">
        <Form
          ref="formDataInfo"
          :show-message="false"
          :model="formDataInfo.master"
          :rules="ruleValidate"
          :label-width="100"
          label-colon
        >
          <Row type="flex">
            <Col
              span="8"
              v-for="(columns, index) in initData.columns[`${formInitPreName}Fm`]
                .editColumns"
              :key="index"
            >
              <FormItem :label="columns.title" :prop="columns.key">
                <!-- 控件特殊处理 客户 -->
                <popup
                  v-if="columns.key == 'custCode'"
                  ref="firstFocusInput"
                  v-model="formDataInfo.master.custCode"
                  field-name="custCode"
                  :disabled="detailDisabled"
                  popup-name="CustomerSingleBox"
                  :fill-model.sync="formDataInfo.master"
                  render-fields="custId,custCode,custName,coinName"
                  from-fields="id,cusCode,cusName,coinName"
                  :suffix="false"
                  :suffix-model="formDataInfo.master.custName"
                  :query-params="{}"
                  @on-fill="custCodeOnFillEvent"
                >
                </popup>

                <!-- 控件特殊处理 生效日期 -->
                <DatePicker
                  v-else-if="columns.key == 'effectDate'"
                  :disabled="detailDisabled"
                  type="datetime"
                  format="yyyy-MM-dd HH:mm:ss"
                  :placeholder="columns.title"
                  v-model="formDataInfo.master[columns.key]"
                ></DatePicker>
                <!-- 控件特殊处理 报价单号 -->
                <formControl
                  v-else-if="columns.key == 'bpNo'"
                  :control-type="columns.controlType"
                  :disabled="true"
                  :placeholder="columns.title"
                  v-model="formDataInfo.master[columns.key]"
                ></formControl>
                <!-- 其它 通用控件 -->
                <formControl
                  v-else
                  :control-type="columns.controlType"
                  :disabled="detailDisabled || columns.readOnly"
                  :placeholder="columns.title"
                  v-model="formDataInfo.master[columns.key]"
                ></formControl>
              </FormItem>
            </Col>
          </Row>
        </Form>

        <Tabs>
          <!-- 纸箱产品报价明细 -->
          <TabPane
            :label="initData.listView[`${formInitPreName}itemFm`].tableDesc"
            name="name1"
          >
            <eTable
              ref="slave_list_table_edit"
              unqiue-mark="id"
              :height="300"
              :index-menu="true"
              :col-start="0"
              :width="200"
              :row-init-data="initData.initData[`${formInitPreName}itemFm`]"
              :data.sync="slavesForm.masterList"
              :rules="tableFieldsValidator"
              @row-click="slave_list_table_editRowClick"
              @row-delete="slave_list_table_editRowDelete"
              :showContextMenu="!detailDisabled"
            >
              <template slot="head">
                <tr
                  v-for="(columnGroup, index) in initData.columns[
                    `${formInitPreName}itemFm`
                  ].editGroups"
                  :key="index"
                >
                  <th
                    :class="`ivu-table-column-${column.titleAlign}`"
                    v-for="(column, index2) in columnGroup"
                    :key="index2"
                    :width="column.width"
                    :colspan="column.colSpan"
                    :rowspan="column.rowSpan"
                    :columnKey="column.key"
                  >
                    <div class="ivu-table-cell">
                      <span class="">{{ column.title }}</span>
                    </div>
                  </th>
                </tr>
              </template>
              <template
                slot="body"
                slot-scope="{ row, index, valueChangeAssign }"
              >
                <td
                  :class="`ivu-table-column-${column.align}`"
                  v-for="(column, columnIndex) in initData.columns[
                    `${formInitPreName}itemFm`
                  ].editColumns"
                  :key="columnIndex"
                  :width="column.width"
                >
                  <!-- 控件特殊处理 产品编号  :blurFocusLoadData="false"-->
                  <popup
                    v-if="column.key == 'bpNo'"
                    :popupClickValidator="popupClickValidator"
                    v-model="row[column.key]"
                    field-name="bpNo"
                    :disabled="detailDisabled"
                    popup-name="ProductMultiBox"
                    :fill-model.sync="slavesForm.masterList"
                    render-fields="productId,bpNo,bpName,bpBatchNo"
                    from-fields="productId,bpNo,bpName,bpBatchNo"
                    :init-data="initData.initData[`${formInitPreName}itemFm`]"
                    :suffix="false"
                    :index="index"
                    :query-params="{
                      bpNo$notIn: popUpExcludeParamsList,
                      custId: formDataInfo.master.custId
                    }"
                    @input="
                      value => {
                        valueChangeAssign(value, index, row, 'bpNo');
                      }
                    "
                    @on-fill="fillSlaveDataIntoSubTable"
                  ></popup>
                  <!-- 控件特殊处理 优惠方式 -->
                  <Input
                    v-else-if="column.key == 'upiPriceLess'"
                    v-model="row[column.key]"
                    :disabled="detailDisabled"
                    @input="
                      value => {
                        valueChangeAssign(value, index, row, column.key);
                      }
                    "
                    size="small"
                    :maxlength="40"
                    icon="md-apps"
                    @on-click="showExpression(column.key, index)"
                  />
                  <!-- 其它 :placeholder="column.key"-->
                  <formControl
                    :align="column.align"
                    v-else
                    :control-type="column.controlType"
                    v-model="row[column.key]"
                    :disabled="detailDisabled || column.readOnly"
                    @input="
                      value => {
                        valueChangeAssign(value, index, row, column.key);
                      }
                    "
                  ></formControl>
                </td>
              </template>
            </eTable>
          </TabPane>
        </Tabs>

        <Tabs>
          <!-- 产品套件报价明细 -->
          <TabPane
            :label="initData.listView[`${formInitPreName}mdataFm`].tableDesc"
            name="name1"
          >
            <eTable
              :showContextMenu="false"
              :disabledAddRowWhenfocusNull="true"
              ref="sub_list_table_edit"
              unqiue-mark="id"
              :height="240"
              :index-menu="true"
              :col-start="0"
              :width="200"
              @tableColTiggerEventCall="tableColTiggerEventCall"
              :row-init-data="{}"
              :data.sync="slavesForm.SubList"
              :rules="tableFieldsValidator"
            >
              <template slot="head">
                <tr
                  v-for="(columnGroup, index) in initData.columns[
                    `${formInitPreName}mdataFm`
                  ].editGroups"
                  :key="index"
                >
                  <th
                    :class="`ivu-table-column-${column.titleAlign}`"
                    v-for="(column, index2) in columnGroup"
                    :key="index2"
                    :width="column.width"
                    :colspan="column.colSpan"
                    :rowspan="column.rowSpan"
                    :columnKey="column.key"
                  >
                    <div class="ivu-table-cell">
                      <span class="">{{ column.title }}</span>
                    </div>
                  </th>
                </tr>
              </template>
              <template
                slot="body"
                slot-scope="{ row, index, tableColTiggerEvent }"
              >
                <td
                  :class="`ivu-table-column-${column.align}`"
                  v-for="(column, subIndex) in initData.columns[
                    `${formInitPreName}mdataFm`
                  ].editColumns"
                  :key="subIndex"
                  :width="column.width"
                >
                  <!-- 控件特殊处理 最新报价 -->
                  <template v-if="column.key == 'upmQuotePrice'">
                    <formControl
                      :align="column.align"
                      @input="
                        tableColTiggerEvent(row, column, index, 'calQuotePrice')
                      "
                      :disabled="detailDisabled"
                      :control-type="column.controlType"
                      v-model="row[column.key]"
                    ></formControl>
                  </template>
                  <!-- 其它 不可以编辑-->
                  <template v-else>
                    <formControl
                      :align="column.align"
                      :disabled="detailDisabled || column.readOnly"
                      :control-type="column.controlType"
                      v-model="row[column.key]"
                    ></formControl>
                  </template>
                </td>
              </template>
            </eTable>
          </TabPane>
        </Tabs>
   </div>
    </editWindow>
    <!-- 优惠方式 -->
    <preferential
      v-model="showpreferential"
      @preferential-ok="preferentialOk"
      :renderJsonStr="renderJsonStr"
      :disabled="detailDisabled"
    ></preferential>
  </div>
</template>

<script>
/**
 * @desc edit-boxProductPrice 销售-产品报价 描述
 * 所有重要 可以重用的方法 放在了基类,继承即可用重复使用 dyBaseMixins,
 * 可以根据需求重写所需的方法:
 *
 * @params 参数
 *
 * @return 返回
 *
 * @author Andy Huang
 *
 * @created 2020/02/11 17:07:54
 */
import preferential from "@/components/preferential/preferential";
import editWindow from "@/components/edit-window/edit-window";
// import Form from '@/components/form/form'
import eTable from "@/components/e-table/e-table";
import request from "@/libs/request";
import editBaseMixins from "../../mixins/edit";
import dayjs from "dayjs";
import formControl from "@/components/form-control/form-control";
import popup from "@/components/popup/popup";
// eslint-disable-next-line camelcase
const slavesForm_default = {
  // 子表单
  name: "saleBoxProductPriceItems", // 子表单名称
  ItemFmRowIndex: 0,
  masterList: [],
  SubList: [],
  SubItems: {},
  CrurrentRowBpNo: "" // 当前选中行的产品编号
};
let defaultMasterData = {};
export default {
  name: "edit-boxProductPrice",
  mixins: [editBaseMixins],
  components: {
    preferential,
    editWindow,
    // Form,
    eTable,
    formControl,
    popup
  },
  data() {
    return {
      renderJsonStr: "", // 回填优惠方式 字符串
      getcustid: 0, // 上一次修改前的客户编号
      showpreferential: false, // 是否显示优惠方式
      subBoxClickIndex: -1, // 优惠方式 参数
      actionSubtitle: "纸箱产品报价", // 当前操作副标题
      formInitPreName: "saleboxproductprice", // 初始化信息查询 前缀 字段
      formName: "saleboxproductpriceFm", // 初始化信息查询 表单字段
      requestBaseUrl: "/sale/boxProductPrice", // 请求 查询 操作的基础路径
      formDataInfo: {
        // 主表单信息
        master: {}
      },
      ruleValidate: {
        custCode: [
          { required: true, message: "客户编号不能为空", trigger: "blur" }
        ]
      }, // 需要验证的数据
      tableFieldsValidator: {}, // 需要验证的数据表格
      slavesForm: JSON.parse(JSON.stringify(slavesForm_default)) // 深拷贝对象和数组,
    };
  },
  watch: {
    showWindow: function(n, o) {
      if (n) {
        let _self = this;
        this.$nextTick(() => {
           _self.setMasterDefaultData();
        });
      }
    },
    // 第一步执行 获取到 master 数据
    initData: {
      handler(n, o) {
        if (n.initData) {
          defaultMasterData = Object.assign({}, n.initData.master);
          this.formDataInfo.master = n.initData.master;
        }
      },
      deep: true
    }
  },
  computed: {
    popUpExcludeParamsList() {
      // eslint-disable-next-line no-tabs
      // 获取产品编号	列表，转换为 "",""格式，用于弹出框排除数据
      // 事件冲突,暂时屏蔽
      let temp = [];
      this.slavesForm.masterList.forEach((item, index) => {
        // debugger
        if (item && item.bpNo != null) {
          // 注意:
          temp.push(item.bpNo); // 注意:
        }
      });
      return temp.toString();
    }
  },
  methods: {
    // POPup 点击获取当前行
    changeCurrentSelectIndex(index) {
      return index;
    },
    // 客户编号选择后的回调事件,客户变更,清空数据列表
    custCodeOnFillEvent(item) {
      this.$refs["formDataInfo"].validateField("custCode", err => {});
      let slaveObj = this.$refs["slave_list_table_edit"];
      let tableData = slaveObj.getCategorizeData();
      if (this.formDataInfo.master.custId !== 0) {
        if (this.formDataInfo.master.custId != this.getcustid) {
          // 深拷贝对象和数组,重置对象初始值
          this.slavesForm = JSON.parse(JSON.stringify(slavesForm_default));
          tableData.deleteList = tableData.updateList;
        }
        this.getcustid = this.formDataInfo.master.custId;
      }
    },
    // 主表字段 默认值设置
    setMasterDefaultData() {
      this.formDataInfo.master["effectDate"] = dayjs().format(
        "YYYY-MM-DD HH:mm:ss"
      );
    },
    // 默认选择行数据
    setDefaultSelectedRow() {
      //debugger
      let slaveObj = this.$refs["slave_list_table_edit"];
      if (slaveObj) {
        slaveObj.rowClick(0, "row-click");
      }
    },
    // 删除回调事件,选中上一行 数据
    slave_list_table_editRowDelete(index, Item) {
      let slaveObj = this.$refs["slave_list_table_edit"];
      if (slaveObj) {
        if (index !== 0) {
          slaveObj.rowClick(index - 1, "row-click");
        } else {
          // fix 主表只有一行数据,删除后,子表依旧显示原始数据
          this.deleteLastOneData();
          setTimeout(() => {
            slaveObj.rowClick(0, "row-click");
          }, 500);
        }
      }
    },
    deleteLastOneData() {
      // 删除主表数据,子表数据应该置空
      if (
        this.slavesForm.masterList.length == 0 ||
        (this.slavesForm.masterList.length == 1 &&
          !this.slavesForm.masterList[0].bpNo)
      ) {
        this.slavesForm.SubList = [];
      }
    },
    // 重写父类 关闭窗口时 触发事件
    closeActionTigger() {
      // fix 清除上次的错误提示 formDataInfo 为表单ref名称
      this.$refs["formDataInfo"].resetFields();
      this.$refs["slave_list_table_edit"].reset();
    },
    // 表格列值改变 回调事件处理event：{row, column, index, event}
    tableColTiggerEventCall(obj) {
      switch (obj.event) {
        case "calQuotePrice":
          this.calQuotePrice(obj);
          break;
        default:
          break;
      }
    },
    // 涨幅计算 输入最新报价 得出 涨幅并且保留两位小数（第三子表）
    calQuotePrice(obj) {
      if (
        this.slavesForm &&
        this.slavesForm.SubList &&
        this.slavesForm.SubList.length > 0
      ) {
        // 涨幅 计算=(最新报价-上次报价)*100/上次报价,保留两位小数 toFixed(2)
        let editColumnsData = this.slavesForm.SubList; // 数据列表 SubList
        let currentPrice = editColumnsData[obj.index].upmQuotePrice; // 最新报价
        let lastQuote = editColumnsData[obj.index].upmLastQuote; // 上次报价
        // lastQuote = 1 // 测试数据
        let upmMarkUp = 0; // 涨幅
        if (lastQuote != null && lastQuote !== 0) {
          upmMarkUp = ((currentPrice - lastQuote) * 100) / lastQuote;
          upmMarkUp = upmMarkUp;
        } else {
          // 设置 上次报价 为0
          // editColumnsData[obj.index].upmLastQuote = 0
          this.$refs["sub_list_table_edit"].set({ upmLastQuote: 0 }, obj.index);
        }

        // 涨幅 保留两位小数 toFixed(2)
        // editColumnsData[obj.index].upmMarkUp = upmMarkUp.toFixed(2)
        this.$refs["sub_list_table_edit"].set(
          { upmMarkUp: upmMarkUp },
          obj.index
        );
      }
      this.calTotalPrice();
    },
    // 合计价格 sum（产品套件的 最新报价*配套系数)
    sumCurrentPrice() {
      let editColumnsData = this.slavesForm.SubList; // 数据列表 SubList
      let sumPrice = 0;
      if (editColumnsData && editColumnsData.length > 0) {
        editColumnsData.forEach(item => {
          let currentPrice = item.upmQuotePrice; // 最新报价
          let uiQty = item.uiQty; // 配套系数
          sumPrice = sumPrice + currentPrice * uiQty;
        });
      }
      return sumPrice;
    },
    // 赋值总报价和计算涨幅 到 第二子表报价
    calTotalPrice() {
      // debugger
      let editColumnsData = this.slavesForm.masterList; // 数据列表 masterList
      let rowData = editColumnsData[this.slavesForm.ItemFmRowIndex];
      let currentPrice = this.sumCurrentPrice(); // 最新报价
      let lastQuote = rowData.upiLastQuote; // 上次报价
      // lastQuote = 3 // 测试数据
      let upiMarkUp = 0; // 涨幅
      if (lastQuote != null && lastQuote !== 0) {
        // 涨幅 计算=(最新报价-上次报价)*100/上次报价,保留两位小数 toFixed(2)
        upiMarkUp = ((currentPrice - lastQuote) * 100) / lastQuote;
      }
      // rowData.upiPrice = currentPrice
      // rowData.upiMarkUp = upiMarkUp.toFixed(2)
      // 触发修改值 直接修改原始数据 无效
      this.$refs["slave_list_table_edit"].set(
        { upiPrice: currentPrice, upiMarkUp: upiMarkUp.toFixed(2) },
        this.slavesForm.ItemFmRowIndex
      );
    },
    // 验证产品编号选择前先选择客户
    popupClickValidator() {
      if (
        !this.formDataInfo.master.custCode ||
        this.formDataInfo.master.custCode == ""
      ) {
        this.$Message.error("客户编号不能为空");
        return false;
      }
      return true;
    },
    // 回填JSON数据到优惠方式控件
    retrunJsonDataToDisCount(subBoxClickIndex) {
      let slaveObj = this.$refs["slave_list_table_edit"];
      let tableData = slaveObj.get();
      this.renderJsonStr = tableData[subBoxClickIndex].upiPriceLessStrJson;
    },
    // 打开优惠方式，参数，当前类型：
    showExpression(type, subBoxClickIndex) {
      this.retrunJsonDataToDisCount(subBoxClickIndex);
      this.showpreferential = true;
      setTimeout(()=>{
        this.$nextTick(()=>{
          this.renderJsonStr = "" // 弹框后数据清空,不然下次无法回填
        })
      },1000)
      // this.currentExpressType = type
      this.subBoxClickIndex = -1;
      if (subBoxClickIndex >= 0) {
        this.subBoxClickIndex = subBoxClickIndex;
      }
    },
    // 优惠方式 确认后的回调方法
    preferentialOk(text, json, value) {
      if (this.subBoxClickIndex === -1) {
      } else {
        // this.renderJsonStr=json
        this.$refs["slave_list_table_edit"].set(
          {
            upiPriceLess: text,
            upiPriceLessStrJson: json,
            upiPriceLessStr: value
          },
          this.subBoxClickIndex
        );
      }
    },
    // 重写父类,添加时候,清空数据
    HandleFormDataInfo() {
      this.formDataInfo.master = Object.assign({}, defaultMasterData); // 浅拷贝对象
      this.slavesForm = JSON.parse(JSON.stringify(slavesForm_default)); // 深拷贝对象
    },
    // 重写父类,修改提交数据
    resetformDataInfo() {
      let _self = this;
      let data = {
        master: this.formDataInfo.master
      };
      // 时间格式化
      if (data.master.effectDate !== "") {
        data.master.effectDate = dayjs(data.master.effectDate).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      }
      let slavesItem = [];
      let slaveTableDataList = this.$refs[
        "slave_list_table_edit"
      ].getTableEditData();
      slaveTableDataList.forEach((item, index) => {
        let sub = [];
        if (!item.hasDelete) {
          // debugger
          sub =
            _self.slavesForm.SubItems[item.bpNo] == null
              ? []
              : _self.slavesForm.SubItems[item.bpNo]; // 注意:
        }

        slavesItem.push({
          master: item,
          saleBoxProductPriceSubs:
            sub.productInfos == null
              ? sub == null
                ? []
                : sub
              : sub.productInfos // 注意: 此字段需要修改 saleBoxProductPriceSubs
        });
      });
      data[`${this.slavesForm.name}`] = slavesItem;
      // debugger
      return data;
    },
    fillSlaveDataIntoSubTable(data) {
      if (!data[0].data.bpNo) {
        // FIX 输入不存在的产品编号,返回空数据,对应的子表应该置空
        this.deleteLastOneData();
      }
      // 数据加载完成后触发点击第一型数据
      // this.setDefaultSelectedRow(data.index)
      if (
        data[0].data.bpNo == null ||
        this.slavesForm.CrurrentRowBpNo === data[0].data.bpNo
      ) {
        // 校验数据 没有变化 或者为NULL 不要重新查询 第三层表格数据
        return;
      }
      // return
      // 填充第三层表的数据，根据第二层表中的产品编号（productId）和产品类型
      // 去查询第三层的数据
      data.forEach(item => {
        let _self = this;
        request
          .post(
            `${this.requestBaseUrl}/sub/getProductInfo`,
            {},
            {
              custId: item.orignData.custId,
              productId: item.orignData.productId,
              productNo: item.data.bpNo, // 需要修改的字段
              type: item.orignData.type // 需要修改的字段
            }
          )
          .then(res => {
            // debugger
            if (_self.slavesForm.ItemFmRowIndex == item.index) {
              _self.slavesForm.SubList = res.productInfos;
            }
            // 产品编号：
            _self.slavesForm.SubItems[item.data.bpNo] = res.productInfos; // 需要修改的字段 item.data.bpNo
            // eslint-disable-next-line handle-callback-err
          })
          .catch(err => {
            _self.$Message.error(`产品编号${item.data.bpNo}获取套件失败`); // 需要修改的字段 item.data.bpNo
          });
      });
    },
    // 子表点击事件 显示第三层表的数据
    slave_list_table_editRowClick(index) {
      debugger
      this.slavesForm.SubList = [];
      setTimeout(() => {
        this.slavesForm["CrurrentRowBpNo"] = this.slavesForm.masterList[
          index
        ].bpNo;
        this.slavesForm.ItemFmRowIndex = index;
        this.slavesForm.SubList = this.slavesForm.SubItems[
          this.slavesForm.masterList[index].bpNo
        ]; // 需要修改的字段 this.slavesForm.masterList[index].bpNo
      }, 100);
    },

    // 重写父类 数据初始化后 自动调用
    formDetailDataCall() {
      debugger
      if (this.action != "add") {
        this.getcustid = this.formDataInfo.master.custId;
      }
      // 数据初始化，把第二层表的master组装成一个List结构
      this.slavesForm.masterList = [];
      let _self = this;
      this.formDataInfo[`${this.slavesForm.name}`].forEach((item, index) => {
        _self.slavesForm.masterList.push(item.master);
        _self.slavesForm.SubItems[item.master.bpNo] =
          item[`saleBoxProductPriceSubs`] == null
            ? []
            : item[`saleBoxProductPriceSubs`];
      });
      // 数据加载完成后触发点击第一型数据
      this.setDefaultSelectedRow();
    },
    // 重写父类 提交数据 三层表
    formTableDataSubmit() {
      // debugger
      let data = this.resetformDataInfo();
      this.$refs["formDataInfo"].validate(valid => {
        if (!valid) {
          return;
        }
        let result = this.$refs["slave_list_table_edit"].validate();
        if (result) {
          return;
        }
        // console.log(JSON.stringify(data))
        request
          .post(`${this.requestBaseUrl}/saveOrUpdate`, data)
          .then(res => {
            this.showWindow = false; // 关闭当前编辑页面
            this.$Message.success("执行成功");
            this.$emit("submit-success"); // 刷新主页面数据
            // eslint-disable-next-line handle-callback-err
          })
          .catch(err => {
            // this.$Message.error('执行失败')
          });
      });
    }
  }
};
</script>

<style>
/* .cl-edit-boxProduct .ivu-form-item {
  margin-bottom: 5px !important;
} */

.cl-edit-boxProduct .ivu-select-item {
  display: block;
}
.cl-edit-boxProduct .ivu-form-item-label {
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
