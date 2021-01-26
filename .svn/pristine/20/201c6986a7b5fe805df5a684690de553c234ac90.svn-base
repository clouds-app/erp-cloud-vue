<template>
  <div class="cl-moudle cl-analyzerNew">
    <Form
      ref="masterForm"
      :show-message="true"
      :model="formDataInfo"
      :rules="ruleValidate"
      :label-width="90"
    >
      <div class="edit-purPaperPoAnalyzSlave">
        <Row type="flex">
          <Col span="5">
            <FormItem :label-width="100" label="供应商" prop="supplierCode">
                <popup
                  ref='firstFocusInput'
                  v-model="formDataInfo.supplierCode"
                  field-name="supplierCode"
                  :disabled="false"
                  popup-name="SupplierSingleBox"
                  :fill-model.sync="formDataInfo"
                  render-fields="supplierId,supplierCode,supplierName,supplierType,coinId,coinCode,coinName"
                  from-fields="id,purCode,purName,vType,coinId,coinCode,coinName"
                  :suffix="true"
                  :suffix-model="formDataInfo.supplierName"
                  suffixModelName="supplierName"
                  @on-fill="supplierCodeOnFillEvent"
                />
            
            </FormItem>
          </Col>
           <Col span="4">
            <FormItem  label="供应商类型" prop="workCode">
                <optionSearch
                @onChange="OnChange_supplierType"
                :defaultItem="formDataInfo.supplierType"
                :loadDataImmediately="true"
                formKey="supplierType"
                query="vType"
            />
            </FormItem>
          </Col>
          <Col span="4">
            <FormItem :label-width="50"  label="货币" prop="coinCode">
              <popup
                v-model="formDataInfo.coinCode"
                field-name="coinCode"
                :disabled="false"
                popup-name="CoinSingleBox"
                :fill-model.sync="formDataInfo"
                render-fields="coinId,coinCode,coinName"
                from-fields="id,coinCode,coinName"
                :suffix="true"
                :suffix-model="formDataInfo.coinName"
                suffixModelName="coinName"
              />
            </FormItem>
          </Col>
          <Col span="6">
            <Row>
                <Col span="14">
                <FormItem :label-width="75" label="日期范围">
                    <DatePicker
                    type="date"
                    format="yyyy-MM-dd"
                    v-model="formDataInfo.stratDateTime"
                    @on-change='clearData'
                    clearable
                    ></DatePicker>
                </FormItem>
              </Col>
                <Col span="10">
                    <FormItem :label-width="25"  label="--">
                    <DatePicker
                        type="date"
                        format="yyyy-MM-dd"
                        clearable
                        v-model="formDataInfo.endDateTime"
                        @on-change='clearData'
                    ></DatePicker>
                    </FormItem>
                </Col>
            </Row>
          </Col>
           <Col span="3">
              <FormItem label="会计月份" prop="apMonth">
                <DatePicker
                  @on-change='clearData'
                  transfer
                  clearable
                  v-model="formDataInfo.apMonth"
                  type="month"
                  format="yyyyMM"
                ></DatePicker>
              </FormItem>
            </Col> 
           <Col span="1" class="buttonMarginleft">
                <FormItem>
                  <Button @click="searchDataBy()" type="primary">
                    <Icon type="md-search" />搜索
                  </Button>
                </FormItem>
              </Col>
        </Row>
       
      </div>
    </Form>
    <div slot="top">
      <Tabs @on-click="TabsClickEvent" :animated="false">
        <TabPane label="明细" name="detailed">
          <vTable
            :height="tableHeight-26"
            ref="master_list_table"
            :columns-url="functionParams.requestColBaseUrl + '/AccountPaymentInfoFm'"
            :table-data="tableBoxCoWorkProcData"
            :pagination="false"
            name="AccountPaymentInfoFm"
          ></vTable>
        </TabPane>

        <TabPane label="汇总" name="Summary">
          <vTable
            :height="tableHeight-26"
            ref="tableFieldRef"
            :table-data="tableBoxCoWorkProcData"
            :columns-url="functionParams.requestColBaseUrl + '/AccountPaymentSumFm'"
            :pagination="false"
            name="AccountPaymentSumFm"
          ></vTable>
        </TabPane>
        <ReportPage 
            slot="extra" 
            @change='change' 
            ref="ReportPage"
            :total='page.total'
            :current='page.pageNumber'
            :pageSize='page.pageSize'
        ></ReportPage>
      </Tabs>
    </div>

  </div>
</template>
<script>
import optionSearch from "../../components/optionSearch";
 import ReportPage from '../../components/ReportPage'
