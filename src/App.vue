<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

const links = [
  { to: '/products', label: 'Products' },
  { to: '/categories', label: 'Categories' },
  { to: '/cart', label: 'Cart' },
]
</script>

<template>
  <header class="sticky top-0 z-10 border-b border-gray-200 bg-white/80 backdrop-blur">
    <div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
      <RouterLink to="/" class="text-xl font-bold tracking-tight text-gray-900">
        Infiterra
      </RouterLink>

      <nav class="flex items-center gap-1">
        <RouterLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
          active-class="bg-gray-900 text-white hover:bg-gray-900 hover:text-white"
        >
          {{ link.label }}
        </RouterLink>
      </nav>
    </div>
  </header>

  <main class="mx-auto max-w-6xl px-6 py-8">
    <RouterView />
  </main>
</template>
