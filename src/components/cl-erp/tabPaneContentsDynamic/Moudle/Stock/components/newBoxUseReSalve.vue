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
      ref="editWindow"
      :draggable="false"
      :showPageConfig="true"
      @pageOnChange="pageOnChange"
    >
    <div ref="masterHeight">
    <Form
    ref="formDataInfo"
    :show-message="true"
    :model="formDataInfo.master"
    :rules="ruleValidate"
    :label-width="80"
      >
        <Row>
            <Col span="5">
              <FormItem label="工单号">
                <Input
                  v-model="formDataInfo.master.inWorkNo"
                  maxlength="20"
                  :placeholder="title"
                ></Input>
              </FormItem>
            </Col>
            <Col span="5">
              <FormItem label="入库单号">
                <Input
                  v-model="formDataInfo.master.inPaperJoinNo"
                  maxlength="20"
                  :placeholder="title"
                ></Input>
              </FormItem>
            </Col>
            <Col span="3">
              <FormItem :label-width="50">
                <RadioGroup v-model="formDataInfo.master.flag">
                  <Radio label="1">精准</Radio>
                  <Radio label="0">模糊</Radio>
                </RadioGroup>
              </FormItem>
            </Col>
            <Col span="4">
              <FormItem label="入库日期">
                <DatePicker
                  type="date"
                  format="yyyy-MM-dd"
                  v-model="formDataInfo.master.startDate"
                ></DatePicker>
              </FormItem>
            </Col>
            <Col span="4">
              <FormItem label="--" :label-width='30'>
                <DatePicker
                  type="date"
                  format="yyyy-MM-dd"
                  v-model="formDataInfo.master.endDate"
                ></DatePicker>
              </FormItem>
            </Col>
            <Col span="1">
              <FormItem label>
                <Button type="primary" @click="clickmaster('search')">搜索</Button>
              </FormItem>
            </Col>
        </Row>
      </Form>
      <Tabs>
          <TabPane
            label="纸板采购明细表"
            name="name1"
          >
        <eTable
              ref="firstTable"
              unqiue-mark="id"
              :height="300"
              :width="48"
              :index-menu="false"
              :col-start="0"
              :row-init-data="initData.initData[`stockboxusereitemboxFm`]"
              :data.sync="firstTableList"
              :rules="tableFieldsValidator"
              :showContextMenu="false"
              @row-click="slave_list_table_editRowClick"
            >
              <template slot="head">
                <tr
                  v-for="(columnGroup, index) in initData.columns[
                    `stockboxusereitemboxFm`
                  ].editGroups"
                  :key="index"
                >
                <template v-for="(column, index2) in columnGroup">
                    <th
                      v-if="excludeFiled(column.key)"
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
                slot-scope="{ row, index, valueChangeAssign }"
              >
                <template
                  v-for="(column, subIndex) in initData.columns[
                    `stockboxusereitemboxFm`
                  ].editColumns"
                >
                <td
                  :key="subIndex"
                  :class="`ivu-table-column-${column.align}`"
                  v-if="excludeFiled(column.key)"
                  :width="column.editWidth"
                >
                 <!--控件特殊处理 无单采购  -->
               <!--    <Checkbox
                    v-if="column.key == 'iisChose'"
                    size="default"
                    v-model="row[column.key]"
                    @input="
                      value => {
                        valueChangeAssign(value, index, row, 'iisChose');
                      }
                    "
                    @on-change='setppoDueDate(index)'
                ></Checkbox> -->
                  <!-- 其它 :placeholder="column.key"-->
                  <formControl
                    :disabled="column.readOnly"
                    :align="column.align"
                    :control-type="column.controlType"
                    v-model="row[column.key]"
                    @input="
                      (value) => {
                        valueChangeAssign(value, index, row, column.key);
                      }
                    "
                  ></formControl>
                </td>
                </template>
              </template>
        </eTable>
        </TabPane>
      </Tabs>
       <Tabs>
          <TabPane
            label="纸板采购信息"
            name="name2"
          >
           <eTable
              ref="secondTable"
              unqiue-mark="id"
              :height="266"
              :width="48"
              :index-menu="false"
              :col-start="0"
              :row-init-data="initData.initData[`stockboxuseredataboxFm`]"
              :data.sync="secondTableList"
              :rules="tableFieldsValidator"
              :showContextMenu="false"
            >
              <template slot="head">
                <tr
                  v-for="(columnGroup, index) in initData.columns[
                    `stockboxuseredataboxFm`
                  ].editGroups"
                  :key="index"
                >
                <template v-for="(column, index2) in columnGroup">
                    <th
                      v-if="excludeFiled(column.key)"
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
                slot-scope="{ row, index, valueChangeAssign }"
              >
                <template
                  v-for="(column, subIndex) in initData.columns[
                    `stockboxuseredataboxFm`
                  ].editColumns"
                >
                <td
                  :key="subIndex"
                  :class="`ivu-table-column-${column.align}`"
                  v-if="excludeFiled(column.key)"
                  :width="column.editWidth"
                >
                <!--控件特殊处理 退货数  -->
                <inputNumber
                  v-if="column.key == 'qty'"
                  v-model="row[column.key]"
                  @on-blur='changeQty(row)'
                  :max="row['kQty']"
                  @input="
                    value => {
                      valueChangeAssign(value, index, row, 'qty');
                    }
                  "
                  size="small"
                  :maxlength="20"
                >
                </inputNumber>
                  <!-- 其它 :placeholder="column.key"-->
                  <formControl
                    v-else
                    :align="column.align"
                    :control-type="column.controlType"
                    v-model="row[column.key]"
                    disabled
                    @input="
                      (value) => {
                        valueChangeAssign(value, index, row, column.key);
                      }
                    "
                  ></formControl>
                </td>
                </template>
              </template>
        </eTable>
        </TabPane>
      </Tabs>
      </div>
    </editWindow>
   
   
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
import inputNumber from '@/components/input-number'
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
   inWorkNo:'',//(工单号)
   inPaperJoinNo:'',//(入库单号),
   flag:"0",//(0模糊1精确)),
   startDate:dayjs().subtract(15, 'day').format("YYYY-MM-DD"),//(入库日期开始时间),
   endDate:dayjs().format("YYYY-MM-DD"),//(入库日期结束时间)),
  }
};
export default {
  name: "edit-boxProductPrice",
  mixins: [editBaseMixins],
  components: {
    editWindow,
    eTable,
    formControl,
    popup,
    inputNumber
  },
  props:{
    itemIdList:{// 已选择数据的id[用于弹框过滤]),
      type:String,
      default:''
    },
    inSupplier:{//(供应商),
      type:String,
      default:''
    }
  },
  data() {
    return {
      tableIndex:-1,//第二层表点击索引
      firstTableList:[],
      secondTableList:[],
      actionSubtitle: "纸板退货", // 当前操作副标题
      formInitPreName: "stockBoxUseRe", // 初始化信息查询 前缀 字段
      formName: "stockboxusereitemboxFm", // 初始化信息查询 表单字段
      requestBaseUrl: "/stock/stockBoxUseRe", // 请求 查询 操作的基础路径
      formDataInfo:deepCopy(default_master),
      itemDTOList:[],// 深拷贝对象和数组,
      ruleValidate: {}, // 需要验证的数据
      tableFieldsValidator: {}, // 需要验证的数据表格
    };
  },
  methods:{
    // 选择回调
    // setppoDueDate(index){
    //   // this.itemDTOList[index].master.iisChose = !this.itemDTOList[index].master.iisChose
    // },
    // 分页回调
    pageOnChange(_pageNum){
      this.pageConfig.pageNum = _pageNum
      this.$refs.secondTable.reset()
      this.clickmaster()
    },
    // 处理显示或隐藏字段
    excludeFiled(key){
      return true
    },
    // 搜素回调
    clickmaster(type){
      if(this.pageConfig.pageNum==1 || type=='search'){
          this.resetPageConfig()
          this.firstTableList = []
          this.itemDTOList = []
      }
      this.formDataInfo.master.startDate = dayjs(this.formDataInfo.master.startDate).format("YYYY-MM-DD")
      this.formDataInfo.master.endDate = dayjs(this.formDataInfo.master.endDate).format("YYYY-MM-DD")
      let parms = {
        ...this.formDataInfo.master,
        itemIdList:this.itemIdList,
        inSupplierId:this.inSupplier.supplierId,
        pageNum:this.pageConfig.pageNum,//(当前页),
        pageSize:this.pageConfig.pageSize,//(每页显示条数)
      }
      let _self = this
      request.post('/stock/stockBoxUseRe/getBoxUseReItemData',parms).then(res=>{
        _self.$refs.secondTable.reset()
        res.records.filter((item,index)=>{
          _self.firstTableList.push(item)
          // _self.$refs.firstTable.set(item,index)
          _self.itemDTOList.push({master:item,reDataList:[]})
        })
        _self.pageConfig.total = res.total // 赋值总条数
        _self.$refs['editWindow'].pageConfig= this.pageConfig
        if(res.records.length==0) return
        _self.$refs.firstTable.rowClick(0, "row-click");
      })
    },
    // 点击第二层表查询第三层表数据
    slave_list_table_editRowClick(e,n){
      if(e==this.tableIndex) return
      this.tableIndex = e
      this.$refs.secondTable.reset()
      if(this.itemDTOList[e].reDataList.length==0){
        request.post('/stock/stockBoxUseRe/getBoxUseReMData',{itemId:n.joinItemId}).then(res=>{
          res.filter((item,index)=>{
            this.$refs.secondTable.set(item,index)
          })
          this.itemDTOList[this.tableIndex].reDataList = deepCopy(res)
        })
      }else{
        this.itemDTOList[e].reDataList.filter((item,index)=>{
            this.$refs.secondTable.set(item,index)
        })
      }
    },
    // 确认回调
    formTableDataSubmit(){
      let selectData = this.$refs.firstTable.get()
      let itemDTOList = []
      let _self = this
      selectData.filter((item,index)=>{
        if(item.iisChose){
          itemDTOList.push(_self.itemDTOList[index])
        }
      })
      this.showWindow = false
      this.$emit('submitEvent',itemDTOList)
      this.cliearData()
    },
    // 清空缓存
    cliearData(){
      this.formDataInfo = deepCopy(default_master)
      this.itemDTOList = []
      this.tableIndex = -1//第二层表点击索引
      this.firstTableList = []
      this.secondTableList = []
      this.$refs.secondTable.reset()
      this.$refs.firstTable.reset()
    },
    // 第三层表退货数回调 重算金额面积
    changeQty(row){
      let secondData = this.$refs.secondTable.get();
      let firstData = this.$refs.firstTable.get();    
      let qty = 0
      secondData.filter(item=>{
        qty+=Number(item.qty)
      })
      this.$refs.firstTable.set({qty},this.tableIndex)
      this.setFirstTableMonny()
    },
    // 重算金额 money，单面积 briSArea,面积，briArea
    setFirstTableMonny(){
      let firstData = this.$refs.firstTable.get();    
      let {qty,monny,briArea,briSArea,price}=deepCopy(firstData[this.tableIndex])
      briArea = (Number(briSArea)*Number(qty)).toFixed(2);
      if (this.inSupplier.priceAreaMode) {
        monny =Number(qty)*Number(price)
      }else{
        price = (Number(price)*Number(briSArea)).toFixed(this.inSupplier.ctDot)
        monny =Number(qty)*Number(price)
      }
      this.$refs.firstTable.set({money:monny.toFixed(this.inSupplier.amtDot),briArea},this.tableIndex);
      this.itemDTOList[this.tableIndex].master = firstData[this.tableIndex]
      this.itemDTOList[this.tableIndex].reDataList = this.$refs.secondTable.get(); 
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
