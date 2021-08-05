<template>
  <div class="cl-moudle">
    <div ref="contextMenuTarget" class="content-container" :style="{ height: tableHeight+35 + 'px' }">
        <div class="demo-split-pane">
      <Form
        ref="formDataInfo"
        :show-message="true"
        :model="formDataInfo"
        :label-width="100"
      >
        <Row>
           <Col span="24">
          <Row>
            <Col span="4">
                    <FormItem class="FormItem" label="开始日期">
                      <DatePicker
                        type="date"
                        format="yyyy-MM-dd"
                        :editable='false'
                        v-model="formDataInfo.starDate"
                      ></DatePicker>
                    </FormItem>
              </Col>
              <Col span="4">
                    <FormItem class="FormItem" label="结束日期">
                      <DatePicker
                        type="date"
                        format="yyyy-MM-dd"
                        :editable='false'
                        v-model="formDataInfo.endDate"
                      ></DatePicker>
                    </FormItem>
              </Col>
              <Col span="4">
                <FormItem class="FormItem" label="客户编号" prop="cusCode">
                  <div>
                    <popup
                      ref='firstFocusInput'
                      @on-fill="Initializationdata"
                      v-model="formDataInfo.cusCode "
                      field-name="cusCode "
                      popup-name="CustomerCommonSingleBox"
                      :fill-model.sync="formDataInfo"
                      render-fields="cusCode"
                      from-fields="cusCode"
                      :query-params="{}"
                    />
                  </div>
                </FormItem>
              </Col>
             <Col span="4">
                <FormItem class="FormItem" label="业务员" prop="workCode">
                  <div>
                    <popup
                      ref='firstFocusInput'
                      @on-fill="Initializationdata"
                      v-model="formDataInfo.workCode"
                      field-name="workCode"
                      popup-name="BusinessInfoBox2"
                      :fill-model.sync="formDataInfo"
                      render-fields="workCode"
                      from-fields="workCode"
                      :query-params="{}"
                    />
                  </div>
                </FormItem>
              </Col>
              </Row>
               </Col>
                <Col span="24">
               <Row style="height: 34px;">
                  <Col span="4">
                <FormItem class="FormItem" label="跟单员" prop="followCode">
                  <div>
                    <popup
                      ref='firstFocusInput'
                      @on-fill="Initializationdata"
                      v-model="formDataInfo.followCode"
                      field-name="followCode"
                      popup-name="DocumentaryInfoBox2"
                      :fill-model.sync="formDataInfo"
                      render-fields="followCode"
                      from-fields="followCode"
                      :query-params="{}"
                    />
                  </div>
                </FormItem>
              </Col>
                 <Col span="4">
                <FormItem class="FormItem" label="车号" prop="carNo">
                  <div>
                    <popup
                      ref='firstFocusInput'
                      @on-fill="Initializationdata"
                      v-model="formDataInfo.carNo"
                      field-name="carNo"
                      popup-name="CarSingleBox"
                      :fill-model.sync="formDataInfo"
                      render-fields="carNo"
                      from-fields="carNo"
                      :query-params="{}"
                    />
                  </div>
                </FormItem>
              </Col>
              <Col span="4">
                <FormItem class="FormItem" label="签回类型" prop="bdBackType">
                  <optionSearch
                    v-model="formDataInfo.backType"
                    formKey="bdBackType"
                    query="bdBackType"
                    :loadDataImmediately="true"
                  />
                </FormItem>
              </Col>
              <Col span="4">
                <FormItem class="FormItem" label="送货单号">
                  <Input
                    v-model="formDataInfo.bdNo"
                    maxlength="100"
                    :autosize="{ minRows: 1, maxRows: 2 }"
                  ></Input>
                </FormItem>
              </Col>
                  <Col span="1">
                <FormItem label :label-width="40">
                  <Button type="primary" @click="clickmaster()">搜索</Button>
                </FormItem>
              </Col>
              </Row>
              </Col>
        </Row>
      </Form>
        </div>
        <div class="tabsBox"  :style="{ 'padding-top': '6px' }">
           <div class="page">
             <Page :current="page.pageNumber" :total="page.total" :page-size="page.pageSize" simple @on-change="onPageNumberChange"/>
           </div>
          <Tabs @on-click="TabsClickEvent">
             <TabPane label="送货明细" name="BoxStoreDeliback">
            <vTable
              :height="tableHeight/1.12"
              ref="BoxStoreDelibackRef"
              :table-data="tableFieldData1"
              :columns-url="functionParams.requestColBaseUrl + '/BoxStoreDelibackFm'"
              :pagination="false"
               name="BoxStoreDelibackFm"
            ></vTable>
          </TabPane>
            <TabPane label='客户汇总' name="boxStoreDelibackcust">
              <vTable
                :height="tableHeight/1.12"
                ref="boxStoreDelibackcustRef"
                :table-data="tableFieldData2"
                :columns-url="functionParams.requestColBaseUrl + '/boxStoreDelibackcust'"
                :pagination="false"
                name="boxStoreDelibackcust"
              ></vTable>
            </TabPane>
             <TabPane label='车辆汇总' name="boxStoreDelibackCar">
              <vTable
                :height="tableHeight/1.12"
                ref="boxStoreDelibackCarRef"
                :table-data="tableFieldData3"
                :columns-url="functionParams.requestColBaseUrl + '/boxStoreDelibackCarFm'"
                :pagination="false"
                name="boxStoreDelibackCarFm"
              ></vTable>
            </TabPane>
             <TabPane label='日期汇总' name="BoxStoreDelibackDate">
              <vTable
                :height="tableHeight/1.12"
                ref="BoxStoreDelibackDateRef"
                :table-data="tableFieldData4"
                :columns-url="functionParams.requestColBaseUrl + '/BoxStoreDelibackDateFm'"
                :pagination="false"
                name="BoxStoreDelibackDateFm"
              ></vTable>
            </TabPane>
            <TabPane label='送货主表' name="BoxStoreDelibackMain">
              <vTable
                :height="tableHeight/1.12"
                ref="BoxStoreDelibackMainRef"
                :table-data="tableFieldData5"
                :columns-url="functionParams.requestColBaseUrl + '/BoxStoreDelibackMainFm'"
                :pagination="false"
                name="BoxStoreDelibackMainFm"
              ></vTable>
            </TabPane>
          </Tabs>
        </div>
    </div>
  </div>
