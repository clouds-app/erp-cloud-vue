<template>
  <div>
    <editWindow
      class="cl-edit-boxLibLost"
      :title="actionLableName"
      v-model="showWindow"
      :fullscreen="false"
      width="95%"
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
                <FormItem label="报损单号" prop="blNo">
                  <Input disabled v-model="formDataInfo.master.blNo" maxlength="20" placeholder></Input>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="报损日期">
                  <DatePicker
                    :disabled="detailDisabled"
                    type="date"
                    format="yyyy-MM-dd"
                    v-model="formDataInfo.master.blDate"
                  ></DatePicker>
                </FormItem>
              </Col>
            </Row>
          </Col>
          <Col span="12">
            <Row>
              <Col span="12">
                <FormItem label="报损人" prop="workCode">
                  <div>
                    <!-- @on-fill="Initializationdata" -->
                    <popup
                      v-model="formDataInfo.master.workCode"
                      field-name="workCode"
                      :disabled="detailDisabled"
                      popup-name="WorkerSingleBox"
                      :fill-model.sync="formDataInfo.master"
                      render-fields="workerId,workCode,workName"
                      from-fields="id,workCode,workName"
                      :suffix="true"
                      :suffix-model="formDataInfo.master.workName"
                      :query-params="{workOptType:8}"
                    />
                  </div>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="仓位" prop="stationCode">
                  <div>
                    <!-- @on-fill="Initializationdata" -->
                    <popup
                      v-model="formDataInfo.master.stationCode"
                      field-name="stationCode"
                      :disabled="detailDisabled||action=='update'"
                      popup-name="WareHouseSingleBox"
                      :fill-model.sync="formDataInfo.master"
                      render-fields="stationId,stationCode,stationName"
                      from-fields="wareHouseItId,wsCode,wsName"
                      :suffix="true"
                      :suffix-model="formDataInfo.master.stationName"
                      :query-params="{whType:2}"
                    />
                  </div>
                </FormItem>
              </Col>
            </Row>
          </Col>
          <Col span="6">
            <FormItem label="班组" prop="teamCode">
              <div>
                <!-- @on-fill="Initializationdata" -->
                <popup
                  v-model="formDataInfo.master.teamCode"
                  field-name="teamCode"
                  :disabled="detailDisabled"
                  popup-name="TeamSingleBox"
                  :fill-model.sync="formDataInfo.master"
                  render-fields="teamId,teamCode,teamName"
                  from-fields="id,teamCode,teamName"
                  :suffix="true"
                  :suffix-model="formDataInfo.master.teamName"
                  :query-params="{}"
                />
              </div>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="数量" prop="blQty">
              <Input disabled v-model="formDataInfo.master.blQty" maxlength="20" placeholder></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="备注">
              <Input
                :disabled="detailDisabled"
                v-model="formDataInfo.master.remark"
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
        <TabPane label="纸箱成品报损明细表" name="name1">
          <eTable
            ref="tableFields"
            unqiue-mark="id"
            :index-menu="true"
            :col-start="0"
            :width="200"
            :height="400"
            :insertDirection="insertDirection"
            :row-init-data="initData.initData.stockboxliblostitemFm"
            :data.sync="formDataInfo.lostItems.defaultList"
            :rules="tableFieldsValidator"
            :showContextMenu="!detailDisabled"
            v-if="showWindow"
          >
            <template slot="head">
              <tr
                v-for="(columnGroup,index) in initData.columns.stockboxliblostitemFm.editGroups"
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
                v-for="(column,columnIndex) in initData.columns.stockboxliblostitemFm.editColumns"
                :key="columnIndex"
                :width="column.editWidth"
              >
                <!--控件特殊处理 工单号  -->
                <Input
                  v-if="column.key == 'workNo'"
                  v-model="row[column.key]"
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
                <!--控件特殊处理 报损数量  -->
                <Input
                  v-else-if="column.key == 'biQty'"
                  v-model="row[column.key]"
                  :disabled="detailDisabled"
                  number
                  type="number"
                  @on-blur="biInQtyChange(index)"
                  @input="
                      value => {
                        valueChangeAssign(value, index, row, 'biQty');
                      }
                    "
                  size="small"
                  :maxlength="20"
                ></Input>
                <!--控件特殊处理 责任人  -->
                <popup
                  :popupClickValidator="clickValuedate"
                  v-else-if="column.key=='biLostOwnerCode'"
                  v-model="row[column.key]"
                  field-name="biLostOwnerCode"
                  :disabled="detailDisabled"
                  popup-name="WorkerSingleBox"
                  :fill-model.sync="formDataInfo.lostItems.defaultList"
                  render-fields="biLostOwner,biLostOwnerCode,biLostOwnerName"
                  from-fields="id,workCode,workName"
                  :index="index"
                  :init-data="initData.initData.stockboxliblostitemFm"
                  :query-params="{workOptType:8}"
                  @input="
                          value => {
                            valueChangeAssign(value, index, row, 'biLostOwnerCode');
                          }
                        "
                ></popup>
                <!-- 控件特殊处理 责任部门 -->
                <popup
                  v-else-if="column.key=='biLostDeptCode'"
                  :popupClickValidator="clickValuedate"
                  v-model="row[column.key]"
                  field-name="biLostDeptCode"
                  :disabled="detailDisabled"
                  popup-name="deptSingleBox"
                  :fill-model.sync="formDataInfo.lostItems.defaultList"
                  render-fields="biLostDept,biLostDeptCode,biLostDeptName"
                  from-fields="id,deptCode,deptName"
                  :index="index"
                  :init-data="initData.initData.stockboxliblostitemFm"
                  :query-params="{}"
                  @input="
                          value => {
                            valueChangeAssign(value, index, row, 'biLostDeptCode');
                          }
                        "
                ></popup>
                <!--控件特殊处理 报损类型  -->
                <Select
                  @on-change="value => {valueChangeAssign(value, index, row,column.key)}"
                  :disabled="detailDisabled"
                  v-model="row[column.key]"
                  v-else-if="column.key == 'biLostType'"
                  transfer
                >
                  <Option
                    v-for="(item,index)  in biLostTypeList"
                    :key="index"
                    :value="item.dicValue+''"
                  >{{item.dicLabel}}</Option>
                </Select>
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
    <boxLibLostSlave
      ref="mychild"
      :isLoaddingDone="salveWindow.isLoaddingDone"
      :formDetailData="salveWindow.formDetailData"
      :action="salveWindow.action"
      v-model="salveWindow.showEditWindow"
      :whId="whId"
      :workNoList="workNoList"
      :WorkOrderNumber="WorkOrderNumber"
      @closeMain="closeMain"
    />
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
import boxLibLostSlave from "./edit-boxLibLostSlave";
const default_formDataInfo = {
  // 主表 更改字段
  master: {
    blQty: "",
    stationCode: "",
    stationId: "",
    stationCode: "",
    workCode: "",
    workerId: "",
    workName: "",
    blNo: "",
    blDate: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    remark: "",
    teamId: "",
    teamCode: "",
    teamName: ""
  },
  // 子表 artLengs 根据实际接口更改,其它不变
  lostItems: {
    addList: [], // 添加列
    defaultList: [], // 默认列
    deleteList: [], // 删除列
    updateList: [] // 更新列
  }
};
export default {
  name: "edit-paperPrice",
  mixins: [editBaseMixins],
  components: {
    editWindow,
    optionSearch,
    boxLibLostSlave,
    eTable,
    popup,
    formControl,
    referenceField
    // rightMenu
    // Form,
  },
  data() {
    return {
      insertDirection: "down", //表单插入方向
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
      actionSubtitle: "纸箱成品报损", // 当前操作副标题
      biLostTypeList: [], //报损类型
      id: 0,
      formName: "stockboxliblostitemFm",
      formmasterName: "stockboxliblostFm",
      requestBaseUrl: "/stock/boxLibLost", // 请求 查询 操作的基础路径
      formDataInfo: Object.assign({}, default_formDataInfo), // 防止添加和更新数据提交发生冲突
      // 需要验证的数据
      ruleValidate: {
        workCode: [
          {
            required: true,
            message: "报损人不能为空",
            trigger: "blur"
          }
        ],
        stationCode: [
          {
            required: true,
            message: "仓位不能为空",
            trigger: "blur"
          }
        ],
        teamCode: [
          {
            required: true,
            message: "班组不能为空",
            trigger: "blur"
          }
        ]
      },
      tableFieldsValidator: {
        workNo: [
          {
            required: true,
            message: "工单号不能为空",
            trigger: "blur"
          }
        ],
        biQty:[
          {
            required: true,
            message: "入库数量不能为空",
            trigger: "blur",
            type: "number"
          },
          {
            pattern: /^[1-9]\d*$/,
            trigger: "blur",
            message: "报损数量必须是正整数"
          }
        ]
      },
      subBoxClickIndex: -1,
      getbppClassId: 0,
      whId: "null", //传给用料批次号的参数
      workNoList: "", //过滤用的字符串传给工单
      WorkOrderNumber: "null",
      index1: 0 //工单号里面用
    };
  },
  created() {
    this.getbiLostTypeList(); //报损类型
  },
  methods: {
    //获取报损类型
    getbiLostTypeList() {
      // debugger
      request
        .get("/common/sys/dic/childList/boxLostType", {}, { qt: "pValue" })
        .then(res => {
          res.forEach(item => {
            item.dicValue = parseInt(item.dicValue);
          });
          this.biLostTypeList = res;
          // console.log(this.biLostTypeList)
        });
    },
    //计算调整数量  biQty
    biInQtyChange() {
      //  debugger
      let masterstockqty = 0;
      let tableData = this.$refs["tableFields"].get();
      for (let index = 0; index < tableData.length; index++) {
        let biQty = Number(tableData[index].biQty);
        let biQtyStore = Number(tableData[index].biQtyStore);
        if (biQty > biQtyStore) {
          tableData[index].biQty = 0;
          biQty = 0
          this.$Message.error('报损数量不能大于当前库存数')
        }
        masterstockqty += biQty;
      }
      this.formDataInfo.master.blQty = Number(masterstockqty);
    },
    //数据传递
    transformation(selectedValue) {
      // debugger
      let transData = JSON.parse(
        JSON.stringify(this.initData.initData.stockboxliblostitemFm)
      );
      transData.artCode = selectedValue.artCode; //客方纸质
      transData.biProdName = selectedValue.biProdName; //产品名称
      transData.biProdNo = selectedValue.biProdNo; //产品编号
      transData.biQtyStore = selectedValue.biQtyStore; //当时库存
      transData.bpBatchNo = selectedValue.bpBatchNo; //料号
      transData.bpCArtId = selectedValue.bpCArtId; //客方纸质
      transData.bpCBoxId = selectedValue.bpCBoxId; //客方盒式id
      transData.bpCBoxName = selectedValue.bpCBoxName; //客方盒式
      transData.bpCSizeLWH = selectedValue.bpCSizeLWH; //客方规格(长*宽*高)
      // transData.cusCode=selectedValue.cusCode //客户编号
      // transData.cusName=selectedValue.cusName //客户名称
      transData.workNo = selectedValue.workNo; //工单号
      return transData;
    },
    //接受工单号传回来的数据
    closeMain(selectedValues) {
      // debugger
      let pushData = [];
      selectedValues.forEach(selectedValue => {
        let transData = this.transformation(selectedValue);
        pushData.push(transData);
      });
      // let 子表数据 = this.$refs["tableFields"].get()
      let sundata = this.$refs["tableFields"].get();
      //工单号唯一校验
      let hiddensundata = {};
      for (let index = 0; index < sundata.length; index++) {
        if (sundata[index].workNo != "") {
          let key = JSON.stringify(sundata[index].workNo);
          let value = index;
          hiddensundata[key] = value;
        }
      }
      for (let i = pushData.length - 1; i >= 0; i--) {
        if (hiddensundata[JSON.stringify(pushData[i].workNo)] != undefined) {
          this.$Message.error(pushData[i].workNo + "该工单号已经存在");
          pushData.splice(i, 1);
        }
      }
      // this.$refs["tableFields"].set(pushData,this.index)

      let index2 = this.index1;
      for (let a = 0; a < pushData.length; a++) {
        this.$refs["tableFields"].set(pushData[a], index2);
        index2++;
      }
      this.biInQtyChange(this.index1);
    },
    //工单号失去焦点带出参数事件
    onFill(index) {
      //  debugger;
      let pushData = [];
      //获取报损人id
      let paAdujstorId = this.formDataInfo.master.paAdujstorId;
      //获取工单号
      let workNo = this.formDataInfo.lostItems.defaultList[index].workNo;
      //获取当前子表数据
      // let two = this.formDataInfo.lostItems.defaultList[index];
      let tabData = this.$refs["tableFields"].cloneData;
      //获取子表初始化时的数据
      let defulit = this.initData.initData.stockboxliblostitemFm;
      if (workNo) {
        request
          .post(`/stock/boxLibLost/getBoxStoreData`, {
            workNo: workNo,
            likeFlag: 0,
            stationId: this.formDataInfo.master.stationId
          })
          .then(res => {
            let data = res[0];
            if (data === [] || data === undefined || data.length == 0) {
              this.$Message.error("工单号错误");
              //$set(要修改的对象,索引,属性的值是啥)
              this.$set(
                this.formDataInfo.lostItems.defaultList,
                index,
                this.initData.initData.stockboxliblostitemFm
              );
              return;
            }
            res.forEach(selectedValue => {
              let transData = this.transformation(selectedValue);
              pushData.push(transData);
            });
            this.$refs["tableFields"].set(pushData, index);
            // let demo = this.$refs["tableFields"].cloneData[index];
            //判断用料批次号是否存在
            for (let index2 = 0; index2 < tabData.length; index2++) {
              if (index != index2) {
                if (data.workNo === tabData[index2].workNo) {
                  this.$Message.error("该工单号已经存在");
                  this.$refs["tableFields"].set(this.initData.initData.stockboxliblostitemFm, index)
                  return;
                }
              }
            }
            // this.transformation(demo, data);
            this.biInQtyChange(index);
            this.OnlyWorkNo(index);
          });
      }
    },
    //工单号唯一校验
    OnlyWorkNo(index) {
      // debugger;
      //获取当前行工单号
      let workNo = this.formDataInfo.lostItems.defaultList[index].workNo;
      //过去明细表全部数据
      let two = this.formDataInfo.lostItems.defaultList;
      let one = this.$refs["tableFields"].cloneData;
      for (let index1 = 0; index1 < one.length; index1++) {
        if (index1 !== index) {
          if (one[index1].workNo === workNo) {
            //若当前列表工单号已经存在，清空当前列表数据，提示工单号已经存在 BC200300033-2
            // this.$set(
            this.formDataInfo.lostItems.defaultList[index] = [];
            //   index,
            //   this.initData.initData.stockboxliblostitemFm
            // )
            this.$Message.error("此工单号已经存在");
            this.biInQtyChange(index);
          }
        }
      }
    },
    //工单号点击事件
    Slave_list_table_editRowModify(index) {
      // debugger;
      let workNoList = "";
      let tabData = this.$refs["tableFields"].cloneData;
      if (tabData.length == 1) {
        if (tabData[0].workNo == "") {
          workNoList = "";
        } else {
          workNoList = tabData[0].workNo;
        }
      } else {
        for (let i = 0; i < tabData.length; i++) {
          if (i === tabData.length - 1) {
            if (tabData[i].workNo == "") {
              workNoList = workNoList.substr(0, workNoList.length - 1);
            }else{
              batchOnList += tabData[i].workNo
            }
          } else {
            workNoList += tabData[i].workNo + ",";
          }
        }
      }
      if (this.formDataInfo.master.workerId) {
        if (this.formDataInfo.master.stationId) {
          this.whId = this.formDataInfo.master.stationId;
          this.salveWindow.showEditWindow = true;
          this.index1 = index;
          let ppuer = this.salveWindow.showEditWindow;
          this.salveWindow.action = "add";
          this.salveWindow.isLoaddingDone = true;
          this.workNoList = workNoList;
          // issInput(1输入0查询)
          request
            .post(`/stock/boxLibLost/getBoxStoreData`, {
              stationId: this.formDataInfo.master.stationId,
              workNoList
            })
            .then(res => {
              this.WorkOrderNumber1 = res;
              this.$refs.mychild.getFormInitDataObj(res);
            });
        } else {
          this.salveWindow.showEditWindow = false;
          this.$Message.error("仓位不能为空");
        }
      } else {
        this.salveWindow.showEditWindow = false;
        this.$Message.error("报损人不能为空");
      }
    },
    //判断数据是新增还是修改
    formDetailDataCall() {
      // debugger;
      if (this.action != "add") {
        //debugger
        this.getteamCode = this.formDataInfo.master.workCode;
        this.id = this.formDataInfo.master.id;
      }
    },
    //当主表弹框改变时促发初始化子表数据
    Initializationdata(data) {
      //debugger
      let tableData = this.$refs["tableFields"].getCategorizeData();
      if (this.formDataInfo.master.paAdujstorId) {
        if (this.formDataInfo.master.paAdujstorId != this.getbppClassId) {
          this.formDataInfo.lostItems.defaultList = [];
          tableData.deleteList = tableData.updateList;
        }
        this.getbppClassId = this.formDataInfo.master.paAdujstorId;
      }
    },
    // 重写父类 关闭窗口时 触发事件
    closeActionTigger() {
      // debugger
      // fix 清除上次的错误提示 formDataInfo 为表单ref名称
      this.$refs["formDataInfo"].resetFields();
      // this.$refs["tableFields"].reset();
      this.formDataInfo.lostItems.defaultList =
        Array[this.initData.initData.stockboxliblostitemFm];
    },
    //主表弹框判空
    clickValuedate() {
      //debugger;
      if (
        !this.formDataInfo.master.workCode ||
        this.formDataInfo.master.workCode == ""
      ) {
        this.$Message.error("报损人不能为空");
        return false;
      }
      return true;
    },
    // 重写父类,添加时候,清空数据
    HandleFormDataInfo() {
      // debugger
      this.formDataInfo = Object.assign({}, default_formDataInfo);
    },
    // 重写父类,修改提交数据
    resetformDataInfo() {
      // debugger;
      let _data = this.formDataInfo;
      let tableData = this.$refs["tableFields"].getCategorizeData();
      this.formDataInfo.lostItems = tableData;
      if (!!_data.master.blDate) {
        _data.master.blDate = dayjs(_data.master.blDate).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      }
      return this.formDataInfo;
    }
    // formTableDataSubmit(){
    //   let _self = this
    //   this.$refs['formDataInfo'].validate(valid => {
    //     if (!valid) {
    //       return
    //     }
    //     let result = this.$refs['tableFields'].validate()
    //     if (result) {
    //       return
    //     }
    //     // _self.insertboxLibLosteData()
    //     let submitData = _self.resetformDataInfo()
    //     request.post(`/stock/boxLibLost/save`,submitData).then(res=>{
    //       _self.showWindow = false // 关闭当前编辑页面
    //       _self.$Message.success('执行成功')
    //       _self.$emit('submit-success') // 刷新主页面数据
    //     })
    //   })
    // }
  }
};
</script>

<style>
.cl-edit-paperPrice .ivu-form-item {
  margin-bottom: 5px !important;
}
.cl-edit-paperPrice .ivu-select-item {
  display: block;
}
/* .cl-edit-paperPrice .ivu-input-type-text{
  width: 200px
}*/
.cl-edit-paperPrice .right-text {
  width: 160%;
}
</style>
