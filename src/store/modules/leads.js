import axios from 'axios'
import * as types from '../mutation-types'

// state
export const state = {
    leads: [],
    lead: null,
    id: 0
}

// getters
export const getters = {
    leads: state => state.leads,
    lead: state => (id) => {
        return state.leads.find(lead => lead.id == id)
    }
}

// mutations
export const mutations = {
  [types.FETCH_LEAD_SUCCESS] (state, { leads }) {
    state.leads = leads;
  }

}

// actions
export const actions = {
  
    async fetchLeads ({ commit }) {
        try {
            const { data } = await axios.get('/leads');
            commit(types.FETCH_LEAD_SUCCESS, { leads: data })
        } catch (e) {
        
        }
    },

    async setFetchedLeads({commit}, payload) {
        try {
            commit(types.FETCH_LEAD_SUCCESS, { leads: payload })
        } catch (e) {
        
        }
    }
}
