/* eslint-disable */
import { getList, handleChecked } from '@/api/noti'
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
      getList({
        noti: getToken().split(","), page: data.page, title: data.title, status: data.status, date_start: data.date_start,
        date_end: data.date_end
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  async handleChecked({ commit }, data) {
    return new Promise((resolve, reject) => {
      handleChecked({
        id: data.id, cid_user: data.cid_user
      }).then(response => {
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

