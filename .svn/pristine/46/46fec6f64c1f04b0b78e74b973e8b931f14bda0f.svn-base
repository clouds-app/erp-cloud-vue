import axios from '@/libs/api.request'


export const getUserInfo = (token) => {
  return axios.request({
    url: 'get_info',
    params: {
      token
    },
    method: 'get'
  })
}

export const logout = (token) => {
  return axios.request({
    url: 'logout',
    method: 'post'
  })
}
/**
 * 获取单位信息，根据单位编号
 */
export const userCompanyByCode = ({companyCode})=>{
  return axios.request({
    url: `/sys/user/login/getCompanyNameByCode`,
    params:{companyCode},
    method: 'GET'
  })
}

/**
 * login
 * companyCode:单位编号
 * userCode:用户名
 * pwd:密码
 */
export const login = ({companyId,userCode, pwd }) => {
  let data = {
    companyId:companyId,
    userCode:userCode,
    passWord:pwd
  }
  return axios.request({
    url: `/sys/user/login`,
    data:data,
    method: 'POST'
  });
}
