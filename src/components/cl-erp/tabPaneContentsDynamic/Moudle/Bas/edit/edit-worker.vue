<template>
  <div>
    <editWindow
      class="cl-edit-worker"
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
        :label-width="100"
      >
        <Row :gutter="16">
          <Col span="18">
            <div>
              <Row :gutter="16">
                <!-- 第一列 -->
                <Col span="8">
                  <FormItem label="编号" prop="workCode">
                    <Input
                      v-model="formDataInfo.workCode"
                      maxlength="20"
                      placeholder="请输入编号"
                    />
                  </FormItem>
                  <FormItem label="部门" prop="deptId">
                    <div>
                        <Select
                      v-model="formDataInfo.deptId"
                      placeholder="请选择职位部门"
                    >
                      <Option value="0">
                        部门1
                        </Option>
                      <Option value="2"> 
                        部门2
                        </Option>
                      <Option value="1">
                        部门3
                        </Option>
                    </Select>
                    </div>
                 
                  </FormItem>
                  <FormItem label="民族">
                    <Input
                      v-model="formDataInfo.nation"
                      maxlength="100"
                      placeholder="请输入民族"
                    />
                  </FormItem>
                  <FormItem label="文化程度">
                    <Select
                      v-model="formDataInfo.degreeSchool"
                      placeholder="请选择文化程度"
                    >
                      <Option value="0">高中</Option>
                      <Option value="2">大学</Option>
                      <Option value="1">中学</Option>
                    </Select>
                  </FormItem>
                  <FormItem label="健康状况">
                    <!-- <Input
                      v-model="formDataInfo.poName"
                      maxlength="80"
                      placeholder="请输入健康状况"
                    /> -->
                  </FormItem>
                  <FormItem label="个人特长">
                    <!-- <Input
                      v-model="formDataInfo.poName"
                      maxlength="80"
                      placeholder="请输入个人特长"
                    /> -->
                  </FormItem>
                  <FormItem label="入厂时间">
                     <DatePicker type="date" placeholder="选择入厂时间" v-model="formDataInfo.workInDate"></DatePicker>
                  </FormItem>
                  <FormItem label="基本底薪">
                    <Input
                      v-model="formDataInfo.salary"
                      maxlength="80"
                      placeholder="请输入基本底薪"
                    />
                  </FormItem>
                  <FormItem label="社保金额">
                    <Input
                      v-model="formDataInfo.insuranceAmt"
                      maxlength="80"
                      placeholder="请输入社保金额"
                    />
                  </FormItem>
                </Col>
                <!-- 第二列 -->
                <Col span="8">
                  <FormItem label="姓名" prop="workName">
                    <Input
                      v-model="formDataInfo.workName"
                      maxlength="20"
                      placeholder="请输入姓名"
                    />
                  </FormItem>
                  <FormItem label="职别" prop="workOptType">
                    <Select
                          v-model="formDataInfo.workOptType"
                          placeholder="请选择职别" >
                          <Option value="beijing">职别1</Option>
                          <Option value="shanghai">职别2</Option>
                          <Option value="shenzhen">职别3</Option>
                        </Select>
                  </FormItem>
                  <FormItem label="出生日期">
                       <DatePicker type="date" placeholder="选择出生日期" v-model="formDataInfo.borthDay"></DatePicker>
                  </FormItem>
                 <FormItem label="专业">
                    <Input
                      v-model="formDataInfo.major"
                      maxlength="80"
                      placeholder="请输入专业"
                    />
                  </FormItem>
                  <FormItem label="身高">
                    <Input
                      v-model="formDataInfo.height"
                      maxlength="80"
                      placeholder="请输入身高"
                    />
                  </FormItem>
                  <FormItem label="电话号码">
                    <!-- <Input
                      v-model="formDataInfo.mob"
                      maxlength="80"
                      placeholder="请输入电话号码"
                    /> -->
                  </FormItem>
                  <FormItem label="服务类型">
                    <!-- <Input
                      v-model="formDataInfo.poName"
                      maxlength="80"
                      placeholder="请输入服务类型"
                    /> -->
                  </FormItem>
                  <FormItem label="通讯补贴">
                    <!-- <Input
                      v-model="formDataInfo.poName"
                      maxlength="80"
                      placeholder="请输入通讯补贴"
                    /> -->
                  </FormItem>
                  <FormItem label="合同开始日期">
                    <!-- <DatePicker type="date" placeholder="选择合同开始日期" v-model="formDataInfo.date"></DatePicker> -->
                  </FormItem>
                </Col>
                <!-- 第三列 -->
                <Col span="8">
                  <FormItem label="性别" prop="poCode">
                   <Select
                      v-model="formDataInfo.sex"
                      placeholder="请选择性别"
                    >
                      <Option value="1">男</Option>
                      <Option value="0">女</Option>
                    </Select>
                  </FormItem>
                  <FormItem label="证件号码">
                    <Input
                      v-model="formDataInfo.idNumber"
                      maxlength="80"
                      placeholder="请输入证件号码"
                    />
                  </FormItem>
                  <FormItem label="籍贯">
                    <Input
                      v-model="formDataInfo.borthAdress"
                      maxlength="100"
                      placeholder="请输入籍贯"
                    />
                  </FormItem>
                  <FormItem label="政治面貌">
                     <Select
                          v-model="formDataInfo.political"
                          placeholder="请选择政治面貌" >
                          <Option value="0">群众</Option>
                          <Option value="1">党员</Option>
                        </Select>
                  </FormItem>
                  <FormItem label="视力">
                    <Input
                      v-model="formDataInfo.eys"
                      maxlength="80"
                      placeholder="请输入视力"
                    />
                  </FormItem>
                  <FormItem label="手机号码">
                    <Input
                      v-model="formDataInfo.mob"
                      maxlength="80"
                      placeholder="请输入手机号码"
                    />
                  </FormItem>
                  <FormItem label="是否在职">
                    <Select
                      v-model="formDataInfo.iisWork"
                      placeholder="请选择是否在职"
                    >
                      <Option value="1">是</Option>
                      <Option value="0">否</Option>
                    </Select>
                  </FormItem>
                  <FormItem label="保险金额">
                    <!-- <Input
                      v-model="formDataInfo.poName"
                      maxlength="80"
                      placeholder="请输入保险金额"
                    /> -->
                  </FormItem>
                  <FormItem label="合同结束日期">
                    <!-- <DatePicker type="date" placeholder="选择合同结束日期" v-model="formDataInfo.date"></DatePicker> -->
                  </FormItem>
                </Col>
              </Row>
              <!-- // 地址  -->
              <Row :gutter="16">
                <Col span="12">
                  <FormItem label="家庭住址">
                    <Input
                      v-model="formDataInfo.homeAddress"
                      type="textarea"
                      maxlength="100"
                      :autosize="{ minRows: 2, maxRows: 5 }"
                      placeholder="请输入家庭住址"
                    />
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="现住地址">
                    <Input
                      v-model="formDataInfo.nowAdress"
                      type="textarea"
                      maxlength="100"
                      :autosize="{ minRows: 2, maxRows: 5 }"
                      placeholder="请输入现住地址"
                    />
                  </FormItem>
                </Col>
              </Row>
              <!-- // 其它单选信息  -->
              <Row :gutter="16">
                <Col span="12">
                  <ul class="cl-other-checkBox">
                    <!-- <li>
                      <CheckboxGroup v-model="formDataInfo.iisInsurance">
                        <Checkbox label="社保"></Checkbox>
                      </CheckboxGroup>
                    </li>
                    <li>
                      <CheckboxGroup v-model="formDataInfo.iisMarried">
                        <Checkbox label="婚否"></Checkbox>
                      </CheckboxGroup>
                    </li> -->
                    <!-- <li>
                      <CheckboxGroup v-model="formDataInfo.interest">
                        <Checkbox label="保险"></Checkbox>
                      </CheckboxGroup>
                    </li> -->
                    <!-- <li>
                      <CheckboxGroup v-model="formDataInfo.interest">
                        <Checkbox label="是否记产"></Checkbox>
                      </CheckboxGroup>
                    </li> -->
                  </ul>
                </Col>
                <Col span="12">
                  <FormItem label="备注">
                    <Input
                      v-model="formDataInfo.poCode"
                      type="textarea"
                      maxlength="100"
                      :autosize="{ minRows: 2, maxRows: 5 }"
                      placeholder="请输入备注..."
                    />
                  </FormItem>
                </Col>
              </Row>
            </div>
          </Col>
          <!-- // 图片上传 -->
          <Col span="6">
            <div>图片上传</div>
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
export default {
  name: "edit-position",
  mixins: [editBaseMixins],

  data() {
    return {
      requestBaseUrl: "/bas/worker", // 请求 查询 操作的基础路径
      formDataInfo: {
      	// auditTime:'',
        // auditUser:'',
        borthAdress:'',
       // companyId: 0,
        // createTime:'',
        // createUser:'',
        degreeSchool:'',
        deptId: 0,
        deptName:'',
        eys: 0,
        height: 0,
        homeAddress:'',
       // id: 0,
        idNumber:'',
       // iisAudit: 0,
        iisInsurance: true,
        iisMarried: 0,
        iisWork: 0,
        insuranceAmt: 0,
        major:'',
        mob:'',
        nation:'',
        nowAdress:'',
        photo:'',
        political:'',
        remark:'',
        salary: 0,
        sex: 0,
        //status: 0,
        //teamId: 0,
       // teamName:'',
       // updateTime:'',
      //  updateUser:'',
        workCode:'',
        workInDate:'',
        workName:'',
        workOptType: ''
      },
      // 需要验证的数据
      ruleValidate: {
        workCode: [
          { required: true, message: "职位编号不能为空", trigger: "blur" }
        ],
        workName: [
          { required: true, message: "职位名称不能为空", trigger: "blur" }
        ]
      }
    };
  },

  methods: {}
};
</script>

<style>
.cl-edit-worker .ivu-form-item {
  margin-bottom: 5px !important;
}
.cl-other-checkBox {
  margin-left: 25px;
  margin-top: 10px;
  float: left;
}
.cl-edit-worker .ivu-select-item{
  display: block
}
</style>
