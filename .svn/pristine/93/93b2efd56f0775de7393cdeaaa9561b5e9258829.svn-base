/**
 * 页面公共代码
 *
 */
import request from '@/libs/request'

export default{
  data(){
    return {
      showEditWindow:false,//编辑窗体是否显示
      currentClickSubTabName:'',//当前被点击的子表tab
      defaultSubTabName:'',//默认的子表tab名称
      masterRowSelection:{}, //保存主表被选中的行信息
      slaveRowselections:{}, //保存子表被选中的行信息
      topDownSplit:0.5,//分割面板上下的比例
      editFormItem:{   //保存表单的数据
        master:{},
        slave:{}
      },
      initData:{}//页面初始化信息
    }
  },
  methods:{
    //主表行点击响应事件
    masterRowClickEvent(rowData, rowIndex){
      //每次行点击的信息存储起来
      this.masterRowSelection = rowData;
      //this.$set(this.masterRowSelection,rowData);
      //加载子表的数据...
    },
    //获取主表被选中行的ID,如果没有选中返回false且弹窗提示
    getMasterSelectionId(){
      if (Object.keys(this.masterRowSelection).length == 0 || !this.masterRowSelection.id) {
        this.$Message.warning('请选择需要操作的数据');
        return false;
      }
      return this.masterRowSelection.id;
    },
    //编辑按钮点击行为
    editButtonAction(){
      let id = this.getMasterSelectionId();
      if(!id){
        return;
      }
      //加载详情，窗体显示
       if(this.detailAction){
         this.detailAction();
       }
       this.showEditWindow = true;
    },
    //删除按钮点击
    deleteButtonAction(url,callback){
      let id = this.getMasterSelectionId();
      if(!id){
        return;
      }
      this.$Modal.confirm({
        title: '删除确认',
        content: '确定要删除当前选中数据吗？',
        onOk: () => {
          let _self = this;
          let data = {id:id};
          request.post(url,data).then(res => {
           if(callback){
             callback(res);
           }
          });
        }
      });
    }
    //加载详情
    /* detailAction(){

    } */
  }
}
