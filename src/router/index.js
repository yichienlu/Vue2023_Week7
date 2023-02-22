import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/FrontLayout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../views/front/HomeView.vue')
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('../views/front/AboutView.vue')
      },
      {
        path: 'products',
        component: () => import('../views/front/ProductsView.vue')
      },
      {
        path: 'product/:id',
        component: () => import('../views/front/ProductView.vue')
      },
      {
        path: 'cart',
        component: () => import('../views/front/CartView.vue')
      },
      {
        path: 'checkout/:id',
        component: () => import('../views/front/CheckoutView.vue')
      },
      {
        path: 'checkoutSuccess',
        component: () => import('../views/front/CheckoutSuccessView.vue')
      },
      {
        path: 'articles',
        component: () => import('../views/front/ArticlesView.vue')
      },
      {
        path: 'article/:id',
        component: () => import('../views/front/ArticleView.vue')
      },
      {
        path: 'login',
        component: () => import('../views/front/LoginView.vue')
      }
    ]
  },
  {
    path: '/admin',
    component: () => import('../views/DashboardView.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/admin/AdminProducts.vue')
      },
      {
        path: 'orders',
        component: () => import('../views/admin/AdminOrders.vue')
      },
      {
        path: 'articles',
        component: () => import('../views/admin/AdminArticles.vue')
      },
      {
        path: 'coupons',
        component: () => import('../views/admin/AdminCoupons.vue')
      },
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../views/ErrorView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes
})

export default router
