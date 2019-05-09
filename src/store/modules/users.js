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
  customer: state => (id) => {
    return state.customers.find(customer => customer.id == id);
  },

  admin: state => state.admins

}

// mutations
export const mutations = {
  [types.FETCH_ALL_USERS] (state, { users }) {
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

    async fetchAllUsers({commit}) {
        try {
            const { data } = await axios.get('/users');
            commit(types.FETCH_ALL_USERS, { users: data });
        } catch(e) {

        }
    },

    async fetchAllCustomers({commit}) {
        try {
            const { data } = await axios.get('/customers');
            commit(types.FETCH_ALL_CUSTOMERS, { users: data });
        } catch(e) {

        }
    },

    async register({ commit, dispatch }, payload) {

        axios.post('/users', payload).then((response) => {
            const { user, token } = response.data;
            localStorage.setItem('token', token);
            
            return user;
        })
        .catch((e) => {
              
        });
    }
}
