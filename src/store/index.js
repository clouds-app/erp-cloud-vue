import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'
import app from './module/app'
import sys from './module/sys'
import bas from './module/bas'
import root from './root'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    root,
    user,
    app,
    sys,
    bas
  }
})
