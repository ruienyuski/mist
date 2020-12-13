import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '../components/frontPage/Layout.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'index',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../views/frontPage/Home.vue'),
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
    name: 'Dashaboard',
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
});

export default router;
