<template>
  <editWindow v-model="showWindow" :fullscreen="true"  @on-ok="formDataSubmit()" @on-cancel="windowOnCancel">
      <div class="cl-popup-config">
        <div class="cl-Form">
          <Form :label-colon="true" :label-width="120" :model="formModel"  ref="editFormItem" >
            <!-- 第一行 -->
            <Row>
              <Col span="6">
                <FormItem label="弹出框名称" prop="master.popupName" :rules="{required: true, message: '弹出框名称不能为空', trigger: 'blur' }">
                  <Input placeholder="请输入弹出框名称" size="small" v-model="formModel.master.popupName"></Input>
                </FormItem>
              </Col>

              <Col span="6">
                <FormItem label="弹出框别名" prop="master.popupDesc" :rules="{required: true, message: '弹出框别名不能为空', trigger: 'blur' }">
                  <Input placeholder="请输入弹出框别名" size="small" v-model="formModel.master.popupDesc"></Input>
                </FormItem>
              </Col>

              <Col span="6">
                <Row>
                  <Col span="12">
                    <FormItem label="宽度">
                      <InputNumber placeholder="请输入尺寸宽" size="small" v-model="formModel.master.popupWidth"></InputNumber>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem label="高度">
                      <InputNumber placeholder="请输入尺寸高" size="small" v-model="formModel.master.popupHeight"></InputNumber>
                    </FormItem>
                  </Col>
                </Row>

              </Col>


              <Col span="6">
                <Row>
                  <Col span="8">
                    <FormItem label="分页">
                      <Checkbox size="small" v-model="formModel.master.popupIsPage"></Checkbox>
                    </FormItem>
                  </Col>
                  <Col span="16">
                    <FormItem label="页大小">
                      <InputNumber placeholder="请输入页大小" v-model="formModel.master.popupPageSize" size="small" :min="10"></InputNumber>
                    </FormItem>
                  </Col>
                </Row>
              </Col>

          <Col span="6">
                <Row>
                  <Col span="8">
                    <FormItem label="多选">
                      <Checkbox size="small" v-model="formModel.master.pupupIsMul"></Checkbox>
                    </FormItem>
                  </Col>
                  <Col span="16">
                    <FormItem label="排序">
                       <Checkbox size="small" v-model="formModel.master.popupIsOrder"></Checkbox>
                    </FormItem>
                  </Col>
                </Row>
              </Col>

              <Col span="6">
                <FormItem label="排序字段">
                   <Input size="small" v-model="formModel.master.popupOrderField"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="6">
                <FormItem label="查询类型">
                  <Select size="small" v-model="formModel.master.pupupLoadType" placeholder="请选择查询类型">
                    <Option :value="0">表</Option>
                    <Option :value="1">SQL</Option>
                  </Select>
                </FormItem>
              </Col>

              <Col span="6">
                <FormItem label="表名" v-if="formModel.master.pupupLoadType == 0" prop="master.popupQuery" :rules="{required: true, message: '表名不能为空', trigger: 'blur' }">
                   <Input size="small" v-model="formModel.master.popupQuery"></Input>
                </FormItem>
              </Col>

              <Col span="18">
                <FormItem label="SQL"  v-if="formModel.master.pupupLoadType == 1" prop="master.popupQuery" :rules="{required: true, message: 'SQL不能为空', trigger: 'blur' }">
                   <Input type="textarea" size="small" v-model="formModel.master.popupQuery"></Input>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </div>
        <div class="cl-table" v-if="popupInitData.columns">
             <Tabs>

                <TabPane label="弹窗列配置" name="name2">
                    <eTable ref="sysPopupFieldFM"
                    unqiue-mark="id"
                    :height="getTableHeight"
                    :index-menu="true"
                    :col-start="0"
                    :width="200"
                    :row-init-data="popupInitData.initData.sysPopupFieldFM"
                    :data.sync = "formModel.popupFields"
                    :rules="tableFieldValidator"
                    >
                      <template slot="head">
                        <tr v-for="(columnGroup,index) in popupInitData.columns.sysPopupFieldFM.editGroups" :key="index">
                          <th class="ivu-table-column-center" v-for="(item,index2) in columnGroup" :key="index2" :width="item.width">
                            <div class="ivu-table-cell">
                              <span class="">{{item.title}}</span>
                            </div>
                          </th>
                        </tr>
                      </template>

                      <template slot="body" slot-scope="{row,index,valueChangeAssign}">
                        <td class="ivu-table-column-center" v-for="(item,itemIndex) in popupInitData.columns.sysPopupFieldFM.editColumns" :key="itemIndex" :width="item.width">
                          <tableSelect  v-if="item.key == 'filedQueryCondition'" size="small" v-model="row.filedQueryCondition" @change="value=>{valueChangeAssign(value,index,row,'filedQueryCondition');}">
                            <option value="eq">=</option>
                             <option value="lt">&lt;</option>
                             <option value="le">&le;</option>
                             <option value="gt">&gt;</option>
                             <option value="ge">&ge;</option>
                             <option value="in">in</option>
                             <option value="lLike">lLike</option>
                             <option value="rLike">rLike</option>
                             <option value="like">like</option>
                             <option value="ne">!=</option>
                           </tableSelect>
                           <formControl v-else :control-type="item.controlType" v-model="row[item.key]" @input="value=>{valueChangeAssign(value,index,row,item.key);}"></formControl>
                        </td>
                      </template>
                    </eTable>
                </TabPane>
              </Tabs>
        </div>
      </div>
      <Spin size="large" fix v-if="loadding"></Spin>
  </editWindow>
