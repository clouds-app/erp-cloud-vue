<template>
  <div>
    <editWindow
      :title="actionLableName"
      v-model="showWindow"
      :fullscreen="false"
      width="80%"
      :loading="!isLoaddingDone"
      @on-ok="formDataSubmit()"
    >
      <Form
        ref="formDataInfo"
        :show-message="false"
        :model="formDataInfo"
        :rules="ruleValidate"
        :label-width="120"
      >
       <Row :gutter="18" >
           <Col span="16">
                <Row :gutter="18">
                        <Col span="12">
                                
                                    <FormItem label="开料单双片" prop="boxCutMode">
                                    <Input
                                        v-model="formDataInfo.boxCutMode"
                                        
                                        maxlength="20"
                                        placeholder="请输入开料单双片"
                                    ></Input>
                                    </FormItem>

                                    <FormItem label="盒式公式Id" prop="boxId">
                                    <Input
                                        v-model="formDataInfo.boxId"
                                        type="number"
                                        maxlength="20"
                                        placeholder="请输入盒式公式Id"
                                    ></Input>
                                    </FormItem>

                                    <FormItem label="单双片条件" prop="boxIfExpr">
                                    <Input
                                        v-model="formDataInfo.boxIfExpr"
                                        maxlength="20"
                                        placeholder="单双片条件"
                                    >
                                    </Input>
                                    </FormItem>

                                    <FormItem label="单双片条件" prop="boxIfExprMsg">
                                    <Input
                                        v-model="formDataInfo.boxIfExprMsg"
                                        maxlength="20"
                                        placeholder="单双片条件"
                                    ></Input>
                                    </FormItem>
                                    <FormItem label="单双片值" prop="boxIfValue">
                                    <Input
                                        v-model="formDataInfo.boxIfValue"
                                        type="number"
                                        maxlength="20"
                                        placeholder="单双片值"
                                    ></Input>
                                    </FormItem>
                                    <FormItem label="单片纸长" prop="boxL1ExprMsg">
                                    <Input
                                        v-model="formDataInfo.boxL1ExprMsg"
                                        maxlength="20"
                                        placeholder="请输入单片纸长"
                                    ></Input>
                                    </FormItem>

                                    <FormItem label="双片纸长" prop="boxL2Expr">
                                    <Input
                                        v-model="formDataInfo.boxL2Expr"
                                        maxlength="20"
                                        placeholder="请输入双片纸长"
                                    ></Input>
                                    </FormItem>


                        </Col>
                        <Col span="12">

                                    <FormItem label="单片开槽" prop="boxKC1Expr">
                                    <Input
                                        v-model="formDataInfo.boxKC1Expr"
                                        maxlength="20"
                                        placeholder="请输入单片开槽"
                                    ></Input>
                                    </FormItem>

                                    <FormItem label="单片开槽" prop="boxKC1ExprMsg">
                                    <Input
                                        v-model="formDataInfo.boxKC1ExprMsg"
                                        maxlength="20"
                                        placeholder="请输入单片开槽"
                                    ></Input>
                                    </FormItem>

                                    <FormItem label="双片开槽" prop="boxKC2Expr">
                                    <Input
                                        v-model="formDataInfo.boxKC2Expr"
                                        maxlength="20"
                                        placeholder="请输入双片开槽"
                                    >
                                    </Input>
                                    </FormItem>

                                    <FormItem label="双片开槽" prop="boxKC2ExprMsg">
                                    <Input
                                        v-model="formDataInfo.boxKC2ExprMsg"
                                        maxlength="20"
                                        placeholder="请输入双片开槽"
                                    ></Input>
                                    </FormItem>
                                    <FormItem label="单片纸长" prop="boxL1Expr">
                                    <Input
                                        v-model="formDataInfo.boxL1Expr"
                                        maxlength="20"
                                        placeholder="请输入单片纸长"
                                    ></Input>
                                    </FormItem>
                                    <FormItem label="双片纸长" prop="boxL2ExprMsg">
                                    <Input
                                        v-model="formDataInfo.boxL2ExprMsg"
                                        maxlength="20"
                                        placeholder="请输入双片纸长"
                                    >
                                    </Input>
                                    </FormItem>

                                    <FormItem label="单片纸宽" prop="boxW1Expr">
                                    <Input
                                        v-model="formDataInfo.boxW1Expr"
                                        maxlength="20"
                                        placeholder="请输入单片纸宽"
                                    ></Input>
                                    </FormItem>
                        </Col>
                </Row>
                <Row :gutter=18>
                    <Col span="20">
                        <FormItem label="备注" prop="remark">
                            <Input
                                v-model="formDataInfo.remark"
                                type="textarea"
                                maxlength="100"
                                :autosize="{ minRows: 2, maxRows: 10 }"
                                placeholder="请输入备注..."
                            ></Input>
                        </FormItem>
                    </Col>
                </Row>
            </Col>

           <Col span="8">
                    <FormItem label="双片纸宽" prop="boxW2ExprMsg">
                    <Input
                        v-model="formDataInfo.boxW2ExprMsg"
                        maxlength="20"
                        placeholder="请输入双片纸宽"
                    ></Input>
                    </FormItem>

                    <FormItem label="双片纸宽" prop="box_W2Expr">
                    <Input
                        v-model="formDataInfo.box_W2Expr"
                        maxlength="20"
                        placeholder="请输入双片纸宽"
                    ></Input>
                    </FormItem>

                    <FormItem label="单片纸宽压线" prop="boxYS1ExprMsg">
                    <Input
                        v-model="formDataInfo.boxYS1ExprMsg"
                        maxlength="20"
                        placeholder="请输入单片纸宽压线"
                    >
                    </Input>
                    </FormItem>

                    <FormItem label="单片纸宽压线" prop="boxYS1_Expr">
                    <Input
                        v-model="formDataInfo.boxYS1_Expr"
                        maxlength="20"
                        placeholder="请输入单片纸宽压线"
                    ></Input>
                    </FormItem>
                    <FormItem label="双片压线" prop="boxYS2Expr">
                    <Input
                        v-model="formDataInfo.boxYS2Expr"
                        maxlength="20"
                        placeholder="请输入双片压线"
                    ></Input>
                    </FormItem>
                     <FormItem label="双片压线" prop="boxYS2ExprMsg">
                    <Input
                        v-model="formDataInfo.boxYS2ExprMsg"
                        maxlength="20"
                        placeholder="请输入双片压线 "
                    ></Input>
                    </FormItem>
                     <FormItem label="单片纸宽" prop="boxW1ExprMsg">
                    <Input
                        v-model="formDataInfo.boxW1ExprMsg"
                        maxlength="20"
                        placeholder="请输入单片纸宽"
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
import editBaseMixins from "../../mixins/edit";
const default_formDataInfo ={
        boxCutMode: 0,
        boxId: 0,
        boxIfExpr: "",
        boxIfExprMsg: "",
        boxIfValue: 0,
        boxKC1Expr: "",
        boxKC1ExprMsg: "",
        boxKC2Expr: "",
        boxKC2ExprMsg: "",
        boxL1Expr: "",
        boxL1ExprMsg: "",
        boxL2Expr: "",
        boxL2ExprMsg: "",
        boxW1Expr: "",
        boxW1ExprMsg: "",
        boxW2ExprMsg: "",
        boxYS1ExprMsg: "",
        boxYS1_Expr: "",
        boxYS2Expr: "",
        boxYS2ExprMsg: "",
        box_W2Expr: "",
        remark: ""
      }
export default {
  name: "edit-boxItem",
  mixins: [editBaseMixins],

  data() {
    return {
      requestBaseUrl: "/bas/boxItem", // 请求 查询 操作的基础路径
      formDataInfo:Object.assign({},default_formDataInfo),// 防止添加和更新数据提交发生冲突
      // 需要验证的数据
      ruleValidate: {
        boxCutMode: [
          { required: true, message: "", trigger: "blur" }
        ],
        boxId: [
            { required: true, message: "", trigger: "blur" }
        ]
      }
    };
  },

  methods: {
      // 重写父类,添加时候,清空数据
    HandleFormDataInfo(){
     this.formDataInfo=Object.assign({},default_formDataInfo)
    },
  }
};
</script>

<style></style>
