import axios from 'axios';
import * as types from '../mutation-types';

// state
export const state = {
  user: null,
  users: [],
  customers: [],
  admins: []
}

// getters
export const getters = {
  users: state => state.users,
  user: state => (id) => {
    return state.users.find(user => user.id == id);
  },

  customers: state => state.customers,

  admin: state => state.admins

}

// mutations
export const mutations = {
  [types.FETCH_ALL_USERS_SUCCESS] (state, { users }) {
    state.users = users;
  },

  [types.FETCH_ALL_ADMINS] (state, { users }) {
    state.admins = users;
  },

  [types.FETCH_ALL_CUSTOMERS] (state, { users }) {
    state.customers = users;
  }
  
}

// actions
export const actions = {

//   async fetchUser ({ commit }) {
//     try {
//       const { data } = await axios.get('/user');
//       console.log("HERE: ", data)
//       commit(types.FETCH_USER_SUCCESS, { user: data })
//     } catch (e) {
//       commit(types.FETCH_USER_FAILURE)
//     }
//   },

    async fetchAllUsers({commit}) {
        try {
            const { data } = await axios.get('/users');
            commit(types.FETCH_ALL_USERS_SUCCESS, { users: data })
        } catch(e) {

        }
    },

    async register({ commit, dispatch }, payload) {

        axios.post('/users', payload).then((response) => {
            const { user } = response.data;
            console.log("TEST ", user)
            return user;
            // console.log("TEST ", user)
        })
        .catch((e) => {
              // this.$router.push({name: 'login'});
        });
    }
}
