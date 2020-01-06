import axios from '@/libs/api.request'

/**
 * @desc sys 描述 获取唯一编码
 *
 * @params 参数 code
 *
 * @return 返回 字符串
 *
 * @author Andy Huang
 *
 * @created 2019/12/19 16:57:09
 */

export const getUnicode = ({ sysCode }) => {
  // debugger
  let data = {
    sysCode
  }
  return axios.request({
    url: `/erp/common/sys/code/getFlowNo`,
    data,
    method: 'POST'
  })
}

export const login = ({ userName, password }) => {
  const data = {
    userName,
    password
  }
  return axios.request({
    url: 'login',
    data,
    method: 'post'
  })
}
