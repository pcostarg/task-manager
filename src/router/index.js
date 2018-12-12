import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
import Dashboard from '@/components/Dashboard'
import CreateUser from '@/components/CreateUser'
import Users from '@/components/Users'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/createuser',
      name: 'CreateUser',
      component: CreateUser
    },
    {
      path: '/users',
      name: 'Users',
      component: Users
    }
  ]
})
