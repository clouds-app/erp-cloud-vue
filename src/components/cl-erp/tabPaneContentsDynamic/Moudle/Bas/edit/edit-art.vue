<template>
  <div>
    <editWindow
      class="cl-edit-art"
      :title="actionLableName"
      v-model="showWindow"
      :fullscreen="false"
      width="66%"
      :loading="!isLoaddingDone"
      :spinLoaddingText="spinLoaddingText"
      @on-ok="formTableDataSubmit()"
      v-if="showWindow||initData.columns"
    >
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
                <FormItem label="纸质代号" prop="artCode">
                  <referenceField v-model="formDataInfo.master.artCode"
                   ref='firstFocusInput'
                   :disabled="detailDisabled"
                    maxlength="20" 
                    placeholder="请输入纸质代号"
                    :form-name="frommastername"
                    :id="formDataInfo.master.id"
                  ></referenceField>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="层数" prop="artCS">
                  <InputNumber
                    :disabled="detailDisabled"
                    @on-change="deleterow"
                    v-model="formDataInfo.master.artCS"
                    :formatter="value => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                    :parser="value => value.replace(/\$\s?|(,*)/g, '')"
                    style="width:100%"
                    maxlength="20"
                    placeholder="层数"

                  ></InputNumber>
                </FormItem>
              </Col>
            </Row>
          </Col>

          <Col span="24">
            <FormItem label="备注" prop="remark">
              <Input
              :disabled="detailDisabled"
                v-model="formDataInfo.master.remark"
                maxlength="100"
                placeholder="请输入备注..."
              ></Input>
            </FormItem>
          </Col>
        </Row>
      </Form>

      <Tabs>
        <TabPane label="纸质" name="artList">
            <eTable
              ref="tableFields2"
              unqiue-mark="id"
              :index-menu="true"
              :col-start="0"
              :width="200"
              :row-init-data="initData.initData.basArtPaperFm"
              :data="formDataInfo.artPaperCode.defaultList"
              :rules="tableFieldsValidator_cuslist"
              @row-click="rowClick"
              @row-delete="rowDelete"
              :showDeleteEvent="true"
              :showContextMenu="false"
            >
            <template slot="head">
              <tr
                v-for="(columnGroup,index) in initData.columns.basArtPaperFm.editGroups"
                :key="index"
              >
                <th
                  :class="`ivu-table-column-${column.titleAlign}`"
                  v-for="(column,index2) in columnGroup"
                  :key="index2"
                  :width="column.editWidth"
                  :colspan="column.colSpan"
                  :rowspan="column.rowSpan"
                  style="text-align:center;"
                >
                  <div class="ivu-table-cell">
                    <span class>{{column.title}}</span>
                  </div>
                </th>
              </tr>
            </template>
            <template slot="body" slot-scope="{ row, index, valueChangeAssign }">
              <td
                :class="`ivu-table-column-${column.align}`"
                v-for="(column,columnIndex) in initData.columns.basArtPaperFm.editColumns"
                :key="columnIndex"
                :width="column.editWidth"
                @contextmenu.prevent="show(index)"
              >
              <popup
                  v-if="column.key=='paperCode'"
                  :popupClickValidator="clickValuedate"
                  v-model="row.paperCode"
                  field-name="paperCode"
                  :disabled="detailDisabled"
                  popup-name="SpaperCodeSingleBox"
                  :fill-model.sync="formDataInfo.artPaperCode.defaultList"
                  render-fields="paperCode,paperName,gram"
                  from-fields="paperCode,paperName,gram"
                  :index="index"
                  :init-data="{}"
                  :query-params="{}"
                  @on-fill="dataFill"
                  @input="
                  value => {
                    valueChangeAssign(value, index, row, 'paperCode');
                  }
                "
                />
               <formControl
                  v-else
                  :control-type="column.controlType"
                  v-model="row[column.key]"
                  :disabled="detailDisabled||column.readOnly"
                  @input="value => {valueChangeAssign(value, index, row,column.key)}"
                ></formControl>
              </td>
            </template>
            </eTable>
          </TabPane>
        <!--  注意:eTable formDataInfo.artLengs.defaultList  ===artLengs=== 需要根据实际接口修改,其它不变-->
        <TabPane  v-if="showWindow"  label="纸质楞别" name="name1">
          <eTable
            ref="tableFields"
            unqiue-mark="id"
            :index-menu="true"
            :col-start="0"
            :width="200"
            :row-init-data="initData.initData.basartlengFm"
            :data.sync="formDataInfo.artLengs.defaultList"
            :rules="showWindow?tableFieldsValidator:''"
            :showContextMenu='!detailDisabled'
          >
            <template slot="head">
              <tr>
                <th class="ivu-table-column-center" width="80">
                  <div class="ivu-table-cell">
                    <span class>楞别</span>
                  </div>
                </th>

                <th class="ivu-table-column-center" width="80">
                  <div class="ivu-table-cell">
                    <span class>基重</span>
                  </div>
                </th>
                <th class="ivu-table-column-center" width="100">
                  <div class="ivu-table-cell">
                    <span class>环压指数</span>
                  </div>
                </th>
                <th class="ivu-table-column-center" width="100">
                  <div class="ivu-table-cell">
                    <span class>耐破度</span>
                  </div>
                </th>

                <th class="ivu-table-column-center" width="100">
                  <div class="ivu-table-cell">
                    <span class>边压指数</span>
                  </div>
                </th>

                <th class="ivu-table-column-center" width="100">
                  <div class="ivu-table-cell">
                    <span class>横压指数</span>
                  </div>
                </th>

                <th class="ivu-table-column-center" width="100">
                  <div class="ivu-table-cell">
                    <span class>直压指数</span>
                  </div>
                </th>
                <th class="ivu-table-column-center" width="100">
                  <div class="ivu-table-cell">
                    <span class>备注</span>
                  </div>
                </th>
              </tr>
            </template>
          
            <template slot="body" slot-scope="{ row, index, valueChangeAssign}">
              <td class="ivu-table-column-left" width="100">
                <popup
                  :disabled="detailDisabled"
                  :popupClickValidator="clickValuedate"
                  v-model="row.lbCode"
                  field-name="lbCode"
                  popup-name="LengMultiBox"
                  :fill-model.sync="formDataInfo.artLengs.defaultList"
                  render-fields="lengId,lbCode,lbX1,lbX2,lbX3,lbX4"
                  from-fields="id,lbCode,lbX1,lbX2,lbX3,lbX4"
                  :index="index"
                  :init-data="initData.initData.basartlengFm"
                  :excludeParams="{'lbCode$notIn':getfilterlbCode()}"
                  :query-params="{lbCS:formDataInfo.master.artCS}"
                  @on-fill="detailDisabledDataFill"
                  @input="
                      value => {
                        valueChangeAssign(value, index, row, 'lbCode');
                      }
                    "
                />
              </td>
             <!-- 基重 -->
              <td class="ivu-table-column-center" width="100">
                <Input
                  v-model="row.baseWt"
                  :disabled="detailDisabled"
                  @input="
                      value => {
                        valueChangeAssign(value, index, row, 'baseWt');
                      }
                    "
                  size="small"
                  :maxlength="20"
                ></Input>
              </td>
              <!-- 环压指数 -->
              <td class="ivu-table-column-center" width="100">
                <Input
                  v-model="row.press"
                  :disabled="detailDisabled"
                  @input="
                      value => {
                        valueChangeAssign(value, index, row, 'press');
                      }
                    "
                  size="small"
                  :maxlength="20"
                ></Input>
              </td>
              <!-- 耐破度 -->
              <td class="ivu-table-column-center" width="100">
                <Input
                :disabled="detailDisabled"
                  v-model="row.crlimit"
                  @input="
                      value => {
                        valueChangeAssign(value, index, row, 'crlimit');
                      }
                    "
                  size="small"
                  :maxlength="20"
                ></Input>
              </td>
              <!-- 边压指数 -->
              <td class="ivu-table-column-center" width="100">
                <Input
                :disabled="detailDisabled"
                  v-model="row.byLimit"
                  @input="
                      value => {
                        valueChangeAssign(value, index, row, 'byLimit');
                      }
                    "
                  size="small"
                  :maxlength="20"
                ></Input>
              </td>
              <!-- 横压指数 -->
              <td class="ivu-table-column-center" width="100">
                <Input
                :disabled="detailDisabled"
                  v-model="row.hpress"
                  @input="
                      value => {
                        valueChangeAssign(value, index, row, 'hpress');
                      }
                    "
                  size="small"
                  :maxlength="20"
                ></Input>
              </td>
              <!-- 直压指数	 -->
              <td class="ivu-table-column-center" width="100">
                <Input
                  v-model="row.vpress"
                  :disabled="detailDisabled"
                  @input="
                      value => {
                        valueChangeAssign(value, index, row, 'vpress');
                      }
                    "
                  size="small"
                  :maxlength="20"
                ></Input>
              </td>
              <td class="ivu-table-column-center" width="100">
                <Input
                :disabled="detailDisabled"
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
    </editWindow>
  </div>
    <!-- <edit
    :actionSubtitle="纸质"
    >
    </edit> -->
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
import formControl from '@/components/form-control/form-control'
import InputNumber from '@/components/input-number'
import rightMenu from '@/components/e-table/right-menu'
import referenceField from '@/components/referenceField/referenceField'
import editWindow from '@/components/edit-window/edit-window'
import popup from '@/components/popup/popup'
import eTable from '@/components/e-table/e-table'
import request from '@/libs/request'
import editBaseMixins from '../../mixins/edit'
import { customValidator, uniqueValidator } from '@/libs/validator'
import optionSearch from '../../components/optionSearch'
import { deepCopy } from "view-design/src/utils/assist";
const default_formDataInfo = {
  // 主表 更改字段
  master: {
    artCode: '',
    artCS: 0,
    saleByWt: 'false',
    remark: ''
  },
  // 子表 artLengs 根据实际接口更改,其它不变
  artLengs: {
    defaultList: [], // 默认列
    addList: [], // 添加列
    deleteList: [], // 删除列
    updateList: [] // 更新列
  },
   // 子表 纸质列表
  artPaperCode: {
    addList: [], // 添加列
    defaultList: [], // 默认列
    deleteList: [], // 删除列
    updateList: [] // 更新列
  },
}
export default {
  name: 'edit-art',
  mixins: [editBaseMixins],
  components: {
    InputNumber,
    editWindow,
    optionSearch,
    popup,
    // Form,
    eTable,
    referenceField,
    rightMenu,
    formControl
  },
  data () {
    return {
      // filterlbCode:'',
      showContextMenu: true,
      showEditMenu: false,
      frommastername: 'basartFm',
      actionSubtitle: '纸质',
      formName: 'basartFm',
      requestBaseUrl: '/bas/art', // 请求 查询 操作的基础路径
      // formDataInfo: Object.assign({}, default_formDataInfo), // 防止添加和更新数据提交发生冲突
      formDataInfo: deepCopy(default_formDataInfo),
      subTableFieldInitData: {

      },
      // 需要验证的数据
      ruleValidate: {
        artCode: [
          { required: true, message: '纸质代号不能为空', trigger: 'blur' },
          {
            validator: customValidator,
            trigger: 'blur',
            customRule: ['identifier'],
            fieldDesc: '纸质代号'
          },
          {
            validator: uniqueValidator,
            trigger: 'blur',
            fieldDesc: '纸质代号',
            params: {
              fieldName: 'artCode',
              formName: 'basartFm',
              id: () => {
                return this.formDataInfo.master.id
              }
            }
          }
        ]

        // artCS: [{ required: true,  message: "层数不能为空", trigger: "blur" }]
      },
      tableFieldsValidator: {
        lbCode: [
          { required: true, message: '楞别不能为空', trigger: 'blur' }
        ]
      },
       tableFieldsValidator_cuslist: {

      },
      getartcs: 0
    }
  },
  watch:{
    'formDataInfo.master.artCS'(n,o){
      if(this.showWindow){
          if(n == 0){
            this.initData.initData.basArtPaperFm.lbCs = null
            this.formDataInfo.artPaperCode.defaultList=deepCopy([this.initData.initData.basArtPaperFm])
            return
          }
          if(this.formDataInfo.artPaperCode.defaultList.length<=n){
            if(this.formDataInfo.artPaperCode.defaultList[0].lbCs == null){
              this.formDataInfo.artPaperCode.defaultList[0].lbCs = 1
            }
            for(var i=this.formDataInfo.artPaperCode.defaultList.length; i<n; i++){
                this.initData.initData.basArtPaperFm.lbCs = i+1
                this.formDataInfo.artPaperCode.defaultList.push(deepCopy(this.initData.initData.basArtPaperFm))
            }
          }else{
            this.formDataInfo.artPaperCode.defaultList.splice(n,this.formDataInfo.artPaperCode.defaultList.length-n)
          }
      }else{
         this.initData.initData.basArtPaperFm.lbCs = null
      }
      
    }
  },
  methods: {
    //删除配纸页面回调
    rowDelete(){
       let data = this.$refs.tableFields2.get()
       data.forEach((item,index)=>{
         item.lbCs=(index+1)
       })
       this.formDataInfo.master.artCS = data.length
        this.deleterow()
    },
    //楞别回调 事件
    detailDisabledDataFill(dataFill){
      let data = this.$refs.tableFields2.get()
      dataFill.forEach((item,index)=>{
        let gramLbx = 0
        let gram = 0
        let sun = 1
        data.forEach((element,index)=>{
          if((index+1)%2==0){
           gramLbx += element.gram*(item.orignData?item.orignData['lbX'+sun]:item['lbX'+sun])
           sun+=1
          }else{
           gram+=element.gram
          }
        })
        let baseWt =parseFloat(((gramLbx+gram)/1000).toFixed(6))
        this.$refs.tableFields.set({baseWt},(item.index?item.index:index))
      })
    },
    dataFill(item){
      let data = this.$refs.tableFields.get()
      if(data[0].lbCode){
        this.detailDisabledDataFill(data)
      }
    },
    rowClick (index, data) {
      //this.subindex = index
    },
    getfilterlbCode(){
      if(!!this.$refs.tableFields){
       let dataList = this.$refs.tableFields.get()
       let filterlbCode = ''
       dataList.filter(item=>{
         if (!!item.lbCode) {
           filterlbCode += item.lbCode+','
         }
       })
       return filterlbCode.substr(0,filterlbCode.length-1)
      }
      return ''
    },
    // 判断数据是新增还是修改
    formDetailDataCall () {
      // debugger
      if (this.action != 'add') {
        this.getartcs = this.formDataInfo.master.artCS
      }
    },
    // 当主表层数改变时清空子表数据
    deleterow () {
      let tableData = this.$refs['tableFields'].getCategorizeData()
      if (this.formDataInfo.master.artCS) {
        if (this.formDataInfo.master.artCS != this.getartcs) {
          this.formDataInfo.artLengs.defaultList = []
          tableData.deleteList = tableData.updateList
        }
        this.getartcs = this.formDataInfo.master.artCS
      }
    },
    clickValuedate () {
      // debugger;
      if (
        !this.formDataInfo.master.artCS ||
        this.formDataInfo.master.artCS == ''
      ) {
        this.$Message.error('层数不能为空')
        return false
      }
      return true
    },

    // 重写父类,添加时候,清空数据
    HandleFormDataInfo () {
      this.formDataInfo = deepCopy(default_formDataInfo)
    },
    // 重写父类 关闭窗口时 触发事件
    // closeActionTigger () {
    //   // debugger
    //   // fix 清除上次的错误提示 formDataInfo 为表单ref名称
    //   this.$refs['formDataInfo'].resetFields()
    //   // this.$refs['tableFields'].reset()
    //   // this.formDataInfo.artLengs.defaultList = this.$refs['tableFields'].cloneData
    // },
    // 重写父类,修改提交数据
    resetformDataInfo (_data) {
      let tableData = this.$refs['tableFields'].getCategorizeData()
      // //debugger
      this.formDataInfo.artLengs = tableData
       let tableData2 = this.$refs['tableFields2'].getCategorizeData()
        this.formDataInfo.artPaperCode = tableData2
      return this.formDataInfo
    }
  }
}
</script>

<style>
/* .cl-edit-art .ivu-form-item {
  margin-bottom: 5px !important;
}
.cl-edit-art .ivu-select-item {
  display: block;
} */
</style>
