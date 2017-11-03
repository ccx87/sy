import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import List from '@/components/List'
import SignIn from '@/components/SignIn'
import SignUp from '@/components/SignUp'
import Forget from '@/components/Forget'
import ForgetPw from '@/components/ForgetPw'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/list',
      name: 'List',
      component: List
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/signIn',
          name: 'signIn',
          component: SignIn
        },
        {
          path: '/signUp',
          name: 'signUp',
          component: SignUp
        }        
      ]      	
    },
    {
      path: '/forget',
      name: 'forget',
      component: Forget,
      children: [
        {
          path: '/forgetPw',
          name: 'forgetPw',
          component: ForgetPw
        }       
      ]      
    }
  ]
})
