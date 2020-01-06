import { getUnicode } from '@/api/sys'

export default {
  state: {
    hasGetInfo: false
  },
  mutations: {

  },
  actions: {
    // 获取唯一编码
    getUnicodeAction ({ commit }, params) {
      // debugger
      return new Promise((resolve, reject) => {
        try {
          getUnicode(params).then(res => {
            const data = res.data
            resolve(data)
          }).catch(err => {
            reject(err)
          })
        } catch (error) {
          reject(error)
        }
      })
    }
  }
}
