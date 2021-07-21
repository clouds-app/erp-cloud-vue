<template>
    <div>
     <editWindow width="60%" v-model="showWindow"  :fullscreen="false" title="信用额使用情况">
       <div id="saleCreditAdjustStatuFnWin"  class="contentListBox">
             <!-- 剩余高度  -->
            <div class="contentListItem downSide">
                  <!-- 总高度- 80  -->
                 <eTable
                 @row-click="rowClickEvent"
                    v-if="!!tableColTitleData"
                    :showContextMenu="false"
                    :height="saleCreditAdjustStatuFnWin"
                    ref="master_list_table"
                    unqiue-mark="id"
                    :index-menu="true"
                    :col-start="0"
                    :row-init-data="{}"
                    :data="saleCreditAdjustFmDataList"
                >
                              <template slot="head">
                                  <tr v-for="(columnGroup,index) in tableColTitleData.columns[`saleCreditAdjustQkFm`].editGroups" :key="index">
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
                                    <template v-for="(column,index) in tableColTitleData.columns[`saleCreditAdjustQkFm`].editColumns">
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
                }
export default {
    name:'saleCreditAdjustStatuFnWin',
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
            saleCreditAdjustStatuFnWin:500,
            disabled_submitBtn:true,
            showWindow:false,// 是否显示
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
                    let saleCreditAdjustStatuFnWinObj = document.getElementById('saleCreditAdjustStatuFnWin');
                    this.saleCreditAdjustStatuFnWin = saleCreditAdjustStatuFnWinObj.offsetHeight
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
        },
        rowClickEvent(index,rowInfo){
            //debugger
        },
       
           // 加载列头数据
        loadColumsData() {
            let formName = 'saleCreditAdjustQkFm'
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
            let _url =`/sale/creditAdjust/spGetCustCredit`
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