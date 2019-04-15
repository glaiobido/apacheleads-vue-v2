import axios from 'axios'
import * as types from '../mutation-types'

// state
export const state = {
  leadtypes: [],
  leadtype: null
}

// getters
export const getters = {
  leadtype: state => state.leadtype,  
  getleadTyoe: state => state.user !== null
}

// mutations
export const mutations = {
  [types.FETCH_LEADTYPE_SUCCESS] (state, { leadtype }) {
    state.leadtype = leadtype
  },

  [types.UPDATE_LEADTYPE] (state, { leadtype }) {
    state.leadtype = leadtype
  }
}

// actions
export const actions = {
    // async fetchUser ({ commit }) {
    //     try {
    //     const { data } = await axios.get('/api/user')

    //     commit(types.FETCH_USER_SUCCESS, { user: data })
    //     } catch (e) {
    //     commit(types.FETCH_USER_FAILURE)
    //     }
    // },

    // updateUser ({ commit }, payload) {
    //     commit(types.UPDATE_USER, payload)
    // },

    // async logout ({ commit }) {
    //     try {
    //     await axios.post('/api/logout')
    //     } catch (e) { }

    //     commit(types.LOGOUT)
    // },

    // async fetchOauthUrl (ctx, { provider }) {
    //     const { data } = await axios.post(`/api/oauth/${provider}`)

    //     return data.url
    // }
}
