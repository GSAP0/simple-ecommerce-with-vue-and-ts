<script setup lang="ts">
import { useRoute, RouterLink } from 'vue-router'
import { showBySlug, PER_PAGE } from '@/api/categories'
import ProductCard from '@/components/ProductCard.vue'
import AppPagination from '@/components/AppPagination.vue'

const route = useRoute()
const slug = route.params.slug as string
const page = Number(route.query.page) || 1

const category = await showBySlug(slug)

const allProducts = category.products ?? []
const pages = Math.max(1, Math.ceil(allProducts.length / PER_PAGE))
const products = allProducts.slice((page - 1) * PER_PAGE, page * PER_PAGE)
</script>

<template>
  <section>
    <p><RouterLink to="/categories">← Back to categories</RouterLink></p>

    <div class="list-head">
      <h1>{{ category.name }}</h1>
      <span class="muted">{{ allProducts.length }} products</span>
    </div>
    <p v-if="category.description">{{ category.description }}</p>

    <p v-if="!allProducts.length" class="muted">No products in this category yet.</p>

    <div v-else class="grid">
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>

    <AppPagination :page="page" :pages="pages" />
  </section>
</template>
