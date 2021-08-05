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
          :show-message="false"
          :model="formDataInfo.master"
          :rules="ruleValidate"
          :label-width="100"
          label-colon
        >
          <Row type="flex">
            <Col
              span="8"
              v-for="(columns, index) in initData.columns[`${formInitPreName}Fm`]
                .editColumns"
              :key="index"
            >
              <FormItem :label="columns.title" :prop="columns.key">
                <!-- 控件特殊处理 生效日期 -->
                <DatePicker
                  v-if="columns.key == 'effectDate'"
                  :disabled="detailDisabled"
                  type="datetime"
                  format="yyyy-MM-dd HH:mm:ss"
                  :placeholder="columns.title"
                  v-model="formDataInfo.master[columns.key]"
                ></DatePicker>
               
                <!-- 其它 通用控件 -->
                <formControl
                  v-else
                  :control-type="columns.controlType"
                  :disabled="detailDisabled || columns.readOnly"
                  :placeholder="columns.title"
                  v-model="formDataInfo.master[columns.key]"
                ></formControl>
              </FormItem>
            </Col>
          </Row>
        </Form>

        <Tabs>
          <!-- 送货通知单(明细表) -->
          <TabPane
            :label="initData.listView[`${formInitPreName}ItemFm`].tableDesc"
            name="name1"
          >
            <eTable
              ref="slave_list_table_edit"
              unqiue-mark="id"
              :height="300"
              :index-menu="true"
              :col-start="0"
              :width="200"
              :row-init-data="initData.initData[`${formInitPreName}ItemFm`]"
              :data.sync="slavesForm.masterList"
              :rules="tableFieldsValidator"
              @row-click="slave_list_table_editRowClick"
              @row-delete="slave_list_table_editRowDelete"
              :showContextMenu="!detailDisabled"
            >
              <template slot="head">
                <tr
                  v-for="(columnGroup, index) in initData.columns[
                    `${formInitPreName}ItemFm`
                  ].editGroups"
                  :key="index"
                >
                  <th
                    :class="`ivu-table-column-${column.titleAlign}`"
                    v-for="(column, index2) in columnGroup"
                    :key="index2"
                    :width="column.width"
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
                    `${formInitPreName}ItemFm`
                  ].editColumns"
                  :key="columnIndex"
                  :width="column.width"
                >
                  <!-- 控件特殊处理 订单号 -->
                  <Input
                    v-if="column.key == 'bcNo'"
                    v-model="row[column.key]"
                    :disabled="detailDisabled"
                    @input="
                      value => {
                        valueChangeAssign(value, index, row, column.key);
                      }
                    "
                    size="small"
                    :maxlength="40"
                    icon="md-add"
                    @on-click="showExpression(column.key, index)"
                  />
                  <!-- 其它 :placeholder="column.key"-->
                  <formControl
                    :align="column.align"
                    v-else
                    :control-type="column.controlType"
                    v-model="row[column.key]"
                    :disabled="detailDisabled || column.readOnly"
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
          <!-- 送货通知单(产品明细表) -->
          <TabPane
            :label="initData.listView[`${formInitPreName}DataFm`].tableDesc"
            name="name1"
          >
            <eTable
              :showContextMenu="false"
              :disabledAddRowWhenfocusNull="true"
              ref="sub_list_table_edit"
              unqiue-mark="id"
              :height="240"
              :index-menu="true"
              :col-start="0"
              :width="200"
              :row-init-data="{}"
              :data.sync="slavesForm.SubList"
              :rules="tableFieldsValidator"
            >
              <template slot="head">
                <tr
                  v-for="(columnGroup, index) in initData.columns[
                    `${formInitPreName}DataFm`
                  ].editGroups"
                  :key="index"
                >
                  <th
                    :class="`ivu-table-column-${column.titleAlign}`"
                    v-for="(column, index2) in columnGroup"
                    :key="index2"
                    :width="column.width"
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
                slot-scope="{ row, index, tableColTiggerEvent }"
              >
                <td
                  :class="`ivu-table-column-${column.align}`"
                  v-for="(column, subIndex) in initData.columns[
                    `${formInitPreName}DataFm`
                  ].editColumns"
                  :key="subIndex"
                  :width="column.width"
                >
                  <!-- 其它 不可以编辑-->
                  <template >
                    <formControl
                      :align="column.align"
                      :disabled="detailDisabled || column.readOnly"
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
    <!-- 优惠方式 -->
    <coNoDataModel
      v-model="showpreferential"
      @preferential-ok="preferentialOk"
      :renderJsonStr="renderJsonStr"
      :disabled="detailDisabled"
      :bcNos="bcNos"
    ></coNoDataModel>
  </div>
