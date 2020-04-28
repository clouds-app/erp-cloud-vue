import axios from './api.request'
export default {
  fsLoading: true, // fullscreen loading
  get: function (url, data, params) {
    let _self = this
    return new Promise((resolve, reject) => {
      _self.openLoading()
      axios.request({
        url: url,
        method: 'get',
        params: params || {},
        data: data || {}
      }).then(res => {
        _self.requestSuccessHandler(res, resolve, reject)
      }).catch(err => {
        _self.requestErrorHandler(err, resolve, reject)
      })
    })
  },
  post: function (url, data, params) {
    let _self = this
    return new Promise((resolve, reject) => {
      _self.openLoading()
      axios.request({
        url: url,
        method: 'post',
        params: params || {},
        data: data || {}
      }).then(res => {
        _self.requestSuccessHandler(res, resolve, reject)
      }).catch(err => {
        _self.requestErrorHandler(err, resolve, reject)
      })
    })
  },
  requestSuccessHandler (res, resolve, reject) {
    if (!res) {
      this.closeLoading()
      return
    }
    if (res.data.success) { // 返回数据成功
      resolve(res.data.result)
      this.closeLoading()
    } else {
      let msg = res.data.message == null || res.data.message == '' ? '请求业务异常，请联系系统管理员' : res.data.message
      ViewUI.Message.error(msg)
      this.closeLoading(msg)
      reject(msg)
    }
  },
  requestErrorHandler (err, resolve, reject) {
    if (err) {
      reject(err)
      // 重复出现错误提示 注释 edit by andy
      if (Object.prototype.toString.call(err) === '[object String]') {
        // ViewUI.Message.error(err);
      } else {
        // ViewUI.Message.error(err.message);
      }
      this.closeLoading(err)
    }
  },
  fullLoading () {
    // 全屏加载
    ViewUI.Spin.show({
      render: (h) => {
        return h('div', {
          style: {
            'background-color': 'rgba(0, 0, 0, 0.5)',
            'padding': '0.5rem',
            'border-radius': '0.3rem',
            'color': '#ffffff'
          }
        }, [
          h('Icon', {
            style: {
              'animation': 'ani-demo-spin 1s linear infinite'
            },
            props: {
              type: 'ios-loading',
              size: 24
            }
          }),
          h('div', '数据加载中,请稍等...')
        ])
      }
    })
  },
  openLoading () {
    if (this.fsLoading) {
      this.fullLoading()
    } else {
      ViewUI.LoadingBar.start()
      // setTimeout(this.closeLoading(),110000)
    }
  },
  closeLoading (err) {
    if (this.fsLoading) {
      ViewUI.Spin.hide()
      // this.fsLoading = false;
    } else {
      if (err) {
        ViewUI.LoadingBar.error()
      } else {
        ViewUI.LoadingBar.finish()
      }
    }
  }

}
