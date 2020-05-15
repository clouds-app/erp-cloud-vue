<template>
  <div>
    <editWindow
      id="cl-edit-accRece"
      :title="actionLableName"
      v-model="showWindow"
      :fullscreen="false"
      width="93%"
      :loading="!isLoaddingDone"
      :spinLoaddingText="spinLoaddingText"
      @on-ok="submitFormDataEvent"
      v-if="initData.columns"
    >
      <div v-if="formDataInfo.master">
        <Form
          ref="formDataInfo"
          :show-message="true"
          :model="formDataInfo.master"
          :rules="ruleValidate"
          :label-width="124"
        >
          <div class="edit-accReceSlave">
              <Row>
                  <Col span="5" >
                    <FormItem label="单据号" prop="billNo">
                        <Input v-model="formDataInfo.master.billNo" maxlength="20" placeholder="单据号"></Input>
                    </FormItem>
                  </Col>
                  <Col span="1">
                    <FormItem label>
                      <Button type="primary" @click="clickmaster()">搜索</Button>
                    </FormItem>
                  </Col>
              </Row>
          </div>
        </Form>

        <Tabs>
          <!--  注意:eTable formDataInfo.wareHouseItems.defaultList  ===wareHouseItems=== 需要根据实际接口修改,其它不变-->
          <TabPane>
            <eTable
              ref="slave_edit-accRece"
              :height="400"
              unqiue-mark="id"
              :index-menu="true"
              :col-start="0"
              :width="200"
              :row-init-data="initData.initData.accreceitemboxFm"
              :data.sync="productMDatasTableDataList"
              :rules="tableFieldsValidator"
              :showContextMenu="!detailDisabled"
            >
              <template slot="head">
                <tr
                  v-for="(columnGroup,index) in initData.columns.accreceitemboxFm.editGroups"
                  :key="index"
                >
                  <th
                    class="ivu-table-column-left"
                    v-for="(column,index2) in columnGroup"
                    :key="index2"
                    :width="column.width"
                    :colspan="column.colSpan"
                    :rowspan="column.rowSpan"
                    style="text-align:center;"
                  >
                    <!-- workNo     工单 mateWorkNo 用料单号  boxUseBatchOn 批次 -->
                    <!-- <div
                      v-if="column.key == 'workNo'"
                      @click="purPaperPoClick('工单号','workNo')"
                      class="ivu-table-cell"
                    >
                      <span class>工单号</span>
                    </div> -->
                 
                    <div class="ivu-table-cell">
                      <span class>{{column.title}}</span>
                    </div>
                  </th>
                </tr>
              </template>
              <template slot="body" slot-scope="{ row, index, valueChangeAssign }">
                <td
                  class="ivu-table-column-left"
                  v-for="(column,columnIndex) in initData.columns.accreceitemboxFm.editColumns"
                  :key="columnIndex"
                  :width="column.width"
                >
                  <formControl
                    :control-type="column.controlType"
                    v-model="row[column.key]"
                    :disabled="column.readOnly"
                    @input="value => {valueChangeAssign(value, index, row,column.key)}"
                  ></formControl>
                </td>
              </template>
            </eTable>
          </TabPane>
        </Tabs>
        <!-- <productSpec
          v-model="productSpecShow"
          ref="productSpec"
          

          :bpMoCut="formDataInfo.master.bpMoCut"
        ></productSpec>-->
      </div>
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
 * @author ming xing
 *
 * @created 2020/04/13 17:07:54
 */
