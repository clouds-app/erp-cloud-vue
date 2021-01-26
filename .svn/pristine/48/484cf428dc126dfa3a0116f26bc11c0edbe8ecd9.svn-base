<template>
  <div>
    <editWindow
      class="cl-edit-paperJoin"
      :title="actionLableName"
      v-model="showWindow"
      :fullscreen="true"
      width="90%"
      :loading="!isLoaddingDone"
      :spinLoaddingText="spinLoaddingText"
      :disabledSubmitBtn="disabledSubmitBtn"
      @on-ok="beforeSubmit()"
      v-if="initData.columns"
    >
    <div @contextmenu.prevent ref="masterHeight" class="masterHeightClass" :style="{ height: getMasterheight() + '%' }" >
      <Form
        ref="formDataInfo"
        :show-message="true"
        :model="formDataInfo.master"
        :rules="ruleValidate"
        :label-width="100"
      >
        <Row>
          <Col span="10">
            <Row>
              <Col span="12">
                <FormItem label="入库单号" prop="pjNumber">
                  <Input v-model="formDataInfo.master.pjNumber" maxlength="20" placeholder disabled></Input>
                </FormItem>
              </Col>
              <Col span="11">
                <FormItem label="日期" prop="pjDate" :label-width="50">
                  <DatePicker
                    :editable='false'
                    :clearable='false'
                    type="date"
                    format="yyyy-MM-dd HH:mm:ss"
                    :disabled="detailDisabled"
                    :transfer='true'
                    v-model="formDataInfo.master.pjDate"
                  ></DatePicker>
                </FormItem>
              </Col>
            </Row>
          </Col>
          <Col span="7">
            <FormItem label="供应商编号" prop="supplierCode">
              <div>
                <popup
                  ref='firstFocusInput'
                  :disabled="detailDisabled||action!='add'"
                  @on-fill="Initializationdata"
                  v-model="formDataInfo.master.supplierCode"
                  field-name="supplierCode"
                  popup-name="SupplierSingleBox"
                  :fill-model.sync="formDataInfo.master"
                  render-fields="supplierId,supplierCode,supplierName,curyId,taxTp,taxRat,rate,priceAreaMode"
                  from-fields="id,purCode,purName,coinCode,taxTP,taxRate,coinRate,priceAreaMode"
                  :suffix="true"
                  :suffix-model="formDataInfo.master.supplierName"
                  suffixModelName="supplierName" 
                  :query-params="{}"
                />
              </div>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="月结日期" prop="accDate">
              <DatePicker
                :disabled="detailDisabled"
                type="date"
                format="yyyy-MM-dd"
                :transfer='true'
                v-model="formDataInfo.master.accDate"
              ></DatePicker>
            </FormItem>
          </Col>
          
          <Col span="10">
            <Row>
              <Col span="12">
                <FormItem label="数量" prop="qty">
                  <Input v-model="formDataInfo.master.qty" maxlength="20" placeholder disabled></Input>
                </FormItem>
              </Col>
              <Col span="11">
                <FormItem label="金额" prop="money" :label-width="50">
                  <InputNumber
                    disabled
                    v-model="formDataInfo.master.money"
                    style="width:100%"
                    maxlength="20"
                    placeholder
                  ></InputNumber>
                </FormItem>
              </Col>
            </Row>
          </Col>
          <Col span="7">
            <FormItem label="仓位" prop="wareHouseItCode">
              <div>
                <popup
                  :disabled="detailDisabled||action!='add'"
                  v-model="formDataInfo.master.wareHouseItCode"
                  @on-fill="Initializationdata"  
                  field-name="wareHouseItCode"
                  popup-name="WareHouseSingleBox"
                  :fill-model.sync="formDataInfo.master"
                  render-fields="wareHouseItId,wareHouseItCode,wareHouseItName"
                  from-fields="wareHouseItId,wsCode,wsName"
                  :suffix="true"
                  :suffix-model="formDataInfo.master.wareHouseItName"
                  suffixModelName="wareHouseItName" 
                  :query-params="{whType:3}"
                />
              </div>
            </FormItem>
          </Col>
          <Col span="6">
            <Row>
              <Col span="6">
                <FormItem label="月结" prop="iisAcc" >
                  <Checkbox
                    disabled
                    v-model="formDataInfo.master.iisAcc"
                    maxlength="20"
                    placeholder
                  ></Checkbox>
                </FormItem>
              </Col>
            </Row>
          </Col>
          <Col span="10">
            <Row>
                <Col span="12">
                  <FormItem label="送货单号" prop="shNumber">
                    <Input :disabled="detailDisabled" v-model="formDataInfo.master.shNumber" maxlength="20" placeholder="请输入送货单号" ></Input>
                  </FormItem>
                </Col>
                <Col span="11">
                  <FormItem :label-width="50" label="车牌" prop="carNo">
                    <div>
                      <popup
                        :disabled="detailDisabled"
                        v-model="formDataInfo.master.carNo"
                        field-name="carNo"
                        popup-name="CarSingleBox"
                        :fill-model.sync="formDataInfo.master"
                        render-fields="carNo"
                        from-fields="carNo"
                        :suffix="false"
                        :blur-focus-load-data="false"
                      />
                    </div>
                  </FormItem>
                </Col>
                </Row>
            </Col>
              <Col span="7">
                <FormItem label="备注">
                  <Input
                    :disabled="detailDisabled"
                    v-model="formDataInfo.master.remark"
                    maxlength="20"
                    placeholder="请输入备注..."
                    size="small"
                    :rows="1"
                  />
                </FormItem>
              </Col>
        </Row>
      </Form>
  </div>
      <Tabs>
        <!--  注意:eTable formDataInfo.artLengs.defaultList  ===artLengs=== 需要根据实际接口修改,其它不变-->
        <TabPane label="纸板入库明细" name="name1">
          <eTable
            ref="firstTableRef"
            unqiue-mark="id"
            :index-menu="true"
            :col-start="0"
            :width="200"
            :height="220"
            :insertDirection="insertDirection"
            :row-init-data="initData.initData[formName]"
            :data.sync="slavesForm.masterList"
            :rules="tableFieldsValidator"
            @row-add="slave_list_table_addRow"
            @row-insert="slave_list_table_editRowAdd"
            @row-delete='slave_list_table_edit_Delete'
            @row-click="slave_list_table_editRowClick"
            :showContextMenu="!detailDisabled"
            @tableColTiggerEventCall="firstTableColTiggerEventCall"
            v-if="showWindow"
          >
            <template slot="head">
              <tr
                v-for="(columnGroup,index) in initData.columns[formName].editGroups"
                :key="index"
              >
                <th
                  :class="`ivu-table-column-${column.titleAlign}`"
                  v-for="(column,index2) in columnGroup"
                  :key="index2"
                  :width="column.editWidth"
                  :colspan="column.colSpan"
                  :rowspan="column.rowSpan"
                  :columnKey="column.key"
                >
                  <div class="ivu-table-cell">
                    <span class>{{column.title}}</span>
                  </div>
                </th>
              </tr>
            </template>

            <template slot="body" slot-scope="{ row, index,tableColTiggerEvent,valueChangeAssign }">
              <td
                :class="`ivu-table-column-${column.align}`"
                v-for="(column,columnIndex) in initData.columns[formName].editColumns"
                :key="columnIndex"
                :width="column.editWidth"
              > 
               <!-- @on-blur="onFill(index)" -->
                 <Input
                  v-if="column.key == 'workNo'"
                  v-model="row[column.key]"
                  :disabled="!!(row['id'])"
                 
                  @input="
                      value => {
                        valueChangeAssign(value, index, row, 'workNo');
                      }
                    "
                  size="small"
                  :maxlength="20"
                >
                  <Icon @click="Slave_list_table_editRowModify(index)" slot="suffix" type="md-add" v-show="!(row['id'])" />
                </Input>
                <!--控件特殊处理 本次入库数 -->
                <!-- <inputNumber
                  v-else-if="column.key == 'qty'"
                  v-model="row[column.key]"
                  :disabled="detailDisabled"
                  @on-change="getMasterqty(index)"
                  :min=1
                  :max='getmaxstockQty(row)'
                  @input="
                      value => {
                        valueChangeAssign(value, index, row, 'qty');
                      }
                    "
                  size="small"
                  :maxlength="20"
                /> -->
                <!--控件特殊处理 备品数 --> 
                <!-- <inputNumber
                  :min='0'
                  v-else-if="column.key == 'prepQty'"
                  v-model="row[column.key]"
                  :disabled="detailDisabled"
                  @input="
                      value => {
                        valueChangeAssign(value, index, row, 'prepQty');
                      }
                    "
                  size="small"
                  :maxlength="20"
                /> -->
                <!--控件特殊处理 单价 --> 
                <inputNumber
                  v-else-if="column.key == 'price'"
                  v-model="row[column.key]"
                  :disabled="detailDisabled||column.readOnly||disabledSubmitBtn || !!row['iisAcc']"
                  @on-blur="onBlurprice(index)"
                  @on-change="changePriceQty(index)"
                  @input="
                      value => {
                        valueChangeAssign(value, index, row, 'price');
                      }
                    "
                  size="small"
                  :maxlength="20"
                />
                <formControl
                  v-else
                  :control-type="column.controlType"
                  v-model="row[column.key]"
                   :disabled="detailDisabled||column.readOnly||disabledSubmitBtn || !!row['iisAcc']"
                  @input="value => {valueChangeAssign(value, index, row,column.key)}"
                ></formControl>
              </td>
            </template>
          </eTable>
        </TabPane>
      </Tabs>
      <Tabs>
        <!--  注意:eTable formDataInfo.artLengs.defaultList  ===artLengs=== 需要根据实际接口修改,其它不变-->
        <TabPane label="纸板入库信息" name="name2">
          <eTable
            ref="secondTableRef"
            unqiue-mark="id"
            :index-menu="true"
            :col-start="0"
            :width="200"
             :height="195+50"
            :insertDirection="insertDirection"
            :row-init-data="{}"
            :data.sync="slavesForm.SubList"
            :showContextMenu="false"
            :showDeleteEvent ="true"
             @row-add="sub_list_table_addRow"
             @row-insert="sub_list_table_editRowAdd"
             @row-delete='sub_list_table_edit_Delete'
             @tableColTiggerEventCall="tableColTiggerEventCall"
            v-if="showWindow"
          >
            <template slot="head">
              <tr
                v-for="(columnGroup,index) in initData.columns[subFormName].editGroups"
                :key="index"
              >
                <th
                  :class="`ivu-table-column-${column.titleAlign}`"
                  v-for="(column,index2) in columnGroup"
                  :key="index2"
                  :width="column.editWidth"
                  :colspan="column.colSpan"
                  :rowspan="column.rowSpan"
                  :columnKey="column.key"
                >
                  <div class="ivu-table-cell">
                    <span class>{{column.title}}</span>
                  </div>
                </th>
              </tr>
            </template>

            <template slot="body" slot-scope="{ row, index,tableColTiggerEvent, valueChangeAssign }">
              <td
                :class="`ivu-table-column-${column.align}`"
                v-for="(column,columnIndex) in initData.columns[subFormName].editColumns"
                :key="columnIndex"
                :width="column.editWidth"
              >
                  <!-- 本次入库数-->
                <template v-if="column.key === 'qty'">
                      <Input
                        v-model="row[column.key]"
                        :disabled="detailDisabled||column.readOnly|| disabledSubmitBtn||slavesForm.currentRowItem['iisAcc']"
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
                  <!--控件特殊处理 备品数 --> 
                <inputNumber
                  :min='0'
                  v-else-if="column.key == 'prepQty'"
                  v-model="row[column.key]"
                  :disabled="detailDisabled||column.readOnly|| disabledSubmitBtn||slavesForm.currentRowItem['iisAcc']"
                   @input="
                          tableColTiggerEvent(
                            row,
                            column,
                            index,
                            'prepQtyChangeEvent'
                          )
                        "
                  size="small"
                  :maxlength="20"
                />
                <formControl v-else
                  :control-type="column.controlType"
                  v-model="row[column.key]"
                  :disabled="detailDisabled||column.readOnly|| disabledSubmitBtn||slavesForm.currentRowItem['iisAcc']"
                  @input="value => {valueChangeAssign(value, index, row,column.key)}"
                ></formControl>
              </td>
            </template>
          </eTable>
        </TabPane>
      </Tabs>
    </editWindow>
    <purPaperJoinSlave
      ref="mychild"
      :extParams="formDataInfo.master"
      :isLoaddingDone="salveWindow.isLoaddingDone"
      :formDetailData="salveWindow.formDetailData"
      :action="salveWindow.action"
      :ppoGroupNoList="ppoGroupNoList"
      :inProvider='formDataInfo.master.supplierId'
      v-model="salveWindow.showEditWindow"
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
import popup from '@/components/popup/popup'
import inputNumber from '@/components/input-number'
import editWindow from '@/components/edit-window/edit-window'
import eTable from '@/components/e-table/e-table'
import request from '@/libs/request'
import editBaseMixins from '../../mixins/edit'
import optionSearch from '../../components/optionSearch'
import dayjs from 'dayjs'
import Sys from '@/api/sys'
import formControl from '@/components/form-control/form-control'
import purPaperJoinSlave from './edit-purPaperJoinSlave'
import { deepCopy } from 'view-design/src/utils/assist'
const default_formDataInfo = {
  // 主表 更改字段
  master: {
    iisAcc: false,
    carNo: '',
    pjDate: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    accDate: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    iisAudit: 0,
    money: 0,
    ppoRQty: 0,
    pjNumber: '',
    qty: 0,
    rate: 0,
    priceAreaMode:'',
    remark: '',
    shNumber: '',
    status: 1,
    supplierId: 0,
    supplierCode: '',
    supplierName: '',
    taxRat: 0,
    taxTp: '',
    wareHouseItCode:'',
    updateUsername: ''
  }
}
const slavesForm_default = { // 子表单
  name: 'joinItemList', // 子表单名称
  currentRowItem:{},
  ItemFmRowIndex: 0,
  RowItemDataID:-1,
  masterList: [], // 子表列表数据 :纸板入库明细
  SubList: [], // 次1表列表数据
  subCurrentRowData:[],// 子表当前表临时数据,
  SubItems: {}, // 次1表ITEM项目 :纸板入库信息
}
export default {
  name: 'edit-purPaperJoin',
  mixins: [editBaseMixins],
  components: {
    editWindow,
    optionSearch,
    eTable,
    popup,
    purPaperJoinSlave,
    formControl,
    inputNumber
  },
  props:{
    subfromData:{
      type:Array,
      default:''
    }
  },
  data () {
    return {
      masterDeteleList:[],// 第二层删除列表
      subItemDetelteList:[],// 第三层删除列表
      secondTableData:[],// 选择回来的第二层表数据列表,
      slavesForm: deepCopy(slavesForm_default),  // 深拷贝对象和数组,
      disabledSubmitBtn:false,//编辑宽确认按钮
      insertDirection: 'down', // 表单插入方向
      actionSubtitle: '纸板入库', // 当前操作副标题
      salveWindow: {
        flag: null, // 隐藏完结字段
        Tips: '提示：此窗口只显示有供应商纸质/纸板进价的工单！',
        isLoaddingDone: false, // 窗口是否加载完成
        showEditWindow: false, // 是否显示edit-boxSalesOrderSlave 编辑窗口
        action: 'add', // 当前操作功能 添加/编辑
        formDetailData: {} // 当前表单的详细信息
      },
      showContextMenu: true,
      showEditMenu: false,
      id: 0,
      formName: 'stockpurpaperjoinitemFm_new',
      subFormName:'stockpurpaperjoindataFm_new',
      requestBaseUrl: '/stock/purPaperJoin', // 请求 查询 操作的基础路径
      formDataInfo: deepCopy(default_formDataInfo), // 防止添加和更新数据提交发生冲突

      itemInitData: {},
      // 需要验证的数据
      ruleValidate: {
        supplierCode: [
          { required: true, message: '供应商不能为空', trigger: 'blur' }
        ],
        wareHouseItCode: [
          {
            required: true,
            message: '仓位不能为空',
            trigger: 'blur'
          }
        ]
      },
      tableFieldsValidator: {
        qty: [/// ^[0-9]+(\.\d+)?$/;
          {
            required: true,
            message: '本次入库数不能为空',
            trigger: 'blur',
            type: 'number'
          },
          {
            pattern: /^[1-9]\d*$/,
            trigger: 'blur',
            message: '本次入库数必须是正整数'
          }
        ]
      },
      getworkerId: 0,
      cliclleng: null,
      getsupplierCode: 0,
      getppoNoOrder: [false],
      index1: 0, // 工单号里面用
      disppoGroupNo: true, // 工单号禁用字段
      inWsId: null, // 传给用料批次号的参数
      biBatchNoList: '', // 过滤用的字符串传给工单
      ppoGroupNoList: '',
      masterDisabled: false // 主表字段禁用
    }
  },
  computed:{
    showSubContextMenu(){
      if(this.slavesForm.currentRowItem && Object.keys(this.slavesForm.currentRowItem).length>0 && !!this.slavesForm.currentRowItem.workNo){
        return true
      }else{
        return false
      }
    }
  },
  watch: {
    showWindow: function (n, o) {
      if (n) {
        let _self = this
        this.$nextTick(() => {
          // 延迟赋值,不然数据还没有正确返回的情况下,无法绑定默认值
          setTimeout(() => {
            this.setDefaultData()
          }, 1000)
        })
      }
    }
  },
  methods: {
     // 设置默认值
    setDefaultData () {
      //debugger
      this.disabledSubmitBtn = false
      // 判断是否禁用提交按钮
      if (this.action != 'add' && !!this.formDataInfo.master.iisAcc) {
        this.disabledSubmitBtn = true
      }
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
           this.getMasterqty(this.slavesForm.ItemFmRowIndex)
          break
          // 备品数
        case 'prepQtyChangeEvent':
          // 触发修改值 直接修改原始数据 无效
          let isNumber2 = this.myIsNaN(Number(obj.row.prepQty))
          if (!isNumber2 || (obj.row.prepQty + '').substr(0, 1) == '-') {
            this.$Message.error('请输入正数')
            return
          }
         this.$refs['secondTableRef'].set(
            { prepQty: obj.row.prepQty},
            obj.index
          )
           this.sumPrepQty() // 汇总 备品数
          break
        default:
          break
      }
    },
    //汇总 备品数
    sumPrepQty(){
       let totalQty = 0
       this.slavesForm.SubList.forEach(item=>{
         if(Number(item.prepQty)>0){
           totalQty=totalQty+Number(item.prepQty)
         }
       })
       this.$refs['firstTableRef'].set(
          { prepQty: totalQty},
          this.slavesForm.ItemFmRowIndex
        )
    },
     //汇总 本次入库数
    sumTotalQty(){
       let totalQty = 0
       this.slavesForm.SubList.forEach(item=>{
         if(Number(item.qty)>0){
           totalQty=totalQty+Number(item.qty)
         }
       })
       this.$refs['firstTableRef'].set(
          { qty: totalQty},
          this.slavesForm.ItemFmRowIndex
        )
    },
     getMasterheight () {
      return 20
    },
    // 默认选择行数据
    setDefaultSelectedRow(index = 0) {
      let slaveObj = this.$refs["firstTableRef"];
      if (slaveObj) {
        slaveObj.rowClick(index, "row-click");
      }
    },
    beforeSubmit(){
       let dataList = this.slavesForm.masterList
      let totalMoneyIsZeroItemList =[]
      let strList=""
      if(Array.isArray(dataList) && dataList.length>0){
           totalMoneyIsZeroItemList = dataList.filter(item=>{
             return item.money==0 && item.workNo!=''
          })
          if(totalMoneyIsZeroItemList.length>0){
            totalMoneyIsZeroItemList.forEach(item=>{
              if(!!!strList){
                 strList = item.workNo+''
              }else{
                 strList = strList + "," + item.workNo+''
              }
             
            })

             this.$Modal.confirm({
              title: "提示",
              content: `存在金额为0的数据列表,工单号为:[${strList}],是否确认提交?`,
              onOk: () => {
                this.formTableDataSubmit()
              }
            });
          }else{
             this.formTableDataSubmit()
          }
      }
    },
    // 最后提交数据
    formTableDataSubmit(){
       let hasZeroQty = this.checkQtyIsZero()
       if(hasZeroQty){
          this.$Message.error('本次入库数不能为0')
           return
       }
       let url =`/stock/purPaperJoin/saveOrUpdate`
       // 格式化时间>>
       if(!!this.formDataInfo.master.pjDate){
        this.formDataInfo.master.pjDate = dayjs(this.formDataInfo.master.pjDate).format('YYYY-MM-DD HH:mm:ss')
       }
        if(!!this.formDataInfo.master.accDate){
        this.formDataInfo.master.accDate = dayjs(this.formDataInfo.master.accDate).format('YYYY-MM-DD HH:mm:ss')
       }
       let params = {
           master:this.formDataInfo.master,
           joinItemList:this.getJoinItemList()
       }
      // debugger
       request.post(url,params).then(res=>{
          this.infoTips()
       })
    },
    // 校验第三层的本次入库数量 是否为零
    checkQtyIsZero(){
      let hasZeroQty= false
      let joinItemList =[]
      this.slavesForm.masterList.forEach(item=>{
          // 临时数据列表
          let t1_joinDataList = this.secondTableData.filter(lastItem=>{
                return lastItem.parentsId == item.pppmId
          })
          // 编辑数据列表
          let t2_joinDataList = []
          if(!!item.id){
            t2_joinDataList = this.slavesForm.SubItems[item.id]
          }
           joinItemList =joinItemList.concat(t2_joinDataList.concat(t1_joinDataList)) 
      })
      if(joinItemList.length>0){
          joinItemList.forEach(item=>{
            if(Number(item.qty)==0){
              hasZeroQty= true
            }
          })
      }
      return hasZeroQty
    },
    // 获取组合数据列表
    getJoinItemList(){
      let joinItemList =[]
      this.slavesForm.masterList.forEach(item=>{
          // 临时数据列表
          let t1_joinDataList = this.secondTableData.filter(lastItem=>{
                return lastItem.parentsId == item.pppmId
          })
          // 编辑数据列表
          let t2_joinDataList = []
          if(!!item.id){
            t2_joinDataList = this.slavesForm.SubItems[item.id]
          }
          
          let subItem = {
              master:item,
              joinDataList:t2_joinDataList.concat(t1_joinDataList)
          }
          // 工单号 不能为空
          if(!!item.workNo){
             joinItemList.push(subItem)
          }
      })
      // 添加删除的列表数据
      joinItemList = joinItemList.concat(this.masterDeteleList)
      return joinItemList
    },
    // 获取最大本次入库数 = 采购数*（1+百分比）+退货数 rQty-已入库数 inQty
    getmaxstockQty(data){
      if (!!data.stockQty) {
        let masQty = data.stockQty*(1+Number(this.$params.PaperJoinQtyUpLimit)/100)+Number(data.ppoRQty)-Number(data.ppoInQty)
        return Math.ceil(masQty)
      }
      return 1
    },
    // 计算总数量
    getboQtySum () {
      let masterstockqty = 0
      let tableData = this.slavesForm.masterList
      for (let i = 0; i < tableData.length; i++) {
        let stockqty = Number(tableData[i].boiQty)
        if (stockqty) {
          masterstockqty += stockqty
        }
      }
      this.formDataInfo.master.boQty = masterstockqty
    },
    // 本次入库数改变 主表数量改变
    getMasterqty (index) {
      //debugger
      let _self = this
      let fromData = this.$refs['firstTableRef'].get()
      if(!!!fromData[index] || !!!fromData[index].workNo){
        return
      }
      let masterqty = 0
      fromData.filter(item => {
        masterqty += Number(item.qty)
      })
      this.formDataInfo.master.qty = masterqty
       // 单价 = 报价 * 单面积
      let price = 0
       // 金额 = 单价 * 本次入库数	
      let money = 0
      if(!!this.formDataInfo.master.priceAreaMode){
          // 单价=报价
          price = fromData[index].quotePrice
           // 金额 =  单面积 * 本次入库数 * 报价
          money =this.formatSupplierAmtPrice(Number(fromData[index].sArea) * Number(fromData[index].qty) * Number(fromData[index].quotePrice)) 
       }else{
         // 单价 = 单面积*报价，计算出来后，再根据供应商位数控制
         price = this.formatSupplierCtPrice(fromData[index].quotePrice * fromData[index].sArea)
         // 金额 = 单价*本次入库数，计算出来后，再根据供应商位数控制
         money = this.formatSupplierAmtPrice(price * fromData[index].qty) 
       }
       setTimeout(()=>{
           _self.$refs["firstTableRef"].set(
            {
              money: money, // 金额
              price:price // 单价
            },
            index
          );
         },100)
      this.changePriceQty(index)
      this.getppoArea(index)
      
    },
    // 单价>>焦点离开 触发事件
    onBlurprice(index){
       let dataList = this.$refs['firstTableRef'].get()
       let submonny = this.formatSupplierCtPrice(dataList[index].price) // 单价
       this.$refs['firstTableRef'].set({ price:submonny }, index)
       setTimeout(()=>{
         this.changePriceQty(index)
       },300)
    },
    // 单价改变 主表数量改变  price 单价
    changePriceQty (index) {
      //debugger
      let fromData = this.$refs['firstTableRef'].get()
      let submonny = this.formatSupplierCtPrice(fromData[index].price) // 单价
      let sArea = this.formatSupplierCtPrice(fromData[index].sArea) // 单面积
      let quotePrice = this.formatSupplierCtPrice(fromData[index].quotePrice) // 报价
      let qty = fromData[index].qty
      let money = 0
      if(!!this.formDataInfo.master.priceAreaMode){
          // 金额 =  单面积 * 本次入库数 * 单价
          money = this.formatSupplierAmtPrice(Number(fromData[index].sArea) * Number(qty) * Number(fromData[index].price))
      }else{
         // 金额 = 单价 * 本次入库数，计算出来后，再根据供应商位数控制
          money = this.formatSupplierAmtPrice(Number(submonny) * Number(qty))
      }
      this.$refs['firstTableRef'].set({ money: money }, index)
      this.getMastermoney()
    },
    // 获取主表金额
    getMastermoney () {
      let masterMoney = 0
      this.$refs['firstTableRef'].get().filter(item => {
        masterMoney += Number(item.money)
      })
      this.formDataInfo.master.money = masterMoney
    },
    transformation (selectedValue) {
        //debugger 
        //priceAreaMode
      if(!!this.formDataInfo.master.priceAreaMode){
           //单价 = 报价，不用控制位数 
          selectedValue.price = selectedValue.quotePrice
          // 金额 = 单面积 * 本次入库数 * 报价
          selectedValue.money = this.formatSupplierAmtPrice(Number(selectedValue.sArea) * Number(selectedValue.qty) * Number(selectedValue.quotePrice))
      }else{
         // 1、单价 = 单面积*报价，计算出来后，再根据供应商位数控制
          selectedValue.price = this.formatSupplierAmtPrice(Number(selectedValue.sArea) * Number(selectedValue.quotePrice))
         // 2、金额 = 单价 * 本次入库数，计算出来后，再根据供应商位数控制
          selectedValue.money = this.formatSupplierAmtPrice(selectedValue.price * Number(selectedValue.qty))
      }
      selectedValue.rQty = 0  // 重置退货数

      return selectedValue
    },
  
    // 获取工单号过滤字段
    getppoGroupNoList (itemindex) {
      let ppoGroupNoList = ''
      let tabData = this.$refs['firstTableRef'].get()
      let temp = []
		  tabData.forEach((item, index) => {
        if (item && item.pppmId != '' && index != itemindex ) {
          temp.push(item.pppmId)
        }
		  })
		  return temp.toString() // 数组转字符串>>
    },
    // 工单号失去焦点带出参数事件
    onFill (index) { // workNo
      let tabData = this.$refs['firstTableRef'].get()
      let ppoGroupNoList = this.getppoGroupNoList(index)
      // 获取供应商id
      let inProvider = this.formDataInfo.master.supplierId
      // 获取供应商
      let supplierCode = this.formDataInfo.master.supplierCode
      // 获仓位
      let wareHouseItCode = this.formDataInfo.master.wareHouseItCode
      // 获取工单号
      let ppoGroupNo = this.slavesForm.masterList[
        index
      ].workNo
      // 获取当前子表数据
      let two = this.slavesForm.masterList[index]
      let one = this.$refs['firstTableRef'].cloneData[index]
      // 获取子表初始化时的数据
      let defulit = this.initData.initData[this.formName]
      if (!supplierCode) {
        this.$Message.error('供应商不能为空')
        return
      }
      if (!wareHouseItCode) {
        this.$Message.error('仓位不能为空')
        return
      }
      let _this = this
      if (ppoGroupNo) {
        this.ppoGroupNoList = ppoGroupNoList
        let nowData = JSON.parse(JSON.stringify(_this.initData.initData[this.formName]))
        request
          .post(`/stock/paperJoin/getSpPaperPOToPaperJoin`, {
            ppoGroupNo: ppoGroupNo,
            flag: '1',
            inProvider: inProvider,
            ppoGroupNoList
          }).then(res => {
            let data = res.records[0]
            if (data === [] || data === undefined || data === null) {
              _this.$Message.error('工单号错误或已存在')
              // $set(要修改的对象,属性,属性的值是啥)
              _this.$refs['firstTableRef'].set(nowData, index)
              return
            }
            let dataList = _this.transformation(data)
            _this.$refs['firstTableRef'].set(dataList, index)
            _this.getMasterqty(index)//本次入库数改变 
            _this.getppoArea(index)//获取面积
          })
      }
    },
    // 接受工单号传回来的数据
    closeMain (dataList) {
      //debugger
      let selectedValues = dataList.firstTableData // 回传数据
     
      if(this.secondTableData.length>0){
         // 可以分开两次添加
         this.secondTableData = this.secondTableData.concat(dataList.secondTableData) // 回传数据,
      }else{
         this.secondTableData = dataList.secondTableData // 回传数据,
      }
      let pushData = []
      // 获取子表数据
      let sundata = this.$refs['firstTableRef'].get()
      selectedValues.forEach(selectedValue => {
        let transData = this.transformation(selectedValue)
        pushData.push(transData)
      })
      let index2 = this.index1
      for (let a = 0; a < pushData.length; a++) {
        this.$refs['firstTableRef'].set(pushData[a], index2)
        this.getMasterqty(index2)//本次入库数改变 
        this.getppoArea(index2)//获取面积
        index2++
      }
      setTimeout(() => {
        this.setDefaultSelectedRow() 
      }, 300);
    },
    // 计算面积 单面积*本次入库数
    getppoArea(index){
      let FromData = this.$refs['firstTableRef'].get()
      let Nub =Number(FromData[index].qty)
      let sArea =Number(FromData[index].sArea)
      this.$refs['firstTableRef'].set({ppoArea:Nub*sArea},index)
    },
     // 子表点击事件 显示第三层表的数据
    slave_list_table_editRowClick (index,row) {

       this.slavesForm.SubList =[]
       this.slavesForm.currentRowItem =  row
       this.slavesForm.ItemFmRowIndex = index
       // 临时数据列表
       let tempSelectedList = this.secondTableData.filter(item=>{
                return item.parentsId == row.pppmId
       })
       // 编辑表数据列表
       if(!!row.id ){
         //debugger
         let dataList = this.slavesForm.SubItems[row.id]
         // 过滤已经删除的数据列表
         dataList = dataList.filter(item=>{
           if(!item.hasDelete){
                return item
           }
         })
         
         this.slavesForm.subCurrentRowData = dataList
       }else{
         this.slavesForm.subCurrentRowData = []
       }
       

      this.slavesForm.SubList = tempSelectedList.concat(this.slavesForm.subCurrentRowData)
    },
    //检查当前行是否有编辑ID,还是新增加的临时ID
    getCrruentRowData(index){
      let hasRowId=true
      if(this.slavesForm.masterList[index] && this.slavesForm.masterList[index].id){
        this.slavesForm.RowItemDataID = this.slavesForm.masterList[index].id
      }else{
         hasRowId=false
        this.slavesForm.RowItemDataID = this.randomIdExist()
      }
     // 原本数据列表
     if(hasRowId){
         let tempData1= this.slavesForm.SubItems[this.slavesForm.masterList[index].id] // 需要修改的字段 boxCoMainId
         this.slavesForm.subCurrentRowData = tempData1  
      }else{
        // 编辑页面添加数据时
        let tempData1Edit= this.slavesForm.SubItems[this.slavesForm.RowItemDataID] 
        if(!!tempData1Edit){
           this.slavesForm.subCurrentRowData = tempData1Edit
        }else{
           this.slavesForm.SubItems[this.slavesForm.RowItemDataID] = this.slavesForm.SubList
        }

      }
    },
    // 随机生成二级ID >>取得介于 1 到 98 之间的一个随机数
    randomIdExist(){
      let randomId = Math.floor((Math.random()*98)+1);
      return randomId
    },
    // 工单号点击事件
    Slave_list_table_editRowModify (index) {
      let ppoGroupNoList = this.getppoGroupNoList()
      let tabData = this.$refs['firstTableRef'].cloneData
      this.salveWindow.showEditWindow = true
      this.index1 = index
      if (
        this.formDataInfo.master.supplierCode &&
        this.formDataInfo.master.wareHouseItCode
      ) {
        // this.List = this.formDataInfo.master.workerCode;
        let ppuer = this.salveWindow.showEditWindow
        this.salveWindow.isLoaddingDone = true
        this.salveWindow.action = 'add'
        this.ppoGroupNoList = ppoGroupNoList
        var _this = this
        request
          .post(`/stock/paperJoin/getSpPaperPOToPaperJoin`, {
            inProvider: this.getsupplierId,
            ppoGroupNoList,
            pageNum:this.pageConfig.pageNum,//(当前页),
            pageSize:this.pageConfig.pageSize,//(每页显示条数)
            beginDate:dayjs().subtract(15, 'day').format("YYYY-MM-DD"),
            endDate:dayjs().format("YYYY-MM-DD"),
          })
          .then(res => {
             // 添加分页
            if (res && res.records && res.records.length>0) {
              for (let i = 0; i < res.length; i++) {
                if (res.records[i].ppoDate) { res.records[i].ppoDate = res.records[i].ppoDate.replace('T', ' ').replace('.000+0000', '') }
                if (res.records[i].ppoDueDate) { res.records[i].ppoDueDate = res.records[i].ppoDueDate.replace('T', ' ').replace('.000+0000', '') }
              }
              _this.$refs.mychild.getFormInitDataObj(res)
            }
            
          })
      } else {
        this.salveWindow.showEditWindow = false
        if (!this.formDataInfo.master.supplierCode) {
          this.$Message.error('供应商不能为空')
          return
        }
        if (!this.formDataInfo.master.wareHouseItCode) {
          this.$Message.error('仓位不能为空')
        }
      }
    },
    // 判断数据是新增还是修改
    formDetailDataCall () {
      if (this.action != 'add') {
        // debugger
        this.getworkerId = this.formDataInfo.master.workerId
        this.getsupplierId = this.formDataInfo.master.supplierId
        this.masterDisabled = true // 主表字段弹框禁用
        // this.id = this.formDataInfo.master.id;
        this.supplierPriceFormatConfig = {
         amtDot: Number(this.formDataInfo.master.amtDot) , //金额小数位
         ctDot:Number(this.formDataInfo.master.ctDot),// 单价小数位
       }

        // 数据初始化，把第二层表的master组装成一个List结构
      this.slavesForm.masterList = []
      this.slavesForm.SubList = []
      this.slavesForm.SubItems={}
      let _self = this
      let temp_formDetailData = this.formDataInfo[`${this.slavesForm.name}`]
      if(temp_formDetailData!=null){
          temp_formDetailData.forEach((item, index) => {
         _self.slavesForm.masterList.push(item.master)
         _self.slavesForm.SubItems[item.master.id] = item[`joinDataList`]== null ? [] : item[`joinDataList`]
      })
      }
       setTimeout(() => {
        _self.setDefaultSelectedRow() 
      }, 300);
    }
    },
   
    // 当主表客户弹框改变时促发初始化子表数据
    Initializationdata (val) {
      if(!!!val[0].data[val[0].fieldName]){
        return
      }
      this.$refs["formDataInfo"].validateField(val[0].fieldName, err => {});
      if(val[0].fieldName =='supplierCode'){
         this.supplierPriceFormatConfig = {
         amtDot:Number(val[0].orignData.amtDot), //金额小数位
         ctDot:Number(val[0].orignData.amtDot),// 单价小数位
       }
      }
      let tableData = this.$refs['firstTableRef'].getCategorizeData()
      // debugger
      if (this.formDataInfo.master.workerId) {
        if (this.formDataInfo.master.workerId != this.getworkerId) {
          this.slavesForm.masterList = []
          tableData.deleteList = tableData.updateList
        }
        this.getworkerId = this.formDataInfo.master.workerId
      }
      if (this.formDataInfo.master.supplierId) {
        if (this.formDataInfo.master.supplierId != this.getsupplierId) {
          this.slavesForm.masterList = []
          tableData.deleteList = tableData.updateList
        }
        this.getsupplierId = this.formDataInfo.master.supplierId
      }
      //this.$forceUpdate()
    },
    // 判断主表供应商弹框不能为空
    clickValuedate () {
      // debugger
      if (
        !this.formDataInfo.master.supplierCode ||
        this.formDataInfo.master.supplierCode == ''
      ) {
        this.$Message.error('供应商编号不能为空')
        return false
      }
      return true
    },
    // 重写父类,添加时候,清空数据
    HandleFormDataInfo () {
      this.formDataInfo = deepCopy(default_formDataInfo)
      this.$forceUpdate()
    },
   
    slave_list_table_addRow(index,row){
       // debugger
    },
    slave_list_table_editRowAdd(index,row){
       debugger
    },
    sub_list_table_addRow(index,row){
       // debugger
    },
    sub_list_table_editRowAdd(index,row){
       //debugger
    },
    // 第三层表,删除回调
    sub_list_table_edit_Delete(index,row){
      //debugger
      let groupFlag = row.groupNo+row.mateWorkNo+row.workNo
      if(!!!row.id){
          // 删除缓存中指定的数据
          let leftDataList = this.secondTableData.filter(item=>{
              let itemGroupFlag = item.groupNo+item.mateWorkNo+item.workNo
              if(itemGroupFlag != groupFlag){
                return item
              }
          })
          this.secondTableData = leftDataList
      }else{
         row.hasDelete = true // 设置编辑中的数据为删除状态
         this.slavesForm.SubItems[row.paperJoinItemId] = this.slavesForm.SubItems[row.paperJoinItemId].map(item=>{
                 if(item.id == row.id){
                    item = row 
                 }
                 return item
         })
      }
       this.sumPrepQty() // 汇总 备品数
       this.sumTotalQty() // 汇总 本次入库数
       this.getMasterqty(this.slavesForm.ItemFmRowIndex)
    },
    // 删除 回调事件(二级主表)
    slave_list_table_edit_Delete (index,row) {
        let _self = this
        this.setMasterDeteleList(row)
        this.deleteSubListItem(row)
        setTimeout(() => {
          _self.setDefaultSelectedRow() 
        }, 100);
        // (重新计算体积/面积/金额等)
         this.getMasterqty(index)
       this.getMastermoney()
      
    },
    // 删除对应的子表数据列表(三级子表)
    deleteSubListItem(row){
      // 临时数据列表
      let t1_joinDataList = this.secondTableData.filter(item=>{
            return item.parentsId != row.pppmId
      })
      this.secondTableData = t1_joinDataList
    },
    // 设置第二层删除列表
    setMasterDeteleList(row){
      if(!!row.id){
        row.hasDelete=true
        let subItem = {
            master:row,
            joinDataList:this.slavesForm.SubItems[row.id]
        }
        this.masterDeteleList.push(subItem)
      }
    },
      // 重写父类 关闭窗口时 触发事件
    closeActionTigger () {
      // fix 清除上次的错误提示 formDataInfo 为表单ref名称
      this.$refs['formDataInfo'].resetFields()
      this.masterDeteleList = []
      this.subItemDetelteList = []
      this.secondTableData =[]
      this.slavesForm=deepCopy(slavesForm_default),  // 深拷贝对象和数组,
      this.$refs['firstTableRef'].reset()
      this.$refs['secondTableRef'].reset()
    },
    // 打开窗口触发
    openActionTigger(){
      this.disabledSubmitBtn = false
      let _self = this
      if (this.action!='add'&&!!this.subfromData.length) {
        this.subfromData.filter(item=>{
          if(!!item.iisAcc){
            _self.disabledSubmitBtn = true
          }
        })
      }
    },
  },
 

}
</script>

<style>
/* .cl-edit-paperJoin .ivu-form-item {
  margin-bottom: 5px !important;
} */
.cl-edit-paperJoin .ivu-select-item {
  display: block;
}
/* .cl-edit-paperJoin .ivu-input-type-text{
  width: 200px
} */
.cl-edit-paperJoin .right-text {
  width: 500px;
}

</style>

<style>
.masterHeightClass {
  height: 20%;
  overflow: auto;
  /* //border: 1px solid red; */
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
