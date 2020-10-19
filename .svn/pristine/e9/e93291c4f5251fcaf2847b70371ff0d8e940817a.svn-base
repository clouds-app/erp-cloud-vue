<template>
  <div>
    <editWindow
    :draggable="false"
      :zindex="30"
      class="cl-edit-window-invoiceCheck"
      :title="editWindowTitle"
      v-model="showWindow"
      :fullscreen="false"
      width="70%"
      :loading="false"
      :spinLoaddingText="spinLoaddingText"
      @on-ok="formTableDataSubmit()"
      :disabledSubmitBtn="disabledSubmitBtn"
    >
      <div  ref="masterHeight">
        <Form
          ref="formDataInfo"
          :show-message="true"
          :model="formDataInfo.master"
          :rules="masterRuleValidate"
          :label-width="40"
        >
           <Row type="flex">
            <Col span="6">
              <FormItem
                :label-width="100"
                :label="searchConfig.title"
                prop="keyWord"
              >
                <Input
                  :clearable="true"
                  maxlength="20"
                  v-model="formDataInfo.master.keyWord"
                  placeholder="搜索关键字"
                ></Input>
              </FormItem>
            </Col>
            <Col span="4">
              <FormItem :label-width="20">
                <RadioGroup v-model="formDataInfo.master.likeFlag">
                  <Radio label="1">模糊</Radio>
                  <Radio label="0">精准</Radio>
                </RadioGroup>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="日期" prop="searchDay">
                <DatePicker
                  transfer
                  style="width: 120px"
                  v-model="formDataInfo.master.startDate"
                  type="date"
                  format="yyyy-MM-dd"
                ></DatePicker>
                -
                <DatePicker
                  transfer
                  style="width: 120px"
                  v-model="formDataInfo.master.endDate"
                  type="date"
                  format="yyyy-MM-dd"
                ></DatePicker>
              </FormItem>
            </Col>

            <Col span="1">
              <FormItem>
                <Button
                  :loading="loadingData"
                  @click="searchDataBy()"
                  type="primary"
                >
                  <Icon type="md-search" />
                  搜索
                </Button>
              </FormItem>
            </Col>
          </Row>
        </Form>
        <eTable
          v-if="initColData.columns && showTableData"
          ref="slave_list_table_edit"
          :showContextMenu="false"
          unqiue-mark="id"
          :height="500"
          :index-menu="true"
          :col-start="0"
          :row-init-data="{}"
          :data="formDataInfo[searchParams.type].defaultList"
          :rules="slaveTableFieldsValidator"
          @row-click="slave_list_table_editRowClick"
        >
          <template slot="head">
            <tr
              v-for="(columnGroup, index) in initColData.columns[
                `${functionParams.formInitPreName}`
              ].editGroups"
              :key="index"
            >
              <template v-for="(column, index2) in columnGroup">
                <th
                  v-if="excludeFiled('itemFm', column.key)"
                  @click="searchKeyType(column.key, column.title)"
                  :key="index2"
                  :class="`ivu-table-column-${column.titleAlign}`"
                  :width="column.editWidth"
                  :colspan="column.colSpan"
                  :rowspan="column.rowSpan"
                  :columnKey="column.key"
                  :style="
                    excludeFiled('search', column.key) ? 'cursor:pointer' : ''
                  "
                >
                  <div class="ivu-table-cell">
                    <span class="">{{ column.title }}</span>
                  </div>
                </th>
              </template>
            </tr>
          </template>
          <template slot="body" slot-scope="{ row, index, valueChangeAssign }">
            <template
              v-for="(column, subIndex) in initColData.columns[
                `${functionParams.formInitPreName}`
              ].editColumns"
            >
              <td
                :key="subIndex"
                :class="`ivu-table-column-${column.align}`"
                v-if="excludeFiled('itemFm', column.key)"
                :width="column.editWidth"
              >
                <!-- 控件特殊处理 订单编号 -->
                <template v-if="column.key == 'iisChose'">
                  <Checkbox
                    @on-change="onChange_SlaveItemChcBox(index)"
                    v-model="row[column.key]"
                    :disabled="column.readOnly"
                  ></Checkbox>
                </template>
                <!--其它 控件 -->
                <template v-else>
                  <formControl
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
      </div>
    </editWindow>
  </div>
</template>

