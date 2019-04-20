import axios from 'axios'
import * as types from '../mutation-types'

// state
export const state = {
    leadtypes: [],
    leadtype: null,
    id: 0
}

// getters
export const getters = {
    leadtypes: state => state.leadtypes,
    leadtype: state => (lead_type_id) => {
        return state.leadtypes.find(leadtype => leadtype.id == lead_type_id)
    }
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
            const { data } = await axios.get('/leadtypes');
            commit(types.FETCH_LEADTYPES_SUCCESS, { leadtypes: data })
        } catch (e) {
        
        }
    }
}
