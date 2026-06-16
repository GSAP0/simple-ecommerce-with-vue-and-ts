<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { show } from '@/api/categories'
import type { Category } from '@/types'

const route = useRoute()

const category = ref<Category | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

async function loadCategory(id: string) {
  loading.value = true
  error.value = null
  try {
    const { data } = await show(id)
    category.value = data
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Unknown error'
  } finally {
    loading.value = false
  }
}

watch(() => route.params.id as string, (id) => loadCategory(id), { immediate: true })
</script>

<template>
  <section>
    <RouterLink to="/categories" class="text-sm text-gray-500 hover:text-gray-900">
      ← Back to categories
    </RouterLink>

    <p v-if="loading" class="mt-4">Loading…</p>
    <p v-else-if="error" class="mt-4 text-red-600">Error: {{ error }}</p>

    <article v-else-if="category" class="mt-4">
      <h1 class="text-2xl">{{ category.name }}</h1>
      <p v-if="category.description" class="mt-2 text-gray-600">
        {{ category.description }}
      </p>

      <ul v-if="category.products?.length" class="mt-6 space-y-1">
        <li v-for="product in category.products" :key="product.id">
          <RouterLink
            :to="{ name: 'product', params: { id: product.id } }"
            class="text-gray-700 hover:text-gray-900 hover:underline"
          >
            {{ product.name }}
          </RouterLink>
        </li>
      </ul>
    </article>
  </section>
</template>
