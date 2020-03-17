<template>
  <div>
    <editWindow
      id="cl-edit-salesOrder"
      :title="actionLableName"
      v-model="showWindow"
      :fullscreen="false"
      width="90%"
      :loading="!isLoaddingDone"
      :spinLoaddingText="spinLoaddingText"
      @on-ok="submitFormDataEvent"
    >
      <div v-if="formDataInfo.master">
        <Form
          ref="masterForm"
          :show-message="true"
          :model="formDataInfo.master"
          :rules="ruleValidate"
          :label-width="124"
        >
          <div class="edit-purPaperPoSlave">
            <Row>
              <Col span="5" >
                <FormItem :label="title" prop="propvalue">
                  <Input v-model="formDataInfo.master.propvalue" maxlength="20" :placeholder="title"></Input>
                </FormItem>
              </Col>
              <!-- <Col span="4" style="margin-left:-5%">
                <FormItem label="" prop="inCusName" >
                  <Input v-model="formDataInfo.master.inCusName" maxlength="20" placeholder="请输入客户名称"></Input>
                </FormItem>
              </Col> -->
              <Col span="5" style="margin-left:-50px">
                <FormItem label >
                  <RadioGroup v-model="formDataInfo.master.flag">
                    <Radio label="0">模糊</Radio>
                    <Radio label="1">精准</Radio>
                  </RadioGroup>
                </FormItem>
              </Col>
              <Col span="8">
                <Row>
                  <Col span="12" style="width: 60%;">
                    <FormItem label="订单日期" style="margin-left:-5%;">
                      <DatePicker
                        type="date"
                        format="yyyy-MM-dd"
                        v-model="formDataInfo.master.beginDate"
                      ></DatePicker>
                    </FormItem>
                  </Col>
                  <Col span="12" style="width: 40%;">
                    <FormItem label="--" style="margin-left:-60%;">
                      <DatePicker
                        type="date"
                        format="yyyy-MM-dd"
                        v-model="formDataInfo.master.endDate"
                      ></DatePicker>
                    </FormItem>
                  </Col>
                </Row>
              </Col>

              <Col span="4">
                <FormItem label style="margin-left: -50%;">
                  <Checkbox v-model="formDataInfo.master.ifAreaPrice" :disabled='isCalAreaPricePur'>含未报价纸质</Checkbox>
                </FormItem>
              </Col>

              <Col span="1">
                <FormItem label style="margin-left: -80%;">
                  <Button type="primary" @click="clickmaster()">搜索</Button>
                </FormItem>
              </Col>
            </Row>
          </div>
        </Form>

        <Tabs>
          <!--  注意:eTable formDataInfo.wareHouseItems.defaultList  ===wareHouseItems=== 需要根据实际接口修改,其它不变-->
          <TabPane>
            <eTable ref="slave_edit-purPaperPo"
              :height="400"
              :index-menu="true"
              :col-start="0"
              :width="200"
              :row-init-data="WorkOrderNumber"
              :data.sync="productMDatasTableDataList"
              :rules="tableFieldsValidator"
            >
              <template slot="head">
                <tr>
                  <th class="ivu-table-column-center" width="35">
                    <div class="ivu-table-cell">
                      <span class>选择</span>
                    </div>
                  </th>
                  <th class="ivu-table-column-center" width="35">
                    <div class="ivu-table-cell">
                      <span class>急单</span>
                    </div>
                  </th>
                  <th class="ivu-table-column-center" width="70">
                    <div class="ivu-table-cell">
                      <span class @click="purPaperPoClick('工单号',1,'ppoGroupNo')">工单号</span>
                    </div>
                  </th>
                  <th class="ivu-table-column-center" width="70">
                    <div class="ivu-table-cell">
                      <span class @click="purPaperPoClick('客户编号',2,'custCode')">客户编号</span>
                    </div>
                  </th>
                  <th class="ivu-table-column-center" width="70">
                    <div class="ivu-table-cell">
                      <span class @click="purPaperPoClick('客户简称',3,'custName')">客户简称</span>
                    </div>
                  </th>
                  <th class="ivu-table-column-center" width="70">
                    <div class="ivu-table-cell">
                      <span class>客方PO号</span>
                    </div>
                  </th>
                  <th class="ivu-table-column-center" width="50">
                    <div class="ivu-table-cell">
                      <span class >纸质</span>
                    </div>
                  </th>
                  <th class="ivu-table-column-center" width="70">
                    <div class="ivu-table-cell">
                      <span class>供应商纸质</span>
                    </div>
                  </th>
                  <th class="ivu-table-column-center" width="50">
                    <div class="ivu-table-cell">
                      <span class >楞别</span>
                    </div>
                  </th>
                  <th class="ivu-table-column-center" width="50">
                    <div class="ivu-table-cell">
                      <span class >报价</span>
                    </div>
                  </th>
                  <th class="ivu-table-column-center" width="80">
                    <div class="ivu-table-cell">
                      <span class >纸板规格宽</span>
                    </div>
                  </th>
                  <th class="ivu-table-column-center" width="70">
                    <div class="ivu-table-cell">
                      <span class >纸板规格长</span>
                    </div>
                  </th>
                  <th class="ivu-table-column-center" width="60">
                    <div class="ivu-table-cell">
                      <span class>工单数</span>
                    </div>
                  </th>
                  <th class="ivu-table-column-center" width="60">
                    <div class="ivu-table-cell">
                      <span class >用料数量</span>
                    </div>
                  </th>
                  <th class="ivu-table-column-center" width="60">
                    <div class="ivu-table-cell">
                      <span class >需购数</span>
                    </div>
                  </th>
                  <th class="ivu-table-column-center" width="70">
                    <div class="ivu-table-cell">
                      <span class>已采购数</span>
                    </div>
                  </th>
                  <th class="ivu-table-column-center" width="70">
                    <div class="ivu-table-cell">
                      <span class>扣存料数</span>
                    </div>
                  </th>
                  <th class="ivu-table-column-center" width="50">
                    <div class="ivu-table-cell">
                      <span class >备注</span>
                    </div>
                  </th>
                  <th class="ivu-table-column-center" width="50">
                    <div class="ivu-table-cell">
                      <span class>压线</span>
                    </div>
                  </th>
                  <th class="ivu-table-column-center" width="70">
                    <div class="ivu-table-cell">
                      <span class>压线类型</span>
                    </div>
                  </th>
                  <th class="ivu-table-column-center" width="70">
                    <div class="ivu-table-cell">
                      <span class>压线深度</span>
                    </div>
                  </th>
                  <th class="ivu-table-column-center" width="120">
                    <div class="ivu-table-cell">
                      <span class>纸箱信息产品编号</span>
                    </div>
                  </th>
                  <th class="ivu-table-column-center" width="120">
                    <div class="ivu-table-cell">
                      <span class>纸箱信息产品名称</span>
                    </div>
                  </th>
                  <th class="ivu-table-column-center" width="100">
                    <div class="ivu-table-cell">
                      <span class>交货日期</span>
                    </div>
                  </th>
                  <th class="ivu-table-column-center" width="70">
                    <div class="ivu-table-cell">
                      <span class>纸板备注</span>
                    </div>
                  </th>
                </tr>
              </template>
              <template slot="body" slot-scope="{ row, index, valueChangeAssign }">
                <!-- 选择 -->
                <td class="ivu-table-column-center" width="100">
                  <Checkbox
                    size="default"
                    v-model="row.Choice"
                    @input="
                      value => {
                        valueChangeAssign(value, index, row, 'Choice');
                      }
                    "
                  ></Checkbox>
                </td>
                <!-- 急单 -->
                <td class="ivu-table-column-center" width="100">
                   <Checkbox
                    size="default"
                    v-model="row.iisUrgent"
                    @input="
                      value => {
                        valueChangeAssign(value, index, row, 'iisUrgent');
                      }
                    "
                  ></Checkbox>
                </td>
                <!-- 工单号 -->
                <td class="ivu-table-column-left" width="100">
                  <Input
                    v-model="row.ppoGroupNo"
                    @input="
                        value => {
                          valueChangeAssign(value, index, row, 'ppoGroupNo');
                        }
                      "
                    size="small"
                    :maxlength="20"
                  ></Input>
                </td>
                <!-- 客户编号 -->
                <td class="ivu-table-column-left" width="100">
                  <Input
                    v-model="row.custCode"
                    disabled
                    @input="
                        value => {
                          valueChangeAssign(value, index, row, 'custCode');
                        }
                      "
                    size="small"
                    :maxlength="20"
                  ></Input>
                </td>
                <!-- 客户简称-->
                <td class="ivu-table-column-left" width="100">
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
                <!-- 客方PO号-->
                <td class="ivu-table-column-left" width="100">
                  <Input
                    disabled
                    v-model="row.custCO"
                    @input="
                      value => {
                          valueChangeAssign(value, index, row, 'custCO');
                      }
                      "
                    size="small"
                    :maxlength="20"
                  ></Input>
                </td>
                <!-- 纸质	 -->
                <td class="ivu-table-column-left" width="100">
                  <Input
                    disabled
                    v-model="row.artCode"
                    disabled
                    @input="
                        value => {
                          valueChangeAssign(value, index, row, 'artCode');
                        }
                      "
                    size="small"
                    :maxlength="20"
                  ></Input>
                </td>
                <!-- 供应商纸质	 -->
                <td class="ivu-table-column-left" width="100">
                  <Input
                    disabled
                    v-model="row.ppoArtName"
                    disabled
                    @input="
                        value => {
                          valueChangeAssign(value, index, row, 'ppoArtName');
                        }
                      "
                    size="small"
                    :maxlength="20"
                  ></Input>
                </td>
                <!-- 楞别		 -->
                <td class="ivu-table-column-left" width="100">
                  <Input
                    disabled
                    v-model="row.artLb"
                    @input="
                        value => {
                          valueChangeAssign(value, index, row, 'artLb');
                        }
                      "
                    size="small"
                    :maxlength="20"
                  ></Input>
                </td>
                <!-- 报价	 -->
                <td class="ivu-table-column-left" width="100">
                  <Input
                    disabled
                    v-model="row.popoArtPrice"
                    @input="
                        value => {
                          valueChangeAssign(value, index, row, 'popoArtPrice');
                        }
                      "
                    size="small"
                    :maxlength="20"
                  ></Input>
                </td>
                <!-- 纸板规格宽	 -->
                <td class="ivu-table-column-left" width="100">
                  <Input
                    disabled
                    v-model="row.bmSizeW"
                    @input="
                        value => {
                          valueChangeAssign(value, index, row, 'bmSizeW');
                        }
                      "
                    size="small"
                    :maxlength="20"
                  ></Input>
                </td>
                <!-- 纸板规格长	 -->
                <td class="ivu-table-column-left" width="100">
                  <Input
                    disabled
                    v-model="row.bmSizeL"
                    @input="
                      value => {
                          valueChangeAssign(value, index, row, 'bmSizeL');
                      }
                      "
                    size="small"
                    :maxlength="20"
                  ></Input>
                </td>
                <!-- 工单数 -->
                <td class="ivu-table-column-left" width="100">
                  <Input
                    disabled
                    v-model="row.bpProQty"
                    @input="
                      value => {
                          valueChangeAssign(value, index, row, 'bpProQty');
                      }
                      "
                    size="small"
                    :maxlength="20"
                  ></Input>
                </td>
                <!-- 用料数量 -->
                <td class="ivu-table-column-left" width="100">
                  <Input
                    disabled
                    v-model="row.bmQty"
                    @input="
                      value => {
                          valueChangeAssign(value, index, row, 'bmQty');
                      }
                      "
                    size="small"
                    :maxlength="20"
                  ></Input>
                </td>
                <!-- 需购数 -->
                <td class="ivu-table-column-left" width="100">
                  <Input
                    v-model="row.bmNeedQty"
                    @input="
                      value => {
                          valueChangeAssign(value, index, row, 'bmNeedQty');
                      }
                      "
                    size="small"
                    :maxlength="20"
                  ></Input>
                </td>
                <!-- 已采购数	 -->
                <td class="ivu-table-column-left" width="100">
                  <Input
                    disabled
                    v-model="row.bmStockQty"
                    @input="
                      value => {
                          valueChangeAssign(value, index, row, 'bmStockQty');
                      }
                      "
                    size="small"
                    :maxlength="20"
                  ></Input>
                </td>
                <!-- 扣存料数-->
                <td class="ivu-table-column-left" width="100">
                  <Input
                    disabled
                    v-model="row.bmUseStoreNum"
                    @input="
                      value => {
                          valueChangeAssign(value, index, row, 'bmUseStoreNum');
                      }
                      "
                    size="small"
                    :maxlength="20"
                  ></Input>
                </td>
                <!-- 备注	-->
                <td class="ivu-table-column-left" width="100">
                  <Input
                    disabled
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
                <!-- 压线	-->
                <td class="ivu-table-column-left" width="100">
                  <Input
                    disabled
                    v-model="row.bmScoreStr"
                    @input="
                      value => {
                          valueChangeAssign(value, index, row, 'bmScoreStr');
                      }
                      "
                    size="small"
                    :maxlength="20"
                  ></Input>
                </td>
                <!-- 压线类型	-->
                <td class="ivu-table-column-left" width="100">
                  <Input
                    v-model="row.bmScoreType"
                    @input="
                      value => {
                          valueChangeAssign(value, index, row, 'bmScoreType');
                      }
                      "
                    size="small"
                    :maxlength="20"
                  ></Input>
                </td>
                <!-- 压线深度	-->
                <td class="ivu-table-column-left" width="100">
                  <Input
                    v-model="row.bmScoreDepth"
                    @input="
                      value => {
                          valueChangeAssign(value, index, row, 'bmScoreDepth');
                      }
                      "
                    size="small"
                    :maxlength="20"
                  ></Input>
                </td>
                <!-- 纸箱信息产品编号	-->
                <td class="ivu-table-column-left" width="100">
                  <Input  
                    disabled
                    v-model="row.biProdNo"
                    @input="
                      value => {
                          valueChangeAssign(value, index, row, 'biProdNo');
                      }
                      "
                    size="small"
                    :maxlength="20"
                  ></Input>
                </td>
                <!-- 纸箱信息产品名称		-->
                <td class="ivu-table-column-left" width="100">
                  <Input
                    disabled
                    v-model="row.biProdName"
                    @input="
                      value => {
                          valueChangeAssign(value, index, row, 'biProdName');
                      }
                      "
                    size="small"
                    :maxlength="20"
                  ></Input>
                </td>
                <!-- 交货日期	-->
                <td class="ivu-table-column-left" width="100">
                  <Input
                    disabled
                    v-model="row.biDeDate"
                    @input="
                      value => {
                          valueChangeAssign(value, index, row, 'biDeDate');
                      }
                      "
                    size="small"
                    :maxlength="20"
                  ></Input>
                </td>
                <!-- 纸板备注	-->
                <td class="ivu-table-column-left" width="100">
                  <Input
                    disabled
                    v-model="row.bmremark"
                    @input="
                      value => {
                          valueChangeAssign(value, index, row, 'bmremark');
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
        <!-- <productSpec
          v-model="productSpecShow"
          ref="productSpec"
          

          :bpMoCut="formDataInfo.master.bpMoCut"
        ></productSpec> -->
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
 * @author Andy Huang
 *
 * @created 2019/11/20 17:07:54
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
import list from '../../mixins/list';
import dayjs from "dayjs";
export default {
  name: "edit-purPaperPoSlave",
  mixins: [editBaseMixins],
  components: {
    editWindow,
    popup,
    tableSelect,
    eTable,
    InputNumber,
    formControl,
  },
   

  created() {
    //debugger
    // console.log(this.List)
  },
   props:{ 
      List:{
        type: String,
        default: '0'  
      },
      WorkOrderNumber1:{
        type: Object,
        defaule:'null'
      }
    },
  data() {
    return {
      isCalAreaPricePur:true,
      //actionSubtitle: "纸箱销售订单明细", // 当前操作副标
      productSpecShow: false,
      formDataInfo: {
        // 主表 更改字段
        master: {},
        productMDatas: {
          Choice:false,
          iisUrgent: true,
          custCode: "",
          custName: "",
          custCO: "",
          artId: "",
          artLb: "",
          ppoArtId: "",
          ppoArtName: "",
          bmSizeL: 0,
          bmSizeW: 0,
          bpProQty: "",
          bmQty: "",
          bmNeedQty: "",
          bmremark: "",
          bmStockQty: "",
          bmScoreStr: "",
          bmScoreType: "",
          bmScoreDepth: "",
          biProdNo: "",
          biProdName: "",
          remark: "",
          bmDeDate: "",
          biDeDate:"",
          bmUseStoreNum: "",
          bmPSizeW: "",
          popoArtPrice:"",//   报价
          ppoPrice:"",//  单价
          ppoMoney:"",//  金额
          ppoPrepQty:"",//  备品数
          ppoSarea:"",//   单面积
          ppoArea:"",//   面积
          biBatchNo:"",//   料号
          ppoInQty:"",//   入库数量
          ppoRqty: "",//  退货数
          iisClose:""//完结
        },
        // List:thsi.list
      }, // 防止添加和更新数据提交发生冲突
      // 需要验证的数据
      ruleValidate: {},
      tableFieldsValidator: {

       },
      WorkOrderNumber: {
          ppoGroupNo:'',
          custCode: "",
          custName: "",
          custCO: "",
          artCode:"",
          ppoArtName: "",
          artLb: "",
          popoArtPrice:"",//   报价
          bmSizeW: 0,
          bmSizeL: 0,
          bpProQty: "",
          bmQty: "",
          bmNeedQty: "",
          bmStockQty: "",
          bmUseStoreNum: "",
          remark: 0,
          bmScoreStr: "",
          bmScoreType: "",
          bmScoreDepth: "",
          biProdNo: "",
          biProdName: '',
          biDeDate:'',
          bmremark: "",
          Choice:false,
          iisUrgent: true,
          artId: "",
          ppoArtId: "",
          bmDeDate: '',
          bmPSizeW: "",
          ppoPrice:"",//  单价
          ppoMoney:"",//  金额
          ppoPrepQty:"",//  备品数
          ppoSarea:"",//   单面积
          ppoArea:"",//   面积
          ppoInQty:"",//   入库数量
          ppoRqty: "",//  退货数
          iisClose:""//完结
      },
      productMDatasTableDataList: [], //存放处理过后的数据:[],
      timeoutId: 0,
      requestCount: 0,
      table:[], //存储子表全部对应的字段
      title:'客户编号',
      propvalue:'custCode'//存储子表每个对应的字段
    };
  },
  computed: {
  },
  methods: {
    purPaperPoClick(name,index,value){
      //debugger
      this.title=name
      this.propvalue=value
    },
    //搜索点击事件
    clickmaster(){
      //debugger
      let ddata = this.formDataInfo
      if (!!ddata.master.beginDate) {
        ddata.master.beginDate = dayjs(ddata.master.beginDate).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      }
      if (!!ddata.master.endDate) {
        ddata.master.endDate = dayjs(ddata.master.endDate).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      }
      let suplierid = this.List
      let one = {
        beginDate:this.formDataInfo.master.beginDate,
        endDate:this.formDataInfo.master.endDate,
        vendId:suplierid,
        flag:this.formDataInfo.master.flag,
        ifAreaPrice:this.formDataInfo.master.ifAreaPrice,
        paramValue:this.formDataInfo.master.propvalue,
        workNo:"",
        inCusName:this.title,
        inCusCode:this.propvalue,
      }
      request.post(`/purchase/purPaperPo/spPaperMegerStockOrder1`,one).then(res=>{
        // this.WorkOrderNumber = res
        this.$refs['slave_edit-purPaperPo'].cloneData = res.workData
      })
    },

    //加载表单初始化数据
    getFormInitDataObj(data) {
       //debugger;
      //加载表单初始化数据
      this.formDataInfo["master"] = {
        inCusCode:"",
        propvalue:'', 
        inCusName:"",
        flag:"0",
        beginDate:dayjs().format("2000-11-30"),
        endDate:dayjs().format("YYYY-MM-DD"),
        ifAreaPrice:false,
      }
      this.$refs['slave_edit-purPaperPo'].cloneData=data.workData
      if (data.isCalAreaPricePur===true) {
        this.isCalAreaPricePur=false
      }
    },

    //表单数据提交事件
    submitFormDataEvent() {
      debugger;
      //表单数据提交事件
      // true就是有问题
      let result = this.$refs['slave_edit-purPaperPo'].validate();
        if (result) {
          return;
        }
        let parms = []
        let submitDataObj = this.$refs['slave_edit-purPaperPo'].cloneData
        for (let index = 0; index < submitDataObj.length; index++) {
          let Choice = this.$refs['slave_edit-purPaperPo'].cloneData[index].Choice
          if(Choice===true){
            parms.push(submitDataObj[index])
          }
            
        }
        //提交数据
        // 向外暴露的方法:
          this.$emit('closeMain',parms)
          this.showWindow = false // 关闭当前窗口
      // });
    }
  },
  // created() {
  //   this.getFormInitDataObj(); //获取初始化数据

  // }
  // updated() {
  //   if (this.$refs.masterForm) {
  //     let height = document.body.offsetHeight;
  //     this.tableDefaultHeight =
  //       height - (this.$refs.masterForm.$el.offsetHeight + 60 + 50 + 40);
  //   }
  // }
};
</script>
<style >
.ivu-form-item-text2 .ivu-form-item-content {
  margin-left: 2.8125rem !important;
}
</style>
