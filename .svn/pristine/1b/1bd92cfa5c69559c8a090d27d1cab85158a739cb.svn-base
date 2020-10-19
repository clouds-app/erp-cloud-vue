<template>
  <div>
    <editWindow
      class="cl-edit-vendInvoiceCheck"
      :title="actionLableName"
      v-model="showWindow"
      :fullscreen="true"
      width="90%"
      :loading="!isLoaddingDone"
      :spinLoaddingText="spinLoaddingText"
      @on-ok="formTableDataSubmit()"
      v-if="initData.columns"
      :disabledSubmitBtn="disabledSubmitBtn"
    >
    <div @contextmenu.prevent ref="masterHeight" class="masterHeightClass" :style="{ height: getMasterheight() + '%' }" >
      <Form
          ref="formDataInfo"
          :show-message="true"
          :model="formDataInfo.master"
          :rules="masterRuleValidate"
          :label-width="100"
          :disabled="detailDisabled"
      >
           <Row type="flex">
            <Col span="6">
                <FormItem label="收票单号" prop="vicNo">
                    <Input :disabled="true" v-model="formDataInfo.master.vicNo" maxlength="80" placeholder="收票单号"></Input>
                </FormItem>
            </Col>
            <Col span="6">
                <FormItem  label="收票日期" prop="vicDate">
                   <DatePicker
                    @on-change="onChange_vicDate"
                   transfer
                   :clearable="false"
                    :value="formDataInfo.master.vicDate"
                    type="date"
                    format="yyyy-MM-dd"
                  ></DatePicker>
                </FormItem>
            </Col>
            <Col span="6">
                <FormItem label="供应商编号" prop="supplierCode">
                  <popup
                  ref='firstFocusInput'
                    v-model="formDataInfo.master.supplierCode"
                    field-name="supplierCode"
                   :disabled="detailDisabled"
                    popup-name="SupplierSingleBox"
                    :fill-model.sync="formDataInfo.master"
                    render-fields="supplierId,supplierCode,supplierName,coinCode,coinId"
                    from-fields="id,purCode,purName,coinCode,coinId"
                    :suffix="true"
                    :suffix-model="formDataInfo.master.supplierName"
                    @on-fill="supplierCodeOnFillEvent"
                    />
                </FormItem>
            </Col>
            <!-- <Col span="6">
                <FormItem label="业务员" >
                     <Input :disabled="true" v-model="formDataInfo.master.workName" maxlength="40" placeholder="业务员"></Input>
                </FormItem>
            </Col> -->
            <Col span="6">
            <FormItem label="票据类型" prop="invoiceType">
               <optionSearch
                    @onChange="optionOnChangeBy"
                    :defaultItem="formDataInfo.master.invoiceType"
                    :loaddingDataWhen="showWindow"
                    formKey="invoiceType"
                    query="icInvoiceX"
                  />
            </FormItem>
            </Col>
            <Col span="6">
                <FormItem label="发票编号" prop="invoiceNo">
                   <Input  v-model="formDataInfo.master.invoiceNo" maxlength="40" placeholder="发票编号"></Input>
                </FormItem>
            </Col>
              <Col span="6">
                <FormItem label="发票时间" prop="invoiceDate">
                     <DatePicker
                    @on-change="onChange_invoiceDate"
                    transfer
                    :clearable="false"
                    :value="formDataInfo.master.invoiceDate"
                    type="date"
                    format="yyyy-MM-dd"
                  ></DatePicker>
                </FormItem>
            </Col>
              <Col span="6">
                <FormItem label="发票说明" prop="vicExplain">
                  <Input  v-model="formDataInfo.master.vicExplain" maxlength="80" placeholder="发票说明"></Input>
                </FormItem>
            </Col>
             <Col span="6">
           <FormItem label="付款日期" prop="pmDate">
                   <DatePicker
                    @on-change="onChange_pmDate"
                    transfer
                    :clearable="false"
                    :value="formDataInfo.master.pmDate"
                    type="date"
                    format="yyyy-MM-dd"
                  ></DatePicker>
                </FormItem>
            </Col>
             <Col span="6">
                <FormItem label="发票金额" prop="vicAmt">
                  <InputNumber   :disabled="true" placeholder="发票金额" :min="0" v-model="formDataInfo.master.vicAmt"/>
                </FormItem>
            </Col>
              <Col span="6">
                <FormItem label="已冲金额" prop="writeOffAmt">
                  <InputNumber   :disabled="true" placeholder="已冲金额" :min="0" v-model="formDataInfo.master.writeOffAmt"/>
                </FormItem>
            </Col>
              <Col span="6">
                <FormItem label="未冲金额" prop="notWriteOffAmt">
                  <InputNumber   :disabled="true" placeholder="未冲金额" :min="0" v-model="formDataInfo.master.notWriteOffAmt"/>
                </FormItem>
            </Col>
            <Col span="6">
                <FormItem label="备注" prop="remark">
                   <Input v-model="formDataInfo.master.remark" maxlength="80" placeholder="备注"></Input>
                </FormItem>
            </Col>

            </Row>
        </Form>
      </div>
         <div ref="otherHeight" class="otherHeightClass">
        <Tabs>
            <TabPane label="收票明细" name="accountvendInvoiceitem">
                <eTable
                ref="slave_list_table_edit"
                unqiue-mark="id"
                :height="otherHeight-40"
                :index-menu="true"
                :col-start="0"
                :row-init-data="initData.initData[`${functionParams.formInitPreName}itemFm`]"
                :data="formDataInfo['vicItems'].defaultList"
                :rules="slaveTableFieldsValidator"
                @row-delete='slave_list_table_edit_Delete'
                @row-click="slave_list_table_editRowClick"
                @tableColTiggerEventCall="tableColTiggerEventCall"
            >
            <template slot="head">
              <tr v-for="(columnGroup,index) in initData.columns[`${functionParams.formInitPreName}itemFm`].editGroups" :key="index">
                    <template  v-for="(column,index2) in columnGroup" >
                        <th v-if="excludeFiled('itemFm',column.key)"
                        :key="index2" :class="`ivu-table-column-${column.titleAlign}`"
                        :width="column.editWidth"
                        :colspan="column.colSpan"
                        :rowspan="column.rowSpan"
                        :columnKey="column.key"
                        >
                        <div  class="ivu-table-cell">
                        <span class="">{{column.title}}</span>
                        </div>
                    </th>
                    </template>
                </tr>
            </template>
            <template
              slot="body"
              slot-scope="{ row, index,valueChangeAssign,tableColTiggerEvent }"
            >
             <template  v-for="(column,subIndex) in initData.columns[`${functionParams.formInitPreName}itemFm`].editColumns">
                   <td :key="subIndex" :class="`ivu-table-column-${column.align}`" v-if="excludeFiled('itemFm',column.key)" :width="column.editWidth">
                     <!-- 控件特殊处理 单据编号 -->
                      <template v-if="column.key =='billNo'">
                        <Input v-model="row[column.key]"  :disabled="!!row[column.key]"  @input="value => {valueChangeAssign(value, index, row,column.key)}" >
                            <Icon @click="openProductsList()"  slot="suffix" type="md-add" v-show="!detailDisabled"/>
                        </Input>
                     </template>
                     <!-- 单据类型 -->
                      <Select @on-change="value => {valueChangeAssign(value, index, row,column.key)}" :disabled="true" v-else-if="column.key == 'billType'" v-model="row[column.key]" transfer>
                        <Option v-for="(item,index) in accPayItemBillTypeList" :key="index" :value="item.dicValue+''">{{item.dicLabel}}</Option>
                      </Select>
                        <!-- 控件特殊处理 开票货币 -->
                    <template v-else-if="column.key == 'coinName'">
                       <popup
                          @on-fill="coinRateOnFillEvent"
                          v-model="row.coinName"
                          field-name="coinName"
                          popup-name="CoinSingleBox"
                          :fill-model.sync="formDataInfo['vicItems'].defaultList"
                          render-fields="coinId,coinCode,coinName,originCoinRate"
                          from-fields="id,coinCode,coinName,coinRate"
                          :index="index"
                          :init-data="initData.initData[`${functionParams.formInitPreName}itemFm`]"
                      ></popup>
                    </template>
                    <!-- 汇率 coinRate-->
                    <template v-else-if="column.key === 'coinRate'">
                      <Input
                        v-model="row[column.key]"
                        @input="
                          tableColTiggerEvent(
                            row,
                            column,
                            index,
                            'coinRateChangeEvent'
                          )
                        "
                      >
                      </Input>
                    </template>
                      <!-- 发票金额-->
                     <template  v-else-if="column.key ==='icAmt'">
                        <Input v-model="row[column.key]"   @input="tableColTiggerEvent(row,column,index,'icAmtChangeEvent')">
                        </Input>
                    </template>
                       <!--其它 控件 :placeholder="column.title"-->
                     <template v-else>
                      <formControl :align="column.align" :control-type="column.controlType"
                        v-model="row[column.key]"
                         :disabled="column.readOnly"
                        @input="value => {valueChangeAssign(value, index, row,column.key)}"
                      ></formControl>
                     </template>
                  </td>
             </template>
            </template>
             </eTable>
            </TabPane>
        </Tabs>
        </div>
    </editWindow>
    <editForm
     ref="editForm"
      @on-cancel="onCancelEditForm"
      @submit-success="onSubmitEditForm"
      :isLoaddingDone="salveWindow.isLoaddingDone"
      :action="salveWindow.action"
      v-model="salveWindow.showEditWindow"
      :searchParams="searchParams"
    />
  </div>
