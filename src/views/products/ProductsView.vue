<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { search } from '@/api/products'
import type { Product } from '@/types'

const products = ref<Product[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

async function loadProducts() {
  loading.value = true
  error.value = null
  try {
    const { data } = await search()
    products.value = data
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Unknown error'
  } finally {
    loading.value = false
  }
}

onMounted(loadProducts)
</script>

<template>
  <section>
    <h1>Products</h1>
    <p v-if="loading">Loading…</p>
    <p v-else-if="error">Error: {{ error }}</p>
    <ul v-else>
      <li v-for="product in products" :key="product.id">
        <RouterLink
          :to="{ name: 'product', params: { id: product.id } }"
          class="text-gray-700 hover:text-gray-900 hover:underline"
        >
          {{ product.name }}
        </RouterLink>
      </li>
    </ul>
  </section>
</template>
