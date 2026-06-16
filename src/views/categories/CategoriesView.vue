<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { search } from '@/api/categories'
import type { Category } from '@/types'

const categories = ref<Category[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

async function loadCategories() {
  loading.value = true
  error.value = null
  try {
    const { data } = await search()
    categories.value = data
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Unknown error'
  } finally {
    loading.value = false
  }
}

onMounted(loadCategories)
</script>

<template>
  <section>
    <h1>Categories</h1>
    <p v-if="loading">Loading…</p>
    <p v-else-if="error">Error: {{ error }}</p>
    <ul v-else>
      <li v-for="category in categories" :key="category.id">
        <RouterLink
          :to="{ name: 'category', params: { id: category.id } }"
          class="text-gray-700 hover:text-gray-900 hover:underline"
        >
          {{ category.name }}
        </RouterLink>
      </li>
    </ul>
  </section>
</template>
