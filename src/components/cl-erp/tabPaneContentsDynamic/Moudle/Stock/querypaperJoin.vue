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
        <Row >
          <Col span="7">
            <FormItem :label-width="75" label="供应商" prop="supplierCode">
              <popup
                v-model="formDataInfo.supplierCode"
                field-name="supplierCode"
                popup-name="SupplierMultiBox"
                :fill-model.sync="formDataInfo"
                render-fields="supids,supplierCode,supplierName" 
                from-fields="id,supplierCode,supplierName"
                :suffix="true"
                :suffix-model="formDataInfo.supplierName"
                suffixModelName="supplierName"
              />
                <!-- :suffix-model="formDataInfo.master.custName" -->
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem :label-width="75" label="客户" prop="cusCode">
              <popup
                v-model="formDataInfo. cusCode"
                field-name="cusCode"
                popup-name="CustomerMultiBox"
                :fill-model.sync="formDataInfo"
                render-fields="custids,cusCode,cusName" 
                from-fields="id,cusCode,cusName"
                :suffix="true"
                :suffix-model="formDataInfo.cusName"
                suffixModelName="cusName"
              />
                <!-- :suffix-model="formDataInfo.master.custName" -->
            </FormItem>
          </Col>
          <Col span="7">
            <Row>
                <Col span="14">
                <FormItem :label-width="105" label="入库日期范围">
                    <DatePicker
                    type="date"
                    format="yyyy-MM-dd"
                    v-model="formDataInfo.startDateTime"
                    ></DatePicker>
                </FormItem>
              </Col>
                <Col span="10">
                    <FormItem :label-width="25"  label="--">
                    <DatePicker
                        type="date"
                        format="yyyy-MM-dd"
                        v-model="formDataInfo.endDateTime"
                    ></DatePicker>
                    </FormItem>
                </Col>
            </Row>
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
            :columns-url="functionParams.requestColBaseUrl + '/PurchaseJoinStockFm'"
            :table-data="tableBoxCoWorkProcData"
            :pagination="false"
            name="PurchaseJoinStockFm"
          ></vTable>
        </TabPane>
        <TabPane label="供应商汇总" name="supplier">
          <vTable
            :height="tableHeight-26"
            ref="tableFieldRef"
            :table-data="tableBoxCoWorkProcData"
            :columns-url="functionParams.requestColBaseUrl + '/PurchaseJoinSupplierFm'"
            :pagination="false"
            name="PurchaseJoinSupplierFm"
          ></vTable>
        </TabPane>
        <TabPane label="客户汇总" name="customer">
          <vTable
            :height="tableHeight-26"
            ref="tableFieldRef"
            :table-data="tableBoxCoWorkProcData"
            :columns-url="functionParams.requestColBaseUrl + '/PurchaseJoinCustFm'"
            :pagination="false"
            name="PurchaseJoinCustFm"
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
import ReportPage from '../components/ReportPage'
import vTable from "@/components/tables/vTable";
import eTable from "@/components/e-table/e-table";
import htmlTemplate from "../components/htmlTemplate";
import listBaseMixins from "../mixins/list";
import request from "@/libs/request";
import popup from "@/components/popup/popup";
import { deepCopy } from 'view-design/src/utils/assist'
import dayjs from "dayjs";
const default_formDataInfo = {
        supids:'',//供应商
        supplierCode:'',
        supplierName:'',
        custids:'',//客户
        cusCode:'',
        cusName:'',
        endDateTime:dayjs().format("YYYY-MM-DD"),//结束时间
        startDateTime:dayjs().subtract(30, 'day').format("YYYY-MM-DD"),//开始时间
}
export default {
  mixins: [listBaseMixins],
  components: {
    htmlTemplate,
    vTable,
    eTable,
    popup,
    ReportPage
  },
  data() {
    return {
      modelname:'纸板采购退货查询',
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
        formInitPreName: "PurchaseJoinStockFm", // 查询表格列头信息 前缀 例如:boxco mainFm/itemFm/mdataFm
        requestBaseUrl: "/report/spGetStockUseReStatis", // 查询 表格行 数据 接口前缀地址
      }
    };
  },
  methods: {
    change(data){
        this.page.pageNumber = data
        this.LoadBoxCoWorkProcData(this.getreportUrl())
    },
    getreportUrl(){
      let inMode = '0'
      switch (this.currentTabName) {
        case 'detailed':
            inMode = '0'
            break;
        case 'supplier':
            inMode = '1'
            break;
        case 'customer':
            inMode = '2'
            break;    
        default:
            break;
      }
      return inMode
    },
    // tab 切换事件
    TabsClickEvent(name) {
     this.currentTabName = name
     this.page.pageNumber = 1
     this.LoadBoxCoWorkProcData(this.getreportUrl())
    },
    //加载 数据
    LoadBoxCoWorkProcData(inMode) {
        this.tableBoxCoWorkProcData = []
        let params = {
            endDate:!!this.formDataInfo.endDateTime ?dayjs(this.formDataInfo.endDateTime).format('YYYY-MM-DD'):'',
            startDate:!!this.formDataInfo.startDateTime ?dayjs(this.formDataInfo.startDateTime).format('YYYY-MM-DD'):'',
            supids:!!this.formDataInfo.supids?this.formDataInfo.supids:'',//供应商ID
            custids:!!this.formDataInfo.custids?this.formDataInfo.custids:'',//客户ID
            inMode:Number(inMode)//0.明细,1.供应商,2.客户
        }
        let _self = this
        request.post(`report/purchase/purchaseList`,params,{pageNumber:this.page.pageNumber,pageSize:this.page.pageSize}).then(res=>{
             // 延迟赋值,不然数据还没有正确返回的情况下,无法绑定默认值
             if (res && res.records) {
                setTimeout(() => {
                  _self.page.total =Number(res.total)
                  // _self.page.pageSize =Number(res.size)
                  _self.tableBoxCoWorkProcData = res.records;
                }, 10);
             }
        })
    },
    // 通过参数查询数据列表
    searchDataBy() {
      //debugger
      this.page.pageNumber = 1
      this.LoadBoxCoWorkProcData(this.getreportUrl())
    }
  },
  created() {
    this.LoadBoxCoWorkProcData('0');
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