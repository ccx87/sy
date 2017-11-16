import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Index from '@/components/Index'
import List from '@/components/List'
import Nav from '@/components/Nav'
import SignIn from '@/components/SignIn'
import SignUp from '@/components/SignUp'
import Forget from '@/components/Forget'
import ForgetPw from '@/components/ForgetPw'

import Page1 from '@/components/view-page/page1'
import Page2 from '@/components/view-page/page2'
import Page3 from '@/components/view-page/page3'
import Page4 from '@/components/view-page/page4'
import Page5 from '@/components/view-page/page5'
import Page6 from '@/components/view-page/page6'
import Page7 from '@/components/view-page/page7'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'index',
      component: Index,
      children: [
        {
          path: '/list',
          name: 'list',
          component: List
        },
        {
          path: '/nav',
          name: 'nav',
          component: Nav,
          children: [
            {
              path: '/page1',
              name: 'page1',
              component: Page1
            },
            {
              path: '/page2',
              name: 'page2',
              component: Page2
            },
            {
              path: '/page3',
              name: 'page3',
              component: Page3
            },
            {
              path: '/page4',
              name: 'page4',
              component: Page4
            }, 
            {
              path: '/page5',
              name: 'page5',
              component: Page5
            },
            {
              path: '/page6',
              name: 'page6',
              component: Page6
            },
            {
              path: '/page7',
              name: 'page7',
              component: Page7
            }
          ]
        },           
      ]
    },

    {
      path: '/',
      name: 'home',
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
