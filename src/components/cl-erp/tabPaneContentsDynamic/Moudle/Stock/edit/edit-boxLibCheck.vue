<template>
  <div>
    <editWindow
      class="cl-edit-boxLibCheck"
      :title="actionLableName"
      v-model="showWindow"
      :fullscreen="false"
      width="95%"
      :loading="!isLoaddingDone"
      :spinLoaddingText="spinLoaddingText"
      :disabledSubmitBtn="action!=='add'"
      @on-ok="formTableDataSubmit()"
      v-if="initData.columns"
    >
    <!-- <template slot="footer" v-if="this.action != 'add'">
        <div>
           <Button @click="colseSalveWindow">
                <Icon color="red" type="md-close" />
                取 消
            </Button>
        </div>
     </template> -->
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
                        <FormItem label="盘点单号" prop="bcNo">
                        <Input
                            disabled
                            v-model="formDataInfo.master.bcNo"
                            maxlength="20"
                            placeholder
                        ></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="盘点日期"  prop="bcDate">
                        <DatePicker
                            transfer
                            :disabled="detailDisabled"
                            type="date"
                            format="yyyy-MM-dd"
                            v-model="formDataInfo.master.bcDate"
                        ></DatePicker>
                        </FormItem>
                    </Col>
                </Row>
          </Col>
           <Col span="12">
                <Row>
                    <Col span="12">
                      <FormItem label="盘点人" prop="bcPoOwnerCode">
                        <div>
                            <popup
                            @on-fill="Initializationdata"
                            v-model="formDataInfo.master.bcPoOwnerCode"
                            field-name="bcPoOwnerCode"
                            :disabled="detailDisabled"
                            popup-name="WorkerSingleBox"
                            :fill-model.sync="formDataInfo.master"
                            render-fields="bcPoOwnerId,bcPoOwnerCode,bcPoOwnerName"
                            from-fields="id,workCode,workName"
                            :suffix="true"
                            :suffix-model="formDataInfo.master.bcPoOwnerName"
                            suffixModelName="bcPoOwnerName"
                            :query-params="{workOptType:8}"
                            />
                        </div>
                      </FormItem>
                    </Col>
                    <Col span="12">
                      <FormItem label="仓库" prop="bcWhCode">
                        <div>
                            <popup
                            @on-fill="Initializationdata"
                            v-model="formDataInfo.master.bcWhCode"
                            field-name="bcWhCode"
                            :disabled="detailDisabled"
                            popup-name="WareHouseMainSingleBox"
                            :fill-model.sync="formDataInfo.master"
                            render-fields="bcWhId,bcWhCode,bcWhName"
                            from-fields="id,whCode,whName"
                            :suffix="true"
                            :suffix-model="formDataInfo.master.bcWhName"
                            suffixModelName="bcWhName"
                            :query-params="{whType:2}"
                            />
                        </div>
                      </FormItem>
                    </Col>
                </Row>
            </Col>
            <Col span="6">
                <FormItem label="数量" prop="bcQty">
                        <Input
                            disabled
                            v-model="formDataInfo.master.bcQty"
                            maxlength="20"
                            placeholder
                        ></Input>
                </FormItem>
            </Col>
            <Col span="18">
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
        <TabPane label='纸箱库存盘点明细' name="name1">
          <eTable
            ref="tableFields"
            unqiue-mark="id"
            :index-menu="true"
            :col-start="0"
            :width="200"
            :height="400"
            :insertDirection="insertDirection"
            :row-init-data="initData.initData.stockBoxLibCheckItemFm"
            :data.sync="formDataInfo.boxLibCheckItemSlave.defaultList"
            :rules="tableFieldsValidator"
            :showContextMenu='!detailDisabled'
            v-if="showWindow"
          >
            <template slot="head">
              <tr
                v-for="(columnGroup,index) in initData.columns.stockBoxLibCheckItemFm.editGroups"
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
                v-for="(column,columnIndex) in initData.columns.stockBoxLibCheckItemFm.editColumns"
                :key="columnIndex"
                :width="column.editWidth"
              >
                <!--控件特殊处理 工单号  -->
                <Input
                  v-if="column.key == 'workNo'"
                  v-model="row[column.key]"
                  :disabled="detailDisabled"
                  @on-blur="onFill(index)"
                  icon="md-add"
                  @on-click="Slave_list_table_editRowModify(index)"
                  @input="
                      value => {
                        valueChangeAssign(value, index, row, 'workNo');
                      }
                    "
                  size="small"
                  :maxlength="20"
                ></Input>
                <!--控件特殊处理 实盘数量  -->
                <inputNumber
                  v-else-if="column.key == 'biChkQty'"
                  v-model="row[column.key]"
                  :disabled="detailDisabled"
                  @on-blur="getCouponSelected(value, index, row, 'biChkQty')"
                  size="small"
                  :maxlength="20"
                ></inputNumber>
                <!--控件特殊处理 盘点类型 -->
                 <Select
                    disabled
                    v-else-if="column.key == 'adjustmentType'"
                    v-model="row[column.key]"
                    transfer
                  >
                    <Option
                      v-for="(item,index) in adjustmentTypeList"
                      :key="index"
                      :value="item.dicValue"
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
   <boxLibCheckSlave
     ref="mychild"
      :isLoaddingDone="salveWindow.isLoaddingDone"
      :formDetailData="salveWindow.formDetailData"
      :action="salveWindow.action"
      v-model="salveWindow.showEditWindow"
      :inWhId="inWhId"
      :workNoList = "workNoList"
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
 * @author ming xing
 *
 * @created 2020/04/13 17:07:54
 */
