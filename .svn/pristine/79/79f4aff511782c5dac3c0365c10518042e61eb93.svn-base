<template>
<!--给角色设置用户-->
  <div>
    <editWindow v-model="show" :fullscreen="false" width="500" :title="'【'+roleName+'】用户'" @on-ok="saveRoleUser">
       <Transfer
              :data="userList"
              :target-keys="hasRoleUserItems"
              :render-format="roleUserRender"
              @on-change="onChange"
              :titles="titles"
              :operations="operations"
              >
       </Transfer>
       <Spin size="large" fix v-if="loadding"></Spin>
    </editWindow>
  </div>
</template>

<script>
  import editWindow from '@/components/edit-window/edit-window'
  import request from '@/libs/request'

  export default{
    components:{editWindow},
    data(){
      return {
        loadding:true,
        show:false,
        userList:[],//无该角色用户
        hasRoleUserItems:[],//有该角色用户
        role_id : '-1',
        titles:['未有角色用户','已有角色用户'],
        operations:['取消','添加'],
        roleUserItems:{}
      }
    },
    props:{
      value:{
        type:Boolean,
        default:false
      },roleId:{
        type:String,
        default:"-1"
      },roleName:String
    },watch:{
      roleId(n,o){
        this.role_id = n;
        this.hasRoleUserItems = [];
        this.getNotRoleUser();
        this.getHasRoleUser();
      },value(n,o){
        this.show = n;
      },show(n,o){
        this.$emit('input', n);
      }
    },methods:{
      getNotRoleUser(){
        request.get('/sys/user/list').then(res=>{
          res.forEach(item=>{
            item['key'] = item.id;
            item['userId'] = item.id;
            this.roleUserItems[item.id] = item;
          });
          this.userList = res;
        }).finally(()=>{
           this.loadding = false;
        });
      },getHasRoleUser(){
        request.get('/sys/user/hasRole',{},{roleId:this.role_id}).then(res=>{
          res.forEach(item=>{
            this.hasRoleUserItems.push(item.id);
            item['key'] = item.id;
            item['userId'] = item.id;
            this.roleUserItems[item.id] = item;
          });
        });
      },roleUserRender(item){
        return item.userCode+'#'+item.userName;
      },onChange(newTargetKeys, direction, moveKeys){
           this.hasRoleUserItems = newTargetKeys;
      },saveRoleUser(){
           let userItems = [];
           if(this.hasRoleUserItems.length > 0){
             this.hasRoleUserItems.forEach((item)=>{
               userItems.push(this.roleUserItems[item]);
             })
           }
           let  data = {
             roleId : this.roleId,
             userRoleList:userItems
           };
           request.post('/sys/role/saveUser',data).then(res=>{
             this.$Message.success('修改成功');
             this.show = false;
             this.$emit('on-change');
           });
      }
    }
  }


</script>

<style>
</style>
