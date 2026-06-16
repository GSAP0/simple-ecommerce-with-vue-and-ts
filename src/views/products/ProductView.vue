<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { show } from '@/api/products'
import { useCartStore } from '@/stores/cart'
import type { Product } from '@/types'

const route = useRoute()
const cart = useCartStore()

const product = ref<Product | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

async function loadProduct(id: string) {
  loading.value = true
  error.value = null
  try {
    const { data } = await show(id)
    product.value = data
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Unknown error'
  } finally {
    loading.value = false
  }
}

watch(() => route.params.id as string, (id) => loadProduct(id), { immediate: true })
</script>

<template>
  <section>
    <RouterLink to="/products" class="text-sm text-gray-500 hover:text-gray-900">
      ← Back to products
    </RouterLink>

    <p v-if="loading" class="mt-4">Loading…</p>
    <p v-else-if="error" class="mt-4 text-red-600">Error: {{ error }}</p>

    <article v-else-if="product" class="mt-4">
      <h1 class="text-2xl">{{ product.name }}</h1>
      <p v-if="product.description" class="mt-2 text-gray-600">
        {{ product.description }}
      </p>
      <p class="mt-4 text-xl font-semibold">{{ product.price }}</p>

      <button
        type="button"
        class="mt-6 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-700"
        @click="cart.addItem(product)"
      >
        Add to cart
      </button>
    </article>
  </section>
</template>
