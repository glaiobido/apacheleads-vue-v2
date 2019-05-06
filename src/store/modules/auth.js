import axios from 'axios';
import * as types from '../mutation-types';

// state
export const state = {
  user: null,
  token: localStorage.getItem('token')  
}

// getters
export const getters = {
  user: state => state.user,
  token: state => state.token,
  check: state => state.user !== null
}

// mutations
export const mutations = {
  [types.SAVE_TOKEN] (state, { token, remember }) {
    state.token = token
    localStroge.setItem('token', token)
  },

  [types.FETCH_USER_SUCCESS] (state, { user }) {
    state.user = user
  },

  [types.FETCH_USER_FAILURE] (state) {
    state.token = null
    localStorage.removeItem('token')
  },

  [types.LOGOUT] (state) {
    state.user = null
    state.token = null

    localStorage.removeItem('token')
  },

  [types.UPDATE_USER] (state, { user }) {
    state.user = user
  }
}

// actions
export const actions = {

  async login({ commit, dispatch }, payload) {
    axios.post('/login', payload).then((response) => {
      
      if (response.data.hasOwnProperty('success')) {
          const token = response.data.success.token;

          localStorage.setItem('token', token);
          const authtoken = "Bearer ".concat(token);
          axios.defaults.headers.common['Authorization'] = authtoken;
          // commit(types.SAVE_TOKEN, token);
          // fetch users
          dispatch('fetchUser');
         
      }
    })
    .catch((e) => {
        // this.$router.push({name: 'login'});
    });
  },

  saveToken ({ commit, dispatch }, payload) {
    commit(types.SAVE_TOKEN, payload.token)
  },

  async fetchUser ({ commit }) {
    try {
      const { data } = await axios.get('/user');
      console.log("HERE: ", data)
      commit(types.FETCH_USER_SUCCESS, { user: data })
    } catch (e) {
      commit(types.FETCH_USER_FAILURE)
    }
  },

  updateUser ({ commit }, payload) {
    commit(types.UPDATE_USER, payload)
  },

  async logout ({ commit }) {
    commit(types.LOGOUT)
  },

  async checkAuth({state, dispatch}) {
    if (state.token !== null) {
      // authenticated
      dispatch('fetchUser');
    } else {
      return false;
    }
  }
}
