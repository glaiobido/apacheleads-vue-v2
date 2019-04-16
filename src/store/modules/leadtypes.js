import axios from 'axios'
import * as types from '../mutation-types'

// state
export const state = {
    leadtypes: [],
    leadtype: null
}

// getters
export const getters = {
    leadtypes: state.leadtypes,
    leadtype: state.leadtype
}

// mutations
export const mutations = {
  [types.FETCH_LEADTYPES_SUCCESS] (state, { leadtypes }) {
    state.leadtypes = leadtypes
  },

  [types.FETCH_LEADTYPE_SUCCESS] (state, { leadtype }) {
    state.leadtype = leadtype
  }

}

// actions
export const actions = {
  
    async fetchLeadTypes ({ commit }) {
        try {
        const { data } = await axios.get('/api/user')
        commit(types.FETCH_LEADTYPES_SUCCESS, { leadtypes: data })
        } catch (e) {
        
        }
    },

    updateUser ({ commit }, payload) {
        commit(types.UPDATE_USER, payload)
    }
}
