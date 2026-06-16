<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { RouterLink, useRoute } from 'vue-router'
import { useCartStore } from '@/stores/cart'

const route = useRoute()
const cart = useCartStore()
const { count, total } = storeToRefs(cart)

const open = ref(false)

const links = [
  { to: '/products', label: 'Products' },
  { to: '/categories', label: 'Categories' },
]

// active when the current path equals the link or is nested under it (e.g. /products/1)
function isActive(to: string) {
  return route.path === to || route.path.startsWith(`${to}/`)
}
</script>

<template>
  <nav class="nav">
    <button
      class="nav-toggle btn-secondary"
      :aria-expanded="open"
      aria-label="Toggle menu"
      @click="open = !open"
    >
      {{ open ? '✕' : '☰' }}
    </button>

    <div class="nav-links" :class="{ open }">
      <RouterLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        :class="{ active: isActive(link.to) }"
        @click="open = false"
      >
        {{ link.label }}
      </RouterLink>
      <RouterLink to="/cart" :class="{ active: isActive('/cart') }" @click="open = false">
        <span v-if="count">Cart ({{ count }}) - {{ total.toFixed(2) }} €</span>
        <span v-else>Cart</span>
      </RouterLink>
    </div>
  </nav>
</template>
