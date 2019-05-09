import axios from 'axios'
import * as types from '../mutation-types'

// state
export const state = {
    countries: [],
    country: null,
    states: [],
    country_state: null,
    id: 0
}

// getters
export const getters = {
    countries: state => state.countries,
    states: state => state.states,
    country: state => (code) => {
        return state.countries.find(country => country.country_code == code);
    }
}

// mutations
export const mutations = {
  [types.FETCH_COUNTRIES] (state, { countries }) {
    state.countries = countries;
  },

  [types.FETCH_STATES] (state, { states }) {
    state.states = states;
  }

}

// actions
export const actions = {
  
    async fetchCountries ({ commit }) {
        try {
            const { data } = await axios.get('/countries');
            commit(types.FETCH_COUNTRIES, { countries: data })
        } catch (e) {
        
        }
    },

    async fetchStates({commit}, payload) {
        try {
            const { data } = await axios.get('/states', { params: payload });
            commit(types.FETCH_STATES, { states: data });
        } catch (e) {
        
        }
    }
}
