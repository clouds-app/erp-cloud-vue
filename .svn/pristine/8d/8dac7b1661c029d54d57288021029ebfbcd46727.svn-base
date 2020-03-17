<template>
  <div>
    <editWindow
      class="cl-edit-paperPrice"
      :title="actionLableName"
      v-model="showWindow"
      :fullscreen="false"
      width="90%"
      :loading="!isLoaddingDone"
      :spinLoaddingText="spinLoaddingText"
      @on-ok="formTableDataSubmit()"
      v-if="initData.columns"
    >
      <Form
        ref="formDataInfo"
        :show-message="true"
        :model="formDataInfo.master"
        :rules="ruleValidate"
        :label-width="100"
        label-colon
      >
        <Row>
            <Col span="12">
                <FormItem label="排程单号" prop="bppNo">
                  <Input disabled v-model="formDataInfo.master.bppNo" maxlength="20" placeholder></Input>
                </FormItem>
              </Col>
              <Col span="12">
                    <FormItem label="班别" prop="bppClassCode">
                            <popup
                            @on-fill="Initializationdata"
                            v-model="formDataInfo.master.bppClassCode"
                            field-name="bppClassCode"
                            :disabled="false"
                            popup-name="TeamSingleBox"
                            :fill-model.sync="formDataInfo.master"
                            render-fields="bppClassId,bppClassCode,bppClassName"
                            from-fields="id,teamCode,teamName"
                            :suffix="true"
                            :suffix-model="formDataInfo.master.bppClassName"
                            :query-params="{}"
                            />
                    </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="排程日期">
                    <DatePicker
                    type="date"
                    format="yyyy-MM-dd HH:mm:ss "
                    v-model="formDataInfo.master.bppDate"
                    ></DatePicker>
                </FormItem>
                </Col>
          
                <Col span="12">
                    <FormItem label="备注">
                    <Input
                        v-model="formDataInfo.master.remark"
                        type="textarea"
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
        <TabPane label="工单明细" name="name1">
          <eTable
            ref="tableFields"
            unqiue-mark="id"
            :index-menu="true"
            :col-start="0"
            :width="200"
            :row-init-data="initData.initData.mrpBoxProdPlanItemFm"
            :data.sync="formDataInfo.boxProdPlanItemSlave.defaultList"
            :rules="tableFieldsValidator"
          >
            <template slot="head">
              <tr>
                <th class="ivu-table-column-center" width="80">
                  <div class="ivu-table-cell">
                    <span class>工单号</span>
                  </div>
                </th>
                <th class="ivu-table-column-center" width="100">
                  <div class="ivu-table-cell">
                    <span class>交货日期</span>
                  </div>
                </th>
                <th class="ivu-table-column-center" width="80">
                  <div class="ivu-table-cell">
                    <span class>客户名称</span>
                  </div>
                </th>
                <th class="ivu-table-column-center" width="80">
                  <div class="ivu-table-cell">
                    <span class>产品编号</span>
                  </div>
                </th>
                <th class="ivu-table-column-center" width="80">
                  <div class="ivu-table-cell">
                    <span class>产品名称</span>
                  </div>
                </th>
                <th class="ivu-table-column-center" width="60">
                  <div class="ivu-table-cell">
                    <span class>料号</span>
                  </div>
                </th>
                <th class="ivu-table-column-center" width="70">
                  <div class="ivu-table-cell">
                    <span class>工单数</span>
                  </div>
                </th>
                <th class="ivu-table-column-center" width="90">
                  <div class="ivu-table-cell">
                    <span class>本次排程数</span>
                  </div>
                </th>
                <th class="ivu-table-column-center" width="80">
                  <div class="ivu-table-cell">
                    <span class>生产纸质</span>
                  </div>
                </th>
                <th class="ivu-table-column-center" width="80">
                  <div class="ivu-table-cell">
                    <span class>生产盒式</span>
                  </div>
                </th>
                <th class="ivu-table-column-center" width="70">
                  <div class="ivu-table-cell">
                    <span class>生产长</span>
                  </div>
                </th>
                <th class="ivu-table-column-center" width="70">
                  <div class="ivu-table-cell">
                    <span class>生产宽</span>
                  </div>
                </th>
                <th class="ivu-table-column-center" width="70">
                  <div class="ivu-table-cell">
                    <span class>生产高</span>
                  </div>
                </th>
                <th class="ivu-table-column-center" width="70">
                  <div class="ivu-table-cell">
                    <span class>备注</span>
                  </div>
                </th>
                <th class="ivu-table-column-center" width="60">
                  <div class="ivu-table-cell">
                    <span class>工序</span>
                  </div>
                </th>
                <th class="ivu-table-column-center" width="80">
                  <div class="ivu-table-cell">
                    <span class>用料规格</span>
                  </div>
                </th>
                <th class="ivu-table-column-center" width="80">
                  <div class="ivu-table-cell">
                    <span class>唛头编号</span>
                  </div>
                </th>
                <th class="ivu-table-column-center" width="80">
                  <div class="ivu-table-cell">
                    <span class>印版编号</span>
                  </div>
                </th>
                <th class="ivu-table-column-center" width="80">
                  <div class="ivu-table-cell">
                    <span class>模板编号</span>
                  </div>
                </th>
                <th class="ivu-table-column-center" width="70">
                  <div class="ivu-table-cell">
                    <span class>颜色</span>
                  </div>
                </th>
                <th class="ivu-table-column-center" width="90">
                  <div class="ivu-table-cell">
                    <span class>客户产品编号</span>
                  </div>
                </th>
                <th class="ivu-table-column-center" width="90">
                  <div class="ivu-table-cell">
                    <span class>客户产品名称</span>
                  </div>
                </th>
              </tr>
            </template>

            <template slot="body" slot-scope="{ row, index, valueChangeAssign }">
              <!-- 工单号 -->
              <td class="ivu-table-column-left" width="100">
                  <Input
                  v-model="row.bppWorkNo"
                  @on-blur="onFill(index)"
                  icon="md-add"
                  @on-click="Slave_list_table_editRowModify(index)"
                  @input="
                      value => {
                        valueChangeAssign(value, index, row, 'bppWorkNo');
                      }
                    "
                  size="small"
                  :maxlength="20"
                ></Input>
              </td>
              <!-- 交货日期 -->
              <td class="ivu-table-column-left" width="100">
                <DatePicker
                  type="date"
                  format="yyyy-MM-dd"
                  v-model="row.biDeDate"
                  @input="
                      value => {
                        valueChangeAssign(value, index, row, 'biDeDate');
                      }
                    "
                ></DatePicker>
              </td>
              <!-- 客户名称 -->
              <td class="ivu-table-column-left" width="100">
                <Input
                  v-model="row.custName"
                  disabled
                  @input="
                      value => {
                        valueChangeAssign(value, index, row, 'custName');
                      }
                    "
                  size="small"
                  :maxlength="20"
                ></Input>
              </td>
              <!-- 产品编号 -->
              <td class="ivu-table-column-left" width="100">
                <Input
                  v-model="row.bppProdNo"
                  disabled
                  @input="
                      value => {
                        valueChangeAssign(value, index, row, 'bppProdNo');
                      }
                    "
                  size="small"
                  :maxlength="20"
                ></Input>
              </td>
              <!-- 产品名称 -->
              <td class="ivu-table-column-left" width="100">
                <Input
                  v-model="row.bpName"
                  disabled
                  @input="
                      value => {
                        valueChangeAssign(value, index, row, 'bpName');
                      }
                    "
                  size="small"
                  :maxlength="20"
                ></Input>
              </td>
              <!-- 料号 -->
              <td class="ivu-table-column-left" width="100">
                <Input
                  v-model="row.bppBatchNo"
                  disabled
                  @input="
                      value => {
                        valueChangeAssign(value, index, row, 'bppBatchNo');
                      }
                    "
                  size="small"
                  :maxlength="20"
                ></Input>
              </td>
              <!-- 工单数 -->
              <td class="ivu-table-column-left" width="100">
                <Input
                  v-model="row.bppProdQty"
                  disabled
                  @input="
                      value => {
                        valueChangeAssign(value, index, row, 'bppProdQty');
                      }
                    "
                  size="small"
                  :maxlength="20"
                ></Input>
              </td>
              <!-- 本次排程数 -->
              <td class="ivu-table-column-left" width="100">
                <Input
                  v-model="row.bppQty"
                  disabled
                  @input="
                      value => {
                        valueChangeAssign(value, index, row, 'bppQty');
                      }
                    "
                  size="small"
                  :maxlength="20"
                ></Input>
              </td>
              <!-- 生产纸质 -->
              <td class="ivu-table-column-left" width="100">
                <Input
                  v-model="row.artCode"
                  disabled
                  @input="
                      value => {
                        valueChangeAssign(value, index, row, 'artCode');
                      }
                    "
                  size="small"
                  :maxlength="20"
                ></Input>
              </td>
              <!-- 生产盒式 -->
              <td class="ivu-table-column-left" width="100">
                <Input
                  v-model="row.boxCode"
                  disabled
                  @input="
                      value => {
                        valueChangeAssign(value, index, row, 'boxCode');
                      }
                    "
                  size="small"
                  :maxlength="20"
                ></Input>
              </td>
              <!-- 生产长 -->
              <td class="ivu-table-column-left" width="100">
                <Input
                  v-model="row.bpPSizeL"
                  disabled
                  @input="
                      value => {
                        valueChangeAssign(value, index, row, 'bpPSizeL');
                      }
                    "
                  size="small"
                  :maxlength="20"
                ></Input>
              </td>
               <!-- 生产宽 -->
              <td class="ivu-table-column-left" width="100">
                <Input
                  v-model="row.bpPSizeW"
                  disabled
                  @input="
                      value => {
                        valueChangeAssign(value, index, row, 'bpPSizeW');
                      }
                    "
                  size="small"
                  :maxlength="20"
                ></Input>
              </td>
               <!-- 生产高 -->
              <td class="ivu-table-column-left" width="100">
                <Input
                  v-model="row.bpPSizeH"
                  disabled
                  @input="
                      value => {
                        valueChangeAssign(value, index, row, 'bpPSizeH');
                      }
                    "
                  size="small"
                  :maxlength="20"
                ></Input>
              </td>
              <!-- 备注 -->
              <td class="ivu-table-column-left" width="100">
                <Input
                  v-model="row.remark"
                  @input="
                      value => {
                        valueChangeAssign(value, index, row, 'remark');
                      }
                    "
                  size="small"
                  :maxlength="20"
                ></Input>
              </td>
               <!-- 工序 -->
              <td class="ivu-table-column-left" width="100">
                <Input
                  v-model="row.wplName"
                  disabled
                  @input="
                      value => {
                        valueChangeAssign(value, index, row, 'wplName');
                      }
                    "
                  size="small"
                  :maxlength="20"
                ></Input>
              </td>
               <!-- 用料规格 -->
              <td class="ivu-table-column-left" width="100">
                <Input
                  v-model="row.bppArtWL"
                  disabled
                  @input="
                      value => {
                        valueChangeAssign(value, index, row, 'bppArtWL');
                      }
                    "
                  size="small"
                  :maxlength="20"
                ></Input>
              </td>
               <!-- 唛头编号 -->
              <td class="ivu-table-column-left" width="100">
                <Input
                  v-model="row.bpPMNo"
                  disabled
                  @input="
                      value => {
                        valueChangeAssign(value, index, row, 'bpPMNo');
                      }
                    "
                  size="small"
                  :maxlength="20"
                ></Input>
              </td>
               <!-- 印版编号 -->
              <td class="ivu-table-column-left" width="100">
                <Input
                  v-model="row.bpPPNo"
                  disabled
                  @input="
                      value => {
                        valueChangeAssign(value, index, row, 'bpPPNo');
                      }
                    "
                  size="small"
                  :maxlength="20"
                ></Input>
              </td>
               <!-- 模板编号-->
              <td class="ivu-table-column-left" width="100">
                <Input
                  v-model="row.bpDPNo"
                  disabled
                  @input="
                      value => {
                        valueChangeAssign(value, index, row, 'bpDPNo');
                      }
                    "
                  size="small"
                  :maxlength="20"
                ></Input>
              </td>
               <!-- 颜色-->
              <td class="ivu-table-column-left" width="100">
                <Input
                  v-model="row.bpColorName"
                  disabled
                  @input="
                      value => {
                        valueChangeAssign(value, index, row, 'bpColorName');
                      }
                    "
                  size="small"
                  :maxlength="20"
                ></Input>
              </td>
               <!-- 客户产品编号-->
              <td class="ivu-table-column-left" width="100">
                <Input
                  v-model="row.bpCustProdNo"
                  disabled
                  @input="
                      value => {
                        valueChangeAssign(value, index, row, 'bpCustProdNo');
                      }
                    "
                  size="small"
                  :maxlength="20"
                ></Input>
              </td>
               <!-- 客户产品名称-->
              <td class="ivu-table-column-left" width="100">
                <Input
                  v-model="row.bpCustProdName"
                  disabled
                  @input="
                      value => {
                        valueChangeAssign(value, index, row, 'bpCustProdName');
                      }
                    "
                  size="small"
                  :maxlength="20"
                ></Input>
              </td>
            </template>
          </eTable>
        </TabPane>
      </Tabs>
    </editWindow>
    <Slave
      ref="mychild"
      :isLoaddingDone="salveWindow.isLoaddingDone"
      :formDetailData="salveWindow.formDetailData"
      :action="salveWindow.action"
      v-model="salveWindow.showEditWindow"
      :List="List"
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
 * @author Andy Huang
 *
 * @created 2019/11/20 17:07:54
 */