import referenceField from '@/components/referenceField/referenceField'
import popup from '@/components/popup/popup'
import editWindow from '@/components/edit-window/edit-window'
import eTable from '@/components/e-table/e-table'
import request from '@/libs/request'
import editBaseMixins from '../../mixins/edit'
import optionSearch from '../../components/optionSearch'
import inputNumber from '@/components/input-number'
import dayjs from 'dayjs'
import Sys from '@/api/sys'
import { deepCopy } from 'view-design/src/utils/assist'
import formControl from '@/components/form-control/form-control'
import boxLibCheckSlave from './edit-boxLibCheckSlave'
const default_formDataInfo = {
  // 主表 更改字段
  master: {
    bcQty: '',
    bcWhCode: '',
    bcWhId: '',
    bcPoOwnerCode: '',
    bcPoOwnerId: '',
    bcPoOwnerName: '',
    bcNo: '',
    bcDate: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    remark: ''
  },
  // 子表 artLengs 根据实际接口更改,其它不变
  boxLibCheckItemSlave: {
    addList: [], // 添加列
    defaultList: [], // 默认列
    deleteList: [], // 删除列
    updateList: [] // 更新列
  }
}
export default {
  name: 'edit-boxLibCheck',
  mixins: [editBaseMixins],
  components: {
    editWindow,
    optionSearch,
    boxLibCheckSlave,
    eTable,
    popup,
    formControl,
    referenceField,
    inputNumber
    // rightMenu
    // Form,
  },
  data () {
    return {
      insertDirection: 'down', // 表单插入方向
      salveWindow: {
        // Tips:"提示：此窗口只显示有供应商纸质/纸板进价的工单！",
        isLoaddingDone: false, // 窗口是否加载完成
        showEditWindow: false, // 是否显示edit-boxSalesOrderSlave 编辑窗口
        action: null, // 当前操作功能 添加/编辑
        formDetailData: {} // 当前表单的详细信息
      },
      adjustmentTypeList: [], // 盘点类型,
      adjustmentType: 0,
      showContextMenu: true,
      showEditMenu: false,
      actionSubtitle: '纸箱库存盘点', // 当前操作副标题
      id: 0,
      formName: 'stockBoxLibCheckItemFm',
      formmasterName: 'boxLibCheckFm',
      requestBaseUrl: '/stock/boxLibCheck', // 请求 查询 操作的基础路径
      formDataInfo: deepCopy(default_formDataInfo), // 防止添加和更新数据提交发生冲突
      // 需要验证的数据
      ruleValidate: {
        bcPoOwnerCode: [
          {
            required: true,
            message: '盘点人不能为空',
            trigger: 'blur'
          }
        ],
        bcWhCode: [
          {
            required: true,
            message: '仓位不能为空',
            trigger: 'blur'
          }
        ]
      },
      tableFieldsValidator: {
        workNo: [
          {
            required: true,
            message: '工单号不能为空',
            trigger: 'blur'
          }
        ]
      },
      subBoxClickIndex: -1,
      getbppClassId: 0,
      inWhId: 'null', // 传给用料批次号的参数
      WorkOrderNumber: 'null',
      index1: 0, // 工单号里面用,
      workNoList: ''
    }
  },
  created () {
    this.getadjustmentTypeList()// 盘点类型
  },
  methods: {
    getCouponSelected (value, index, row, biChkQtyKey) {
      // 盘点类型判断
      // debugger
      if (row.biChkQty < 0) {
        this.$Message.error('实盘数量不能小于0')
        return
      }
      if (row.biChkQty == '') {
        row.biChkQty = 0
      }
      this.biInQtyChange()
    },
    // 获取盘点类型
    getadjustmentTypeList () {
      request.get('/common/sys/dic/childList/adjustmentType', {}, { qt: 'pValue' }).then(res => {
        res.forEach(item => {
          item.dicValue = parseInt(item.dicValue)
        })
        this.adjustmentTypeList = res
        // console.log(res)
      })
    },
    // 计算盘点数量
    biInQtyChange () {
      // debugger
      let masterstockqty = 0
      let tableData = this.$refs['tableFields'].get()
      for (let index = 0; index < tableData.length; index++) {
        let biChkQty = Number(tableData[index].biChkQty)
        let biQty = Number(tableData[index].biQty)
        masterstockqty += biChkQty
        // 盘点类型判断
        if (biChkQty > biQty) {
          tableData[index].adjustmentTypeText = this.adjustmentTypeList[1].dicLabel
          tableData[index].adjustmentType = this.adjustmentTypeList[1].dicValue
        } else if (biChkQty < biQty) {
          tableData[index].adjustmentTypeText = this.adjustmentTypeList[2].dicLabel
          tableData[index].adjustmentType = this.adjustmentTypeList[2].dicValue
        } else {
          tableData[index].adjustmentTypeText = this.adjustmentTypeList[0].dicLabel
          tableData[index].adjustmentType = this.adjustmentTypeList[0].dicValue
        }
      }
      this.formDataInfo.master.bcQty = Number(masterstockqty)
    },
    // 数据传递
    transformation (selectedValue) {
      // debugger
      let transData = JSON.parse(JSON.stringify(this.initData.initData.stockBoxLibCheckItemFm))
      transData.bcCustPo = selectedValue.bcCustPo // 客户Po号
      transData.biChkQty = selectedValue.biChkQty // 实盘数量
      transData.biDiffQty = selectedValue.biDiffQty // 库存单价
      transData.biProdName = selectedValue.biProdName // 产品名称
      transData.biProdNo = selectedValue.biProdNo // 产品编号
      transData.biQty = selectedValue.biQty // 当前库存数
      //  transData.adjustmentType =
      // transData.adjustmentTypeText =
      // transData.boxLibCheckId =
      transData.bpBatchNo = selectedValue.bpBatchNo // 料号
      transData.bpCartCode = selectedValue.bpCartCode // 客方纸质
      transData.bpCartId = selectedValue.bpCartId // 客方纸质Id
      transData.bpCboxCode = selectedValue.bpCboxCode // 客方盒式编号
      transData.bpCboxId = selectedValue.bpCboxId // 客方盒式
      transData.bpCboxName = selectedValue.bpCboxName // 客方盒式
      transData.bpCsizeH = selectedValue.bpCsizeH // 客方高
      transData.bpCsizeL = selectedValue.bpCsizeL // 客方长
      transData.bpCsizeW = selectedValue.bpCsizeW // 客方宽
      transData.custId = selectedValue.custId // 客户id
      transData.custName = selectedValue.custName // 客户名称
      transData.custCode = selectedValue.custCode // 客户编号
      // transData.remark = selectedValue.
      transData.wareHouseItCode = selectedValue.wareHouseItCode
      transData.wareHouseItId = selectedValue.wareHouseItId
      transData.wareHouseItName = selectedValue.wareHouseItName
      transData.workNo = selectedValue.workNo // 工单号
      return transData
    },
    // 接受工单号传回来的数据
    closeMain (selectedValues) {
      // debugger
      let pushData = []
      selectedValues.forEach((selectedValue) => {
        let transData = this.transformation(selectedValue)
        pushData.push(transData)
      })
      // let 子表数据 = this.$refs["tableFields"].get()
      let sundata = this.$refs['tableFields'].get()
      // 工单号唯一校验
      let hiddensundata = {}
      for (let index = 0; index < sundata.length; index++) {
        if (sundata[index].workNo != '') {
          let key = JSON.stringify(sundata[index].workNo)
          let value = index
          hiddensundata[key] = value
        }
      }
      for (let i = pushData.length - 1; i >= 0; i--) {
        if (
          hiddensundata[JSON.stringify(pushData[i].workNo)] != undefined
        ) {
          this.$Message.error(
            pushData[i].workNo + '该工单号已经存在'
          )
          pushData.splice(i, 1)
        }
      }
      // this.$refs["tableFields"].set(pushData,this.index)

      let index2 = this.index1
      for (let a = 0; a < pushData.length; a++) {
        this.$refs['tableFields'].set(pushData[a], index2)
        index2++
      }
      this.biInQtyChange(this.index1)
    },
    // 工单号失去焦点带出参数事件
    onFill (index) {
      let workNoList = this.getworkNoList(index)
      // debugger;
      let pushData = []
      // 获取盘点人id
      let bcPoOwnerId = this.formDataInfo.master.bcPoOwnerId
      // 获取工单号
      let workNo = this.formDataInfo.boxLibCheckItemSlave.defaultList[index].workNo
      // 获取产品编号
      let biProdNo = this.formDataInfo.boxLibCheckItemSlave.defaultList[index].biProdNo
      if (workNo && biProdNo) {
        return
      }
      // 获取当前子表数据
      // let two = this.formDataInfo.boxLibCheckItemSlave.defaultList[index];
      let tabData = this.$refs['tableFields'].cloneData
      // 获取子表初始化时的数据
      let defulit = this.initData.initData.stockBoxLibCheckItemFm
      let _this = this
      if (workNo) {
        request
          .post(`/stock/boxLibCheck/getWorkInStore`, {
            inWhId: this.formDataInfo.master.bcWhId,
            flag: '1',
            inBcNo: workNo,
            workNoList: workNoList })
          .then(res => {
            // debugger
            let data = res[0]
            if (data === [] || data === undefined || data.length == 0) {
              _this.$Message.error('工单号错误或者已存在')
              // $set(要修改的对象,索引,属性的值是啥)
              _this.$set(
                _this.formDataInfo.boxLibCheckItemSlave.defaultList,
                index,
                _this.initData.initData.stockBoxLibCheckItemFm
              )
              return
            }

            for (let i = 0; i < res.length; i++) {
              if (res[i].biQty) {
                res[i].biChkQty = res[i].biQty // 实盘数量默认赋值
              }
            }
            res.forEach((selectedValue) => {
              let transData = _this.transformation(selectedValue)
              pushData.push(transData)
            })
            _this.$refs['tableFields'].set(pushData, index)
            // _this.transformation(demo, data);
            _this.biInQtyChange(index)
            // _this.OnlyWorkNo(index)
          })
      }
    },
    // 工单号唯一校验
    // OnlyWorkNo(index){
    //     //debugger;
    //   //获取当前行工单号
    //   let workNo = this.formDataInfo.boxLibCheckItemSlave.defaultList[index].workNo;
    //   //过去明细表全部数据
    //   let two = this.formDataInfo.boxLibCheckItemSlave.defaultList;
    //   let one = this.$refs["tableFields"].cloneData;
    //   for (let index1 = 0; index1 < one.length; index1++) {
    //     if (index1 !== index) {
    //       if (one[index1].workNo===workNo) {
    //         //若当前列表工单号已经存在，清空当前列表数据，提示工单号已经存在 BC200300033-2
    //         // this.$set(
    //           this.formDataInfo.boxLibCheckItemSlave.defaultList[index]=[]
    //         //   index,
    //         //   this.initData.initData.stockBoxLibCheckItemFm
    //         // )
    //         this.$Message.error('此工单号已经存在')
    //         this.biInQtyChange(index)
    //       }
    //     }
    //   }
    // },
    // 获取工单号过滤字段
    getworkNoList (dataindex) {
      let workNoList = ''
      let _self = this
      let tabData = this.$refs['tableFields'].get()
      tabData.filter((item, index, data) => {
        if (index !== dataindex) {
          if (item.workNo === '') {
            return
          }
          if (index === 0) {
            workNoList += item.workNo + '#' + item.wareHouseItId
          } else {
            workNoList += ',' + item.workNo + '#' + item.wareHouseItId
          }
        }
      })
      return workNoList
    },
    // 工单号点击事件
    Slave_list_table_editRowModify (index) {
      // debugger
      this.index1 = index
      let workNoList = this.getworkNoList(index)
      let tabData = this.$refs['tableFields'].cloneData
      if (this.formDataInfo.master.bcPoOwnerId) {
        if (this.formDataInfo.master.bcWhId) {
          this.inWhId = this.formDataInfo.master.bcWhId
          this.workNoList = workNoList
          this.salveWindow.showEditWindow = true
          let ppuer = this.salveWindow.showEditWindow
          this.salveWindow.action = 'add'
          this.salveWindow.isLoaddingDone = true
          // issInput(1输入0查询)
          request
            .post(`/stock/boxLibCheck/getWorkInStore`, { inWhId: this.formDataInfo.master.bcWhId, workNoList })
            .then(res => {
              // debugger
              // this.WorkOrderNumber1 = res;
              this.$refs.mychild.getFormInitDataObj(res)
            })
        } else {
          this.salveWindow.showEditWindow = false
          this.$Message.error('仓库不能为空')
        }
      } else {
        this.salveWindow.showEditWindow = false
        this.$Message.error('盘点人不能为空')
      }
    },
    // 判断数据是新增还是修改
    formDetailDataCall () {
      // debugger;
      if (this.action != 'add') {
        this.getteamCode = this.formDataInfo.master.bcPoOwnerCode
        this.id = this.formDataInfo.master.id
      }
    },
    // 当主表弹框改变时促发初始化子表数据
    Initializationdata (data) {
      let keys = Object.keys(data[0].data)
      this.$refs['formDataInfo'].validateField(keys[1], err => {})
      let tableData = this.$refs['tableFields'].getCategorizeData()
      if (this.formDataInfo.master.bcPoOwnerId) {
        if (this.formDataInfo.master.bcPoOwnerId != this.getbppClassId) {
          this.formDataInfo.boxLibCheckItemSlave.defaultList = []
          tableData.deleteList = tableData.updateList
        }
        this.getbppClassId = this.formDataInfo.master.bcPoOwnerId
      }
    },
    // 重写父类 关闭窗口时 触发事件
    closeActionTigger () {
      // debugger
      // fix 清除上次的错误提示 formDataInfo 为表单ref名称
      this.$refs['formDataInfo'].resetFields()
      this.$refs['tableFields'].reset()
      this.formDataInfo = deepCopy(default_formDataInfo)
    },
    // 主表弹框判空
    clickValuedate () {
      // debugger;
      if (
        !this.formDataInfo.master.bcWhCode ||
        this.formDataInfo.master.bcWhCode == ''
      ) {
        this.$Message.error('仓库不能为空')
        return false
      }
      return true
    },
    // 重写父类,添加时候,清空数据
    // HandleFormDataInfo() {
    //   //debugger
    //   this.formDataInfo = Object.assign({}, default_formDataInfo);
    // },
    // 重写父类,修改提交数据
    resetformDataInfo () {
      // debugger;
      if (this.formDataInfo.master.bcDate != '') {
        this.formDataInfo.master.bcDate = dayjs(this.formDataInfo.master.bcDate).format('YYYY-MM-DD HH:mm:ss')
      }
      let tableData = this.$refs['tableFields'].getCategorizeData()
      this.formDataInfo.boxLibCheckItemSlave = tableData

      return this.formDataInfo
    },
    formTableDataSubmit () {
      let _self = this
      this.$refs['formDataInfo'].validate(valid => {
        if (!valid) {
          return
        }
        let result = this.$refs['tableFields'].validate()
        if (result) {
          return
        }
        // _self.insertBoxUseAdjusteData()
        let submitData = _self.resetformDataInfo()
        request.post(`/stock/boxLibCheck/save`, submitData).then(res => {
          _self.showWindow = false // 关闭当前编辑页面
          _self.$Message.success('执行成功')
          _self.$emit('submit-success') // 刷新主页面数据
        })
      })
    },
    // 关闭窗口
    colseSalveWindow () {
      // debugger
      this.showWindow = false
    }

  }
}
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
