import { createRouter, createWebHistory } from 'vue-router'

import ProductsView from '@/views/products/ProductsView.vue'
import ProductView from '@/views/products/ProductView.vue'
import CategoriesView from '@/views/categories/CategoriesView.vue'
import CategoryView from '@/views/categories/CategoryView.vue'
import CartView from '@/views/cart/CartView.vue'
import ErrorView from '@/views/ErrorView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/products' },
    { path: '/products', name: 'products', component: ProductsView },
    { path: '/products/:slug', name: 'product', component: ProductView },
    { path: '/categories', name: 'categories', component: CategoriesView },
    { path: '/categories/:slug', name: 'category', component: CategoryView },
    { path: '/cart', name: 'cart', component: CartView },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: ErrorView },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
})

export default router
