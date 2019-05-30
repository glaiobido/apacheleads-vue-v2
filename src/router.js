import Vue from 'vue'
import Router from 'vue-router'
import DashboardLayout from '@/layout/DashboardLayout'
import AuthLayout from '@/layout/AuthLayout';

Vue.use(Router)

const router = new Router({
  linkExactActiveClass: 'active',
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: 'dashboard',
      component: DashboardLayout,
      beforeEnter(to, from, next) {
        if (localStorage.getItem('token') != null) {
          next();
        } else {
          next('/login')
        }
      },
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
          component: () => import(/* webpackChunkName: "demo" */ './views/Apacheleads/Leads/ImportLeads/ImportLeads.vue'),
          meta: {
            pageTitle: 'Import New Leads'
          }
        },
        {
          path: '/orders',
          name: 'orders',
          component: () => import(/* webpackChunkName: "demo" */ './views/Apacheleads/Orders/Orders.vue'),
          children: [
            {
              path: '/',
              name: 'generate-order',
              // route level code-splitting
              // this generates a separate chunk (about.[hash].js) for this route
              // which is lazy-loaded when the route is visited.
              component: () => import(/* webpackChunkName: "demo" */ './views/Apacheleads/Orders/OrderResults.vue'),
              meta: {
                pageTitle: 'Orders'
              }
            },
            {
              path: '/deliver',
              name: 'deliver-order',
              // route level code-splitting
              // this generates a separate chunk (about.[hash].js) for this route
              // which is lazy-loaded when the route is visited.
              component: () => import(/* webpackChunkName: "demo" */ './views/Apacheleads/Orders/EmailOrder.vue'),
              meta: {
                pageTitle: 'Orders'
              }
            }
          ]
        },
        {
          path: '/customers',
          name: 'customers',
          component: () => import(/* webpackChunkName: "demo" */ './views/Apacheleads/Customers/Customers.vue')
        }
      ]
    },
    {
      path: '/',
      redirect: 'login',
      component: AuthLayout,
      beforeEnter(to, from, next) {
        // next();
        if (localStorage.getItem('token')) {
          next('/dashboard');
        } else {
          next()
        }
      },
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
});

router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
      // Start the route progress bar.
      NProgress.start()
  }
  next()
})

router.afterEach((to, from) => {
  // Complete the animation of the route progress bar.
  NProgress.done()
})

export default router;