import vTable from "@/components/tables/vTable";
import eTable from "@/components/e-table/e-table";
import htmlTemplate from "../../components/htmlTemplate";
import listBaseMixins from "../../mixins/list";
import request from "@/libs/request";
import popup from "@/components/popup/popup";
import { deepCopy } from 'view-design/src/utils/assist'
import dayjs from "dayjs";
const default_formDataInfo = {
        coinId:'',//货币
        coinName:'',
        coinCode:'',
        supplierId:'',
        supplierCode:'',
        supplierName:'',
        endDateTime:dayjs().format("YYYY-MM-DD"),//结束时间
        stratDateTime:dayjs().subtract(30, 'day').format("YYYY-MM-DD"),//开始时间
        supplierType:'0',//
        apMonth:'',//会计月份
}
export default {
  mixins: [listBaseMixins],
  components: {
    htmlTemplate,
    vTable,
    eTable,
    popup,
    ReportPage,
    optionSearch
  },
  data() {
    return {
      inMode:0,//"inMode":1 汇总  ,"inMode":0 明细
      modelname:'供应商付款查询',
      tableBoxCoWorkProcData: [], // 表单显示数据
      currentTabName: "detailed", // 当前TABL名称
       page:{
          total:1,
          pageSize:20,
          pageNumber:1,
      },
      formDataInfo: deepCopy(default_formDataInfo), // 防止添加和更新数据提交发生冲突
      ruleValidate: {},
      // 查询配置参数
      functionParams: {
        formInitPreName: "AccountPaymentInfoFm", // 查询表格列头信息 前缀 例如:boxco mainFm/itemFm/mdataFm
        requestBaseUrl: "/report/supplieraccount", // 查询 表格行 数据 接口前缀地址
      }
    };
  },
  methods: {
    clearData(e,v){
      switch (v) {
        case 'month':
          this.formDataInfo.stratDateTime = ''
          this.formDataInfo.endDateTime = ''
          this.onChange_apMonth(e,v)
          break;
        case 'date':
          this.formDataInfo.apMonth =''
          break;
        default:
          break;
      }
    },
       // 会计月份 改变时间回调事件
    onChange_apMonth (item) {
      if (!_.isEmpty(item)) {
        this.formDataInfo.apMonth = new Date(
          dayjs(item).format('YYYY-MM')
        )
      }else{
        this.formDataInfo.apMonth =''
      }
    },
      // 供应商选择后回调事件
    supplierCodeOnFillEvent (item) {
      // 单独校验客户编号
      this.$refs['formDataInfo'].validateField('supplierCode', err => {})
    },
       // 供应商类型改变 回调事件
    OnChange_supplierType(item) {
      this.formDataInfo.supplierType = item.value
    },
    change(data){
        this.page.pageNumber = data
        this.LoadData(this.getreportUrl())
    },
    getreportUrl(){
      let url = '/collectpayList'
      this.inMode = 0
      if (this.currentTabName=="Summary") {
        this.inMode = 1
      }
      return url
    },
    // tab 切换事件
    TabsClickEvent(name) {
     this.currentTabName = name
     this.page.pageNumber = 1
     this.LoadData(this.getreportUrl())
    },
    //加载 数据
    LoadData(url) {
        this.tableBoxCoWorkProcData = []
        let params = {
            inMode:this.inMode,
            supplierType:Number(this.formDataInfo.supplierType),//供应商类型,
            purCode:this.formDataInfo.supplierCode,// 供应商编号,
            coinCode:this.formDataInfo.coinCode,// 货币编号,
            spYm:!!this.formDataInfo.apMonth ? dayjs(this.formDataInfo.apMonth).format('YYYYMM'):'',// 会计月份,
            startDate:!!this.formDataInfo.stratDateTime ? dayjs(this.formDataInfo.stratDateTime).format('YYYY-MM-DD'):'',// 开始时间 
            endDate:!!this.formDataInfo.endDateTime ? dayjs(this.formDataInfo.endDateTime).format('YYYY-MM-DD'):'',// 创建时间)
        }
        let _self = this
        request.post(`${this.functionParams.requestBaseUrl}${url}`,params,{pageNumber:this.page.pageNumber,pageSize:this.page.pageSize}).then(res=>{
             // 延迟赋值,不然数据还没有正确返回的情况下,无法绑定默认值
             if (res && res.records) {
               setTimeout(() => {
                  _self.page.total =Number(res.total)
                  _self.page.pageSize =Number(res.size)
                  _self.tableBoxCoWorkProcData = res.records;
                }, 10);
             }
        })
    },
    // 通过参数查询数据列表
    searchDataBy() {
      //debugger
      this.page.pageNumber = 1
      this.LoadData(this.getreportUrl())
    }
  },
  created() {
   // this.LoadData(this.getreportUrl())
  },
  mounted() {}
};
</script>

<style>
.purPaperClass {
  margin-left: -46%;
}
.purPaperPoAnalyClass {
  width: 96%;
  margin: 0 auto;
}
.purDataClass {
  margin-left: 13%;
}
.edit-purPaperPoAnalyzSlave .ivu-col{
  height:32px;
}
.buttonMarginleft .ivu-form-item-content{
  margin-left: 36px !important;
}
</style>