import tableSelect from "@/components/table-select/table-select";
import editWindow from "@/components/edit-window/edit-window";
// import Form from '@/components/form/form'
import eTable from "@/components/e-table/e-table";
import request from "@/libs/request";
import popup from "@/components/popup/popup";
import editBaseMixins from "../../mixins/edit";
import InputNumber from "@/components/input-number";
import formControl from "@/components/form-control/form-control";
import { customValidator } from "@/libs/validator";
import calc from "@/libs/calc";
import list from "../../mixins/list";
import dayjs from "dayjs";
export default {
  name: "edit-accReceSlave",
  mixins: [editBaseMixins],
  components: {
    editWindow,
    popup,
    tableSelect,
    eTable,
    InputNumber,
    formControl
  },

  created() {
    ////debugger
    // console.log(this.List)
  },
  props: {
    inWhId: {
      type: String,
      default: "0"
    },
    workNoList: {
      type: String,
      default: ""
    },
    WorkOrderNumber1: {
      type: String,
      default: "null"
    }
  },
  data() {
    return {
      //actionSubtitle: "纸箱销售订单明细", // 当前操作副标
      productSpecShow: false,
      formDataInfo: {
        // 主表 更改字段
        master: {},
        productMDatas: {
          boxUseBatchOn: "", //批次号
          mateWorkNo: "", //用料号单
          workNo: "", //工单号
          bpName: "", //产品名称
          stationLinkId: "", //仓位id
          stationLinkName: "", //仓位名称
          paiOrderQty: "", //工单数
          paiStoreQty: "", //库存数
          artId: "", //纸质id
          artCode: "", //纸质
          lbCode: "", //楞别
          sizeLeng: "", //纸长
          sizeWidth: "" //纸宽
        }
        // List:thsi.list
      }, // 防止添加和更新数据提交发生冲突
      // 需要验证的数据
      ruleValidate: {},
      tableFieldsValidator: {},
      WorkOrderNumber: {
        
      },
      title: "工单号",
      formName: "accreceitemboxFm",
      propvalue: "workNo", //存储子表每个对应的字段
      productMDatasTableDataList: [], //存放处理过后的数据:[],
      table: [], //存储子表全部对应的字段
      inWorkNo: "",
      inMateWorkNo: "",
      inBatchOn : ""
     //workNo 工单号,mateWorkNo 用料单号,inBatchOn 批次号)
     //inWorkNo     工单  inMateWorkNo 用料单号  inBatchOn 批次
    // workNo     工单 mateWorkNo 用料单号  boxUseBatchOn 批次
    };
  },
  computed: {},
  methods: {
    //判断一个值是数字
    myIsNaN(value){
      return typeof value === 'number' && !isNaN(value)
    },
    isOnlyNumber(e){
      //debugger
      let value = Number(e.target.value)
      let flag = this.myIsNaN(value)
      if(!flag){
        this.$Message.error("请输入正数")
        e.target.value = 0
      }     
    },
    purPaperPoClick(name, value) {
      //debugger
      this.title = name;
      this.propvalue = value;
    },
    //搜索点击事件
    clickmaster() {
      //debugger
       // arpType(月结类型:1:送退货主档,0:送退货明细),custId(客户id),startDate(起始日期),endDate(终止日期),signBack(需回签)
      let ddata = this.formDataInfo;
      let params = {
            // arpType:1, 
            // custId:'',
            // startDate: '',
            // endDate:"",
            // signBack: "",
            billNo: this.formDataInfo.master.billNo
      };
      request.post(`account/accRece/spAutoAccRece`, params).then(res => {
        this.$refs["slave_edit-accRece"].cloneData = res;
      });
    },

    //加载表单初始化数据
    getFormInitDataObj(data) {
      //debugger
      //加载表单初始化数据
      this.formDataInfo["master"] = {
        // inBiWorkNo: "",
        
      };
      if (data == null) {
        return;
      }         
      this.$refs["slave_edit-accRece"].cloneData = data;
    },

    //表单数据提交事件
    submitFormDataEvent() {
      //debugger
      //表单数据提交事件
      // true就是有问题
      let result = this.$refs["slave_edit-accRece"].validate();
      if (result) {
        return;
      }
      let parms = [];
      let submitDataObj = this.$refs["slave_edit-accRece"].cloneData;
      for (let index = 0; index < submitDataObj.length; index++) {
        let Choice = this.$refs["slave_edit-accRece"].cloneData[index]
          .iisChose;
        if (Choice === true) {
          parms.push(submitDataObj[index]);
        }
      }
      //提交数据
      // 向外暴露的方法:
      this.$emit("closeMain", parms);
      this.showWindow = false; // 关闭当前窗口
      // });
    }
  }
};
</script>
<style >
.ivu-form-item-text2 .ivu-form-item-content {
  margin-left: 2.8125rem !important;
}
</style>
