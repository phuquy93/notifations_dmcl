/* eslint-disable */
import { login, getInfo, getUsers, addUsers } from '@/api/user'
import { getUser, getToken, setToken, setName, removeToken, removeUser, setStore, removeStore, getStore, removeDk } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    user: getUser(),
    store: getStore(),
    token: getToken() ? getToken().split(",") : getToken(),
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        if (data.data.is_notice) {
          setToken(data.data.group_notice)
          setName(data.data.name)
          setStore(data.data.store)
        }

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        commit('SET_USER', data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit }) {
    removeToken() // must remove  token  first
    removeUser()
    removeStore()
    resetRouter()
    removeDk()
    commit('RESET_STATE')
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      removeUser()
      commit('RESET_STATE')
      resolve()
    })
  },

  async getUsers({ commit }, data) {
    let res = await getUsers({ page: data.page, numitem: data.numitem });
    if (res.status == 200) {
      commit("SET_USERS", res.data)
    }
  },

  async addUsers({ }, data) {

    let res = await addUsers(data);
    return res;
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

