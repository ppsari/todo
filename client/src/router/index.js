import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import LoginRegister from '@/components/LoginRegister'
import Todos from '@/components/Todos'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/login',
      name: 'LoginRegister',
      component: LoginRegister
    },
    {
      path: '/todos',
      name: 'Todos',
      component: Todos
    }
  ],
})
