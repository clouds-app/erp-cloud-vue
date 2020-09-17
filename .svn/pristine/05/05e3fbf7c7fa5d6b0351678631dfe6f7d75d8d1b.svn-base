<template>
    <div>
     <editWindow width="80%" v-model="showWindow"  :fullscreen="false" title="产品维护列表">
       <div id='basOrderListBox' class="basOrderListBox">
            <!-- // 固定高度 50 -->
           <div class="saleOrderListItem upSide">
            <Form ref="formCustom" class="formCustomBox" :model="formCustom" :rules="ruleCustom" :label-width="80">
                <FormItem class="formCustomItem" label="客户编号" prop="custCode">
                    <Input type="text" placeholder="客户编号" v-model="formCustom.custCode"></Input>
                </FormItem>
                <FormItem class="formCustomItem" label="产品名称" prop="bpName">
                    <Input type="text" placeholder="产品名称" v-model="formCustom.bpName"></Input>
                </FormItem>
                <FormItem class="formCustomItem" label="状态" prop="status" :label-width="40">
                      <Select @on-change="onChange_iisClose" v-model="formCustom.status" >
                        <Option value="1">1:已启用订单</Option>
                        <Option value="0">0:已停用订单</Option>
                      </Select>
                </FormItem>
                 <div class="formCustomItem datePickerBox">
                      <FormItem class="datePickerItem" label="日期" prop="passwd">
                     <DatePicker
                        type="date"
                        format="yyyy-MM-dd"
                        v-model="formCustom.startDate"
                        ></DatePicker>
                </FormItem>
                 <FormItem  :label-width="30" class="datePickerItem" label="至" prop="passwd">
                     <DatePicker
                        type="date"
                        format="yyyy-MM-dd"
                        v-model="formCustom.endDate"
                        ></DatePicker>
                </FormItem>
                
                 </div>
                 <div class="formCustomItem searchBtn">
                 <Button size="default" type="primary" @click="handleSearch()">搜索</Button>
                 </div>
               
            </Form>
           </div>
             <!-- 剩余高度  -->
            <div class="saleOrderListItem downSide">
                  <!-- 总高度- 80  -->
                 <eTable
                    v-if="!!tableColTitleData"
                    :showContextMenu="false"
                    :height="saleOrderListBoxHeight - 50"
                    ref="master_list_table"
                    unqiue-mark="id"
                    :index-menu="true"
                    :col-start="0"
                    :row-init-data="{}"
                    :data="boxcoclosedataFmDataList"
                >
                              <template slot="head">
                                  <tr v-for="(columnGroup,index) in tableColTitleData.columns[`basdisableproductFm`].editGroups" :key="index">
                                          <template  v-for="(column,index2) in columnGroup" >
                                            <th v-if="excludeFiled('tableColTitleData',column.key)"
                                                :key="index2" :class="`ivu-table-column-${column.titleAlign}`"
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
                                    <template v-for="(column,index) in tableColTitleData.columns[`basdisableproductFm`].editColumns">
                                        <td :key="index" :class="`ivu-table-column-${column.align}`" v-if="excludeFiled('tableColTitleData',column.key)" :width="column.editWidth">
                                          <!-- 控件特殊处理 选择 -->
                                          <template v-if="column.key =='status'">
                                            <Checkbox
                                                @on-change="onChange_SlaveItemChcBox(index)"
                                                v-model="row[column.key]"
                                            ></Checkbox>
                                         </template>
                                          <!--其它 控件-->
                                        <template v-else>
                                          <formControl :align="column.align" :control-type="column.controlType"
                                            v-model="row[column.key]"
                                            :disabled="column.readOnly"
                                            @input="value => {valueChangeAssign(value, index, row,column.key)}"
                                          ></formControl>
                                        </template>
                                      </td>
                                    </template>

                                </template>
                            </eTable>
            </div>
       </div>
        <template slot="footer">
        <div>
            <Button :disabled="disabled_submitBtn" @click="selectAllEditWindow()" type="primary">
                <Icon type="ios-apps" />
                反 选
            </Button>
            <!-- 启 用/完 结 -->
          <Button :disabled="disabled_submitBtn" @click="submitEditWindow()" type="primary">
                <Icon type="ios-arrow-down" />
                {{actionTitle}}
            </Button>

           <Button @click="cancelEditWindow()">
                <Icon color="red" type="md-close" />
                取 消
            </Button>
        </div>
     </template>
    </editWindow>
    </div>
</template>
<script>
//参数包括：startDate(订单开始日期),endDate(订单结束日期),bcCustPo(客户PO号),
//custCode(客户编号),bcNo(订单编号),bpName(产品名称),workNo(工单号),
//status(0未完结,1完结),biNoDelQty(未交数),biBatchNo(料号)
// 销售订单批量完结
import formControl from "@/components/form-control/form-control";
import request from '@/libs/request'
import eTable from '@/components/e-table/e-table'
import dayjs from "dayjs";
import editWindow from '_c/edit-window/edit-window'
const default_formCustom = {
                    custCode: '',// 客户编号
                    bpName: '',// 产品名称
                    status:'1',//停用启用
                    startDate:dayjs().subtract(2, "month").format("YYYY-MM-DD"),//(订单开始日期),
                    endDate:dayjs().format("YYYY-MM-DD"),//(订单结束日期)
                }
