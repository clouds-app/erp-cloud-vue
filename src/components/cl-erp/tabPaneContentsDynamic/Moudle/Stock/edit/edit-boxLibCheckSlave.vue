<template>
  <div>
    <editWindow
     :draggable="false"
      :zindex="30"
      id="cl-edit-boxLibCheck"
      :title="actionLableName"
      v-model="showWindow"
      :fullscreen="false"
      width="93%"
      :loading="!isLoaddingDone"
      :spinLoaddingText="spinLoaddingText"
      @on-ok="submitFormDataEvent"
      v-if="initData.columns"
       ref="editWindow"
       :showPageConfig="true"
       @pageOnChange="pageOnChange"
    >
      <div v-if="formDataInfo.master">
        <Form
          ref="formDataInfo"
          :show-message="true"
          :model="formDataInfo.master"
          :rules="ruleValidate"
          :label-width="124"
        >
          <div class="edit-boxLibCheckSlave">
              <Row>
                  <Col span="5" >
                    <FormItem label="工单号" prop="inBcNo">
                        <Input v-model="formDataInfo.master.inBcNo" maxlength="20" placeholder="工单号"></Input>
                    </FormItem>
                  </Col>
                  <Col span="5" >
                    <FormItem label="料号" prop="inBatchNo">
                        <Input v-model="formDataInfo.master.inBatchNo" maxlength="20" placeholder="料号"></Input>
                    </FormItem>
                  </Col>
                  <Col span="5" >
                    <FormItem label="PO号" prop="inCustPo">
                        <Input v-model="formDataInfo.master.inCustPo" maxlength="20" placeholder="PO号"></Input>
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label>
                        <Checkbox v-model="formDataInfo.master.inLastData">无库存同一产品多工单只显示最近一条</Checkbox>
                    </FormItem>
                  </Col> 
              </Row>
            <Row>
              <!-- <Col span="9">
                <FormItem :label="title" prop="inBiWorkNo">
                  <Input
                    v-model="formDataInfo.master.inBiWorkNo"
                    maxlength="20"
                    :placeholder="title"
                  ></Input>
                </FormItem>
              </Col> -->
              <Col span="5" >
                    <FormItem label="客户编号" prop="inCustCode">
                        <Input v-model="formDataInfo.master.inCustCode" maxlength="20" placeholder="客户编号"></Input>
                    </FormItem>
              </Col>
              <Col span="5" >
                    <FormItem label="产品编号" prop="inBpNo">
                        <Input v-model="formDataInfo.master.inBpNo" maxlength="20" placeholder="产品编号"></Input>
                    </FormItem>
              </Col>
              <Col span="5" >
                    <FormItem label="规格(L*W*H)">
                        <Row>
                            <Col span="8" >
                             <Input v-model="formDataInfo.master.inL" maxlength="20" @keyup.native="isOnlyNumber($event)"></Input>
                             </Col>
                             <Col span="8" >
                            <Input v-model="formDataInfo.master.inW" maxlength="20" @keyup.native="isOnlyNumber($event)"></Input>
                            </Col>
                            <Col span="8" >
                            <Input v-model="formDataInfo.master.inH" maxlength="20" @keyup.native="isOnlyNumber($event)"></Input>
                            </Col>
                        </Row>
                       
                    </FormItem>
              </Col>
              <Col span="1">
                <FormItem label>
                  <Button type="primary" @click="clickmaster('search')">搜索</Button>
                </FormItem>
              </Col>
            </Row>
          </div>
        </Form>

        <Tabs>
          <!--  注意:eTable formDataInfo.wareHouseItems.defaultList  ===wareHouseItems=== 需要根据实际接口修改,其它不变-->
          <TabPane>
            <eTable
              ref="slave_edit-boxLibCheck"
              :height="400"
              unqiue-mark="id"
              :index-menu="true"
              :col-start="0"
              :width="200"
              :row-init-data="initData.initData.BoxLibCheckWorkDtoFm"
              :data.sync="productMDatasTableDataList"
              :rules="tableFieldsValidator"
              :showContextMenu="false"
            >
              <template slot="head">
                <tr
                  v-for="(columnGroup,index) in initData.columns.BoxLibCheckWorkDtoFm.editGroups"
                  :key="index"
                >
                  <th
                    :class="`ivu-table-column-${column.titleAlign}`"
                    v-for="(column,index2) in columnGroup"
                    :key="index2"
                    :width="column.width"
                    :colspan="column.colSpan"
                    :rowspan="column.rowSpan"
                    style="text-align:center;"
                  >
                    <!-- workNo     工单 mateWorkNo 用料单号  boxUseBatchOn 批次 -->
                    <div
                      v-if="column.key == 'workNo'"
                      @click="purPaperPoClick('工单号','workNo')"
                      class="ivu-table-cell"
                    >
                      <span class>工单号</span>
                    </div>
                 
                    <div v-else class="ivu-table-cell">
                      <span class>{{column.title}}</span>
                    </div>
                  </th>
                </tr>
              </template>
              <template slot="body" slot-scope="{ row, index, valueChangeAssign }">
                <td
                  :class="`ivu-table-column-${column.align}`"
                  v-for="(column,columnIndex) in initData.columns.BoxLibCheckWorkDtoFm.editColumns"
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
  name: "edit-boxLibCheckSlave",
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
      actionSubtitle: '纸箱库存盘点工单弹框', // 当前操作副标题
      productSpecShow: false,
      formDataInfo: {
        // 主表 更改字段
        master: {},
        // productMDatas: {
        //   boxUseBatchOn: "", //批次号
        //   mateWorkNo: "", //用料号单
        //   workNo: "", //工单号
        //   bpName: "", //产品名称
        //   stationLinkId: "", //仓位id
        //   stationLinkName: "", //仓位名称
        //   paiOrderQty: "", //工单数
        //   paiStoreQty: "", //库存数
        //   artId: "", //纸质id
        //   artCode: "", //纸质
        //   lbCode: "", //楞别
        //   sizeLeng: "", //纸长
        //   sizeWidth: "" //纸宽
        // }
        // List:thsi.list
      }, // 防止添加和更新数据提交发生冲突
      // 需要验证的数据
      ruleValidate: {},
      tableFieldsValidator: {},
      // WorkOrderNumber: {
      //   boxUseBatchOn: "", //批次号
      //   mateWorkNo: "", //用料号单
      //   workNo: "", //工单号
      //   bpName: "", //产品名称
      //   stationLinkId: "", //仓位id
      //   stationLinkName: "", //仓位名称
      //   paiOrderQty: "", //工单数
      //   paiStoreQty: "", //库存数
      //   artId: "", //纸质id
      //   artCode: "", //纸质
      //   lbCode: "", //楞别
      //   sizeLeng: "", //纸长
      //   sizeWidth: "" //纸宽
      // },
      title: "工单号",
      formName: "BoxLibCheckWorkDtoFm",
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
    pageOnChange(_pageNum){
      this.pageConfig.pageNum = _pageNum
      this.clickmaster()
    },
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
     clickmaster (type) {
      if(this.pageConfig.pageNum==1 || type=='search'){
          this.resetPageConfig()
          this.productMDatasTableDataList = []
      }
      let ddata = this.formDataInfo;
      let params = {
        // flag:this.formDataInfo.master.flag,
        inBcNo: ddata.master.inBcNo,                  //工单号
        inBatchNo: ddata.master.inBatchNo,             //料号
        // flag: ddata.master.likeFlag,
        inWhId: this.inWhId,
        inCustPo: ddata.master.inCustPo,                    //客户Po
        inLastData: ddata.master.inLastData,           //无库存同一产品
        inBpNo: ddata.master.inBpNo,                        //产品编号
        inCustCode: ddata.master.inCustCode,                        //客户编号
        inL: ddata.master.inL,                        //长
        inW: ddata.master.inW,                        //
        inH: ddata.master.inH,                        //
        workNoList: this.workNoList,
        pageNum:this.pageConfig.pageNum,//(当前页),
        pageSize:this.pageConfig.pageSize,//(每页显示条数)
      };
      request.post(`/stock/boxLibCheck/getWorkInStore`, params).then(res => {
       if (res && res.records && res.records.length>0) {
           for(let i=0;i<res.records.length;i++){
              res.records[i].biChkQty = res.records[i].biQty //实盘数量默认赋值
            }
            this.productMDatasTableDataList.push(...res.records)
        }
         this.pageConfig.total = res.total // 赋值总条数
         this.$refs['editWindow'].pageConfig= this.pageConfig
       // this.$refs["slave_edit-boxLibCheck"].cloneData = res;
      });
    },

    //加载表单初始化数据
    getFormInitDataObj(data) {
      //debugger
      //加载表单初始化数据
      this.formDataInfo["master"] = {
        inBiWorkNo: "",
        inL: 0,                        //长
        inW: 0,                        //
        inH: 0, 
      };
      if (data == null) {
        return;
      }
    
      this.productMDatasTableDataList = []
      if(data && data.records){
        for(let i=0;i<data.records.length;i++){
            data.records[i].biChkQty = data.records[i].biQty //实盘数量默认赋值
        }  
        this.productMDatasTableDataList = data.records
        this.pageConfig.total = data.total // 赋值总条数
        this.$refs['editWindow'].pageConfig= this.pageConfig
      }        
      //this.$refs["slave_edit-boxLibCheck"].cloneData = data;
    },
    closeActionTigger () {
      this.resetPageConfig()
      this.productMDatasTableDataList = []
    },
    //表单数据提交事件
    submitFormDataEvent() {
      //debugger
      //表单数据提交事件
      // true就是有问题
      let result = this.$refs["slave_edit-boxLibCheck"].validate();
      if (result) {
        return;
      }
      let parms = [];
      let submitDataObj = this.$refs["slave_edit-boxLibCheck"].cloneData;
      for (let index = 0; index < submitDataObj.length; index++) {
        let Choice = this.$refs["slave_edit-boxLibCheck"].cloneData[index]
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
