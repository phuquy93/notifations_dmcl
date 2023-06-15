/* eslint-disable */
import { getList } from '@/api/noti'
import { getToken } from '@/utils/auth'

const getDefaultState = () => {
  return {

  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
}

const actions = {

  async getList({ commit }, data) {
    return new Promise((resolve, reject) => {
      getList({ noti: getToken().split(","), page: data.page, title: data.title }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },



}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

