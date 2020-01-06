<template>
  <div>
    <editWindow
      class="cl-edit-workPro"
      :title="actionLableName"
      v-model="showWindow"
      :fullscreen="false"
      width="60%"
      :loading="!isLoaddingDone"
      :spinLoaddingText="spinLoaddingText"
      @on-ok="formTableDataSubmit()"
    >
      <Form
        ref="formDataInfo"
        :show-message="true"
        :model="formDataInfo.master"
        :rules="ruleValidate"
        :label-width="80"
      >
        <Row :gutter="18">
          <Col span="12">
            <FormItem label="编号" prop="wpNo">
              <Input v-model="formDataInfo.master.wpNo" maxlength="20" placeholder="请输入编号"></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="名称" prop="wpName">
              <Input v-model="formDataInfo.master.wpName" maxlength="80" placeholder="请输入名称"></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="工序类型" prop="wpType">
              <optionSearch
                @onChange="optionOnChange"
                :defaultItem.sync="formDataInfo.master.wpType"
                :loaddingDataWhen="showWindow"
                formKey="wpType"
                query="wpType"
              />
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="备注" prop="remark">
              <Input
                v-model="formDataInfo.master.remark"
                type="textarea"
                maxlength="100"
                :autosize="{ minRows: 2, maxRows: 5 }"
                placeholder="请输入备注..."
              ></Input>
            </FormItem>
          </Col>
        </Row>
      </Form>

      <Tabs>
        <!--  注意:eTable formDataInfo.box.defaultList  ===box=== 需要根据实际接口修改,其它不变-->
        <!-- 如果子表中用到了 多选弹窗框 :data.sync =-->
        <TabPane label="工序资料明细" name="name1">
          <eTable
            ref="tableFields"
            unqiue-mark="id"
            :index-menu="true"
            :col-start="0"
            :width="300"
            :row-init-data="tableInitData?tableInitData.workProcItemFm:{}"
            :data="formDataInfo.basWorkProcItemSlaves.defaultList"
            :rules="tableFieldsValidator"
          >
            <template slot="head">
              <tr>
                <th class="ivu-table-column-center" width="150">
                  <div class="ivu-table-cell" >
                    <span class="">序号</span>
                  </div>
                </th>

                <th class="ivu-table-column-center" width="150">
                  <div class="ivu-table-cell">
                    <span class="">工序编号</span>
                  </div>
                </th>
                <th class="ivu-table-column-center" width="150">
                  <div class="ivu-table-cell">
                    <span class="">工序名称</span>
                  </div>
                </th>

                <th class="ivu-table-column-center" width="150">
                  <div class="ivu-table-cell">
                    <span class="">工序要求</span>
                  </div>
                </th>
                <th class="ivu-table-column-center" width="150">
                  <div class="ivu-table-cell">
                    <span class="">备注</span>
                  </div>
                </th>
              </tr>
            </template>
            <template slot="body" slot-scope="{ row, index, valueChangeAssign }">
               <td class="ivu-table-column-center" width="150">
                <Input
                  v-model="row.wpiNum"
                  @input="
                    value => {
                      valueChangeAssign(value, index, row, 'wpiNum');
                    }
                  "
                  size="small"
                  :maxlength="20"
                ></Input>
              </td>
              <td class="ivu-table-column-center" width="150">
                <Input
                  v-model="row.wpiNo"
                  @input="
                    value => {
                      valueChangeAssign(value, index, row, 'wpiNo');
                    }
                  "
                  size="small"
                  :maxlength="20"
                ></Input>
              </td>
              <td class="ivu-table-column-center" width="150">
                <Input
                  v-model="row.wpiName"
                  @input="
                    value => {
                      valueChangeAssign(value, index, row, 'wpiName');
                    }
                  "
                  size="small"
                  :maxlength="20"
                ></Input>
              </td>
              <td class="ivu-table-column-center" width="150">
                <Input
                  v-model="row.wpiAsknote"
                  @input="
                    value => {
                      valueChangeAssign(value, index, row, 'wpiAsknote');
                    }
                  "
                  size="small"
                  :maxlength="20"
                ></Input>
              </td>
              <td class="ivu-table-column-center" width="150">
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
import optionSearch from '../../components/optionSearch'
import editWindow from '@/components/edit-window/edit-window'
// import Form from '@/components/form/form'
import eTable from '@/components/e-table/e-table'
import request from '@/libs/request'
import editBaseMixins from '../../mixins/edit'
import { customValidator, uniqueValidator } from '@/libs/validator'

const default_formDataInfo = {
  master: {
    wpNo: '',
    wpType: '',
    wpTypeText: '',
    wpName: '',
    remark: ''
  },
  // 子表 box 根据实际接口更改，其他不变
  basWorkProcItemSlaves: {
    addList: [], // 添加列
    defaultList: [{
      remark: '',
      wpId: 0,
      wpiAsknote: '',
      wpiName: '',
      wpiNo: '0',
      wpiNum: 0
    }], // 默认列
    deleteList: [], // 删除列
    updateList: [] // 更新列
  }
}
export default {
  name: 'edit-workPro',
  mixins: [editBaseMixins],
  components: {
    editWindow,
    optionSearch,
    eTable
  },

  data () {
    return {
      formName: 'workProcFm', // 主表的formName名称
      requestBaseUrl: '/bas/workPro', // 请求 查询 操作的基础路径
      formDataInfo: Object.assign({}, default_formDataInfo), // 防止添加和更新数据提交发生冲突
      // 需要验证的数据
      ruleValidate: {
        wpNo: [
          { required: true, message: '编号不能为空', trigger: 'blur' },
          { validator: customValidator,
            trigger: 'blur',
            customRule: ['toCDB', 'identifier', 'spaceStr'],
            fieldDesc: '编号' },
          {
            validator: uniqueValidator,
            trigger: 'blur',
            fieldDesc: '编号',
            params: {
              fieldName: 'wpNo',
              formName: 'workProcFm',
              id: () => {
                return this.formDataInfo.master.id
              }
            }
          }
        ],

        wpName: [
          { required: true, message: '名称不能为空', trigger: 'blur' },
          { validator: customValidator,
            trigger: 'blur',
            customRule: ['toCDB', 'spaceStr'],
            fieldDesc: '工序名称' }
        ]

      },
      tableFieldsValidator: {}
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
      this.formDataInfo.basWorkProcItemSlaves = tableData
      return this.formDataInfo
    }
  }
}
</script>

<style>
.cl-edit-workPro .ivu-form-item {
  margin-bottom: 12px !important;
}
.cl-edit-workPro .ivu-table-cell {
  text-align: center;
}
</style>