<script>
/**
 * @desc edit-outWriteOffSlave 描述 冲销选收票/冲销选付款
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
import popup from "@/components/popup/popup";
import editWindow from "@/components/edit-window/edit-window";
import eTable from "@/components/e-table/e-table";
import request from "@/libs/request";
import editBaseMixins from "../../mixins/edit";
import optionSearch from "../../components/optionSearch";
import dayjs from "dayjs";
import Sys from "@/api/sys";
import formControl from "@/components/form-control/form-control";
import { deepCopy } from "view-design/src/utils/assist";
const default_formDataInfo = {
  // 主表 更改字段
  master: {
    keyWord: "",
    likeFlag: "1",
    startDate: dayjs()
      .subtract(1, "month")
      .format("YYYY-MM-DD"),
    endDate: dayjs().format("YYYY-MM-DD")
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
};
export default {
  name: "edit-boxDeli",
  mixins: [editBaseMixins],
  components: {
    editWindow,
    optionSearch,
    eTable,
    popup,
    formControl
  },
  props: {
    // 搜索参数对象,从父类填充参数过来
    searchParams: {
      type: Object,
      default: () => {
        return {
          //  custId,// 客户id
        };
      }
    }
  },
  data() {
    return {
      disabledSubmitBtn:false,// 是否禁用提交按钮
      showTableData:false,
      editWindowTitle:'冲销选收票',
      // 查询配置参数
      functionParams: {
        formInitPreName: "", // 查询表格列头信息 前缀 例如:outwriteoff inFm outwriteoff outFm
        requestBaseUrl: "/account/outWriteOff", // 查询 表格行 数据 接口前缀地址
        uniqueId: "owoId" // 查询详细的唯一ID,需要顶部查询中使用
      },
      formDataInfo: deepCopy(default_formDataInfo), // Object.assign({}, default_formDataInfo), // 防止添加和更新数据提交发生冲突
      masterRuleValidate: {}, // 纸箱出货 需要验证的数据
      slaveTableFieldsValidator: {}, // 纸箱出货明细 需要验证的数据
      subTableFieldsValidator: {}, // 出货其他费用 需要验证的数据
      boxDeliSubItemsList: [], //工单明细列表
      masterHeight: 0, //表单高度
      otherHeight: 0, //剩余高度
      initColData: {},// 临时 列头数据
      outwriteoffinFm:{},//收票明细 列头数据
      outwriteoffoutFm:{},//付款明细 列头数据
      loadingData: false, // 查询中
      searchConfig: {
        title: "单据号",
        keyField: "vicNo"
      }
    };
  },
  computed: {
  
  },
  watch: {
    showWindow: function(n, o) {
      if (n) {
        let _self = this;
        this.$nextTick(() => {
          _self.searchDataBy();
        
        });
      }
    }
  },
  created() {
   this.loadColumsData('writeOffInItems')
   this.loadColumsData('writeOffOutItems')
  },
  methods: {
     // 重写父类 关闭窗口时 触发事件
    closeActionTigger() {
      // fix 清除上次的错误提示 formDataInfo 为表单ref名称
      this.$refs["formDataInfo"].resetFields();
      this.$refs["slave_list_table_edit"].reset();
      this.initColData ={}
      this.showTableData=false
    },
    // 工单row选择事件回调
    onChange_SlaveItemChcBox(index) {},
    // 通过参数查询数据列表
    searchDataBy() {
      this.disabledSubmitBtn = true
      this.formDataInfo[this.searchParams.type].defaultList = [];
      //参数包括 :明细列表输入开票编号时带出开票明细信息的条件：likeFlag=0,icNo=xx,custId=xx
      //参数包括：startDate(开始日期),endDate(结束日期),supplierId(供应商id),
      //likeFlag(1模糊查询0精准查询),vicNo(收票编号),vicNoList(已选的收票编号集合，用逗号隔开)，
     // 明细列表输入收票编号时带出收票明细信息的条件：likeFlag=0,vicNo=xx,supplierId=xx
      let params = {
        // startDate: dayjs(this.formDataInfo.master.startDate).format( "YYYY-MM-DD"), //(开始日期)
        // endDate: dayjs(this.formDataInfo.master.endDate).format("YYYY-MM-DD"), //(结束日期)
        supplierId: this.searchParams.supplierId, //(客户id)
        likeFlag: this.formDataInfo.master.likeFlag, //(1模糊查询0精准查询)
      };
      if(!!this.formDataInfo.master.startDate){
        params.startDate = dayjs(this.formDataInfo.master.startDate).format( "YYYY-MM-DD")
      }
      if(!!this.formDataInfo.master.endDate){
         params.endDate = dayjs(this.formDataInfo.master.endDate).format("YYYY-MM-DD")
      }
      this.loadingData = true;
      let searchParams = 'getVendInvoiceInfoBoxData'
      if(this.searchParams.type ==='writeOffOutItems'){
           //writeOffOutItems :付款明细
           searchParams = "getPaymentBoxData";
           this.editWindowTitle ='冲销选付款'
           params.gNo = this.formDataInfo.master.keyWord,//this.getCurrentKeyTypeWords("icNo"), //(收票编号)
           params.gNoList = this.searchParams.selectedNoList, //已选的集合，用逗号隔开
           this.functionParams.formInitPreName = 'outwriteoffoutFm'
           this.initColData = deepCopy(this.outwriteoffoutFm ) 
          
      }else{
        // writeOffInItems :收票明细,
         this.editWindowTitle ='冲销选收票'
          params.vicNo = this.formDataInfo.master.keyWord,//this.getCurrentKeyTypeWords("icNo"), //(收票编号)
          params.vicNoList = this.searchParams.selectedNoList, //已选的集合，用逗号隔开
          this.functionParams.formInitPreName = 'outwriteoffinFm'
          this.initColData = deepCopy(this.outwriteoffinFm) 
      }
      this.showTableData =true
      request
        .post(`${this.functionParams.requestBaseUrl}/${searchParams}`, params)
        .then(res => {
          if (res && res.length > 0) {
            this.formDataInfo[this.searchParams.type].defaultList = res;
            this.disabledSubmitBtn = false
          }
          this.loadingData = false;
          
        })
        .catch(err => {
          this.loadingData = false;
        });
    },
    // 工单列表行点击事件回调
    slave_list_table_editRowClick(index) {},
    // 默认选择行数据
    setDefaultSelectedRow(index = 0) {
      //debugger
      let slaveObj = this.$refs["slave_list_table_edit"];
      if (slaveObj) {
        slaveObj.rowClick(index, "row-click");
      }
    },
    // 获取关键字类型
    searchKeyType(keyField, keyTitle) {
      //inArNo 单据号，inShortName 简称
      if (this.excludeFiled("search", keyField)) {
        this.searchConfig.title = keyTitle;
        this.searchConfig.keyField = keyField;
      }
    },
    // 获取当前搜索类型的关键字
    getCurrentKeyTypeWords(field) {
      if (field == this.searchConfig.keyField) {
        return this.formDataInfo.master.keyWord;
      } else {
        return "";
      }
    },
    // 加载列头数据
    loadColumsData(type) {
      //纸箱出货弹出框主表数据(虚拟)
      let _self = this;
      let isInFm =true
      let formName = "outwriteoffinFm";
       if(type ==='writeOffOutItems'){
           // writeOffInItems :收票明细,writeOffOutItems :付款明细
           formName = "outwriteoffoutFm";
           isInFm=false
       }
      let url = `/sys/form/init/${formName}`;
      request.get(url).then(res => {
        if (res != null) {
            if(isInFm){
              _self.outwriteoffinFm = res;
            }else{
              _self.outwriteoffoutFm = res;
            }
        }
      });
    },
    // 排除不需要显示的字段
    excludeFiled(type, key) {
      let exListItemFm = [];
      let searchList = [];
      let exList = [];
      switch (type) {
        case "itemFm":
          exList = exListItemFm;
          break;
        case "search":
          exList = searchList;
          break;
        default:
          exList = [];
          break;
      }
      let isExist = exList.includes(key);
      if (type === "search") {
        isExist = !isExist;
      }
      if (isExist) {
        return false;
      } else {
        return true;
      }
    },

    // 重写父类,修改提交数据
    resetformDataInfo() {
      let choseDataList = this.formDataInfo[this.searchParams.type].defaultList.filter(item => {
        return item.iisChose == true;
      });
      return choseDataList;
    },

    // 提交主从表数据
    formTableDataSubmit() {
      // 为方便返回数据容易操作,特组合需要的数据参数
      let paramsData = {
        data:this.resetformDataInfo(),// 选择的数据列表
        type:this.searchParams.type, // 类型: writeOffInItems :收票明细,writeOffOutItems :付款明细
        uniqueId:(this.searchParams.type ==='writeOffOutItems'?'gNo':'icNo'),// 唯一区别码 判断是否存在
        money:(this.searchParams.type ==='writeOffOutItems'?'accAmt':'icAmt'),// 发票金额/入帐金额 是否为空
        suffix:(this.searchParams.type ==='writeOffOutItems'?'OutFm':'InFm'),// 表单后缀
      }
      if (paramsData.data.length > 0) {
        this.showWindow = false; // 关闭当前编辑页面
        this.$emit("submit-success", paramsData); // 刷新主页面数据
      } else {
        this.$Message.error("请勾选需要操作的数据!!");
        return;
      }
    }
  }
};
</script>

<style>
.cl-edit-window-invoiceCheck .masterHeightClass {
  height: 50%;
  overflow: auto;
}
.cl-edit-window-invoiceCheck .otherHeightClass {
  height: 50%;
  overflow: hidden;
}
</style>
