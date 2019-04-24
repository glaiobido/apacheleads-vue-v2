import Vue from 'vue'
import Router from 'vue-router'
import DashboardLayout from '@/layout/DashboardLayout'
import AuthLayout from '@/layout/AuthLayout'
Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'active',
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: 'dashboard',
      component: DashboardLayout,
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "demo" */ './views/ApacheDashboard.vue'),
          meta: {
            pageTitle: 'Admin Dashboard'
          }
        },
        {
          path: '/lead-types',
          name: 'lead-types',
          component: () => import(/* webpackChunkName: "demo" */ './views/Apacheleads/Leadtypes/Leadtypes.vue'),
          meta: {
            pageTitle: 'Lead Types'
          }
        },
        {
          path: '/leads',
          name: 'leads',
          component: () => import(/* webpackChunkName: "demo" */ './views/Apacheleads/Leads/Leads.vue'),
          meta: {
            pageTitle: 'Leads'
          }
        },
        {
          path: '/import-leads',
          name: 'import leads',
          component: () => import(/* webpackChunkName: "demo" */ './views/Apacheleads/Leads/ImportLeads.vue'),
          meta: {
            pageTitle: 'Import New Leads'
          }
        },
        {
          path: '/profile',
          name: 'profile',
          component: () => import(/* webpackChunkName: "demo" */ './views/UserProfile.vue')
        },
        
        {
          path: '/tables',
          name: 'tables',
          component: () => import(/* webpackChunkName: "demo" */ './views/Tables.vue')
        }
      ]
    },
    {
      path: '/',
      redirect: 'login',
      component: AuthLayout,
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import(/* webpackChunkName: "demo" */ './views/Login.vue')
        },
        {
          path: '/register',
          name: 'register',
          component: () => import(/* webpackChunkName: "demo" */ './views/Register.vue')
        }
      ]
    }
  ]
})
