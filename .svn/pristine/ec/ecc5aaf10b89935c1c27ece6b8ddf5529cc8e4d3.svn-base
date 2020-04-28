import request from '@/libs/request'

/**
 * 根据表名名称获取表单初始化数据
 * @param {Object} formName 表单名称
 */
export function getFormInitData ($store, formName) {
  return new Promise((resolve, reject) => {
    const data = $store.getters.getFormInitData(formName)
    if (data == null) {
      let url = `/sys/form/init/${formName}`
      request.get(url).then(res => {
        resolve(res)
        $store.dispatch('setFormInitData', { formName, formInitData: res })
      }).catch(err => {
        reject(err)
      })
    } else {
      resolve(data)
    }
  })
}
