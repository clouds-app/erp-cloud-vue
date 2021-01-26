<template>
  <div>
    <editWindow
      :zindex="21"
      class="cl-edit-boxLibCheck"
      title="装车安排工单弹框"
      v-model="showWindow"
      :fullscreen="false"
      width="95%"
      :loading="!isLoaddingDone"
      :spinLoaddingText="spinLoaddingText"
      :disabledSubmitBtn="action!=='add'"
      @on-ok="formTableDataSubmit()"
      v-if="initData.columns"
    >
      <Form
        ref="formDataInfo"
        :show-message="true"
        :model="formDataInfo.master"
        :rules="ruleValidate"
        :label-width="60"
      >
        <Row>
            <Col span="5">
                <FormItem label="客户" prop="cusCodeList">
                    <div>
                        <popup
                        ref='firstFocusInput'
                        v-model="formDataInfo.master.cusCodeList"
                        field-name="cusCodeList"
                        :disabled="detailDisabled"
                        popup-name="CustomerMultiBox"
                        :fill-model.sync="formDataInfo.master"
                        render-fields="cusCodeList"
                        from-fields="cusCode"
                        :suffix="false"
                        />
                    </div>
                </FormItem>
            </Col>
            <Col span="4">
                <FormItem label="客户PO号" prop="cusPo" :label-width="100">
                   <Input
                      v-model="formDataInfo.master.cusPo"
                      maxlength="20"
                      placeholder
                  ></Input>
                </FormItem>
            </Col>
            <Col span="5">
                <FormItem label="交货日期"  prop="deliverDate" :label-width="120">
                <DatePicker
                    transfer
                    :disabled="detailDisabled"
                    type="date"
                    format="yyyy-MM-dd"
                    v-model="formDataInfo.master.deliverDate"
                ></DatePicker>
                </FormItem>
            </Col>
            <Col span="3">
                <FormItem label="待通知送货" prop="waitDeli" :label-width="120">
                <Checkbox 
                    v-model="formDataInfo.master.waitDeli"
                    maxlength="20"
                    placeholder
                ></Checkbox>
                </FormItem>
            </Col>
            <Col span="2">
              <FormItem label="有库存" prop="iisStore">
              <Checkbox 
                  v-model="formDataInfo.master.iisStore"
                  maxlength="20"
                  placeholder
              ></Checkbox>
              </FormItem>
            </Col>
            <Col span="1">
              <FormItem :label-width="50">
                <Button type="primary" @click="clickmaster('search')">搜索</Button>
              </FormItem>
            </Col>
        </Row>
    </Form>

      <div style="display:flex">
        <div class="areas" style="width:10%">
          <Tabs>
            <TabPane label='地区' name="name1">
              <div style="overflow:auto;height:500px;background:rgb(245,245,245)">
                <Tree :data="areaIdsList" show-checkbox @on-check-change='treeChange'></Tree>
              </div>
            </TabPane>
          </Tabs>
        </div>
        <div class="" style="width:90%">
          <Tabs>
            <!--  注意:eTable formDataInfo.artLengs.defaultList  ===artLengs=== 需要根据实际接口修改,其它不变-->
            <TabPane label='工单明细' name="name1">
              <eTable
                ref="tableFields"
                unqiue-mark="id"
                :index-menu="true"
                :col-start="0"
                :height="500"
                :insertDirection="insertDirection"
                :row-init-data="initData.initData.stockboxcaritemworknoFm"
                :data.sync="formDataInfo.carItems.defaultList"
                :rules="tableFieldsValidator"
                :showContextMenu='false'
                v-if="showWindow"
              >
                <template slot="head">
                  <tr
                    v-for="(columnGroup,index) in initData.columns.stockboxcaritemworknoFm.editGroups"
                    :key="index"
                  >
                    <th class="ivu-table-column-center" width="35">
                        <div class="ivu-table-cell">
                          <span class>选择</span>
                        </div>
                    </th>
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
                  <!-- 选择 -->
                    <td class="ivu-table-column-center" width="100">
                      <Checkbox
                        size="default"
                        v-model="row.iisChose"
                        @input="
                          value => {
                            valueChangeAssign(value, index, row, 'iisChose');
                          }
                        "
                      ></Checkbox>
                    </td>
                  <td
                    class="ivu-table-column-left"
                    v-for="(column,columnIndex) in initData.columns.stockboxcaritemworknoFm.editColumns"
                    :key="columnIndex"
                    :width="column.editWidth"
                  >
                      <!--控件特殊处理 选择  -->
                    <!-- <Checkbox
                      v-if="column.key == 'iisChose'"
                      v-model="row[column.key]"
                      @input="
                          value => {
                            valueChangeAssign(value, index, row, 'iisChose');
                          }
                        "
                      size="small"
                      :maxlength="20"
                    >
                      v-else
                    </Checkbox> -->
                    <formControl
                      :control-type="column.controlType"
                      v-model="row[column.key]"
                      disabled
                      @input="value => {valueChangeAssign(value, index, row,column.key)}"
                    ></formControl>
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
 * @author ming xing
 *
 * @created 2020/04/13 17:07:54
 */
