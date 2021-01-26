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
      :disabledSubmitBtn="false"
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
               <!-- ref='firstFocusInput'-->
            <Col span="6">
                <FormItem label="装车单号" prop="bcNo">
                <Input
                    disabled
                    v-model="formDataInfo.master.bcNo"
                    maxlength="20"
                    placeholder
                ></Input>
                </FormItem>
            </Col>
            <Col span="6">
                <FormItem label="装车日期"  prop="bcDate">
                <DatePicker
                    transfer
                    :disabled="detailDisabled"
                    type="date"
                    format="yyyy-MM-dd"
                    v-model="formDataInfo.master.bcDate"
                ></DatePicker>
                </FormItem>
            </Col>
            <Col span="6">
                <FormItem label="车牌号" prop="carNo">
                    <div>
                        <popup
                        @on-fill="Initializationdata('carNo')"
                        v-model="formDataInfo.master.carNo"
                        field-name="carNo"
                        :disabled="detailDisabled"
                        popup-name="CarSingleBox"
                        :fill-model.sync="formDataInfo.master"
                        render-fields="carNo,driverName,carCube,carTon"
                        from-fields="carNo,driverName,carCube,carTon"
                        :suffix="false"
                        />
                    </div>
                </FormItem>
            </Col>
            <Col span="6">
                <FormItem label="司机" prop="driverName">
                <Input
                    disabled
                    v-model="formDataInfo.master.driverName"
                    maxlength="20"
                    placeholder
                ></Input>
                </FormItem>
            </Col>
            <Col span="24">
              <Row>
                <Col span="6">
                    <FormItem label="装车员" prop="loadName">
                        <div>
                            <popup
                            @on-fill="Initializationdata('loadName')"
                            v-model="formDataInfo.master.loadName"
                            field-name="loadName"
                            :disabled="detailDisabled"
                            popup-name="WorkerSingleBox"
                            :fill-model.sync="formDataInfo.master"
                            render-fields="loadId,loadName"
                            from-fields="id,workName"
                            :suffix="false"
                            :query-params="{workOptType:4}"
                            />
                        </div>
                    </FormItem>
                </Col>
                <Col span="6">
                    <FormItem label="送货员" prop="sendName">
                        <div>
                            <popup
                            @on-fill="Initializationdata('sendName')"
                            v-model="formDataInfo.master.sendName"
                            field-name="sendName"
                            :disabled="detailDisabled"
                            popup-name="WorkerSingleBox"
                            :fill-model.sync="formDataInfo.master"
                            render-fields="sendId,sendName"
                            from-fields="id,workName"
                            :suffix="false"
                            :query-params="{workOptType:5}"
                            />
                        </div>
                    </FormItem>
                </Col>
                <Col span="6">
                    <FormItem label="车辆体积" prop="carCube">
                    <Input
                        disabled
                        v-model="formDataInfo.master.carCube"
                        maxlength="20"
                        placeholder
                    ></Input>
                    </FormItem>
                </Col>
                <Col span="6">
                    <FormItem label="吨位" prop="carTon">
                    <Input
                        disabled
                        v-model="formDataInfo.master.carTon"
                        maxlength="20"
                        placeholder
                    ></Input>
                    </FormItem>
                </Col>
              </Row>
            </Col>

           
            <Col span="6">
                <FormItem label="数量" prop="qty">
                <Input
                    disabled
                    v-model="formDataInfo.master.qty"
                    maxlength="20"
                    placeholder
                ></Input>
                </FormItem>
            </Col>
            <Col span="6">
                <FormItem label="面积" prop="area">
                <Input
                    disabled
                    v-model="formDataInfo.master.area"
                    maxlength="20"
                    placeholder
                ></Input>
                </FormItem>
            </Col>
            <Col span="6">
                <FormItem label="体积" prop="cube">
                <Input
                    disabled
                    v-model="formDataInfo.master.cube"
                    maxlength="20"
                    placeholder
                ></Input>
                </FormItem>
            </Col>
            <Col span="6">
                <FormItem label="重量" prop="weight">
                <Input
                    disabled
                    v-model="formDataInfo.master.weight"
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
        <TabPane label='装车安排明细' name="name1">
          <eTable
            ref="tableFields"
            unqiue-mark="id"
            :index-menu="true"
            :col-start="0"
            :width="200"
            :height="400"
            :insertDirection="insertDirection"
            :row-init-data="initData.initData.stockboxcaritemFm"
            :data.sync="formDataInfo.carItems.defaultList"
            :rules="tableFieldsValidator"
            @row-delete="getMasterFild"
            :showContextMenu='!detailDisabled'
            v-if="showWindow"
          >
            <template slot="head">
              <tr
                v-for="(columnGroup,index) in initData.columns.stockboxcaritemFm.editGroups"
                :key="index"
              >

                <th
                  :class="`ivu-table-column-${column.titleAlign}`"
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
                :class="`ivu-table-column-${column.align}`"
                v-for="(column,columnIndex) in initData.columns.stockboxcaritemFm.editColumns"
                :key="columnIndex"
                :width="column.editWidth"
              >
                 <!--控件特殊处理 工单号  -->
                <Input
                  v-if="column.key == 'workNo'"
                  v-model="row[column.key]"
                  style="padding-right:0px"
                  disabled
                  @input="
                      value => {
                        valueChangeAssign(value, index, row, 'workNo');
                      }
                    "
                  size="small"
                  :maxlength="20"
                >
                  <Icon @click="Slave_list_table_editRowModify(index)" slot="suffix" type="md-add" v-show="!(row['id'])"/>
                </Input>
                <!--控件特殊处理 装车数量  -->
                <Input
                  v-else-if="column.key == 'qty'"
                  v-model="row[column.key]"
                  type="number"
                  :disabled='detailDisabled'
                  @on-blur="qtyChange(index)"
                  @input="
                    value => {
                      valueChangeAssign(value, index, row, 'qty');
                    }
                  "
                  size="small"
                  :maxlength="20"
                ></Input>
                <formControl
                  v-else
                  :control-type="column.controlType"
                  v-model="row[column.key]"
                  :disabled="column.readOnly||!!detailDisabled"
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
      :workNoList='workNoList'
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
 * @author Qiang
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
import boxLibCheckSlave from '../components/newBoxCarSalve'
const default_formDataInfo = {
  // 主表 更改字段
  master: {
    bcNo: '',
    bcDate: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    carNo: '',
    driverName: '',
    loadId: '',
    loadName: '',
    sendId: '',
    sendName: '',
    carCube:0,
    carTon:0,
    qty:0,
    area:0,
    cube:0,
    weight:0,
    remark: ''
  },
  // 子表 artLengs 根据实际接口更改,其它不变
  carItems: {
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
  },
  data () {
    return {
      clickTableIndex:-1,//记录子表选择索引
      insertDirection: 'down', // 表单插入方向
      salveWindow: {
        // Tips:"提示：此窗口只显示有供应商纸质/纸板进价的工单！",
        isLoaddingDone: false, // 窗口是否加载完成
        showEditWindow: false, // 是否显示edit-boxSalesOrderSlave 编辑窗口
        action: null, // 当前操作功能 添加/编辑
      },
      actionSubtitle: '装车安排', // 当前操作副标题
      formName: 'stockboxcaritemFm',
      formmasterName: 'stockboxcarFm',
      requestBaseUrl: '/stock/boxCar', // 请求 查询 操作的基础路径
      formDataInfo: deepCopy(default_formDataInfo), // 防止添加和更新数据提交发生冲突
      // 需要验证的数据
      ruleValidate: {
           carNo: [{ required: true,  message: '车牌号不能为空', trigger: 'blur' }],
          //  loadName: [{ required: true,  message: '装车员不能为空', trigger: 'blur' }],
          //  sendName: [{ required: true,  message: '送货员不能为空', trigger: 'blur' }],
      },
      tableFieldsValidator: {
        
      },
    }
  },
  created () {
  },
  methods: {
      Initializationdata(key){
          this.$refs["formDataInfo"].validateField(key, err => {});
      },
    // 重写父类 关闭窗口时 触发事件
      closeActionTigger () {
      // debugger
        this.$refs['tableFields'].reset()
        this.clickTableIndex = -1
        this.formDataInfo = deepCopy(default_formDataInfo)
      },
      async Slave_list_table_editRowModify(index){
        let valid = await this.$refs['formDataInfo'].validate()
        if(!valid) return
          this.clickTableIndex = index
          this.salveWindow.isLoaddingDone = true
          this.salveWindow.showEditWindow = true
          this.salveWindow.action = 'add'
          // this.$refs.mychild.clearTable()
          this.getWorkNoList()
      },
      // 获取弹框过滤字段
      getWorkNoList(){
        let workNoList = []
        this.$refs.tableFields.get().filter(item=>{
          if(!item.workNo) return
          workNoList.push(item.workNo)
        })
        this.workNoList = workNoList.toString()
      },
      // 工单弹框确认回调
      closeMain(list){
        let tableElenment = this.$refs.tableFields
        list.filter((item,index)=>{
          delete item.iisChose
          tableElenment.set(item,index+this.clickTableIndex)
        })
        tableElenment.get().filter((items,indexs)=>{
          if(!!items.indexNo)return
          let indexNo = (indexs+1)*10
          tableElenment.set({indexNo},indexs)
        })
        this.getMasterFild()
      },
      // 提交数据格式化
      resetformDataInfo(_data){
        let tableData = this.$refs["tableFields"].getCategorizeData();
        //debugger
        this.formDataInfo.carItems = tableData;
        if (!!_data.master.bcDate) {
          _data.master.bcDate = dayjs(_data.master.bcDate).format(
            "YYYY-MM-DD HH:mm:ss"
          );
        }
        return this.formDataInfo;
      },
      // 合计从表面积，重量，体积，数量
      getMasterFild(){
        let subTableList = this.$refs.tableFields.get();
        /* qty 数量 area 面积 cube 体积 weight 重量*/
        /* weight	重量 sArea	单面积 sCube	单体积 sWeight	单重 qty 装车数量 */
        let [qty,area,cube,weight] = [0,0,0,0]
        subTableList.filter(item=>{
          qty+=Number(item.qty)
          area+=Number(item.sArea)*Number(item.qty)
          cube+=Number(item.sCube)*Number(item.qty)
          weight+=Number(item.weight)
        })
        this.formDataInfo.master = {
          ...this.formDataInfo.master,
          qty,
          area:area.toFixed(2),
          cube:cube.toFixed(2),
          weight:weight
        }
        this.checkWitandCube()
      },
      // 主表重量，体积校验
      checkWitandCube(){
        let {cube,weight,carTon,carCube} = this.formDataInfo.master
        if(+cube>+carCube){
          this.$Message.warning('所载货物体积以超过此车的限载体积,请注意!')
        }
        if (+weight>+carTon) {
          this.$Message.warning('所载货物重量以超过此车的限载重量,请注意!')
        }
      },
      // 装车数量回调
      qtyChange(index){
        /* qty 数量 area 面积 cube 体积 weight 重量*/
        /* weight	重量 sArea	单面积 sCube	单体积 sWeight	单重 qty 装车数量 */
        let tableLiat = this.$refs.tableFields.get()
        let {qty,sArea,sCube,sWeight} = tableLiat[index]
        let area = (Number(qty)*Number(sArea)).toFixed(2)
        let cube = (Number(qty)*Number(sCube)).toFixed(2)
        let weight = (Number(qty)*Number(sWeight)).toFixed(2)
        this.$refs.tableFields.set({area,cube,weight},index)
        this.getMasterFild()
      },
  }
}
</script>

<style>
/* .cl-edit-paperPrice .ivu-form-item {
  margin-bottom: 5px !important;
} */
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
