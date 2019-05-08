import axios from 'axios'
import * as types from '../mutation-types'

// state
export const state = {
    countries: [],
    country: null,
    id: 0
}

// getters
export const getters = {
    countries: state => state.countries
}

// mutations
export const mutations = {
  [types.FETCH_COUNTRIES] (state, { countries }) {
    state.countries = countries;
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
    }
}