export default {
    name:'boxSalesOrderSlave',
    components:{editWindow,eTable,formControl},
    data(){
        return {
            actionTitle:'停· 用',
            saleOrderListBoxHeight:500,
            disabled_submitBtn:true,
            showWindow:false,// 是否显示批量历史散件订单窗体
            boxcoclosedataFmDataList:[],// 历史散件订单列表
             tableColTitleData: null, // 签回弹框列表表头数据
             formCustom:Object.assign({},default_formCustom),
                ruleCustom: {
                }
            }
    },
    watch:{
       showWindow(n,o){
           if(n){
                this.$nextTick(()=>{
                    // 获取总高度
                    let saleOrderListBoxObj = document.getElementById('basOrderListBox');
                    this.saleOrderListBoxHeight = saleOrderListBoxObj.offsetHeight
                })
           }else{
            //    this.cancelEditWindow()
           }
       } 
    },
    created(){
        this.loadColumsData()
      
    },
    methods:{
        // 未完结订单 选择改变事件
        onChange_iisClose(item){
            this.boxcoclosedataFmDataList = []
            if(item ==='0'){
                 this.actionTitle = '启 用'
            }else{
                 this.actionTitle = '停 用'
            }
        },
        onChange_SlaveItemChcBox(index){

        },
        // 获取销售订单完结弹出框数据
        getBoxCoCloseData(){
            this.disabled_submitBtn = true
            let _url =`/bas/product/getHistoryProductData`
            let params = {
                //参数包括：
                
                startDate:dayjs(this.formCustom.startDate).format('YYYY-MM-DD'), // (订单开始日期),
                endDate:dayjs(this.formCustom.endDate).format('YYYY-MM-DD'), // (订单结束日期),
                custCode:this.formCustom.custCode,// (客户编号),
                bpName:this.formCustom.bpName,// (产品名称),
                status:this.formCustom.status
            }
            let _self = this
            request.post(_url,params).then(res => {
                if (res != null) {
                    this.boxcoclosedataFmDataList = _self.switchstatus(res)
                    if(this.boxcoclosedataFmDataList.length>0){
                        this.disabled_submitBtn = false
                    }
                }
            }) 
        },
        // 转换禁用单位
        switchstatus(data){
            data.filter(item=>{
                item.status = !!item.status
                return
            })
            return data
        },
         // 加载列头数据(弹框签回表头)
        loadColumsData () {
            // 产品完结明细完结弹出框
            let formName = 'basdisableproductFm'
            let url = `/sys/form/init/${formName}`
            request.get(url).then(res => {
                if (res != null) {
                this.tableColTitleData = res
                }
            })
        },
         // 排除不需要显示的字段
        excludeFiled (type, key) {
            let exListPrize = []
            let exList = []
            switch (type) {
                case 'tableColTitleData':
                default:
                break
            }
            if (exList.includes(key)) {
                return false
            } else {
                return true
            }
        },
        // 搜索查询数据
        handleSearch(){
              this.getBoxCoCloseData()
        },
        // 全选/反选
        selectAllEditWindow(){
            if(this.boxcoclosedataFmDataList.length>0){
             this.boxcoclosedataFmDataList =  this.boxcoclosedataFmDataList.map(item=>{
                        item.status = !!!item.status;
                        return item
                })
            }
        },
        // 取消
        cancelEditWindow(){
            this.actionTitle = '确 认'
            this.boxcoclosedataFmDataList = []
            this.formCustom = Object.assign({},default_formCustom)
            this.showWindow = false
             this.disabled_submitBtn = true
        },
        // 验证是否勾选了数据列表
        checkHasData(){
            let flag = false
             flag = this.boxcoclosedataFmDataList.some(item=>{
                 return item.status==true
             })
            return flag
        },
        // 提交批量完结
        submitEditWindow(){
            if(!this.checkHasData()){
                 this.$Message.warning('请先选择数据!')  
                 return  
            }
            let _url =`/bas/product/batchDisableProduct?IsDisable=${this.formCustom.status}`
            let params = {
                ProductIds:[],// 订单明细Id列表
                 //0完结,1启用
            }
            params.ProductIds = this.boxcoclosedataFmDataList.reduce((ProductIds,item)=>{
                            if(item.status){
                               ProductIds.push(item.id)
                            }
                            return ProductIds
            },[])
            request.post(_url,params).then(res => {
                this.$Message.success('执行成功')
                this.boxcoclosedataFmDataList = []
                this.showWindow = false
            })    
        }
    }
}
</script>

<style lang="scss" scope>
    .basOrderListBox{
        display: flex;
        flex-direction: column;
        height: 70vh;
        .saleOrderListItem{
            //border-bottom:1px solid #ccc;
            &.upSide{
                height: 50px;
                .formCustomBox{
                    display: flex;
                    flex-wrap: wrap;
                    .formCustomItem{
                        width: 15%;
                        margin-left: 20px;
                        //
                        &.datePickerBox{
                            overflow: hidden;
                             display: flex;
                              width: 39%;
                              .datePickerItem{
                                  //width: 50%;
                                  //border: 1px blue solid;
                              }
                        }
                        &.searchBtn{
                           // border: 1px blue solid;
                             width: 5%;
                             margin-left: 1%;
                            //  .buttonDiv{
                            //      color: white;
                            //      background: #2d8cf0;
                            //      width: 100px;
                            //      height: 50px;
                            //      border-radius: 10px;
                            //  }
                        }
                    }
                }
            }
            &.downSide{
                flex: 1;
            }
        }
    }
</style>