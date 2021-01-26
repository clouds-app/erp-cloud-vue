<template>
  <div>
    <editWindow
      ref="editWindow"
      :draggable="false"
      :zindex="30"
      id="cl-edit-salesOrder"
      title="纸板入库选工单"
      v-model="showWindow"
      :fullscreen="true"
      width="90%"
      :loading="!isLoaddingDone "
      :loaddingBtn="getDataLoadding"
      :spinLoaddingText="spinLoaddingText"
      @on-ok="submitFormDataEvent"
      :showPageConfig="true"
      @pageOnChange="pageOnChange"
    >
      <div v-if="showWindow">
        <Form
          ref="masterForm"
          :show-message="true"
          :model="formDataInfo.master"
          :rules="ruleValidate"
          :label-width="80"
        >
          <div class="edit-purPaperPoSlave">
            <Row>
              <Col span="4">
                <FormItem :label="title" prop="multiValue">
                  <Input
                    v-model="multiValue"
                    maxlength="20"
                    :placeholder="title"
                  ></Input>
                </FormItem>
              </Col>
              <Col span="4">
                <FormItem label="采购单号">
                  <Input
                    v-model="ppoNOValue"
                    maxlength="20"
                    placeholder="采购单号"
                  ></Input>
                </FormItem>
              </Col>
              <Col span="3">
                <FormItem label :label-width="20">
                  <RadioGroup v-model="formDataInfo.master.flag">
                    <Radio label="0">模糊</Radio>
                    <Radio label="1">精准</Radio>
                  </RadioGroup>
                </FormItem>
              </Col>
              <Col span="7">
                <Row>
                  <Col span="14">
                    <FormItem label="采购日期">
                      <DatePicker
                        type="date"
                        format="yyyy-MM-dd"
                        v-model="formDataInfo.master.beginDate"
                      ></DatePicker>
                    </FormItem>
                  </Col>
                  <Col span="10">
                    <FormItem label="--" :label-width="40">
                      <DatePicker
                        type="date"
                        format="yyyy-MM-dd"
                        v-model="formDataInfo.master.endDate"
                      ></DatePicker>
                    </FormItem>
                  </Col>
                </Row>
              </Col>
              <Col span="2" :label-width="40">
                <FormItem label>
                  <Button type="primary" @click="clickmaster('search')"
                    >搜索</Button
                  >
                </FormItem>
              </Col>
            </Row>
          </div>
        </Form>

        <Tabs>
          <!--  注意:eTable formDataInfo.wareHouseItems.defaultList  ===wareHouseItems=== 需要根据实际接口修改,其它不变-->
          <TabPane label="纸板入库明细">
            <eTable
              ref="firstTableRef"
              :height="340"
              :index-menu="true"
              :col-start="0"
              :width="200"
              :data.sync="firstTableData"
              :rules="tableFieldsValidator"
              @row-click="slave_list_table_editRowClick"
              @tableColTiggerEventCall="firstTableColTiggerEventCall"
              :showContextMenu="false"
            >
              <template slot="head">
                <tr
                  v-for="(columnGroup, index) in columns[`paperjoinitemboxFm`]
                    .editGroups"
                  :key="index"
                >
                  <template v-for="(column, index2) in columnGroup">
                    <th
                      v-if="excludeFiled('Master', column.key)"
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
                  tableColTiggerEvent,
                  valueChangeAssign
                }"
              >
                <td
                  :class="`ivu-table-column-${column.align}`"
                  v-for="(column, subIndex) in columns[`paperjoinitemboxFm`]
                    .editColumns"
                  :key="subIndex"
                  :width="column.editWidth"
                >
                 <!-- 控件特殊处理 选择 -->
                <template v-if="column.key == 'iisChose'">
                  <Checkbox
                    @on-change="onChange_iisChose(index,row)"
                    @input="
                      value => {
                        valueChangeAssign(value, index, row, column.key);
                      }"
                    v-model="row[column.key]"
                    :disabled="column.readOnly"
                  ></Checkbox>
                </template>
                  <!-- 本次入库数-->
                    <template v-else-if="column.key === 'qty'">
                      <Input
                        v-model="row[column.key]"
                        @input="
                          tableColTiggerEvent(
                            row,
                            column,
                            index,
                            'qtyChangeEvent'
                          )
                        "
                      ></Input>
                    </template>
                   <template v-else>
                    <formControl
                      @input="
                        value => {
                          valueChangeAssign(value, index, row, column.key);
                        }
                      "
                      :disabled="column.readOnly"
                      :control-type="column.controlType"
                      v-model="row[column.key]"
                    ></formControl>
                  </template>
                </td>
              </template>
            </eTable>
          </TabPane>
        </Tabs>
        <div>
          <Tabs>
            <!--  注意:eTable formDataInfo.wareHouseItems.defaultList  ===wareHouseItems=== 需要根据实际接口修改,其它不变-->
            <TabPane label="纸板入库信息">
              <eTable
                ref="secondTableRef"
                :height="195+50"
                :index-menu="true"
                :col-start="0"
                :width="200"
                :data.sync="secondTableData"
                :rules="tableFieldsValidator"
                @tableColTiggerEventCall="tableColTiggerEventCall"
                :showContextMenu="false"
              >
                <template slot="head">
                  <tr
                    v-for="(columnGroup, index) in columns[`paperjoindataboxFm`]
                      .editGroups"
                    :key="index"
                  >
                    <template v-for="(column, index2) in columnGroup">
                      <th
                        v-if="excludeFiled('MdataFm', column.key)"
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
                    tableColTiggerEvent,
                    valueChangeAssign
                  }"
                >
                  <td
                    :class="`ivu-table-column-${column.align}`"
                    v-for="(column, subIndex) in columns[`paperjoindataboxFm`]
                      .editColumns"
                    :key="subIndex"
                    :width="column.editWidth"
                  >
                     <!-- 本次入库数-->
                    <template v-if="column.key === 'qty'">
                      <Input
                        v-model="row[column.key]"
                        @input="
                          tableColTiggerEvent(
                            row,
                            column,
                            index,
                            'qtyChangeEvent'
                          )
                        "
                      ></Input>
                    </template>
                     <!-- 单价-->
                    <template v-else-if="column.key === 'quotePrice'">
                      <Input
                        v-model="row[column.key]"
                        @input="
                          tableColTiggerEvent(
                            row,
                            column,
                            index,
                            'quotePriceChangeEvent'
                          )
                        "
                      ></Input>
                    </template>
                    <template v-else>
                      <formControl
                        @input="
                          value => {
                            valueChangeAssign(value, index, row, column.key);
                          }
                        "
                        :disabled="column.readOnly"
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
import inputNumber from "@/components/input-number";
import tableSelect from "@/components/table-select/table-select";
import editWindow from "@/components/edit-window/edit-window";
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
  name: "edit-paperJoinSlave",
  mixins: [editBaseMixins],
  components: {
    editWindow,
    popup,
    tableSelect,
    eTable,
    InputNumber,
    formControl,
    inputNumber
  },

  mounted() {},
  props: {
    ppoGroupNoList: {
      type: String,
      default: ""
    },
    inProvider: {
      type: Number | String,
      default: ""
    },
    //其它参数>> formDataInfo.master
    extParams: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      getDataLoadding:false,
      selectedSecondTableData:[],//第三层表格选择的数据列表
      firstTalbeCrrentRowIndex:0,// 当前下标
      firstTalbeCrrentRowItem:{},// 第一表格当前选择数据项
      columns: [], //列头信息列表
      productSpecShow: false,
      formDataInfo: {
        // 主表 更改字段
        master: {},
        productMDatas: {}
        // List:thsi.list
      }, // 防止添加和更新数据提交发生冲突
      // 需要验证的数据
      ruleValidate: {},
      tableFieldsValidator: {},
      firstTableData: [], // 存放处理过后的数据:[],
      timeoutId: 0,
      requestCount: 0,
      table: [], // 存储子表全部对应的字段
      title: "工单号",
      multiValue: "", //查询字段
      ppoNOValue:'',//采购单号
      propvalue: "ppoGroupNo" //存储子表每个对应的字段
    };
  },
  computed: {
    getppoQty() {
      // debugger
      let tableData = this.$refs["firstTableRef"].cloneData;
      return (tableData[0].ppoQty =
        tableData[0].ppoStockQty -
        tableData[0].ppoInQty +
        tableData[0].ppoRQty);
    }
  },
  created() {
    this.loadColumsData();
    this.getFormInitDataObj(); // 获取初始化数据
  },
  methods: {
    // 勾选框发生改变
    onChange_iisChose(index,row){
       let _self = this
       this.getDataLoadding = true
        setTimeout(() => {
         //  debugger
          if(!!row.iisChose){
            // 添加
            _self.selectedSecondTableData.push(..._self.secondTableData)
          }else{
            // 移除
            let newlist = _self.selectedSecondTableData.filter(item=>{
                    return item.parentsId != row.pppmId
            })
            _self.selectedSecondTableData = newlist
          }
           _self.getDataLoadding = false
        }, 500);
    },
      // 判断一个值是数字
    myIsNaN (value) {
      return typeof value === 'number' && !isNaN(value)
    },
    // 表格列值改变 回调事件处理event：{row, column, index, event,config}
    tableColTiggerEventCall (obj) {
      // debugger
      switch (obj.event) {
        // 修改 本次入库数，明细的 本次入库数 会随着变化
        case 'qtyChangeEvent':
          // 触发修改值 直接修改原始数据 无效
          let isNumber = this.myIsNaN(Number(obj.row.qty))
          if (!isNumber || (obj.row.qty + '').substr(0, 1) == '-') {
            this.$Message.error('请输入正数')
            return
          }

          this.$refs['secondTableRef'].set(
            { qty: obj.row.qty},
            obj.index
          )
          this.sumTotalQty() // 汇总 本次入库数
          this.setPpoArea() // 计算面积
          break
          // 单价 >>回调事件
        case 'quotePriceChangeEvent':  
           this.$refs['secondTableRef'].set(
            { quotePrice: obj.row.quotePrice},
            obj.index
          )
        default:
          break
      }
    },
     // 表格列值改变 回调事件处理event：{row, column, index, event,config}
    firstTableColTiggerEventCall (obj) {
      // debugger
      switch (obj.event) {
        // 修改 本次入库数，明细的 本次入库数 会随着变化
        case 'qtyChangeEvent':
          // 触发修改值 直接修改原始数据 无效
          let isNumber = this.myIsNaN(Number(obj.row.qty))
          if (!isNumber || (obj.row.qty + '').substr(0, 1) == '-') {
            this.$Message.error('请输入正数')
            return
          }
          this.$refs['firstTableRef'].set(
            { qty: obj.row.qty},
            obj.index
          )
          // 重新计算面积
         this.setPpoArea()
          break
          // 单价 >>回调事件
        case 'quotePriceChangeEvent':  
           this.$refs['firstTableRef'].set(
            { quotePrice: obj.row.quotePrice},
            obj.index
          )
        default:
          break
      }
    },
  
    // 计算面积 = 单面积*本次入库数
    setPpoArea(){
      let FromData = this.$refs['firstTableRef'].get()
      let qty =Number(FromData[this.firstTalbeCrrentRowIndex].qty)
      let sArea =Number(FromData[this.firstTalbeCrrentRowIndex].sArea)
      this.$refs['firstTableRef'].set({ppoArea:qty*sArea},this.firstTalbeCrrentRowIndex)
    },
    //汇总 本次入库数
    sumTotalQty(){
       let totalQty = 0
       this.secondTableData.forEach(item=>{
         if(Number(item.qty)>0){
           totalQty=totalQty+Number(item.qty)
         }
       })
       this.$refs['firstTableRef'].set(
          { qty: totalQty},
          this.firstTalbeCrrentRowIndex
        )
    },
    // 默认选择行数据
    setDefaultSelectedRow(index = 0) {
      let slaveObj = this.$refs["firstTableRef"];
      if (slaveObj) {
        slaveObj.rowClick(index, "row-click");
      }
    },
    // 子表点击事件 显示第三层表的数据
    slave_list_table_editRowClick(index,row) {
      if(JSON.stringify(this.firstTalbeCrrentRowItem)!=JSON.stringify(row)){
         this.firstTalbeCrrentRowIndex =index
         this.firstTalbeCrrentRowItem = row
         this.loadSecondTableData()
      }
     
    },
    // 加载第三层标数据列
    loadSecondTableData(){
      let rowItem = this.firstTalbeCrrentRowItem
      if(rowItem && !!rowItem.pppmId){
        let url= `/stock/purPaperJoin/getPaperJoinData`
        //查询采购信息,参数(itemId 明细表id，priceMode 金额计算模式,amtDot 金额小数位
        let params = {
          itemId:rowItem.pppmId,
          priceMode:this.extParams.priceAreaMode,
          amtDot: Number(this.extParams.amtDot) 
        }
        request.post(url, params).then(res=>{
          //debugger
          if(res){
            this.secondTableData = res.map(item=>{
               item.parentsId = rowItem.pppmId
               return item
            })
          }
        })
      }
    },
    // 加载列头数据
    loadColumsData() {
      //纸板规格
      let formName = "paperjoinitemboxFm";
      let url = `/sys/form/init/${formName}`;
      request.get(url).then(res => {
        if (res != null) {
          this.columns = res.columns;
        }
      });
    },
    // 排除不需要显示的字段
    excludeFiled(type, key) {
      let exListMaster = [];
      let exlistMdataFm = [];
      let exList = [];
      switch (type) {
        case "Master":
          exList = exListMaster;
          break;
        case "MdataFm":
          exList = exlistMdataFm;
          break;
        default:
          break;
      }
      if (exList.includes(key)) {
        return false;
      } else {
        return true;
      }
    },
    pageOnChange(_pageNum) {
      this.pageConfig.pageNum = _pageNum;
      this.clickmaster();
    },
    //clicktable() {},
    // 获取最大本次入库数 = 采购数*（1+百分比）+退货数 ppoRQty-已入库数 ppoInQty
    getmaxstockQty(data) {
      if (!!data.ppoStockQty) {
        let masQty =
          (1 + Number(this.$params.PaperJoinQtyUpLimit) / 100) *
            data.ppoStockQty +
          Number(data.ppoRQty) -
          Number(data.ppoInQty);
        return Math.ceil(masQty);
      }
      return 1;
    },
    // 存储选择的查询字段
    purPaperPoClick(data, val) {
      this.title = data;
      this.propvalue = val;
    },
    getmultiValue(val) {
      if (this.propvalue === val) {
        return this.multiValue;
      }
      return "";
    },
    // 搜索点击事件
    clickmaster(type) {
      if (this.pageConfig.pageNum == 1 || type == "search") {
        this.resetPageConfig();
        this.firstTalbeCrrentRowItem ={}
        this.firstTableData = [];
        this.secondTableData = []
      }
      //查询采购工单信息,参数(工单号 workNo,采购单号 ppoNo,
      // vendId 供应商id，flag 模糊查询,beginDate
      // 开始时间,endDate 结束时间,itemIdList
      //  已选择数据的id[用于弹框过滤]),pageNumber(当前页),pageSize(每页显示条数)
      let ddata = this.formDataInfo;
      let params = {
        ppoNo: this.ppoNOValue,//this.getmultiValue("ppoNO"), //采购单号
        vendId: this.inProvider, //主表供应商ID
        workNo: this.getmultiValue("ppoGroupNo"), //工单号
        beginDate: dayjs(this.formDataInfo.master.beginDate).format(
          "YYYY-MM-DD"
        ),
        endDate: dayjs(this.formDataInfo.master.endDate).format("YYYY-MM-DD"),
        flag: this.formDataInfo.master.flag,
        itemIdList: this.ppoGroupNoList,
        pageNumber: this.pageConfig.pageNum, //(当前页),
        pageSize: this.pageConfig.pageSize //(每页显示条数)
      };
      request
        .post(`/stock/purPaperJoin/getSpPaperPOToPaperJoin`, params)
        .then(res => {
          if (res && res.records && res.records.length > 0) {
            this.pageConfig.total = res.total; // 赋值总条数
            for (let i = 0; i < res.length; i++) {
              if (res.records[i].ppoDate) {
                res.records[i].ppoDate = res.records[i].ppoDate
                  .replace("T", " ")
                  .replace(".000+0000", "");
              }
              if (res.records[i].ppoDueDate) {
                res.records[i].ppoDueDate = res.records[i].ppoDueDate
                  .replace("T", " ")
                  .replace(".000+0000", "");
              }
            }
            this.firstTableData.push(...res.records);
            setTimeout(()=>{
               this.setDefaultSelectedRow()
            },300)
           
          }
          this.pageConfig.total = res.total; // 赋值总条数
          this.$refs["editWindow"].pageConfig = this.pageConfig;
        });
    },

    // 加载表单初始化数据
    getFormInitDataObj(data) {
      this.formDataInfo["master"] = {
        inCusCode: "",
        propvalue: "",
        inCusName: "",
        flag: "0",
        beginDate: dayjs().subtract(15, "day").format("YYYY-MM-DD"),
        endDate: dayjs().format("YYYY-MM-DD")
      }
     
    },
    // 表单数据提交事件
   async submitFormDataEvent() {
      // 表单数据提交事件
      // true就是有问题
      let result = await this.$refs["firstTableRef"].validate();
      if (result) {
        return;
      }
      let parms = [];
      let submitDataObj = this.$refs["firstTableRef"].cloneData;
      submitDataObj.forEach(item => {
        if (!!item.iisChose) {
          parms.push(item);
        }
      });
      // 提交数据
      // 向外暴露的方法:
      let postParams ={
        firstTableData:parms,
        secondTableData:this.selectedSecondTableData.map(item=>{
             item.rQty = 0 // 重置退货数
             return item
        })
      }
      this.$emit("closeMain", postParams);
      this.showWindow = false; // 关闭当前窗口
    },
    // 重写父类 关闭窗口时 触发事件
    closeActionTigger() {
      this.resetPageConfig();
      this.firstTableData = [];
      this.secondTableData=[]
      this.selectedSecondTableData = []
      this.firstTalbeCrrentRowItem ={}
      // fix 清除上次的错误提示 formDataInfo 为表单ref名称
      if (this.$refs["masterForm"]) {
        this.$refs["masterForm"].resetFields();
      }
      if (this.$refs["firstTableRef"]) {
        this.$refs["firstTableRef"].reset();
      }
    }
  }
};
</script>
<style>
.ivu-form-item-text2 .ivu-form-item-content {
  /* margin-left: 2.8125rem !important; */
}
.edit-table .ivu-input {
  padding: 0 !important;
  height: 24px;
}
.hover {
  cursor: pointer;
}
</style>
