<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { search } from '@/api/products'
import { search as searchCategories } from '@/api/categories'
import ProductCard from '@/components/ProductCard.vue'
import AppPagination from '@/components/AppPagination.vue'
import SearchBar from '@/components/SearchBar.vue'

const route = useRoute()
const router = useRouter()
const page = Number(route.query.page) || 1
const q = (route.query.q as string) || ''
const sort = (route.query.sort as string) || ''
const category = (route.query.category as string) || ''

const [{ data: result }, { data: categoriesPage }] = await Promise.all([
  search({ page, q, sort, category }),
  searchCategories({ perPage: 100 }),
])
const categories = categoriesPage.data

function pushQuery(patch: Record<string, string | undefined>) {
  router.push({ name: 'products', query: { ...route.query, page: undefined, ...patch } })
}

function onSort(event: Event) {
  pushQuery({ sort: (event.target as HTMLSelectElement).value || undefined })
}

function onCategory(event: Event) {
  pushQuery({ category: (event.target as HTMLSelectElement).value || undefined })
}
</script>

<template>
  <section>
    <SearchBar route-name="products" placeholder="Search products…" />

    <div class="list-head">
      <h1>Products</h1>
      <div class="list-head-right">
        <span class="muted">{{ result.items }} products</span>
        <select class="filter" :value="category" @change="onCategory">
          <option value="">All categories</option>
          <option v-for="c in categories" :key="c.id" :value="c.id">{{ c.name }}</option>
        </select>
        <select class="sort" :value="sort" @change="onSort">
          <option value="">Sort by…</option>
          <option value="name">Name (A–Z)</option>
          <option value="-name">Name (Z–A)</option>
          <option value="price">Price (low–high)</option>
          <option value="-price">Price (high–low)</option>
        </select>
      </div>
    </div>

    <p v-if="!result.data.length" class="muted">No products found.</p>

    <div v-else class="grid">
      <ProductCard v-for="product in result.data" :key="product.id" :product="product" />
    </div>

    <AppPagination :page="page" :pages="result.pages" />
  </section>
</template>
