<template>
  <!--角色功能，上下布局-->
  <div>
    <div class="toolbar-container">
      <Card :bordered="false">
        <Row>
          <Col span="12">
          <Row :gutter="10" type="flex" justify="start">
            <Col span="2">
            <Button type="customer" size="small" @click="showEditWindow = true" :disabled="buttonDisabled">添加</Button>
            </Col>
            <Col span="2">
            <Button type="customer" size="small" @click="editButtonAction" :disabled="buttonDisabled">编辑</Button>
            </Col>
            <Col span="2">
            <Button type="customer" size="small" @click="deleteButtonAction('/sys/role/delete',formSubmitSuccess)"
              :disabled="buttonDisabled">删除</Button>
            </Col>
            <Col span="3">
            <Button type="customer" size="small" @click="roleUserAction">用户管理</Button>
            </Col>

            <Col span="3">
            <Button type="customer" size="small" @click="roleResourceAction">保存权限</Button>
            </Col>

            <!-- <Col span="1">
              <Button type="info" size="small">审核</Button>
              </Col>
              <Col span="1">
              <Button type="success" size="small">反审</Button>
              </Col> -->
          </Row>
          </Col>
        </Row>
      </Card>

    </div>
    <div class="content-container">
      <Row>
        <Col span="15">
        <vTable :height="200" ref="master_role_table" :columns="roleColumns" url="/sys/role/list" :pagination="false"
          :upDownMove="true" @row-click="masterRowClickEvent">
        </vTable>
        </Col>
        <Col span="9">
        <!--角色对应的用户列表-->
        <vTable :height="200" ref="master_role_user"
         :columns="roleUserColumns"
        :table-data="roleUserList"
        :pagination="false"
        :upDownMove="false"
        >
        </vTable>
        </Col>
      </Row>
      <roleResource ref="roleResource"></roleResource>
    </div>
    <roleEdit v-model="showEditWindow" :form-detail-data="detailData" @submit-success="formSubmitSuccess()"></roleEdit>
    <roleUser v-model="roleUser.show" :role-id="roleUser.roleId" :role-name="roleUser.roleName" @on-change="roleUserChange"></roleUser>
  </div>
</template>

<script>
  import vTable from '@/components/tables/vTable'
  import Button from '@/components/cl-erp/button/button'
  import roleEdit from './roleEdit'
  import roleUser from './roleUser'
  import roleResource from './roleResource'
  import form from '@/mixins/form'
  import request from '@/libs/request'

  export default {
    mixins: [form],
    components: {
      vTable,
      roleEdit,
      Button,
      roleUser,
      roleResource
    },
    data() {
      return {
        roleUser: {
          show: false,
          roleId: '',
          roleName: ''
        },
        roleColumns: [{
          title: '状态',
          key: 'status',
          align: 'center',
          width: 40,
          render: (h, params) => {
            return params.row.status == 1 ? h('span', '启用') : h('span', {
              style: {
                color: 'red'
              }
            }, '禁用');
          }
        }, {
          title: '角色名称',
          key: 'ruleName',
          align: 'center',
          width: 100
        }, {
          title: '角色说明',
          key: 'ruleExplain',
          align: 'center',
          width: 150
        }, {
          title: '是否公有',
          key: 'iisPublic',
          align: 'center',
          width: 80,
          render: (h, params) => {
            return params.row.iisPublic == 1 ? h('span', '是') : h('span', '否');
          },
         },{
          title: '创建用户',
          key: 'createUser',
          align: 'center',
          width: 80
        },{
          title: '更新用户',
          key: 'updateUser',
          align: 'center',
          width: 80
        },{
          title: '创建时间',
          key: 'createTime',
          align: 'center',
          width: 150
        },{
          title: '更新时间',
          key: 'updateTime',
          align: 'center',
          width: 150
        }],
        detailData: {},
        roleUserColumns:[//role对应的用户
          {
            title: '用户编号',
            key: 'userCode',
            align: 'center',
            width: 150
          },{
            title: '用户名称',
            key: 'userName',
            align: 'center',
            width: 150
          },{
            title: '部门',
            key: 'deptId',
            align: 'center',
            width: 150
          }
        ],
        roleUserList:[]
      }
    },
    computed: {
      buttonDisabled() {
        //console.log(this.masterRowSelection);
        // console.log(this.masterRowSelection.iisPublic && this.masterRowSelection.iisPublic == 1);
        //return this.masterRowSelection.iisPublic;
        return false;
      }
    },
    methods: {
      masterRowClickEvent(rowData, rowIndex){
        //每次行点击的信息存储起来
        this.masterRowSelection = rowData;
        //加载用户
        this.getRoleUser();
        //加载角色对应的权限
        this.$refs.roleResource.getRoleResourceList(rowData.id);
      },
      getRoleUser(){
        request.get('/sys/user/hasRole',{},{roleId:this.masterRowSelection.id}).then(res=>{
          this.roleUserList = res;
        });
      },
      detailAction() {
        let url = '/sys/role/detail';
        let _self = this;
        let data = {
          id: this.getMasterSelectionId()
        };
        request.get(url, data, data).then(res => {
          _self.detailData = res;
        });
      },
      formSubmitSuccess() {
        this.$refs.master_role_table.search();
        this.showEditWindow = false;
      },
      roleUserChange(){
        this.getRoleUser();
      },
      roleUserAction() {
        let id = this.getMasterSelectionId();
        if (!id) {
          return;
        }
        this.roleUser.show = true;
        this.roleUser.roleId = id;
        this.roleUser.roleName = this.masterRowSelection.ruleName;
      },roleResourceAction(){
        //保存角色权限
        let id = this.getMasterSelectionId();
        if (!id) {
          return;
        }
        let resource = this.$refs.roleResource.roleResourceList;
        request.post('/sys/role/saveResource',resource,{roleId:id}).then(res=>{
          this.$Message.success('权限保存成功');
        });
      }
    }
  }
</script>

<style>
  .demo-split {
    height: 200px;
    border: 1px solid #dcdee2;
  }

  .demo-split-pane {
    padding: 10px;
  }
</style>
