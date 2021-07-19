<template>
  <div>
    <editWindow
      class="cl-edit-paper"
      :title="actionLableName"
      v-model="showWindow"
      :fullscreen="false"
      width="70%"
      :loading="!isLoaddingDone"
      @on-ok="formDataSubmit()"
    >
      <Form
        ref="formDataInfo"
        :show-message="true"
        :model="formDataInfo"
        :rules="ruleValidate"
        :label-width="90"
      >
        <Row :gutter="18" type="flex" justify="start">
            <Col span="6">
                <FormItem label="原纸编号" prop="paperCode">
                <referenceField
                  ref='firstFocusInput'
                  :disabled="detailDisabled"
                  v-model="formDataInfo.paperCode"
                  maxlength="20"
                  placeholder="请输入原纸编号"
                  :form-name="formmastername"
                  :id="formDataInfo.id"
                ></referenceField>
                </FormItem>
            </Col>
            <!-- <Col span="12">
                 <FormItem label="备注" prop="remark">
                  <InputNumber
                    :disabled="detailDisabled"
                    v-model="formDataInfo.remark"
                     style="width:100%"
                    maxlength="20"
                    placeholder="请输入备注"
                  >
                  </InputNumber>
                </FormItem>
            </Col> -->
            <Col span="6">
                    <!-- :formatter="value => formatterValue(value)" -->
                 <FormItem label="原纸名称" prop="paperName">
                  <Input
                    :disabled="detailDisabled"
                    v-model="formDataInfo.paperName"
                    style="width:100%"
                    maxlength="20"
                    placeholder="请输入原纸名称"
                  ></Input>
                </FormItem>
            </Col>
            <Col span="6">
                  <FormItem label="克重" prop="gram">
                    <InputNumber
                    :disabled="detailDisabled"
                      v-model="formDataInfo.gram"
                     style="width:100%"
                      maxlength="20"
                      placeholder="请输入克重"
                    ></InputNumber>
                  </FormItem>
            </Col>
            <!-- <Col span="12">
                 <FormItem label="钉条(inch)" prop="lbDtInch">
                    <InputNumber
                    :disabled="detailDisabled"
                      v-model="formDataInfo.lbDtInch"
                     style="width:100%"
                      maxlength="20"
                      placeholder="请输入钉条(inch)"
                    >
                    </InputNumber>
                  </FormItem>
            </Col>
            <Col span="12">
                <FormItem label="纸度废边(mm)" prop="lbWidthLose">
                  <InputNumber
                  :disabled="detailDisabled"
                    v-model="formDataInfo.lbWidthLose"
                     style="width:100%"
                    maxlength="20"
                    placeholder="请输入纸度废边mm"
                  ></InputNumber>
                </FormItem>
            </Col>
            <Col span="12">
                <FormItem label="纸长废边(mm)" prop="lbLengLose">
                  <InputNumber
                  :disabled="detailDisabled"
                    v-model="formDataInfo.lbLengLose"
                     style="width:100%"
                    maxlength="20"
                    placeholder="请输入纸长废边mm"
                  ></InputNumber>
                </FormItem>
            </Col>
            <Col span="12">
                 <FormItem label="压线加分(mm)" prop="lbYxAdd">
                  <InputNumber
                  :disabled="detailDisabled"
                    v-model="formDataInfo.lbYxAdd"
                     style="width:100%"
                    maxlength="20"
                    placeholder="请输入压线加分mm"
                  ></InputNumber>
                </FormItem>
            </Col>
            <Col span="12">
                 <FormItem label="折面积系数" prop="lpAreaRate">
                    <InputNumber
                    :disabled="detailDisabled"
                      v-model="formDataInfo.lpAreaRate"
                     style="width:100%"
                      maxlength="20"
                      placeholder="请输入折面积系数"
                    ></InputNumber>
                  </FormItem>
            </Col>
            <Col span="12">
                 <FormItem label="纸度最大开数" prop="lbPMaxCut">
                    <Input
                    :disabled="detailDisabled"
                      v-model="formDataInfo.lbPMaxCut"
                      maxlength="20"
                      placeholder="请输入纸度最大开数"
                      type="number"
                      number
                    ></Input>
                  </FormItem>
            </Col> -->
            <!-- <Col span="12">
                 <FormItem label="纸板最小修边(mm)" prop="lbPMinEdge">
                    <InputNumber
                    :disabled="detailDisabled"
                      v-model="formDataInfo.lbPMinEdge"
                      style="width:100%"
                      maxlength="20"
                      placeholder="请输入纸板最小修边"
                    ></InputNumber>
                  </FormItem>
            </Col> -->
            <!-- <Col span="12">
                 <FormItem label="纸板最大纸宽(mm)" prop="lbPMaxWidth">
                    <InputNumber
                    :disabled="detailDisabled"
                      v-model="formDataInfo.lbPMaxWidth"
                      style="width:100%"
                      maxlength="20"
                      placeholder="请输入纸板最大纸宽"
                    ></InputNumber>
                  </FormItem>
            </Col> -->
            <Col span="6">
                <FormItem label="备注" prop="remark">
                  <Input

                  :disabled="detailDisabled"
                    v-model="formDataInfo.remark"
                    maxlength="100"
                    placeholder="请输入备注..."
                  ></Input>
                </FormItem>
            </Col>

        </Row>
      </Form>
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
import dayjs from "dayjs";
import inputNumber from "@/components/input-number";
import referenceField from '@/components/referenceField/referenceField'
import editBaseMixins from '../../mixins/edit'
import { customValidator, uniqueValidator } from '@/libs/validator'
const default_formDataInfo = {
  //lbCode: '',
  paperCode:'',
  remark: '',
  paperName:'',
  gram:0
  // lpHeigth: 0,
  // lpCS: null,
  // lbLengLose: 0,
  // lpAreaRate: 0,
  // lbYxAdd: 0,
  // lbWidthLose: 0,
  // lbDtInch: 0,
  // lbDtCm: 0,
  // lbPMinEdge: 0,
  // lbPMaxCut: 0,
  // lbPMaxWidth: 0
}
export default {
  name: 'edit-paper',
  mixins: [editBaseMixins],
  components:{referenceField,inputNumber},
  data() {
    return {
      elementIdRandomNum:dayjs().format("YYYY-MM-DD-HH-mm-ss"),
      formmastername: 'basPaperFm',
      actionSubtitle: '原纸', // 当前操作副标题
      requestBaseUrl: '/bas/paper', // 请求 查询 操作的基础路径
      formDataInfo: Object.assign({}, default_formDataInfo), // 防止添加和更新数据提交发生冲突
      // 需要验证的数据
      ruleValidate: {
        paperCode: [{ required: true, message: '原纸编号不能为空', trigger: 'blur' },
          {
            validator: customValidator,
            trigger: 'blur',
            customRule: ['identifier'],
            fieldDesc: '原纸编号'
          }, {
            validator: uniqueValidator,
            trigger: 'blur',
            fieldDesc: '原纸编号',
            params: {
              fieldName: 'paperCode',
              formName: 'basPaperFm',
              id: () => {
                return this.formDataInfo.id
              },
            }
          }
        ],
        // lpCS: [
        //   { required: true, message: '层数不能为空', trigger: 'blur' },
        //   { validator: customValidator,
        //     trigger: 'blur',
        //     customRule: ['toCDB', 'spaceStr', 'number'],
        //     fieldDesc: '层数' }
        // ],
        // lpCS: [ {
        //   validator: customValidator,
        //   trigger: 'blur',
        //   customRule: ['mustDouble'],
        //   fieldDesc: '层数'
        // }
        // ],
        // lpHeigth: [ {
        //   validator: customValidator,
        //   trigger: 'blur',
        //   customRule: ['mustDouble'],
        //   fieldDesc: '厚度(mm)'
        // }
        // ],
        // lbDtCm: [ {
        //   validator: customValidator,
        //   trigger: 'blur',
        //   customRule: ['mustDouble'],
        //   fieldDesc: '钉条(cm)'
        // }
        // ],
        // lbDtInch: [ {
        //   validator: customValidator,
        //   trigger: 'blur',
        //   customRule: ['mustDouble'],
        //   fieldDesc: '钉条(inch)'
        // }
        // ],
        // lbWidthLose: [ {
        //   validator: customValidator,
        //   trigger: 'blur',
        //   customRule: ['mustDouble'],
        //   fieldDesc: '纸度废边mm'
        // }
        // ],
        // lbLengLose: [ {
        //   validator: customValidator,
        //   trigger: 'blur',
        //   customRule: ['mustDouble'],
        //   fieldDesc: '纸长废边mm'
        // }
        // ],
        // lbYxAdd: [ {
        //   validator: customValidator,
        //   trigger: 'blur',
        //   customRule: ['mustDouble'],
        //   fieldDesc: '压线加分mm'
        // }
        // ],
        // lpAreaRate: [ {
        //   validator: customValidator,
        //   trigger: 'blur',
        //   customRule: ['mustDouble'],
        //   fieldDesc: '折面积系数'
        // }
        // ],
        // lbPMaxWidth: [ {
        //   validator: customValidator,
        //   trigger: 'blur',
        //   customRule: ['mustDouble'],
        //   fieldDesc: '折面积系数'
        // }
        // ],
        // lbPMaxCut: [ {
        //   validator: customValidator,
        //   trigger: 'blur',
        //   customRule: ['mustDouble'],
        //   fieldDesc: '折面积系数'
        // }
        // ],
        // lbPMinEdge: [ {
        //   validator: customValidator,
        //   trigger: 'blur',
        //   customRule: ['mustDouble'],
        //   fieldDesc: '折面积系数'
        // }
        // ]
      }
    }
  },
  methods: {
     // 继承中修改 关闭窗口时 触发事件
    closeActionTigger () {
      // fix 清除上次的错误提示 formDataInfo 为表单ref名称
      let resetForm = this.$refs[this.formDataInfoName]
      // 如果子表继承中,名称不一致 可以直接修改名称 his.formDataInfoName ='当前表单名称'
      if (resetForm) {
        resetForm.resetFields()
      }
       this.formDataInfo = Object.assign({}, default_formDataInfo)
    },
    // 重写父类,添加时候,清空数据
    HandleFormDataInfo () {
      this.formDataInfo = Object.assign({}, default_formDataInfo)
    }
  }
}
</script>

<style>
/* .cl-edit-leng .ivu-form-item {
  margin-bottom: 0px !important;
} */
</style>
