<template>
  <div>
    <editWindow
      class="cl-edit-invoiceCheck"
      :title="actionLableName"
      v-model="showWindow"
      :fullscreen="false"
      width="80%"
      :loading="!isLoaddingDone"
      :spinLoaddingText="spinLoaddingText"
      @on-ok="formTableDataSubmit()"
      v-if="initData.columns"
      :disabledSubmitBtn="disabledSubmitBtn"
    >
      <div
        @contextmenu.prevent
        ref="masterHeight"
        class="masterHeightClass"
        :style="{ height: getMasterheight() + '%' }"
      >
        <Form
          ref="formDataInfo"
          :show-message="true"
          :model="formDataInfo.master"
          :rules="masterRuleValidate"
          :label-width="90"
          :disabled="detailDisabled"
        >
          <Row>
            <Col span="8">
              <FormItem label="冲销单号" prop="owoNo">
                <Input
                  :disabled="true"
                  v-model="formDataInfo.master.owoNo"
                  maxlength="80"
                  placeholder="冲销单号"
                ></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="单据日期" prop="owoDate">
                <DatePicker
                  @on-change="onChange_owoDate"
                  transfer
                  :clearable="false"
                  :value="formDataInfo.master.owoDate"
                  type="date"
                  format="yyyy-MM-dd"
                ></DatePicker>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem
                :label-width="100"
                label="供应商编号"
                prop="supplierCode"
              >
                <popup
                  v-model="formDataInfo.master.supplierCode"
                  field-name="supplierCode"
                  :disabled="false"
                  popup-name="SupplierSingleBox"
                  :fill-model.sync="formDataInfo.master"
                  render-fields="supplierId,supplierCode,supplierName,taxRate,taxType,coinId,rate"
                  from-fields="id,purCode,purName,taxRate,taxTP,coinId,coinRate"
                  :suffix="true"
                  :suffix-model="formDataInfo.master.supplierName"
                  @on-fill="custCodeOnFillEvent"
                />
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="冲销金额" prop="owoAmt">
                <InputNumber
                  :disabled="true"
                  placeholder="冲销金额"
                  :min="0"
                  v-model="formDataInfo.master.owoAmt"
                >
                </InputNumber>
              </FormItem>
            </Col>
            <Col span="16">
              <FormItem label="备注" prop="remark">
                <Input
                  v-model="formDataInfo.master.remark"
                  maxlength="80"
                  placeholder="备注"
                ></Input>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
      <div ref="otherHeight" class="otherHeightClass">
        <Tabs>
          <TabPane label="收票明细" name="writeOffInItems">
            <eTable
              ref="slave_writeOffInItems_table_edit"
              unqiue-mark="id"
              :height="400"
              :index-menu="true"
              :col-start="0"
              :row-init-data="
                initData.initData[`${functionParams.formInitPreName}InFm`]
              "
              :data="formDataInfo['writeOffInItems'].defaultList"
              :rules="slaveTableFieldsValidator"
              @row-delete="slave_writeOffInItems_table_edit_Delete"
              @tableColTiggerEventCall="tableColTiggerEventCall"
            >
              <template slot="head">
                <tr
                  v-for="(columnGroup, index) in initData.columns[
                    `${functionParams.formInitPreName}InFm`
                  ].editGroups"
                  :key="index"
                >
                  <template v-for="(column, index2) in columnGroup">
                    <th
                      v-if="excludeFiled('InFm', column.key)"
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
                  valueChangeAssign,
                  tableColTiggerEvent
                }"
              >
                <template
                  v-for="(column, subIndex) in initData.columns[
                    `${functionParams.formInitPreName}InFm`
                  ].editColumns"
                >
                  <td
                    :key="subIndex"
                    :class="`ivu-table-column-${column.align}`"
                    v-if="excludeFiled('InFm', column.key)"
                    :width="column.editWidth"
                  >
                    <!-- 控件特殊处理 收票编号 发票金额不为空却大于0时候,不可以修改-->
                    <template v-if="column.key == 'icNo'">
                      <Input
                        v-model="row[column.key]"
                        :disabled="!!row['icAmt'] && Number(row['icAmt']) > 0"
                        @input="
                          tableColTiggerEvent(
                            row,
                            column,
                            index,
                            'icNoChangeEvent_In'
                          )
                        "
                      >
                        <Icon
                          @click="openProductsList('writeOffInItems')"
                          slot="suffix"
                          type="md-add"
                          v-show="!detailDisabled"
                        />
                      </Input>
                    </template>
                    <!-- 本次冲销金额	-->
                    <template v-else-if="column.key === 'thisWriteOffAmt'">
                      <InputNumber
                        type="number"
                        v-model="row[column.key]"
                        @input="
                          tableColTiggerEvent(
                            row,
                            column,
                            index,
                            'thisWriteOffAmtChangeEvent_In'
                          )
                        "
                      >
                      </InputNumber>
                    </template>
                    <!--其它 控件 :placeholder="column.title"-->
                    <template v-else>
                      <formControl
                        :align="column.align"
                        :control-type="column.controlType"
                        v-model="row[column.key]"
                        :disabled="column.readOnly"
                        @input="
                          value => {
                            valueChangeAssign(value, index, row, column.key);
                          }
                        "
                      ></formControl>
                    </template>
                  </td>
                </template>
              </template>
            </eTable>
          </TabPane>
          <TabPane label="付款明细" name="writeOffOutItems">
            <eTable
              ref="slave_writeOffOutItems_table_edit"
              unqiue-mark="id"
              :height="400"
              :index-menu="true"
              :col-start="0"
              :row-init-data="
                initData.initData[`${functionParams.formInitPreName}OutFm`]
              "
              :data="formDataInfo['writeOffOutItems'].defaultList"
              :rules="slaveTableFieldsValidator"
              @row-delete="slave_writeOffInItems_table_edit_Delete"
              @tableColTiggerEventCall="tableColTiggerEventCall"
            >
              <template slot="head">
                <tr
                  v-for="(columnGroup, index) in initData.columns[
                    `${functionParams.formInitPreName}OutFm`
                  ].editGroups"
                  :key="index"
                >
                  <template v-for="(column, index2) in columnGroup">
                    <th
                      v-if="excludeFiled('OutFm', column.key)"
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
                  valueChangeAssign,
                  tableColTiggerEvent
                }"
              >
                <template
                  v-for="(column, subIndex) in initData.columns[
                    `${functionParams.formInitPreName}OutFm`
                  ].editColumns"
                >
                  <td
                    :key="subIndex"
                    :class="`ivu-table-column-${column.align}`"
                    v-if="excludeFiled('OutFm', column.key)"
                    :width="column.editWidth"
                  >
                    <!-- 控件特殊处理 付款编号 -->
                    <template v-if="column.key == 'gNo'">
                      <Input
                        v-model="row[column.key]"
                        :disabled="!!row['accAmt'] && Number(row['accAmt']) > 0"
                        @input="
                          tableColTiggerEvent(
                            row,
                            column,
                            index,
                            'gNoChangeEvent_Out'
                          )
                        "
                      >
                        <Icon
                          @click="openProductsList('writeOffOutItems')"
                          slot="suffix"
                          type="md-add"
                          v-show="!detailDisabled"
                        />
                      </Input>
                    </template>
                    <!-- 	本次冲销金额-->
                    <template v-else-if="column.key === 'thisWriteOffAmt'">
                      <InputNumber
                        type="number"
                        v-model="row[column.key]"
                        @input="
                          tableColTiggerEvent(
                            row,
                            column,
                            index,
                            'thisWriteOffAmtChangeEvent_Out'
                          )
                        "
                      >
                      </InputNumber>
                    </template>
                    <!--其它 控件 :placeholder="column.title"-->
                    <template v-else>
                      <formControl
                        :align="column.align"
                        :control-type="column.controlType"
                        v-model="row[column.key]"
                        :disabled="column.readOnly"
                        @input="
                          value => {
                            valueChangeAssign(value, index, row, column.key);
                          }
                        "
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
 * @desc edit-invoiceCheck 描述 新增/修改 应付冲销
 * 所有重要 可以重用的方法 放在了基类,继承即可用重复使用 editBaseMixins,
 * 可以根据需求重写所需的方法:
 *
 * @params 参数
 *
 * @return 返回
 *
 * @author Andy Huang
 *
 * @created 2020/05/12
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
import editForm from './edit-outWriteOffSlave'
import formControl from '@/components/form-control/form-control'
import { deepCopy } from 'view-design/src/utils/assist'
let _ = require('lodash')
const default_formDataInfo = {
  // 主表 更改字段
  master: {
    coinId: 0,
    owoAmt: 0,
    owoDate: new Date(dayjs().format('YYYY-MM-DD HH:mm:ss')),
    owoNo: '',
    rate: 0,
    remark: '',
    supplierCode: '',
    supplierId: 0,
    supplierName: '',
    taxRate: 0,
    taxType: ''
  },
  writeOffInItems: {
    addList: [], // 添加列
    defaultList: [], // 默认列
    deleteList: [], // 删除列
    updateList: []
  },
  writeOffOutItems: {
    addList: [], // 添加列
    defaultList: [], // 默认列
    deleteList: [], // 删除列
    updateList: []
  }
}
export default {
  name: 'edit-outWriteOff', // 应付冲销
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
      searchDataConfig: {
        In: 'writeOffInItems', // 搜索类型:In:获取收票明细弹出框数据,
        Out: 'writeOffOutItems', // 搜索类型: Out:获取付款明细弹出框数据
        type: 'writeOffInItems', // 默认搜索类型
        keyWord: '' // 搜索内容
      },
      searchDataList: [], // 搜索返回的数据列表
      disabledSubmitBtn: false, // 是否禁用确认按钮
      canSubmitData: false, // 是否可以提交数据
      formName: 'accountOutWriteOffFm', // 重写父类 查询表单名称
      // 查询配置参数
      functionParams: {
        formInitPreName: 'accountOutWriteOff', // 查询表格列头信息 前缀 例如:saleboxproductprice Fm/InFm/mdataFm
        requestBaseUrl: '/account/outWriteOff', // 查询 表格行 数据 接口前缀地址
        uniqueId: 'owoId' // 查询详细的唯一ID,需要顶部查询中使用
      },
      actionSubtitle: '应付冲销', // 重写父类 当前操作副标题
      salveWindow: {
        isLoaddingDone: false, // 窗口是否加载完成
        showEditWindow: false, // 是否显示edit-invoiceCheckSlave 编辑窗口
        action: 'add' // 当前操作功能 添加/编辑
      },
      formDataInfo: deepCopy(default_formDataInfo), // Object.assign({}, default_formDataInfo), // 防止添加和更新数据提交发生冲突
      masterRuleValidate: {
        supplierCode: [
          { required: true, message: '供应商编号不能为空', trigger: 'blur' }
        ]
      }, // 纸箱出货 需要验证的数据
      slaveTableFieldsValidator: {}, // 纸箱出货明细 需要验证的数据
      searchParams: {}, // 传递查询参数
      boxReTypeList: [], // 退仓类型 列表
      disabledCustCode: false // 是否禁用 供应商编号
    }
  },
  watch: {
    showWindow: function (n, o) {
      if (n) {
        let _self = this
        this.$nextTick(() => {
          // this.registerEvent();
          // this.pageResize();
          // 延迟赋值,不然数据还没有正确返回的情况下,无法绑定默认值
          setTimeout(() => {
            this.setDefaultData()
          }, 1000)
        })
      }
    }
  },
  created () {
    this.debouncedSearchDataBy = _.debounce(this.searchDataBy, 1000)
  },
  methods: {
    // 根据输入的参数查询所需数据,避免重复查询,使用延时加载
    searchDataBy () {
      this.searchDataList = [] // 默认清除数据集列表
      let params = {
        likeFlag: '0', // 固定 精确查询
        supplierId: this.formDataInfo.master.supplierId, // 供应商编号
        vicNo: this.searchDataConfig.keyWord.trim(), // 收票编号 ,删除前后空格字符
        gNo: this.searchDataConfig.keyWord.trim() // 付款编号,删除前后空格字符
      }
      let url_In = `/account/outWriteOff/getVendInvoiceInfoBoxData` // 获取收票明细弹出框数据
      let url_Out = `/account/outWriteOff/getPaymentBoxData` // 获取付款明细弹出框数据
      let url = url_In // 默认查询 收票编号

      if (this.searchDataConfig.type === this.searchDataConfig.Out) {
        // 付款编号查询
        url = url_Out
      }
      this.getDataByUrl(url, params).then(res => {
        this.searchDataList = res
        let paramsData = {
          data: res, // 数据列表
          type: this.searchDataConfig.type, // 类型: writeOffInItems :收票明细,writeOffOutItems :付款明细
          uniqueId:
            this.searchDataConfig.type === this.searchDataConfig.Out
              ? 'gNo'
              : 'icNo', // 唯一区别码
          money:
            this.searchDataConfig.type === this.searchDataConfig.Out
              ? 'accAmt'
              : 'icAmt', // 发票金额/入帐金额 是否为空
          suffix:
            this.searchDataConfig.type === this.searchDataConfig.Out
              ? 'OutFm'
              : 'InFm' // 表单后缀
        }
        if (this.searchDataList && this.searchDataList.length > 0) {
          this.onSubmitEditForm(paramsData)
        }
      })
    },
    // 弹框==确认==回调事件,返回选择的数据
    onSubmitEditForm (paramsData) {
      let dataList = paramsData.data
      if (dataList && Array.isArray(dataList) && dataList.length > 0) {
        this.disabledCustCode = true // 禁用客户选择
        dataList = this.itemAdapter(paramsData) // 实体转换
        let defaultList = this.formDataInfo[paramsData.type].defaultList
        // 发票金额 or 入帐金额 是否为空
        if (defaultList.length == 0 || !defaultList[0][paramsData.money]) {
          this.formDataInfo[paramsData.type].defaultList = dataList
        } else {
          dataList.forEach(item => {
            // 是否已经存在
            if (!this.checkIsExistBy(item, paramsData)) {
              defaultList.push(item)
            }
          })
          // 删除多余的空行
          defaultList.forEach((item, index) => {
            if (!item[paramsData.uniqueId]) {
              defaultList.splice(index, 1)
            }
          })
        }
      }
      this.sumTotalMoney()
    },
    // 检查列表数据是否已经存在,避免重复添加
    checkIsExistBy (item, paramsData) {
      let isExistIndex = this.formDataInfo[
        paramsData.type
      ].defaultList.findIndex(subItem => {
        return (
          // 唯一区别码(收票编号/付款编号) 判断是否存在
          subItem[paramsData.uniqueId] == item[paramsData.uniqueId]
        )
      })
      if (isExistIndex != -1) {
        return true
      } else {
        return false
      }
    },
    // 实体转换,获取相同Key的value,个别不同的手动修改值
    itemAdapter (paramsData) {
      let dataList = paramsData.data
      let newDataList = []
      dataList.forEach(oldItem => {
        let newItem = JSON.parse(
          JSON.stringify(
            this.initData.initData[
              `${this.functionParams.formInitPreName}` + paramsData.suffix
            ]
          )
        )
        let newItemKeys = Object.keys(newItem)
        newItemKeys.forEach(itemKey => {
          newItem[itemKey] = null
          if (oldItem[itemKey]) {
            newItem[itemKey] = oldItem[itemKey]
          }
        })
        //= ===== 额外需要转换的字段S=======
        // newItem.iciZk = oldItem.discount; // 折扣
        //= ===== 额外需要转换的字段E=======
        newDataList.push(newItem)
      })
      return newDataList
    },
    // 弹框==取消==回调事件
    onCancelEditForm () {},
    // 订单编号 点击事件,打开选择产品列表窗口
    openProductsList (type) {
      this.selectedNoList = ''
      if (this.formDataInfo[type].defaultList) {
        this.formDataInfo[type].defaultList.forEach(item => {
          switch (type) {
            // 收票明细
            case 'writeOffInItems':
              this.selectedNoList += !this.selectedNoList
                ? item.icNo
                : ',' + item.icNo
              break
            default:
              // 付款明细
              this.selectedNoList += !this.selectedNoList
                ? item.gNo
                : ',' + item.gNo // (付款编号)
              break
          }
        })
      } else {
        // fix 提交失败 后 defaultList 列表被清除
        this.formDataInfo[type].defaultList = []
      }

      this.searchParams = {
        type, // writeOffInItems :收票明细,writeOffOutItems :付款明细
        supplierId: this.formDataInfo.master.supplierId, // 客户id
        selectedNoList: this.selectedNoList // (过滤已选de集合,多个都好隔开)
      }
      if (this.popupClickValidator()) {
        this.salveWindow.showEditWindow = true
      }
    },
    // 删除数据 回调
    slave_writeOffInItems_table_edit_Delete (index) {
      this.sumTotalMoney()
    },

    // 初始值 设置
    setDefaultData () {
      this.disabledSubmitBtn = false
      if (this.formDataInfo.master.owoDate) {
        this.formDataInfo.master.owoDate = new Date(
          dayjs(this.formDataInfo.master.owoDate).format('YYYY-MM-DD HH:mm:ss')
        )
      }
    },
    // 单据日期
    onChange_owoDate (item) {
      if (!_.isEmpty(item)) {
        this.formDataInfo.master.owoDate = new Date(item)
      }
    },
    // 表格列值改变 回调事件处理event：{row, column, index, event,config}
    tableColTiggerEventCall (obj) {
      switch (obj.event) {
        // 收票编号 手动输入查询
        case 'icNoChangeEvent_In':
          this.searchDataConfig.type = this.searchDataConfig.In
          this.searchDataConfig.keyWord = obj.row.icNo
          // 发票金额为空 且 收票编号不能为空  采取执行
          if (!obj.row.icAmt && !!obj.row.icNo) {
            // 延时加载
            this.debouncedSearchDataBy()
          }

          break
        // 付款编号 手动输入查询
        case 'gNoChangeEvent_Out':
          this.searchDataConfig.type = this.searchDataConfig.Out
          this.searchDataConfig.keyWord = obj.row.gNo
          // 入帐金额 为空 且付款编号 不能为空  采取执行
          if (!obj.row.accAmt && !!obj.row.gNo) {
            // 延时加载
            this.debouncedSearchDataBy()
          }
          break
        case 'thisWriteOffAmtChangeEvent_In':
          // 本次冲销金额(收票明细)
          this.thisWriteOffAmtChangeEvent(obj, 'In')
          this.sumTotalMoney()
          break
        case 'thisWriteOffAmtChangeEvent_Out':
          // 本次冲销金额(付款明细)
          this.thisWriteOffAmtChangeEvent(obj, 'Out')
          this.sumTotalMoney()
          break
        default:
          break
      }
    },
    // 本次冲销金额(收票明细)	 修改 触发事件回调
    thisWriteOffAmtChangeEvent (obj, type) {
      let totalAmt = 0
      let editTableRefName = ''
      if (type === 'In') {
        // 收票明细
        totalAmt = Number(obj.row.icAmt) // 发票金额
        editTableRefName = 'slave_writeOffInItems_table_edit'
      } else {
        // 付款明细
        totalAmt = Number(obj.row.accAmt) // 入帐金额
        editTableRefName = 'slave_writeOffOutItems_table_edit'
      }
      let thisWriteOffAmt = Number(obj.row.thisWriteOffAmt) // 本次冲销金额
      let writeOffAmt = Number(obj.row.writeOffAmt) // 已冲金额
      let leftMoney = totalAmt - writeOffAmt // 未冲销金额 =  (发票金额- 已冲金额)
      if (thisWriteOffAmt > leftMoney) {
        this.$Modal.warning({
          width: '260',
          title: '警告',
          content: `本次冲销金额 不能大于 未冲销金额:${leftMoney}`,
          onOk: () => {
            this.$refs[editTableRefName].set({ thisWriteOffAmt: 0 }, obj.index)
            this.sumTotalMoney() // fix 错误后 也要重新计算汇总
          }
        })
      } else {
        // 触发修改值 直接修改原始数据 无效
        this.$refs[editTableRefName].set(
          { thisWriteOffAmt: obj.row.thisWriteOffAmt },
          obj.index
        )
      }
    },
    // 汇总
    sumTotalMoney () {
      this.canSubmitData = false
      // 收票明细
      let totolMoney_In = Number(this.getSumDataBy('writeOffInItems'))
      // 付款明细
      let totolMoney_Out = Number(this.getSumDataBy('writeOffOutItems'))
      // 注意：开票明细 和 收款明细中 的 本次冲销金额 的合计要一致,不然不能提交数据
      if (totolMoney_In === totolMoney_Out && totolMoney_In > 0) {
        this.canSubmitData = true
      }
      // 设置主表 冲销金额
      this.formDataInfo.master.owoAmt = totolMoney_In
    },
    // 通过表单名称 列表统计冲销金额 返回总数
    getSumDataBy (formName) {
      let totolMoney = 0
      let dataItem = this.formDataInfo[formName]
      if (dataItem && dataItem.defaultList) {
        dataItem.defaultList.forEach((item, index) => {
          let currentRowMoney = Number(
            (item.thisWriteOffAmt = null ? 0 : item.thisWriteOffAmt)
          )
          totolMoney = totolMoney + currentRowMoney
        })
      }
      return totolMoney
    },
    // 验证产品编号选择前先选择客户
    popupClickValidator () {
      if (!this.formDataInfo.master.supplierCode) {
        this.$Message.error('请先选择供应商编号')
        return false
      }
      return true
    },
    custCodeOnFillEvent () {
      // 切换用户,清除明细信息
      // 收票明细
      let dataList_In = this.formDataInfo['writeOffInItems'].defaultList
      if (dataList_In && dataList_In.length > 0) {
        if (dataList_In[0].icNo != null && dataList_In[0].icNo != '') {
          this.$refs['slave_writeOffInItems_table_edit'].deleteAllData() // 仅仅记录删除记录,
          this.formDataInfo['writeOffInItems'].defaultList = [] // 手动清除本页数据
        }
      }
      // 付款明细
      let dataList_Out = this.formDataInfo['writeOffOutItems'].defaultList
      if (dataList_Out && dataList_Out.length > 0) {
        if (dataList_Out[0].gNo != null && dataList_Out[0].gNo != '') {
          this.$refs['slave_writeOffOutItems_table_edit'].deleteAllData() // 仅仅记录删除记录,
          this.formDataInfo['writeOffOutItems'].defaultList = [] // 手动清除本页数据
        }
      }
    },
    // 排除不需要显示的字段
    excludeFiled (type, key) {
      let exListInFm = []
      let exListOutFm = []
      let exList = []
      switch (type) {
        case 'InFm':
          exList = exListInFm
          break
        default:
          exList = exListOutFm
          break
      }
      if (exList.includes(key)) {
        return false
      } else {
        return true
      }
    },

    // 重写父类 关闭窗口时 触发事件
    closeActionTigger () {
      // fix 清除上次的错误提示 formDataInfo 为表单ref名称
      this.$refs['formDataInfo'].resetFields()
      this.formDataInfo.master.supplierName = ''
      this.canSubmitData = false
      this.searchDataConfig.keyWord = ''
      this.$refs['slave_writeOffInItems_table_edit'].reset()
      this.$refs['slave_writeOffOutItems_table_edit'].reset()
    },
    // 重写父类,修改提交数据
    resetformDataInfo () {
      // 收票明细
      let writeOffInItems = this.$refs[
        'slave_writeOffInItems_table_edit'
      ].getCategorizeData()
      this.formDataInfo['writeOffInItems'] = writeOffInItems

      // 付款明细
      let writeOffOutItems = this.$refs[
        'slave_writeOffOutItems_table_edit'
      ].getCategorizeData()
      this.formDataInfo['writeOffOutItems'] = writeOffOutItems

      if (this.formDataInfo.master.owoDate) {
        this.formDataInfo.master.owoDate = dayjs(
          this.formDataInfo.master.owoDate
        ).format('YYYY-MM-DD HH:mm:ss')
      }

      return this.formDataInfo
    },

    // 提交主从表数据
    formTableDataSubmit () {
      this.$refs['formDataInfo'].validate(valid => {
        if (!valid) {
          return
        }
        let owoAmt = Number(this.formDataInfo.master.owoAmt) // 冲销金额
        if (owoAmt <= 0) {
          this.$Message.warning('请添加明细数据!')
          return
        }
        this.sumTotalMoney() // fix 修复直接打开提交,没有重新计算合计
        if (!this.canSubmitData) {
          this.$Message.warning(
            '收票明细 和 付款明细 中的【本次冲销金额】的合计要一致!'
          )
          return
        }
        let submitData = this.resetformDataInfo()
        request
          .post(
            `${this.functionParams.requestBaseUrl}/saveOrUpdate`,
            submitData
          )
          .then(res => {
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
.masterHeightClass {
  height: 30%;
  overflow: auto;
}
.otherHeightClass {
  height: 70%;
  overflow: hidden;
}
.cl-edit-invoiceCheck .ivu-form-item-label {
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
