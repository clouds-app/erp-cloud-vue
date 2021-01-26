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
    :show-message="true"
    :model="formDataInfo.master"
    :rules="ruleValidate"
    :label-width="100"
      >
        <Row>
          <Col span="24">
            <Row>
              <Col span="12">
                <FormItem label="供应商编号" prop="supplierId"><!--ref="firstFocusInput"-->
                  <popup
                    :disabled="detailDisabled || action !== 'add'"
                    @on-fill="Initializationdata"
                    v-model="formDataInfo.master.supplierCode"
                    field-name="supplierCode"
                    popup-name="SupplierSingleBox"
                    :fill-model.sync="formDataInfo.master"
                    render-fields="supplierId,supplierCode,supplierName,coinId,coinName,unitId,unitText,priceAreaMode,amtDot,ctDot"
                    from-fields="id,purCode,purName,coinId,coinName,unitId,unitText,priceAreaMode,amtDot,ctDot"
                    :suffix="true"
                    :suffix-model="formDataInfo.master.supplierName"
                    suffixModelName="supplierName"
                    :query-params="{}"
                  />
                </FormItem>
              </Col>
              <Col span="12">
                <Row>
                  <Col span="12">
                    <FormItem label="采购日期" prop="ppoDate">
                      <DatePicker
                        :disabled="detailDisabled"
                        type="date"
                        format="yyyy-MM-dd"
                        :editable="false"
                        :clearable="false"
                        v-model="formDataInfo.master.ppoDate"
                      ></DatePicker>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem label="采购单号" prop="ppoNo">
                      <Input
                        v-model="formDataInfo.master.ppoNo"
                        maxlength="20"
                        placeholder
                        disabled
                      ></Input>
                    </FormItem>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>

          <Col span="12">
            <Row>
              <Col span="12">
                <FormItem label="采购数量" prop="ppoStockQty">
                  <Input
                    v-model="formDataInfo.master.ppoStockQty"
                    maxlength="20"
                    placeholder
                    disabled
                  ></Input>
                </FormItem>
              </Col>

              <Col span="12">
                <FormItem label="采购金额" prop="ppoMoney" width="100%">
                  <Input
                    v-model="formDataInfo.master.ppoMoney"
                    maxlength="20"
                    disabled
                  ></Input>
                </FormItem>
              </Col>
            </Row>
          </Col>

          <Col span="12">
            <Row>
              <Col span="12">
                <FormItem label="货币" prop="coinName">
                  <Input
                    v-model="formDataInfo.master.coinName"
                    maxlength="20"
                    disabled
                  ></Input>
                </FormItem>
              </Col>

              <Col span="12">
                <FormItem label="计量单位" prop="unitText" width="100%">
                  <Input
                    v-model="formDataInfo.master.unitText"
                    maxlength="20"
                    disabled
                  ></Input>
                </FormItem>
              </Col>
            </Row>
          </Col>
          <Col span="24">
            <FormItem label="备注">
              <Input
                v-model="formDataInfo.master.remark"
                :disabled="detailDisabled"
                maxlength="100"
                :autosize="{ minRows: 2, maxRows: 5 }"
                placeholder="请输入备注..."
              ></Input>
            </FormItem>
          </Col>
        </Row>
      </Form>

          <!-- 纸板采购明细表 -->
        <Tabs>
          <TabPane
            label="纸板采购明细表"
            name="name1"
          >
            <eTable
              ref="slave_list_table_edit"
              unqiue-mark="id"
              :height="265"
              :index-menu="true"
              :col-start="0"
              :width="200"
              :row-init-data="initData.initData[`purpaperpoitemFm_new`]"
              :data.sync="submasterTableData"
              :rules="tableFieldsValidator"
              @row-click="slave_list_table_editRowClick"
              @row-delete="slave_list_table_editRowDelete"
              @on-table-change="debouncedGetSuite"
              :showContextMenu="!detailDisabled"
            >
              <template slot="head">
                <tr
                  v-for="(columnGroup, index) in initData.columns[
                    `purpaperpoitemFm_new`
                  ].editGroups"
                  :key="index"
                >
                  <th
                    v-for="(column, index2) in columnGroup"
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
                </tr>
              </template>
              <template
                slot="body"
                slot-scope="{ row, index, valueChangeAssign }"
              >
                <td
                  :class="`ivu-table-column-${column.align}`"
                  v-for="(column, columnIndex) in initData.columns[
                    `purpaperpoitemFm_new`
                  ].editColumns"
                  :key="columnIndex"
                  :width="column.editWidth"
                >
                  <!--控件特殊处理 无单采购  -->
                  <Checkbox
                    v-if="column.key == 'ppoNoOrder'"
                    :disabled="detailDisabled||!!row.ppoInQty||!!row.ppoRqty||!!row.iisClose"
                    size="default"
                    v-model="row[column.key]"
                    @input="
                      value => {
                        valueChangeAssign(value, index, row, 'ppoNoOrder');
                      }
                    "
                    @on-change='setppoDueDate(index,row)'
                ></Checkbox>
                 <!--控件特殊处理 完结  -->
                  <Checkbox
                    v-else-if="column.key == 'iisClose'"
                    disabled
                    size="default"
                    v-model="row[column.key]"
                    @input="
                      value => {
                        valueChangeAssign(value, index, row, 'iisClose');
                      }
                    "
                    @on-change='setppoDueDate(index,row)'
                ></Checkbox>
                  <!--控件特殊处理 工单号  -->
                <Input
                  v-else-if="column.key == 'workNo'"
                  v-model="row[column.key]"
                  disabled
                  @input="
                    value => {
                      valueChangeAssign(value, index, row, 'workNo');
                    }
                  "
                  size="small"
                  :maxlength="20"
                >
                  <Icon
                    v-show="!(!!row.id||!!row.ppoNoOrder||detailDisabled||!!row.ppoInQty||!!row.ppoRqty||!!row.iisClose)"
                    @click="Slave_list_table_editRowModify(index)"
                    slot="suffix"
                    type="md-add"
                  />
                </Input>
                  <!--控件特殊处理 采购数量  -->
                <Input
                  v-else-if="column.key == 'ppoStockQty'"
                  v-model="row[column.key]"
                  :disabled="detailDisabled||!!row.ppoInQty||!!row.ppoRqty||!!row.iisClose||!row.ppoNoOrder"
                  @on-blur="masterQtyBlur(index)"
                  @input="
                    value => {
                      valueChangeAssign(value, index, row, 'ppoStockQty');
                    }
                  "
                  size="small"
                  :maxlength="20"
                ></Input>
                <!--控件特殊处理 单价  -->
                <Input
                  v-else-if="column.key == 'ppoPrice'"
                  v-model="row[column.key]"
                  type="number"
                  :disabled="detailDisabled||!!row.ppoInQty||!!row.ppoRqty||!!row.iisClose"
                  @on-blur="masterMonnyBlur(index,'ppoPrice')"
                  @input="
                    value => {
                      valueChangeAssign(value, index, row, 'ppoPrice');
                    }
                  "
                  size="small"
                  :maxlength="20"
                ></Input>
                <!--控件特殊处理 压线类型  -->
                <Select
                  @on-change="
                    value => {
                      valueChangeAssign(value, index, row, 'ppoScoreType');
                    }
                  "
                  :disabled="detailDisabled||!row.ppoNoOrder||!!row.ppoInQty||!!row.ppoRqty||!!row.iisClose"
                  v-else-if="column.key == 'ppoScoreType'"
                  v-model="row[column.key]"
                  transfer
                >
                  <Option
                    v-for="(item, index) in ppoScoreTypeList"
                    :key="index"
                    :value="item.dicValue + ''"
                    >{{ item.dicLabel }}</Option
                  >
                </Select>
                <!--控件特殊处理 压线深度  -->
                <Select
                  @on-change="
                    value => {
                      valueChangeAssign(value, index,row, 'ppoScoreDepth');
                    }
                  "
                  :disabled="detailDisabled||!row.ppoNoOrder||!!row.ppoInQty||!!row.ppoRqty||!!row.iisClose"
                  v-model="row[column.key]"
                  v-else-if="column.key == 'ppoScoreDepth'"
                  transfer
                >
                  <Option
                    v-for="(item, index) in ppoScoreDepthList"
                    :key="index"
                    :value="item.dicValue + ''"
                    >{{ item.dicLabel }}</Option
                  >
                </Select>
                <!-- 控件特殊处理 本厂纸质 -->
                <popup
                  @on-fill="masterSizeBlur(index)"
                  v-else-if="column.key == 'ppoArtCode'"
                  v-model="row[column.key]"
                  :popupClickValidator="clickValuedate"
                  field-name="ppoArtCode"
                  :disabled="detailDisabled||!row.ppoNoOrder||!!row.ppoInQty||!!row.ppoRqty||!!row.iisClose"
                  popup-name="PurSupplierArtItemSingleBox"
                  :fill-model.sync="submasterTableData"
                  render-fields="supplierArtId,supplierArtName,ppoCorpartId,ppoArtCode,ppoLb,baseWt"
                  from-fields="supplierArtId,supplierArtName,artId,artCode,lbCode,baseWt"
                  :index="index"
                  :init-data="initData.initData[`purpaperpoitemFm_new`]"
                  :excludeParams="{artCodeLeng$ne: row.ppoArtCode + row.ppoLb}"
                  :query-params="{ supplierId: formDataInfo.master.supplierId }"
                  @input="
                    value => {
                      valueChangeAssign(value, index, row, 'ppoArtCode');
                    }
                  "
                ></popup>
                <!-- 控件特殊处理 送货日期 -->
                <DatePicker
                  v-else-if="column.key == 'ppoDueDate'"
                  :disabled="detailDisabled||!!row.ppoInQty||!!row.ppoRqty||!!row.iisClose"
                  v-model="row[column.key]"
                  :clearable="false"
                  :editable="false"
                  transfer
                  type="date"
                  format="yyyy-MM-dd"
                  @input="
                    value => {
                      valueChangeAssign(value, index, row, 'ppoDueDate');
                    }
                  "
                ></DatePicker>
                <!-- 控件特殊处理 完结日期 -->
                <DatePicker
                  v-else-if="column.key == 'breakupDate'"
                  disabled
                  v-model="row[column.key]"
                  :clearable="false"
                  :editable="false"
                  transfer
                  type="date"
                  format="yyyy-MM-dd"
                  @input="
                    value => {
                      valueChangeAssign(value, index, row, 'breakupDate');
                    }
                  "
                ></DatePicker>
                <!-- 控件特殊处理  纸长 -->
                <Input
                  v-else-if="column.key == 'ppoSizeL'"
                  v-model="row[column.key]"
                  type="number"
                  :disabled="detailDisabled||!row.ppoNoOrder||!!row.ppoInQty||!!row.ppoRqty||!!row.iisClose"
                  @on-blur="masterSizeBlur(index)"
                  @input="
                    value => {
                      valueChangeAssign(value, index, row, 'ppoSizeL');
                    }
                  "
                  size="small"
                  :maxlength="20"
                ></Input>
                <!-- 控件特殊处理  纸宽 -->
                <Input
                  v-else-if="column.key == 'ppoSizeW'"
                  v-model="row[column.key]"
                  type="number"
                  @on-blur="masterSizeBlur(index)"
                  :disabled="detailDisabled||!row.ppoNoOrder||!!row.ppoInQty||!!row.ppoRqty||!!row.iisClose"
                  @input="
                    value => {
                      valueChangeAssign(value, index, row, 'ppoSizeW');
                    }
                  "
                  size="small"
                  :maxlength="20"
                ></Input>
                <!-- 控件特殊处理  需购数 -->
                <Input
                  v-else-if="column.key == 'ppoQty'"
                  v-model="row[column.key]"
                  :disabled="detailDisabled||!!row.ppoInQty||!!row.ppoRqty||!!row.iisClose||!row.ppoNoOrder"
                  @on-blur='masterSizeBlur(index)'
                  @input="
                    value => {
                      valueChangeAssign(value, index, row, 'ppoQty');
                    }
                  "
                  size="small"
                  :maxlength="20"
                ></Input>
                <!-- 控件特殊处理  报价 @on-blur="masterSizeBlur(index)"-->
                <Input
                  v-else-if="column.key == 'ppoArtPrice'"
                  v-model="row[column.key]"
                  type="number"
                  disabled
                  @input="
                    value => {
                      valueChangeAssign(value, index, row, 'ppoArtPrice');
                    }
                  "
                  size="small"
                  :maxlength="20"
                ></Input>
                <!-- 控件特殊处理  备品数 -->
                <Input
                  v-else-if="column.key == 'ppoPrepQty'"
                  v-model="row[column.key]"
                  type="number"
                  :disabled="detailDisabled||!row.ppoNoOrder||!!row.ppoInQty||!!row.ppoRqty||!!row.iisClose"
                  @on-blur="masterSizeBlur(index)"
                  @input="
                    value => {
                      valueChangeAssign(value, index, row, 'ppoPrepQty');
                    }
                  "
                  size="small"
                  :maxlength="20"
                ></Input>
                <!-- 控件特殊处理  备注 -->
                <Input
                  v-else-if="column.key == 'remark'"
                  v-model="row[column.key]"
                  :disabled="detailDisabled||!!row.ppoInQty||!!row.ppoRqty||row.iisClose"
                  @on-blur="masterSizeBlur(index)"
                  @input="
                    value => {
                      valueChangeAssign(value, index, row, 'remark');
                    }
                  "
                  size="small"
                  :maxlength="20"
                ></Input>
                <!--控件特殊处理  压线 -->
                <Input
                  v-else-if="column.key == 'ppoSizeLine'"
                  v-model="row[column.key]"
                  :disabled="detailDisabled||!row.ppoNoOrder||!!row.ppoInQty||!!row.ppoRqty||!!row.iisClose"
                  @input="
                    value => {
                      valueChangeAssign(value, index, row, 'ppoSizeLine');
                    }
                  "
                  size="small"
                  :maxlength="20"
                ></Input>
                <!--控件特殊处理  其它 -->
                  <formControl
                    v-else
                    :align="column.align"
                    :control-type="column.controlType"
                    v-model="row[column.key]"
                    disabled
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
          <TabPane
            label="纸板采购信息"
            name="name2"
          >        
            <eTable 
              :showDeleteEvent='true'
              :showContextMenu="false"
              :disabledAddRowWhenfocusNull="true"
              ref="sub_list_table_edit"
              unqiue-mark="id"
              :height="232"
              :index-menu="true"
              :col-start="0"
              :width="200"
              :row-init-data="initData.initData[`purpaperppomdataFm`]"
              :data.sync="subSonTableData"
              @on-table-change="debouncedGetSuite"
              @row-delete="sub_list_table_editRowDelete"
              :rules="tableFieldsValidator"
            >
              <template slot="head">
                <tr
                  v-for="(columnGroup, index) in initData.columns[
                    `purpaperppomdataFm`
                  ].editGroups"
                  :key="index"
                >
                  <th
                    :class="`ivu-table-column-${column.titleAlign}`"
                    v-for="(column, index2) in columnGroup"
                    :key="index2"
                    :width="column.editWidth"
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
                  v-for="(column, subIndex) in initData.columns[`purpaperppomdataFm`].editColumns"
                  :key="subIndex"
                  :width="column.editWidth"
                >
                <!--控件特殊处理 采购数量  -->
                <inputNumber
                  v-if="column.key == 'ppStockQty'"
                  v-model="row[column.key]"
                  :disabled="detailDisabled||!!row.ppInQty||!!row.ppRqty||sondisabled"
                  @on-blur="subQtyBlur(index)"
                  :max="maxppoStockQty(row,'ppQty')"
                  :min='1'
                  @input="
                    value => {
                      valueChangeAssign(value, index, row, 'ppStockQty');
                    }
                  "
                  size="small"
                  :maxlength="20"
                ></inputNumber>
                <!--控件特殊处理 备品数  -->
                <inputNumber
                  v-else-if="column.key == 'ppPrepQty'"
                  v-model="row[column.key]"
                  :disabled="detailDisabled||!!row.ppInQty||!!row.ppRqty||sondisabled"
                  @on-blur="ppPrepQtyBlur(index)"
                  :min='0'
                  @input="
                    value => {
                      valueChangeAssign(value, index, row, 'ppPrepQty');
                    }
                  "
                  size="small"
                  :maxlength="20"
                ></inputNumber>
                 <!--控件特殊处理 压线类型  -->
                <Select
                  @on-change="
                    value => {
                      valueChangeAssign(value, index, row, column.key);
                    }
                  "
                  disabled
                  v-else-if="column.key == 'scoreType'"
                  v-model="row[column.key]"
                  transfer
                >
                  <Option
                    v-for="(item, index) in ppoScoreTypeList"
                    :key="index"
                    :value="item.dicValue + ''"
                    >{{ item.dicLabel }}</Option
                  >
                </Select>
                <!--控件特殊处理 压线深度  -->
                <Select
                  @on-change="
                    value => {
                      valueChangeAssign(value, index, 'scoreDepth');
                    }
                  "
                  disabled
                  v-model="row[column.key]"
                  v-else-if="column.key == 'scoreDepth'"
                  transfer
                >
                  <Option
                    v-for="(item, index) in ppoScoreDepthList"
                    :key="index"
                    :value="item.dicValue + ''"
                    >{{ item.dicLabel }}</Option
                  >
                </Select>
                  <!--控件特殊处理 客户编号  -->
                <Input
                  v-else-if="column.key == 'custCode'"
                  v-model="row[column.key]"
                  :disabled='!sondisabled'
                  @input="
                    value => {
                      valueChangeAssign(value, index, row, 'custCode');
                    }
                  "
                  size="small"
                  :maxlength="20"
                ></Input>
                 <!--控件特殊处理 客户名称  -->
                <Input
                  v-else-if="column.key == 'custName'"
                  v-model="row[column.key]"
                  :disabled='!sondisabled'
                  @input="
                    value => {
                      valueChangeAssign(value, index, row, 'custName');
                    }
                  "
                  size="small"
                  :maxlength="20"
                ></Input>
                  <!--控件特殊处理 产品编号  -->
                <Input
                  v-else-if="column.key == 'prodNo'"
                  v-model="row[column.key]"
                  :disabled="detailDisabled||!!row.ppInQty||!!row.ppRqty||!sondisabled"
                  @input="
                    value => {
                      valueChangeAssign(value, index, row, 'prodNo');
                    }
                  "
                  size="small"
                  :maxlength="20"
                ></Input>
                 <!--控件特殊处理 产品名称  -->
                <Input
                  v-else-if="column.key == 'prodName'"
                  v-model="row[column.key]"
                  :disabled="detailDisabled||!!row.ppInQty||!!row.ppRqty||!sondisabled"
                  @input="
                    value => {
                      valueChangeAssign(value, index, row, 'prodName');
                    }
                  "
                  size="small"
                  :maxlength="20"
                ></Input>
                 <!--控件特殊处理 产品名称  -->
                <Input
                  v-else-if="column.key == 'batchNo'"
                  v-model="row[column.key]"
                  :disabled="detailDisabled||!!row.ppInQty||!!row.ppRqty||!sondisabled"
                  @input="
                    value => {
                      valueChangeAssign(value, index, row, 'batchNo');
                    }
                  "
                  size="small"
                  :maxlength="20"
                ></Input>
                 <!-- 控件特殊处理  备注 -->
                <Input
                  v-else-if="column.key == 'remark'"
                  v-model="row[column.key]"
                  :disabled="detailDisabled||!!row.ppInQty||!!row.ppRqty"
                  @input="
                    value => {
                      valueChangeAssign(value, index, row, 'remark');
                    }
                  "
                  size="small"
                  :maxlength="20"
                ></Input>
                  <!-- 其它 不可以编辑-->
                  <template v-else>
                    <formControl
                      disabled
                      :align="column.align"
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
    <newPurpaperpoSalve
      ref="mySalve"
      :isLoaddingDone="salveWindow.isLoaddingDone"
      :action="salveWindow.action"
      :formDetailData="salveWindow.formDetailData"
      v-model="salveWindow.showEditWindow"
      :supplierData='supplierData'
      :filterFild='filterFild'
      @submitEvent='submitEvent'
    />
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
import newPurpaperpoSalve from "../components/newPurpaperpoSalve";
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
    ppoNo:'',//采购单号
    supplierId:'',//供应商Id
    supplierCode:'',//供应商编号
    supplierName:'',//供应商简称
    ppoStockQty:0,//采购数量
    unitId:'',//计量单位
    unitText:'',//计量单位
    coinId:'',//货币
    coinName:'',//货币
    ppoMoney:0,//采购金额
    ppoDate:dayjs().format("YYYY-MM-DD HH:mm:ss"),//采购日期
    remark:'',//备注
    ctDot:0,//单价小数位
    amtDot:0,//金额小数位
  }
};
let masterfild = [ 
    'ppoArtCode',
    'ppoCorpartId',
    'ppoSizeW',
    'ppoSizeL',
    'ppoLb',
    'ppoStockQty',
    'ppoMoney',
    'biWeight',
    'bpSWeight',
    'ppoArea',
    'ppoCube',
    'ppoDueDate',
    'ppoArtPrice',
    'ppoSCube',
    'ppoQty',
    'ppoPrepQty',
    'remark'
  ];
