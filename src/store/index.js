import Vue from 'vue'
import Vuex from 'vuex'
import game from './game'

Vue.use(Vuex)

const store = new Vuex.Store({
  getters : {},
  actions: {},
  mutations: {},
  modules: {
    game
  }
})

export default store