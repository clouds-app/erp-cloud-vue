<template>
  <div :style="style" style="display: block;" v-show="show"
    @mousedown.stop
    @contextmenu.prevent
  >
    <slot></slot>
  </div>
</template>

<script>
// 基本 使用 例子 
//import ContextMenu from "@/components/VueContextMenu";
//  <context-menu class="right-menu" 
//     :target="contextMenuTarget" 
//     :show="contextMenuVisible" 
//     @update:show="(show) => contextMenuVisible = show">
//     <a href="javascript:;" @click="copyMsg">复制</a>
//     <a href="javascript:;" @click="quoteMsg">引用</a>
//     <a href="javascript:;" @click="deleteMsg">删除</a>
// </context-menu>
export default {
  name: 'context-menu',
  data () {
    return {
      triggerShowFn: () => {},
      triggerHideFn: () => {},
      x: null,
      y: null,
      style: {},
      binded: false
    }
  },
  props: {
    //触发右键事件的元素 类型	Element
    // 如果target是某个兄弟元素，可以使用 $refs来访问，但是注意请在父组件mounted 之后获取
    target: null, 
    // 是否显示右键菜单	Boolean	-	false 
    show: Boolean,
     // 是否已经点击完成菜单	Boolean	-	false
    hasClick: Boolean
  },
  mounted () {
    this.bindEvents()
  },
  watch: {
    //update:show	右键菜单显示/隐藏时触发	是否显示
    show (show) {
      if (show) {
        this.bindHideEvents()
      } else {
        this.unbindHideEvents()
      }
    },
    target (target) {
      this.bindEvents()
    },
    hasClick (hasClick) {
       this.$emit('update:show', false)
    }
  },
  methods: {
    // 初始化事件
    bindEvents () {
      this.$nextTick(() => {
        if (!this.target || this.binded) return 
        this.triggerShowFn = this.contextMenuHandler.bind(this)
        this.target.addEventListener('contextmenu', this.triggerShowFn)
        this.binded = true
      })
    },
    // 取消绑定事件
    unbindEvents () {
      if (!this.target) return
      this.target.removeEventListener('contextmenu', this.triggerShowFn)
    },
    // 绑定隐藏菜单事件
    bindHideEvents () {
      this.triggerHideFn = this.clickDocumentHandler.bind(this)
      document.addEventListener('mousedown', this.triggerHideFn)
      document.addEventListener('mousewheel', this.triggerHideFn)
    },
    // 取消绑定隐藏菜单事件
    unbindHideEvents () {
      document.removeEventListener('mousedown', this.triggerHideFn)
      document.removeEventListener('mousewheel', this.triggerHideFn)
    },
    // 鼠标按压事件处理器
    clickDocumentHandler (e) {
      this.$emit('update:show', false)
    },
    // 右键事件事件处理
    contextMenuHandler (e) {
      this.x = e.clientX
      this.y = e.clientY
      this.layout()
      this.$emit('update:show', true)
      e.preventDefault()
    },
    // 布局
    layout () {
      this.style = {
        left: this.x + 'px',
        top: this.y + 'px'
      }
    }
  }
}
</script>
<style>
  .right-menu {
  position: fixed;
  background: #fff;
  border: solid 1px rgba(0, 0, 0, .2);
  border-radius: 3px;
  z-index: 999;
  display: none;
}
.right-menu a {
  width: 75px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  display: block;
  color: #1a1a1a;
}
.right-menu a:hover {
  background: #eee;
  color: #fff;
}

.right-menu {
    border: 1px solid #eee;
    box-shadow: 0 0.5em 1em 0 rgba(0,0,0,.1);
    border-radius: 1px;
}
a {
    text-decoration: none;
}
.right-menu a {
    padding: 2px;
}
.right-menu a:hover {
    background: #46a0fc;
}
</style>