</template>
<script>
import optionSearch from "../components/optionSearch";
import popup from "@/components/popup/popup";
import vTable from '@/components/tables/vTable'
import htmlTemplate from '../components/htmlTemplate'
import listBaseMixins from '../mixins/list'
import { deepCopy } from "view-design/src/utils/assist";
import request from '@/libs/request'
import dayjs from "dayjs";
import axios from '@/libs/api.request'
const default_formDataInfo = {
  starDate:dayjs().subtract(30, 'day').format("YYYY-MM-DD"),//开始时间
  endDate:dayjs().format("YYYY-MM-DD"),//结束时间
  cusCode:'', //客户编号,
  workCode:'', //业务员编号,
  carNo:'',//车牌号,
  backType:'', //回签类型,
  bdNo:'', //送货单号
  followCode:''//跟单员
}
export default {
  mixins: [listBaseMixins],
  components: {
    htmlTemplate,
    vTable,
    popup,optionSearch
  },
  data () {
    return {
      pages:[],
      page:{
        pageNumber:1,
        total:0,
        pageSize:20,
        pages:0,//总页数
      },
      sType:0,
      formDataInfo:deepCopy(default_formDataInfo),
      tableFieldData1: [], // 送货明细
      tableFieldData2: [], // 客户总汇
      tableFieldData3: [], // 车辆总汇
      tableFieldData4: [], // 日期总汇
      tableFieldData5: [], // 送货主表
      currentTabName: 'BoxStoreDeliback', // 当前TABL名称
      // who:'editForm', // 动态指定编辑控件
      functionParams: {
        requestBaseUrl: '/bas/art',
        uniqueId: 'artId'
      },
    }
  },
  mounted(){
    this.clickmaster()
  },
  methods: {
     // 分页页码改变
    onPageNumberChange(pageNumber){
      this.page.pageNumber = pageNumber
      this.clickmaster()
    },
    //搜索按钮 触发事件
    clickmaster(){
      let params = this.formDataInfo
      params.sType=this.sType
      axios.request({
          url: "/report/stockDeli/stockDeliBack",
          params:this.page,
          method: 'post',
          data: params
        })
        .then(res => {
          let data = res.data.result
          if(this.sType ==0){
             this.tableFieldData1 = data.records
          }else if(this.sType ==1){
             this.tableFieldData2 = data.records
          }else if(this.sType ==2){
             this.tableFieldData3 = data.records
          }else if(this.sType ==3){
             this.tableFieldData4 = data.records
          }else{
            this.tableFieldData5 = data.records
          }
          this.page.pageNumber = parseInt(data.current)
          this.page.pageSize = parseInt(data.size)
          this.page.total = parseInt(data.total)
          this.page.pages = parseInt(data.pages)
        })
    },
     //当主表客户弹框改变时促发初始化子表数据
    Initializationdata(data) {
    
    },
      // tab 切换事件
    TabsClickEvent (name) {
      this.currentTabName = name
      this.pages[this.sType] = this.page
      if (name === 'BoxStoreDeliback') {
        this.sType = 0
      } else if (name === 'boxStoreDelibackcust') {
        this.sType = 1
        this.tableFieldData2.length==0?this.clickmaster():''
      }else if (name === 'boxStoreDelibackCar') {
        this.sType = 2
        this.tableFieldData3.length==0?this.clickmaster():''
      }else if (name === 'BoxStoreDelibackDate') {
        this.sType = 3
        this.tableFieldData4.length==0?this.clickmaster():''
      }else{
        this.sType = 4
        this.tableFieldData5.length==0?this.clickmaster():''
      }
      this.page =  this.pages[this.sType] == undefined ?{pageNumber:1,total:0,pageSize:20,pages:0}:this.pages[this.sType]
    },
  }
}
</script>

<style lang="scss" scoped>
.FormItem{
  margin-bottom:0px
}
.tabsBox{
  position: relative;
}
.page{
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 999;
}
</style>
