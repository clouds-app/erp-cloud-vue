<template>
    <div>
     <editWindow width="60%" v-model="showWindow"  :fullscreen="false" title="信用额调整">
       <div id="creditAdjustFnWin"  class="contentListBox">
            <!-- // 固定高度 80 -->
           <div class="contentListItem upSide">
               <i-button @click="handleClick('add')" type="success">添加</i-button>
               <i-button class="marginLR" @click="handleClick('delete')" type="warning">删除</i-button>
               <i-button @click="handleClick('refresh')"  type="success">刷新</i-button> 
           </div>
             <!-- 剩余高度  -->
            <div class="contentListItem downSide">
                  <!-- 总高度- 80  -->
                 <eTable
                 @row-click="rowClickEvent"
                    v-if="!!tableColTitleData"
                    :showContextMenu="false"
                    :height="creditAdjustFnWinHeight - 80"
                    ref="master_list_table"
                    unqiue-mark="id"
                    :index-menu="true"
                    :col-start="0"
                    :row-init-data="{}"
                    :data="saleCreditAdjustFmDataList"
                >
                              <template slot="head">
                                  <tr v-for="(columnGroup,index) in tableColTitleData.columns[`saleCreditAdjustFm`].editGroups" :key="index">
                                          <template  v-for="(column,index2) in columnGroup" >
                                            <th :key="index2" :class="`ivu-table-column-${column.titleAlign}`"
                                                :width="column.editWidth"
                                                :colspan="column.colSpan"
                                                :rowspan="column.rowSpan"
                                                :columnKey="column.key"
                                                >
                                              <div  class="ivu-table-cell">
                                                <span class="">{{column.title}}</span>
                                              </div>
                                          </th>
                                          </template>
                                </tr>
                              </template>
                                <template
                                  slot="body"
                                  slot-scope="{ row, index, valueChangeAssign }"
                                >
                                    <template v-for="(column,index) in tableColTitleData.columns[`saleCreditAdjustFm`].editColumns">
                                        <td :key="index" :class="`ivu-table-column-${column.align}`"  :width="column.editWidth">
                                          <!--其它 控件-->
                                        <template >
                                          <formControl :align="column.align" :control-type="column.controlType"
                                            v-model="row[column.key]"
                                            :disabled="true"
                                            @input="value => {valueChangeAssign(value, index, row,column.key)}"
                                          ></formControl>
                                        </template>
                                      </td>
                                    </template>

                                </template>
                 </eTable>
            </div>
       </div>
    </editWindow>
      <editWindow  @on-ok="AddNewRow()"  :draggable="false"
      :zindex="99" width="30%" v-model="showCreditAdjustWindow" :fullscreen="false" title="新增信用额调整">
        <div class="creditAdjustWinBox">
            <Form ref="formCreditAdjust"  :model="formCreditAdjust" :label-width="100">
                <FormItem class="formCreditAdjustItem" label="客户编号" prop="custCode">
                    <Input disabled type="text" placeholder="客户编号" v-model="formCreditAdjust.custCode"></Input>
                </FormItem>
                <FormItem class="formCreditAdjustItem" label="客户名称" prop="custName">
                    <Input disabled type="text" placeholder="客户名称" v-model="formCreditAdjust.custName"></Input>
                </FormItem>
                <FormItem class="formCreditAdjustItem" label="新信用额类型" prop="newType">
                      <optionSearch
                        @onChange="optionOnChangeEvent"
                        v-model="formCreditAdjust.newType"
                        :loaddingDataWhen="showCreditAdjustWindow"
                        formKey="creditAmtType"
                        query="creditAmtType"
                        />
                </FormItem>
                <FormItem class="formCreditAdjustItem" label="最大信用额" prop="newMaxAmt">
                    <Input type="number" placeholder="最大信用额" v-model="formCreditAdjust.newMaxAmt"></Input>
                </FormItem>
                <FormItem class="datePickerItem" label="截止日期" prop="endDate">
                    <DatePicker
                        type="datetime"
                        v-model="formCreditAdjust.endDate"
                    ></DatePicker>
                </FormItem>
                  <FormItem class="formCreditAdjustItem" label="临时信用额" prop="tempAmt">
                    <Input type="number" placeholder="临时信用额" v-model="formCreditAdjust.tempAmt"></Input>
                </FormItem>
            </Form>
        </div>
     </editWindow>
     <editWindow   @on-ok="deleteSelectRow()"  :draggable="false"
      :zindex="99" width="30%" v-model="showDeleteWindow" :fullscreen="false" title="删除过期资料">
        <div class="deleteRowWinBox">
            <Form ref="formCreditAdjust" :label-width="80">
                <FormItem class="datePickerItem" label="截止日期">
                    <DatePicker
                        type="datetime"
                        v-model="deleteEndDate"
                    ></DatePicker>
                </FormItem>
            </Form>
        </div>
     </editWindow>
    </div>
</template>
<script>
// 信用额调整
import optionSearch from '../components/optionSearch'
import formControl from "@/components/form-control/form-control";
import request from '@/libs/request'
import eTable from '@/components/e-table/e-table'
import dayjs from "dayjs";
import editWindow from '_c/edit-window/edit-window'
const default_formCreditAdjust = {
                    "custCode": "",
                    "custId": 0,
                    "custName": "",
                    "endDate":  "",// dayjs().format("YYYY-MM-DD HH:mm:ss")
                   // "expectAmt": 0,
                    "newMaxAmt": null,
                    "newType": 1,
                    "newTypeText": "",
                   // "oldMaxAmt": 0,
                  //  "oldType": 0,
                  //  "oldTypeText": "",
                    //"remark": "",
                    "tempAmt": null
                }