let subfild = [
  'artCode',
  'artId',
  'sizeW',
  'sizeL',
  'lbCode',
  'ppStockQty',
  'ppMoney',
  'ppWeight',
  'ppSWeight',
  'ppArea',
  'ppCube',
  'ppDeDate',
  'ppQuotePrice',
  'ppSCube',
  'ppQty',
  'ppPrepQty',
  'remark'
  ];

export default {
  name: "edit-boxProductPrice",
  mixins: [editBaseMixins],
  components: {
    editWindow,
    eTable,
    formControl,
    popup,
    newPurpaperpoSalve,
    inputNumber
  },
  data() {
    return {
      sonDELdata:[],//存储第三层表删除数据
      sondisabled:false,//无单采购第三层表数据控制参数
      filterFild:'',//工单弹框过滤字段
      deleteTableList:[],//存储删除数据列表
      ppoScoreTypeList: [], // 获取压线类型
      ppoScoreDepthList: [], // 获取压线深度
      supplierData:{},//供应商弹框数据
      showpreferential: false, // 是否显示优惠方式
      actionSubtitle: "纸板采购订单", // 当前操作副标题
      formInitPreName: "paperPo", // 初始化信息查询 前缀 字段
      formName: "purpaperpoitemFm_new", // 初始化信息查询 表单字段
      requestBaseUrl: "/purchase/paperPo", // 请求 查询 操作的基础路径
      salveWindow: {
        // Tips:"提示：此窗口只显示有供应商纸质/纸板进价的工单！",
        isLoaddingDone: false, // 窗口是否加载完成
        showEditWindow: false, // 是否显示edit-boxSalesOrderSlave 编辑窗口
        action: null, // 当前操作功能 添加/编辑
        formDetailData: {} // 当前表单的详细信息
      },
      masterTableIndex:-1,//存在第二层表格选中数据索引
      subMasterTableData:[],//存储第二层显示数据
      subSonTableData:[],//存储第三层显示数据
      formDataInfo:deepCopy(default_master),
      poItemList:[],// 深拷贝对象和数组,
      ruleValidate: {
        supplierId: [
          { required: true, message: "供应商不能为空", trigger: "blur" }
        ]
      }, // 需要验证的数据
      tableFieldsValidator: {}, // 需要验证的数据表格
    };
  },
  created() {
        this.debouncedGetSuite = _.debounce(this.tableChangeCallback, 800)
        this.getppoScoreTypeList()
        this.getppoScoreDepthList()
  },
  methods:{
      clickValuedate(){
        if(!this.formDataInfo.master.supplierId){
          this.$Message.error('供应商不能为空')
          return false
        }
        return true
      },
      getbiWeight(){},
      // 第二三层表改变回调
      tableChangeCallback(n){
        if(this.masterTableIndex==-1) return
        let masterTableList = this.$refs.slave_list_table_edit.get()
        this.poItemList[this.masterTableIndex].master = masterTableList[this.masterTableIndex]
        this.poItemList[this.masterTableIndex].paperPoDataList = this.$refs.sub_list_table_edit.get()
      },
      // 第二层表表点击回调
      slave_list_table_editRowClick(...pro){
        if (pro[0] == this.masterTableIndex) return
        this.$refs.sub_list_table_edit.reset();
        this.subSonTableData = []
        this.masterTableIndex = pro[0]
        if (!!!this.poItemList[this.masterTableIndex]) {
          this.poItemList.push({
            master:{},
            paperPoDataList:[]
          })
        }
        let subDataList = this.poItemList[this.masterTableIndex].paperPoDataList
        let _setf = this
        subDataList.filter((item,index)=>{
          _setf.$refs['sub_list_table_edit'].set(item,index)
        })
        this.getSondisabled(pro[1])
      },
      // 第二层表表删除回调
      slave_list_table_editRowDelete(index,data){
        if (this.action != 'add') {
          if(!!data.id){
            // let delLiat =deepCopy(this.poItemList[index])
          // delLiat.master.hasDelete = true
          // delLiat.paperPoDataList=[]
          // this.deleteTableList.push(delLiat)
            let [delteData] = this.poItemList.splice(index,1)
            delteData.master.hasDelete = true
            this.deleteTableList.push(delteData)
          }else{
            this.poItemList.splice(index,1)
            this.subMasterTableData = this.$refs.slave_list_table_edit.get()
          }
        }
          this.masterTableIndex = -1
          this.$refs.sub_list_table_edit.reset();
          // this.poItemList.splice(index,1)
          if (this.poItemList.length==0) return
          this.$refs.slave_list_table_edit.rowClick(0, "row-click")
      },
      // 第三层表删除回调
      sub_list_table_editRowDelete(index,data){
        if(this.action!='add'){
          data.hasDelete = true
          this.sonDELdata.push(data)
        }
          this.subQtyBlur()
          this.ppPrepQtyBlur()
      },
      //工单号失去焦点回调
      // onFill(index){},
      // 工单号ICON点击回调
      async Slave_list_table_editRowModify(index){
        let valid = await this.$refs['formDataInfo'].validate()
        if(!valid) return
        this.salveWindow.showEditWindow = true;
        this.salveWindow.isLoaddingDone = true;
        this.salveWindow.action = "add";
        this.$refs.mySalve.clearRithTableList();
        this.getfilterFild()
      },
      // 获取工单弹框过滤字段
      getfilterFild(){
        let filterFild = []
        if (this.poItemList.length==0)return
        this.poItemList.filter(item=>{
          item.paperPoDataList.filter(items=>{
            filterFild.push(items.mateWorkNo)
          })
        })
        this.filterFild = filterFild.toString()
      },
      // 工单弹框确认回调
      submitEvent(e){
        this.checkSelectTableList()
        let [master,paperPoDataList] = [{},[]]
        let _self = this
        e.topTableList.filter((item,index)=>{
          master = deepCopy(item[0])
          _self.$refs.slave_list_table_edit.set(master,index+this.masterTableIndex)
          paperPoDataList = e.bottomTableList[index]
          if (_self.poItemList[this.masterTableIndex+index]) {
            _self.poItemList[this.masterTableIndex+index].master = master
            _self.poItemList[this.masterTableIndex+index].paperPoDataList = paperPoDataList
          }else{
            _self.poItemList.push({master,paperPoDataList})
          }
        })
        console.log(this.poItemList);
        this.masterTableIndex = -1
        this.$refs.slave_list_table_edit.rowClick(0, "row-click")
        this.setppoMoney()
      },
      // 判断点击第二层数据是否以有数据
      checkSelectTableList(){
        if(!this.poItemList[this.masterTableIndex]||!this.poItemList[this.masterTableIndex].master) return
          this.poItemList[this.masterTableIndex].master = []
          this.poItemList[this.masterTableIndex].paperPoDataList = []
      },
      // 供应商选中回调
      Initializationdata(e){
        this.$refs["formDataInfo"].validateField("supplierId", err => {});
        this.supplierData = e[0].orignData

      },
      // 数据提交回调
      formTableDataSubmit(){
        this.isLoaddingDone = false
        setTimeout(() => {
          let parms = this.getqequestData()
          request.post('/purchase/paperPo/saveOrUpdate',parms).then(res=>{
            this.showWindow = false
            this.masterTableIndex = -1
            this.$Message.success('提交成功')
            this.$emit('submit-success')
          }).catch(err=>{

          })
          this.isLoaddingDone = true
        }, 800);
      },
      // 提交表单数据格式化处理
      getqequestData(){
        if (!!this.formDataInfo.master.ppoDate) {
            this.formDataInfo.master.ppoDate = dayjs(this.formDataInfo.master.ppoDate).format("YYYY-MM-DD HH:mm:ss")
        }
        this.poItemList.forEach(item=>{
          this.sonDELdata.filter(sonItem=>{
            if (item.master.id==sonItem.purPaperPoItemId) {
              item.paperPoDataList.push(sonItem)
            }
          })
          item.master.ppoDueDate = dayjs(item.master.ppoDueDate).format("YYYY-MM-DD HH:mm:ss")
          item.paperPoDataList.forEach(items=>{
            items.ppDeDate = dayjs(items.ppDeDate).format("YYYY-MM-DD HH:mm:ss")
          })
        })
        if(this.deleteTableList.length!=0){
          this.deleteTableList.forEach(item=>{
            item.master.ppoDueDate = dayjs(item.master.ppoDueDate).format("YYYY-MM-DD HH:mm:ss")
            item.paperPoDataList.forEach(items=>{
              items.ppDeDate = dayjs(items.ppDeDate).format("YYYY-MM-DD HH:mm:ss")
            })
          })
        }
        return {
            master:this.formDataInfo.master,
            poItemList:[...this.poItemList,...this.deleteTableList],
          }
      },
      // 重写父类 关闭窗口时 触发事件
      closeActionTigger() {
        // fix 清除上次的错误提示 formDataInfo 为表单ref名称
        this.$refs["slave_list_table_edit"].reset();
        this.$refs["sub_list_table_edit"].reset();
        this.formDataInfo = deepCopy(default_master),
        this.masterTableIndex = -1,
        this.poItemList = []
        this.deleteTableList = []
      },
      // 第二层单价失去焦点回调
      /* ppoMoney 金额 ppoSarea 单面积 ppoArea 面积 
      bpSWeight 单重 biWeight 重量 ppoSCube 单体积 
      ppoCube 体积 ppoStockQty 采购数量 ppoPrice 单价 */
      masterMonnyBlur(index,key){
        let tabDataList = this.$refs.slave_list_table_edit.get()
        let ppoMoney = this.getTopppoMoney(tabDataList[index],key)
        this.$refs.slave_list_table_edit.set({ppoMoney},index)
        this.setppoMoney()
        this.masterSizeBlur(index)
      },
      // 第二层表单价金额
      getTopppoMoney(data,key){
        let _ppoMoney = 0 // 金额
        let _ppoPrice = 0 //单价
        let {amtDot,priceAreaMode,ctDot} = this.formDataInfo.master//金额保留小数位
        let {ppoStockQty,ppoSarea,ppoPrice,ppoArtPrice} = data//采购数量
        if(priceAreaMode){
          if(key == 'ppoPrice'){
            _ppoPrice = Number(ppoPrice)
          }else{
            _ppoPrice = Number(ppoArtPrice)
          }
            // 2、金额=单面积 ppoSarea * 采购数量 ppoStockQty* 0.单价 ppoArtPrice,计算出来后，再根据供应商位数控制
            _ppoMoney = Number(ppoSarea)*Number(ppoStockQty)*Number(ppoPrice)
        }else{
          if(key == 'ppoPrice'){
            _ppoPrice = Number(ppoPrice).toFixed(Number(ctDot))
          }else{
            // 1、单价=单面积*报价，计算出来后，再根据供应商位数控制
            _ppoPrice = (ppoSarea*Number(ppoArtPrice)).toFixed(Number(ctDot))
          }
            // 2、金额=单价*采购数量，计算出来后，再根据供应商位数控制
            _ppoMoney = _ppoPrice*ppoStockQty
            this.$refs.slave_list_table_edit.set({ppoPrice:_ppoPrice},this.masterTableIndex)
        }
        return _ppoMoney.toFixed(Number(amtDot))
      },
      // 汇总第二层表金额 数量汇总到主表
      setppoMoney(){
        let tabDataList = this.$refs.slave_list_table_edit.get()
        let [ppoStockQty,ppoMoney] = [0,0]
        tabDataList.filter(item=>{
          ppoStockQty+=Number(item.ppoStockQty)
          ppoMoney+=Number(item.ppoMoney)
        })
        this.formDataInfo.master.ppoStockQty=ppoStockQty
        this.formDataInfo.master.ppoMoney=ppoMoney.toFixed(2)
      },
      // 第二层表采购数量失去焦点回调
      masterQtyBlur(index){
        let tabDataList = this.$refs.slave_list_table_edit.get()
        let {ppoSarea,ppoSCube,bpSWeight,ppoStockQty} = tabDataList[index]
        let ppoMoney = this.getTopppoMoney(tabDataList[index],'ppoMoney')
        this.$refs.slave_list_table_edit.set({
          ppoArea:(Number(ppoSarea)*Number(ppoStockQty)).toFixed(2),
          ppoCube:(Number(ppoSCube)*Number(ppoStockQty)).toFixed(2),
          biWeight:(Number(bpSWeight)*Number(ppoStockQty)).toFixed(2),
          ppoMoney
        },index)
        this.setppoMoney()
        this.masterSizeBlur(index)
      },
      // 获取第二层表采购数量最大值
      maxppoStockQty(data,key){
        if(!data.ppoNoOrder){
          if (!!data && !!data[key]) {
            return data[key]
          }
        }
        return 99999
      },
      // 重写父类 数据初始化后 自动调用
      formDetailDataCall() {
        this.supplierData = {
          id:this.formDataInfo.master.supplierId,
          priceAreaMode:this.formDataInfo.master.priceAreaMode,
          ctDot:this.formDataInfo.master.ctDot,
          amtDot:this.formDataInfo.master.amtDot
        }
        if (this.action != "add") {
          if (this.formDataInfo.poItemList.length==0) {
            this.poItemList.push({master:{},paperPoDataList:[]})
          }else{
            this.poItemList = this.formDataInfo.poItemList
          }
          this.formDataInfo.poItemList.filter((item,index)=>{
            this.$refs.slave_list_table_edit.set(item.master,index)
          })
          this.$refs.slave_list_table_edit.rowClick(0, "row-click")
        }
        // 数据初始化，把第二层表的master组装成一个List结构
      },

      // 无单采购默认赋值送货日期
      setppoDueDate(index,row){
        let day = Number(this.$params.PaperPODueDate)
        let ppoDueDate = dayjs().add(day, 'day').format("YYYY-MM-DD HH:mm:ss")
        this.$refs.slave_list_table_edit.set({ppoDueDate},index)
        this.getSondisabled(row)
      },
      // 判断是否无单采购,控制滴三层表数据
      getSondisabled(row){
        if(row.ppoNoOrder){
          this.sondisabled = true
        }else{
          this.sondisabled = false
        }
      },
      // 无单采购 纸长 纸宽 算单面积-->面积
      async masterSizeBlur(index){
        let masterTableList = this.$refs.slave_list_table_edit.get();
        let {ppoCorpartId,ppoSizeL,ppoSizeW,ppoNoOrder} = masterTableList[index];
        let valid = await this.$refs['formDataInfo'].validate()
        if(!valid) return
        if(!ppoCorpartId||!Number(ppoSizeL)||!Number(ppoSizeW)||!ppoNoOrder)return
        this.calcMoneyAreaWeight(index)
      },
      // 无单采购计算金额，重量，体积等信息
      calcMoneyAreaWeight(index){
        /* supplierId(供应商id),ppoCorpartId(纸质id),supplierArtId(供应商纸质id),
        ppoLb(楞别),ppoDate(采购日期),ppoSizeL(纸长),
        ppoSizeW(纸宽),ppoStockQty(采购数量),ppoArtPrice(报价)
        ,ppoPrice(单价),baseWt(基重),ppoNoOrder(无单采购) */
        let supplierId = this.formDataInfo.master.supplierId
        let masterTableList = this.$refs.slave_list_table_edit.get()
        let {ppoCorpartId,supplierArtId,ppoLb,ppoDate,ppoSizeL,ppoSizeW
        ,ppoStockQty,ppoArtPrice,ppoPrice,baseWt,ppoNoOrder} = masterTableList[index]
        let parms = {supplierId,ppoCorpartId,supplierArtId,ppoLb,ppoDate,ppoSizeL,ppoSizeW
        ,ppoStockQty,ppoArtPrice,ppoPrice,baseWt,ppoNoOrder}
        let url = '/purchase/paperPo/spCalcPaperPo'
        request.post(url,parms).then(res=>{
          this.$refs.slave_list_table_edit.set({
              biWeight:res.biWeight,//重量
              bpSWeight:res.bpSWeight,//单重
              ppoCube:res.ppCube,//体积
              ppoSCube:res.ppSCube,//单体积
              ppoArea:res.ppoArea,//面积
              ppoArtPrice:res.ppoArtPrice,//报价
              ppoMoney:res.ppoMoney,//金额
              ppoPrice:res.ppoPrice,//单价
              ppoSarea:res.ppoSarea,//单面积           
          },index)
          this.setppoMoney()
          this.transforField()
        }).catch(err=>{
          this.$Message.error('计算失败')
        })
      },
      // 无单采购,赋值第三成表
      transforField(){
        /* 纸质，纸宽，纸长，楞别，采购数量，金额，重量,单重,面积,体积   需购，备品，备注*/
        let masterTableList = this.$refs.slave_list_table_edit.get();
        let clickTableData = masterTableList[this.masterTableIndex];
        let subTableList = this.$refs.sub_list_table_edit.get();
        let tranforsubList = {}
        masterfild.forEach((item,index)=>{
          tranforsubList[subfild[index]] = clickTableData[item]
        })
        this.$refs.sub_list_table_edit.set(tranforsubList,0)
      },


      // 第三层表采购数量回调
      subQtyBlur(){
        let subTableList = this.$refs.sub_list_table_edit.get()
        let ppoStockQty = 0
        subTableList.filter(item=>{
          ppoStockQty+=Number(item.ppStockQty)
        })
        this.$refs.slave_list_table_edit.set({ppoStockQty},this.masterTableIndex)
        this.masterQtyBlur(this.masterTableIndex)
      },
      // 第三层表备品数回调
      ppPrepQtyBlur(){
        let subTableList = this.$refs.sub_list_table_edit.get()
        let ppoPrepQty = 0
        subTableList.filter(item=>{
          ppoPrepQty+=Number(item.ppPrepQty)
        })
        this.$refs.slave_list_table_edit.set({ppoPrepQty},this.masterTableIndex)
      },
      // 获取压线类型
      getppoScoreTypeList() {
        request
          .get("/common/sys/dic/childList/ppoScoreType", {}, { qt: "pValue" })
          .then(res => {
            res.forEach(item => {
              item.dicValue = parseInt(item.dicValue);
            });
            this.ppoScoreTypeList = res;
          });
      },
      // 获取压线深度
      getppoScoreDepthList() {
        request
          .get("/common/sys/dic/childList/ppoScoreDepth", {}, { qt: "pValue" })
          .then(res => {
            res.forEach(item => {
              item.dicValue = parseInt(item.dicValue);
            });
            this.ppoScoreDepthList = res;
            // console.log(res)
          });
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