</template>

<script>
/**
 * @desc edot-saleDeliReqFm 送货通知单 描述
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
import coNoDataModel from "../model/coNoDataModel.vue";
import editWindow from "@/components/edit-window/edit-window";
// import Form from '@/components/form/form'
import eTable from "@/components/e-table/e-table";
import request from "@/libs/request";
import editBaseMixins from "../../mixins/edit";
import dayjs from "dayjs";
import formControl from "@/components/form-control/form-control";
import popup from "@/components/popup/popup";
import { deepCopy } from "view-design/src/utils/assist";
// eslint-disable-next-line camelcase
const slavesForm_default = {
  // 子表单
  name: "boxDeliReqItemDtoList", // 子表单名称
  ItemFmRowIndex: 0,
  masterList: [],
  SubList: [],
  SubItems: [],
  CrurrentRowBpNo: "" // 当前选中行的产品编号
};
let defaultMasterData = {};
export default {
  name: "edot-saleDeliReqFm",
  mixins: [editBaseMixins],
  components: {
    coNoDataModel,
    editWindow,
    // Form,
    eTable,
    formControl,
    popup
  },
  data() {
    return {
      renderJsonStr: "", // 回填优惠方式 字符串
      getcustid: 0, // 上一次修改前的客户编号
      showpreferential: false, // 是否显示优惠方式
      subBoxClickIndex: -1, // 优惠方式 参数
      actionSubtitle: "送货通知单", // 当前操作副标题
      formInitPreName: "saleDeliReq", // 初始化信息查询 前缀 字段
      formName: "saleDeliReqFm", // 初始化信息查询 表单字段
      requestBaseUrl: "/sale/deliReq", // 请求 查询 操作的基础路径
      formDataInfo: {
        // 主表单信息
        master: {}
      },
      bcNos:"",
      ruleValidate: {
        custCode: [
          { required: true, message: "客户编号不能为空", trigger: "blur" }
        ]
      }, // 需要验证的数据
      tableFieldsValidator: {}, // 需要验证的数据表格
      slavesForm: JSON.parse(JSON.stringify(slavesForm_default)), // 深拷贝对象和数组,
    };
  },
  watch: {
    showWindow: function(n, o) {
      if (n) {
        let _self = this;
        this.$nextTick(() => {
           _self.setMasterDefaultData();
        });
      }
    },
    // 第一步执行 获取到 master 数据
    initData: {
      handler(n, o) {
        if (n.initData) {
          defaultMasterData = Object.assign({}, n.initData.master);
          this.formDataInfo.master = n.initData.master;
        }
      },
      deep: true
    }
  },
  computed: {
    popUpExcludeParamsList() {
      // eslint-disable-next-line no-tabs
      // 获取产品编号	列表，转换为 "",""格式，用于弹出框排除数据
      // 事件冲突,暂时屏蔽
    //   let temp = [];
    //   this.slavesForm.masterList.forEach((item, index) => {
    //     // debugger
    //     if (item && item.bpNo != null) {
    //       // 注意:
    //       temp.push(item.bpNo); // 注意:
    //     }
    //   });
    //   return temp.toString();
    }
  },
  methods: {
    // 主表字段 默认值设置
    setMasterDefaultData() {
    //   this.formDataInfo.master["effectDate"] = dayjs().format(
    //     "YYYY-MM-DD HH:mm:ss"
    //   );
    },
    // 默认选择行数据
    setDefaultSelectedRow() {
      let slaveObj = this.$refs["slave_list_table_edit"];
      if (slaveObj) {
        slaveObj.rowClick(0, "row-click");
      }
    },
    // 删除回调事件,选中上一行 数据
    slave_list_table_editRowDelete(index, Item) {
      let slaveObj = this.$refs["slave_list_table_edit"];
      if (slaveObj) {
        if (index !== 0) {
          slaveObj.rowClick(index - 1, "row-click");
          this.deleteLastOneData(index);
        } else {
          // fix 主表只有一行数据,删除后,子表依旧显示原始数据
          this.deleteLastOneData(index);
          setTimeout(() => {
            slaveObj.rowClick(0, "row-click");
          }, 500);
        }
      }
    },
    deleteLastOneData(index) {
      // 删除主表数据,子表数据应该置空
      this.slavesForm.SubItems.splice(index,1)
      this.slavesForm.SubList = this.slavesForm.SubItems[index-1]
    },
    // 重写父类 关闭窗口时 触发事件
    closeActionTigger() {
      // fix 清除上次的错误提示 formDataInfo 为表单ref名称
      this.$refs["formDataInfo"].resetFields();
      this.$refs["slave_list_table_edit"].reset();
    },
  
    // 打开订单号，参数，当前类型：
    showExpression() {
      let data =  this.$refs["slave_list_table_edit"].get();
      let str = ''
      data.forEach(item=>{
        if(item.bcNo){
          if(str==''){
            str = item.bcNo
          }else{
            str +=","+item.bcNo
          }
        }
      })
      this.bcNos = str
      this.showpreferential = true;
    },
    // 订单号 确认后的回调方法
    async preferentialOk(arr) {
        for(var i=0;i<arr.length;i++){
             await this.requestData(arr[i],i)
        }
    },
    async requestData(item,index){
        let res = await request.post('/sale/deliReq/sub/getBoxMainItem?bcNo='+item.bcNo) 
        this.slavesForm.SubItems.push(deepCopy(res.boxDeliPopItemList))
        if(index == 0){
            this.slavesForm.masterList[this.slavesForm.ItemFmRowIndex]=res.boxDeliPopList[0]
            this.slavesForm.SubList=this.slavesForm.SubItems[this.slavesForm.ItemFmRowIndex]
        }else{
            this.slavesForm.masterList.push(res.boxDeliPopList[0])
        }
    },
    // 重写父类,添加时候,清空数据
    HandleFormDataInfo() {
      this.formDataInfo.master = Object.assign({}, defaultMasterData); // 浅拷贝对象
      this.formDataInfo.master.drDate = dayjs().format("YYYY-MM-DD HH:mm:ss");
      this.slavesForm = JSON.parse(JSON.stringify(slavesForm_default)); // 深拷贝对象
    },
    // 重写父类,修改提交数据
    resetformDataInfo() {
      let _self = this;
      let data = {
        master: this.formDataInfo.master
      };
      // 时间格式化
      if (data.master.drDate !== "") {
        data.master.drDate = dayjs(data.master.drDate).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      }
      let slavesItem = [];
      let slaveTableDataList = this.$refs["slave_list_table_edit"].getTableEditData();
      slaveTableDataList.forEach((item, index) => {
        slavesItem.push({
          master: item,
          boxDeliReqDataList:this.slavesForm.SubItems[index] // 注意: 此字段需要修改 saleBoxProductPriceSubs
        });
      });
      data[`${this.slavesForm.name}`] = slavesItem;
      // debugger
      return data;
    },
   
    // 子表点击事件 显示第三层表的数据
    slave_list_table_editRowClick(index) {
        this.slavesForm.ItemFmRowIndex = index;
        this.slavesForm.SubList = [];
        this.slavesForm.SubList = this.slavesForm.SubItems[index]
    },

    // 重写父类 数据初始化后 自动调用
    formDetailDataCall() {
      if (this.action != "add") {
        this.getcustid = this.formDataInfo.master.drNo;
      }
      // 数据初始化，把第二层表的master组装成一个List结构
      this.slavesForm.masterList = [];
      let _self = this;
      this.formDataInfo[`${this.slavesForm.name}`].forEach((item, index) => {
        _self.slavesForm.masterList.push(item.master);
        _self.slavesForm.SubItems.push(item.boxDeliReqDataList) 
      });
      // 数据加载完成后触发点击第一型数据
      this.setDefaultSelectedRow();
    },
    // 重写父类 提交数据 三层表
    formTableDataSubmit() {
      // debugger
      let data = this.resetformDataInfo();
      this.$refs["formDataInfo"].validate(valid => {
        if (!valid) {
          return;
        }
        let result = this.$refs["slave_list_table_edit"].validate();
        if (result) {
          return;
        }
        // console.log(JSON.stringify(data))
        request
          .post(`${this.requestBaseUrl}/saveOrUpdate`, data)
          .then(res => {
            this.showWindow = false; // 关闭当前编辑页面
            this.$Message.success("执行成功");
            this.$emit("submit-success"); // 刷新主页面数据
            // eslint-disable-next-line handle-callback-err
          })
          .catch(err => {
            // this.$Message.error('执行失败')
          });
      });
    }
  }
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
