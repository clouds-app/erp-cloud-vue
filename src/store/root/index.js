/**
 * 全局模块
 */
import request from '@/libs/request'
import Vue from 'vue'

export default {
  state: {
    formShowColon: false, // 表单是否显示冒号
    formInitData: {}, // 存储表单初始化数据 key=formName value = data
    tableColumnsData: {}, // 存储表格列信息
    sysParams: {}
  },
  getters: {
    formShowColon: state => {
      return state.formShowColon
    },
    getFormInitData: (state) => (formName) => {
      const data = state.formInitData
      if (data[formName]) {
        return data[formName]
      }
      return null
    },
    getTableColumns: (state) => (tableName) => {
      return state.tableColumnsData[tableName]
    },
    getSysParams: (state) => (paramName) => {
      return state.sysParams[paramName]
    }
  },
  mutations: {
    setFormInitData (state, { formName, formInitData }) {
      if (state.formInitData[formName]) {
        Vue.set(state.formInitData, formName, formInitData)
      } else {
        state.formInitData[formName] = formInitData
      }
    },
    setTableColumns (state, { tableName, columns, pageSize }) {
      // debugger
      if (state.tableColumnsData[tableName]) {
        Vue.set(state.tableColumnsData, tableName, { columns: columns, pageSize: pageSize })
      } else {
        state.tableColumnsData[tableName] = { columns: columns, pageSize: pageSize }
      }
    },
    setSysParams (state, sysParams) {
      state.sysParams = sysParams
    }
  },
  actions: {
    setFormInitData ({ commit }, { formName, formInitData }) {
      commit('setFormInitData', { formName, formInitData })
    },
    setTableColumns ({ commit }, { tableName, columns, pageSize }) {
      commit('setTableColumns', { tableName, columns, pageSize })
    },
    getSysParamsValue ({ commit, getters }, paramName) {
      let value = getters.getSysParams(paramName)
      if (value) {
        return value
      }
      request.post('/common/sys/param').then(res => {
        commit('setSysParams', res)
      })
    }
  }
}