// import preferential from "@/components/preferential/preferential";
import popup from "@/components/popup/popup";
import editWindow from "@/components/edit-window/edit-window";
// import Form from '@/components/form/form'
import eTable from "@/components/e-table/e-table";
import request from "@/libs/request";
import editBaseMixins from "../../mixins/edit";
import optionSearch from "../../components/optionSearch";
import dayjs from "dayjs";
import Sys from "@/api/sys";
import Slave from "./edit-boxprodplanSlave"
const default_formDataInfo = {
  // 主表 更改字段
  master: {
    bppClassName: "",
    bppNo: "",
    createTime: "",
    createUser: "",
    createUsername: "",
    bppDate: dayjs().format("YYYY-MM-DD"),
    remark: ""
  },
  // 子表 artLengs 根据实际接口更改,其它不变
  boxProdPlanItemSlave: {
    addList: [], // 添加列
    defaultList: [], // 默认列
    deleteList: [], // 删除列
    updateList: [] // 更新列
  }
};
export default {
  name: "edit-boxprodplan",
  mixins: [editBaseMixins],
  components: {
    editWindow,
    optionSearch,
    // preferential,
    eTable,
    popup,
    Slave
    // Form,
  },
  data() {
    return {
        salveWindow:{
            // Tips:"提示：此窗口只显示有供应商纸质/纸板进价的工单！",
            isLoaddingDone: false, // 窗口是否加载完成
            showEditWindow: false, // 是否显示edit-boxSalesOrderSlave 编辑窗口
            action:'add',// 当前操作功能 添加/编辑
            formDetailData:{} // 当前表单的详细信息
        },
        WorkOrderNumber:null,
        List:null,
      actionSubtitle:'工单明细', // 当前操作副标题
      formName:"mrpBoxProdPlanItemFm",
      showpreferential: false,
      requestBaseUrl: "/mrp/boxprodplan", // 请求 查询 操作的基础路径
      formDataInfo: Object.assign({}, default_formDataInfo), // 防止添加和更新数据提交发生冲突
      itemInitData: {
      },
      // 需要验证的数据
      ruleValidate: {
        // purCode:[{
        //     required: true,
        //     message: "供应商错误",
        //     trigger: "blur,change"
        // }],
        //  pactNo: [
        //   { required: true, message: "合同编号不能为空", trigger: "blur" }
        //  ]
      },
      tableFieldsValidator: {
        // supplierArtName:[{
        //     required: true,
        //     message: "供应商纸质错误",
        //     trigger: "blur"
        // }],
        // artCode:[{
        //     required: true,
        //     message: "本厂纸质错误",
        //     trigger: "blur"
        // }],
        //  pactNo: [
        //   { required: true, message: "合同编号不能为空", trigger: "blur" }
        //  ]
      },
      subBoxClickIndex: -1,
      getsupplierId: 0
    };
  },
  // mounted(){
  //   this.init()
  // },
  methods: {
    //工单号失去焦点事件
    onFill(){
        
    },
    //接受工单号传回来的数据
    closeMain(){},
      //工单号点击事件
    Slave_list_table_editRowModify(){
        this.salveWindow.showEditWindow=true
        this.salveWindow.isLoaddingDone =true
        this.salveWindow.action ='add'

    },
    //判断数据是新增还是修改
    formDetailDataCall() {
      //debugger
          if (this.action != "add") {
            //debugger
            this.getsupplierId = this.formDataInfo.master.bppClassId;
          }
    },
    //当主表客户弹框改变时促发初始化子表数据
    Initializationdata(data) {
      //debugger
        //   let tableData = this.$refs["tableFields"].dataChangeMark.data.row;
          if (this.formDataInfo.master.bppClassId) {
            if (this.formDataInfo.master.bppClassId != this.getsupplierId) {
              this.formDataInfo.boxProdPlanItemSlave.defaultList = []
            //   tableData.deleteList = tableData.updateList;
            }
            this.getsupplierId = this.formDataInfo.master.bppClassId;
          }
    },
    // 重写父类 关闭窗口时 触发事件
    closeActionTigger() {
      //debugger
      // fix 清除上次的错误提示 formDataInfo 为表单ref名称
      this.$refs["formDataInfo"].resetFields();
      this.$refs["tableFields"].reset();
     },
    clickValuedate() {
      //debugger;
      if (
        !this.formDataInfo.master.purCode ||
        this.formDataInfo.master.purCode == ""
      ) {
        this.$Message.error("供应商编号不能为空");
        return false;
      }
      return true;
    },
    // 重写父类,添加时候,清空数据
    HandleFormDataInfo() {
      this.formDataInfo = Object.assign({}, default_formDataInfo);
    },
    // 重写父类,修改提交数据
    resetformDataInfo(_data) {
      let tableData = this.$refs["tableFields"].getCategorizeData();
      //debugger
      this.formDataInfo.boxProdPlanItemSlave = tableData;
      if (!!_data.master.bppDate) {
        _data.master.bppDate = dayjs(_data.master.bppDate).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        return this.formDataInfo;
      }
      //从表时间处理
      if (tableData.addList.length) {
        for (let i = 0; i < tableData.addList.length; i++) {
          if (!!_data.purPaperPoItemSlaves.addList[i].bppDate) {
            _data.purPaperPoItemSlaves.addList[i].bppDate = dayjs(
              _data.purPaperPoItemSlaves.addList[i].bppDate
            ).format("YYYY-MM-DD HH:mm:ss");
          }
        }
        return this.formDataInfo;
      }
      if (tableData.updateList.length) {
        for (let i = 0; i < tableData.updateList.length; i++) {
          if (!!_data.purPaperPoItemSlaves.updateList[i].bppDate) {
            _data.purPaperPoItemSlaves.updateList[i].bppDate = dayjs(
              _data.purPaperPoItemSlaves.updateList[i].bppDate
            ).format("YYYY-MM-DD HH:mm:ss");
          }
        }
        return this.formDataInfo;
      }
    }
  }
};
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
.cl-edit-paperPrice .right-text{
  width: 160%;
}
</style>
