const install = (Vue) => {
	const Bus = new Vue({
		methods: {
			on(event, ...args) {
				this.$on(event, ...args);
			},
			emit(event, callback) {
				this.$emit(event, callback);
			},
			off(event, callback) {
				this.$off(event, callback);
			}
		}
	})
	Vue.prototype.$bus = Bus;
}
export default install;

// vue bus的使用
// vue中的bus事件，一般作为中央事件总线来使用

// 简单例子：比如在A,B组件为兄弟组件，现在A要调用B的中C事件

// 1.创建一个bus.js

// 内容：

// import Vue from 'vue'

// const Bus = new Vue()

// export { Bus }

// 2.在A,B组件中引入bus.js

// import { Bus } from 'bus'

// 3.在A组件中定义要调用B事件的bus事件名

// 例如：Bus.$emit('callC')

// 4.在B组件中调用C方法

// Bus.$on('callC',this.C)

// Bus.$on里有两个参数，第一个是在A组件定义的名字，第二个参数是B组件要调用的方法