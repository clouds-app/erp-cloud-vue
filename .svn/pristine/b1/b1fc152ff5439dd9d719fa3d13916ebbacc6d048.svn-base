<template>
  <div>
    <editWindow
      id="cl-edit-salesOrder"
      :title="actionLableName"
      v-model="showWindow"
      :fullscreen="false"
      width="90%"
      :loading="!isLoaddingDone"
      :spinLoaddingText="spinLoaddingText"
      @on-ok="submitFormDataEvent"
    >
      <div v-if="formDataInfo.master">
        <Form
          ref="formDataInfo"
          :show-message="true"
          :model="formDataInfo.master"
          :rules="ruleValidate"
          :label-width="124"
        >
          <div class="edit-purPaperPoSlave">
            
             <Row>
              <Col span="5" >
                <FormItem label="客户PO号" prop="inBiWorkNo">
                  <Input v-model="formDataInfo.master.inBiWorkNo" maxlength="20" placeholder="客户PO号"></Input>
                </FormItem>
              </Col>
              <Col span="5" >
                <FormItem label >
                  <RadioGroup v-model="formDataInfo.master.flag">
                    <Radio label="0">模糊</Radio>
                    <Radio label="1">精准</Radio>
                  </RadioGroup>
                </FormItem>
              </Col>
              <Col span="7">
                <Row>
                  <Col span="12" style="width: 60%;">
                    <FormItem label="订单日期" style="margin-left:-5%;">
                      <DatePicker
                        type="date"
                        format="yyyy-MM-dd"
                        v-model="formDataInfo.master.beginDate"
                      ></DatePicker>
                    </FormItem>
                  </Col>
                  <Col span="12" style="width: 40%;">
                    <FormItem label="--" style="margin-left:-60%;">
                      <DatePicker
                        type="date"
                        format="yyyy-MM-dd"
                        v-model="formDataInfo.master.endDate"
                      ></DatePicker>
                    </FormItem>
                  </Col>
                </Row>
              </Col>
              <Col span="1">
                <FormItem label >
                  <Button type="primary" @click="clickmaster()">搜索</Button>
                </FormItem>
              </Col>
              
            </Row>
          </div>
        </Form>

        <Tabs>
          <!--  注意:eTable formDataInfo.wareHouseItems.defaultList  ===wareHouseItems=== 需要根据实际接口修改,其它不变-->
          <TabPane>
            <eTable ref="slave_edit-boxUseLost"
              :height="400"
              :index-menu="true"
              :col-start="0"
              :width="200"
              :row-init-data="WorkOrderNumber"
              :data.sync="productMDatasTableDataList"
              :rules="tableFieldsValidator"
            >
              <template slot="head">
                <tr>
                  <th class="ivu-table-column-center" width="35">
                    <div class="ivu-table-cell">
                      <span class>选择</span>
                    </div>
                  </th>
                  <th class="ivu-table-column-center" width="60">
                    <div class="ivu-table-cell">
                      <span class>订单编号</span>
                    </div>
                  </th>
                  <th class="ivu-table-column-center" width="50">
                    <div class="ivu-table-cell">
                      <span class>工单号</span>
                    </div>
                  </th>
                  <th class="ivu-table-column-center" width="60">
                    <div class="ivu-table-cell">
                      <span class>客户编号</span>
                    </div>
                  </th>
                  <th class="ivu-table-column-center" width="60">
                    <div class="ivu-table-cell">
                      <span class>客户简称</span>
                    </div>
                  </th>
                  <th class="ivu-table-column-center" width="70">
                    <div class="ivu-table-cell">
                      <span class >客户PO号</span>
                    </div>
                  </th>
                  <th class="ivu-table-column-center" width="60">
                    <div class="ivu-table-cell">
                      <span class>产品编号</span>
                    </div>
                  </th>
                  <th class="ivu-table-column-center" width="60">
                    <div class="ivu-table-cell">
                      <span class >产品名称</span>
                    </div>
                  </th>
                  <th class="ivu-table-column-center" width="30">
                    <div class="ivu-table-cell">
                      <span class >料号</span>
                    </div>
                  </th>
                  <th class="ivu-table-column-center" width="50">
                    <div class="ivu-table-cell">
                      <span class >工单数</span>
                    </div>
                  </th>
                  <th class="ivu-table-column-center" width="60">
                    <div class="ivu-table-cell">
                      <span class >已入库数</span>
                    </div>
                  </th>
                  <th class="ivu-table-column-center" width="70">
                    <div class="ivu-table-cell">
                      <span class >本次入库数</span>
                    </div>
                  </th>
                  <th class="ivu-table-column-center" width="60">
                    <div class="ivu-table-cell">
                      <span class >生产盒式</span>
                    </div>
                  </th>
                  <th class="ivu-table-column-center" width="90">
                    <div class="ivu-table-cell">
                      <span class >生产纸质/楞别</span>
                    </div>
                  </th>
                  <th class="ivu-table-column-center" width="50">
                    <div class="ivu-table-cell">
                      <span class >生产长</span>
                    </div>
                  </th>
                  <th class="ivu-table-column-center" width="50">
                    <div class="ivu-table-cell">
                      <span class >生产宽</span>
                    </div>
                  </th>
                  <th class="ivu-table-column-center" width="50">
                    <div class="ivu-table-cell">
                      <span class >生产高</span>
                    </div>
                  </th>
                  <th class="ivu-table-column-center" width="60">
                    <div class="ivu-table-cell">
                      <span class >印刷说明</span>
                    </div>
                  </th>
                 
                </tr>
              </template>
              <template slot="body" slot-scope="{ row, index, valueChangeAssign }">
                <!-- 选择 -->
                <td class="ivu-table-column-center" width="100">
                  <Checkbox
                    size="default"
                    v-model="row.Choice"
                    @input="
                      value => {
                        valueChangeAssign(value, index, row, 'Choice');
                      }
                    "
                  ></Checkbox>
                </td>
                <!-- 订单编号 -->
                <td class="ivu-table-column-left" width="100">
                  <Input
                    disabled
                    v-model="row.boxUseBatchNo"
                    @input="
                        value => {
                          valueChangeAssign(value, index, row, 'boxUseBatchNo');
                        }
                      "
                    size="small"
                    :maxlength="20"
                  ></Input>
                </td>
                <!-- 工单号 -->
                <td class="ivu-table-column-left" width="100">
                  <Input
                    v-model="row.pliWorkNo"
                    disabled
                    @input="
                        value => {
                          valueChangeAssign(value, index, row, 'pliWorkNo');
                        }
                      "
                    size="small"
                    :maxlength="20"
                  ></Input>
                </td>
                <!-- 客户编号-->
                <td class="ivu-table-column-left" width="100">
                  <Input
                    disabled
                    v-model="row.pliCoNo"
                    @input="
                      value => {
                          valueChangeAssign(value, index, row, 'pliCoNo');
                      }
                      "
                    size="small"
                    :maxlength="20"
                  ></Input>
                </td>
                <!-- 客户简称-->
                <td class="ivu-table-column-left" width="100">
                  <Input
                    disabled
                    v-model="row.prodName"
                    @input="
                      value => {
                          valueChangeAssign(value, index, row, 'prodName');
                      }
                      "
                    size="small"
                    :maxlength="20"
                  ></Input>
                </td>
                <!-- 客户PO号 -->
                <td class="ivu-table-column-left" width="100">
                  <Input
                    disabled
                    v-model="row.housewsName"
                    @input="
                        value => {
                          valueChangeAssign(value, index, row, 'housewsName');
                        }
                      "
                    size="small"
                    :maxlength="20"
                  ></Input>
                </td>
                <!-- 产品编号	 -->
                <td class="ivu-table-column-left" width="100">
                  <Input
                    disabled
                    v-model="row.boiStoreQty"
                    @input="
                        value => {
                          valueChangeAssign(value, index, row, 'boiStoreQty');
                        }
                      "
                    size="small"
                    :maxlength="20"
                  ></Input>
                </td>
                <!-- 产品名称-->
                <td class="ivu-table-column-left" width="100">
                  <Input
                    disabled
                    v-model="row.artCode"
                    @input="
                        value => {
                          valueChangeAssign(value, index, row, 'artCode');
                        }
                      "
                    size="small"
                    :maxlength="20"
                  ></Input>
                </td>
                <!-- 料号-->
                <td class="ivu-table-column-left" width="100">
                  <Input
                    disabled
                    v-model="row.lbCode"
                    @input="
                        value => {
                          valueChangeAssign(value, index, row, 'lbCode');
                        }
                      "
                    size="small"
                    :maxlength="20"
                  ></Input>
                </td>
                <!-- 工单数	 -->
                <td class="ivu-table-column-left" width="100">
                  <Input
                    disabled
                    v-model="row.sizeLength"
                    @input="
                        value => {
                          valueChangeAssign(value, index, row, 'sizeLength');
                        }
                      "
                    size="small"
                    :maxlength="20"
                  ></Input>
                </td>
                <!-- 已入库数	 -->
                <td class="ivu-table-column-left" width="100">
                  <Input
                    disabled
                    v-model="row.sizeWidth"
                    @input="
                      value => {
                          valueChangeAssign(value, index, row, 'sizeWidth');
                      }
                      "
                    size="small"
                    :maxlength="20"
                  ></Input>
                </td>
                <!-- 本次入库数	 -->
                <td class="ivu-table-column-left" width="100">
                  <Input
                    disabled
                    v-model="row.sizeWidth"
                    @input="
                      value => {
                          valueChangeAssign(value, index, row, 'sizeWidth');
                      }
                      "
                    size="small"
                    :maxlength="20"
                  ></Input>
                </td>
                <!-- 生产盒式	 -->
                <td class="ivu-table-column-left" width="100">
                  <Input
                    disabled
                    v-model="row.sizeWidth"
                    @input="
                      value => {
                          valueChangeAssign(value, index, row, 'sizeWidth');
                      }
                      "
                    size="small"
                    :maxlength="20"
                  ></Input>
                </td>
                <!-- 生产纸质/楞别	 -->
                <td class="ivu-table-column-left" width="100">
                  <Input
                    disabled
                    v-model="row.sizeWidth"
                    @input="
                      value => {
                          valueChangeAssign(value, index, row, 'sizeWidth');
                      }
                      "
                    size="small"
                    :maxlength="20"
                  ></Input>
                </td>
                <!-- 生产长	 -->
                <td class="ivu-table-column-left" width="100">
                  <Input
                    disabled
                    v-model="row.sizeWidth"
                    @input="
                      value => {
                          valueChangeAssign(value, index, row, 'sizeWidth');
                      }
                      "
                    size="small"
                    :maxlength="20"
                  ></Input>
                </td>
                <!-- 生产宽	 -->
                <td class="ivu-table-column-left" width="100">
                  <Input
                    disabled
                    v-model="row.sizeWidth"
                    @input="
                      value => {
                          valueChangeAssign(value, index, row, 'sizeWidth');
                      }
                      "
                    size="small"
                    :maxlength="20"
                  ></Input>
                </td>
                <!-- 生产高	 -->
                <td class="ivu-table-column-left" width="100">
                  <Input
                    disabled
                    v-model="row.sizeWidth"
                    @input="
                      value => {
                          valueChangeAssign(value, index, row, 'sizeWidth');
                      }
                      "
                    size="small"
                    :maxlength="20"
                  ></Input>
                </td>
                <!-- 印刷说明	 -->
                <td class="ivu-table-column-left" width="100">
                  <Input
                    disabled
                    v-model="row.sizeWidth"
                    @input="
                      value => {
                          valueChangeAssign(value, index, row, 'sizeWidth');
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
        <!-- <productSpec
          v-model="productSpecShow"
          ref="productSpec"
          

          :bpMoCut="formDataInfo.master.bpMoCut"
        ></productSpec> -->
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
 * @author Andy Huang
 *
 * @created 2019/11/20 17:07:54
 */
import tableSelect from "@/components/table-select/table-select";
import editWindow from "@/components/edit-window/edit-window";
// import Form from '@/components/form/form'
import eTable from "@/components/e-table/e-table";
import request from "@/libs/request";
import popup from "@/components/popup/popup";
import editBaseMixins from "../../mixins/edit";
import InputNumber from "@/components/input-number";
import formControl from "@/components/form-control/form-control";
import { customValidator } from "@/libs/validator";
import calc from "@/libs/calc";
import list from '../../mixins/list';
import dayjs from "dayjs";
export default {
  name: "edit-purPaperPoSlave",
  mixins: [editBaseMixins],
  components: {
    editWindow,
    popup,
    tableSelect,
    eTable,
    InputNumber,
    formControl,
  },
   

  created() {
    //debugger
    // console.log(this.List)
  },
   props:{ 
      List:{
        type: String,
        default: '0'  
      },
      WorkOrderNumber1:{
        type: Object,
        defaule:'null'
      }
    },
  data() {
    return {
      //actionSubtitle: "纸箱销售订单明细", // 当前操作副标
      productSpecShow: false,
      formDataInfo: {
        // 主表 更改字段
        master: {},
        productMDatas: {
            boxUseBatchNo:"",//用料批次号
            pliWorkNo:"",// 用料工单号
            pliCoNo:"",// 工单号
            housewsName:"",//仓位
            boiStoreQty:"",//当时库存
            artCode:"",// 纸质
            lbCode:"",// 楞别
            sizeWidth:"",// 纸宽
            sizeLength:"",// 纸长
            productId:"",//     产品id
            bpNo:"",//  产品编号
            prodName:"",// 产品名称
        },
        // List:thsi.list
      }, // 防止添加和更新数据提交发生冲突
      // 需要验证的数据
      ruleValidate: {},
      tableFieldsValidator: {
          
       },
      WorkOrderNumber: {
          boxUseBatchNo:"",//用料批次号
            pliWorkNo:"",// 用料工单号
            pliCoNo:"",// 工单号
            housewsName:"",//仓位
            boiStoreQty:"",//当时库存
            artCode:"",// 纸质
            lbCode:"",// 楞别
            sizeWidth:"",// 纸宽
            sizeLength:"",// 纸长
            productId:"",//     产品id
            bpNo:"",//  产品编号
            prodName:"",// 产品名称
      },
      productMDatasTableDataList: [], //存放处理过后的数据:[],
      timeoutId: 0,
      requestCount: 0,
      table:[], //存储子表全部对应的字段
    };
  },
  computed: {
  },
  methods: {
    //搜索点击事件
    clickmaster(){
      debugger
      let inBiWorkNo = this.formDataInfo.master.inBiWorkNo
      let flag = this.formDataInfo.master.flag
       request.post(`/stock/boxUseLost/getWorkNo`,{inBiWorkNo,flag}).then(res => {
        // this.WorkOrderNumber = res
        this.$refs['slave_edit-boxUseLost'].cloneData = res
      })
    },

    //加载表单初始化数据
    getFormInitDataObj(data) {
       debugger;
      //加载表单初始化数据
      this.formDataInfo["master"] = {
        inBiWorkNo:"",
        flag:"0",
      }
      if (data==''||data==null) {
        return
      }
      this.$refs['slave_edit-boxUseLost'].cloneData=data

    },

    //表单数据提交事件
    submitFormDataEvent() {
       debugger;
      //表单数据提交事件
      // true就是有问题
      let result = this.$refs['slave_edit-boxUseLost'].validate();
        if (result) {
          return;
        }
        let parms = []
        let submitDataObj = this.$refs['slave_edit-boxUseLost'].cloneData
        for (let index = 0; index < submitDataObj.length; index++) {
          let Choice = this.$refs['slave_edit-boxUseLost'].cloneData[index].Choice
          if(Choice===true){
            parms.push(submitDataObj[index])
          }
        }
        //提交数据
        // 向外暴露的方法:
          this.$emit('closeMain',parms)
          this.showWindow = false // 关闭当前窗口
      // });
    }
  },
};
</script>
<style >
.ivu-form-item-text2 .ivu-form-item-content {
  margin-left: 2.8125rem !important;
}
</style>
