<template>
  <div>
    <editWindow
      class="cl-edit-boxUseOut"
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
                <FormItem label="领料单号" prop="boNo">
                  <Input v-model="formDataInfo.master.boNo" maxlength="20" placeholder disabled></Input>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="日期" prop="boDate">
                  <DatePicker
                    type="date"
                    format="yyyy-MM-dd"
                    :disabled="detailDisabled"
                    v-model="formDataInfo.master.boDate"
                  ></DatePicker>
                </FormItem>
              </Col>
            </Row>
          </Col>
          <Col span="6">
            <FormItem label="领料人" prop="workerCode">
              <div>
                <popup
                  :disabled="detailDisabled"
                  @on-fill="Initializationdata"
                  v-model="formDataInfo.master.workerCode"
                  field-name="workerCode"
                  popup-name="WorkerSingleBox"
                  :fill-model.sync="formDataInfo.master"
                  render-fields="workerId,workerCode,workerName"
                  from-fields="id,workCode,workName"
                  :suffix="true"
                  :suffix-model="formDataInfo.master.workerName"
                  :query-params="{workOptType:''}"
                />
              </div>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="仓位" prop="stationCode">
              <div>
                <popup
                  :disabled="detailDisabled"
                  v-model="formDataInfo.master.stationCode"
                  field-name="stationCode"
                  popup-name="WareHouseSingleBox"
                  :fill-model.sync="formDataInfo.master"
                  render-fields="stationId,stationCode,stationName"
                  from-fields="id,wsCode,wsName,"
                  :suffix="true"
                  :suffix-model="formDataInfo.master.stationName"
                  :query-params="{whType:3}"
                />
              </div>
            </FormItem>
          </Col>

          <Col span="6">
            <FormItem label="数量" prop="boQty">
              <!-- <Input v-model="formDataInfo.master.qty" maxlength="20" placeholder disabled></Input> -->
              <InputNumber
                disabled
                v-model="formDataInfo.master.boQty"
                :formatter="value => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                :parser="value => value.replace(/\$\s?|(,*)/g, '')"
                style="width:100%"
                maxlength="20"
                placeholder
              ></InputNumber>
            </FormItem>
          </Col>
          <Col span="18">
            <FormItem label="备注">
              <Input
                :disabled="detailDisabled"
                v-model="formDataInfo.master.remark"
                type="textarea"
                maxlength="20"
                placeholder="请输入备注..."
                size="small"
                :rows="1"
              ></Input>
            </FormItem>
          </Col>
        </Row>
      </Form>

      <Tabs>
        <!--  注意:eTable formDataInfo.artLengs.defaultList  ===artLengs=== 需要根据实际接口修改,其它不变-->
        <TabPane label="纸箱用料出库明细" name="name1">
          <eTable
            ref="tableFields"
            unqiue-mark="id"
            :index-menu="true"
            :col-start="0"
            :width="200"
            :height="280"
            :row-init-data="tableInitData?tableInitData.stockBoxUseOutItemFm:{}"
            :data.sync="formDataInfo.boxUseOutItemSlave.defaultList"
            :rules="tableFieldsValidator"
            :showContextMenu="!detailDisabled"
          >
            <template slot="head">
              <tr>

                <!-- <th class="ivu-table-column-center" width="70">
                  <div class="ivu-table-cell">
                    <span class>月结</span>
                  </div>
                </th>-->
                <th class="ivu-table-column-center" width="100">
                  <div class="ivu-table-cell">
                    <span class>工单号</span>
                  </div>
                </th>
                <th class="ivu-table-column-center" width="100">
                  <div class="ivu-table-cell">
                    <span class>用料单号</span>
                  </div>
                </th>
                <th class="ivu-table-column-center" width="80">
                  <div class="ivu-table-cell">
                    <span class>用料批次号</span>
                  </div>
                </th>
                <th class="ivu-table-column-center" width="100">
                  <div class="ivu-table-cell">
                    <span class>纸质</span>
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
                    <span class>已领数量</span>
                  </div>
                </th>
                <th class="ivu-table-column-center" width="80">
                  <div class="ivu-table-cell">
                    <span class>当前库存</span>
                  </div>
                </th>
                <th class="ivu-table-column-center" width="80">
                  <div class="ivu-table-cell">
                    <span class>领用数</span>
                  </div>
                </th>
                <th class="ivu-table-column-center" width="80">
                  <div class="ivu-table-cell">
                    <span class>客户编号</span>
                  </div>
                </th>
                <th class="ivu-table-column-center" width="80">
                  <div class="ivu-table-cell">
                    <span class>客户名称</span>
                  </div>
                </th>
                <th class="ivu-table-column-center" width="80">
                  <div class="ivu-table-cell">
                    <span class>产品编号</span>
                  </div>
                </th>
                <th class="ivu-table-column-center" width="80">
                  <div class="ivu-table-cell">
                    <span class>产品名称</span>
                  </div>
                </th>
                <th class="ivu-table-column-center" width="80">
                  <div class="ivu-table-cell">
                    <span class>料号</span>
                  </div>
                </th>
                <th class="ivu-table-column-center" width="80">
                  <div class="ivu-table-cell">
                    <span class>盒式编号</span>
                  </div>
                </th>
                <th class="ivu-table-column-center" width="80">
                  <div class="ivu-table-cell">
                    <span class>盒式名称</span>
                  </div>
                </th>
                <th class="ivu-table-column-center" width="100">
                  <div class="ivu-table-cell">
                    <span class>纸箱规格长</span>
                  </div>
                </th>
                <th class="ivu-table-column-center" width="80">
                  <div class="ivu-table-cell">
                    <span class>纸箱规格宽</span>
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
              <!-- <td class="ivu-table-column-center" width="100">
                <Checkbox
                  size="default"
                  :disabled="detailDisabled"
                  v-model="row.isAcc"
                  @input="
                    value => {
                      valueChangeAssign(value, index, row, 'isAcc');
                    }
                  "
                ></Checkbox>
              </td>-->
              <!-- 工单号 -->
              <td class="ivu-table-column-center" width="100">
                <Input
                  disabled
                  v-model="row.workNo"
                  @on-blur="onFill(index)"
                  
                  @input="
                      value => {
                        valueChangeAssign(value, index, row, 'workNo');
                      }
                    "
                  size="small"
                  :maxlength="20"
                ></Input>
              </td>
              <!-- 用料单号 -->
              <td class="ivu-table-column-left" width="100">
                <Input
                  v-model="row.mateWorkNo"
                  @on-blur="onFill(index)"
                  :disabled="detailDisabled"
                  icon="md-add"
                  @on-click="Slave_list_table_editRowModify(index)"
                  @input="
                      value => {
                        valueChangeAssign(value, index, row, 'mateWorkNo');
                      }
                    "
                  size="small"
                  :maxlength="20"
                ></Input>
              </td>
              <!-- 用料批次号 -->
              <td class="ivu-table-column-center" width="100">
                <Input
                  disabled
                  v-model="row.boxUseBatchNo"
                  @input="
                      value => {
                        valueChangeAssign(value, index, row, 'boxUseBatchNo');
                      }
                    "
                  size="small"
                  :maxlength="20"
                ></Input>
              </td>
              <!--纸质 -->
              <td class="ivu-table-column-left" width="100">
                <Input
                  disabled
                  v-model="row.artCode"
                  @input="
                    value => {
                        valueChangeAssign(value, index, row, 'artCode');
                    }
                    "
                  size="small"
                  :maxlength="20"
                ></Input>
                <!-- <popup
                  :popupClickValidator="clickValuedate"
                  v-model="row.artCode"
                  field-name="artCode"
                  :disabled="detailDisabled"
                  popup-name="PurSupplierArtItemSingleBox"
                  :fill-model.sync="formDataInfo.boxUseOutItemSlave.defaultList"
                  render-fields="supplierArtId,supplierArtName,artId,artCode,lengId"
                  from-fields="supplierArtId,supplierArtName,artId,artCode,lengId"
                  :index="index"
                  :init-data="itemInitData"
                  :query-params="{supplierCode:formDataInfo.master.supplierCode,'supplierArtName$ne':row.artCode}"
                  @input="
                      value => {
                        valueChangeAssign(value, index, row, 'artCode');
                      }
                    "
                /> -->
              </td>
              <!-- 楞别 -->
              <td class="ivu-table-column-center" width="100">
                <Input
                  disabled
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
                  disabled
                  v-model="row.sizeWidth"
                  @input="
                    value => {
                        valueChangeAssign(value, index, row, 'sizeWidth');
                    }
                    "
                  size="small"
                  :maxlength="20"
                ></Input>
              </td>
              <!--纸长 -->
              <td class="ivu-table-column-center" width="100">
                <Input
                  disabled
                  v-model="row.sizeLength"
                  @input="
                    value => {
                        valueChangeAssign(value, index, row, 'sizeLength');
                    }
                    "
                  size="small"
                  :maxlength="20"
                ></Input>
              </td>
              <!--已领数量 -->
              <td class="ivu-table-column-center" width="100">
                <Input
                  disabled
                  v-model="row.boiAlreadyQty"
                  @input="
                    value => {
                        valueChangeAssign(value, index, row, 'boiAlreadyQty');
                    }
                    "
                  size="small"
                  :maxlength="20"
                ></Input>
              </td>
              <!--当前库存 -->
              <td class="ivu-table-column-center" width="100">
                <Input
                  disabled
                  v-model="row.boiStoreQty"
                  @input="
                    value => {
                        valueChangeAssign(value, index, row, 'boiStoreQty');
                    }
                    "
                  size="small"
                  :maxlength="20"
                ></Input>
              </td>
              <!--领用数 -->
              <td class="ivu-table-column-center" width="100">
                <Input
                  :disabled="detailDisabled"
                  v-model="row.boiQty"
                  @input="
                    value => {
                        valueChangeAssign(value, index, row, 'boiQty');
                    }
                    "
                  size="small"
                  :maxlength="20"
                ></Input>
              </td>
              <!--客户编号 -->
              <td class="ivu-table-column-center" width="100">
                <Input
                  disabled
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

              <!--客户名称 -->
              <td class="ivu-table-column-center" width="100">
                <Input
                  disabled
                  v-model="row.custName"
                  @input="
                    value => {
                        valueChangeAssign(value, index, row, 'custName');
                    }
                    "
                  size="small"
                  :maxlength="20"
                ></Input>
              </td>
              <!--产品编号 -->
              <td class="ivu-table-column-center" width="100">
                <Input
                  disabled
                  v-model="row.bpNo"
                  @input="
                    value => {
                        valueChangeAssign(value, index, row, 'bpNo');
                    }
                    "
                  size="small"
                  :maxlength="20"
                ></Input>
              </td>
              <!--产品名称 -->
              <td class="ivu-table-column-center" width="100">
                <Input
                  disabled
                  v-model="row.bpName"
                  @input="
                    value => {
                        valueChangeAssign(value, index, row, 'bpName');
                    }
                    "
                  size="small"
                  :maxlength="20"
                ></Input>
              </td>
              <!--料号 -->
              <td class="ivu-table-column-center" width="100">
                <Input
                  disabled
                  v-model="row.batchNo"
                  @input="
                    value => {
                        valueChangeAssign(value, index, row, 'batchNo');
                    }
                    "
                  size="small"
                  :maxlength="20"
                ></Input>
              </td>
              <!--盒式编号-->
              <td class="ivu-table-column-center" width="100">
                <Input
                  disabled
                  v-model="row.proBoxCode"
                  @input="
                    value => {
                        valueChangeAssign(value, index, row, 'proBoxCode');
                    }
                    "
                  size="small"
                  :maxlength="20"
                ></Input>
              </td>
              <!--盒式名称 -->
              <td class="ivu-table-column-center" width="100">
                <Input
                  disabled
                  v-model="row.proBoxName"
                  @input="
                    value => {
                        valueChangeAssign(value, index, row, 'proBoxName');
                    }
                    "
                  size="small"
                  :maxlength="20"
                ></Input>
              </td>
              <!--纸箱规格长-->
              <td class="ivu-table-column-center" width="100">
                <Input
                  disabled
                  v-model="row.boxSizeL"
                  @input="
                    value => {
                        valueChangeAssign(value, index, row, 'boxSizeL');
                    }
                    "
                  size="small"
                  :maxlength="20"
                ></Input>
              </td>
              <!-- 纸箱规格宽	 -->
              <td class="ivu-table-column-left" width="100">
                <Input
                  disabled
                  v-model="row.boxSizeW"
                  @input="
                    value => {
                        valueChangeAssign(value, index, row, 'boxSizeW');
                    }
                    "
                  size="small"
                  :maxlength="20"
                ></Input>
              </td>
              <!--备注-->
              <td class="ivu-table-column-left" width="100">
                <Input
                  :disabled="detailDisabled"
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
    <boxUseOutSlave
      ref="mychild"
      :isLoaddingDone="salveWindow.isLoaddingDone"
      :formDetailData="salveWindow.formDetailData"
      :action="salveWindow.action"
      v-model="salveWindow.showEditWindow"
      :List="List"
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
// import preferential from "@/components/preferential/preferential";
import popup from "@/components/popup/popup";
import editWindow from "@/components/edit-window/edit-window";
import eTable from "@/components/e-table/e-table";
import request from "@/libs/request";
import editBaseMixins from "../../mixins/edit";
import optionSearch from "../../components/optionSearch";
import dayjs from "dayjs";
import Sys from "@/api/sys";
import formControl from "@/components/form-control/form-control";
import boxUseOutSlave from "./edit-boxUseOutSlave";
import { deepCopy } from "view-design/src/utils/assist";
const default_formDataInfo = {
  // 主表 更改字段
  master: {
    boNo: "", //领料单号
    boQty: 0, //数量
    boDate: dayjs().format("YYYY-MM-DD HH:mm:ss"),//领料日期
    workerCode: "",  //领用人编号
    workerId: "",  //领用人ID
    workerName: "",  //领用人名称
    stationCode: "",  //仓位Code
    stationId: "",  //仓位Id
    stationName: "",  //仓位Name
    // remark: ""
  },
  // 子表 artLengs 根据实际接口更改,其它不变
  boxUseOutItemSlave: {
    addList: [], // 添加列
    defaultList: [], // 默认列
    deleteList: [], // 删除列
    updateList: []
  }
};
export default {
  name: "edit-boxUseOut",
  mixins: [editBaseMixins],
  components: {
    editWindow,
    optionSearch,
    eTable,
    popup,
    boxUseOutSlave,
    formControl
    // Form,
  },
  data() {
    return {
      actionSubtitle: "纸箱用料出库", // 当前操作副标题
      salveWindow: {
        flag: null, //隐藏完结字段
        Tips: "提示：此窗口只显示有供应商纸质/纸板进价的工单！",
        isLoaddingDone: false, // 窗口是否加载完成
        showEditWindow: false, // 是否显示edit-boxSalesOrderSlave 编辑窗口
        action: "add", // 当前操作功能 添加/编辑
        formDetailData: {} // 当前表单的详细信息
      },

      formName: "stockBoxUseOutItemFm",
      requestBaseUrl: "/stock/boxUseOut", // 请求 查询 操作的基础路径
      formDataInfo: Object.assign({}, default_formDataInfo), // 防止添加和更新数据提交发生冲突

      itemInitData: {},
      // 需要验证的数据
      ruleValidate: {
        boDate: [
          { required: true, message: "日期不能为空", trigger: "blur",type:"date" }
        ],
        boNo: [
          { required: true, message: "领料单号不能为空", trigger: "blur,change" }
        ]
      },
      cliclleng: null,
      getsupplierCode: 0,
      List: "null",
      WorkOrderNumber: null,
      getppoNoOrder: [false],
      index1: 0, //工单号里面用
      disppoGroupNo: true //工单号禁用字段
    };
  },
  methods: {
    transformation(demo, data, index1 = 0) {
      debugger;
     demo.artCode       = data.psArt           //  纸质
     demo.batchNo       = data.biBatchNo        //料号
    //  demo.boId          = data.                 //纸箱用料出库id
     demo.boiAlreadyQty = data.biQty              //已领数量
     demo.workNo       = data.psWorkNo                // 工单号
     demo.mateWorkNo    = data.bmMateWorkNo          //用料单号
     demo.boiQty        = data.bpOutStore           //领用数
     demo.boiStoreQty   = data.bpStoreQty           // 当前库存
     demo.boxSizeL      = data.psSizeL              //纸长
     demo.boxSizeW      = data.psSizeW             //纸宽 
     demo.boxUseBatchNo = data.BoxUseBatchOn       //批次号
     demo.bpName        = data.biProdName          //产品名称
     demo.bpNo          = data.biProdNo            //产品编号
    //  demo.cust          = 
     demo.custCode      = data.cusCode             //客户编号
    //  demo.custId        = data.
     demo.custName      = data.cusName              //客户名称
     demo.lbCode        = data.lbCode               //楞别
     demo.proBoxCode    = data.bpPBoxCode           //盒式编号
     demo.proBoxName    = data.bpPBoxName           //盒式名称
    //  demo.product       = data.
    //  demo.productId     = data.
     demo.remark        = data.remark
     demo.sizeLength    = data.bmSSizeL            //纸箱规格长
     demo.sizeWidth     = data.bmSSizeW	           //纸箱规格宽
    //  bpProQty                                        //工单需求数量

    },
    //工单号失去焦点带出参数事件
    onFill(index) {
      debugger;
      //获取领料人
      let inProvider = this.formDataInfo.master.workerCode;
      //获取领料boNo单号
      let ppoboNo = this.formDataInfo.master.boNo;
      //获取当前子表数据
      let two = this.formDataInfo.boxUseOutItemSlave.defaultList[index];
      let one = this.$refs["tableFields"].cloneData[index];
      //获取子表初始化时的数据
      let defulit = this.initData.initData.stockBoxUseOutItemFm;
      if (inProvider === "") {
        this.$Message.error("领料人不能为空");
        return;
      }
   
      // if (ppoboNo) {
        request
          .post(`/stock/boxUseOut/getBoiOutCo`, {
            inCoNoName: ppoboNo,
            // inBmMateWorkNo 
          })
          .then(ref => {
            debugger
            let data = ref[0];
            if (data === [] || data === undefined|| data === null) {
              this.$Message.error("工单号错误");
              //$set(要修改的对象,属性,属性的值是啥)
              this.$set(
                this.formDataInfo.boxUseOutItemSlave.defaultList,
                index,
                this.initData.initData.stockBoxUseOutItemFm
              );
              console.log(
                this.formDataInfo.boxUseOutItemSlave.defaultList[index]
              );
              console.log(this.formDataInfo.boxUseOutItemSlave.defaultList);
              return;
            }
            let demo = this.$refs["tableFields"].cloneData[index];
            this.transformation(demo, data);
          });
      // }
    },
    //无单采购点击事件
    ppoNoOrderclick(index) {
      if (this.$refs["tableFields"].cloneData[index].ppoNoOrder === true) {
        (this.getppoNoOrder[index] = false), (this.disppoGroupNo = true);
        // this.getppoNoOrder[index]=false,
      } else
        (this.getppoNoOrder[index] = true),
          // this.getppoNoOrder[index]=true,
          (this.disppoGroupNo = false);
    },
    //打开编辑页面判断完结是否显示
    // resetTitle() {
    //   if (this.action === "add") {
    //     this.flag = false;
    //   } else {
    //     this.flag = true;
    //   }
    // },
    //接受工单号传回来的数据
    closeMain(val) {
      debugger;
      let index1 = this.index1;
      for (let index = 0; index < val.length; index++) {
        if (index1 === 0) {
          index1 = index;
        }
        //接受工单号返回的值
        let data = val[index];
        //获得当前第二层表的值
        if (this.$refs["tableFields"].cloneData.length - 1 < index) {
          this.$refs["tableFields"].cloneData[
            index
          ] = this.initData.initData.stockBoxUseOutItemFm;
        }

        let demo = this.$refs["tableFields"].cloneData[index1];
        this.transformation(demo, data, index1);
      }
     
    },
    //工单号点击事件
    Slave_list_table_editRowModify(index) {
      debugger;
      // if (
      //   !this.formDataInfo.boxUseOutItemSlave.defaultList[index].ppoNoOrder
      // ) {
        this.salveWindow.showEditWindow = true;
        this.index1 = index;
        if (this.formDataInfo.master.workerCode) {
          this.List = this.formDataInfo.master.workerCode;
          let ppuer = this.salveWindow.showEditWindow;
          this.salveWindow.isLoaddingDone = true;
          this.salveWindow.action = "add";
          var _this = this;
          request
            .post(`/stock/boxUseOut/getBoiOutCo`, {
              // inProvider: this.getsupplierCode
            })
            .then(res => {
              debugger;
              _this.WorkOrderNumber = res;
              _this.$refs.mychild.getFormInitDataObj(res);
            });
        } else {
          this.salveWindow.showEditWindow = false;
          this.$Message.error("领料人不能为空");
        }
      // } else {
      //   this.salveWindow.showEditWindow = false;
      // }
    },

    //判断数据是新增还是修改
    formDetailDataCall() {
      // debugger
      if (this.action != "add") {
        //debugger
        this.getsupplierCode = this.formDataInfo.master.supplierCode;
      }
    },
    //当主表客户弹框改变时促发初始化子表数据
    Initializationdata() {
      let tableData = this.$refs["tableFields"].getCategorizeData();
      // debugger
      if (this.formDataInfo.master.supplierCode) {
        if (this.formDataInfo.master.supplierCode != this.getsupplierCode) {
          this.formDataInfo.boxUseOutItemSlave.defaultList = [];
          tableData.deleteList = tableData.updateList;
        }
        this.getsupplierCode = this.formDataInfo.master.supplierCode;
      }
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
      // debugger;
      this.formDataInfo = Object.assign({}, default_formDataInfo);
    },
    // 重写父类,修改提交数据
    resetformDataInfo(_data) {
      let tableData = this.$refs["tableFields"].getCategorizeData();
      debugger;
      // for (let i = 0; i < tableData.addList.length; i++) {
      //   tableData.addList[i].supplierArtId = this.WorkOrderNumber[
      //     i
      //   ].supplierArtId; //供应商纸质id
      //   tableData.addList[i].artId = this.WorkOrderNumber[i].ppoCorpartId; //纸质id|本厂
      // }
      this.formDataInfo.boxUseOutItemSlave = tableData;
      if (!!_data.master.accDate || !!_data.master.boDate) {
        _data.master.accDate = dayjs(_data.master.accDate).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        _data.master.boDate = dayjs(_data.master.boDate).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      }
      return this.formDataInfo;
    }
  }
};
</script>

<style>
.cl-edit-boxUseOut .ivu-form-item {
  margin-bottom: 5px !important;
}
.cl-edit-boxUseOut .ivu-select-item {
  display: block;
}
/* .cl-edit-boxUseOut .ivu-input-type-text{
  width: 200px
} */
.cl-edit-boxUseOut .right-text {
  width: 500px;
}
</style>