</template>

<script>
import editWindow from "@/components/edit-window/edit-window";
import Form from "@/components/form/form";
 import eTable from '@/components/e-table/e-table'
 import formControl from '@/components/form-control/form-control'
import request from "@/libs/request";
  import tableSelect from '@/components/table-select/table-select'
export default {
  name: "popUpConfig",
  components: {
    editWindow,
    Form,
    eTable,
    formControl,
    tableSelect
  },data(){
    return{
      showWindow:false,
      loadding:false,
      formModel:{
        master:{
          	popupName:'',
          	popupDesc:'',
          	popupWidth:800,
          	popupHeight:700,
          	popupIsPage:true,
          	popupPageSize:50,
          	pupupIsMul:false,
          	pupupLoadType:0,
          	popupQuery:'',
          	popupIsOrder:false,
          	popupOrderField:''
        },
        popupFields:[]
      },popupInitData:{
            initData:{},
            page:{
              sysPopupFieldFM:{
                columns:{
                  edit:[[]],
                  detail:[]
                  }
              }
          }
      },tableFieldValidator:{
        fieldName:[
          {required: true, message: '字段名称不能为空', trigger: 'blur'},
          {required:true,type:'string',pattern:/^[a-zA-Z]{1}[a-zA-Z0-9_]*$/,message:'字段名称只能包含字母数字和_且以字母开头',trigger: 'blur'},
        ],
        fieldDesc:[
           {required: true, message: '字段说明不能为空', trigger: 'blur'}
        ]
      }
     }
  },props:{
    value:{
      type:Boolean,
      default:()=>{
        return false;
      }
    },
    action:String,
    initData:Object
  },watch:{
    value(n,o){
      this.showWindow = n;
    },showWindow(n,o){
      this.$emit('input',n);
    },
    initData:{
      deep:true,
      handler(n,o){
        this.popupInitData = n;
      }
    }
  },computed:{
    getTableHeight(){
      return window.innerHeight - 263;
    }
  },methods:{
    formDataSubmit(){
      //提交表单数据
      this.$refs.editFormItem.validate(valid=>{
        if(!valid){//主表校验
          return;
        }
        //子表校验
        let subValidate = this.$refs['sysPopupFieldFM'].validate();
        //数据组装
        let data = {
            master:this.formModel.master
        };
        //提示一下,存在子表中有校验，但未通过
        if(subValidate){
          return;
        }else{
          //校验通过
          //子表数据组装
          data['popupFields'] = this.$refs['sysPopupFieldFM'].getCategorizeData();
          let url = '/sys/popup/saveOrUpdate';
          request.post(url,data).then(res=>{
            this.$Message.success('操作成功');
            this.$emit('submit-success');
            this.showWindow = false;
          });
        }
      });
    },getDetailData(id){
      //加载详情数据
      this.loadding = true;
      let url = `/sys/popup/detail/${id}`;
      let _self = this;
      request.get(url).then(res => {
       _self.loadding = false;
        _self.formModel = res;
        console.log(res);
        _self.formModel.popupFields = res.popupFields.defaultList;
      }).catch(()=>{
        this.$Message.error('详情数据加载失败...');
        _self.loadding = false;
      });
    },windowOnCancel(){
      //当窗口关闭的时候，直接把数据清除
      this.formModel.master = this.popupInitData.initData.master;
      this.$refs.sysPopupFieldFM.reset();
    }
  }
};
</script>

<style>
.cl-other-checkBox {
  margin-left: 20px;
  margin-top: 5px;
}
.cl-popup-config .ivu-form-item {
  margin-bottom: 1px !important;
}
</style>
