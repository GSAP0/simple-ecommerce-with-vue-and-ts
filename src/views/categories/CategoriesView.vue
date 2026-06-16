<script setup lang="ts">
import { useRoute } from 'vue-router'
import { search } from '@/api/categories'
import CategoryCard from '@/components/CategoryCard.vue'
import AppPagination from '@/components/AppPagination.vue'
import SearchBar from '@/components/SearchBar.vue'

const route = useRoute()
const page = Number(route.query.page) || 1
const q = (route.query.q as string) || ''
const { data: result } = await search({ page, q })
</script>

<template>
  <section>
    <SearchBar route-name="categories" placeholder="Search categories…" />

    <div class="list-head">
      <h1>Categories</h1>
      <span class="muted">{{ result.items }} categories</span>
    </div>

    <p v-if="!result.data.length" class="muted">No categories found.</p>

    <div v-else class="grid">
      <CategoryCard v-for="category in result.data" :key="category.id" :category="category" />
    </div>

    <AppPagination :page="page" :pages="result.pages" />
  </section>
</template>