// import allCityList from '@/libs/area-data-min.js'
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
const default_formDataInfo = {
  // 主表 更改字段
  master: {
    waitDeli:false,//(待通知),
    areaIds:"",//(地区,一个集合),
    cusCodeList:"",//(客户编号,一个集合),
    cusPo:"",//(客户PO号),
    deliverDate:dayjs().format('YYYY-MM-DD HH:mm:ss'),//(交货日期),
    iisStore:false,//有库存
  },
  // 子表 artLengs 根据实际接口更改,其它不变
  carItems: {
    addList: [], // 添加列
    defaultList: [], // 默认列
    deleteList: [], // 删除列
    updateList: [] // 更新列
  }
}
const defaule_areaIdsList = [
  {
    title:'广东省',
    
    id:'1111',
    children:[
      {
        title:'深圳市',
        
        id:'2221',
        children:[
          {
            title:'宝安区',
            id:'3333',
            children:[
              {
                title:'溪头八区',
                id:'3444'
              }
            ]
          }
        ]
      },
      {
        title:'东莞市',
        
        id:'2222',
        children:[
          {
            title:'厚街',
            id:'44444'
          }
        ]
      }
    ]
  },
  
]
export default {
  name: 'edit-boxLibCheck',
  mixins: [editBaseMixins],
  components: {
    editWindow,
    optionSearch,
    eTable,
    popup,
    formControl,
    referenceField,
    inputNumber
  },
  props:['workNoList'],
  data () {
    return {
      showAddrWindow:false,//地址选择弹框
      salveWindow: {
        // Tips:"提示：此窗口只显示有供应商纸质/纸板进价的工单！",
        isLoaddingDone: false, // 窗口是否加载完成
        showEditWindow: false, // 是否显示edit-boxSalesOrderSlave 编辑窗口
        action: null, // 当前操作功能 添加/编辑
      },
      formName: 'stockboxcaritemworknoFm',
      formmasterName: 'stockboxcaritemworknoFm',
      requestBaseUrl: '/stock/boxCar', // 请求 查询 操作的基础路径
      formDataInfo: deepCopy(default_formDataInfo), // 防止添加和更新数据提交发生冲突
      areaIdsList:deepCopy(defaule_areaIdsList),
      // 需要验证的数据
      ruleValidate: {
        
      },
      tableFieldsValidator: {
        
      },
    }
  },
  created () {
    this.getBoxItemAddress()
  },
  watch:{
    showWindow(n,o){
      if(!n){
        this.clearTable()
      }
    }
  },
  methods: {
      // 获取地址列表
      getBoxItemAddress(){
        request.post('/stock/boxCar/getBoxItemAddress').then(res=>{
          this.areaIdsList = res
        })  
      },
      // 地区Tree选择回调
      treeChange(...pro){
        let [selectData,] = pro
        let selectFild = ''
        selectData.map(item=>{
          if(!item.children.length){
            if(selectFild == ''){
              selectFild=item.id
            }else{
              selectFild+=';'+item.id
            }
          }
        })
        this.formDataInfo.master.areaIds = selectFild
        // console.log(selectFild);
      },
      // 搜索回调
      clickmaster(type){
        this.$refs.tableFields.reset()
        let parms = {
          ...this.formDataInfo.master,
          workNoList:this.workNoList,
          deliverDate:dayjs(this.formDataInfo.master.deliverDate).format("YYYY-MM-DD HH:mm:ss")
        }
        request.post('/stock/boxCar/getBoxCarWorkData',parms).then(res=>{
          res.filter((item,index)=>{
            item.iisChose = false
            this.$refs.tableFields.set(item,index)
          })
        })
      },
    // 确认回调
    formTableDataSubmit(){
      let TableList = this.$refs.tableFields.get();
      TableList = TableList.filter(item=>!!item.iisChose)
      this.$emit('closeMain',TableList)
      // this.clearTable()
      this.showWindow=false
    },
    // 清空数据
    clearTable(){
      this.$refs.tableFields.reset();
      this.formDataInfo = deepCopy(default_formDataInfo)
    }
  }
}
</script>

<style>
/* .cl-edit-paperPrice .ivu-form-item {
  margin-bottom: 5px !important;
} */
.cl-edit-paperPrice .ivu-select-item {
  display: block;
  /* background:rgb(226, 226, 226) */
}
/* .cl-edit-paperPrice .ivu-input-type-text{
  width: 200px
}*/
.cl-edit-paperPrice .right-text {
  width: 160%;
}
</style>
