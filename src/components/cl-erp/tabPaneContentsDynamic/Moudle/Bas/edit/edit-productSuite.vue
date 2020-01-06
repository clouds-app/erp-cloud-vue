<template>
  <div>
    <editWindow
      class="cl-edit-productSuite"
      :title="actionLableName"
      v-model="showWindow"
      :fullscreen="true"
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
      <Row>
        <Col span="6" v-for="(columns,index) in initData.columns.productUnionFm.editColumns" :key="index">
          <FormItem :label="columns.title" :prop="'master.' + columns.key">
            <!-- 控件特殊处理 客户 -->
            <popup v-if="columns.key == 'cus'"
             v-model="formDataInfo.master.cusCode"
             field-name="cusCode"
             :disabled="false"
             popup-name="CustomerSingleBox"
             :fill-model.sync="formDataInfo.master"
             render-fields="custId,cusCode,cusName"
             from-fields="id,cusCode,cusName"
             :suffix="true"
             :suffix-model="formDataInfo.master.cusName"
             :query-params="{}"
             >
             </popup>
             <!--生产备注-->
             <popup v-else-if="columns.key == 'puPRemark'" v-model="formDataInfo.master.puPRemark"
              field-name="puPRemark" :disabled="false" popup-name="ResumeSingleBox"
               :fill-model.sync="formDataInfo.master" render-fields="puPRemark" from-fields="resumeName"
               :query-params="{resumeType:'C'}" />
              <!--送货备注-->
              <popup v-else-if="columns.key == 'puDRemark'" v-model="formDataInfo.master.puDRemark" field-name="puDRemark" :disabled="false" popup-name="ResumeSingleBox"
                :fill-model.sync="formDataInfo.master" render-fields="puDRemark" from-fields="resumeName"
                :query-params="{resumeType:'H'}" />
             <formControl v-else :control-type="columns.controlType" v-model="formDataInfo.master[columns.key]" :disabled="columns.readOnly"></formControl>
          </FormItem>
        </Col>
      </Row>

      </Form>
         <!--  注意:eTable formDataInfo.wareHouseItems.defaultList  ===wareHouseItems=== 需要根据实际接口修改,其它不变-->

      <Tabs>
        <TabPane :label="initData.listView.productUnionItemFm.tableDesc" name="name1">
          <eTable
            ref="tableFields"
            unqiue-mark="id"
            :height="260"
            :index-menu="true"
            :col-start="0"
            :width="200"
            :row-init-data="initData.initData.productUnionItemFm"
            :data="productUnionList"
            :rules="tableFieldsValidator"
          >
            <template slot="head">
              <tr v-for="(columnGroup,index) in initData.columns.productUnionItemFm.editGroups" :key="index">
                <th class="ivu-table-column-left"
                v-for="(column,index2) in columnGroup" :key="index2"
                :width="column.width"
                :colspan="column.colSpan"
                :rowspan="column.rowSpan"
                style="text-align:center;"
                >
                  <div class="ivu-table-cell">
                    <span class="">{{column.title}}</span>
                  </div>
                </th>

              </tr>
            </template>
            <template
              slot="body"
              slot-scope="{ row, index, valueChangeAssign }"
            >
              <td class="ivu-table-column-left"
               v-for="(column,index) in initData.columns.productUnionItemFm.editColumns"
               :key="index"
               :width="column.width">
                <popup v-if="column.key == 'prodNo'"
                v-model="row[column.key]"
                field-name="prodNo"
                :disabled="false"
                popup-name="ProductMultiBox"
                :fill-model.sync="productUnionList"
                render-fields="productId,prodNo,bpName"
                from-fields="productId,bpNo,bpName"
                :init-data="initData.initData.productUnionItemFm"
                :suffix="false"
                :index="index"
                :query-params="{'bpNo$notIn':productUnionItemFmProdNoList}"
                ></popup>
                <formControl v-else :control-type="column.controlType" v-model="row[column.key]" :disabled="column.readOnly"></formControl>
              </td>
            </template>
          </eTable>
        </TabPane>
      </Tabs>

      <Tabs>
        <TabPane :label="initData.listView.productUnionSubFm.tableDesc" name="name1">
          <eTable
            ref="tableFields"
            unqiue-mark="id"
            :height="260"
            :index-menu="true"
            :col-start="0"
            :width="200"
            :row-init-data="initData.initData.productUnionSubFm"
            :data="productUnionSubList"
            :rules="tableFieldsValidator"
          >
            <template slot="head">
              <tr v-for="(columnGroup,index) in initData.columns.productUnionSubFm.editGroups" :key="index">
                <th class="ivu-table-column-left"
                v-for="(column,index2) in columnGroup" :key="index2"
                :width="column.width"
                :colspan="column.colSpan"
                :rowspan="column.rowSpan"
                style="text-align:center;"
                >
                  <div class="ivu-table-cell">
                    <span class="">{{column.title}}</span>
                  </div>
                </th>

              </tr>
            </template>
            <template
              slot="body"
              slot-scope="{ row, index, valueChangeAssign }"
            >
              <td class="ivu-table-column-left"
               v-for="(column,index) in initData.columns.productUnionSubFm.editColumns"
               :key="index"
               :width="column.width">
                <formControl :control-type="column.controlType" v-model="row[column.key]"></formControl>
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
import editWindow from '@/components/edit-window/edit-window'
// import Form from '@/components/form/form'
import eTable from '@/components/e-table/e-table'
import request from '@/libs/request'
import editBaseMixins from '../../mixins/edit'
import formControl from '@/components/form-control/form-control'
import popup from '@/components/popup/popup'
const default_formDataInfo = {
  // 主表 更改字段
  master: {
    whCode: '',
    whName: '',
    whType: '',
    remark: ''
  },
  // 子表 wareHouseItems 根据实际接口更改,其它不变
  wareHouseItems: {
    addList: [], // 添加列
    defaultList: [], // 默认列
    deleteList: [], // 删除列
    updateList: [] // 更新列
  }
}
export default {
  name: 'edit-warehouse',
  mixins: [editBaseMixins],
  components: {
    editWindow,
    // Form,
    eTable,
    formControl,
    popup
  },
  data () {
    return {
      formName: 'productUnionFm',
      requestBaseUrl: '/basic/productUnion', // 请求 查询 操作的基础路径
      formDataInfo: {
        master: {},
        productUnionSlaves: []
      }, // 防止添加和更新数据提交发生冲突
      productUnionSubList: [],
      // 需要验证的数据
      ruleValidate: {
        whCode: [
          { required: true, message: '部门编码不能为空', trigger: 'blur' }
        ],
        whName: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' }
        ],
        whType: [
          { required: true, message: '班组类型不能为空', trigger: 'blur' }
        ]
      },
      tableFieldsValidator: {
        wsCode: [
          { required: true, message: '仓位编号不能为空', trigger: 'blur' }
        ],
        wsName: [
          { required: true, message: '仓位名称不能为空', trigger: 'blur' }
        ],
        wsOwner: [
          { required: true, message: '所属厂区不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    initData: {
      handler (n, o) {
        if (n.initData) {
          this.formDataInfo.master = n.initData.productUnionFm
        }
      },
      deep: true
    }
  },
  computed: {
    productUnionList () {
      let temp = []
      this.formDataInfo.productUnionSlaves.forEach((item, index) => {
        temp.push(item.master)
      })
      return temp
    },
    productUnionItemFmProdNoList () {
    // 获取产品编号	列表，转换为 "",""格式，用于弹出框排除数据
      let temp = []
      this.formDataInfo.productUnionSlaves.forEach((item, index) => {
        temp.push(item.master.prodNo)
      })
      return temp.toString()
    }
  },
  methods: {
    // 重写父类,添加时候,清空数据
    HandleFormDataInfo () {
      this.formDataInfo = Object.assign({}, default_formDataInfo)
    },
    // 重写父类,修改提交数据
    resetformDataInfo (_data) {
      let tableData = this.$refs['tableFields'].getCategorizeData()
      // debugger
      this.formDataInfo.wareHouseItems = tableData
      return this.formDataInfo
    },
    fillProductUnionSubFm (data) {
      // 填充第三层表的数据，根据第二层表中的产品编号（productId）和产品类型
      // 去查询第三层的数据
    }
  }
}
</script>

<style>
.cl-edit-productSuite .ivu-form-item {
  margin-bottom: 5px !important;
}

.cl-edit-productSuite .ivu-select-item {
  display: block;
}
</style>
