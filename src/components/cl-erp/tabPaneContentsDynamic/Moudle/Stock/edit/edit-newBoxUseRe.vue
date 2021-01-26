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
    :show-message="true"
    :model="formDataInfo.master"
    :rules="ruleValidate"
    :label-width="80"
    :disabled='detailDisabled||disIisAcc'
      >
        <Row>
            <Col span="4">
                <FormItem label="退货单号" prop="burNo">
                    <Input
                    v-model="formDataInfo.master.burNo"
                    maxlength="20"
                    placeholder
                    disabled
                    ></Input>
                </FormItem>
            </Col>
            <Col span="4">
                <FormItem label="退货日期" prop="burDate">
                    <DatePicker
                    type="date"
                    format="yyyy-MM-dd"
                    :editable="false"
                    :clearable="false"
                    v-model="formDataInfo.master.burDate"
                    ></DatePicker>
                </FormItem>
            </Col>
             <Col span="6">
                <FormItem label="供应商编号" prop="supplierId" :label-width="100">
                    <popup
                    :disabled="detailDisabled || action !== 'add'"
                    @on-fill="Initializationdata"
                    v-model="formDataInfo.master.supplierCode"
                    field-name="supplierCode"
                    popup-name="SupplierSingleBox"
                    :fill-model.sync="formDataInfo.master"
                    render-fields="supplierId,supplierCode,supplierName,coinId,priceAreaMode,amtDot,ctDot"
                    from-fields="id,purCode,purName,coinId,priceAreaMode,amtDot,ctDot"
                    :suffix="true"
                    :suffix-model="formDataInfo.master.supplierName"
                    suffixModelName="supplierName"
                    :query-params="{}"
                    />
                </FormItem>
            </Col>
            <Col span="5">
                <FormItem label="退货原因" prop="reason">
                  <popup
                      :disabled="false"
                      v-model="formDataInfo.master.reason"
                      field-name="reason"
                      popup-name="BasFadeReasonSingleBox"
                      :fill-model.sync="formDataInfo.master"
                      render-fields="reason"
                      from-fields="frName"
                      :blurFocusLoadData='false'
                      :query-params="{}"
                    />
                </FormItem>
            </Col>
            <Col span="4">
                <FormItem label="车牌号" prop="carNo" :label-width="60">
                  <popup
                    v-model="formDataInfo.master.carNo"
                    field-name="carNo"
                    :disabled="false"
                    popup-name="CarSingleBox"
                    :fill-model.sync="formDataInfo.master"
                    render-fields="carNo,carId"
                    from-fields="carNo,id"
                    />
                </FormItem>
            </Col>
            <Col span="24">
              <Row>
                 <Col span="4">
                    <FormItem label="数量" prop="burQty">
                        <Input
                        v-model="formDataInfo.master.burQty"
                        maxlength="20"
                        placeholder
                        disabled
                        ></Input>
                    </FormItem>
                </Col>
                <Col span="4">
                    <FormItem label="金额" prop="burMoney" >
                        <Input
                        v-model="formDataInfo.master.burMoney"
                        maxlength="20"
                        placeholder
                        disabled
                        ></Input>
                    </FormItem>
                </Col>
                 <Col span="5">
                    <FormItem label="月结日期" prop="burMonthDate" :label-width="100">
                        <DatePicker
                        type="date"
                        format="yyyy-MM-dd"
                        :editable="false"
                        :clearable="false"
                        v-model="formDataInfo.master.burMonthDate"
                        ></DatePicker>
                    </FormItem>
                </Col>
                <Col span="1">
                    <FormItem label="月结" prop="iisAcc" :label-width="50">
                        <Checkbox 
                        v-model="formDataInfo.master.iisAcc"
                        disabled
                        ></Checkbox >
                    </FormItem>
                </Col>
                <Col span="9">
                    <FormItem label="备注">
                    <Input
                        v-model="formDataInfo.master.remark"
                        :disabled="detailDisabled"
                        maxlength="100"
                        :autosize="{ minRows: 2, maxRows: 5 }"
                        placeholder="请输入备注..."
                    ></Input>
                    </FormItem>
                </Col>
              </Row>
            </Col>
        </Row>
      </Form>

          <!-- 纸板采购明细表 -->
        <Tabs>
          <TabPane
            label="纸板退货明细表"
            name="name1"
          >
            <eTable
              ref="slave_list_table_edit"
              unqiue-mark="id"
              :height="300"
              :index-menu="true"
              :col-start="0"
              :width="200"
              :row-init-data="initData.initData[`stockboxusereitemFm_new`]"
              :data.sync="masterTableData"
              :rules="tableFieldsValidator"
              @row-click="slave_list_table_editRowClick"
              @row-delete="slave_list_table_editRowDelete"
              @on-table-change="debouncedGetSuite"
              :showContextMenu="!detailDisabled"
            >
              <template slot="head">
                <tr
                  v-for="(columnGroup, index) in initData.columns[`stockboxusereitemFm_new`].editGroups"
                  :key="index"
                >
                  <th
                    v-for="(column, index2) in columnGroup"
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
                </tr>
              </template>
              <template
                slot="body"
                slot-scope="{ row, index, valueChangeAssign }"
              >
                <td
                  :class="`ivu-table-column-${column.align}`"
                  v-for="(column, columnIndex) in initData.columns[
                    `stockboxusereitemFm_new`
                  ].editColumns"
                  :key="columnIndex"
                  :width="column.editWidth"
                >
                <!--控件特殊处理 工单号  -->
                <Input
                  v-if="column.key == 'workNo'"
                  v-model="row[column.key]"
                  disabled
                  @input="
                    value => {
                      valueChangeAssign(value, index, row, 'workNo');
                    }
                  "
                  size="small"
                  :maxlength="20"
                >
                  <Icon
                    v-show="!row.id"
                    @click="Slave_list_table_editRowModify(index)"
                    slot="suffix"
                    type="md-add"
                  />
                </Input>
                 <!--控件特殊处理 单价  -->
                <Input
                  v-else-if="column.key == 'price'"
                  v-model="row[column.key]"
                  type="number"
                  :disabled='detailDisabled||row.iisAcc'
                  @on-blur="getMonny('price')"
                  @input="
                    value => {
                      valueChangeAssign(value, index, row, 'price');
                    }
                  "
                  size="small"
                  :maxlength="20"
                >
                </Input>
                <!--控件特殊处理  其它 -->
                  <formControl
                    v-else
                    :align="column.align"
                    :control-type="column.controlType"
                    v-model="row[column.key]"
                    :disabled='column.readOnly||row.iisAcc'
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
          <TabPane
            label="纸板退货详细表"
            name="name2"
          >        
            <eTable 
              :showDeleteEvent='true'
              :showContextMenu="false"
              :disabledAddRowWhenfocusNull="true"
              ref="sub_list_table_edit"
              unqiue-mark="id"
              :height="232"
              :index-menu="true"
              :col-start="0"
              :width="200"
              :row-init-data="initData.initData[`stockboxuseremdataFm_new`]"
              :data.sync="sonTableData"
              @on-table-change="debouncedGetSuite"
              @row-delete="sub_list_table_editRowDelete"
              :rules="tableFieldsValidator"
            >
              <template slot="head">
                <tr
                  v-for="(columnGroup, index) in initData.columns[`stockboxuseremdataFm_new`].editGroups"
                  :key="index"
                >
                  <th
                    :class="`ivu-table-column-${column.titleAlign}`"
                    v-for="(column, index2) in columnGroup"
                    :key="index2"
                    :width="column.editWidth"
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
                  v-for="(column, subIndex) in initData.columns[`stockboxuseremdataFm_new`].editColumns"
                  :key="subIndex"
                  :width="column.editWidth"
                >
                <!--控件特殊处理 退货数  -->
                <inputNumber
                  v-if="column.key == 'qty'"
                  v-model="row[column.key]"
                  @on-blur='changeQty(row)'
                  :disabled='detailDisabled||disIisAcc'
                  :max="row['kQty']"
                  :min="0"
                  @input="
                    value => {
                      valueChangeAssign(value, index, row, 'qty');
                    }
                  "
                  size="small"
                  :maxlength="20"
                >
                </inputNumber>
                  <!-- 其它 不可以编辑-->
                  <template v-else>
                    <formControl
                      :disabled='column.readOnly||disIisAcc'
                      :align="column.align"
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
    <newBoxUseReSalve
      ref="mySalve"
      :isLoaddingDone="salveWindow.isLoaddingDone"
      :action="salveWindow.action"
      v-model="salveWindow.showEditWindow"
      :inSupplier='inSupplier'
      :itemIdList='itemIdList'
      @submitEvent='submitEvent'
    />
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
let _ = require('lodash')
import newBoxUseReSalve from "../components/newBoxUseReSalve";
import inputNumber from '@/components/input-number';
import editWindow from "@/components/edit-window/edit-window";
import eTable from "@/components/e-table/e-table";
import request from "@/libs/request";
import editBaseMixins from "../../mixins/edit";
import dayjs from "dayjs";
import formControl from "@/components/form-control/form-control";
import popup from "@/components/popup/popup";
import { deepCopy } from "view-design/src/utils/assist";
const default_master =　{
  master:{
    burNo:'',
    burDate:dayjs().format("YYYY-MM-DD HH:mm:ss"),
    supplierId:'',
    supplierCode:'',
    supplierName:'',
    coinId:"",
    priceAreaMode:"",
    reason:"",
    carNo:'',
    carId:"",
    burQty:0,
    burMoney:0,
    burMonthDate:dayjs().format("YYYY-MM-DD HH:mm:ss"),
    iisAcc:false,
    ctDot:2,
    amtDot:2
  }
};
const default_itemDTOList = [{master:{},reDataList:[]}]
export default {
  name: "edit-boxProductPrice",
  mixins: [editBaseMixins],
  components: {
    editWindow,
    eTable,
    formControl,
    popup,
    inputNumber,
    newBoxUseReSalve
  },
  data() {
    return {
      sonDELdata:[],//第三层表删除数据
      disIisAcc:false,//第二层表月结
      deleteTableList:[],//存储删除的数据
      tableIndex:-1,//第二层表选中数据索引
      masterTableData:[],//第二层表数据源
      sonTableData:[],//第三层表数据源
      inSupplier:{},//供应商数据
      salveWindow: {
        // Tips:"提示：此窗口只显示有供应商纸质/纸板进价的工单！",
        isLoaddingDone: false, // 窗口是否加载完成
        showEditWindow: false, // 是否显示edit-boxSalesOrderSlave 编辑窗口
        action: null, // 当前操作功能 添加/编辑
        formDetailData: {} // 当前表单的详细信息
      },
      actionSubtitle: "纸板退货", // 当前操作副标题
      formInitPreName: "stockBoxUseRe", // 初始化信息查询 前缀 字段
      formName: "stockboxusereitemFm_new", // 初始化信息查询 表单字段
      requestBaseUrl: "/stock/stockBoxUseRe", // 请求 查询 操作的基础路径
      formDataInfo:deepCopy(default_master),
      itemDTOList:deepCopy(default_itemDTOList),// 深拷贝对象和数组,
      ruleValidate: {
        supplierId: [
          { required: true, message: "供应商不能为空", trigger: "blur" }
        ]
      }, // 需要验证的数据
      tableFieldsValidator: {}, // 需要验证的数据表格
    };
  },
  created() {
        this.debouncedGetSuite = _.debounce(this.tableChangeCallback, 800)
  },
  methods:{
    //工单号ICON回调
    async Slave_list_table_editRowModify(index){
      let valid = await this.$refs['formDataInfo'].validate()
      if(!valid) return
      this.tableIndex = index
      this.salveWindow.action='add'
      this.salveWindow.showEditWindow=true
      this.salveWindow.isLoaddingDone=true
      this.itemIdList = this.getItemIdList()
      this.$refs.mySalve.cliearData()
    },
    // 获取工单弹框过滤字段
    getItemIdList(){
      let joinItemId = []
      let selectData =  this.$refs.slave_list_table_edit.get();
      selectData.filter(item=>{
        joinItemId.push(item.joinItemId)
      })
      return joinItemId.toString()
    },
    // 主表供应商选择回调
    Initializationdata(e){
      this.$refs["formDataInfo"].validateField("supplierId", err => {});
      this.inSupplier = e[0].data
    },
    // 工单号弹出框确认回调
    submitEvent(e){
      let _self = this
      e.filter((item,index)=>{
        _self.itemDTOList.splice(this.tableIndex+index,1,item)
        _self.$refs.slave_list_table_edit.set(item.master,this.tableIndex+index)
      })
        this.$refs.slave_list_table_edit.rowClick(0, "row-click");
        this.getMasterField()
    },
    // 第二层表点击回调
    slave_list_table_editRowClick(index){
      this.$refs.sub_list_table_edit.reset()
      this.tableIndex = index
      if(!this.itemDTOList[index]){
        this.itemDTOList.push({master:{},reDataList:[]})
      }
      let clickTableList = deepCopy(this.itemDTOList)
      let sonTableData = clickTableList[index].reDataList
      sonTableData.filter((item,itemIndex)=>{
        this.$refs.sub_list_table_edit.set(item,itemIndex)
      })
      this.getiisAcc()
    },
    // 提交表单回调
    async formTableDataSubmit(){
      let valid = await this.$refs['formDataInfo'].validate()
      console.log(valid);
      if(!valid) return
      this.isLoaddingDone = false
      let parms = this.getqequestData()
      request.post('/stock/stockBoxUseRe/saveOrUpdate',parms).then(res=>{
        this.showWindow = false
        this.tableIndex = -1
        this.$Message.success('提交成功')
        this.$emit('submit-success')
      }).catch(err=>{
        this.isLoaddingDone = true
      })
    },
    // 获取提交表单数据
    getqequestData(){
      this.formDataInfo.master.burDate = dayjs(this.formDataInfo.master.burDate).format("YYYY-MM-DD HH:mm:ss")
      this.formDataInfo.master.burMonthDate = dayjs(this.formDataInfo.master.burMonthDate).format("YYYY-MM-DD HH:mm:ss")
      this.itemDTOList.filter(item=>{
        item.master.dueDate = dayjs(item.master.dueDate).format("YYYY-MM-DD HH:mm:ss")
        this.sonDELdata.filter(sonitem=>{
          if(item.id==sonitem.boxUseReItem){
            item.reDataList.push(sonitem)
          }
        })
      })
      return {
        master:this.formDataInfo.master,
        itemDTOList:[...this.itemDTOList,...this.deleteTableList]
      }
    },
    // 重写父类 关闭窗口时 触发事件
    closeActionTigger() {
      // fix 清除上次的错误提示 formDataInfo 为表单ref名称
      this.$refs["slave_list_table_edit"].reset();
      this.$refs["sub_list_table_edit"].reset();
      this.formDataInfo = deepCopy(default_master);
      this.tableIndex = -1;
      this.masterTableData = [];
      this.sonTableData = [];
      this.deleteTableList = [];
      this.itemDTOList=deepCopy(default_itemDTOList);
      this.disIisAcc = false;
      this.sonDELdata = [];
      this.isLoaddingDone = true
    },
    // 第三层表退货数回调 重算金额面积
    changeQty(row){
      let secondData = this.$refs.sub_list_table_edit.get();
      let firstData = this.$refs.slave_list_table_edit.get();    
      let qty = 0
      secondData.filter(item=>{
        qty+=Number(item.qty)
      })
      this.$refs.slave_list_table_edit.set({qty},this.tableIndex)
      this.setFirstTableMonny()
    },
    // 重算金额 money，面积 briArea
    setFirstTableMonny(){
      let firstData = this.$refs.slave_list_table_edit.get();    
      let {qty,briArea,briSArea}=deepCopy(firstData[this.tableIndex])
      briArea = (Number(briSArea)*Number(qty)).toFixed(2);
      this.$refs.slave_list_table_edit.set({briArea},this.tableIndex);
      this.getMonny()
    },
    // 计算金额，单价
    getMonny(type){
      let firstData = this.$refs.slave_list_table_edit.get();    
      let {qty,money,quotePrice,price,briSArea}=deepCopy(firstData[this.tableIndex])
      let {priceAreaMode,amtDot,ctDot} = this.formDataInfo.master
      if (priceAreaMode) {
        if(type=='price'){
          price = Number(price)
        }else{
          price = Number(quotePrice)
        }
        // price = quotePrice
        money =(Number(qty)*Number(price)*Number(briSArea)).toFixed(amtDot)
      }else{
        if(type=='price'){
          price = Number(price).toFixed(ctDot)
        }else{
          price =(Number(price)*Number(briSArea)).toFixed(ctDot)
        }
        money =(Number(qty)*Number(price)).toFixed(amtDot)
      }
      this.$refs.slave_list_table_edit.set({money,price},this.tableIndex);
      this.getMasterField()
    },
    // 根据月结字段控制第三层表
    getiisAcc(){
      let masterData = this.$refs.slave_list_table_edit.get();
      let {iisAcc} = masterData[this.tableIndex]
      this.disIisAcc = iisAcc
    },
    // 获取主表金额，数量
    getMasterField(){
      let [monny,qty] = [0,0]
      this.itemDTOList.filter(item=>{
        monny+=Number(item.master.money)
        qty+=Number(item.master.qty)
      })
      this.formDataInfo.master.burMoney = monny.toFixed(2)
      this.formDataInfo.master.burQty = qty
    },
    // 表单数据改变修改缓存
    tableChangeCallback(){
      if(this.tableIndex==-1) return
      let masterTableData = this.$refs.slave_list_table_edit.get()
      let subTableData = this.$refs.sub_list_table_edit.get()
      this.itemDTOList[this.tableIndex].master = masterTableData[this.tableIndex]
      this.itemDTOList[this.tableIndex].reDataList=subTableData
    },
    // 第二层表删除回调
    slave_list_table_editRowDelete(index,data){
        if (this.action != 'add') {
          if(!!data.id){
            // let delLiat =deepCopy(this.itemDTOList[index])
            let [delteData] = this.itemDTOList.splice(index,1)
            delteData.master.hasDelete = true
            // delteData.reDataList=[]
            this.deleteTableList.push(delteData)
          }else{
            this.itemDTOList.splice(index,1)
            this.subMasterTableData = this.$refs.slave_list_table_edit.get()
          }
        }
        this.masterTableIndex = -1
        this.$refs.sub_list_table_edit.reset();
        // this.itemDTOList.splice(index,1)
        if (this.itemDTOList.length==0) return
        this.$refs.slave_list_table_edit.rowClick(0, "row-click")
        this.getMasterField()
    },
    // 第三层表删除回调
    sub_list_table_editRowDelete(index,data){
      if (this.action=='add') {
        this.itemDTOList[this.tableIndex].reDataList.splice(index,1)
      }else{
        data.hasDelete = true
        this.sonDELdata.push(data)
      }
      this.changeQty()
    },
    // 重写父类 数据初始化后 自动调用
    formDetailDataCall() {
      if (this.action != "add") {
          this.itemDTOList = this.formDataInfo.itemDTOList
          this.inSupplier.supplierId = this.formDataInfo.master.supplierId
          this.formDataInfo.itemDTOList.filter((item,index)=>{
            this.$refs.slave_list_table_edit.set(item.master,index)
          })
        this.$refs.slave_list_table_edit.rowClick(0, "row-click")
      }
      // 数据初始化，把第二层表的master组装成一个List结构
    },
  },
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
