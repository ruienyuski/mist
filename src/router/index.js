import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '../components/frontPage/Layout.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Index',
        component: () => import('../views/frontPage/Index.vue'),
      },
      {
        path: '/login',
        name: 'Login',
        component: () => import('../views/frontPage/Login.vue'),
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
        path: 'payment/:orderId',
        name: 'Payment',
        component: () => import('../views/frontPage/Payment.vue'),
      },
      {
        path: 'checkorder',
        name: 'checkorder',
        component: () => import('../views/frontPage/CheckOrder.vue'),
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
    ],
  },

  {
    path: '/admin',
    component: () => import('../components/admin/Dashaboard.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/admin/Products.vue'),
      },
      {
        path: 'order',
        component: () => import('../views/admin/Order.vue'),
      },
      {
        path: 'coupons',
        component: () => import('../views/admin/Coupons.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
  linkExactActiveClass: 'active',
});

export default router;
