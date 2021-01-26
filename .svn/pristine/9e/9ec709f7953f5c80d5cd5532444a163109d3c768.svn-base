<template>
  <div class="cl-moudle cl-analyzerNew">
    <Form
      ref="masterForm"
      :show-message="true"
      :model="formDataInfo"
      :rules="ruleValidate"
      :label-width="75"
    >
      <div class="edit-purPaperPoAnalyzSlave">
        <Row >
          <Col span="4">
            <FormItem label="供应商" prop="supplierCode">
              <popup
                v-model="formDataInfo.supplierCode"
                field-name="supplierCode"
                popup-name="SupplierMultiBox"
                :fill-model.sync="formDataInfo"
                render-fields="supplierIds,supplierCode,supplierName" 
                from-fields="id,supplierCode,supplierName"
                :suffix="true"
                :suffix-model="formDataInfo.supplierName"
                suffixModelName="supplierName"
              />
                <!-- :suffix-model="formDataInfo.master.custName" -->
            </FormItem>
          </Col>
           <Col span="4">
            <FormItem :label-width="60" label="仓位" prop="wsCode">
              <popup
                v-model="formDataInfo.wsCode"
                field-name="wsCode"
                popup-name="WareHouseSingleBox"
                :fill-model.sync="formDataInfo"
                render-fields="wareHouseItId,wsCode,wsName" 
                from-fields="id,wsCode,wsName"
                :suffix="true"
                :suffix-model="formDataInfo.wsName"
                suffixModelName="wsName"
              />
            </FormItem>
          </Col>
          <Col span="3">
            <FormItem :label-width="60" label="纸质" prop="artCode">
              <popup
                v-model="formDataInfo.artCode"
                field-name="artCode"
                popup-name="ArtSingleBox"
                :fill-model.sync="formDataInfo"
                render-fields="psArt,artCode" 
                from-fields="id,artCode"
                :suffix="false"
              />
            </FormItem>
          </Col>
          <Col span="4">
            <FormItem :label-width="60" label="产品" prop="proNumber">
              <popup
                v-model="formDataInfo.proNumber"
                field-name="proNumber"
                popup-name="BasicProductSingleBox"
                :fill-model.sync="formDataInfo"
                render-fields="proId,proNumber,proName" 
                from-fields="id,bpNo,bpName"
                :suffix="true"
                :suffix-model="formDataInfo.proName"
                suffixModelName="proName"
              />
            </FormItem>
          </Col>
           <Col span="3">
                <FormItem label="工单号" prop="workNo">
                    <Input v-model="formDataInfo.workNo" maxlength="20" placeholder></Input>
                </FormItem>
            </Col>
            <Col span="3">
                <FormItem label="批次号" prop="boxUseBatchOn">
                    <Input v-model="formDataInfo.boxUseBatchOn" maxlength="20" placeholder></Input>
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
      <Tabs :animated="false">
        <TabPane label="明细" name="detailed">
          <vTable
            :height="tableHeight-26"
            ref="master_list_table"
            :columns-url="functionParams.requestColBaseUrl + '/statisGetBoxUseStoreFm'"
            :table-data="tableBoxCoWorkProcData"
            :pagination="false"
            name="statisGetBoxUseStoreFm"
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
        supplierIds:'',//供应商
        supplierCode:'',
        supplierName:'',
        wareHouseItId: "",  //仓位id
        wsName:"",
        wsCode:"",
        psArt: "",  //纸质
        artCode:'',
        workNo: "",  //工单号
        boxUseBatchOn: "",  //入库批次号
        proNumber: "",  //产品编号
        proName: "",  //产品名称
        proId:""
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
      modelname:'纸箱用料库存',
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
        formInitPreName: "statisGetBoxUseReFm", // 查询表格列头信息 前缀 例如:boxco mainFm/itemFm/mdataFm
        requestBaseUrl: "/report/spGetStockUseStoreStatis", // 查询 表格行 数据 接口前缀地址
      }
    };
  },
  methods: {
    change(data){
        this.page.pageNumber = data
        this.LoadBoxCoWorkProcData('/spGetStockUseStoreStatis')
    },
    // getreportUrl(){
    //   let url = '/spGetStockUseReStatis'
    //   if (this.currentTabName=="Summary") {
    //     url = '/spGetStockUseReGroup'
    //   }
    //   return url
    // },
    // tab 切换事件
    // TabsClickEvent(name) {
    //  this.currentTabName = name
    //  this.page.pageNumber = 1
    //  this.LoadBoxCoWorkProcData(this.getreportUrl())
    // },
    //加载 数据
    LoadBoxCoWorkProcData(url) {
        this.tableBoxCoWorkProcData = []
        let params = {
            supplierIds:!!this.formDataInfo.supplierIds?this.formDataInfo.supplierIds:'',
            wareHouseItId:!!this.formDataInfo.wareHouseItId?this.formDataInfo.wareHouseItId:'',//仓位id
            workNo:!!this.formDataInfo.workNo?this.formDataInfo.workNo:'', //工单号
            psArt:!!this.formDataInfo.artCode?this.formDataInfo.artCode:'', //纸质
            boxUseBatchOn:!!this.formDataInfo.boxUseBatchOn?this.formDataInfo.boxUseBatchOn:'', //入库批次号
            proNumber:!!this.formDataInfo.proNumber?this.formDataInfo.proNumber:'', //产品编号
            proName:!!this.formDataInfo.proName?this.formDataInfo.proName:'',  //产品名称
        }
        let _self = this
        request.post(`/report${url}`,params,{pageNumber:this.page.pageNumber,pageSize:this.page.pageSize}).then(res=>{
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
      this.LoadBoxCoWorkProcData('/spGetStockUseStoreStatis')
    }
  },
  created() {
    this.LoadBoxCoWorkProcData('/spGetStockUseStoreStatis');
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