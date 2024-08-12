import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import RouteName from '~/constants/router-name'
import { useAuthStore } from '~/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: 'home'
    },
    {
      path: '/login',
      name: RouteName.LOGIN,
      component: () => import('../views/pages/auth/login/index.vue')
    },
    {
      path: '/reset-new-password',
      name: RouteName.RESET_NEW_PASSWORD,
      component: () => import('../views/pages/auth/reset-new-password/index.vue')
    },

    {
      path: '/Home',
      component: () => import('../views/layout/index.vue'),
      redirect: RouteName.HOME_NOTICE,
      children: [
        {
          path: '/' + RouteName.HOME_NOTICE,
          name: 'home',
          component: () => import('../views/pages/home/index.vue'),
          meta: { requiresAuth: true, keepAlive: true }
        },
        {
          path: '/' + RouteName.SETUP_STORE,
          name: RouteName.SETUP_STORE,
          component: () => import('../views/pages/home/set-up-store.vue'),
          meta: { requiresAuth: true, keepAlive: true }
        },
        {
          path: '/' + RouteName.PRODUCT,
          name: RouteName.PRODUCT,
          component: () => import('../views/pages/product/index.vue'),
          meta: { requiresAuth: true, keepAlive: true }
        },
        {
          path: '/' + RouteName.ADD_PRODUCT,
          name: RouteName.ADD_PRODUCT,
          component: () => import('../views/pages/product/add-product.vue'),
          meta: { requiresAuth: true, keepAlive: true }
        },
        {
          path: '/' + RouteName.EDIT_PRODUCT + '/:id',
          name: RouteName.EDIT_PRODUCT,
          component: () => import('../views/pages/product/edit-product/index.vue'),
          meta: { requiresAuth: true, keepAlive: true }
        },
        {
          path: '/' + RouteName.PRODUCT_DETAIL + '/:id',
          name: RouteName.PRODUCT_DETAIL,
          component: () => import('../views/pages/product/product-detail.vue'),
          meta: { requiresAuth: true, keepAlive: true }
        },
        {
          path: '/' + RouteName.CATEGORY,
          name: RouteName.CATEGORY,
          component: () => import('../views/pages/category/index.vue'),
          meta: { requiresAuth: true, keepAlive: true }
        },
        {
          path: '/' + RouteName.ADD_CATEGORY,
          name: RouteName.ADD_CATEGORY,
          component: () => import('../views/pages/category/add-category.vue'),
          meta: { requiresAuth: true, keepAlive: true }
        },

        {
          path: '/' + RouteName.EDIT_CATEGORY + '/:id',
          name: RouteName.EDIT_CATEGORY,
          component: () => import('../views/pages/category/edit-category.vue'),
          meta: { requiresAuth: true, keepAlive: true }
        },

        {
          path: '/' + RouteName.COLLECTION,
          name: RouteName.COLLECTION,
          component: () => import('../views/pages/collection/index.vue'),
          meta: { requiresAuth: true, keepAlive: true }
        },
        {
          path: '/' + RouteName.ADD_COLLECTION,
          name: RouteName.ADD_COLLECTION,
          component: () => import('../views/pages/collection/add-collection.vue'),
          meta: { requiresAuth: true, keepAlive: true }
        },
        {
          path: '/' + RouteName.CONFIRM_ORDER,
          name: RouteName.CONFIRM_ORDER,
          component: () => import('../views/pages/confirm-order/index.vue'),
          meta: { requiresAuth: true, keepAlive: true }
        },
        {
          path: '/' + RouteName.ORDER_HISTORY,
          name: RouteName.ORDER_HISTORY,
          component: () => import('../views/pages/order-history/index.vue'),
          meta: { requiresAuth: true, keepAlive: true }
        },
        {
          path: '/' + RouteName.ORDER_DETAIL,
          name: RouteName.ORDER_DETAIL,
          component: () => import('../views/pages/confirm-order/order-detail.vue'),
          meta: { requiresAuth: true, keepAlive: true }
        },
        {
          path: '/' + RouteName.REPORT,
          name: RouteName.REPORT,
          component: () => import('../views/pages/report/index.vue'),
          meta: { requiresAuth: true, keepAlive: true }
        },

        {
          path: '/' + RouteName.PRODUCT_REPORT,
          name: RouteName.PRODUCT_REPORT,
          component: () => import('../views/pages/report/product-report.vue'),
          meta: { requiresAuth: true, keepAlive: true }
        },

        {
          path: '/' + RouteName.ORDER_REPORT,
          name: RouteName.ORDER_REPORT,
          component: () => import('../views/pages/report/order-report.vue'),
          meta: { requiresAuth: true, keepAlive: true }
        },
        {
          path: '/' + RouteName.DISCOUNT,
          name: RouteName.DISCOUNT,
          component: () => import('../views/pages/promotion/discount.vue'),
          meta: { requiresAuth: true, keepAlive: true }
        },
        {
          path: '/' + RouteName.ADD_DISCOUNT,
          name: RouteName.ADD_DISCOUNT,
          component: () => import('../views/pages/promotion/add-discount.vue'),
          meta: { requiresAuth: true, keepAlive: true }
        },
        {
          path: '/' + RouteName.EDIT_DISCOUNT + '/:id',
          name: RouteName.EDIT_DISCOUNT,
          component: () => import('../views/pages/promotion/edit-discount.vue'),
          meta: { requiresAuth: true, keepAlive: true }
        },
        {
          path: '/' + RouteName.VOUCHER,
          name: RouteName.VOUCHER,
          component: () => import('../views/pages/voucher/voucher.vue'),
          meta: { requiresAuth: true, keepAlive: true }
        },
        {
          path: '/' + RouteName.ADD_VOUCHER,
          name: RouteName.ADD_VOUCHER,
          component: () => import('../views/pages/voucher/add-voucher.vue'),
          meta: { requiresAuth: true, keepAlive: true }
        },
        {
          path: '/' + RouteName.EDIT_VOUCHER + '/:id',
          name: RouteName.EDIT_VOUCHER,
          component: () => import('../views/pages/voucher/edit-voucher.vue'),
          meta: { requiresAuth: true, keepAlive: true }
        },
        {
          path: '/' + RouteName.VOUCHER_DETAIL + '/:id',
          name: RouteName.VOUCHER_DETAIL,
          component: () => import('../views/pages/voucher/detail.vue'),
          meta: { requiresAuth: true, keepAlive: true }
        },

        {
          path: '/' + RouteName.CUSTOMER_LIST,
          name: RouteName.CUSTOMER_LIST,
          component: () => import('../views/pages/customer/customer-list.vue'),
          meta: { requiresAuth: true, keepAlive: true }
        },
        {
          path: '/' + RouteName.CUSTOMER_DETAIL + '/:id',
          name: RouteName.CUSTOMER_DETAIL,
          component: () => import('../views/pages/customer/customer-detail.vue'),
          meta: { requiresAuth: true, keepAlive: true }
        },
        {
          path: '/' + RouteName.BLOCKED_CUSTOMER,
          name: RouteName.BLOCKED_CUSTOMER,
          component: () => import('../views/pages/customer/blocked-customer.vue'),
          meta: { requiresAuth: true, keepAlive: true }
        },

        // Administration
        {
          path: '/' + RouteName.ACCOUNT_SETTING,
          name: RouteName.ACCOUNT_SETTING,
          component: () => import('../views/pages/administrator/account-setting.vue'),
          meta: { requiresAuth: true, keepAlive: true }
        },
        {
          path: '/' + RouteName.STORE_SETTING,
          name: RouteName.STORE_SETTING,
          component: () => import('../views/pages/administrator/store-setting.vue'),
          meta: { requiresAuth: true, keepAlive: true }
        },
        {
          path: '/' + RouteName.USER,
          name: RouteName.USER,
          component: () => import('../views/pages/administrator/user.vue'),
          meta: { requiresAuth: true, keepAlive: true }
        },
        {
          path: '/' + RouteName.ADD_USER,
          name: RouteName.ADD_USER,
          component: () => import('../views/pages/administrator/add-user.vue'),
          meta: { requiresAuth: true, keepAlive: true }
        },
        {
          path: '/' + RouteName.ROLE,
          name: RouteName.ROLE,
          component: () => import('../views/pages/administrator/role.vue'),
          meta: { requiresAuth: true, keepAlive: true }
        },
        {
          path: '/' + RouteName.ADD_ROLE,
          name: RouteName.ADD_ROLE,
          component: () => import('../views/pages/administrator/add-role.vue'),
          meta: { requiresAuth: true, keepAlive: true }
        },
        {
          path: '/' + RouteName.EDIT_ROLE + '/:id',
          name: RouteName.EDIT_ROLE,
          component: () => import('../views/pages/administrator/edit-role.vue'),
          meta: { requiresAuth: true, keepAlive: true }
        },
        {
          path: '/' + RouteName.PROFILE,
          name: RouteName.PROFILE,
          component: () => import('../views/pages/profile/index.vue'),
          meta: { requiresAuth: true, keepAlive: true }
        }
      ]
    }
  ]
})

router.beforeEach((toRoute, fromRoute, next) => {
  window.document.title = (
    toRoute.meta && toRoute.meta.title ? toRoute.meta.title : 'Home'
  ) as string

  if (!NProgress.isStarted()) {
    const authStore = useAuthStore()
    // explicitly return false to cancel the navigation
    if (toRoute.meta.requiresAuth && !authStore.isAuthenticated) {
      next('/login')
    } else if (toRoute.meta.requiresUnAuth && authStore.isAuthenticated) {
      next('/Home')
    } else if (toRoute.name === 'login' && authStore.isAuthenticated) {
      next('/Home')
    } else {
      next()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