</template>

<script>
/**
 * @desc edit-vendInvoiceCheck 描述 收票登记
 * 所有重要 可以重用的方法 放在了基类,继承即可用重复使用 editBaseMixins,
 * 可以根据需求重写所需的方法:
 *
 * @params 参数
 *
 * @return 返回
 *
 * @author mingxing
 *
 * @created 2020/05/20
 */
import popup from '@/components/popup/popup'
import editWindow from '@/components/edit-window/edit-window'
import eTable from '@/components/e-table/e-table'
import request from '@/libs/request'
import editBaseMixins from '../../mixins/edit'
import optionSearch from '../../components/optionSearch'
import InputNumber from '@/components/input-number'
import dayjs from 'dayjs'
import Sys from '@/api/sys'
import editForm from './edit-vendInvoiceCheckSlave'
import formControl from '@/components/form-control/form-control'
import { deepCopy } from 'view-design/src/utils/assist'
const default_formDataInfo = {
  // 主表 更改字段
  master: {
    supplierCode: '',
    supplierId: 0,
    supplierName: '',
    invoiceDate: new Date(dayjs().format('YYYY-MM-DD')),
    vicDate: new Date(dayjs().format('YYYY-MM-DD')),
    invoiceNo: '',
    invoiceType: '',
    invoiceTypeText: '',
    vicAmt: 0,
    icNo: '',
    vicExplain: '',
    notwriteOffAmt: 0,
    remark: '',
    pmDate: '',
    writeOffAmt: 0
  },
  vicItems: {
    addList: [], // 添加列
    defaultList: [], // 默认列
    deleteList: [], // 删除列
    updateList: []
  }
}
export default {
  name: 'edit-vendInvoiceCheck',
  mixins: [editBaseMixins],
  components: {
    editForm,
    editWindow,
    optionSearch,
    eTable,
    InputNumber,
    popup,
    formControl
  },
  data () {
    return {
      currentIndex:0,// 当前表格选择行
      accPayItemBillTypeList: [], // 单据类型
      disabledSubmitBtn: false, // 是否禁用确认按钮
      formName: 'accountvendinvoicecheckFm', // 重写父类 查询表单名称 accountvendinvoicecheckFm
      // 查询配置参数
      functionParams: {
        formInitPreName: 'accountvendinvoicecheck', // 查询表格列头信息 前缀 例如:saleboxproductprice Fm/itemFm/mdataFm
        requestBaseUrl: '/account/vendInvoiceCheck', // 查询 表格行 数据 接口前缀地址
        uniqueId: 'vicId' // 查询详细的唯一ID,需要顶部查询中使用
      },
      actionSubtitle: '收票登记', // 重写父类 当前操作副标题
      salveWindow: {
        isLoaddingDone: false, // 窗口是否加载完成
        showEditWindow: false, // 是否显示edit-invoiceCheckSlave 编辑窗口
        action: 'add' // 当前操作功能 添加/编辑
      },
      formDataInfo: deepCopy(default_formDataInfo), // Object.assign({}, default_formDataInfo), // 防止添加和更新数据提交发生冲突
      masterRuleValidate: {
        supplierCode: [{ required: true, message: '供应商编号不能为空', trigger: 'blur' }]
        //  brDate: [{ required: true,type:'date', message: '送货日期不能为空', trigger: 'blur' }],
        //  brMonthDate: [{ required: true,type:'date', message: '月结日期不能为空', trigger: 'blur' }]
      }, // 纸箱出货 需要验证的数据
      slaveTableFieldsValidator: {}, // 纸箱出货明细 需要验证的数据
      masterHeight: 0, // 表单高度
      otherHeight: 0, // 剩余高度
      searchParams: {}, // 传递查询参数
      boxReTypeList: [], // 退仓类型 列表
      disabledCustCode: false// 是否禁用 客户编号
    }
  },
  props: {
    rowData: {
      type: Object,
      default: ''
    }
  },
  watch: {
     showWindow:function(n,o){
        if(n){
          let _self = this
          this.$nextTick(()=>{
            //  this.registerEvent()
            //  this.pageResize()
               // 延迟赋值,不然数据还没有正确返回的情况下,无法绑定默认值
              setTimeout(() => {
                  this.setDefaultData()
              }, 1000);
          })
        }
      },
  },
  created () {
    this.getItemBillTypeList()
  },
  methods: {
     // 开票货币 回填触发事件 最大保留6位小数,不足六位>>不补零
    coinRateOnFillEvent(item){
     // debugger
       let newCoinRate = (item[0].data.billCoinRate/item[0].orignData.coinRate)
       newCoinRate =this.formatAmountByType(newCoinRate,6) //最大保留6位小数,不足六位>>不补零 
       let currentIciInvMoney = (Number(item[0].data.icAmt) * newCoinRate) // 未开票金额 * 汇率
       let newInvoiceCoinRate = (item[0].orignData.coinRate)// 开票货币 汇率 
       currentIciInvMoney  = this.formatAmountByTypeWith(currentIciInvMoney)
       this.$refs['slave_list_table_edit'].set(
                   { 
                    coinRate: newCoinRate,
                    invoiceCoinRate:newInvoiceCoinRate,// 开票货币 汇率
                    //icAmt: currentIciInvMoney,
                    coinAmt:currentIciInvMoney,
                    },
                  item[0].index
                )
        this.sumTotalMoney()         
    },
      // 工单列表行点击事件回调
    slave_list_table_editRowClick(index) {
      this.currentIndex = index
    },
    // 打开编辑框调用
    openActionTigger () {
      if (this.action === 'update') {
        if (this.rowData.writeOffAmt > 0) {
          this.disabledSubmitBtn = true
          return
        }
      }
      this.disabledSubmitBtn = false
    },
    getItemBillTypeList () {
      // 获取  费用类型
      this.getDataFromDictionaryBy('viciBillType').then(res => { // iciNoType
        this.accPayItemBillTypeList = res
      })
    },
    // 弹框==确认==回调事件,返回选择的数据
    onSubmitEditForm (dataList) {
      // debugger
      if (dataList && Array.isArray(dataList) && dataList.length > 0) {
        this.disabledCustCode = true // 禁用客户选择
        dataList = this.itemAdapter(dataList)
        let defaultList = this.formDataInfo['vicItems'].defaultList
        if (defaultList[0].billNo == '') {
          this.formDataInfo['vicItems'].defaultList = dataList
        } else {
          dataList.forEach(item => {
            if (!this.checkIsExistBy(item)) {
              defaultList.push(item)
            }
          })
          // 删除多余的空行
          defaultList.forEach((item, index) => {
            if (item.billNo == '' || item.billNo == null) {
              defaultList.splice(index, 1)
            }
          })
        }
      }
      this.sumTotalMoney()
    },
    // 检查列表数据是否已经存在,避免重复添加
    checkIsExistBy (item) {
      // debugger
      let isExistIndex = this.formDataInfo['vicItems'].defaultList.findIndex(subItem => {
        return (subItem.billNo == item.billNo && subItem.iciNoTypeText == item.iciNoTypeText)
      })
      if (isExistIndex != -1) {
        return true
      } else {
        return false
      }
    },
    // 实体转换,获取相同Key的value,个别不同的手动修改值
    itemAdapter (dataList) {
      // debugger
      let newDataList = []
      dataList.forEach(oldItem => {
        let newItem = JSON.parse(JSON.stringify(this.initData.initData[`${this.functionParams.formInitPreName}itemFm`]))
        let newItemKeys = Object.keys(newItem)
        newItemKeys.forEach(itemKey => {
          newItem[itemKey] = null
          if (oldItem[itemKey] || oldItem[itemKey] ==0 || oldItem[itemKey]=='0'){
            newItem[itemKey] = oldItem[itemKey]
          }
        })
        // 发票金额 如何为空默认设置为0
        if (!oldItem.icAmt) {
          newItem.icAmt = 0
        }
        // 实际金额 如何为空默认设置为0
        if (!oldItem.actualAmt) {
          newItem.actualAmt = 0
        }
        // 已开发票金额 如何为空默认设置为0
        if (!oldItem.invoicedAmt) {
          newItem.invoicedAmt = 0
        }
        // 未开发票金额 如何为空默认设置为0
        if (!oldItem.notInvoicedAmt) {
          newItem.notInvoicedAmt = 0
        }
        // 未开发票金额 = 实际金额-已开金额
        if (Number(oldItem.notInvoicedAmt) != 0) {
          newItem.icAmt = Number(newItem.actualAmt) - Number(newItem.invoicedAmt)
        }
        // 默认 未开发票金额 = 发票金额 却不能大于 未开发票金额
        // if(Number(oldItem.invoicedAmt)==0){
        //   newItem.invoicedAmt = oldItem.notInvoicedAmt
        // }
           // 	汇率金额 如何为空默认设置为0 汇率金额= 开票金额 * 汇率
        if (!oldItem.coinAmt) {
         // debugger
          newItem.coinAmt = Number(newItem.icAmt) * Number(newItem.billCoinRate)
        }
        //= ===== 额外需要转换的字段S=======
        newItem.iciZk = oldItem.discount // 折扣
        newItem.iciMoney = oldItem.vicAmt // 单据金额

          newItem.coinName = oldItem.billCoinName
          newItem.coinCode = oldItem.billCoinCode
          newItem.coinId = oldItem.billCoinId
          newItem.coinRate = oldItem.billCoinRate // 转后货币后的汇率
          newItem.invoiceCoinRate = oldItem.billCoinRate 
        //= ===== 额外需要转换的字段E=======
        newDataList.push(newItem)
      })
      return newDataList
    },
    // 弹框==取消==回调事件
    onCancelEditForm () {
      // debugger
    },
    // 订单编号 点击事件,打开选择产品列表窗口
    openProductsList () {
      // debugger
      this.selectedNoList = ''
      this.formDataInfo['vicItems'].defaultList.forEach(item => {
        if (this.selectedNoList == '') {
          this.selectedNoList = item.billNo // (单据编号)
        } else {
          this.selectedNoList += ',' + item.billNo
        }
      })
      this.searchParams = {
        supplierId: this.formDataInfo.master.supplierId, // 客户id
        billNoList: this.selectedNoList// (过滤已选的工单号集合,多个都好隔开)
      }
      if (this.popupClickValidator()) {
        this.salveWindow.showEditWindow = true
      }
    },
    // 纸箱退货明细 删除数据 回调
    slave_list_table_edit_Delete (index) {
      // debugger
      this.sumTotalMoney()
    },

    // 初始值 设置
      setDefaultData(){
          this.amountFormatConfig = {
            decimalPls: Number(this.formDataInfo.master.amtDot) , // 保留小数位 最大6
            carryMode:Number(this.formDataInfo.master.amtType) //进位方式:carryMode:0 四舍五入,1:只舍不进,2:只进不舍
        }
          //debugger
        // let writeOffAmt = Number(this.formDataInfo.master.writeOffAmt)
        // if(writeOffAmt>0){
        //   this.disabledSubmitBtn = true
        // }else{
        //   this.disabledSubmitBtn = false
        // }
        // if(!!!this.formDataInfo.master.invoiceType){
        //   this.formDataInfo.master.invoiceType='01'
        // }
        // if(!!this.formDataInfo.master.vicDate){
        //   this.formDataInfo.master.vicDate = new Date(dayjs(this.formDataInfo.master.vicDate).format("YYYY-MM-DD"))
        // }
     },
    onChange_vicDate (item) {
      // debugger
      if (!_.isEmpty(item)) {
        this.formDataInfo.master.vicDate = new Date(item)
      }
    },
    onChange_invoiceDate (item) {
      // debugger
      if (!_.isEmpty(item)) {
        this.formDataInfo.master.invoiceDate = new Date(item)
      }
    },
    onChange_pmDate (item) {
      // debugger
      if (!_.isEmpty(item)) {
        this.formDataInfo.master.pmDate = new Date(item)
      }
    },
    // 表格列值改变 回调事件处理event：{row, column, index, event,config}
    tableColTiggerEventCall (obj) {
      debugger
        // 发票金额 不能大于 未开发票金额
      let icAmt = Number(obj.row.icAmt) // 发票金额
      let notInvoicedAmt = Number(obj.row.notInvoicedAmt) // 未开发票金额
      let currentIciInvMoney = (icAmt *  Number(obj.row.coinRate)) //转换为相同货币后的最大开票金额
      currentIciInvMoney = this.formatAmountByTypeWith(currentIciInvMoney)
      switch (obj.event) {
         case `coinRateChangeEvent`:
            this.$refs['slave_list_table_edit'].set(
                  { 
                  coinAmt: currentIciInvMoney
                  },
                 obj.index
              )
            break
        case 'icAmtChangeEvent':
        
          if (icAmt > notInvoicedAmt) {
            // this.$Message.warning('发票金额 不能大于 未开发票金额')
            this.$Modal.warning({
              width: '360',
              title: '警告',
              content: `发票金额 不能大于 未开票金额`,
              onOk: () => {
                this.$refs['slave_list_table_edit'].set({ icAmt: 0,coinAmt:0 }, obj.index)
                //this.sumTotalMoney()
              }
            })
          } else {
            // 触发修改值 直接修改原始数据 无效
            this.$refs['slave_list_table_edit'].set({  icAmt:obj.row.icAmt,coinAmt: currentIciInvMoney }, obj.index)
          }
        //  this.sumTotalMoney()
          break
        default:
          break
      }
        setTimeout(()=>{
              this.sumTotalMoney()
          },1000)
    },
    // 汇总总金额
    sumTotalMoney () {
      let totolMoney = 0
      this.formDataInfo['vicItems'].defaultList.forEach((item, index) => {
        let currentRowMoney = Number(item.coinAmt = null ? 0 : item.coinAmt)
        totolMoney = totolMoney + currentRowMoney
      })
      if ((totolMoney + '').indexOf('.') != -1) {
        totolMoney = totolMoney.toFixed(2)
      }
      // 设置主表 总金额
      this.formDataInfo.master.vicAmt = totolMoney
      // 设置主表 未冲金额
      this.formDataInfo.master.notWriteOffAmt = totolMoney
    },
    // 验证产品编号选择前先选择客户
    popupClickValidator () {
      // debugger
      if (!this.formDataInfo.master.supplierCode || this.formDataInfo.master.supplierCode == '') {
        this.$Message.error('请先选择客户编号')
        return false
      }
      return true
    },
    supplierCodeOnFillEvent (item) {
      // debugger
      // 切换用户,清除明细信息
      this.$refs["formDataInfo"].validateField("supplierCode", err => {});
      let dataList = this.formDataInfo['vicItems'].defaultList
      if (dataList.length > 0) {
        if (dataList[0].billNo != null && dataList[0].billNo != '') {
          this.$refs['slave_list_table_edit'].deleteAllData() // 仅仅记录删除记录,
          this.formDataInfo['vicItems'].defaultList = []
        }
      }
     this.amountFormatConfig = {
           decimalPls: item[0].orignData.amtDot , // 保留小数位 最大6
           carryMode:Number(item[0].orignData.amtType) //进位方式:carryMode:0 四舍五入,1:只舍不进,2:只进不舍
      }
    },
    // 排除不需要显示的字段
    excludeFiled (type, key) {
      let exListItemFm = []
      let exList = []
      switch (type) {
        case 'itemFm':
          exList = exListItemFm
          break
        default:
          exList = exListOtherfeeFm
          break
      }
      if (exList.includes(key)) {
        return false
      } else {
        return true
      }
    },
    // // 注册窗口事件
    //   registerEvent(){
    //      let _self = this;//赋值vue的this
    //       window.onresize = ()=>{
    // 　　　　//调用methods中的事件
    //         _self.pageResize();
    //     }
    //   },
    // 触发窗口大小变化事件
    pageResize () {
      this.$nextTick(() => {
        this.getTabWindowHeight()
      })
    },
    // 获取当前TAB标签的实际高度
    getTabWindowHeight () {
      this.getMasterheight()
      // 因为使用V-SHOW 隐藏,实际还会占用高度,所以切换时,设置为0 或使用V-IF 可以不用那么麻烦,但性能较低
      if (this.$refs['masterHeight']) {
        this.masterHeight = this.$refs['masterHeight'].offsetHeight
        this.otherHeight = this.$refs['otherHeight'].offsetHeight
      }
    },
    getMasterheight () {
      return 30
    },
    // 重写父类 关闭窗口时 触发事件
    closeActionTigger () {
      // fix 清除上次的错误提示 formDataInfo 为表单ref名称
      this.$refs['formDataInfo'].resetFields()
      this.$refs['slave_list_table_edit'].reset()
    },
    // 重写父类,添加时候,清空数据
    HandleFormDataInfo () {
      this.formDataInfo = deepCopy(default_formDataInfo)
    },
    // 重写父类,修改提交数据
    resetformDataInfo (_data) {
      // debugger
      let vicItems = this.$refs['slave_list_table_edit'].getCategorizeData()
      this.formDataInfo['vicItems'] = vicItems
      if (this.formDataInfo.master.invoiceDate) {
        this.formDataInfo.master.invoiceDate = dayjs(this.formDataInfo.master.invoiceDate).format('YYYY-MM-DD HH:mm:ss')
      }
      if (this.formDataInfo.master.vicDate) {
        this.formDataInfo.master.vicDate = dayjs(this.formDataInfo.master.vicDate).format('YYYY-MM-DD HH:mm:ss')
      }
      if (this.formDataInfo.master.pmDate) {
        this.formDataInfo.master.pmDate = dayjs(this.formDataInfo.master.pmDate).format('YYYY-MM-DD HH:mm:ss')
      }
      return this.formDataInfo
    },
    //开票明细中的开票货币只能是同一种
    checkAllCoinsAreDiff(){
      //debugger
      let dataList = this.formDataInfo['vicItems'].defaultList
      if(dataList && dataList.length>0){
         let firstCoinCode = dataList[0].coinCode
         let hasDiff = dataList.every(item=>{
           return item.coinCode == firstCoinCode
         })
         return !hasDiff
      }
     
      return false

    },
    // 提交主从表数据
    formTableDataSubmit () {
       if(this.checkAllCoinsAreDiff()){
        this.$Message.warning('开票货币必须一致!')
        return
      }
      this.$refs['formDataInfo'].validate(valid => {
        if (!valid) {
          return
        }
        let submitData = this.resetformDataInfo()
        request.post(`${this.functionParams.requestBaseUrl}/saveOrUpdate`, submitData).then(res => {
          this.showWindow = false // 关闭当前编辑页面
          this.$Message.success('执行成功')
          this.$emit('submit-success') // 刷新主页面数据
        })
      })
    }
  }

}
</script>

<style>
.masterHeightClass{
  height: 30%;overflow:auto
}
.otherHeightClass{
  height: 70%;overflow:hidden
}
.cl-edit-vendInvoiceCheck .ivu-form-item-label {
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
