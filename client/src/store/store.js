//https://medium.com/@bradfmd/vue-vuex-getting-started-f78c03d9f65
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    // This is where you define the data structure of your application. You can also set default or initial state here.
    token : localStorage.getItem('token') || null,
    todoList : []
  },
  actions: {
    register: function(store,user){
      axios.post('http://localhost:3001/register', {
        email: user.email,
        password: user.password,
        name: user.name
      })
      .then(res => {
        // console.log(res.data);
        if (typeof res.data.err !== 'undefined') alert(res.data.err.join('\n'));
        else alert('User Registered')
      })
      .catch(err => { console.log(err); } )
    },
    login: function(store,user) {
      axios.post('http://localhost:3001/login', {
        email: user.email,
        password:user.password,
        isFb: false
      })
      .then(res => {
        if (typeof res.data.err !== 'undefined') alert(res.data.err);
        else if (typeof res.data.token !== 'undefined') {
          localStorage.setItem('token',res.data.token);
          store.commit('setToken', res.data.token);
          window.open('http://localhost:8080/#/todos','_self');
        }
      })
      .catch(err => { console.log(err); } )
    },
    fblogin: function(store,user) {
      axios.post('http://localhost:3001/fblogin', {
        email: user.email
        // isFb: true
      })
      .then(res => {
        if (typeof res.data.token !== 'undefined') {
          localStorage.setItem('token', res.data.token)
          store.commit('setToken', res.data.token);
          window.open('http://localhost:8080/#/todos','_self');

        }
        else console.log(res.data.err);
      })
      .catch(err => { console.log(err); } )
    },
    logout: function(store) {
      localStorage.removeItem('token');
      store.commit('setToken',null);
      window.open('http://localhost:8080/#/login','_self');
    },
    getTodo: function(store) {
      axios.get('http://localhost:3001/api/todos', {headers: {'token': store.getters.token}})
      .then(res => {
        if (typeof res.data.err !== 'undefined') console.log(res.data.err);
        else store.commit('setTodoList',res.data);
      })
      .catch(err => { console.log(err); } )
    },
    updateTodo: function(store,todo) {
      let todo_id = todo._id
      axios.put(`http://localhost:3001/api/todos/${todo_id}`,
        {title: todo.title},
        {headers: {'token': store.getters.token}})
      .then(res => {
        if (typeof res.data.err !== 'undefined') alert(res.data.err);
        else store.dispatch('getTodo');
      })
      .catch(err => { console.log(err); } )
    },
    createTodo: function(store,todo) {
      axios.post(`http://localhost:3001/api/todos/`,
        {title: todo.title},
        {headers: {'token': store.getters.token}})
      .then(res => {
        // console.log('dapet result neh')
        // console.log(res.data.err)
        if (typeof res.data.err !== 'undefined') {
          console.log(res.data.err)
          return res.data.err;
        } else {
          store.dispatch('getTodo');
        }
      })
      .catch(err => { console.log(err); } )
    },
    deleteTodo: function(store,todo_id) {
      axios.delete(`http://localhost:3001/api/todos/${todo_id}`, {headers: {'token': store.getters.token}})
      .then(res => {
        if (typeof res.data.err !== 'undefined') console.log(res.data.err);
        else store.dispatch('getTodo');
      })
      .catch(err => { console.log(err); } )
    },
    markDone: function(store,todo_id) {
      axios.put(`http://localhost:3001/api/todos/${todo_id}`,
        {completed_date: new Date()},
        {headers: {'token': store.getters.token}})
      .then(res => {
        if (typeof res.data.err !== 'undefined') console.log(res.data.err);
        else store.dispatch('getTodo');
      })
      .catch(err => { console.log(err); } )
    },
    markNotDone: function(store,todo_id) {
      // let todo_id = todo._id
      axios.put(`http://localhost:3001/api/todos/${todo_id}`,
        {completed_date: null},
        {headers: {'token': store.getters.token}})
      .then(res => {
        if (typeof res.data.err !== 'undefined') console.log(res.data.err);
        else store.dispatch('getTodo');
      })
      .catch(err => { console.log(err); } )
    }

  },
  mutations: {
    //The mutations calls are the only place that the store can be updated.
    setToken(state, token) {
      state.token = token;
    },
    setTodoList(state,todos) {
      state.todoList = todos;
    }
  },
  getters: {
    todoList(state) {
      return state.todoList;
    },
    token(state) {
      return state.token;
    }
    // completedProjects: state => {
    //   return state.projects.filter(project => project.completed).length
    // }
  },
  modules: {
    // The modules object provides a way to split your store in multiple stores, but allow them to all remain part of the store tree
  }
})
export default store