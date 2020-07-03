/**
 * @desc index 描述 所有.vue 公共方法 .vue 中 添加mixin:[name]
 *
 * 主要用于 系统模块 编辑数据 操作
 *
 * @author Andy Huang
 *
 * @created 2020/06/23 17:08:28
 */
import request from "@/libs/request";
export default {
  props: {
    // 是否显示
    value: {
      type: Boolean,
      default: false
    },
    // 表单详细 注意[点击"修改/编辑"的时候,functionBtnList.vue ,会查询详情 赋值 formDetailData]
    formDetailData: {
      default: () => {
        return {};
      }
    },
    // 当前操作 添加/更新
    action: {
      type: String,
      default: "add"
    }
  },
  data() {
    return {
      formDataInfo: {}, // 表单的内容 ,在基础类中重写
      showEditWindow: false,
      functionParams: {
        // 清酒基础路径
        requestBaseUrl: "",
        uniqueIdName: "",
        updateId: -1 // 当前数据是否可以更新
      },
      actionLableName: "增加", // 当前操作行为的标题
      actionSubtitle: "" // 副标题 当前操作页面 描述
    };
  },
  computed: {},
  watch: {
    // 回调
    action(n, o) {
      if (n === "add") {
        this.actionLableName = "增加"; // 当前操作行为的标题
      } else {
        this.actionLableName = "编辑"; // 当前操作行为的标题
      }
    },
    // 回调
    showEditWindow(n, o) {
      this.$emit("input", n);
      if (!!!n) {
        this.whenWindowClosingAction();
      }
    },
    // 是否实现当前窗体
    value(n, o) {
      this.showEditWindow = n;
    },
    formDetailData(n, o) {
      if (n && Object.keys(n).length > 0) {
        this.formDataInfo = n; // 表单 需要更新的数据,子类中需要添加实际所需字段
        this.functionParams.updateId = n.id;
      }
    }
  },
  created() {},

  mounted() {},
  methods: {
    // 提交数据
    formDataSubmit() {
      let _self = this;
      this.$refs["formDataInfo"].validate(valid => {
        if (valid) {
          if (_self.action === "add") {
            _self.insertData();
          } else {
            _self.updateData();
          }
        }
      });
    },
    // 继承中修改,提交数据前 验证数据 ,默认 false 没有错误
    validateBeforePost() {
      return false;
    },
    // 继承中修改,更新数据时,重置修改一些提交的数据
    resetformDataInfo(_data) {
      return _data;
    },
    // 增加 数据
    insertData() {
      if (this.validateBeforePost()) {
        return;
      }
      let url = `${this.functionParams.requestBaseUrl}/save`;
      let data = this.resetformDataInfo(this.formDataInfo);
      request.post(url, data).then(res => {
        this.infoTips();
      });
    },
    // 更新 数据
    updateData() {
      if (this.validateBeforePost()) {
        return;
      }
      let url = `${this.functionParams.requestBaseUrl}/update?id=${this.functionParams.updateId}`;
      let data = this.resetformDataInfo(this.formDataInfo);
      request.post(url, data).then(res => {
        this.infoTips();
      });
    },
     // 信息提示
     infoTips () {
        this.$Message.success('操作成功')
        this.showEditWindow = false // 更新时,关闭当前比较窗口
        this.$emit('submit-success')
      },
    // 窗体关闭执行动作,继承中重写
    whenWindowClosingAction() {}
  }
};
