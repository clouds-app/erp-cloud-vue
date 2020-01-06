<template>
  <div>
    <editWindow
      class="cl-edit-supplierArt"
      :title="actionLableName"
      v-model="showWindow"
      :fullscreen="false"
      width="66%"
      :loading="!isLoaddingDone"
      :spinLoaddingText="spinLoaddingText"
      @on-ok="formTableDataSubmit()"
      v-if="initData.columns"
    >
      <Form
        ref="formDataInfo"
        :show-message="false"
        :model="formDataInfo.master"
        :rules="ruleValidate"
        :label-width="100"
        label-colon
      >
        <!--  -->
        <Row>
          <Col span="12">
            <FormItem label="供应商" prop="purCode">
             <popup
                v-model="formDataInfo.master.purCode"
                field-name="purCode"
                :disabled="false"
                popup-name="SupplierSingleBox"
                :fill-model.sync="formDataInfo.master"
                render-fields="supplierId,purCode,purName"
                from-fields="id,purCode,purName"
                :suffix="true"
                :suffix-model="formDataInfo.master.purName"
                :query-params="{}"
              />
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="备注" prop="remark">
              <Input
                v-model="formDataInfo.master.remark"
                maxlength="20"
                placeholder="请输入备注"
              ></Input>
            </FormItem>
          </Col>
          
        </Row>
       
      </Form>

      <Tabs>
        <TabPane label="供应商纸质明细" name="cusList">
          <eTable
            ref="tableFields"
            unqiue-mark="id"
            :index-menu="true"
            :col-start="0"
            :width="200"
            :row-init-data="tableInitData?tableInitData.purSupplierArtItemFm:{}"
            :data="formDataInfo.purSupplierArtItemSlaves"
            :rules="tableFieldsValidator"
          >
            <template slot="head">
              <tr>
                <th class="ivu-table-column-left" width="100">
                  <div class="ivu-table-cell">
                    <span class="">供货商纸质</span>
                  </div>
                </th>
                <th class="ivu-table-column-left" width="100">
                  <div class="ivu-table-cell">
                    <span class="">本厂纸质</span>
                  </div>
                </th>
                <th class="ivu-table-column-left" width="100">
                  <div class="ivu-table-cell">
                    <span class="">层数</span>
                  </div>
                </th>
                <th class="ivu-table-column-left" width="100">
                  <div class="ivu-table-cell">
                    <span class="">备注</span>
                  </div>
                </th>
               
              </tr>
            </template>
            <template
              slot="body"
              slot-scope="{ row, index, valueChangeAssign }"
            >
              <td class="ivu-table-column-left" width="100">
                <Input
                  v-model="row.supplierArtName"
                  @input="  
                    value => {
                      valueChangeAssign(value, index, row, 'supplierArtName');
                    }
                  "
                  size="small"
                  :maxlength="20"
                ></Input>
              </td>
              <td class="ivu-table-column-left" width="100">
                <popup 
                    v-model="row.artCode"
                    field-name="artCode"
                    :disabled="false"
                    popup-name="ArtSingleBox"
                    :fill-model.sync="formDataInfo.purSupplierArtItemSlaves"
                    render-fields="artId,artCode,artCS"
                    from-fields="id,artCode,artCS"
                    :index="index"
                    :init-data="formDataInfo.purSupplierArtItemSlaves"
                    :query-params="{}"
                    @on-fill="addpurSupplierArtPzSlaves"
                     @input="
                      value => {
                        valueChangeAssign(value, index, row, 'artCode');
                      }
                    "
                  ></popup>
              </td>
              <td class="ivu-table-column-left" width="100">
                <Input
                  v-model="row.artCS"
                  disabled
                  @input="
                    value => {
                      valueChangeAssign(value, index, row, 'artCS');
                    }
                  "
                  size="small"
                  :maxlength="20"
                ></Input>
              </td>
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
              
            </template>
          </eTable>
        </TabPane>
      </Tabs>
      <Tabs>
        <!--  注意:eTable formDataInfo.wareHouseItems.defaultList  ===wareHouseItems=== 需要根据实际接口修改,其它不变-->
        <TabPane label="供应商配纸" name="addrList">
          <eTable
            ref="tableFields2"
            unqiue-mark="id"
            :index-menu="true"
            :col-start="0"
            :width="200"
            :row-init-data="tableInitData?tableInitData.purSupplierArtPZFm:{}"
            :data="formDataInfo.purSupplierArtItemSlaves.purSupplierArList"
            :rules="tableFieldsValidator"
          >
            <template slot="head">
              <tr>
                <th class="ivu-table-column-left" width="100">
                  <div class="ivu-table-cell">
                    <span class="">层数</span>
                  </div>
                </th>
                <th class="ivu-table-column-left" width="100">
                  <div class="ivu-table-cell">
                    <span class="">克重</span>
                  </div>
                </th>
                <th class="ivu-table-column-left" width="100">
                  <div class="ivu-table-cell">
                    <span class="">原纸品名</span>
                  </div>
                </th>
                <th class="ivu-table-column-left" width="100">
                  <div class="ivu-table-cell">
                    <span class="">生产厂家</span>
                  </div>
                </th>
                <th class="ivu-table-column-left" width="100">
                  <div class="ivu-table-cell">
                    <span class="">备注</span>
                  </div>
                </th>
               
              </tr>
            </template>
            <template
              slot="body"
              slot-scope="{ row, index, valueChangeAssign }"
            >
              <td class="ivu-table-column-left" width="100">
                <Input
                  v-model="row.artCS"
                  :disabled="index == csInfo"
                  @input="
                    value => {
                      valueChangeAssign(value, index, row, 'artCS');
                    }
                  "
                  size="small"
                  :maxlength="20"
                ></Input>
              </td>
              <td class="ivu-table-column-left" width="100">
                <Input
                  v-model="row.piGram"
                  :disabled="index == csInfo"
                  @input="
                    value => {
                      valueChangeAssign(value, index, row, 'piGram');
                    }
                  "
                  size="small"
                  :maxlength="20"
                ></Input>
              </td>
              <td class="ivu-table-column-left" width="100">
               
                <optionSearch
                      @onChange="item => { valueChangeAssign(item.value, index, row, 'snName')}"
                      :defaultItem.sync="formDataInfo.purSupplierArtItemSlaves.purSupplierArtPzSlaves.snName"
                      :loaddingDataWhen="showWindow"
                      formKey="snName"
                      query="snName"
                  />
              </td>
              <td class="ivu-table-column-left" width="100">
                <Input
                  v-model="row.vendor"
                  :disabled="index == csInfo"
                  @input="
                    value => {
                      valueChangeAssign(value, index, row, 'vendor');
                    }
                  "
                  size="small"
                  :maxlength="20"
                ></Input>
              </td>
              <td class="ivu-table-column-left" width="100">
                <Input
                  v-model="row.remark"
                  :disabled="index == csInfo"
                  @input="
                    value => {
                      valueChangeAssign(value, index, row, 'remark');
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
import preferential from "@/components/preferential/preferential";
import popup from "@/components/popup/popup";
import editWindow from "@/components/edit-window/edit-window";
// import Form from '@/components/form/form'
import eTable from "@/components/e-table/e-table";
import request from "@/libs/request";
import editBaseMixins from "../../mixins/edit";
import optionSearch from "../../components/optionSearch";
 import formControl from '@/components/form-control/form-control';
const default_formDataInfo = {
        // 主表 更改字段
        master: {
          purCode:"",
          purName:"",
          remark:"",
         
        },
        // 子表 wareHouseItems 根据实际接口更改,其它不变
        purSupplierArtItemSlaves: [
          {
              master: {
                  artCS: 0,
                  artCode: "",
                  artId: 0,
                  remark: "",
                  supplierArtId: 0,
                  supplierArtName: ""
            },
          }
         
        ],
          
           purSupplierArtPzSlaves:[
             {
                artCS: 0,
                piGram: 0,
                remark: "",
                snName: "",
                supplierArtId: 0,
                supplierArtItemId: 0,
                vendor: ""
             }
            
           ]
      }
export default {
  name: "edit-supplierArt",
  mixins: [editBaseMixins],
  components: {
    editWindow,
    optionSearch,
    preferential,
    popup,
    // Form,
    eTable
  },
  data() {
    return {
      formName:"purSupplierArtFm",
      // currentSubItemlength_addr:0, // 当前子表数据个数
      // currentSubItemlength_contact:0, // 当前子表数据个数
      requestBaseUrl: "/purchase/supplierArt", // 请求 查询 操作的基础路径
       //formDataInfo:Object.assign({},default_formDataInfo),// 防止添加和更新数据提交发生冲突
        formDataInfo:{
            master:{},
            purSupplierArtItemSlaves:[],
           
        },
      // 需要验证的数据
      ruleValidate: {
        purCode: [
          { required: true, message: "供应商纸质编号不能为空", trigger: "blur" }
        ],
              
      },
      purSupplierArtItemSlaves: {
      
      },
      purSupplierArtPzSlaves:{
    
      },
      csInfo:undefined
    };
  },

computed:{
  purSupplierArList(){
    let temp = [];
   this.formDataInfo.purSupplierArtItemSlaves.forEach((item,index)=>{
      temp.push(item.master);
    });
    return temp;
  }
},

  methods: {
    // 重写父类,添加时候,清空数据
    HandleFormDataInfo(){
     this.formDataInfo=Object.assign({},default_formDataInfo)
    },
    // 重写父类,修改提交数据
    resetformDataInfo(_data) {
      let tableData = this.$refs["tableFields"].getCategorizeData();
      // debugger
      this.formDataInfo.purSupplierArtItemFm = tableData;
      return this.formDataInfo;
    },
    fillProductUnionSubFm(data){
      //填充第三层表的数据，根据第二层表中的产品编号（productId）和产品类型
      //去查询第三层的数据
    },


    //添加第三层表数据
      addpurSupplierArtPzSlaves(data){  
        debugger;
        if(data[0].data){
        let artCS =parseInt(data[0].data.artCS);//层数  
      //this.csInfo[data.index] = artCS;
          this.$refs.tableFields2.reset();
        if (artCS%2 == 0) {
          this.csInfo=0
          artCS+=1;
          for(let i = 0;i<artCS;i++){
            let item = JSON.parse(JSON.stringify(this.initData.initData.purSupplierArtItemFm));
            this.$refs.tableFields2.set(item);
          }
        }else{
          
          for(let i = 0;i<artCS;i++){
            let item = JSON.parse(JSON.stringify(this.initData.initData.purSupplierArtItemFm));
            this.$refs.tableFields2.set(item);
          }
        }
      }    
    },
    //  // 重写父类,添加时候,清空数据
    // HandleFormDataInfo(){
    //  this.formDataInfo=Object.assign({},default_formDataInfo)
    // },
    // // 判断 供应商纸质明细 是否添加了数据
    // getCurrentSubItemlength_addr(){
    //   let tableData = this.$refs["tableFields"].getCategorizeData();
    //   this.currentSubItemlength_addr=0
    //   // 判断当前字表 添加/更新的 数据个数
    //   if(this.action==='add'){
    //     if(tableData.addList.length>0){
    //        this.currentSubItemlength_addr= Object.keys(tableData.addList[0]).length
    //     }
       
    //   }else{
    //     if(tableData.updateList.length>0){
    //        this.currentSubItemlength_addr= Object.keys(tableData.updateList[0]).length
    //     }
    //     if(tableData.addList.length>0){
    //        this.currentSubItemlength_addr= Object.keys(tableData.addList[0]).length
    //     }
       
    //   }
    //   return this.currentSubItemlength_addr
    // },
    //  // 判断 供应商配是否添加了数据
    // getCurrentSubItemlength_contact(){
    //   let tableData2 = this.$refs["tableFields1"].getTableEditData();
    //   this.currentSubItemlength_contact=0
    //   // 判断当前字表 添加/更新的 数据个数
    //   if(this.action==='add'){
    //     if(tableData2.addList.length>0){
    //         this.currentSubItemlength_contact= Object.keys(tableData2.addList[0]).length
    //     }
      
    //   }else{
    //      if(tableData2.updateList.length>0){
    //         this.currentSubItemlength_contact= Object.keys(tableData2.updateList[0]).length
    //      }
    //     if(tableData2.addList.length>0){
    //         this.currentSubItemlength_contact= Object.keys(tableData2.addList[0]).length
    //     }
    //   }
    //    return this.currentSubItemlength_contact
    // },


    // // 重写父类,修改提交数据
    // resetformDataInfo(_data) {
    //   if(this.currentSubItemlength_addr>0){
    //        let tableData = this.$refs["tableFields"].getCategorizeData();
    //        this.formDataInfo.purSupplierArtItemSlaves = tableData;
    //   }
    //   if(this.currentSubItemlength_contact>0){
    //        let tableData2 = this.$refs["tableFields1"].getTableEditData();
    //        this.formDataInfo.purSupplierArtPzSlaves = tableData2;
    //   }
    //   return this.formDataInfo;
    // }
  }
};
</script>

<style>
.cl-edit-supplierArt .ivu-form-item {
  margin-bottom: 5px !important;
}
.cl-edit-supplierArt .ivu-select-item {
  display: block;
}
</style>
