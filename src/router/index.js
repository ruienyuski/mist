import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../components/frontPage/Layout.vue'),
      children: [
        {
          path: '',
          name: 'Index',
          component: () => import('../views/frontPage/Index.vue'),
        },
        {
          path: '/login',
          name: 'login',
          component: () => import('../views/frontPage/Login.vue')
        },
        {
          path: 'products',
          name: 'Products',
          component: () => import('../views/frontPage/Products.vue'),
        },
        {
          path: 'favlist',
          name: 'Favlist',
          component: () => import('../views/frontPage/Fav.vue'),
        },
        {
          path: 'checkpayment',
          name: 'CheckPayment',
          component: () => import('../views/frontPage/CheckPayment.vue'),
        },
        {
          path: 'checksuccess',
          name: 'CheckSuccess',
          component: () => import('../views/frontPage/CheckSuccess.vue'),
        },
        {
          path: 'payment/:orderId',
          name: 'Payment',
          component: () => import('../views/frontPage/Payment.vue'),
        },
        {
          path: 'product/:id',
          name: 'ProductDetail',
          component: () => import('../views/frontPage/ProductDetail.vue'),
        },
        {
          path: 'cart',
          name: 'Cart',
          component: () => import('../views/frontPage/Cart.vue'),
        },
        {
          path: '/:pathMatch(.*)*',
          redirect: '/',
        },
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../components/admin/Dashaboard.vue'),
      children: [
        {
          path: '',
          name: 'products',
          component: () => import('../views/admin/Products.vue'),
        },
        {
          path: 'order',
          name: 'order',
          component: () => import('../views/admin/Order.vue'),
        },
        {
          path: 'coupons',
          name: 'coupons',
          component: () => import('../views/admin/Coupons.vue'),
        },
      ]
    }
  ]
})

export default router
