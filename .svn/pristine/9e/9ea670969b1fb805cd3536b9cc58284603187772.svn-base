import axios from './api.request'
export default {
  get: (url, data, params) => {
    ViewUI.LoadingBar.start();
    return new Promise((resolve, reject) => {
      axios.request({
        url: url,
        method: 'get',
        params: params ? params : {},
        data: data ? data : {}
      }).then(res => {
        if (res.data.success) { //返回数据成功
          resolve(res.data.result);
          ViewUI.LoadingBar.finish();
        } else {
          let msg = res.data.msg == null || res.data.msg == '' ? '请求业务异常，请联系系统管理员' : res.data.msg;
          ViewUI.Message.error(msg);
          ViewUI.LoadingBar.error();
          reject(msg);
        }
      }).catch(err => {
        if (err) {
          reject(err);
          ViewUI.Message.error(err);
          ViewUI.LoadingBar.error();
        }
      });
    });
  },
  post: (url, data, params) => {
    ViewUI.LoadingBar.start();
    return new Promise((resolve, reject) => {
      axios.request({
        url: url,
        method: 'post',
        params: params ? params : {},
        data: data ? data : {}
      }).then(res => {
        if (res.data.success) { //返回数据成功
          resolve(res.data.result);
          ViewUI.LoadingBar.finish();
        } else {
          let msg = res.data.msg == null || res.data.msg == '' ? '请求业务异常，请联系系统管理员' : res.data.msg;
          ViewUI.Message.error(msg);
           ViewUI.LoadingBar.error();
          reject(msg);
        }
      }).catch(err => {
        if (err) {
          reject(err);
          ViewUI.Message.error(err);
           ViewUI.LoadingBar.error();
        }
      });
    });
  }
}
