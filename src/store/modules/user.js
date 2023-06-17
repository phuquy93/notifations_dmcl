/* eslint-disable */

import { getUser, getToken, setStatusDk, setNotice, setToken, setName, removeToken, removeUser, setStore, removeStore, getStore, removeDk } from '@/utils/auth'
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
  async login({ commit }, userInfo) {
    const { username, password } = userInfo

    const options = {
      method: "GET",
    };
    let res = await fetch(
      "https://apiat.stdmcl.com:11443/api/v1/loginuser?username=" + username.trim() + "&password=" + password,
      options
    )
    const data = await res.json();

    if (data.data.is_notice) {

      setToken(data.data.token)

      setNotice(data.data.group_notice)

      setName(data.data.name)

      setStore(data.data.store)

      setStatusDk(1)


    }

    return data;

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