export default {
    name:'creditAdjustFnWin',
    components:{editWindow,eTable,formControl,optionSearch},
    props:{
        params:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    data(){
        return {
            creditAdjustFnWinHeight:500,
            disabled_submitBtn:true,
            showWindow:false,// 是否显示
            deleteEndDate:'',// 删除数据日期
            showCreditAdjustWindow:false,// 新增信用额调整 弹框是否显示
            showDeleteWindow:false,// 删除弹框 是否显示
            saleCreditAdjustFmDataList:[],// 单据列表
             tableColTitleData: null, //表头数据
             formCreditAdjust:Object.assign({},default_formCreditAdjust),
              
            }
    },
    watch:{
       showWindow(n,o){
           if(n){
                this.$nextTick(()=>{
                    // 获取总高度
                    let creditAdjustFnWinObj = document.getElementById('creditAdjustFnWin');
                    this.creditAdjustFnWinHeight = creditAdjustFnWinObj.offsetHeight
                    this.getBoxData()
                })
           }else{
               this.resetWindow()
           }
       } 
    },
    created(){
        this.loadColumsData()
      
    },
    methods:{
        resetWindow(){
            this.formCreditAdjust = Object.assign({},default_formCreditAdjust)
            this.saleCreditAdjustFmDataList=[]
            this.deleteEndDate =""
        },
        rowClickEvent(index,rowInfo){
            //debugger
        },
        optionOnChangeEvent(params){
            //debugger
            if(!!params){
                 this.formCreditAdjust.newType = params.value
                 this.formCreditAdjust.newTypeText = params.text
            }
        },
        // 添加、修改、删除
        handleClick(type){
            switch (type) {
                case 'add':
                   // debugger
                    this.formCreditAdjust.custCode = this.params.cusCode
                    this.formCreditAdjust.custName = this.params.cusName
                    this.formCreditAdjust.custId = this.params.id
                   this.showCreditAdjustWindow = true 

                    break;
                   case 'delete':
                    this.showDeleteWindow = true
                    break;
                       case 'refresh':
                        this.getBoxData()
                    break;
                default:
                    break;
            }
        },
        AddNewRow(){
            let dataFormat = this.formCreditAdjust.endDate
            if(!!this.formCreditAdjust.endDate){
                dataFormat =  dayjs(this.formCreditAdjust.endDate).format("YYYY-MM-DD HH:mm:ss")
            }else{
                this.$Message.warning('请先选择截止日期!')  
                return
            }
            let _url =`/sale/creditAdjust/save`
            let  params = this.formCreditAdjust
            params.endDate = dataFormat
            request.post(_url,params).then(res => {
                  this.$Message.success('执行成功')
                  this.getBoxData() // 刷新数据
                   this.showCreditAdjustWindow = false
            }).catch(err=>{
                 // this.showDeleteWindow = false
            })
        },
        deleteSelectRow(){
           // debugger
            let dataFormat = this.deleteEndDate
            if(!!this.deleteEndDate){
                dataFormat =  dayjs(this.deleteEndDate).format("YYYY-MM-DD HH:mm:ss")
            }else{
                this.$Message.warning('请先选择截止日期!')  
                return
            }
            let _url =`/sale/creditAdjust/delete`
            let params ={
                custId:this.params.id,
                endDate:dataFormat // 截止日期
            }
            request.post(_url,params).then(res => {
                  this.$Message.success('执行成功')
                  this.getBoxData() // 刷新数据
                   this.showDeleteWindow = false
            }).catch(err=>{
                 // this.showDeleteWindow = false
            })
        },
           // 加载列头数据
        loadColumsData() {
            let formName = 'saleCreditAdjustFm'
            let url = `/sys/form/init/${formName}`
            request.get(url).then(res => {
                if (res != null) {
                this.tableColTitleData = res
                }
            })
        },
        // 获取弹出框数据
        getBoxData(){
            this.disabled_submitBtn = true
            let _url =`/sale/creditAdjust/list`
            let params = {
                //参数包括：
                custId:this.params.id
            }
            request.post(_url,params).then(res => {
               // debugger
                if (res != null) {
                    this.saleCreditAdjustFmDataList = res
                    if(this.saleCreditAdjustFmDataList.length>0){
                        this.disabled_submitBtn = false
                    }
                }
            }) 
        },
           // ===================================
    
        // 提交批量完结
        // submitEditWindow(){
        //     if(!this.checkHasData()){
        //          this.$Message.warning('请先选择数据!')  
        //          return  
        //     }
        //     let _url =`/sale/boxCo/batchCloseCoItem?iisClose=${this.formCreditAdjust.iisClose}`
        //     let params = {
        //         boxCoItemIds:[],// 订单明细Id列表
        //          //0完结,1启用
        //     }
        //     params.boxCoItemIds = this.saleCreditAdjustFmDataList.reduce((boxCoItemIds,item)=>{
        //                     if(item.issChose){
        //                        boxCoItemIds.push(item.id)
        //                     }
        //                     return boxCoItemIds
        //     },[])
        //     request.post(_url,params).then(res => {
        //         this.$Message.success('执行成功')
        //          this.showWindow = false
        //           this.$emit('submit-success') // 刷新主页面数据
        //     })    
        // }
    }
}
</script>

<style lang="scss">
.marginLR{
    margin:0 10px 0 10px;
}
 .contentListBox{
     display: flex;
     flex-direction: column;
     .contentListItem{
         &.upSide{
             height: 30px;
         }
         &.downSide{
             flex: 1;
         }
     }
 }
 .creditAdjustWinBox{
     display: flex;
     height: 300px;
 }
  .deleteRowWinBox{
     display: flex;
     height: 100px;
 }
</style>