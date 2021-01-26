// broadcast 是一个事件，它向下传播到当前实例的所有后代。
//由于后代扩展为多个子树，事件传播将会遵循许多不同的“路径”。
//除非回调返回 true，否则在沿该路径触发侦听器回调时，每个路径的传播将会停止。
// 参数
// broadcast 会接收两中参数：event 是事件名称，[...args] 是触发事件时传递给回调函数的参数。

function broadcast(componentName, eventName, params) {
    this.$children.forEach(child => {
      var name = child.$options.componentName;
  
      if (name === componentName) {
        child.$emit.apply(child, [eventName].concat(params));
      } else {
        broadcast.apply(child, [componentName, eventName].concat([params]));
      }
    });
  }
  
  // dispatch 是一个事件，首先会在自己实例本身上触发，然后沿父链向上传播。当它触发父组件上的事件侦听器时传播即会停止，除非该侦听器返回 true。 任何其他参数都将传递给侦听器的回调函数。
  
  // 参数：
  
  // dispatch 会接收两中参数：event 是事件名称，[...args] 是触发事件时传递给回调函数的参数。
  export default {
    methods: {
      dispatch(componentName, eventName, params) {
        var parent = this.$parent || this.$root;
        var name = parent.$options.componentName;
  
        while (parent && (!name || name !== componentName)) {
          parent = parent.$parent;
  
          if (parent) {
            name = parent.$options.componentName;
          }
        }
        if (parent) {
          parent.$emit.apply(parent, [eventName].concat(params));
        }
      },
      broadcast(componentName, eventName, params) {
        broadcast.call(this, componentName, eventName, params);
      }
    }
  };
  