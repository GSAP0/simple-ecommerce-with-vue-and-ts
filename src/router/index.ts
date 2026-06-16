import { createRouter, createWebHistory } from 'vue-router'

import ProductsView from '@/views/products/ProductsView.vue'
import ProductView from '@/views/products/ProductView.vue'
import CategoriesView from '@/views/categories/CategoriesView.vue'
import CategoryView from '@/views/categories/CategoryView.vue'
import CartView from '@/views/cart/CartView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/products' },
    { path: '/products', name: 'products', component: ProductsView },
    { path: '/products/:id', name: 'product', component: ProductView },
    { path: '/categories', name: 'categories', component: CategoriesView },
    { path: '/categories/:id', name: 'category', component: CategoryView },
    { path: '/cart', name: 'cart', component: CartView },
  ],
})

export default router
