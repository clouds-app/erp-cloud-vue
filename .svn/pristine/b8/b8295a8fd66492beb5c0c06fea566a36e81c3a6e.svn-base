<template>
  <div>
    <editWindow
      class="cl-edit-boxLibMove"
      :title="actionLableName"
      v-model="showWindow"
      :fullscreen="false"
      width="90%"
      :loading="!isLoaddingDone"
      :spinLoaddingText="spinLoaddingText"
      @on-ok="formTableDataSubmit()"
      v-if="initData.columns"
    >
      <Form
        ref="formDataInfo"
        :show-message="true"
        :model="formDataInfo.master"
        :rules="ruleValidate"
        :label-width="100"
      >
        <Row>
          <Col span="12">
            <Row>
              <Col span="12">
                <FormItem label="调拨单号" prop="bmNo">
                  <Input disabled v-model="formDataInfo.master.bmNo" maxlength="20" placeholder></Input>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="日期">
                  <DatePicker
                    :disabled="detailDisabled"
                    type="date"
                    format="yyyy-MM-dd HH:mm:ss "
                    v-model="formDataInfo.master.bmDate"
                  ></DatePicker>
                </FormItem>
              </Col>
            </Row>
          </Col>
          <Col span="12">
            <Row>
              <Col span="12">
                <FormItem label="调拨人" prop="allocatorCode">
                  <div>
                    <!-- @on-fill="Initializationdata" -->
                    <popup
                      v-model="formDataInfo.master.allocatorCode"
                      field-name="allocatorCode"
                      :disabled="detailDisabled"
                      popup-name="WorkerSingleBox"
                      :fill-model.sync="formDataInfo.master"
                      render-fields="allocatorId,allocatorCode,allocator"
                      from-fields="id,workCode,workName"
                      :suffix="true"
                      :suffix-model="formDataInfo.master.allocator"
                      :query-params="{workOptType:8}"
                    />
                  </div>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="数量" prop="bmQty">
                  <Input disabled v-model="formDataInfo.master.bmQty" maxlength="20" placeholder></Input>
                </FormItem>
              </Col>
            </Row>
          </Col>
          <Col span="6">
            <FormItem label="调出仓位" prop="sourceStationCode">
              <div>
                <!-- @on-fill="Initializationdata" -->
                <popup
                  @on-fill="Initializationdata"
                  v-model="formDataInfo.master.sourceStationCode"
                  field-name="sourceStationCode"
                  :disabled="detailDisabled"
                  popup-name="WareHouseSingleBox"
                  :fill-model.sync="formDataInfo.master"
                  render-fields="sourceStationId,sourceStationCode,sourceStationName"
                  from-fields="wareHouseItId,wsCode,wsName"
                  :suffix="true"
                  :suffix-model="formDataInfo.master.sourceStationName"
                  :query-params="{whType:2}"
                />
              </div>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="调入仓位" prop="destStationCode">
              <div>
                <!-- @on-fill="Initializationdata" -->
                <popup
                  @on-fill="Initializationdata"
                  v-model="formDataInfo.master.destStationCode"
                  field-name="destStationCode"
                  :disabled="detailDisabled"
                  popup-name="WareHouseSingleBox"
                  :fill-model.sync="formDataInfo.master"
                  render-fields="destStationId,destStationCode,destStationName"
                  from-fields="wareHouseItId,wsCode,wsName"
                  :suffix="true"
                  :suffix-model="formDataInfo.master.destStationName"
                  :query-params="{whType:2}"
                />
              </div>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="备注">
              <Input
                :disabled="detailDisabled"
                v-model="formDataInfo.master.remark"
                type="textarea"
                maxlength="100"
                :autosize="{ minRows: 1, maxRows: 2 }"
                placeholder="请输入备注..."
              ></Input>
            </FormItem>
          </Col>
        </Row>
      </Form>

      <Tabs>
        <!--  注意:eTable formDataInfo.artLengs.defaultList  ===artLengs=== 需要根据实际接口修改,其它不变-->
        <TabPane label="纸箱库存调拨明细" name="name1">
          <eTable
            ref="tableFields"
            unqiue-mark="id"
            :index-menu="true"
            :col-start="0"
            :width="200"
            :height="300"
            :insertDirection="insertDirection"
            :row-init-data="initData.initData.stockboxlibmoveitemFm"
            :data.sync="formDataInfo.boxLibMove.defaultList"
            :rules="tableFieldsValidator"
            :showContextMenu="!detailDisabled"
            v-if="showWindow"
          >
            <template slot="head">
              <tr
                v-for="(columnGroup,index) in initData.columns.stockboxlibmoveitemFm.editGroups"
                :key="index"
              >
                <th
                  class="ivu-table-column-left"
                  v-for="(column,index2) in columnGroup"
                  :key="index2"
                  :width="column.editWidth"
                  :colspan="column.colSpan"
                  :rowspan="column.rowSpan"
                  style="text-align:center;"
                >
                  <div class="ivu-table-cell">
                    <span class>{{column.title}}</span>
                  </div>
                </th>
              </tr>
            </template>

            <template slot="body" slot-scope="{ row, index, valueChangeAssign }">
              <td
                class="ivu-table-column-left"
                v-for="(column,columnIndex) in initData.columns.stockboxlibmoveitemFm.editColumns"
                :key="columnIndex"
                :width="column.editWidth"
              >
                <!-- 控件特殊处理 报损类型-->
                <!-- <Select :disabled="detailDisabled" v-if="column.key == 'pliLostType'" v-model="row[column.key]" transfer>
                     <Option  v-for="(item,index) in pliLostTypeList" :key="index" :value="item.dicValue">{{item.dicLabel}}</Option>
                </Select>-->
                <!--工单号 -->
                <Input
                  v-if="column.key == 'workNo'"
                  v-model="row[column.key]"
                  field-name="workNo"
                  :disabled="detailDisabled"
                  @on-blur="onFill(index)"
                  @input="
                      value => {
                        valueChangeAssign(value, index, row, 'workNo');
                      }
                    "
                  size="small"
                  :maxlength="20"
                >
                  <Icon @click="Slave_list_table_editRowModify(index)" slot="suffix" type="md-add" />
                </Input>
                <!--批次号 -->
                <Input
                  v-else-if="column.key == 'boxUseBatchOn'"
                  v-model="row[column.key]"
                  field-name="boxUseBatchOn"
                  :disabled="detailDisabled"
                  @on-blur="onFill(index)"
                  @input="
                      value => {
                        valueChangeAssign(value, index, row, 'boxUseBatchOn');
                      }
                    "
                  size="small"
                  :maxlength="20"
                ></Input>
                <!-- 退货数 -->
                <Input
                  v-else-if="column.key == 'qty'"
                  v-model="row[column.key]"
                  field-name="qty"
                  :disabled="detailDisabled"
                  @input="changeQty(value, index, row,'qty')"
                  size="small"
                  :maxlength="20"
                ></Input>
                <formControl
                  v-else
                  :control-type="column.controlType"
                  v-model="row[column.key]"
                  :disabled="detailDisabled||column.readOnly"
                  @input="value => {valueChangeAssign(value, index, row,column.key)}"
                ></formControl>
              </td>
            </template>
          </eTable>
        </TabPane>
      </Tabs>
    </editWindow>
    <!-- <boxUseReSlave
      ref="mychild"
      :isLoaddingDone="salveWindow.isLoaddingDone"
      :formDetailData="salveWindow.formDetailData"
      :action="salveWindow.action"
      v-model="salveWindow.showEditWindow"
      :List="List"
      :inSupplierId="inSupplierId"
      :WorkOrderNumber="WorkOrderNumber"
      @closeMain="closeMain"
    /> -->
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
import referenceField from "@/components/referenceField/referenceField";
import popup from "@/components/popup/popup";
import editWindow from "@/components/edit-window/edit-window";
import eTable from "@/components/e-table/e-table";
import request from "@/libs/request";
import editBaseMixins from "../../mixins/edit";
import optionSearch from "../../components/optionSearch";
import dayjs from "dayjs";
import Sys from "@/api/sys";
import formControl from "@/components/form-control/form-control";
// import boxUseReSlave from "./edit-boxUseReSlave";
const default_formDataInfo = {
  // 主表 更改字段
  master: {
    bmNo: "",
    bmDate: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    supplierCode: "",
    supplierId: "",
    carNo: "",
    isAcc: "",
    reason: "",
    burMonthDate: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    remark: ""
  },
  // 子表 artLengs 根据实际接口更改,其它不变
  boxLibMove: {
    //moveItems
    addList: [], // 添加列
    defaultList: [], // 默认列
    deleteList: [], // 删除列
    updateList: [] // 更新列
  }
};
export default {
  name: "edit-boxLibMove",
  mixins: [editBaseMixins],
  components: {
    editWindow,
    optionSearch,
    eTable,
    popup,
    formControl,
    referenceField,
    // boxUseReSlave
    // rightMenu
    // Form,
  },
  data() {
    return {
      insertDirection: "down",
      salveWindow: {
        // Tips:"提示：此窗口只显示有供应商纸质/纸板进价的工单！",
        isLoaddingDone: false, // 窗口是否加载完成
        showEditWindow: false, // 是否显示edit-boxSalesOrderSlave 编辑窗口
        action: null, // 当前操作功能 添加/编辑
        formDetailData: {} // 当前表单的详细信息
      },
      pliLostTypeList: [], //报损类型
      showContextMenu: true,
      showEditMenu: false,
      actionSubtitle: "纸箱库存调拨", // 当前操作副标题
      id: 0,
      formName: "stockboxlibmoveitemFm",
      formmasterName: "stockboxlibmoveFm",
      requestBaseUrl: "/stock/boxLibMove", // 请求 查询 操作的基础路径
      formDataInfo: Object.assign({}, default_formDataInfo), // 防止添加和更新数据提交发生冲突
      // 需要验证的数据
      ruleValidate: {
        supplierCode: [
          {
            required: true,
            message: "供应商编号不能为空",
            trigger: "blur"
          }
        ]
      },
      tableFieldsValidator: {
        // boxUseBatchOn: [
        //   {
        //     required: true,
        //     message: "用料批次号不能为空",
        //     trigger: "blur"
        //   }
        // ]
      },
      subBoxClickIndex: -1,
      getworkerId: 0,
      List: "null", //传给用料批次号的参数
      WorkOrderNumber: "null",
      index1: 0, //工单号里面用
      inSupplierId: null
    };
  },
  created() {
    // this.getpliLostTypeList()//报损类型
  },
  methods: {
    //数据传递
    transformation(selectedValue) {
      //debugger;
      let transData = JSON.parse(
        JSON.stringify(this.initData.initData.stockboxlibmoveitemFm)
      );
      // transData.boxUseBatchOn = selectedValue.boxUseBatchOn; //用料批次号
      transData.artCode = selectedValue.artCode; //纸质
      transData.artId = selectedValue.artId; //纸质id
      transData.boxUseBatchOn = selectedValue.boxUseBatchOn; //批次号
      // transData. = selectedValue.iisChose                         //
      transData.isAcc = selectedValue.isAcc; //月结
      transData.lbCode = selectedValue.lbCode; //楞别
      transData.lengId = selectedValue.lengId; //楞别ID
      transData.money = selectedValue.money; //金额
      transData.dueDate = selectedValue.pjDate; //入库时间
      transData.briArea = selectedValue.ppoArea; //面积
      transData.price = selectedValue.price; //单价
      transData.kQty = selectedValue.psQty; //库存数
      transData.inQty = selectedValue.qty; //入库数量
      transData.quotePrice = selectedValue.quotePrice; //报价
      transData.rQty = selectedValue.rQty; //已退货数
      transData.remark = selectedValue.remark; //备注
      transData.briSArea = selectedValue.sArea; //单面积
      transData.sizeLength = selectedValue.sizeL; //纸长
      transData.sizeLine = selectedValue.sizeLine; //压线
      transData.sizeWidth = selectedValue.sizeW; //纸宽
      transData.supplierArtId = selectedValue.supplierArtId; //供应商纸质
      transData.supplierArtName = selectedValue.supplierArtName; //供应商纸质suppplierArtName
      transData.stationId = selectedValue.wareHouseItId; //仓位id
      transData.workNo = selectedValue.workNo; //工单号
      transData.stationCode = selectedValue.wsCode; //仓位编号
      transData.stationName = selectedValue.wsName; //仓位名称

      transData.partName = selectedValue.partName; //产品名称
      transData.prodNo = selectedValue.prodNo; //产品编号
      transData.partNumer = selectedValue.partNumer; //料号

      transData.qty = transData.kQty; //退货数=库存数
      transData.briSWeight = selectedValue.briSWeight; //单重
      transData.briWeight = selectedValue.briWeight; //重量

      return transData;
    },
    //接受工单号传回来的数据
    closeMain(selectedValues) {
      //debugger;
      let pushData = [];
      //获取子表数据
      let sundata = this.$refs["tableFields"].get();
      selectedValues.forEach(selectedValue => {
        let transData = this.transformation(selectedValue);
        pushData.push(transData);
      });

      //用料批次号唯一校验
      let hiddensundata = {};
      for (let index = 0; index < sundata.length; index++) {
        if (sundata[index].boxUseBatchOn != "") {
          let key = JSON.stringify(sundata[index].boxUseBatchOn);
          let value = index;
          hiddensundata[key] = value;
        }
      }
      for (let i = pushData.length - 1; i >= 0; i--) {
        if (
          hiddensundata[JSON.stringify(pushData[i].boxUseBatchOn)] != undefined
        ) {
          this.$Message.error(
            pushData[i].boxUseBatchOn + "该用料批次号已经存在"
          );
          pushData.splice(i, 1);
        }
      }
      let index2 = this.index1;
      for (let a = 0; a < pushData.length; a++) {
        this.$refs["tableFields"].set(pushData[a], index2);
        index2++;
      }
      // this.$refs["tableFields"].set(pushData,this.index1);
      // this.pliQtyChange(this.index);
      // let index1 = this.index1;
      // for (let index = 0; index < val.length; index++) {
      //   if (index1 === 0) {
      //     index1 = index;
      //   }
      //   //接受工单号返回的值
      //   let data = val[index];
      //   //获得当前第二层表的值
      //   if (this.$refs["tableFields"].cloneData.length - 1 < index) {
      //      this.$refs["tableFields"].cloneData[index] = JSON.parse(JSON.stringify(this.initData.initData.stockboxlibmoveitemFm));
      //   }
      //   let demo = this.$refs["tableFields"].cloneData[index1];
      //   let tableData = this.$refs["tableFields"].cloneData
      //   //判断该工单号是否存在
      //   for (let index2 = 0; index2 < tableData.length; index2++) {
      //     if (data.boxUseBatchOn===tableData[index2].boxUseBatchOn) {
      //       this.$Message.error(data.boxUseBatchOn+'用料工单号已经存在')
      //        this.$refs["tableFields"].cloneData[index2] = JSON.parse(JSON.stringify(this.initData.initData.stockboxlibmoveitemFm));
      //     }
      //   }
      //   this.transformation(demo, data);
      //   this.pliQtyChange(index1)
      // }
      // console.log(this.cloneData)
    },
    //工单号失去焦点带出参数事件
    onFill(index) {
      let pushData = [];
      //debugger;
      //获取供应商编号
      let supplierCode = this.formDataInfo.master.supplierCode;
      //获取纸质
      let artCode = this.formDataInfo.boxLibMove.defaultList[index].artCode;
      //获取工单号
      let workNo = this.formDataInfo.boxLibMove.defaultList[index].workNo;
      //获取批次号
      let boxUseBatchOn = this.formDataInfo.boxLibMove.defaultList[index]
        .boxUseBatchOn;
      //获取当前子表数据
      // let two = this.formDataInfo.boxLibMove.defaultList[index];
      //明细表数据
      let tabData = this.$refs["tableFields"].cloneData;
      //获取子表初始化时的数据
      let defulit = this.initData.initData.stockboxlibmoveitemFm;
      if (supplierCode === "") {
        this.$Message.error("供应商编号不能为空");
        return;
      }
      if (workNo && boxUseBatchOn && artCode) {
        return;
      }
      if (boxUseBatchOn || workNo) {
        request
          .post(`/stock/boxLibMove/getWorkInStore`, {
            inBatchOn: boxUseBatchOn,
            inWorkNo: workNo,
            flag: "1",
            inSupplierId: this.formDataInfo.master.supplierId
          })
          .then(res => {
            //debugger;
            let data = res[0];
            if (data === [] || data === undefined) {
              this.$Message.error("工单号错误");
              //$set(要修改的对象,索引,属性的值是啥)
              this.$set(
                this.formDataInfo.boxLibMove.defaultList,
                index,
                this.initData.initData.stockboxlibmoveitemFm
              );
              return;
            }

            res.forEach(selectedValue => {
              let transData = this.transformation(selectedValue);
              pushData.push(transData);
            });

            for (let m = 0; m < tabData.length; m++) {
              for (let n = 0; n < pushData.length; n++) {
                //debugger
                if (pushData[n].boxUseBatchOn === tabData[m].boxUseBatchOn) {
                  pushData.splice(n, 1);
                  n = n - 1;
                }
              }
            }

            // this.$refs["tableFields"].set(pushData, index);
            this.$refs["tableFields"].set(pushData, index);
            //debugger;
            // let demo = this.$refs["tableFields"].cloneData[index];

            //判断用料批次号是否存在
            // for (let index2 = 0; index2 < tabData.length; index2++) {
            //   if (index != index2) {
            //     if (data.boxUseBatchOn === tabData[index2].boxUseBatchOn) {
            //       this.$Message.error("该用料批次号已经存在");
            //       tabData[index] = JSON.parse(
            //         JSON.stringify(this.initData.initData.stockboxlibmoveitemFm)
            //       );
            //       return;
            //     }
            //   }
            // }
            // this.transformation(demo, data);
            // this.pliQtyChange(index);
          });
      }
    },
    //工单号点击事件
    Slave_list_table_editRowModify(index) {
      //debugger;
      let batchNoList = "";
      let tabData = this.$refs["tableFields"].cloneData;
      if (tabData.length == 1) {
        if (tabData[0].boxUseBatchOn == "") {
          batchNoList = "";
        } else {
          batchNoList = tabData[0].boxUseBatchOn;
        }
      } else {
        for (let i = 0; i < tabData.length; i++) {
          if (i === tabData.length - 1) {
            if (tabData[i].boxUseBatchOn == "") {
              batchNoList = batchNoList.substr(0, batchNoList.length - 1);
            }
          } else {
            batchNoList += tabData[i].boxUseBatchOn + ",";
          }
        }
      }
      if (this.formDataInfo.master.supplierCode) {
        this.inSupplierId = this.formDataInfo.master.supplierId;
        this.salveWindow.showEditWindow = true;
        this.index1 = index;
        let ppuer = this.salveWindow.showEditWindow;
        this.salveWindow.action = "add";
        this.salveWindow.isLoaddingDone = true;
        request
          .post(`/stock/boxLibMove/getWorkInStore`, {
            // inBatchOn: "",
            batchNoList,
            inSupplierId: this.formDataInfo.master.supplierId
          })
          .then(res => {
            this.WorkOrderNumber1 = res;
            // console.log(res)
            this.$refs.mychild.getFormInitDataObj(res);
          });
      } else {
        this.salveWindow.showEditWindow = false;
        this.$Message.error("供应商编号不能为空");
      }
    },

    //判断数据是新增还是修改
    formDetailDataCall() {
      //debugger;
      if (this.action != "add") {
        //debugger;
        this.getworkerId = this.formDataInfo.master.workerId;
        this.id = this.formDataInfo.master.id;
      }
    },
    //当主表弹框改变时促发初始化子表数据
    Initializationdata(data) {
      //debugger;
      let tableData = this.$refs["tableFields"].getCategorizeData();
      if (this.formDataInfo.master.workerId) {
        if (this.formDataInfo.master.workerId != this.getworkerId) {
          this.formDataInfo.boxLibMove.defaultList = [];
          tableData.deleteList = tableData.updateList;
        }
        this.getworkerId = this.formDataInfo.master.workerId;
      }
    },
    // 重写父类 关闭窗口时 触发事件
    closeActionTigger() {
      //debugger;
      // fix 清除上次的错误提示 formDataInfo 为表单ref名称
      if (this.$refs["formDataInfo"]) this.$refs["formDataInfo"].resetFields();
      this.$refs["tableFields"].reset();
      this.formDataInfo.boxLibMove.defaultList = this.initData.initData.stockboxlibmoveitemFm;
      this.formDataInfo.master.remark = "";
    },
    //主表弹框判空
    clickValuedate() {
      //debugger;
      if (
        !this.formDataInfo.master.workerCode ||
        this.formDataInfo.master.workerCode == ""
      ) {
        this.$Message.error("报损人不能为空");
        return false;
      }
      return true;
    },
    // 重写父类,添加时候,清空数据
    HandleFormDataInfo() {
      this.formDataInfo = Object.assign({}, default_formDataInfo);
    },
    // 重写父类,修改提交数据
    resetformDataInfo(_data) {
      debugger;
      let tableData = this.$refs["tableFields"].getCategorizeData();
      //debugger;

      if (!!_data.master.bmDate) {
        _data.master.bmDate = dayjs(_data.master.bmDate).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      }
      if (!!_data.master.burMonthDate) {
        _data.master.burMonthDate = dayjs(_data.master.burMonthDate).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      }
      if (this.action == "update") {
        tableData.updateList = _data.boxLibMove.defaultList;
      }
      this.formDataInfo.boxLibMove = tableData;
      return this.formDataInfo;
    },
    // 退货数改变
    changeQty(value, index, row, keyWorld) {
      //debugger
      if (row.qty <= row.kQty) {
        let tableData = this.$refs["tableFields"].get();
        row.money = Number(row.price) * Number(row.qty);
        row.briWeight = Number(row.briSWeight) * Number(row.qty);
        row.briArea = Number(row.briSArea) * Number(row.qty);
      } else {
        this.$Message.error("退货数不能大于库存数");
        this.formDataInfo.master.qty = 0;
        row.qty = 0;
      }
    }
  }
};
</script>

<style>
.cl-edit-boxLibMove .ivu-form-item {
  margin-bottom: 5px !important;
}
.cl-edit-boxLibMove .ivu-select-item {
  display: block;
}
/* .cl-edit-boxLibMove .ivu-input-type-text{
  width: 200px
}*/
.cl-edit-boxLibMove .right-text {
  width: 160%;
}
</style>
