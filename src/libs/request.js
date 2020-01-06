import axios from './api.request'
export default {
  get: (url, data, params) => {
    ViewUI.LoadingBar.start()
    return new Promise((resolve, reject) => {
      axios.request({
        url: url,
        method: 'get',
        params: params || {},
        data: data || {}
      }).then(res => {
        if (res.data.success) { // 返回数据成功
          resolve(res.data.result)
          ViewUI.LoadingBar.finish()
        } else {
          let msg = res.data.message == null || res.data.message == '' ? '请求业务异常，请联系系统管理员' : res.data.message
          ViewUI.Message.error(msg)
          ViewUI.LoadingBar.error()
          reject(msg)
        }
      }).catch(err => {
        if (err) {
          reject(err)
          ViewUI.Message.error(err.message)
          ViewUI.LoadingBar.error()
        }
      })
    })
  },
  post: (url, data, params) => {
    ViewUI.LoadingBar.start()
    return new Promise((resolve, reject) => {
      axios.request({
        url: url,
        method: 'post',
        params: params || {},
        data: data || {}
      }).then(res => {
        if (res.data.success) { // 返回数据成功
          resolve(res.data.result)
          ViewUI.LoadingBar.finish()
        } else {
          let msg = res.data.message == null || res.data.message == '' ? '请求业务异常，请联系系统管理员' : res.data.message
          ViewUI.Message.error(msg)
          ViewUI.LoadingBar.error()
          reject(msg)
        }
      }).catch(err => {
        if (err) {
          reject(err)
          ViewUI.Message.error(err.message)
          ViewUI.LoadingBar.error()
        }
      })
    })
  }
}
